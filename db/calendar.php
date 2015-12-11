<?php

require 'load_db.php';
try {
  $db = loadDB();

  $query = 'select COUNT(*) AS appts, appointment_date from appointment ORDER BY appointment_date'; 
  $stmnt = $db->prepare($query);
  $stmnt->execute();

  $appoints = '{"appointments":[';
  while($row = $stmnt->fetch())
  {
    $appts = $row['appts'];
	$appt_date = $row['appointment_date'];
	$app_yr = substr($appt_date, 0, 4);
	$app_mo = substr($appt_date, 5, 2);
	$app_day = substr($appt_date, 7, 2);
    $appoints .= '{"appts":"' . $appts . '","year":"' . $app_yr. '","month":"' . $app_mo. '","day":"' . $app_day. '"},';
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