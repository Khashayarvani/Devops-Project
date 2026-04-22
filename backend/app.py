from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DevOps Project | Ishara & Khashayar</title>

        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            body {
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9);
                color: white;
            }

            .card {
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(12px);
                padding: 40px;
                border-radius: 16px;
                text-align: center;
                max-width: 700px;
                width: 90%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255,255,255,0.1);
            }

            h1 {
                font-size: 32px;
                margin-bottom: 10px;
            }

            h2 {
                font-size: 22px;
                color: #38bdf8;
                margin-bottom: 20px;
            }

            p {
                color: #cbd5f5;
                margin-bottom: 25px;
                line-height: 1.6;
            }

            .btn {
                display: inline-block;
                padding: 12px 20px;
                background: linear-gradient(135deg, #3b82f6, #06b6d4);
                border-radius: 10px;
                color: white;
                text-decoration: none;
                font-weight: bold;
                transition: 0.3s;
            }

            .btn:hover {
                transform: scale(1.05);
                background: linear-gradient(135deg, #2563eb, #0891b2);
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>DevOps Project</h1>
            <h2>by Ishara & Khashayar</h2>
            <p>
                Welcome to our Cloud DevOps project.
                It is a simple, container-ready web service.
            </p>
            <a class="btn" href="/image">View Project Image</a>
        </div>
    </body>
    </html>
    """

@app.route("/image")
def show_image():
    return send_from_directory(".", "shark.png")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)