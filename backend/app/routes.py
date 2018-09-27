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
def question(id=None):
    try:
        id = int(id)
        if id >= 0 and id < len(questions.db):
            return jsonify(questions.db[int(id)])
        else:
            return jsonify(questions.getAll())
    except ValueError:
        id = 'all'
        return jsonify(questions.getAll())
    except TypeError:
        return jsonify(questions.getRandom())

@app.route('/add', methods=['POST'])
def addQ():
    form = AddQuestion()
    if form.validate_on_submit():
        questions.update(form.id.data,form.language.data,form.question.data,[form.answer1.data,form.answer2.data])
    return redirect(url_for('overview'))

@app.route('/delete/<id>')
def delete(id):
    questions.delete(int(id))
    return redirect(url_for('overview'))

@app.route('/answer/<id>/<lang>/<choice>')
def answer(id, lang, choice):
    questions.answer(int(id), lang, int(choice))
    return jsonify({'status': True})

@app.route('/overview')
def overview():
    form = AddQuestion()
    return render_template('overview.html', questions=questions.db, form=form)

@app.route('/statistics')
def statistics():
    return render_template('statistics.html', db=questions.db)
