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

console.log('this should absolutely log');
const newTitle = document.querySelector('h1');
newTitle.innerHTML = 'this is another test';

const scrape = document.querySelector('#scrape');

scrape.addEventListener("click", () => {

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["contentScript.js"]
    }, function() {
      console.log("Content script has been injected.");
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('i heard a message');
    if (request.action == "extractedData") {
      var data = request.data; // The extracted data
      // Now you can use this data in your popup
      const newTitle = document.createElement('h2');
      console.log(data);
      newTitle.textContent = data;
      document.body.appendChild(newTitle);
    }
  });

})
