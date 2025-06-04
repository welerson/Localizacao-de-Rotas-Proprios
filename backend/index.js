const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o caminho raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Suas outras rotas da API
app.post('/api/visitados', (req, res) => {
  // Lógica da rota
});

app.get('/api/visitados', (req, res) => {
  // Lógica da rota
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
