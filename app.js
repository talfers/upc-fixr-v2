// APP CONFIG
// Express app setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const {spawn} = require('child_process');

// Setup static dir
app.use(express.static(__dirname + '/public'));

// Multer storage config
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './public/uploads/');
  },
  filename: function(req, file, callback){
    callback(null, 'uploadedExcelFile.xlsx');
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
  !req.file?res.redirect("/"):runPython(req, res);
})

// SERVER CONFIG
// Start express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// EXTERNAL SCRIPT
// Python run function
async function runPython(req, res) {
  let scriptData = {output: [], errors: []};
  const subprocess = await spawn('python', [
    "-u",
    path.join(__dirname, '/public/lib/upcfixr.py'),
    req.body.manid,
    req.body.brandid
  ]);
  subprocess.stderr.on('data', (error) => {
    scriptData.errors.push(error.toString());
  })
  subprocess.stdout.on('data', (data) => {
    scriptData.output.push(data.toString());
  })
  subprocess.on('close', () => {
    console.log("All done!");
    if(scriptData.errors.length > 0) {
      console.log('THERE WERE ERRORS!');
      console.log(scriptData.errors);
      res.sendFile(__dirname + '/views/error.html');
    } else {
      console.log("SUCCESS!");
      console.log(scriptData.output);
      res.sendFile(__dirname + '/views/results.html');
    }
  });
}
