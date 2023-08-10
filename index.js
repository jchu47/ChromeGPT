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

function getSentiment(text) {
  console.log(text);
  const url = 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'cc6d546621msh5332edea6a65114p10b853jsn30909faf5831',
      'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
    },
    body: new URLSearchParams({
      text: `${text}`
    })
  };

/*
{"emotions_detected":["anger","joy"],
"emotion_scores":{"anger":0.1938118836150085,"joy":0.1471822913875334,"disgust":0,"sadness":0,"surprise":0,"fear":0},
"emotions_normalized":{"anger":0.9690594180750426,"joy":0.735911456937667,"disgust":0,"sadness":0,"surprise":0,"fear":0},
"thresholds_normalized":{"disgust":0.2,"sadness":0.2,"anger":0.2,"joy":0.2,"surprise":0.2,"fear":0.2},"version":"7.5.6",
"author":"twinword inc.","email":"help@twinword.com","result_code":"200","result_msg":"Success"}
*/

  fetch(url, options)
    .then(response => {
      return response.text();
    })
    .then(sentimentObjStr => {
      console.log(sentimentObjStr);
      return JSON.parse(sentimentObjStr);
    })
    .then(sentimentObj => {
      return postSentiment(sentimentObj);
    })
    .catch(error => {
      console.error(error);
    });
}

function postSentiment(sentimentObj){
  const mainEmotion = sentimentObj.emotions_detected[0];
  const newTitle = document.createElement('h2');
  newTitle.textContent = mainEmotion;
  const results = document.querySelector('.results');
  results.appendChild(newTitle);
  return mainEmotion;
}



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
      const text = request.data;
      getSentiment(text);
    }
  });

})