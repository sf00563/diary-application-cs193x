const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectId;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

const DATABASE_NAME = 'diary-entry';
const MONGO_URL = "mongodb://localhost:27017";

let db = null;
let collectionDiaries = null;
let collectionDiaryEntries = null;

async function startServer() {
  const client = await MongoClient.connect(MONGO_URL);
  db = client.db(DATABASE_NAME);
  collectionDiaries = db.collection('diaries');
  collectionDiaryEntries = db.collection('entries');
  await app.listen(3000);
  console.log('listening on port 3000');
}

startServer();

////////// JSON RETURNING ROUTE

async function createDiary(req, res) {
  console.log("hix1");
  const date = new Date();
  const doc = {
    dateCreated: date.toLocaleDateString()
  };
  const result = await collectionDiaries.insertOne(doc);
  res.json({ id: result.insertedId });
}
app.post('/newDiary', createDiary);

async function getEntryDetail(req, res) {
  console.log("hix2");
  const routeParams = req.params;
  const diaryId = routeParams.id;

  const queryParams = req.query;
  const date = queryParams.date;

  const query = {
    diaryId: ObjectID(diaryId),
    date: date
  };

  const result = await collectionDiaryEntries.findOne(query);

  res.json({ result });
}
app.get('/lookupEntry/:id', getEntryDetail);

async function saveNewDiaryEntry(req, res) {
  console.log("hix3");
  const routeParams = req.params;
  const diaryId = routeParams.id;

  const queryParams = req.query;
  const date = queryParams.date;
  const content = req.body.content;

  const query = {
    date: date,
    diaryId: ObjectID(diaryId)
  };

  const newEntry = {
    $set: {
      diaryId: ObjectID(diaryId),
      date: date,
      content: content
    }
  }

  const params = {
    upsert: true
  }

  const result = await collectionDiaryEntries.updateOne(query, newEntry, params);

  res.json({
    data: result
  });
}
app.post('/newEntry/:id', jsonParser, saveNewDiaryEntry);

/////////// HTML Returning route

async function onAllOtherPaths(req, res) {
  console.log("html");
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', onAllOtherPaths);
