const express = require('express');
const multer = require('multer');
const axios = require('axios');
var cors = require('cors')


const app = express();
app.use(cors())


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileContent = req.file.buffer.toString();

  try {
    const response = await axios.post('https://api.textrazor.com/', {
      extractors: 'entities',
      text: fileContent,
    }, {
      headers: {
        'x-textrazor-key': 'da9b3057abc7c42d72eee663b74b5f6a97dcc4fb1e13bad5602361f1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing file');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
