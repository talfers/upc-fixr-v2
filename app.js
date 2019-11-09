// Express app setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup static dir
app.use(express.static(__dirname + '/public'));

// BodyParser Setup
app.use(express.urlencoded({extended: false}));

// Get upload route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/upload.html');
});

// Post results route
app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/views/results.html');
});

// Start express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
