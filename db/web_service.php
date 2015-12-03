<?php
$postedData = $HTTP_RAW_POST_DATA;
$cleanData = json_decode($postedData, true);

$date = $cleanData["year"]."-".($cleanData["month"]+1)."-";
if ($cleanData["day"] < 10) {
  $date .= "0"; 
}
$date .= $cleanData["day"];

$user = $cleanData["user"];

require 'load_db.php';
try {
  GLOBAL $db;
  $db = loadDB();
  //TODO: load appointments, otherwise display blanks (currently loading all appointments for day)
  //TODO: Do not constrain by user, but do show which user
  $query = 'select appointment_time, location from appointment where appointment_date = :date'; 
  $stmnt = $db->prepare($query);
  $stmnt->bindParam(':date', $date);
  $stmnt->execute();

  $appoints = "{date: '".$date."', times:[";
  while($row = $stmnt->fetch())
  {
    //$row['appointment_date']
    $appoints .= "{ time: ".$row['appointment_time']."},";
    //, location: '".$row['location']."'
  }
  //remove trailing comma
  rtrim($appoints, ",");
  $appoints .= "]}";

  echo $appoints;
}
catch (Exception $ex)
{
	echo "Error with DB. ".$ex;
	die();
};

die();
?>