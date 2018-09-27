from flask_wtf import FlaskForm
from wtforms import TextField, SelectField, SubmitField
#from wtforms import SelectField, BooleanField, SubmitField, DateField, TextAreaField, FieldList, FormField
import wtforms.validators as formValidators

class AddQuestion(FlaskForm):
    lang = SelectField('Lang', choices=[('en', 'English')])
    question = TextField('Question', validators=[formValidators.Length(max=140)])
    answer1 = TextField('Answer 1', validators=[formValidators.Length(max=70)])
    answer2 = TextField('Answer 2', validators=[formValidators.Length(max=70)])
    submit = SubmitField('Submit')
