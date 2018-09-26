from app import app
from flask import render_template, redirect, url_for, flash

@app.route('/')
@app.route('/index')
@app.route('/status')
def status():
    return 'None'
