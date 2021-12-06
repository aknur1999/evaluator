function request(link) {
  fetch('https://wave.webaim.org/api/request?key=g6hp9pR62651&url='+link)
  .then(res => res.json())
  .then(data => {
    var score = (1-(data.statistics.allitemcount / data.statistics.totalelements))*100;
    console.log(score.toFixed(0));
  });
}