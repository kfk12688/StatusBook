<?php
include('config.php');
if (!isset($_FILES['image']['tmp_name'])) {
	echo "";
	}else{
	$file=$_FILES['image']['tmp_name'];
	$image= addslashes(file_get_contents($_FILES['image']['tmp_name']));
	$image_name= addslashes($_FILES['image']['name']);
			
			move_uploaded_file($_FILES["image"]["tmp_name"],"../files/" . $_FILES["image"]["name"]);
			
			$location="../files/" . $_FILES["image"]["name"];
			$caption=$_POST['caption'];
			
			$save=mysql_query("INSERT INTO photos (location) VALUES ('$location')");
			header("location:../file sharing.php");
			exit();					
	}
?>
