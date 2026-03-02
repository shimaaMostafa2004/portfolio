const express = require('express');
const path = require('path');

const app = express();
const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Portfolio is running on http://${host}:${port}`);
});
