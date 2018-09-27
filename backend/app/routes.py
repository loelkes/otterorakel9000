from app import app
from flask import render_template, redirect, url_for, flash, jsonify
from app import questions
from app.forms import AddQuestion
import lorem

@app.route('/')
@app.route('/index')
def index():
    return lorem.text()

@app.route('/question/')
@app.route('/question/<id>')
def question(id=0):
    if int(id) > 0:
        return jsonify(questions.db)
    else:
        return jsonify(questions.getRandom())

@app.route('/add', methods=['POST'])
def addQ():
    form = AddQuestion()
    if form.validate_on_submit():
        questions.update(len(questions.db),form.lang.data,form.question.data,[form.answer1.data,form.answer2.data])
    return redirect(url_for('stats'))

@app.route('/delete/<id>')
def delete(id):
    questions.delete(int(id))
    return redirect(url_for('stats'))

@app.route('/answer/<id>/<lang>/<choice>')
def answer(id, lang, choice):
    questions.answer(int(id), lang, int(choice))
    return jsonify({'status': True})

@app.route('/stats')
def stats():
    form = AddQuestion()
    return render_template('stats.html', questions=questions.db, form=form)
