<?php
include 'includememory.php';

//if the right variables have been posted
if (isset($_POST["start"]) & isset($_POST["end"])) {
  $start = $_POST["start"];
  $end = $_POST["end"];

  //select all the cards within the start and end value
  $sql = "SELECT * FROM cards WHERE ID > " . $start . " AND ID <= " . $end;
  $result = $link->query($sql);

  $return_arr = array();

//put the information from the db in an array
  if ($result = mysqli_query($link, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
      $row_array['name'] = $row['id'];
      $row_array['description'] = $row['description'];
      $row_array['done'] = $row['done'];

      array_push($return_arr, $row_array);
    }
  }

  echo json_encode($return_arr);
} else {
  echo "something is not working";
}
