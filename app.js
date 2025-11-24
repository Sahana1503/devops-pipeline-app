const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>DevOps CI/CD Pipeline Demo</h1><p>Deployed using Jenkins and Docker!</p>');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

