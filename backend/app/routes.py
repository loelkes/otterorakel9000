from app import app
from flask import render_template, redirect, url_for, flash, jsonify
from app import questions

@app.route('/')
@app.route('/index')
def index():
    return 'None'

@app.route('/question')
def question():
    return jsonify(questions.getRandom())
