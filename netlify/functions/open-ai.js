/*
const { Configuration, OpenAIApi } = require("openai");
const fetch = require("node-fetch");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  // console.log(process.env.OPENAI_API_KEY);

  async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
}
// runCompletion();
*/

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function runCompletion() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
    max_tokens:4000
  });
  return completion;
}

exports.handler = async function(event, context) {
  const completion = await runCompletion();
  return {
    statusCode: 200,
    body: JSON.stringify({ text: completion.data.choices[0].text })
  };
};
