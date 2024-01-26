<?php
include 'includememory.php';

//select first 10 highscores ordered by score where only the highest score of a user comes in
$sql = "SELECT DISTINCT name, percentage, time, score FROM highscores ORDER BY score DESC limit 10";
$result = $link->query($sql);

$return_arr = array();

//put the information from db in an array
if ($result = mysqli_query($link, $sql)) {
  while ($row = mysqli_fetch_assoc($result)) {
    $row_array['name'] = $row['name'];
    $row_array['percentage'] = $row['percentage'];
    $row_array['time'] = $row['time'];
    $row_array['score'] = $row['score'];

    array_push($return_arr, $row_array);
  }
}
echo json_encode($return_arr);
