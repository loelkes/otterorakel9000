import os

basedir = os.path.abspath(os.path.dirname(__file__))


class FlaskConfig(object):
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY') or 'TuLAsWbcoKr5YhDE'
    BOOTSTRAP_SERVE_LOCAL = os.environ.get('FLASK_BOOTSTRAP_SERVE_LOCAL') or True
    APPLICATION_ROOT = os.environ.get('FLASK_APPLICATION_ROOT') or ''
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
