// chunker.js

/**
 * シンプルに「指定文字数ごとに区切って配列で返す」だけの例。
 * 実際には文の切れ目や見出しで区切る工夫をすると精度が上がる。
 */
function chunkText(text, chunkSize = 1000) {
    const chunks = [];
    let startIndex = 0;
  
    while (startIndex < text.length) {
      const endIndex = Math.min(startIndex + chunkSize, text.length);
      chunks.push(text.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
  
    return chunks;
  }
  
  module.exports = {
    chunkText,
  };
  