<?php
$postedData = $HTTP_RAW_POST_DATA;
$cleanData = json_decode($postedData, true);
$date = $cleanData["year"]."-".$cleanData["month"]."-".$cleanData["day"];
$user = $cleanData["user"];

require 'load_db.php';
try {
  GLOBAL $db;
  $db = loadDB();
  //TODO: load appointments, otherwise display blanks (currently loading all appointments for day)
  //TODO: Do not constrain by user, but do show which user
  $query = 'select appointment_time, appointment_date from appointment where appointment_date = :date and user_id = (select user_id from user where name = :user)'; 
  $stmnt = $db->prepare($query);
  $stmnt->bindParam(':date', $date);
  $stmnt->bindParam(':user', $user);
  $stmnt->execute();
  while($row = $stmnt->fetch())
  {
    echo $row['appointment_date']." Time:";
    echo $row['appointment_time']." ";
  }
  echo "SOMETHING";
}
catch (Exception $ex)
{
	echo "Error with DB. ".$ex;
	die();
};

die();
?>