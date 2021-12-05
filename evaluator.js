console.log("text evaluator");
var p = document.children[0].innerText
// for (let i =0; i < Object.entries(JSON.parse(document.children[0].innerText))[0][1].length; i++){
//    if (Object.entries(JSON.parse(document.children[0].innerText))[0][1][i].site2 != undefined) {
//    var p  = p + Object.entries(JSON.parse(document.children[0].innerText))[0][1][i].site2 + ", ";}
// }
console.log(p)
url = "google.com";

var editorExtensionId = "hfkihmedibfamikodecbdncfiajbcblp";
// chrome.extension.sendMessage({ msg: "hello" });

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  console.log("mymsg", msg, response);

  response(p);
});