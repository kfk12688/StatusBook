<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];
$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$subject=$row['subject'];

?>
<?php

	
	require_once("ajax_table.class.php");
	$obj = new ajax_table();
	$records = $obj->getRecords();
?>
<html class="st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2" lang="en">

 <head>
  <title>Status Book</title>
   <link href="../sathish/css/vendor.min.css" rel="stylesheet">
    <link href="../sathish/css/theme-core.min.css" rel="stylesheet">
    <link href="../sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-layout.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-navbar.min.css" rel="stylesheet" />
    
    <link href="../sathish/css/module-cover.min.css" rel="stylesheet" />
  <script>
	 // Column names must be identical to the actual column names in the database, if you dont want to reveal the column names, you can map them with the different names at the server side.
	 var columns = new Array("regno","name","class_test1","class_test2","class_test3","iae1","iae2","iae3","model_exam","university_exam","month","year");
	 var placeholder = new Array("Regno","Name","Class Test 1","Class Test 2","Class Test 3","IAE 1","IAE 2", "IAE 3","Model Exam","University Exam","Month","year");
	 var inputType = new Array("text","text","text","text","text","text","text","text","text","text","text","text");
	 var table = "tableDemo";
	 
	 // Set button class names 
	 var savebutton = "ajaxSave";
	 var deletebutton = "ajaxDelete";
	 var editbutton = "ajaxEdit";
	 var updatebutton = "ajaxUpdate";
	 var cancelbutton = "cancel";
	 
	 var saveImage = "images/save.png"
	 var editImage = "images/edit.png"
	 var deleteImage = "images/remove.png"
	 var cancelImage = "images/back.png"
	 var updateImage = "images/save.png"

	 // Set highlight animation delay (higher the value longer will be the animation)
	 var saveAnimationDelay = 3000; 
	 var deleteAnimationDelay = 1000;
	  
	 // 2 effects available available 1) slide 2) flash
	 var effect = "flash"; 
  
  </script>
  <script src="js/jquery-1.11.0.min.js"></script>	
  <script src="js/jquery-ui.js"></script>	
  <script src="js/script.js"></script>	
  
  <link rel="stylesheet" href="css/style.css">
 </head>
 <?php
    if (isset($_SESSION['regno']))
    {
    echo"<body>";
     }
else{
    header('location:../index.html');
}
?>
 	<div class="st-container">
 	<div class="navbar navbar-main navbar-primary navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="#sidebar-menu" data-effect="st-effect-1" data-toggle="sidebar-menu" class="toggle pull-left visible-xs"><i class="fa fa-ellipsis-v"></i></a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#sidebar-chat" data-toggle="sidebar-menu" data-effect="st-effect-1" class="toggle pull-right visible-xs"><i class="fa fa-comments"></i></a>
                    <a class="navbar-brand" href="index.html">Status Book &nbsp;&nbsp;&nbsp;&nbsp; Subject Code : <?php echo $subject?></a>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    
                    <ul class="nav navbar-nav navbar-right">
                        
                        <!-- User -->
                        <li class="dropdown">
                            <a href="../datatable/index.php" class="dropdown-toggle user" data-toggle="dropdown">
                                 Back To View 
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="active"><a href="edit profile.php">Profile</a>
                                </li>
                                <li><a href="#">Messages</a>
                                </li>
                                <li><a href="logout.php">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div></div></div></div>
        
        
	<table   class="tableDemo bordered">

		<tr class="ajaxTitle">
			<th >id</th>
			<th >Regno</th>
			<th >Name</th>
			<th >Class test 1</th>
			<th >Class test 2</th>
			<th >Class test 3</th>
			<th >IAE 1</th>
			<th >IAE 2</th>
			<th >IAE 3</th>
			<th >Model Exam</th>
			<th >University Exam</th>
			<th >Month</th>
			<th >Year</th>
			<th >Action</th>
		</tr>
		<?php
		if(count($records)){
		 $i = 1;	
		 foreach($records as $key=>$eachRecord){
		?>
		<tr id="<?php echo $eachRecord['id']; ?>">
			<td><?php $i++; ?></td>
			<td class="regno"><?php echo $eachRecord['regno'];?></td>
			<td class="name"><?php echo $eachRecord['name'];?></td>
			<td class="class_test1"><?php echo $eachRecord['class_test1'];?></td>
			<td class="class_test2"><?php echo $eachRecord['class_test2'];?></td>
			<td class="class_test3"><?php echo $eachRecord['class_test3'];?></td>
			<td class="iae1"><?php echo $eachRecord['iae1'];?></td>
			<td class="iae2"><?php echo $eachRecord['iae2'];?></td>
			<td class="iae3"><?php echo $eachRecord['iae3'];?></td>
			<td class="model_exam"><?php echo $eachRecord['model_exam'];?></td>
			<td class="university_exam"><?php echo $eachRecord['university_exam'];?></td>
			<td class="month"><?php echo $eachRecord['month'];?></td>
			<td class="year"><?php echo $eachRecord['year'];?></td>
			<td>
				<a href="javascript:;" id="<?php echo $eachRecord['id'];?>" class="ajaxEdit"><img src="" class="eimage"></a>
				<a href="javascript:;" id="<?php echo $eachRecord['id'];?>" class="ajaxDelete"><img src="" class="dimage"></a>
			</td>
		</tr>
		<?php }
		}
		?>
	</table>  
	<div class="footer">
            <strong>ACET</strong> Campus
        </div>
 </body>
</html>
