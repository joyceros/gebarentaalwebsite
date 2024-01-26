<?php
session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
  header('location: loginandregister/loginn.php');
  exit();
}
?>

<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

  <meta name="theme-color" content="#fafafa">
</head>

<body background="img/background.jpg">
<!--[if IE]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade
  your browser</a> to improve your experience and security.</p>
<![endif]-->

<!-- Add your site or application content here -->
<div id="menuToggle">
  <input type="checkbox"/>
  <span></span>
  <span></span>
  <span></span>
  <ul id="menu">
    <a href="index.php">
      <li>Hoofdpagina</li>
    </a>
    <a href="info.html">
      <li>Informatie</li>
    </a>
    <a href="gebaren.html">
      <li>De gebaren</li>
    </a>
    <a href="memory.php">
      <li>Memorygame</li>
    </a>
  </ul>
</div>
<div id="logo">
  <a href="index.php">
    <img src="img/logo.png">
  </a>
</div>
<form method="post" action="loginandregister/logout.php" enctype="multipart/form-data">
  <button type="submit" id="logout" class="w3-button w3-indigo">Uitloggen</button>
</form>
<div id="memorygame">
  <div id="startgame">
    <br><br>
    <p id="tekst">Welkom bij memory spelen! Je kunt op de onderstaande knop klikken om te beginnen zodra je je naam hebt
      ingevuld. <br><br>Het spel werkt als volgt: Er zijn 6 paar kaarten waarvan de onderkant matcht met elkaar. Je kan klikken op een kaart en deze zal omdraaien,
    hierna kan je nog een kaart aanklikken en als ze matchen blijven ze staan. Als ze niet matchen dan worden ze weer omgedraaid. Als je een kaart aanklikt
      kan je deze ook meteen weer omdraaien door er nog een keer op te tikken. Je hebt een tijd van 2 minuten om alle memorykaarten goed te raden en na deze tijd
    zal je score worden berekent door het percentage van wat je goed hebt samen te voegen met de tijd die je nog over had.</p>
  </div>
  <p></p><br><br>
  <button class="middlebutton big-button" id="start">Start het spel!</button>
  <p></p>
  <br><br><br>
  <div id="cards" hidden></div>
  <p id="timerop"></p>
  <p id="binnentijd"></p>

</div>
<div id="highscore" hidden class="middle">
  <p>Highscore weergave:</p>
  <div id="highscores"></div>
</div>

<button id="highscorebutton">Highscores checken</button>

<script src="js/vendor/modernizr-3.7.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script src="js/time.js"></script>
<script src="js/highscore.js"></script>
<script src="js/card.js"></script>
<script src="js/memory.js"></script>


<!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
<script>
    window.ga = function () {
        ga.q.push(arguments)
    };
    ga.q = [];
    ga.l = +new Date;
    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('set', 'transport', 'beacon');
    ga('send', 'pageview')
</script>
<script src="https://www.google-analytics.com/analytics.js" async defer></script>
</body>

</html>
