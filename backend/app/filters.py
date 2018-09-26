from app import app
from datetime import datetime
from flask import Markup

@app.template_filter('datetimeFormat')
def datetimeFormat(value, format='%Y-%m-%d %H:%M'):
    date = datetime.fromtimestamp(value)
    return date.strftime(format)

@app.template_filter('deviceOnline')
def deviceOnline(value):
    if value:
        return Markup('<span class="label label-success">Ja</span>')
    else:
        return Markup('<span class="label label-danger">Nein</span>')
