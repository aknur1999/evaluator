async function fetchList() {
    var currentLocation = window.location.toString();
    console.log(currentLocation);
    // content.appendChild(
    //     document.createTextNode(currentLocation)
    // )
}
// window.location.href=("https://www.alexa.com/find-similar-sites/data?site=netflix.com")
// fetch("https://www.alexa.com/find-similar-sites/data?site=netflix.com", response => {console.log(response)})
document.getElementById("myButton").addEventListener("click", function showList() {
    var k = window.location.href=("https://www.alexa.com/find-similar-sites/data?site=netflix.com")
    console.log(k.children[0].innerText())
    // k.my_childs_special_setting = "Hello World";

    // //In the child (popup) window, you could access a parent variable like this:
    // console.log(window.opener.my_parents_special_setting)
    // console.log(window.content)
    let hardLists = ["youtube", "twitch", "google", "aliexpress", "w3", "myList6", "myList7", "myList8"]
    for ( let i = 0; i< hardLists.length; i++) {
        var x = document.getElementById(hardLists[i])
        // console.log(x)
        x.style.display = "none"
    }
    var y = document.getElementById("fname").value;
    var temp
    switch (y) {
        case "youtube.com":
            temp = "youtube"
            break;
        case "twitch.tv":
            temp = "twitch"
        case "google.com":
            temp = "google"
        case "aliexpress.com":
            temp = "aliexpress"
        case "w3schools.com":
            temp = "w3"
        default:
            break;
    }
    // console.log(temp)
    var x = document.getElementById(temp);
    // console.log(x)
    x.style.display = "block";
}
)
