const h1 = document.querySelector('h1');
const h1Text = h1.textContent;
console.log('hello i am running');

let textToSend = h1.textContent;

let paragraphToText = '';
const allText = document.querySelectorAll('p')
for (let p of allText) {
  paragraphToText += p.textContent + ' ';
}

textToSend = textToSend + paragraphToText;

console.log(textToSend);




chrome.runtime.sendMessage({ action: "extractedData", data: textToSend });