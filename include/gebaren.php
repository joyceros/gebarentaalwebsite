<?php
include 'include.php';

$sql = "SELECT * FROM gegevens";
$result = $link->query($sql);


$return_arr = array();

if ($result = mysqli_query($link, $sql)) {
  while ($row = mysqli_fetch_assoc($result)) {
    $row_array['Betekenis'] = $row['Betekenis'];
    $row_array['Video'] = $row['Video'];

    array_push($return_arr, $row_array);
  }
}

mysqli_close($link);
echo json_encode($return_arr);

//for every sign in the db put out every video
while ($row = mysqli_fetch_assoc($result)) {
  echo $row["Betekenis"];
  echo "<div class='videos'><video width='320' height='240' controls loop>
        <source src=" . '../videos/' . $row["Video"] . " type='video/mp4'>
        Your browser does not support the video tag.
        </video><br></div>";
}
