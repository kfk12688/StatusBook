
<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
$lname=$row['lname'];
$email=$row['email'];
$dob=$row['dob'];
$paddress=$row['paddress'];
$gender=$row['gender'];
$mobile=$row['mobile'];
$nationality=$row['nationality'];
$relegion=$row['relegion'];
$pic=$regno.".jpg";
?>
<html class="st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Status Book</title>
    
    <link href="sathish/css/vendor.min.css" rel="stylesheet">
    <link href="sathish/css/theme-core.min.css" rel="stylesheet">
    <link href="sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="sathish/css/module-layout.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar-skins.min.css" rel="stylesheet" />
    <link href="sathish/css/module-navbar.min.css" rel="stylesheet" />
    <link href="sathish/css/module-timeline.min.css" rel="stylesheet" />
    <link href="sathish/css/module-cover.min.css" rel="stylesheet" />
    <link href="sathish/css/module-chat.min.css" rel="stylesheet" />
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

    <!-- Wrapper required for sidebar transitions -->
    <div class="st-container">
        <!-- Fixed navbar -->
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
                    <a class="navbar-brand" href="index.html">Status Book</a>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    
                    <ul class="nav navbar-nav navbar-right">
                        
                        <!-- User -->
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle user" data-toggle="dropdown">
                                <img src="cropimages/uploads/<?php echo $pic?>" class="img-circle" width="40" /> <?php echo $fname; ?> <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="active"><a href="edit profile.php">Profile</a>
                                </li>
                                <li><a href="messages.php">Messages</a>
                                </li>
                                <li><a href="logout.php">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
        </div>
        <!-- Sidebar component with st-effect-1 (set on the toggle button within the navbar) -->
        <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu">
            <div data-scrollable>
                <div class="sidebar-block">
                    <div class="profile">
                        <img src="cropimages/uploads/<?php echo $pic?>" alt="people" class="img-circle" />
                        <h4><?php echo $fname; ?></h4>
                    </div>
                </div>
                <h4 class="category">Account</h4>
                <ul class="sidebar-menu">
                    <li><a href="edit profile.php"><i class="icon-user-1"></i> <span>Edit Profile</span></a>
                    </li>
                    
                    <li><a href="messages.php"><i class="icon-comment-fill-1"></i> <span>Messages</span></a>
                    </li>
                     
                    <li class="active"><a href="class test.php"><i class="md md-assignment"></i> <span>Class Test</span></a>
                    </li>
                    <li><a href="iae.php"><i class="md md-assignment"></i> <span>Internal Assessments</span></a>
                    </li>
                    <li><a href="university.php"><i class="md md-assignment"></i> <span>University Exams</span></a>
                    </li>
                </ul>
                <h4 class="category">Status From</h4>
                <div class="sidebar-block">
                    <ul>
                        <li><a href="#" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-success"></span> Angel Wall</a>
                        </li>
                        <li><a href="#" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-danger"></span>Angel Clubs</a>
                        </li>
                        <li><a href="#" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-info"></span>Sports Clubs</a>
                        </li>
                        <li><a href="#" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-primary"></span>Placement Cell</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="st-pusher" id="content">
            <!-- sidebar effects INSIDE of st-pusher: -->
            <!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->
            <!-- this is the wrapper for the content -->
            <div class="st-content">
                <!-- extra div for emulating position:fixed of the menu -->
                <div class="st-content-inner">
                    <nav class="navbar navbar-subnav navbar-static-top" role="navigation">
                        <div class="container-fluid">
                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#subnav">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="fa fa-ellipsis-h"></span>
                                </button>
                            </div>
                            <!-- Collect the nav links, forms, and other content for toggling -->
                            <div class="collapse navbar-collapse" id="subnav">
                                <ul class="nav navbar-nav">
                                    <li><a href="timeline.php"><i class="fa fa-fw icon-ship-wheel"></i> My Timeline</a>
                                    </li>
                                </ul>
                                <ul class="nav navbar-nav navbar-right">
                                    <li><a href="logout.php"> Logout<i class="fa fa-fw fa-sign-out"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.navbar-collapse -->
                        </div>
                    </nav>
                    <div class="container-fluid">
                        <div class="tabbable">
                            <ul class="nav nav-tabs">
                                
                                
                            </ul>
                            
                        </div>
                        <h4 class="page-section-heading">Class Test Mark Details</h4>
                                    <div class="panel panel-default">
                                        <!-- Data table -->
                                        <table data-toggle="data-table" class="table" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    
                                                    <th>Subject Code</th>
                                                    <th>Class Test 1</th>
                                                    <th>Class Test 2</th>
                                                    <th>Class Test 3</th>
                                                   
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Subject Code</th>
                                                    <th>Class Test 1</th>
                                                    <th>Class Test 2</th>
                                                    <th>Class Test 3</th>
                                                   </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2023 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2023';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2028 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2028';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2029 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2029';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2032 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2032';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2041 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2041';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2201 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2201';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2202 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2202';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2203 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2203';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2204 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2204';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2251 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2251';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2252 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2252';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2253 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2253';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2254 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2254';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2255 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2255';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2301 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2301';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2302 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2302';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2303 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2303';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2304 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2304';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2305 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2305';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2351 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2351';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2352 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2352';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2353 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2353';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2354 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2354';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2401 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2401';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2402 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2402';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2403 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cs2403';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cy2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cy2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cy2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='cy2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ec2151 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ec2151';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2021 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ge2021';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ge2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2112 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ge2112';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from hs2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='hs2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from hs2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='hs2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from it2353 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='it2353';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ma2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ma2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2211 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ma2211';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2262 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ma2262';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2265 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ma2265';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from mg2452 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='mg2452';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ph2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ph2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                               <?php 
                                                $result11=mysql_query("select * from ph2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $class_test1=$row11['class_test1'];
                                                $class_test2=$row11['class_test2'];
                                                $class_test3=$row11['class_test3'];
                                                $subject_code='ph2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $class_test1;?></td>
                                                    <td><?php echo $class_test2;?></td>
                                                    <td><?php echo $class_test3;?></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                        <!-- // Data table -->
                                    </div>
                        
                    </div>
                </div>
                <!-- /st-content-inner -->
            </div>
            <!-- /st-content -->
        </div>
        <!-- /st-pusher -->
        <!-- Footer -->
        <div class="footer">
            <strong>ThemeKit</strong> v3.6.2 &copy; Copyright 2015
        </div>
        <!-- // Footer -->
    </div>
    <!-- /st-container -->
    <!-- Inline Script for colors and config objects; used by various external scripts; -->
    <script>
    var colors = {
        "danger-color": "#e74c3c",
        "success-color": "#81b53e",
        "warning-color": "#f0ad4e",
        "inverse-color": "#2c3e50",
        "info-color": "#2d7cb5",
        "default-color": "#6e7882",
        "default-light-color": "#cfd9db",
        "purple-color": "#9D8AC7",
        "mustard-color": "#d4d171",
        "lightred-color": "#e15258",
        "body-bg": "#f6f6f6"
    };
    var config = {
        debug: true,
        theme: "social-2",
        skins: {
            "default": {
                "primary-color": "#16ae9f"
            },
            "orange": {
                "primary-color": "#e74c3c"
            },
            "blue": {
                "primary-color": "#4687ce"
            },
            "purple": {
                "primary-color": "#af86b9"
            },
            "brown": {
                "primary-color": "#c3a961"
            },
            "default-nav-inverse": {
                "color-block": "#242424"
            }
        }
    };
    </script>
    <!-- Separate Vendor Script Bundles -->
    <script src="sathish/js/vendor-core.min.js"></script>
    <!-- <script src="js/vendor-tables.min.js"></script> -->
    <script src="sathish/js/vendor-forms.min.js"></script>
    <!-- <script src="js/vendor-media.min.js"></script> -->
    <!-- <script src="js/vendor-player.min.js"></script> -->
    <!-- <script src="js/vendor-charts-all.min.js"></script> -->
    <!-- <script src="js/vendor-charts-flot.min.js"></script> -->
    <!-- <script src="js/vendor-charts-easy-pie.min.js"></script> -->
    <!-- <script src="js/vendor-charts-morris.min.js"></script> -->
    <!-- <script src="js/vendor-charts-sparkline.min.js"></script> -->
    <script src="sathish/js/vendor-maps.min.js"></script>
    <!-- <script src="js/vendor-tree.min.js"></script> -->
    <!-- <script src="js/vendor-nestable.min.js"></script> -->
    <!-- <script src="js/vendor-angular.min.js"></script> -->
    <!-- Compressed Vendor Scripts Bundle
    Includes all of the 3rd party JavaScript libraries above.
    The bundle was generated using modern frontend development tools that are provided with the package
    To learn more about the development process, please refer to the documentation.
    Do not use it simultaneously with the separate bundles above. -->
    <!-- <script src="js/vendor-bundle-all.min.js"></script> -->
    <!-- Compressed App Scripts Bundle
    Includes Custom Application JavaScript used for the current theme/module;
    Do not use it simultaneously with the standalone modules below. -->
    <!-- <script src="js/module-bundle-main.min.js"></script> -->
    <!-- Standalone Modules
    As a convenience, we provide the entire UI framework broke down in separate modules
    Some of the standalone modules may have not been used with the current theme/module
    but ALL the modules are 100% compatible -->
    <script src="sathish/js/module-essentials.min.js"></script>
    <script src="sathish/js/module-layout.min.js"></script>
    <script src="sathish/js/module-sidebar.min.js"></script>
    <!-- <script src="js/module-media.min.js"></script> -->
    <!-- <script src="js/module-player.min.js"></script> -->
    <script src="sathish/js/module-timeline.min.js"></script>
    <script src="sathish/js/module-chat.min.js"></script>
    <script src="sathish/js/module-maps.min.js"></script>
    <!-- <script src="js/module-charts-all.min.js"></script> -->
    <!-- <script src="js/module-charts-flot.min.js"></script> -->
    <!-- <script src="js/module-charts-easy-pie.min.js"></script> -->
    <!-- <script src="js/module-charts-morris.min.js"></script> -->
    <!-- <script src="js/module-charts-sparkline.min.js"></script> -->
    <!-- [social-2] Core Theme Script:
        Includes the custom JavaScript for this theme/module;
        The file has to be loaded in addition to the UI modules above;
        module-bundle-main.js already includes theme-core.js so this should be loaded
        ONLY when using the standalone modules; -->
    <script src="sathish/js/theme-core.min.js"></script>
</body>
</html>