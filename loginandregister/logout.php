<?php

session_start();

//forget this session and forget who is logged in
if (session_destroy()) {
  session_unset();
  header('location: loginn.php');
}
