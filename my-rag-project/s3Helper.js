// s3Helper.js
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const pdfParse = require("pdf-parse");

// S3クライアント（IAMロールでアクセスするなら、Lambda等でクレデンシャルが自動付与される想定）
const s3Client = new S3Client({ region: "ap-northeast-1" }); // リージョンは適宜変更

/**
 * S3からファイルをダウンロードし、テキストを抽出して返す
 * PDFの場合: pdf-parseを使ってテキスト化
 * テキスト(.txt)の場合: そのまま文字列として返す
 */
async function getTextFromS3(bucket, key) {
  const getObjectParams = {
    Bucket: bucket,
    Key: key,
  };
  const data = await s3Client.send(new GetObjectCommand(getObjectParams));

  // data.Body はストリームなので、バッファにしてから処理する
  const fileBuffer = await streamToBuffer(data.Body);

  if (key.endsWith(".pdf")) {
    // PDF -> テキスト抽出
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
  } else if (key.endsWith(".txt")) {
    // すでにテキストファイルなら文字列として処理
    return fileBuffer.toString("utf-8");
  } else {
    throw new Error("Unsupported file type. Only PDF or TXT are handled in this example.");
  }
}

// ヘルパー: ストリームをバッファに変換
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

module.exports = {
  getTextFromS3,
};
