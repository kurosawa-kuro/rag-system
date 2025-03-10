// index.js
require("dotenv").config(); // .envなどでOPENAI_API_KEYなどを読み込む想定

const { getTextFromS3 } = require("./s3Helper");
const { chunkText } = require("./chunker");
const { getEmbedding } = require("./embeddingHelper");
const { indexDocument } = require("./opensearchHelper");

// S3 & OpenSearch の設定値
const BUCKET_NAME = "abc-company-20250310";
const INDEX_NAME = "my-index"; // 事前にk-NN設定で作成しておく

// 例：S3上にあるファイル(key)を指定して実行する
(async () => {
  try {
    const fileKey = "data/company_overview.txt"; 
    // or "data/company_overview.txt" etc.

    // 1) S3から文書を取得＆テキスト化
    const originalText = await getTextFromS3(BUCKET_NAME, fileKey);
    console.log("Fetched text length:", originalText.length);

    // 2) チャンク分割
    const chunks = chunkText(originalText, 1000); 
    console.log(`Total Chunks: ${chunks.length}`);

    // 3) 各チャンクをEmbedding & インデックス
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i].trim();

      // 空白や改行だけのチャンクはスキップ
      if (!chunk) continue;

      const embeddingVector = await getEmbedding(chunk);

      // 4) インデックスドキュメント構築
      const docBody = {
        chunk_id: `${fileKey}#chunk-${i}`,
        text: chunk,
        metadata: {
          source_file: fileKey,
          chunk_index: i,
        },
        content_vector: embeddingVector, // ここが knn_vector に対応
      };

      // 5) OpenSearchへ登録
      const result = await indexDocument(INDEX_NAME, docBody);
      console.log(`Indexed chunk ${i}, result:`, result.body);
    }

    console.log("All chunks indexed successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
})();
