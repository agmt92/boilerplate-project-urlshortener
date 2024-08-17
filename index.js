require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const shortid = require('shortid');
const dns = require('dns');
const bodyParser = require('body-parser'); 

const app = express();
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// Define URL Schema
const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
});

const Url = mongoose.model('Url', urlSchema);

module.exports = app;

// create short url
app.post('/api/shorturl', async (req, res) => {
  const originalUrl = req.body.url; 
  const urlRegex = /https?:\/\/www\.\w+\.\w+/;
  const urlMatch = originalUrl.match(urlRegex);

  if (!urlMatch) {
    res.json({ error: 'invalid url' });
  } else {
    try {
      const existingUrl = await Url.findOne({ original_url: originalUrl });

      if (existingUrl) {
        res.json({
          original_url: existingUrl.original_url,
          short_url: existingUrl.short_url
        });
      } else {
        const urlObj = new Url({
          original_url: originalUrl,
          short_url: shortid.generate()
        });

        const data = await urlObj.save();
        console.log('URL saved:', data);
        res.json({
          original_url: data.original_url,
          short_url: data.short_url
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


app.get('/api/allurls', async (req, res) => {
  try {
    const urls = await Url.find({});
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to clear all URLs
app.delete('/api/a-hacker-cleared-my-db', async (req, res) => {
  try {
    console.log('Clearing all URLs');
    await Url.deleteMany({});
    res.json({ message: 'All URLs have been cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Redirect to original URL

app.get('/api/shorturl/:short_url', async (req, res) => {
  try {
    let short_url = req.params.short_url;
    const url = await Url.findOne({ short_url
    });


    if (url) {
      console.log('Redirecting to:', url.original_url);
      res.redirect
      (url.original_url);
    }
    else {
      res.json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
);