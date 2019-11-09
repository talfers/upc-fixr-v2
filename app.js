// APP CONFIG
// Express app setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup static dir
app.use(express.static(__dirname + '/public'));

// Multer storage config
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './public/uploads/')
  },
  filename: function(req, file, callback){
    callback(null, 'uploadedFileToCsv.csv')
  }
});

const upload = multer({ storage: storage });

// ROUTES
// Get upload route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/upload.html');
});

// Post results route
app.post('/results', upload.single('file'), (req, res) => {
  //console.log(req.body.manid);
  //console.log(req.body.brandid);
  res.sendFile(__dirname + '/views/results.html');
});


// SERVER CONFIG
// Start express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
