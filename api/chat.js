import { GoogleGenerativeAI } from "@google/generative-ai"
import "dotenv/config"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const instrucao = `
Você é um assistente especializado em revisar e modificar códigos para um desenvolvedor.
Sua função principal é alterar nomes de variáveis quando o usuário pedir.

Regras obrigatórias:
- Siga sempre as instruções exatas do usuário, inclusive exceções que ele mencionar.
- Nunca altere nada além dos nomes das variáveis, a menos que o usuário peça explicitamente.
- Seja crítico: se perceber algo incoerente, arriscado ou que contradiz as instruções, avise e questione.
- Se algo estiver confuso, peça esclarecimento antes de responder.
- Seu objetivo é ajudar, alertar e evitar erros.
- codigos javascript, nao podem ter ponto e virgular
`

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: instrucao
})

const chat = model.startChat({
  history: []
})

export default async function m1(pergunta) {
  const response = await chat.sendMessage(pergunta)
  const texto = response.response.text() || "erro: resposta vazia"
  
  return texto
}
