const { MongoClient } = require("mongodb");

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
}

main();

async function insertDiary() {
  const doc = {
    entryCount: 0
  };

  const result = await collectionDiaries.insertOne(doc);
  console.log(`Document id: ${result.insertedId}`);
}
