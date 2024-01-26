<?php
include 'getdescription.php';

//check if the right variables have been send
if (isset($_POST["card1"]) & isset($_POST["card2"])) {
  $cardid = $_POST["card2"];

  $carddescription = $return['description'];
  $sql = "SELECT * FROM cards WHERE description ='" . $carddescription . "' AND ID != " . $id;

  $result = $link->query($sql);
  $result2 = mysqli_fetch_assoc($result);

  //if the first card has the same description as the second card then they are the same
  if (json_encode($result2['id']) === json_encode($cardid)) {
    echo "true";
  } else {
    echo "false";
  }
} else {
  echo "something went wrong";
}
