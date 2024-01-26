let genoegclicked = 0;
let clicked = [];
let highscoreclicked = false;

let timesup = false;

let shuffledcards = [];
let numbersdone = [];

let cardslength = 52;
let end;

$(document).ready(function () {

  //if the highscorebutton is clicked show highscores
  $('#highscorebutton').click(function () {
    if (highscoreclicked === false) {
      Highscore.getallhighscores();
      $('#highscores').empty();
      $('#memorygame').hide();
      $('#highscore').show();
      highscoreclicked = true;
      $('#highscorebutton').html("Nieuw spel starten");
    } else {  //else show the game by reloading page
      location.reload();
    }
  });
  Card.getrangecards();

  //if start has been clicked
  $('#start').click(
    function clicked() {
      $('#start').attr('disabled', true);
      $('#startgame').hide();
      $('#cards').show();
      setInterval(function () {   //start the timer
        if (Time.elapsed_seconds === 0 && timesup === false) {    //if the time is over stop the game with tijdisop();
          Time.tijdisop();
          timesup = true;
        } else if (Time.elapsed_seconds > 0 && timesup === false) {
          for (let i = 0; i < shuffledcards.length + 1; i++) {
            if (shuffledcards[i] !== undefined) {
              $('#' + shuffledcards[i].name).attr('disabled', false);
            }
          }
          Time.elapsed_seconds = Time.elapsed_seconds - 1;
          $('#start').text(Time.get_elapsed_time_string(Time.elapsed_seconds));
        }
      }, 1000)
    });
});

class main {

  //start the new game function showing the memorygame and hiding the higschores. looping through each card and if they have been clicked continue
  static newgame() {
    $('#memorygame').show();
    $('#highscores').empty();
    $('#highscore').hide();
    highscoreclicked = false;
    let card1 = 0;
    let card2 = 0;
    let goedzo;

    for (let i = 0; i < 52 + 1; i++) {
      let current = shuffledcards[i];
      if (current !== undefined) {
        current = shuffledcards[i].name;

        $('#' + current).click(function () {
          if (clicked[i] === true && genoegclicked === 1) {   //if this card has already been clicked turn it around
            if (card1 !== -1 && shuffledcards[card1].name === current) {
              current = shuffledcards[i].name;
              $('#' + current + "pic").attr("src", "img/memorycard.jpg");
              clicked[i] = false;
              genoegclicked = 0;
            }
          } else if (clicked[i] === false && genoegclicked === 0 && shuffledcards[i].done === false) {    //if this card has not been clicked and it is the first card flip and remember position
            $('#' + current + "pic").attr("src", "img/" + current + ".jpg");
            clicked[i] = true;
            card1 = i;
            genoegclicked++;
          } else if (genoegclicked === 1 && shuffledcards[i].done === false) {    //if this card has been clicked then check if they match
            if (shuffledcards[i] !== undefined) {
              $('#' + current + "pic").attr("src", "img/" + current + ".jpg");
              clicked[i] = true;
              card2 = i;
              let c1 = shuffledcards[card1].name;
              let c2 = shuffledcards[card2].name;  //check with function if the cards match
              goed(c1, c2);

              function goed(c1, c2) {
                goedzo = new Promise(function (resolve, reject) {
                  $.ajax({
                    type: "POST",
                    url: 'include/checkcards.php',
                    data: {card1: c1, card2: c2},
                    success: function (data) {
                      resolve(data);
                      return data;
                    },
                    error: function (err) {
                      console.log(err);
                      reject();
                    }
                  });
                });
                return goedzo;
              }

              goedzo.then(data => {
                  if (data === true && shuffledcards[card1] !== undefined && shuffledcards[card2] !== undefined) {  //if they match block them from clicking
                    shuffledcards[card1].done = true;
                    shuffledcards[card2].done = true;
                    $('#' + shuffledcards[card1].name).attr('disabled', true);
                    $('#' + shuffledcards[card2].name).attr('disabled', true);
                    let done = main.checkifdone();
                    if (done === true) {
                      Time.tijdisop()
                    }
                  } else {  //else wait a few seconds and flip them around again
                    let currentname = shuffledcards[card1].name;
                    setTimeout(flip, 700);

                    function flip() {
                      $('#' + currentname + "pic").attr("src", "img/memorycard.jpg");

                      $('#' + shuffledcards[i].name + "pic").attr("src", "img/memorycard.jpg");
                      $('#' + currentname).attr('disabled', false);
                      $('#' + shuffledcards[i].name).attr('disabled', false);
                    }
                  }
                  clicked[card1] = false;
                  clicked[card2] = false;
                  card1 = -1;
                  card2 = -1;
                  genoegclicked = 0;
                },
                error => {
                  console.log("# error! : " + error);
                }
              );
            }
          }
        });
      }
    }
  }

  //check if all the cards have been guessed correctly if so then tijdisop();
  static checkifdone() {
    let correctanswers = 0;
    for (let i = 0; i < shuffledcards.length + 1; i++) {
      if (shuffledcards[i] !== undefined) {
        if (shuffledcards[i].done === true) {
          correctanswers++;
        }
      }
    }
    if (correctanswers === shuffledcards.length) {
      timesup = true;
      return true;
    } else {
      return false;
    }
  }
}
