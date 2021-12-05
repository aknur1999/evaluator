var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/*! EmulateTab v0.2.12 © 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021 The Swedish Post and Telecom Authority (PTS), Licensed BSD-3-Clause */
var JoelPurra=JoelPurra||{};!function(a,b,c,d){"use strict";var e="."+d,f=":input, a[href]",g=null,h={escapeSelectorName:function(a){return a.replace(/(!"#$%&'\(\)\*\+,\.\/:;<=>\?@\[\]^`\{\|\}~)/g,"\\\\$1")},findNextFocusable:function(a,c){var d=b(f).not(":disabled").not(":hidden").not("a[href]:empty");if("INPUT"===a[0].tagName&&"radio"===a[0].type&&""!==a[0].name){var e=h.escapeSelectorName(a[0].name);d=d.not("input[type=radio][name="+e+"]").add(a)}var g=d.index(a),i=(g+c)%d.length;-1>=i&&(i=d.length+i);var j=d.eq(i);return j},focusInElement:function(a){g=a.target},tryGetElementAsNonEmptyJQueryObject:function(a){try{var c=b(a);if(c&&0!==c.size())return c}catch(d){}return null},getFocusedElement:function(){var c=h.tryGetElementAsNonEmptyJQueryObject(":focus")||h.tryGetElementAsNonEmptyJQueryObject(a.activeElement)||h.tryGetElementAsNonEmptyJQueryObject(g)||b();return c},emulateTabbing:function(a,b){var c=h.findNextFocusable(a,b);c.focus()},initializeAtLoad:function(){b(a).on("focusin"+e,h.focusInElement)}},i={tab:function(a,c){b.isNumeric(a)&&(c=a,a=void 0),a=a||i.getFocused(),c=c||1,h.emulateTabbing(a,c)},forwardTab:function(a){return i.tab(a,1)},reverseTab:function(a){return i.tab(a,-1)},getFocused:function(){return h.getFocusedElement()}},j=function(){b.extend({emulateTab:function(a,b){return i.tab(a,b)}}),b.fn.extend({emulateTab:function(a){return i.tab(this,a)}})},k=function(){c[d]=i,j(),b(h.initializeAtLoad)};k()}(document,jQuery,JoelPurra,"EmulateTab");

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

function c243(doc) {
    start = doc.body;
    while (start.children[0]!=undefined) start = start.children[0];
    start.focus();
    counter = 0
    while (true) {
        $(document.activeElement).emulateTab();
        if (document.activeElement == start) return 1;
        if (counter >= 1000) return 0;
        counter++;
    }
}

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

async function evaluate(doc) {
    
    // individual scores & their weights
    scores = [
        [c111(doc), 1],
        [c146(doc), 1],
        [c242(doc), 1],
        [c243(doc), 1],
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
    return totalScore / totalWeight;
}









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