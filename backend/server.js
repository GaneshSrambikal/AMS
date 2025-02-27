const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'hello world' });
});

app.listen(5000, () => {
  console.log(`listening at 5000`);
});
