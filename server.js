const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/prices', async (req, res) => {
  try {
    const response = await fetch(
  'https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,litecoin');
    const data = await response.json();

    const prices = {
      bitcoin: { usd: parseFloat(data.data[0].priceUsd).toFixed(2) },
      ethereum: { usd: parseFloat(data.data[1].priceUsd).toFixed(2) },
      litecoin: { usd: parseFloat(data.data[2].priceUsd).toFixed(2) }
    };

    res.json(prices);
  } catch (error) {
    console.error(error);
    console.error("Error al traer datos externos:", error);
  res.status(500).json({ error: 'Error al traer precios' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
