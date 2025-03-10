// opensearchHelper.js
const { Client } = require("@opensearch-project/opensearch");

/**
 * OpenSearch クライアントのセットアップ
 *  - endpoint: 自分のドメインのエンドポイントを設定
 */
const client = new Client({
    node: "https://search-abc-company-3-viafjf6tndjbkgztqtwadgyiai.ap-northeast-1.es.amazonaws.com",
    auth: {
      username: "abc-company-user",
      password: "abc-company-Pw1!"
    }
  });

/**
 * インデックスに文書を登録 (k-NN用のベクトルフィールドを含む)
 * @param {string} indexName - インデックス名
 * @param {object} doc - 登録するドキュメント
 */
async function indexDocument(indexName, doc) {
  const result = await osClient.index({
    index: indexName,
    body: doc,
  });
  return result;
}

module.exports = {
  osClient,
  indexDocument,
};
