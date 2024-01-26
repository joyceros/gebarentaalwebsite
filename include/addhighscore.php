<?php
include 'includememory.php';

//start session and check if logged in
session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
  header('location: ../index.php');
  exit();
}

$name = $_SESSION['username'];
$p = $_POST['percentage'];
$t = $_POST['time'];
$s = $_POST['score'];
//insert the new highscore and remove the lowest highscore of this user
$sql = "INSERT INTO highscores (name, percentage, time, score) VALUES ('" . $name . "', " . $p . ", " . $t . ", " . $s . "); DELETE FROM highscores WHERE name = '" . $name . "' AND score < (SELECT MAX(score)   FROM (SELECT * FROM highscores) as hs WHERE hs.name = '" . $name . "')";

$result = $link->multi_query($sql);
echo json_encode($result);
