<?php
header('Content-Type: application/json');

$actual_link = "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

//login for joycerosenau.nl
$dbname = "rosenau_gebaren";
$user = "rosenau_root";
$pass = "123Welkom";

//login for MAMP
//$dbname = "eu191536_levelgegevens";
//$user = "root";
//$pass = "123456";

$link = mysqli_connect('localhost', $user, $pass, $dbname);

if (mysqli_connect_error()) {
  die(mysqli_connect_error());
}
