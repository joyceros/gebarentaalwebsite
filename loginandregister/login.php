<?php
include '../include/connection.php';

session_start();
//if the user is already logged in go to homepage
if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
  header('location: index.php');
  exit();
}

//if the server requested a post method
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  if (isset($_POST['username'], $_POST['password']) && !empty($_POST['username']) && !empty($_POST['password'])) {  //check if username and password are not empty

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    //put a / for every string to make sure only actual strings can be send to the db
    mysqli_real_escape_string($link, $username);
    mysqli_real_escape_string($link, $password);

    $user_query = "SELECT user_id, username, password FROM users WHERE username='" . $username . "'";
    $user_query_execute = mysqli_query($link, $user_query);
    $user_num_rows = mysqli_num_rows($user_query_execute);

    //execute the query and get the number or rows
    if ($user_num_rows == 1) {  //if the username is in the db check if the password matches, else head back to the page with error message.
      $username = strtolower($username);
      $username = mysqli_real_escape_string($link, $username);
      $fetch_user = mysqli_fetch_assoc($user_query_execute);
      if (password_verify($password, $fetch_user['password'])) {
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
        $_SESSION['userid'] = $fetch_user['user_id'];
        header('location: ../index.php');
      } else {
        header('location: loginwrong.php');
      }
    } else {
      header('location: loginwrong.php');
    }
  }
}
