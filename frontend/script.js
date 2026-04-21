const API = 'http://localhost:5000';

let allSubjects = [];
let selectedColor = '#4f46e5';

// Demo data if backend is offline
const demoData = [
    { id: 1, name: 'DevOps', category: 'Technology', notes: 'Learning Docker, Kubernetes, CI/CD pipelines and cloud deployment strategies.', link: 'https://docs.docker.com', color: '#4f46e5' },
    { id: 2, name: 'Python', category: 'Programming', notes: 'Flask, Django, data structures, algorithms and scripting for automation.', link: 'https://python.org', color: '#059669' },
    { id: 3, name: 'Networking', category: 'Technology', notes: 'TCP/IP, DNS, HTTP protocols, firewalls and network security fundamentals.', link: 'https://www.cloudflare.com/learning/', color: '#dc2626' },
    { id: 4, name: 'Database', category: 'Technology', notes: 'SQL, NoSQL, normalization, indexing, transactions and database design.', link: 'https://www.postgresql.org/docs/', color: '#d97706' },
];

// Load subjects on page load
async function loadSubjects() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('cards-grid').innerHTML = '';

    try {
        const res = await fetch(`${API}/subjects`);
        if (!res.ok) throw new Error('Backend error');
        allSubjects = await res.json();
        document.getElementById('error-box').style.display = 'none';
    } catch (err) {
        // Use demo data if backend is offline
        allSubjects = demoData;
        document.getElementById('error-box').style.display = 'block';
    }

    document.getElementById('loading').style.display = 'none';
    renderCards(allSubjects);
    updateStats();
}

// Render cards
function renderCards(subjects) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';

    if (subjects.length === 0) {
        grid.innerHTML = `
            <div class="empty">
                <div class="empty-icon">📭</div>
                <p>No subjects found. Add one!</p>
            </div>`;
        return;
    }

    subjects.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
            <div class="card-top" style="background:${s.color || '#6c63ff'}"></div>
            <div class="card-body">
                <span class="card-badge">${s.category}</span>
                <h3 class="card-title">${s.name}</h3>
                <p class="card-notes">${s.notes || 'No notes added yet.'}</p>
                <div class="card-footer">
                    ${s.link ? `<a class="card-link" href="${s.link}" target="_blank">View Resource →</a>` : '<span></span>'}
                    <button class="delete-btn" onclick="deleteSubject(${s.id})">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Update stats
function updateStats() {
    document.getElementById('total-count').textContent = allSubjects.length;
    const cats = new Set(allSubjects.map(s => s.category));
    document.getElementById('category-count').textContent = cats.size;
}

// Filter subjects
function filterSubjects(category, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    if (category === 'all') {
        renderCards(allSubjects);
    } else {
        renderCards(allSubjects.filter(s => s.category === category));
    }
}

// Add subject
async function addSubject() {
    const name = document.getElementById('input-name').value.trim();
    const category = document.getElementById('input-category').value;
    const notes = document.getElementById('input-notes').value.trim();
    const link = document.getElementById('input-link').value.trim();

    if (!name) { showToast('⚠️ Please enter a subject name'); return; }

    const newSubject = { name, category, notes, link, color: selectedColor };

    try {
        const res = await fetch(`${API}/subjects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSubject)
        });
        if (!res.ok) throw new Error();
        showToast('✅ Subject added!');
    } catch {
        // Add locally if backend offline
        newSubject.id = Date.now();
        allSubjects.push(newSubject);
        showToast('✅ Subject added (demo mode)');
    }

    closeModal();
    clearForm();
    await loadSubjects();
}

// Delete subject
async function deleteSubject(id) {
    try {
        await fetch(`${API}/subjects/${id}`, { method: 'DELETE' });
        showToast('🗑️ Subject deleted');
    } catch {
        allSubjects = allSubjects.filter(s => s.id !== id);
        showToast('🗑️ Subject deleted (demo mode)');
    }
    await loadSubjects();
}

// Modal
function openModal() {
    document.getElementById('modal').classList.add('open');
    document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.getElementById('modal-overlay').classList.remove('open');
}

function clearForm() {
    document.getElementById('input-name').value = '';
    document.getElementById('input-notes').value = '';
    document.getElementById('input-link').value = '';
}

// Color picker
function selectColor(el) {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    selectedColor = el.dataset.color;
}

// Toast
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// Init
loadSubjects();
