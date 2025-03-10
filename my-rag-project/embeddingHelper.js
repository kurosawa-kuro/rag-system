// embeddingHelper.js (CommonJS版)

// ❶ 新しいクラス/オブジェクトの呼び出し
const { OpenAI } = require('openai');

async function getEmbedding(text) {
  // ❷ OpenAI インスタンスを生成
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
    // ここに organization 等を入れる場合も
  });

  // ❸ Embeddings APIを呼ぶ
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text
  });

  // ❹ 新ライブラリでは response.data が配列になっている
  //    旧ライブラリとは構造が違うので注意
  return response.data[0].embedding;
}

module.exports = { getEmbedding };
