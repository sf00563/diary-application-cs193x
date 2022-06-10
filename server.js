const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

app.post('/newDiary', function (req, res) {
  res.json({ id: '13eujejnfesjnsdfnj' });
});

function getEntryDetail(req, res) {
  const routeParams = req.params;
  const diaryId = routeParams.id;

  const queryParams = req.query;
  const date = queryParams.date;

  res.json({
    content: 'Hello'
  });
}

app.get('/lookupEntry/:id/', getEntryDetail);

function saveNewDiaryEntry(req, res) {
  const routeParams = req.params;
  const diaryId = routeParams.id;

  const queryParams = req.query;
  const date = queryParams.date;

  const content = req.body.content;

  console.log(content);

  res.json({ success: true })
}

app.post('/newEntry/:id', jsonParser, saveNewDiaryEntry);

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
})