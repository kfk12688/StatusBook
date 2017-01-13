<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];
$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);

$result = mysql_query("SELECT * FROM message ORDER BY id DESC");


while($row = mysql_fetch_array($result))
  {
  $regno1=$row['regno1'];
    $message=$row['message'];
    $fname=$row['fname'];
    if($regno==$regno1){
   echo '<div class="panel-body">';
  echo '<p>'.'<span></span>'. '&nbsp;&nbsp;'.'<span>'.$fname.'&nbsp;&nbsp;'.'Leave a Message to you'.'&nbsp;&nbsp;'.'</span>' . $message.'</p>';
  echo ' </div>';
}}

mysql_close($con);
?>
