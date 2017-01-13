<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];
$subject_name=$_POST['subject_name'];
$unit1=$_POST['unit1'];
$unit2=$_POST['unit2'];
$unit3=$_POST['unit3'];
$unit4=$_POST['unit4'];
$unit5=$_POST['unit5'];
$unit6=$_POST['unit6'];
$content1=$_POST['content1'];
$content2=$_POST['content2'];
$content3=$_POST['content3'];
$content4=$_POST['content4'];
$content5=$_POST['content5'];
$content6=$_POST['content6'];
$subject_code=$_POST['subject_code'];
$description=$_POST['description'];
mysql_query("insert into subject_secedule subject_code='$subject_code'") or die(mysql_error) ;
header("location:subject schedules.php");

?>