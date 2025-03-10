// embeddingHelper.js
const openai = require("openai");

async function getEmbedding(text) {
  // ここで console.log(openai) して何が入っているか確認してもOK
  const configuration = new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const api = new openai.OpenAIApi(configuration);

  const response = await api.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data.data[0].embedding;
}

module.exports = { getEmbedding };
