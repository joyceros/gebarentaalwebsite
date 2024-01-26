class Card {
  static memorycards = [];

  //for every card that has been recieved from the db add them as a newkaart to the list
  static setupcards(data) {
    cardslength = data.length;
    for (let i = 0; i < data.length; i++) {
      let card = data[i];
      if (card['name'] !== undefined || card['description'] !== undefined) {
        Card.newkaart(card['name'], card['description']);
      }
    }
    let cards = Card.shuffle(Card.memorycards);
    Card.makememory(cards);
  }

  //shuffle all the cards randomly until everything has changed position
  static shuffle(array) {
    shuffledcards = [];
    for (let x = 0; x < cardslength; x++) {
      let random = Math.floor(Math.random() * array.length);
      while (numbersdone.includes(random)) {
        random = Math.floor(Math.random() * array.length);
      }
      numbersdone.push(random);
      shuffledcards.push(array[random]);
    }
    return shuffledcards;
  }

  //make the memory game by using jquery to add to the html
  static makememory(cards) {   //show cards on the screen
    for (let z = 0; z < cards.length; z++) {
      let r = $('<span id="left">' +
        '<button id="' + cards[z].name + '" disabled="disabled">\n' +
        '<img alt="Submit" id="' + cards[z].name + 'pic' + '"\n' +
        'src="img/memorycard.jpg">\n' +
        '</button></span>');
      $("#cards").append(r);
    }
    $('#cards').hide();
    main.newgame();
  }

  //generate new card and add to the list
  static newkaart(name, description) {
    this.memorycard = new Memorycard(name, description);
    Card.memorycards.push(this.memorycard);
    clicked.push(false);
  }

  //get all the cards within the range that has been set with randomcards.
  static getrangecards() {
    let e = randomcards.end;
    let s = randomcards.start;
    $.ajax({
      type: "POST",
      url: 'include/getdata.php',
      data: {start: s, end: e},
      success: function (data1) {
        Card.setupcards(data1);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
}

function Memorycard(name, description) {
  this.name = name;
  this.description = description;
  this.done = false;
}

//get 2 random numbers 12 numbers apart for a set of cards
let randomcards =
  {
    get end() {
      this.e = Math.floor(Math.random() * (cardslength + 1)) + 12;
      while (this.e > 53 || this.e % 2 === 1 || this.e < 10) {
        this.e = Math.floor(Math.random() * (cardslength + 1)) + 12;
      }
      end = this.e;
      return this.e;
    },
    get start() {
      this.s = end - 12;
      return this.s;
    }
  };
