const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/api/prices', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd');
    
    if (!response.ok) throw new Error("Respuesta no OK");

    const data = await response.json();

    const prices = {
      bitcoin: { usd: data.bitcoin.usd },
      ethereum: { usd: data.ethereum.usd },
      litecoin: { usd: data.litecoin.usd }
    };

    res.json(prices);
  } catch (error) {
    console.error("Error al traer datos externos:\n", error);
    res.status(500).json({ error: 'Error al traer precios' });
  }
});
