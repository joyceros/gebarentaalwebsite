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
  <title>Inlog pagina</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

  <meta name="theme-color" content="#fafafa">
</head>
<body background="../img/background.jpg">
<div id="menuToggle">
  <label>
    <input type="checkbox"/>
  </label>
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
    <img src="../img/logo.png" alt="">
  </a>
</div>
<br><br><br><br>
<h1>Inlogpagina</h1>
<p> Je hebt een verkeerde gebruikersnaam en/of wachtwoord ingevuld.</p>
<form method="post" action="login.php" enctype="multipart/form-data">
  <label>Gebruikersnaam: </label>
  <label>
    <input type="text" name="username" placeholder="Gebruikersnaam" required autofocus>
  </label>

  <label>Wachtwoord: </label>
  <label>
    <input type="password" name="password" placeholder="Wachtwoord">
  </label>
<br><br>
  <button type="submit">Log in!</button>
</form>
<br><br><br><br><br><br>
<p>Nog geen account?</p>
<a href="registerr.php">
  <button>Maak hier een account aan!</button>
</a>

</body>
</html>
