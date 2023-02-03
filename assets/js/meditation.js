let currentAudio;
let timerEl = $('<p>');
let timerInterval;
$('#footerButtonGroup').append(timerEl);

$('#audioContainer').on('click', 'button', function(event) {

    let targetElement = $(event.target);
    let totalTime = 0;

    $('#footerButtonGroup').removeClass('hide');
    
    $('#audioContainer').children('button').addClass('hide');
    $('#modalHead').addClass('hide');

    currentAudio = document.getElementById(targetElement.attr('data-audio-meditation'));

    totalTime = currentAudio.duration.toFixed(0);
    timerEl.text(totalTime);

    timerInterval = setInterval(() => {
        let nowTime = currentAudio.currentTime.toFixed(0);
        let timeLeft = totalTime - nowTime;
        timerEl.text(timeLeft);
    }, 1000);

});

function playaudio() {
    currentAudio.play();
}

function pauseaudio() {
    currentAudio.pause();
}

function stopaudio() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
}

function checktime() {
    console.log(currentAudio.currentTime);
    console.log(currentAudio.duration);
}

function endedAudio() {
    meditationHomeScreen();
}

$('#backButton').on('click', function(event) {

    stopaudio();
    meditationHomeScreen();
});

$('#closeButton').on('click', function(){
    if(currentAudio!=undefined && timerInterval!=undefined) {
        stopaudio();
        meditationHomeScreen();
    }   
})

function meditationHomeScreen() {
    $('#audioContainer').children('button').removeClass('hide');
    $('#modalHead').removeClass('hide');
    $('#footerButtonGroup').addClass('hide');
    clearInterval(timerInterval);
}