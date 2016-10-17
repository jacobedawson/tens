$(document).ready(function() {


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
var target = 1000;
$('#action-button').on('click', function() {
    if (!timerActive) {
        time = 0;
        $('#header-score').html('timing...');
        $('#action-button').html('Stop').addClass('timing-mode');
        $('#flashcard-result').html('?');
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

});
/*===== END Set Timer =====*/

/*===== START Control Dropdown =====*/
$('#time-selection').on('click', '.dropdown-menu li a ', function() {
    $('#time-selection > button').text($(this).attr('data-time'));
    target = $(this).attr('data-target');
});
/*===== END Control Dropdown =====*/

/*===== Achievement Message =====*/
function outcomeMessage(time, target) {
    var message;
    var gap;
    var reaction;
    gap = time - target;
    $('#flashcard-result').html(gap);
    console.log(gap);
    if (gap === 0) {
        reaction = 'Holy amazeballs!!! You win!!';
    }
    if (gap > 0 && gap <= 10 || gap < 0 && gap >= -10) {
        reaction = 'Are you secretly a ninja?!';
    }
    if (gap >= 11 && gap <= 20 || gap < -11 && gap >= -20) {
        reaction = 'Superman wants his reflexes back!';
    }
    if (gap >= 21 && gap <= 30 || gap < -21 && gap >= -30) {
        reaction = 'How many redbulls have you had!';
    }
    if (gap >= 31 && gap <= 50 || gap < -31 && gap >= -50) {
        reaction = 'oooohhh sooo close!';
    }
    if (gap >= 51 && gap <= 150 || gap < -51 && gap >= -150) {
        reaction = 'ouch...nearly there!';
    }
    if (gap >= 151 && gap <= 250 || gap < -151 && gap >= -250) {
        reaction = 'Not bad...not great..but not bad';
    }
    if (gap >= 251 && gap <= 500 || gap < -250 && gap >= -500) {
        reaction = 'Mmm - you might need some more practice...';
    }
    if (gap >= 501 && gap <= 1000 || gap < -501 && gap >= -1000) {
        reaction = 'My grandma has better reflexes! And she\'s dead!';
    }
    if (gap > 1001 || gap < -1001) {
        reaction = 'I think your phone might be broken...';
    }
    $('#score-reaction').text(reaction);
}
/*===== END Achievement Message =====*/

});