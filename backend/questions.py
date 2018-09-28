import random
import pickle
import time

class Questions:
    def __init__(self):
        self.load()
        self.langs = ['en', 'de', 'cn']

    def load(self, file='database.pickle'):
        """Load database from pickle file. Creaty empty DB if no file found"""
        try:
            # Load from file.
            self.db = pickle.load(open(file, 'rb'))
        except:
            # Loading failed, create empty database.
            self.db = []

    def save(self, file='database.pickle'):
        """Save the current database to a pickle file."""
        pickle.dump(self.db, open(file, 'wb'))

    def getRandom(self):
        """Get a random question from the database."""
        id = random.randint(0, len(self.db)-1)
        q = {'id': id}
        q.update(self.db[id])
        return q

    def getAll(self):
        """Return all questions with ids"""
        output = []
        for id, question in enumerate(self.db):
            question.update({'id': id})
            output.append(question)
        return output

    def delete(self, id=None):
        """Delete a question from the database and save it to the file."""
        try:
            self.db.pop(id)
            self.save()
        except IndexError:
            pass

    def update(self, id=None, lang='en', text=None, answers=None):
        """Update question in the database."""
        question = {'question': text, 'answers': answers}
        if 0 <= int(id) < len(self.db) and lang in self.langs:
            # Element is in the database, language is supported
            element = self.db[int(id)]['langs']
            if lang in element:
                # Update element if language is present
                element[lang].update(question)
            else:
                # Create new element if language not found.
                element.update({lang: question})
        else:
            # New entry
            entry = {'langs': {lang: question}}
            entry.update({'hits': [[],[]]})
            self.db.append(entry)
        # Save the database.
        self.save()

    def answer(self, id, lang, choice):
        # Enter an answer in the database with the current timestamp.
        self.db[int(id)]['hits'][int(choice)].append(time.time())
