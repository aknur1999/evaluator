console.log("text");
var p = String(document.children[0].innerText)
// var p= "{"
console.log(p === "{");
var temp
for (let i = 0; i< p.length; i++) {
    temp += p[i];
}
(function() {
    // var visited = window.location.href;
    chrome.storage.sync.set({
       'ourList': {
          listData: temp,
       }
    }, function() {
       console.log("Just visited", temp);
    });
 })();


// localStorage.setItem("evalLocalStorage", p)

// alert(p)