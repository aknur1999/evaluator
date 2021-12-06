function inject(path) {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL(path);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function evaluate(doc) {
    inject("jquery-3.4.1.min.js");
    // await delay(1000);
    inject("html2canvas.min.js");
    // await delay(1000);
    inject("EmulateTab.js");
    // await delay(1000);

    // function contrast(el) {
    //     var color = window.getComputedStyle(el, null).getPropertyValue('color');
    //     var bgColor = window.getComputedStyle(el, null).getPropertyValue('background-color');
    //     console.log(color, bgColor);
    // }

    function no_tiny_font(el) {
        var min = min_font_size(el.body);
        if (min <= 8) return 0;
        else if (min >= 15) return 1;
        else return (min-8) / 7;
    }

    // function rgbToHex(r, g, b) {
    //     if (r > 255 || g > 255 || b > 255)
    //         throw "Invalid color component";
    //     return ((r << 16) | (g << 8) | b).toString(16);
    // }

    // async function getColors () {
    //     var canvas = await html2canvas(document.body);
    //     var context = canvas.getContext('2d');
    //     var colors = new Set();
    //     for (let x = 0; x < canvas.width; x++) {
    //         for (let y = 0; y < canvas.height; y++) {
    //             d = context.getImageData(x, y, 1, 1).data;
    //             colors.add(""+d[0]+d[1]+d[2]);
    //         }
    //     }
    //     console.log(colors);
    // }

    function c111(el) {
        imgs = el.getElementsByTagName("img");
        altCounter = 0;
        for (img of imgs) {
            if (img.alt!=undefined && img.alt!="") altCounter += 1;
        }
        return altCounter / imgs.length;
    }

    function c242(el) {
        title = el.getElementsByTagName("title")[0].innerText;

        exact = ["document", "no title"];
        includes = ["untitled"];

        for (e of exact) {
            re = new RegExp("^"+e+"$", "i");
            if (title.match(re)!=null) return 0;
        };

        for (e of includes) {
            re = new RegExp(e, "i");
            if (title.match(re)!=null) return 0;
        };

        return 1;
    }

    // function c243(doc) {
    //     start = doc.body;
    //     while (start.children[0]!=undefined) start = start.children[0];
    //     start.focus();
    //     counter = 0
    //     while (true) {
    //         $(document.activeElement).emulateTab();
    //         if (document.activeElement == start) return 1;
    //         if (counter >= 1000) return 0;
    //         counter++;
    //     }
    // }

    // 3.1.1 Language of Page - Level A
    // The default human language of each Web page can be programmatically determined.
    // naver.com has lang="ko" defined in its uppermost html tag
    function c311(el) {
        if(el!=document && el.hasAttribute('lang')) return 1;
        for (childEl of el.children) {
            if (c311(childEl)==1) return 1;
        }
        return 0;
    }

    function min_font_size(el) {
        var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
        var font_min = parseFloat(style);
        font_min = (font_min == 0) ? 10000 : font_min;
        for (childEl of el.children) {
            font_min = Math.min(font_min, min_font_size(childEl))
        }
        return font_min;
    }

    function good_contrast(doc) {
        // work to be done
        return 0.166666666666666666666;
    }

    function c146(doc) {
        return good_contrast(doc);
    }
    
    // individual scores & their weights
    scores = [
        [c111(doc), 1],
        [c146(doc), 1],
        [c242(doc), 1],
        // [c243(doc), 1],
        [c311(doc), 1],
        [no_tiny_font(doc), 1],
        // ... 
    ];

    console.log(scores);

    // get mean score
    var totalScore = 0;
    var totalWeight = 0;
    for (score of scores) {
        totalScore += score[0];
        totalWeight += score[1];
    }
    var overallScore = totalScore / totalWeight;
    console.log("Overall score is: " + overallScore);
    return overallScore;
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.action=="eval") {
        console.log("Evaluating...");
        evaluate(document).then(response);
    }
    return true;
});







// html2canvas(document.body).then(canvas => {
//     var link = document.createElement('a');
//     link.download = 'filename.png';
//     link.href = canvas.toDataURL()
//     link.click();
// }); 



// 
// 1.4.3 Contrast
// 
//  
// 
// 
// 
// 



// function replace(element, from, to) {
//     if (element.childNodes.length) {
//         element.childNodes.forEach(child => replace(child, from, to));
//     } else {
//         const cont = element.textContent;
//         if (cont) element.textContent = cont.replace(from, to);
//     }
// };

// replace(document.body, new RegExp(".", "g"), "▇");