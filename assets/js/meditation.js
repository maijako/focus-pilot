let currentAudio;
//let timerEl = $('<p>');
let btnTextInitialized = false;
let timerInterval;


$('#medCard').on('click', function(event) {

    // Checks if the time for each audio file is added to the button text.
    if(!btnTextInitialized) {
        let audioButtonList = $('#audioContainer').children('button');
        $.each(audioButtonList, function (i, audioButton) { 
            let audio = document.getElementById($(audioButton).attr('data-audio-meditation'));
            let timeInMinutes = audio.duration/60;

            let btnText = $(audioButton).text();
            btnText = btnText.concat(' ('+timeInMinutes.toFixed(0)+' min)');
            console.log("Duration of audio:"+btnText);
            $(audioButton).text(btnText);
        });
    }
    
    // Sets value to true after initializing once.
    btnTextInitialized = true;
});

//$('#footerButtonGroup').append(timerEl);

$('#audioContainer').on('click', 'button', function(event) {

    let targetElement = $(event.target);
    let totalTime = 0;

    $('#medComponentFooter').removeClass('hide');
    
    $('#audioContainer').children('button').addClass('hide');
    $('#modalHead').addClass('hide');

    currentAudio = document.getElementById(targetElement.attr('data-audio-meditation'));

    totalTime = currentAudio.duration.toFixed(0);
    //timerEl.text(totalTime);
    console.log("Dur: "+totalTime);
    $('#audioProgress').attr('max', totalTime);

    timerInterval = setInterval(() => {
        let nowTime = currentAudio.currentTime.toFixed(0);
        //let timeLeft = totalTime - nowTime;
        //timerEl.text(timeLeft);
        $('#audioProgress').attr('value', nowTime);
    }, 1000);

});

function playaudio() {
    $('#playButton').addClass('hide');
    $('#pauseButton').removeClass('hide');
    currentAudio.play();
}

function pauseaudio() {
    $('#playButton').removeClass('hide');
    $('#pauseButton').addClass('hide');
    currentAudio.pause();
}

function stopaudio() {
    $('#playButton').removeClass('hide');
    $('#pauseButton').addClass('hide');
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
    $('#medComponentFooter').addClass('hide');
    clearInterval(timerInterval);
}