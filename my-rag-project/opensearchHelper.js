// opensearchHelper.js
const { Client } = require("@opensearch-project/opensearch");

/**
 * OpenSearch クライアントのセットアップ
 *  - endpoint: 自分のドメインのエンドポイントを設定
 */
const osClient = new Client({
  node: "https://search-abc-company-3-viafjf6tndjbkgztqtwadgyiai.ap-northeast-1.es.amazonaws.com", 
  // ↑ OpenSearchのエンドポイントURLを指定
  // AWS SigV4認証を使う場合は別途@opensearch-project/opensearch/aws 
  // を使った署名プラグインなどが必要になる場合があります。
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
