<?php
session_start();
if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
  header('location: ../index.php');
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Registreer pagina</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

  <meta name="theme-color" content="#fafafa">
</head>
<body background="../img/background.jpg">
<div id="menuToggle">
  <input type="checkbox"/>
  <span></span>
  <span></span>
  <span></span>
  <ul id="menu">
    <a href="../info.html">
      <li>Informatie</li>
    </a>
    <a href="../gebaren.html">
      <li>De gebaren</li>
    </a>
  </ul>
</div>
<div id="logo">
  <a href="../index.php">
    <img src="../img/logo.png">
  </a>
</div>
<br><br><br><br>
<h1>Registreerpagina</h1>
<form method="post" action="register.php" enctype="multipart/form-data">
  <label>Gebruikersnaam: </label>
  <input type="text" name="username" placeholder="Gebruikersnaam" required autofocus>

  <label>Wachtwoord: </label>
  <input type="password" name="password" placeholder="Wachtwoord" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">

  <label>Geboortedatum:</label>
  <input type="date" name="birthdate" required>
  <p>Datum moet in volgorde van jaar-maand-dag (safari)</p>
<p>Wachtwoord moet een lengte hebben van minimaal 8, een cijfer, een kleine letter en een hoofdletter bevatten.</p>
<br><br>
  <button type="submit">Registreer!</button>
</form>
<br><br><br><br><br><br>
<a href="loginn.php">
  <button>Ik heb al een account!</button>
</a>
</body>
</html>
