# Backend for the Otterorakel9000

What does this do?
* Hold the questions.
* Deliver the questions to the frontend.
* Collect statistics.

## Human interface

The overview with an HTML-Interface can be found at ```/overview```.

Adding a new question:
* Existing questions can be overwritten. Type the ID of the question you want to overwrite in the ID field and update the question. statistics will not be reset!
* New questions are added if the id is not found in the database (e.g. ```-1```).

## API

For now, only three languages (en, de, cn) are supported but it can be extend to all languages through minor code changes.

### Questions
* ```GET /question``` gives one random question
* ```GET /question/<id>``` gives the question with id set in ```<id>```
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
```
POST /add
```
#### Delete a question
```
GET /delete/<id>
```
### Answer
```
GET /answer/<id>/<lang>/<choice>
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
$ pip install -r requirements.txt
```
3. Run the uwsgi with
```
$ uwsgi -s /tmp/otter.sock --manage-script-name --mount=/otter=app:app --chmod-socket=666
```
Don't forget to set the path to your python virtualenv with
```--virtualenv /dir/to/your/venv/```
if needed.

4. Run nginx with this in the config
```
server {
        listen 80;
        server_name irgendeindomain.name;

        location / {
                include uwsgi_params;
                uwsgi_pass unix:/tmp/otter.sock;
        }
```
