$(document).ready(function() {
    $("#audio-warm-synth")[0].play();

/*
 1.) User selects a time i.e. 10s
 2.) The start button appears on selection, and flashes
 3.) When the user clicks, the countdown starts and the
 start button turns into a stop button.
 4.) When the user clicks 'stop', the time when they clicked the button appears below in giant writing and some messages like 'too sloow!!', 'almost!!!', 'PERFECT SCORE!!!', etc
 5. some other shit
 */
/*===== START Set Timer =====*/
var timerActive = false;
var time = 0;
var points = 0;
var target = 1000;
var rolling = $('<img src="dist/images/rolling.svg"/>');
$('#action-button').on('click', function() {
    if (!timerActive) {
        time = 0;
        $('#header-score').html('timing...').removeClass('winning');
        $('#action-button').html('Stop').addClass('timing-mode');
        $('#flashcard-result').html('?');
        $('#score-reaction').html(rolling);
        timerActive = true;
        start = new Date().getTime();
    } else {
        timerActive = false;
        end = new Date().getTime();
        time = end - start;
        outcomeMessage(time, target);
        var timeType = time > 1000 ? 's' : 'ms';
        $('#header-score').html(time.toLocaleString('de-DE') + ' ' + timeType);
        $('#action-button').html('Start!').removeClass('timing-mode');
    }
    ga('send', 'event', 'Action Button', 'Clicked');
});
/*===== END Set Timer =====*/

/*===== START Control Dropdown =====*/
$('#time-selection').on('click', '.dropdown-menu li a ', function() {
    $('#time-selection > button').text($(this).attr('data-time'));
    target = $(this).attr('data-target');
    ga('send', 'event', 'Time Select', 'Clicked');
});
/*===== END Control Dropdown =====*/

/*===== Achievement Message =====*/
function outcomeMessage(time, target) {
    var gap;
    var reaction;
    gap = time - target;
    // gap = 0;
    $('#flashcard-result').html(gap);
    if (gap === 0) {
        $("#audio-win-v3")[0].play();
        $('#header-score').effect('bounce', { times: 10 }, "slow" ).addClass('winning');
        updateScore(100);
        reaction = 'Holy amazeballs!!! You win!!';
    }
    if (gap > 0 && gap <= 10 || gap < 0 && gap >= -10) {
        $("#audio-win-v1")[0].play();
        updateScore(5);
        reaction = 'Are you secretly a ninja?!';
    }
    if (gap >= 11 && gap <= 20 || gap < -11 && gap >= -20) {
        updateScore(3);
        reaction = 'Superman wants his reflexes back!';
    }
    if (gap >= 21 && gap <= 30 || gap < -21 && gap >= -30) {
        updateScore(1);
        reaction = 'How many redbulls have you had!';
    }
    if (gap >= 31 && gap <= 50 || gap < -31 && gap >= -50) {
        reaction = 'oooohhh sooo close!';
    }
    if (gap >= 51 && gap <= 150 || gap < -51 && gap >= -150) {
        updateScore(-2);
        reaction = 'ouch...nearly there!';
    }
    if (gap >= 151 && gap <= 250 || gap < -151 && gap >= -250) {
        updateScore(-5);
        reaction = 'Not bad...not great..but not bad';
    }
    if (gap >= 251 && gap <= 500 || gap < -250 && gap >= -500) {
        updateScore(-10);
        $("#audio-pop")[0].play();
        reaction = 'Mmm - you might need some more practice...';
    }
    if (gap >= 501 && gap <= 1000 || gap < -501 && gap >= -1000) {
        updateScore(-15);
        $("#audio-close")[0].play();
        reaction = 'My grandma has better reflexes! And she\'s dead!';
    }
    if (gap > 1001 || gap < -1001) {
        $("#audio-wasted")[0].play();
        updateScore(-25);
        reaction = 'I think your phone might be broken...';
    }
    $('#score-reaction').text(reaction);
}
/*===== END Achievement Message =====*/

/*===== Score =====*/
function updateScore(newScore) {
    points += newScore;
    $('#score').html(points);
}
/*===== End Score =====*/

});