import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post('/gerar-redacao', async (req, res) => {
  const { tema } = req.body;
  if (!tema) return res.status(400).json({ error: 'Tema é obrigatório.' });

  try {
    const prompt = `Crie um título e uma redação completa e argumentativa sobre o seguinte tema:\n"${tema}".\nRetorne no seguinte formato:\nTítulo: <título>\nRedação: <redação>`;
    
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.9,
      max_tokens: 1000
    });

    const resposta = completion.data.choices[0].message.content;

    const titulo = resposta.match(/Título: (.*)/)?.[1] || 'Título não encontrado';
    const redacao = resposta.match(/Redação:([\s\S]*)/)?.[1]?.trim() || 'Redação não encontrada';

    res.json({ titulo, texto: redacao });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar redação.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Servidor rodando na porta ${port}`));
