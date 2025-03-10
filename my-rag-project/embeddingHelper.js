// embeddingHelper.js
const { Configuration, OpenAIApi } = require("openai");

/**
 * OpenAI Embeddingを呼び出してベクトルを返すヘルパー関数。
 * - モデル: text-embedding-ada-002 (現時点でdim=1536)
 */
async function getEmbedding(text) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // 環境変数から読み込む想定
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });

  // response.data.data[0].embedding に配列が格納される
  return response.data.data[0].embedding;
}

module.exports = {
  getEmbedding,
};
