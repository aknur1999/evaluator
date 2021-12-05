console.log("text evaluator");
var p = String(document.children[0].innerText);
// var p= "{"
console.log(p);
url = "google.com";

var editorExtensionId = "hfkihmedibfamikodecbdncfiajbcblp";
// chrome.extension.sendMessage({ msg: "hello" });

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  console.log("mymsg", msg, response);

  response(p);
});
