const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// enable cors
app.use(cors());

// set up storage
// multer is middleware that processes file uploads -> 
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const upload = multer({
    storage
});

// this is the enpoint /upload
// why app.post can accept all these arguments
app.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        res.status(400).send('No puta file uploaded');
    }
    res.send({
        message: 'File uploaded',
        file: req.file.filename
    })
}
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
