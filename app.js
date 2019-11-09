const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/upload.html');
});

app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/views/results.html');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
