// opensearchHelper.js
const { Client } = require("@opensearch-project/opensearch");
require('dotenv').config();

// OpenSearchクライアントのインスタンスを osClient という変数名で作成
const osClient = new Client({
  node: process.env.OPENSEARCH_NODE,
  auth: {
    username: process.env.OPENSEARCH_USERNAME,
    password: process.env.OPENSEARCH_PASSWORD
  }
});

/**
 * インデックスに文書を登録 (k-NN用のベクトルフィールドを含む)
 * @param {string} indexName - インデックス名
 * @param {object} doc - 登録するドキュメント
 */
async function indexDocument(indexName, doc) {
  // osClient の index() メソッドを使ってドキュメントを登録
  const result = await osClient.index({
    index: indexName,
    body: doc,
  });
  return result;
}

// osClient と indexDocument をエクスポート
module.exports = {
  osClient,
  indexDocument,
};
