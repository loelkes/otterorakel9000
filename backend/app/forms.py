from flask_wtf import FlaskForm
from wtforms import StringField
#from wtforms import SelectField, BooleanField, SubmitField, DateField, TextAreaField, FieldList, FormField
import wtforms.validators as formValidators

class Overview(FlaskForm):
    test = StringField(label = 'Rolle', validators = [])
