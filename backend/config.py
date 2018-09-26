import os

class FlaskConfig(object):
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY') or 'TuLAsWbcoKr5YhDE'
    BOOTSTRAP_SERVE_LOCAL = os.environ.get('FLASK_BOOTSTRAP_SERVE_LOCAL') or True
    APPLICATION_ROOT = os.environ.get('FLASK_APPLICATION_ROOT') or ''
