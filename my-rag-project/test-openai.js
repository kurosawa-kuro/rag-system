// test-openai.js
console.log("Node.js version:", process.version);

const openai = require("openai");
console.log("openai keys:", Object.keys(openai));

try {
  const { Configuration, OpenAIApi } = openai;
  console.log("Configuration type:", typeof Configuration);
  console.log("OpenAIApi type:", typeof OpenAIApi);

  const config = new Configuration({ apiKey: "dummy" });
  console.log("Configuration instance created:", config);
} catch (e) {
  console.error("Error occurred:", e);
}
