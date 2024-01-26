<?php

include 'include/connection.php';

session_start();
$sqll = "SELECT * FROM vooruitgang WHERE userid ='" . $_SESSION['userid'] . "' ";
$resultt = $link->query($sqll);


$return_arrr = array();
//make empty array and fill it for every row there is of the result from the query. return this encoded to json

if ($resultt = mysqli_query($link, $sqll)) {
  while ($row = mysqli_fetch_assoc($resultt)) {
    $row_arrayy['userid'] = $row['userid'];
    $row_arrayy['alfabet'] = $row['alfabet'];
    $row_arrayy['cijfers'] = $row['cijfers'];
    $row_arrayy['consumptie'] = $row['consumptie'];
    $row_arrayy['gesprek'] = $row['gesprek'];
    $row_arrayy['scheldwoorden'] = $row['scheldwoorden'];

    array_push($return_arrr, $row_arrayy);
  }
}

echo json_encode($return_arrr);
