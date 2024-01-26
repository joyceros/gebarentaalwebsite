<?php
include '../include/connection.php';

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') { //if the requested method is post
  if (isset($_POST['username'], $_POST['password']) && !empty($_POST['username']) && !empty($_POST['password'])) {  //check if username and password are not empty

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $time = $_POST['birthdate'];

    //check if date is actual date
    function validateDate($date, $format = 'Y-m-d')
    {
      $d = DateTime::createFromFormat($format, $date);
      // The Y ( 4 digits year ) returns TRUE for any integer with any number of digits so changing the comparison from == to === fixes the issue.
      return $d && $d->format($format) === $date;
    }

    $username = strtolower($username);
    $password = password_hash($password, PASSWORD_DEFAULT); //hash the password for safety

    $username = mysqli_real_escape_string($link, $username);
    $password = mysqli_real_escape_string($link, $password);

    $select_query = "SELECT * FROM users WHERE username = '" . $username . "'";
    $execute_select_query = mysqli_query($link, $select_query);
    $user_num_rows = mysqli_num_rows($execute_select_query);

    if (!$user_num_rows >= 1 && validateDate($time)) {   //if there is not already a user with this username create one.

      $insert_user_query = "INSERT INTO users (username, password, birthdate) values ('" . $username . "','" . $password . "', '" . $time . "')";
      $execute_insert_query = mysqli_query($link, $insert_user_query);

      if (!$execute_insert_query) {
        echo mysqli_error($link);
      } else {
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
      }

      //get the userid from the db to put this in the other table
      $user_queryy = "SELECT * FROM users WHERE username='" . $username . "'";
      $user_query_executee = mysqli_query($link, $user_queryy);
      $fetch_user = mysqli_fetch_assoc($user_query_executee);

      $_SESSION['userid'] = $fetch_user['user_id'];
      $userid = $fetch_user['user_id'];
      $datenow = date("2019-11-08");

      //give all right to the user unless they are under 18
      $insert_user_queryy = "INSERT INTO vooruitgang (userid, alfabet, cijfers, consumptie, gesprek, scheldwoorden) values (" . $userid . ", 1, 1, 0, 0, 0)";
      if ($time < $datenow) {
        if ($time > date("2001-11-08")) {
          $insert_user_queryy = "INSERT INTO vooruitgang (userid, alfabet, cijfers, consumptie, gesprek, scheldwoorden) values (" . $userid . ", 1, 1, 0, 0, -1)";
        }
      }
      $execute_insert_queryy = mysqli_query($link, $insert_user_queryy);

      if (!$execute_insert_queryy) {
        echo mysqli_error($link);
      } else {
        header('location: ../index.php');
      }
    } else {
      header('location: registerwrong.php');
    }
    return $time;
  }
}
header('location: loginn.php');
