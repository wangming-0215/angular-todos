const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  let data;
  try {
    data = await readFile();
  } catch (e) {
    res.status(500);
    res.send({ error: 'Server Internal Error' });
  }
  res.status(200);
  res.send(data);
});

app.post('/add', async (req, res) => {
  let body = req.body;
  let data;
  try {
    data = await readFile();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({
      error: 'Server Internal Error'
    });
  }
  let todos = addTodo(body, data);
  let result = await writeFile(todos);
  res.send({
    data: todos
  });
});

app.post('/complete/:id', async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let json;
  try {
    let data = await readFile();
    json = JSON.parse(data);
  } catch (e) {
    res.status(500);
    res.send({
      error: 'Server Internal Error'
    });
  }
  let todos = completedTodo(id, json.data);
  let result = await writeFile(todos);
  res.status(200);
  res.send({
    data: completedTodo
  });
});

app.listen(3000, err => {
  if (err) {
    console.error(`error: ${error}`);
    process.exit(1);
  }
  console.log(`server starting on port: 3000`);
});

function addTodo(body, todos) {
  todos = JSON.parse(todos).data;
  console.log(todos);
  let id = String(Date.now()).substr(-5);
  let todo = {
    id,
    content: body.content,
    complete: false
  };
  todos.push(todo);
  return todos;
}

function completedTodo(id, todos) {
  let completedTodo = todos.find(todo => todo.id === id);
  completedTodo.complete = true;
  return todos;
}

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./todos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function writeFile(data) {
  let todos = {
    data: data
  };
  let json = JSON.stringify(todos);
  return new Promise((resolve, reject) => {
    fs.writeFile('./todos.json', json, err => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
}
