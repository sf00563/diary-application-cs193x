const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectId;

const DATABASE_NAME = 'diary-entry';
const MONGO_URL = "mongodb://localhost:27017";

let db = null;
let collectionDiaries = null;
let collectionDiaryEntries = null;

async function main() {
  const client = await MongoClient.connect(MONGO_URL);
  db = client.db(DATABASE_NAME);
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

  client.close();
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
    diaryId: ObjectID("62543304291b3b5b59a51ce5"),
    date: curDate.toLocaleDateString()
  };

  const result = await collectionDiaryEntries.findOne(query);
  console.log(`Found: ${result}`);
}

async function insertOrUpdateEntry() {
  const curDate = new Date();
  const query = {
    date: curDate.toLocaleDateString(),
    diaryId: ObjectID("62543304291b3b5b59a51ce5")
  };

  const newEntry = {
    $set: {
      diaryId: ObjectID("62543304291b3b5b59a51ce5"),
      date: curDate.toLocaleDateString(),
      contents: "Peter parks me now"
    }
  }

  const params = {
    upsert: true
  }

  const result = await collectionDiaryEntries.updateOne(query, newEntry, params);
  console.log(`Found: ${result}`);
}
