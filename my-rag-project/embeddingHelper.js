// embeddingHelper.js
const { Configuration, OpenAIApi } = require('openai');

async function getEmbedding(text) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data.data[0].embedding;
}

module.exports = { getEmbedding };
