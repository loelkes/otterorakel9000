from flask_wtf import FlaskForm
from wtforms import TextField, SelectField, SubmitField, HiddenField, FormField
#from wtforms import SelectField, BooleanField, SubmitField, DateField, TextAreaField, FieldList, FormField
import wtforms.validators as formValidators

class AddQuestion(FlaskForm):
    id = TextField('ID', default='-1')
    language = SelectField('Language', choices=[('en', 'English'), ('de', 'Deutsch'), ('cn', u'中文字')])
    question = TextField('Question', validators=[formValidators.Length(max=140)], render_kw = {'placeholder': 'Question?'})
    answer1 = TextField('Answer 1', validators=[formValidators.Length(max=70)], render_kw = {'placeholder': 'Option 1'})
    answer2 = TextField('Answer 2', validators=[formValidators.Length(max=70)], render_kw = {'placeholder': 'Option 2'})
    submit = SubmitField('Submit')
