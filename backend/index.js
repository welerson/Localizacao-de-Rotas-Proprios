// backend_gcmbh_api/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const SHEET_ID = "1zbQNyqoV-928G8biPusPnKO6Ey4PizbD_wf3w5srSj8";
const SHEET_NAME = "Visitados";

// Autenticação com conta de serviço
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

app.post("/api/visitados", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const { nome, tipo, latitude, longitude, viatura } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), nome, tipo, latitude, longitude, viatura]]
      }
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error("Erro ao gravar no Google Sheets:", error);
    res.status(500).send("Erro interno");
  }
});

app.get("/api/visitados", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:F`
    });

    const linhas = response.data.values || [];

    const dados = linhas.map(linha => ({
      nome: linha[1],
      tipo: linha[2],
      latitude: linha[3],
      longitude: linha[4],
      viatura: linha[5]
    }));

    res.status(200).json(dados);
  } catch (error) {
    console.error("Erro ao ler do Google Sheets:", error);
    res.status(500).send("Erro interno");
  }
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  
