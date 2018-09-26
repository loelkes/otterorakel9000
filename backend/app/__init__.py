from flask import Flask
from flask_bootstrap import Bootstrap
from config import FlaskConfig

app = Flask(__name__)
app.config.from_object(FlaskConfig)

Bootstrap(app)

from app import routes
from app import filters
