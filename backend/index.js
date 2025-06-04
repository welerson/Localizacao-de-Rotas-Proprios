const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let visitados = [];

app.post('/api/visitados', (req, res) => {
  const { nome, tipo, latitude, longitude, viatura } = req.body;
  visitados.push({ nome, tipo, latitude, longitude, viatura, data: new Date().toISOString() });
  res.send("OK");
});

app.get('/api/visitados', (req, res) => {
  res.json(visitados);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
