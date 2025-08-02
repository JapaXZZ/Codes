import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const HUGGINGFACE_API_KEY = 'Dsv4NpZBe0T23dTuSku956zKGDfbFVDQse7yETap';

app.post('/gerar-redacao', async (req, res) => {
  const { tema } = req.body;
  if (!tema) return res.status(400).json({ error: 'Tema é obrigatório.' });

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `Tema da redação: ${tema}. Desenvolva uma redação clara e envolvente.`
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error });

    const textoGerado = data[0]?.generated_text || 'Não foi possível gerar texto.';

    // Usamos o tema como título e o texto gerado como redação
    res.json({ titulo: tema, texto: textoGerado });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));