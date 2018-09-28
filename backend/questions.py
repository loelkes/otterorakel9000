import random
import pickle
import time

class Questions:
    def __init__(self):
        self.load()
        self.langs = ['en', 'de', 'cn']

    def load(self, file='database.pickle'):
        try:
            self.db = pickle.load(open(file, 'rb'))
            print('Loaded database from file!')
        except:
            self.db = []
            print('Database file not found. Working with new database!')

    def save(self, file='database.pickle'):
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
                element[lang].update(question)
            else:
                element.update({lang: question})
        else:
            # New entry
            entry = {'langs': {lang: question}}
            entry.update({'hits': [[],[]]})
            self.db.append(entry)
        self.save()

    def answer(self, id, lang, choice):
        self.db[int(id)]['hits'][int(choice)].append(time.time())


# For manual testing...
if __name__ == '__main__':
    q = Questions()
