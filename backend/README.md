# Backend for the Otterorakel9000

What does this do?
* Hold the questions
* Deliver the questions to the frontend
* Collect statistics

## Interface

Howto add, remove, change, or get questions from the database

The overview with an HTML-Interface can be found at ```/overview``.

### Questions
* ```/question``` gives one random question
* ```/question/<id>``` gives the question with id set in ```<id>```
 * Leaving ```id``` empty returns a random question
 * If ```id``` points to a question in the database, this question element will be returned
 * Everything else returns all questions of the database.

Structure of a question element:
```
{
  "hits": [
    [],
    []
  ],
  "id": 1,
  "langs": {
    "en": {
      "answers": [
        "Treppe",
        "Aufzug"
      ],
      "question": "Treppe oder Aufzug?"
    }
  }
}
```
Each time a question is answered, the unix timestamp of that omment is added to the list of hits.
#### Add / update a question

TBD

#### Delete a question

```
/delete/<id>
```

### Answer

```
/answer/<id>/<lang>/<choice>
```

This returns a JSON with either true or false as status. At this time, the language parameter is ignored for statistics.
```
{'status': true}
```
## Requirements
* python3, pip
* nginx or similar to deliver the page

## Install
1. Clone this repository
2. Install everything with
```
pip install -r requirements.txt
```
3. Run the uwsgi with
```
uwsgi -s /tmp/otter.sock --manage-script-name --mount=/otter=app:app  --virtualenv /dir/to/your/venv/ --chmod-socket=666
```
4. Run nginx with this in the config
```
location / {
        include uwsgi_params;
        uwsgi_pass unix:/tmp/otter.sock;
}
```
