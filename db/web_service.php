<?php
echo 'This will call db based on get parameters to load the schedule<br/>';
echo $_GET['day'].'<br/>';
echo $_GET['when'].'<br/>';
?><?php
//insert_json_db.php
$cleanData = $HTTP_RAW_POST_DATA;
//$cleanData = json_decode($postedData, true);
require 'load_db.php';
try {
  $db = loadDB();
  $query = 'select fans from upvote where article_id = :articleId';
  $statement = $db->prepare($query);
  $statement->bindParam(':articleId', $cleanData);

  $statement->execute();
  $result = $statement->fetch();
  //result
  echo $result["fans"];
}
catch (Exception $ex)
{
	echo "Error with DB. ";//.$ex;
	die();
};

die();
?>