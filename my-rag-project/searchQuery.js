// searchQuery.js
require("dotenv").config();
const { getEmbedding } = require("./embeddingHelper");
const { osClient } = require("./opensearchHelper");
// ↑ opensearchHelperで exportした client (または osClient) を読み込む

(async () => {
  try {
    // ❶ 検索したい自然言語クエリ
    const queryText = "What does the company overview say about its mission?";

    // ❷ Embeddingを生成 (1536次元ベクトルが返る)
    console.log("Getting embedding for query:", queryText);
    const queryVector = await getEmbedding(queryText);
    console.log("queryVector length:", queryVector.length); // 1536のはず

    // ❸ k-NN検索リクエスト
    const k = 3; // 上位3件
    const indexName = "my-index";

    const searchResult = await osClient.search({
      index: indexName,
      body: {
        query: {
          knn: {
            content_vector: {
              vector: queryVector, 
              k: k
            }
          }
        }
      }
    });

    // ❹ 検索結果を表示
    console.log("Search hits:", JSON.stringify(searchResult.body.hits.hits, null, 2));
  } catch (err) {
    console.error("Error in searching:", err);
  }
})();
