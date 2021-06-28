const express = require('express');
const app = express();
const serverless = require('serverless-http')
const cors = require('cors');
const router = require('./routes/posts');

app.use(cors());

app.use(`/.netlify/functions/api`, router)

module.exports = app;
module.exports.handler = serverless(app);