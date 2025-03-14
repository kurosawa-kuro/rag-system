// searchQuery.js
require("dotenv").config();
const { getEmbedding } = require("./embeddingHelper");
const { osClient } = require("./opensearchHelper");

(async () => {
  try {
    // 1) 検索クエリ
    const queryText = "ABC会社のミッションを教えてください";
    const queryVector = await getEmbedding(queryText);

    // 2) k-NN検索実行
    const indexName = "my-index";
    const k = 3;
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

    // 3) 検索ヒットを変数に格納
    const hits = searchResult.body.hits.hits;

    // 4) コンソール出力
    console.log(`\n=== Search Results for query: "${queryText}" (Top ${k}) ===`);

    hits.forEach((hit, i) => {
      console.log(`\n[Result #${i + 1}]`);
      console.log("Score:", hit._score);
      console.log("Chunk Text:", hit._source.text);
      console.log("Metadata:", hit._source.metadata);
    });

  } catch (err) {
    console.error("Error in searching:", err);
  }
})();
