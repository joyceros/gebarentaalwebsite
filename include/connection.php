<?php
include 'include.php';

$sql = "SELECT * FROM gegevens";
$result = $link->query($sql);

$return_arr = array();

//create an array with all the database output
if ($result = mysqli_query($link, $sql)) {
  while ($row = mysqli_fetch_assoc($result)) {
    $row_array['Betekenis'] = $row['Betekenis'];
    $row_array['Video'] = $row['Video'];
    $row_array['Soort'] = $row['Soort'];

    array_push($return_arr, $row_array);
  }
}
