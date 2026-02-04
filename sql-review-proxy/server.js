const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK =
  'https://n8n-ccoe-center.arisetech.dev/webhook-test/sql-review';

app.post('/sql-review', async (req, res) => {
  try {
    const r = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Proxy running at http://localhost:3000/sql-review');
});
