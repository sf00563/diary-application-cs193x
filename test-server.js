const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectId;

const DATABASE_NAME = 'diary-entry';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
let collectionDiaries = null;
let collectionDiaryEntries = null;

async function main() {
  db = await MongoClient.connect(MONGO_URL);
  collectionDiaries = db.collection('diaries');
  collectionDiaryEntries = db.collection('entries');

  console.log('Insert Diary');
  await insertDiary();
  console.log('--------------');

  console.log('Find Entry');
  await findEntry();
  console.log('--------------');

  console.log('Insert or update Entry');
  await insertOrUpdateEntry();

  db.close();
}

main();

async function insertDiary() {
  const date = new Date();
  const doc = {
    dateCreated: date.toLocaleDateString()
  };

  const result = await collectionDiaries.insertOne(doc);
  console.log(`Document id: ${result.insertedId}`);
}

async function findEntry() {
  const curDate = new Date();
  const query = {
    diaryId: ObjectID('12EUFSDUJFDSKJDSJK'),
    date: curDate.toLocaleDateString()
  };

  const result = await collectionDiaryEntries.findOne(query);
  console.log(`Found: ${result}`);
}

async function insertOrUpdateEntry() {
  const query = {
    _id: ObjectID('14238345rfjsdmndsf8348345')
  };

  const newEntry = {
    diaryId: ObjectID('12EUFSDUJFDSKJDSJK'),
    date: curDate.toLocaleDateString(),
    contents: "Peter parker"
  }

  const params = {
    upsert: true
  }

  const result = await collectionDiaryEntries.update(query, newEntry, params);
  console.log(`Found: ${result}`);
}
