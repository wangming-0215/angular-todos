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
    res.status(500);
    res.send({
      error: 'Server Internal Error'
    });
  }
  let id = String(Date.now()).substr(-5);
  let todo = {
    id,
    content: body.content,
    complete: false
  };
  let result = await writeFile(JSON.parse(data), todo);
  res.send({
    data: todo
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
  let completedIndex = json.data.findIndex(todo => todo.id == id);
  let completedTodo = json.data[completedIndex];
  completedTodo.complete = body.complete;
  let result = await writeFile(json, completedTodo, completedIndex);
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

async function writeFile(content, data, index) {
  if (!content.data) {
    content = { data: [data] };
  } else {
    if (typeof index !== 'undefined') {
      content.data[index] = data;
    } else {
      content.data.push(data);
    }
  }
  let json = JSON.stringify(content);
  return new Promise((resolve, reject) => {
    fs.writeFile('./todos.json', json, err => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
}
