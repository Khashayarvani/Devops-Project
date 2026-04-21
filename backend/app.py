from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return """
    <h1>Welcome to My Flask Backend</h1>
    <p>This is the backend application running in Docker.</p>
    <p><a href='/image'>Click here to view the JPG image</a></p>
    """

@app.route('/image')
def image():
    return send_from_directory('.', 'sample.jpg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)