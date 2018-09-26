from app import app
from datetime import datetime
from flask import Markup

@app.template_filter('datetimeFormat')
def datetimeFormat(value, format='%Y-%m-%d %H:%M'):
    date = datetime.fromtimestamp(value)
    return date.strftime(format)
