<?php
//if the user is not logged in, head over to loginpage
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
    <a href="http://joycerosenau.nl/memory2/public/index.html">
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
<h2 hidden id="Soort"></h2>
<div id="ChooseLevel">
  <p>Kies een categorie om deze te oefenen. Sommige levels zijn misschien nog niet unlocked, hiervoor moet je eerst de
    levels
    daarboven halen.</p>
  <div class="w3-container">
    <div class="w3-center">
      <p id="niveau" hidden></p>
      <form onclick="Main.startlevel('Alfabet1');  Main.setlevels('Alfabet2'); return false;">
        <button disabled id="Alfabet1" class="w3-button w3-circle w3-black">Alfabet 1e helft</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Alfabet2'); Main.setlevels('Alfabet2'); return false;">
        <button disabled id="Alfabet2" class="w3-button w3-circle w3-black">Alfabet 2e helft</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Alfabet');  Main.setlevels('Alfabet'); return false;">
        <button disabled id="Alfabet" class="w3-button w3-circle w3-black">Volledig alfabet</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Cijfers1');  Main.setlevels('Cijfers1'); return false;">
        <button disabled id="Cijfers1" class="w3-button w3-circle w3-black">Cijfers 1 t/m 10</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Cijfers2');  Main.setlevels('Cijfers2'); return false;">
        <button disabled id="Cijfers2" class="w3-button w3-circle w3-black">Cijfers 11 t/m 20</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Cijfers');  Main.setlevels('Cijfers'); return false;">
        <button disabled id="Cijfers" class="w3-button w3-circle w3-black">Cijfers 1 t/m 20</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Consumptie');  Main.setlevels('Consumptie'); return false;">
        <button disabled id="Consumptie" class="w3-button w3-circle w3-black">Alle consumpties</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Gesprek1');  Main.setlevels('Gesprek1'); return false;">
        <button disabled id="Gesprek1" class="w3-button w3-circle w3-black">1e deel basiswoorden</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Gesprek2');  Main.setlevels('Gesprek2'); return false;">
        <button disabled id="Gesprek2" class="w3-button w3-circle w3-black">2e deel basiswoorden</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Gesprek');  Main.setlevels('Gesprek'); return false;">
        <button disabled id="Gesprek" class="w3-button w3-circle w3-black">Alle basiswoorden</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Scheldwoorden1');  Main.setlevels('Scheldwoorden1'); return false;">
        <button disabled id="Scheldwoorden1" class="w3-button w3-circle w3-black">1e deel scheldwoorden</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Scheldwoorden2');  Main.setlevels('Scheldwoorden2'); return false;">
        <button disabled id="Scheldwoorden2" class="w3-button w3-circle w3-black">2e deel scheldwoorden</button>
      </form>
      <p></p>
      <form onclick="Main.startlevel('Scheldwoorden');  Main.setlevels('Scheldwoorden'); return false;">
        <button disabled id="Scheldwoorden" class="w3-button w3-circle w3-black">Alle scheldwoorden</button>
      </form>

    </div>

  </div>
</div>

<div id="appearance" hidden>
  <p id="newlevel" hidden>Klik op het antwoord wat jij denkt dat goed is. Als shortcut kan je ook gebruik maken van de
    knoppen 1,2 en 3 om een antwoord aan te geven en de knop Enter om verder te gaan.</p>

  <p id="examplelevel" hidden>Je speelt nu een voorbeeldlevel. Hierbij is het de bedoeling om eerst de gebaren te leren
    voordat je getest wordt.
    Je kunt op de knop klikken of gebruik maken van enter om naar het volgende gebaar te gaan.</p>

  <b><p id="validation"></p><b></b>
    <h4><span id="vraag">Welk gebaar past bij</span></h4>
    <br><br>
    <div class='vraag1'>
      <video hidden playsinline controls loop muted autoplay id="videoo1">
        <source src="videos/A.mp4" type='video/mp4'>
        Your browser does not support the video tag.
      </video>
    </div>
    <form action="" name="FirstQuestion">
      <div class='vraag1'>
        <video class="video" playsinline controls loop muted autoplay id="video1">
          <source src="videos/A.mp4" type='video/mp4'>
          Your browser does not support the video tag.
        </video>
      </div>
      <input type="radio" name="answer" accesskey="1" value="A" id="button1">
      <div id="vraagje1">
        Optie 1 <br>
      </div>
      <div class='vraag1'>
        <video class="video" playsinline controls loop muted autoplay id="video2">
          <source src="videos/B.mp4" type='video/mp4'>
          Your browser does not support the video tag.
        </video>
      </div>
      <input type="radio" name="answer" accesskey="2" value="B" id="button2">
      <div id="vraagje2">
        Optie 2 <br>
      </div>
      <div class='vraag1'>
        <video class="video" playsinline controls loop muted autoplay id="video3">
          <source src="videos/C.mp4" type='video/mp4'>
          Your browser does not support the video tag.
        </video>
      </div>
      <input type="radio" name="answer" accesskey="3" value="C" id="button3">
      <div id="vraagje3">
        Optie 3 <br>
      </div>
    </form>
    <br><br>
</div>

<div hidden id="done">
  <p>Je hebt alle vragen gehad en goed beantwoord! Na twee keer oefenen unlock je een nieuw level!</p>
  <p><a href="index.php">Je kan hier klikken om naar de hoofdpagina te gaan.</a></p>
</div>
<div hidden id="doneexample">
  <p>Je hebt alle gebaren van dit level gehad. Als je dit twee keer hebt geoefend mag je door naar het volgende
    level!</p>
  <a href="index.php">Je kan hier klikken om naar de hoofdpagina te gaan</a>
</div>

<script src="js/vendor/modernizr-3.7.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script>

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
