<?php

include 'include/connection.php';

session_start();

if (isset($_POST['n'])) {

  $n = $_POST['n'];
  $next = $_POST['next'];

  //insert new vooruitgang in de db from the new user
  $query = "INSERT vooruitgang SET " . $next . " = " . $n . " WHERE userid ='" . $_SESSION['userid'] . "' ";

  $conn = new mysqli('localhost', $user, $pass, $dbname);

  if ($conn->query($query) === TRUE) {
    echo "okay";
  } else {
    echo "not okay";
  }
}
