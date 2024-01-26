<?php

include 'include/connection.php';

session_start();

if (isset($_POST['n'])) {

  $n = $_POST['n'];
  $next = $_POST['next'];

  //update the level upgrade with send categorie and number

  $query = "UPDATE vooruitgang SET " . $next . " = " . $n . " WHERE userid ='" . $_SESSION['userid'] . "' ";

  $conn = new mysqli('localhost', $user, $pass, $dbname);

  if ($conn->query($query) === TRUE) {
    echo "done";
  } else {
    echo "not done";
  }
}
