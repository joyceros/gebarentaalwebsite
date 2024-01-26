<?php
include 'includememory.php';

$result1 = 0;
$return = 0;
$return_arr = array();
$id = 0;

if (isset($_POST["card1"])) {
  $id = $_POST["card1"];

  //select all the cards with this id and put the description in an array
  $sql1 = "SELECT * FROM cards WHERE ID = " . $id;
  $result1 = $link->query($sql1);

  if ($result1 = mysqli_query($link, $sql1)) {
    while ($row = mysqli_fetch_assoc($result1)) {
      $row_array['description'] = $row['description'];

      array_push($return_arr, $row_array);
    }
  }

  $return = $return_arr[0];
} else {
  echo "something is not working";
}
