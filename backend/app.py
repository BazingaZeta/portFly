from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Aggiungi questo per abilitare CORS per tutte le routes

@app.route('/')
def hello():
    return 'Hello, World! This is your Flask backend.'

if __name__ == '__main__':
    app.run(debug=True)