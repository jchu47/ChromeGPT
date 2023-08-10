const h1 = document.querySelector('h1');
const h1Text = h1.textContent;
console.log('hello i am running');

chrome.runtime.sendMessage({ action: "extractedData", data: h1Text });