class Time {
  static elapsed_seconds = 120;

  //function for timer
  static get_elapsed_time_string(total_seconds) {
    function pretty_time_string(num) {
      return (num < 10 ? "0" : "") + num;
    }
    let hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;

    let minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    let seconds = Math.floor(total_seconds);

    hours = pretty_time_string(hours);
    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);

    return hours + ":" + minutes + ":" + seconds;
  }

  //hide the game cards and show the highscore
  static tijdisop() {
    $('#highscores').empty();
    $('#memorygame').hide();
    $('#highscore').show();
    highscoreclicked = true;
    $('#highscorebutton').html("Nieuw spel starten");
    let correctanswers = 0;
    let percentage;
    //for all the cards check how many have been quessed correct
    for (let i = 0; i < shuffledcards.length + 1; i++) {
      if (shuffledcards[i] !== undefined) {
        $('#' + shuffledcards[i].name).attr('disabled', true);
        if (shuffledcards[i].done === true) {
          correctanswers++;
        }
      }
    }
    percentage = correctanswers / shuffledcards.length;
    percentage = percentage * 100;
    percentage = percentage.toString().substr(0, 4);
    let score = parseInt(percentage) + Time.elapsed_seconds;
    Highscore.addhighscore(percentage, Time.elapsed_seconds, score);

    $('#timerop').html('Je hebt ' + correctanswers + ' van de ' + shuffledcards.length + ' goed. Dit betekent ' + percentage + '% goed! Dit houdt in een score van: ' + score.toString());
    if (Time.elapsed_seconds > 0) {
      $('#binnentijd').html('Je hebt zelfs nog tijd over! Namelijk nog ' + Time.elapsed_seconds + ' seconden.');
    }
  }
}
