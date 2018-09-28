# Otterorakel9000

## Motivation

During the seminar 'Projektmanagement in live und in Farbe' at the [KIT Karlsruhe](https://www.kit.edu) we had to plan an realize an project as part of the [myhealth-porject](http://myhealth.kit.edu/) of KIT.

The name and design of the polling station is delibaratly crazy to draw attention.

## Goals

The Otterorakel9000 provides a simple tool for getting quick and simple feedback from students. It's a one question and binary answer survey tool. Questions have to be shorter than 140 characters, each answer shorter than 70 characters.

Steering commitees may use it to get a quick feedback at the beginning of a projects or decisions on questions.

* The questions must be short (this forces the operator to get to the essential point) and allow a binary answer like A and B or Yes and No.
* Each survey has one questions. The surveys are displayed in random order. This means that after each question, the user can choose to continue or leave.
* You cannot do extensive surveys where context matters. Please use another tool for that.

## How it works

### Frontend

Please see the folder ```client``` for further information.

* Provides a full screen webpage to run on a table or any computer.
* Provides a webpage for extensive statistics

### Backend

Please see the folder ```backend``` for further information.

* Runs the database, provides the questions for the frontend.
* Give a simplte HTML tool to manage questions.

## License

MIT License. Please see LICENSE file.

This license does NOT apply to the KIT logo.

## Credit

* [Christian](https://github.com/loelkes)
* [Kolja](https://github.com/kolja-esders)
* Ronja
* Yassmine
