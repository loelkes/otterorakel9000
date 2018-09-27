# Backend for the Otterorakel9000

What does this do?
* Hold the questions
* Deliver the questions to the frontend
* Collect statistics

## Interface

### Questions
* ```/question``` gives one random question
* ```/question/<id>``` gives the question with id set in ```<id>```

Each question is delivered as JSON:
```
{
  "hits": [
    0,
    0
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

### Answer

```
/answer/<id>/<lang>/<choice>
```

#### Example
Perfom a request with
```
/answer/1/en/1
```
and the server will return
```
{
  "status": true
}
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
