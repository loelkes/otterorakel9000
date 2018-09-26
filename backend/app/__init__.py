from config import FlaskConfig

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from questions import Questions

app = Flask(__name__)
app.config.from_object(FlaskConfig)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

questions = Questions()

Bootstrap(app)

from app import routes, filters
