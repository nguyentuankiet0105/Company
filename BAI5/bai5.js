const score = document.getElementById('score');
const timer = document.getElementById('countdownTimer');
const qaAnsRow = document.querySelectorAll('.answer_item input');

var scoreCount = 0;
var count = 0;

//countdown handel
var time = 15; 
var countdownLocal = localStorage.getItem('countdownLocal');
if (countdownLocal == null) {
  var new_countdown = new Date().getTime() + (time + 2) * 1000;
  time = new_countdown;
  localStorage.setItem('countdownLocal', new_countdown);
} else {
  time = countdownLocal;
}

// setInterval function update countdown----------------------------------------------------------------
var downloadTimer = setInterval(() => {
  var now = new Date().getTime();
  var distance = time - now;
  var counter = Math.floor((distance % (1000 * 60)) / 1000);
  timer.innerHTML = counter + ' s';
  if (counter <= 0) {
    clearInterval(downloadTimer);
    localStorage.removeItem('countdownLocal');
    score.innerHTML = scoreCount;
    document.getElementById('result1').innerHTML = ' A , B';
    document.getElementById('result2').innerHTML = ' B';
    document.getElementById('result3').innerHTML = ' C';
    document.getElementById('result4').innerHTML = ' D';
    localStorage.removeItem('choice_item');

    //handel total point----------------------------------------------------------------
    qaAnsRow.forEach((item) => {
      const valid = item.getAttribute('valid');
      if (item.checked === true && valid === 'valid') {
        scoreCount += 20;
        score.innerHTML = scoreCount;
      }
      if (item.checked === true && valid !== 'valid') {
        item.nextElementSibling.classList.add('error');
      }
    });
  }
}, 1000);

// handle save local storage----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelectorAll("input[type='checkbox']");
  for (var item of checkbox) {
    //check id in local storage ----------------------------------------------------
    item.addEventListener('click', function () {
      if (localStorage.choice_item) {
        if ((localStorage.choice_item = localStorage.choice_item.indexOf(this.id + ',') == -1)) {
          localStorage.choice_item + this.id + ',';
        } else {
          localStorage.choice_item.replace(this.id + ',', '');
        }
      } else {
        localStorage.choice_item = this.id + ',';
      }
    });
  }
  if (localStorage.choice_item) {
    for (var item of checkbox) {
      item.checked = localStorage.choice_item.indexOf(item.id + ',') != -1 ? true : false;
    }
  }
});
