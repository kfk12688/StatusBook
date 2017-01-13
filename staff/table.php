<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];
$dept=$_POST['dept'];
$batch=$_POST['batch'];
$regno1=$_POST['regno1'];
if(($dept=="CSE")&&($batch=="2011-2015")){
	mysql_connect("localhost","root","");
  mysql_select_db("csebatch2011");
mysql_query("insert into student(id,regno,npassword,fname) values(' ','$regno1','$regno1','$dept')");
header("location:dashboard.php");
}
if(($dept=="CSE")&&($batch=="2012-2016")){
	mysql_connect("localhost","root","");
		mysql_select_db("csebatch2012");
    mysql_query("insert into student(id,regno,npassword,fname) values(' ','$regno1','$regno1','$dept')");
echo "inserted2";
}
if(($dept=="CSE")&&($batch=="2013-2017")){
	    mysql_connect("localhost","root","");
		mysql_select_db("csebatch2013");
         mysql_query("insert into student(id,regno,npassword,fname) values(' ','$regno1','$regno1','$dept')");
echo "inserted3";
}
if(($dept=="CSE")&&($batch=="2014-2018")){
	mysql_connect("localhost","root","");
	mysql_select_db("csebatch2014");
    mysql_query("insert into student(id,regno,npassword,fname) values(' ','$regno1','$regno1','$dept')");
echo "inserted4";
}

?>