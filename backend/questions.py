import random
import pickle

class Questions:
    def __init__(self):
        self.load()

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

    def delete(self, id=None):
        try:
            self.db.pop(id)
            self.save()
        except IndexError:
            pass

    def update(self, id=None, lang=None, question=None, answers=None):
        """Update question in the database."""
        if lang and question and isinstance(answers, list):
            entry = {'langs': {'en': {'question': question, 'answers': answers}}}
            try:
                self.db[id].update(entry)
            except IndexError:
                entry.update({'hits': [0]*2})
                self.db.append(entry)
            print(entry)
            self.save()

    def answer(self, id, lang, choice):
        self.db[int(id)]['hits'][int(choice)] += 1


# For manual testing...
if __name__ == '__main__':
    q = Questions()
