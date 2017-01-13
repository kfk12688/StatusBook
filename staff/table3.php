<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];
$dept=$_POST['dept'];
$batch=$_POST['batch'];
$subject=$_POST['subject'];
if(($dept=="CSE")&&($batch=="2011-2015")){
	mysql_connect("localhost","root","");
  mysql_select_db("csebatch2011");
  mysql_query("update staff set subject='$subject' where regno='$regno'");
header("location:tables/index.php");
}
if(($dept=="CSE")&&($batch=="2012-2016")){
	mysql_connect("localhost","root","");
  mysql_select_db("csebatch2012");
  mysql_query("update staff set subject='$subject' where regno='$regno'");
header("location:dashboard.php");
}
if(($dept=="CSE")&&($batch=="2013-2017")){
	mysql_connect("localhost","root","");
  mysql_select_db("csebatch2013");
  mysql_query("update staff set subject='$subject' where regno='$regno'");
header("location:dashboard.php");
}
if(($dept=="CSE")&&($batch=="2014-2018")){
	mysql_connect("localhost","root","");
  mysql_select_db("csebatch2014");
  mysql_query("update staff set subject='$subject' where regno='$regno'");
header("location:dashboard.php");

}

?>