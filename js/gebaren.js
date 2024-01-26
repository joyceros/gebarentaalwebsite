let gebaren;
let newgeb = [];
let soort = "";
let rad = document.Choice.answer;
let prev = null;

//get all the gebaren from the db from this specific soort
function getgebaren() {
  $.ajax({
    type: "GET",
    url: 'include/getinfo.php',
    dataType: "json",
    encode: true,
    data: {'Betekenis': 'Betekenis', 'Video': 'Video', 'Soort': soort},
    success: function (data) {
      gebaren = data;
      newgeb = [];
      secondcheck();
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//for the checklist if one has been clicked set the soort to current soort and get the info from db
for (let i = 0; i < rad.length; i++) {
  rad[i].onclick = function () {
    if (this !== prev) {
      prev = this;
    }
    if (this.value.toString(8) === "Alfabet") {
      soort = "alfabet";
      getgebaren();
      secondcheck();
    }
    if (this.value.toString(8) === "Cijfers") {
      soort = "cijfers";
      getgebaren();
      secondcheck();
    }
    if (this.value.toString(8) === "Consumpties") {
      soort = "consumptie";
      getgebaren();
      secondcheck();
    }
    if (this.value.toString(8) === "Gesprek") {
      soort = "gesprek";
      getgebaren();
      secondcheck();
    }
    if (this.value.toString(8) === "Scheldwoorden") {
      soort = "scheldwoorden";
      getgebaren();
      secondcheck();
    }
  }
}

//print all the gebaren on the page with jquery to html
function printit(gebaren) {
  $('#gebaren').empty('');
  for (let i = 0; i < gebaren.length; i++) {
    if (gebaren[i] !== undefined && gebaren[i] !== null) {
      let gebaar = gebaren[i];

      if (i < 10) {
        $("#gebaren").append("<span id='left'>" + gebaar['Betekenis'] +
          "<div class='videos'>" +
          "<video width='320' height='240' controls loop muted>" +
          "<source src='videos/" + gebaar['Video'] + "' type='video/mp4'>" +
          "Your browser does not support the video tag." +
          "</video>" +
          "</div></span>");
      } else if (i < 20) {
        $("#gebaren").append("<span id='left'>" + gebaar['Betekenis'] +
          "<div class='videos'>" +
          "<video width='320' height='240' controls loop muted>" +
          "<source src='videos/" + gebaar['Video'] + "' type='video/mp4'>" +
          "Your browser does not support the video tag." +
          "</video>" +
          "</div></span>");
      } else {
        $("#gebaren").append("<span id='left'>" + gebaar['Betekenis'] +
          "<div class='videos'>" +
          "<video width='320' height='240' controls loop muted>" +
          "<source src='videos/" + gebaar['Video'] + "' type='video/mp4'>" +
          "Your browser does not support the video tag." +
          "</video>" +
          "</div></span>");
      }

    }
  }
}

//get all the right gebaren and delete the wrong ones
function secondcheck() {
  if (gebaren !== undefined) {
    for (let i = 0; i < 83; i++) {
      if (gebaren[i] !== undefined && gebaren[i] !== null) {
        let gebaar = gebaren[i];
        if (gebaar['Soort'] !== soort) {
          delete gebaren[i];
        } else {
          newgeb.push(gebaren[i]);
        }
      }
    }
    printit(newgeb);
  }
}

//add eventlisterer for 1,2,3,4,5 shortcuts
document.addEventListener('keydown', function (event) {
  if (event.key === "1") {
    rad[0].click();
    soort = "alfabet";
    getgebaren();
  }
  if (event.key === "2") {
    rad[1].click();
    soort = "cijfers";
    getgebaren();
  }
  if (event.key === "3") {
    rad[2].click();
    soort = "consumpties";
    getgebaren();
  }
  if (event.key === "4") {
    rad[3].click();
    soort = "gesprek";
    getgebaren();
  }
  if (event.key === "5") {
    rad[4].click();
    soort = "scheldwoorden";
    getgebaren();
  }
});
