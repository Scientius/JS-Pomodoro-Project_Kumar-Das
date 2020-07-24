const beep = $('#beep')[0];
const toggle = $('.toggle');
const toggleBtn = $('.toggle__btn');
let flag;
let timerID;
let sessionTime;
let breakTime;
let onBreak = false;

toggle.on('click', '.toggle__btn--start', function(event) {
  onBreak = false;
  setStatusText();
  toggleBtnStartStop();
  initializeTimer();
});

toggle.on('click', '.toggle__btn--stop', function(event) {
  let userInput = confirm('You want to stop coding? Persevere my friend but okay we will return after a very short break.');
  if (userInput) {
    clearInterval(timerID);
    onBreak = true;
    toggleBtnStartStop();
    displayTime(sessionTime);
  }
});

function setStatusText() {
  if (onBreak) {
    $('.timer__status').text('Break:');
  } else {
    $('.timer__status').text('Coding Time:');
  }
}

function toggleBtnStartStop() {
  toggleBtn.toggleClass('toggle__btn--start');
  toggleBtn.toggleClass('toggle__btn--stop');
  if (onBreak) {
    toggleBtn.val('Start');
  } else {
    toggleBtn.val('Stop');
  }
}

function initializeTimer() {
  sessionTime = parseInt($('#session').val() * 60);
  breakTime = parseInt($('#break').val() * 60);
  displayTime(sessionTime);
  startTimer(sessionTime);
}

function displayTime(timeInSeconds) {
  minutes = Math.floor(timeInSeconds / 60).toString();
  seconds = (timeInSeconds % 60).toString();
  if (seconds.length < 2) {
    seconds = '0' + seconds;
  }
  $('#time').text(`${minutes}:${seconds}`);
}

function startTimer(timeInSeconds) {
  timerID = setInterval(decrementTime, 1000);

  function decrementTime() {
    flag = true;
    if (timeInSeconds === 0) {
      beep.play();
      clearInterval(timerID);
      displayTime(timeInSeconds);
      if (!onBreak) {
        onBreak = true;
        setStatusText();
        startTimer(breakTime);
      } else {
        onBreak = true;
        setStatusText();
        toggleBtnStartStop();
      }
    } else {
      timeInSeconds--;
      displayTime(timeInSeconds);
    }
  }
}
