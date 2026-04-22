const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const quotes = [
  "Success is the sum of small efforts repeated day in and day out.",
  "Do something today that your future self will thank you for.",
  "Focus on progress, not perfection.",
  "Small steps every day lead to big results.",
  "Discipline is choosing what you want most over what you want now."
];

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth"
  });
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = taskText;

  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
    updateTaskCounts();
  });

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    updateTaskCounts();
  };

  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  updateTaskCounts();
}

function updateTaskCounts() {
  const tasks = taskList.querySelectorAll("li");
  const checkedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked');

  completedCount.textContent = checkedTasks.length;
  pendingCount.textContent = tasks.length - checkedTasks.length;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Focus session completed!");
      timeLeft = 25 * 60;
      updateTimerDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").textContent = quotes[randomIndex];
}

updateTimerDisplay();
updateTaskCounts();