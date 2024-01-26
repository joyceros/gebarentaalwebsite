<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//login for gebaren.rosenauonline.com
$user = "eu191536";
$pass = "eojYRTZW";
$dbname = "eu191536_levelgegevens";

//login for MAMP
//$user = "root";
//$pass = "123456";
//$dbname = "memorycards";

$link = mysqli_connect('localhost', $user, $pass, $dbname);
$return_arr = array();
if (mysqli_connect_error()) { //test the link if it doesnt work stop
  die(mysqli_connect_error());
}
