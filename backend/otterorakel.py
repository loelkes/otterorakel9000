from app import app
import os

HOST = os.environ.get('FLASK_HOST') or '127.0.0.1'
PORT = os.environ.get('FLASK_PORT') or '36498'
DEBUG = os.environ.get('FLASK_DEBUG') or False

app.run(host=HOST, port=PORT, debug=DEBUG)
