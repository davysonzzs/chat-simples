import m1 from './chat.js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Método não permitido" });
  }

  try {
    const pergunta = req.body.pergunta;

    if (!pergunta) {
      return res.status(400).json({ msg: "pergunta está vazia" });
    }

    const resposta = await m1(pergunta);
    res.status(200).json({ resposta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "deu merda" });
  }
}
