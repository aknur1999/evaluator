var p
(function() {
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        console.log("New item in storage", changes.ourList.newValue);
        p = changes.ourList.newValue

    })
 })();

document.getElementById("recall").addEventListener("click", function showList() {
    document.getElementById("test").innerHTML = p

    // let hardLists = ["youtube", "twitch", "google", "aliexpress", "w3", "myList6", "myList7", "myList8"]
    // for ( let i = 0; i< hardLists.length; i++) {
    //     var x = document.getElementById(hardLists[i])
    //     // console.log(x)
    //     x.style.display = "none"
    // }
    // var y = document.getElementById("fname").value;
    // var temp
    // switch (y) {
    //     case "youtube.com":
    //         temp = "youtube"
    //         break;
    //     case "twitch.tv":
    //         temp = "twitch"
    //     case "google.com":
    //         temp = "google"
    //     case "aliexpress.com":
    //         temp = "aliexpress"
    //     case "w3schools.com":
    //         temp = "w3"
    //     default:
    //         break;
    // }
    // console.log(temp)
    // var x = document.getElementById(temp);
    // console.log(x)
    // x.style.display = "block";


}
)

// Submit button
document.getElementById("myButton").addEventListener("click", function recalled() {
    var x = document.getElementById("myButtonA");
    var y = document.getElementById("fname").value;
    var url = ("https://www.alexa.com/find-similar-sites/data?site=" + y)
    x.setAttribute('href', url)
    console.log(x)
})