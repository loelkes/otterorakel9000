import random

class Questions:
    def __init__(self):
        pass
        self.id = 0
        self.db = [
            {'question': 'Schnitzel oder Salat?', 'answers': ['Schnitzel', 'Salat']},
            {'question': 'Aufzug oder Treppe?', 'answers': ['Aufzug', 'Treppe']},
            {'question': 'Fühlst du dich Gesund', 'answers': ['Ja', 'Nein']},
            {'question': 'Gibt es genug Sportkurse am KIT?', 'answers': ['Ja', 'Nein']}
        ]

    def getRandom(self):
        """Get a random question from the database."""
        return random.choice(self.db)

    def add(self):
        """Add question to the database."""
        pass

    def delete(self):
        """Delete question from database."""
        pass

    def update(self):
        """Update question in the database."""
        pass

# For manual testing...
if __name__ == '__main__':
    questions = Questions()
    print(questions.getRandom())
