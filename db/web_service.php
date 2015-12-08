<?php
$postedData = $HTTP_RAW_POST_DATA;
$cleanData = json_decode($postedData, true);

$date = $cleanData["year"]."-".($cleanData["month"]+1)."-";
if ($cleanData["day"] < 10) {
  $date .= "0"; 
}
$date .= $cleanData["day"];
$user = $cleanData["user"];

//decide whether to insert. alternatively select only
$shouldInsert = $cleanData["hour"];
if ($shouldInsert) {
  $appointHour = $cleanData["hour"].":00:00";
  $appointLocation = $cleanData["location"];
  $message = $cleanData["message"];
}

require 'load_db.php';
try {
  GLOBAL $db;
  $db = loadDB();

  if ($shouldInsert) {
    $insertQuery = 'insert into appointment values(null, :date, :hour, :location ,(SELECT user_id from user where name = :user), :message)';
    $insertStmnt = $db->prepare($insertQuery);
    $insertStmnt->bindParam(':date', $date);
    $insertStmnt->bindParam(':hour', $appointHour);
    $insertStmnt->bindParam(':location', $appointLocation);
    $insertStmnt->bindParam(':user', $user);
    $insertStmnt->bindParam(':message', $message);


    $insertStmnt->execute();
  }
  $query = 'select appointment_time, location from appointment where appointment_date = :date'; 
  $stmnt = $db->prepare($query);
  $stmnt->bindParam(':date', $date);
  $stmnt->execute();

  $appoints = '{"date": "'.$date.'", "times":[';
  while($row = $stmnt->fetch())
  {
    $location = $row['location'];
    $hour = ltrim($row['appointment_time'], "0");//remove times beginning with 0
    $hour = current(explode(':', $hour));
    $appoints .= '{"hour":"'.$hour.'","location":"'.$location.'"},';
  }
  //remove trailing comma
  $appoints = rtrim($appoints, ",");
  $appoints .= ']}';

  echo $appoints;

}
catch (Exception $ex)
{
  echo "Error with DB. ".$ex;
  die();
};

die();
?>