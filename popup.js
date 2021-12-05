var q;

document
  .getElementById("recall")
  .addEventListener("click", function showList() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("sending message");
      chrome.tabs.sendMessage(tabs[0].id, { action: "readDom" }, setDOMInfo);
      // setDOMInfo(P); 
      // console.log(setDOMInfo(P))
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

// Evaluate button
document
.getElementById("evaluator")
.addEventListener("click", function evalled() {
  console.log("test")
  

})

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   console.log("mymsg in popup", msg);
//   const myElem = document.getElementById("test");
//   myElem.appendChild(document.createTextNode(msg));
// });


var allSites = []
const setDOMInfo = (info) => {
  const myContainer = document.getElementById("similarSitesContainer");
  var lists = JSON.parse(info).results
  lists.forEach(listElem => {
    if(listElem.site2) {
      allSites.push(listElem.site2)
      // myElem.appendChild(document.createTextNode(listElem.site2));
      //  <li> <a href="netflix.com">  </a>netflix.com</li>
      const listItemWrapper = document.createElement('li')
      const listItemLink = document.createElement('a')
      listItemLink.href = "https://" + listElem.site2.toString()
      listItemLink.target = "blank_"
      listItemLink.appendChild(document.createTextNode(listElem.site2))
      listItemWrapper.appendChild(listItemLink)
      myContainer.appendChild(listItemWrapper)
    }
  })
  console.log(allSites)
};
