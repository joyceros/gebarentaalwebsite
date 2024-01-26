class Highscore {
  static highscores = [];

  constructor(name, percentage, timeleft, score) {
    this.name = name;
    this.percentage = percentage;
    this.timeleft = timeleft;
    this.score = score;
  }

  //add the new highscore to the db
  static addhighscore(p, t, s) {
    let data = {percentage: p, time: t, score: s};
    $.ajax({
      type: "POST",
      url: 'include/addhighscore.php',
      data: data,
      success: function () {
        //setup the new highscores
        $('#highscores').empty();
        Highscore.getallhighscores();
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  //get all the higscores from the db
  static getallhighscores() {
    $.ajax({
      type: "GET",
      url: 'include/gethighscores.php',
      dataType: "json",
      encode: true,
      data: {'name': 'name', 'percentage': 'percentage', 'time': 'time', 'score': 'score'},
      success: function (data1) {
        Highscore.setuphighscores(data1);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  //set up the new highscores by adding them to the list
  static setuphighscores(data) {
    Highscore.highscores = [];
    for (let i = 0; i < data.length; i++) {
      let highscore = data[i];
      if (highscore['name'] !== undefined || highscore['percentage'] !== undefined || highscore['time'] !== undefined || highscore['score'] !== undefined) {
        Highscore.newscore(highscore['name'], highscore['percentage'], highscore['time'], highscore['score']);
      }
    }
    Highscore.addhighscores();
  }

  static newscore(name, percentage, timeleft, score) { //generate new score and add to the list
    let highscore = new Highscore(name, percentage, timeleft, score);
    Highscore.highscores.push(highscore);
  }

  //add all the highscores from the list to the html page
  static addhighscores() {  //show the highscores on the screen
    $('#highscores').empty();
    for (let i = 0; i < Highscore.highscores.length; i++) {
      if (i === 0) {
        $('#highscores').append("Nummero uno:");
      } else if (i === 1) {
        $('#highscores').append("Plus de rest: <br>");

      }
      $("#highscores").append("<span> <b id='name'>" + Highscore.highscores[i].name + "</b> percentage: <b id='percentage'>" + Highscore.highscores[i].percentage + "</b>%. Tijd die over was: <b id='time'>" + Highscore.highscores[i].timeleft + "</b> seconden met een score van: <b id='score'>" + Highscore.highscores[i].score + "</b></span><p></p>");
    }
  }
}

