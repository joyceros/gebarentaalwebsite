// document.FirstQuestion.answer;
prev = null;
good = 0;

nulls = 0;
half = 0;
sortquestion = 0;
pos = 0;

examplelevel = false;

categories = ["alfabet", "cijfers", "consumptie", "gesprek", "scheldwoorden", "alfabet"];
soort = "alfabet";
newlist = [];

class Main {
  static initialize() {
    Main.rad = document.FirstQuestion.answer;
  }

  //get the data from the levels with php rest service.
  static getlevels() {
    $.ajax({
      type: "GET",
      url: 'getlevels.php',
      dataType: "json",
      encode: true,
      success: function (data) {
        Main.levels = data[0];
        Main.setlevels();
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  //get the next categorie in line.
  static getnext(numb) {
    for (let i = 0; i < Main.categories.length; i++) {
      if (numb === Main.categories[i]) {
        Main.next = Main.categories[i + 1];
      }
    }
  }
  //used for changing the levels in the db, if the quiz has been passed. if it is under 12 it is still in the same categorie else it should move to the next categorie and add a one to it.
  static setlevel(n, alfa) {
    if (Main.levels[alfa] < n) {
      if (n === 12 || Main.levels === "consumptie") {
        n = 1;
        Main.getnext(alfa);
      } else {
        Main.next = alfa;
      }

      //if the next is scheldwoorden and scheldwoorden is under 1 the user had played all the categoires and is not allowed to play scheldwoorden (under 18)
      if (Main.next === "scheldwoorden" && Main.levels["scheldwoorden"] < 0) {
      } else {
        $.ajax({
          type: "POST",
          url: 'addlevels.php',
          data: {next: Main.next, n: n},
          cache: false,
          success: function () {
            Main.getlevels();
          }
        });
      }
    }
  }

  //able the categoires that the player has unlocked and keep the other levels disabled.
  static setlevels() {
    let name = $('#Soort').html();
    if ((Main.levels['alfabet'] > 0 && Main.levels['alfabet'] < 3 && name === "Alfabet level 1") || (Main.levels['alfabet'] > 4 && Main.levels['alfabet'] < 7 && name === "Alfabet level 2") || (Main.levels['alfabet'] > 8 && Main.levels['alfabet'] < 11 && name === "Alfabet")) {
      Main.examplelevel = true;
    }
    if ((Main.levels['cijfers'] > 0 && Main.levels['cijfers'] < 3 && name === "Cijfers level 1") || (Main.levels['cijfers'] > 4 && Main.levels['cijfers'] < 7 && name === "Cijfers level 2") || (Main.levels['cijfers'] > 8 && Main.levels['cijfers'] < 11 && name === "Cijfers")) {
      Main.examplelevel = true;
    }
    if ((Main.levels['gesprek'] > 0 && Main.levels['gesprek'] < 3 && name === "Gesprek level 1") || (Main.levels['gesprek'] > 4 && Main.levels['gesprek'] < 7 && name === "Gesprek level 2") || (Main.levels['gesprek'] > 8 && Main.levels['gesprek'] < 11 && name === "Gesprek")) {
      Main.examplelevel = true;
    }
    if ((Main.levels['scheldwoorden'] > 0 && Main.levels['scheldwoorden'] < 3 && name === "Scheldwoorden level 1") || (Main.levels['scheldwoorden'] > 4 && Main.levels['scheldwoorden'] < 7 && name === "Scheldwoorden level 2") || (Main.levels['scheldwoorden'] > 8 && Main.levels['scheldwoorden'] < 11 && name === "Scheldwoorden")) {
      Main.examplelevel = true;
    }

    if (Main.levels['alfabet'] > 0) {
      $('#Alfabet1').attr('disabled', false);
      if (Main.levels['alfabet'] > 4) {
        $('#Alfabet2').attr('disabled', false);
        if (Main.levels['alfabet'] > 8) {
          $('#Alfabet').attr('disabled', false);
        } else {
          $('#Alfabet').attr('disabled', true);
        }
      }
    } else {
      $('#Alfabet2').attr('disabled', true);
    }
    if (Main.levels['cijfers'] > 0) {
      $('#Cijfers1').attr('disabled', false);
      if (Main.levels['cijfers'] > 4) {
        $('#Cijfers2').attr('disabled', false);
        if (Main.levels['cijfers'] > 8) {
          $('#Cijfers').attr('disabled', false);
        }
      }
    }
    if (Main.levels['consumptie'] > 0) {
      $('#Consumptie').attr('disabled', false);
    }
    if (Main.levels['gesprek'] > 0) {
      $('#Gesprek1').attr('disabled', false);
      if (Main.levels['gesprek'] > 4) {
        $('#Gesprek2').attr('disabled', false);
        if (Main.levels['gesprek'] > 8) {
          $('#Gesprek').attr('disabled', false);
        }
      }
    }
    if (Main.levels['scheldwoorden'] > 0) {
      $('#Scheldwoorden1').attr('disabled', false);
      if (Main.levels['scheldwoorden'] > 4) {
        $('#Scheldwoorden2').attr('disabled', false);
        if (Main.levels['scheldwoorden'] > 8) {
          $('#Scheldwoorden').attr('disabled', false);
        }
      }
    }
    if (Main.levels['scheldwoorden'] < 0) {
      $('#Scheldwoorden1').hide();
      $('#Scheldwoorden2').hide();
      $('#Scheldwoorden').hide();
    }
  }

  //get all the gebaren from the db.
  static getthem() {
    $.ajax({
      type: "GET",
      url: 'include/getinfo.php',
      dataType: "json",
      data: {'Soort': Main.soort},  //get all the gebaren from this specific soort
      encode: true,
      success: function (data) {
        Main.gebaren = data;
        Main.removecurrent();
        //if this is a test level get only testquestions, else do the newquestions
        if (Main.setlevels.examplelevel === true) {
          Main.newexample(Main.gebaren);
          $('#newlevel').hide();
          $('#examplelevel').show();
        } else {
          Main.newquestion(Main.gebaren);
          $('#newlevel').show();
          $('#examplelevel').hide();
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  //remove the current gebaar from the list so you only have a list of gebaren that have not been answered right in a question.
  static removecurrent() {
    Main.newlist = [];
    for (let i = 0; i < Main.gebaren.length; i++) {
      let gebaar = Main.gebaren[i];
      if (gebaar['Soort'] !== Main.soort) {
        delete Main.gebaren[i];
      } else {
        Main.newlist.push(Main.gebaren[i]);
      }
    }
    let helft = Main.newlist.length / 2;
    if (Main.half === 1) {
      for (let i = helft; i < Main.newlist.length; i++) {
        delete Main.newlist[i];
      }
    }
    if (Main.half === 2) {
      for (let i = 0; i < helft; i++) {
        delete Main.newlist[i];
      }
    }
    Main.gebaren = Main.newlist;
  }

  //check how much there have been good in a row and if not all questions have been answered continue.
  //if all questions have been answered (go = 0) then hide the appreance and show the done field from html
  static inarow() {
    if (Main.good === 5 && Main.examplelevel === false || Main.good === 8 && Main.examplelevel === false) {
      $('#validation').html("Goed geantwoord! " + Main.good + "op een rij goed!");
    } else if (Main.goed === 1 && Main.examplelevel === false) {
      $('#validation').html("Goed geantwoord!");
    }
    if (Main.go === 1) {
      if (Main.examplelevel === true) {
        Main.newexample(Main.gebaren);
      } else {
        Main.newquestion(Main.gebaren);
      }
    } else {
      $('#appearance').hide();
      if (Main.examplelevel === false) {
        $('#done').show();
      } else {
        $('#doneexample').show();
      }
      Main.whatlevel();
      Main.setlevel(Main.number, Main.soort);
    }
  }

  //set the Main.number to the level the player is currently in plus one.
  static whatlevel() {
    Main.number = parseInt(Main.levels[Main.soort]) + 1;
  }

  //make up a new question by getting 3 random numbers from the gebaren array and randomizing their position but still keep track of their position
  static newquestion(gebaren) {

    Main.current = Math.floor(Math.random() * (gebaren.length));

    Main.sortquestion = Math.floor(Math.random() * 2);

    Main.geb = gebaren[Main.current];
    Main.geb1 = gebaren[Math.floor(Math.random() * (gebaren.length))];
    Main.geb2 = gebaren[Math.floor(Math.random() * (gebaren.length))];


    while (Main.geb === undefined) {
      Main.current = Math.floor(Math.random() * (gebaren.length));
      Main.geb = gebaren[Main.current];
    }
    while (Main.geb1 === undefined || Main.geb1 === Main.geb) {
      Main.geb1 = gebaren[Math.floor(Math.random() * (gebaren.length))];
    }
    while (Main.geb2 === undefined || Main.geb2 === Main.geb || Main.geb2 === Main.geb1) {
      Main.geb2 = gebaren[Math.floor(Math.random() * (gebaren.length))];
    }

    //change the build up of the question depending on the categorie.
    if (Main.geb['Soort'] === "alfabet") {
      if (Main.sortquestion === 0) {
        $('#vraag').html("Welk gebaar past bij de letter " + Main.geb['Betekenis']);
      } else {
        $('#vraag').html("Welke letter past bij de video: ");
      }
    } else if (Main.geb['Soort'] === "cijfers") {
      if (Main.sortquestion === 0) {
        $('#vraag').html("Welk gebaar past bij het cijfer " + Main.geb['Betekenis']);
      } else {
        $('#vraag').html("Welk cijfer past bij de video: ");
      }
    } else {
      if (Main.sortquestion === 0) {
        $('#vraag').html("Welk gebaar past bij het woord " + Main.geb['Betekenis']);
      } else {
        $('#vraag').html("Welk gebaar past bij de video: ");
      }
    }

    Main.correctanswer = Main.geb['Betekenis'];

    if (Main.sortquestion === 1) {
      $('#videoo1').show();
      $('#videoo1').attr('src', "videos/" + Main.geb['Video']);
    }

    let optie = [[1, 2, 3], [1, 3, 2], [2, 3, 1], [2, 1, 3], [3, 1, 2], [3, 2, 1]];

    let kies = optie[Math.floor(Math.random() * 6)];

    let gebb1;
    let gebb2;
    let gebb3;

    if (kies[0] === 1) {
      gebb1 = Main.geb;
    }
    if (kies[0] === 2) {
      gebb1 = Main.geb1;
    }
    if (kies[0] === 3) {
      gebb1 = Main.geb2;
    }

    if (kies[1] === 1) {
      gebb2 = Main.geb;
    }
    if (kies[1] === 2) {
      gebb2 = Main.geb1;
    }
    if (kies[1] === 3) {
      gebb2 = Main.geb2;
    }

    if (kies[2] === 1) {
      gebb3 = Main.geb;
    }
    if (kies[2] === 2) {
      gebb3 = Main.geb1;
    }
    if (kies[2] === 3) {
      gebb3 = Main.geb2;
    }

    if (gebb1['Betekenis'] === Main.correctanswer) {
      Main.pos = 1;
    }
    if (gebb2['Betekenis'] === Main.correctanswer) {
      Main.pos = 2;
    }
    if (gebb3['Betekenis'] === Main.correctanswer) {
      Main.pos = 3;
    }

    //if it is the first sort of question show 3 videos and ask for the right video.
    if (Main.sortquestion === 0) {
      $('#videoo1').hide();
      $('#video1').show();
      $('#video1').attr('src', "videos/" + gebb1['Video']);
      $('#vraagje1').html('Optie 1');
      $('#button1').attr('checked', "false");
      $('#button1').attr('value', gebb1['Betekenis']);

      $('#video2').show();
      $('#video2').attr('src', "videos/" + gebb2['Video']);
      $('#vraagje2').html('Optie 2');
      $('#button2').attr('checked', "false");
      $('#button2').attr('value', gebb2['Betekenis']);

      $('#video3').show();
      $('#video3').attr('src', "videos/" + gebb3['Video']);
      $('#vraagje3').html('Optie 3');
      $('#button3').attr('checked', "false");
      $('#button3').attr('value', gebb3['Betekenis']);
      //else if it is the second sort of question show 1 video and ask for the right answer for the video.
    } else {
      $('#video1').hide();
      $('#videoo1').show();
      $('#vraagje1').html(gebb1['Betekenis']);
      $('#button1').attr('checked', "false");
      $('#button1').attr('value', gebb1['Betekenis']);

      $('#video2').hide();
      $('#vraagje2').html(gebb2['Betekenis']);
      $('#button2').attr('checked', "false");
      $('#button2').attr('value', gebb2['Betekenis']);

      $('#video3').hide();
      $('#vraagje3').html(gebb3['Betekenis']);
      $('#button3').attr('checked', "false");
      $('#button3').attr('value', gebb3['Betekenis']);
    }

  }

  //function to set up the new examplequestion
  static newexample(gebaren) {
    Main.current = Math.floor(Math.random() * (gebaren.length));
    Main.geb = gebaren[Main.current];

    while (Main.geb === undefined) {
      Main.current = Math.floor(Math.random() * (gebaren.length));
      Main.geb = gebaren[Main.current];
    }

    //change the build up of the question depending on the categorie.
    if (Main.geb['Soort'] === "alfabet") {
      $('#vraag').html("Het volgende gebaar past bij de letter " + Main.geb['Betekenis']);
    } else if (Main.geb['Soort'] === "cijfers") {
      $('#vraag').html("Het volgende gebaar past bij het cijfer " + Main.geb['Betekenis']);
    } else {
      $('#vraag').html("Het volgende gebaar past bij het woord " + Main.geb['Betekenis']);
    }

    Main.correctanswer = Main.geb['Betekenis'];

    $('#videoo1').hide();
    $('#video1').show();
    $('#video1').attr('src', "videos/" + Main.geb['Video']);
    $('#vraagje1').html('');
    $('#button1').attr('type', 'button');
    $('#button1').attr('value', Main.geb['Betekenis']);
    $('#button1').html('Oke, door!');
    $('#button1').attr('checked', 'false');
    $('#examplebutton').show();

    $('#video2').hide();
    $('#vraagje2').hide();
    $('#button2').hide();

    $('#video3').hide();
    $('#vraagje3').hide();
    $('#button3').hide();
  }

  //check if there are still enough gebaren in the gebaren array to make a new question
  static checkifenough() {
    Main.nulls = 0;
    for (let i = 0; i < Main.gebaren.length; i++) {
      if (Main.gebaren[i] === null || Main.gebaren[i] === undefined) {
        Main.nulls++;
      }
    }
    Main.nulls = Main.gebaren.length - Main.nulls;
    if (Main.nulls < 3) { //if there are not enough stop (go = 0)
      Main.go = 0;
    } else { //if there are enough keep going (go = 1)
      Main.go = 1;
    }
  }

  //remove the current gebaar from the gebaren list so only gebaren that have not been answered correct stay in
  static removeit() {
    delete Main.gebaren[Main.current];
  }

  //function to set the right soort from the level, get the right gebaren and put the html to the soortname
  static startlevel(level) {
    Main.levelss = level;
    if (level === "Alfabet") {
      Main.soort = "alfabet";
      this.half = 0;
      $('#Soort').html('Alfabet');
      Main.getthem();
    }
    if (level === "Cijfers") {
      Main.soort = "cijfers";
      this.half = 0;
      $('#Soort').html('Cijfers');
      Main.getthem();
    }
    if (level === "Alfabet1") {
      Main.soort = "alfabet";
      this.half = 1;
      $('#Soort').html('Alfabet level 1');
      Main.getthem();
    }
    if (level === "Alfabet2") {
      Main.soort = "alfabet";
      this.half = 2;
      $('#Soort').html('Alfabet level 2');
      Main.getthem();
    }
    if (level === "Cijfers1") {
      Main.soort = "cijfers";
      this.half = 1;
      $('#Soort').html('Cijfers level 1');
      Main.getthem();
    }
    if (level === "Cijfers2") {
      Main.soort = "cijfers";
      this.half = 2;
      $('#Soort').html('Cijfers level 2');
      Main.getthem();
    }
    if (level === "Consumptie") {
      Main.soort = "consumptie";
      this.half = 0;
      $('#Soort').html('Consumptie');
      Main.getthem();
    }
    if (level === "Gesprek") {
      Main.soort = "gesprek";
      this.half = 0;
      $('#Soort').html('Gesprek');
      Main.getthem();
    }
    if (level === "Gesprek1") {
      Main.soort = "gesprek";
      this.half = 1;
      $('#Soort').html('Gesprek level 1');
      Main.getthem();
    }
    if (level === "Gesprek2") {
      Main.soort = "gesprek";
      this.half = 2;
      $('#Soort').html('Gesprek level 2');
      Main.getthem();
    }
    if (level === "Scheldwoorden") {
      Main.soort = "scheldwoorden";
      this.half = 0;
      $('#Soort').html('Scheldwoorden');
      Main.getthem();
    }
    if (level === "Scheldwoorden1") {
      Main.soort = "scheldwoorden";
      this.half = 1;
      $('#Soort').html('Scheldwoorden level 1');
      Main.getthem();
    }
    if (level === "Scheldwoorden2") {
      Main.soort = "scheldwoorden";
      this.half = 2;
      $('#Soort').html('Scheldwoorden level 2');
      Main.getthem();
    }
    Main.setlevels(Main.levelss);
    Main.whatlevel();
    $('#ChooseLevel').hide();
    $('#appearance').show();
    $('#Soort').show();
  }

  //if the button has been clicked contiue.
}

Main.initialize();
Main.getlevels();

//add eventlistener to make shortcut for 1,2,3 and enter.
document.addEventListener('keydown', function (event) {
  if (event.key === "1" && Main.examplelevel === undefined) {
    Main.rad[0].click();
  } else if (event.key === "2" && Main.examplelevel === undefined) {
    Main.rad[1].click();
  } else if (event.key === "3" && Main.examplelevel === undefined) {
    console.log("HMM");
    Main.rad[2].click();
  }
  if (event.key === 'Enter' && Main.examplelevel === true) {
    Main.rad[0].click();
  }
  if (event.key === 'Enter' && Main.go === 0) {
    window.location.replace('index.php');
  }
});

//for every answered question see if it correct or wrong.
for (let i = 0; i < Main.rad.length; i++) {
  Main.rad[i].onclick = function () {
    $('#newlevel').hide();
    $('#examplelevel').hide();
    this.checked = false;
    if (this !== prev) {
      Main.prev = this;
    }
    if (this.value.toString(8) === Main.correctanswer) {
      //if the value is correct remove it from the gebaren list, check if there are enough questions and add one to good++ (keeping track of how many good answers in row).
      Main.removeit();
      Main.checkifenough();
      Main.goed = 1;
      Main.good++;
      $('#validation').html("");
      Main.inarow();

    } else {
      //else return that the question is answered wrong and give the correct option back
      if (Main.sortquestion === 0) {
        $('#validation').html("Oei fout beantwoord! Het goede antwoord was Optie " + Main.pos);
      }
      if (Main.sortquestion === 1) {
        $('#validation').html("Oei fout beantwoord! Het goede antwoord was " + Main.correctanswer);
      }
      Main.checkifenough();
      Main.goed = 0;
      Main.good = 0;
      Main.inarow();
    }
  };
}
