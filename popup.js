var q;

document
  .getElementById("recall")
  .addEventListener("click", function showList() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("sending message");
      chrome.tabs.sendMessage(tabs[0].id, { action: "readDom" }, setDOMInfo);
      setDOMInfo(P);
      console.log(setDOMInfo(P))
    });
  });

// Submit button
document
  .getElementById("myButton")
  .addEventListener("click", function recalled() {
    var x = document.getElementById("myButtonA");
    var y = document.getElementById("fname").value;
    var url = "https://www.alexa.com/find-similar-sites/data?site=" + y;
    x.setAttribute("href", url);
    console.log(x);
  });

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   console.log("mymsg in popup", msg);
//   const myElem = document.getElementById("test");
//   myElem.appendChild(document.createTextNode(msg));
// });

const setDOMInfo = (info) => {
  const myElem = document.getElementById("test");
  myElem.appendChild(document.createTextNode(info));
};
