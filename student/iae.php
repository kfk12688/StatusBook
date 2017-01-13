
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
    <link href="sathish/css/vendor.css" rel="stylesheet">
    <link href="sathish/css/theme-core.css" rel="stylesheet">
    <link href="sathish/css/module-essentials.css" rel="stylesheet" />
    <link href="sathish/css/module-layout.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar-skins.css" rel="stylesheet" />
    <link href="sathish/css/module-navbar.css" rel="stylesheet" />
    <link href="sathish/css/module-timeline.css" rel="stylesheet" />
    <link href="sathish/css/module-cover.css" rel="stylesheet" />
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
                    <a class="navbar-brand" href="index.html">Status Book</a>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    
                    <ul class="nav navbar-nav navbar-right">
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
               </div>
        </div>
        <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu">
            <div data-scrollable>
                <div class="sidebar-block">
                    <div class="profile">
                        <img src="cropimages/uploads/<?php echo $pic?>" class="img-circle" />
                        <h4><?php echo $fname; ?></h4>
                    </div>
                </div>
                <h4 class="category">Account</h4>
                <ul class="sidebar-menu">
                    <li ><a href="edit profile.php"><i class="icon-user-1"></i> <span>Edit Profile</span></a>
                    </li>
                    
                    <li><a href="messages.php"><i class="icon-comment-fill-1"></i> <span>Messages</span></a>
                    </li>
                     <li ><a href="class test.php"><i class="md md-assignment"></i> <span>Class Test</span></a>
                    </li>
                    <li class="active"><a href="iae.php"><i class="md md-assignment"></i> <span>Internal Assessments</span></a>
                    </li>
                    <li><a href="university.php"><i class="md md-assignment"></i> <span>university Exams</span></a>
                    </li>
                </ul>
                <h4 class="category">Status From</h4>
                <div class="sidebar-block">
                    <ul>
                        <li><a href="www.angelindia.com" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-success"></span> Angel Wall</a>
                        </li>
                        <li><a href="angel club.php" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-danger"></span>Angel Clubs</a>
                        </li>
                        <li><a href="sports club.php" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-info"></span>Sports Clubs</a>
                        </li>
                        <li><a href="plcement.php" class="sidebar-link"><span class="fa fa-fw fa-circle-o text-primary"></span>Placement Cell</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="st-pusher" id="content">
              <div class="st-content">
                <div class="st-content-inner">
                    <nav class="navbar navbar-subnav navbar-static-top" role="navigation">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#subnav">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="fa fa-ellipsis-h"></span>
                                </button>
                            </div>
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
                          </div>
                    </nav>
                    <div class="container-fluid">
                          <h4 class="page-section-heading">Internal Assessmet Mark Details</h4>
                                    <div class="panel panel-default">
                                         <table data-toggle="data-table" class="table" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    
                                                    <th>Subject Code</th>
                                                    <th>Internal Assessment I</th>
                                                    <th>Internal Assessment II</th>
                                                    <th>Internal Assessment III</th>
                                                   
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>Subject Code</th>
                                                    <th>Internal Assessment I</th>
                                                    <th>Internal Assessment II</th>
                                                    <th>Internal Assessment III</th>
                                                   </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2023 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];
                                                $subject_code='cs2023';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2028 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2028';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2029 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2029';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2032 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];
                                                $subject_code='cs2032';
                                                ?>
                                                
                                                   <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2041 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2041';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2201 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2201';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2202 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2202';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2203 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2203';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2204 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2204';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2251 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2251';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2252 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2252';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2253 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2253';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2254 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2254';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2255 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3']; $subject_code='cs2255';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2301 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2301';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2302 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2302';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2303 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3']; $subject_code='cs2303';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2304 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3']; $subject_code='cs2304';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2305 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2305';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2351 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2351';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2352 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2352';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2353 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2353';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2354 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2354';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2401 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2401';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2402 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3']; $subject_code='cs2402';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cs2403 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cs2403';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cy2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cy2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from cy2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='cy2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ec2151 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ec2151';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2021 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ge2021';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ge2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ge2112 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ge2112';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from hs2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='hs2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from hs2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='hs2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from it2353 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='it2353';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3']; $subject_code='ma2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ma2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2211 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ma2211';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2262 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ma2262';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ma2265 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ma2265';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from mg2452 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='mg2452';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                <?php 
                                                $result11=mysql_query("select * from ph2111 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ph2111';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                               <?php 
                                                $result11=mysql_query("select * from ph2161 where regno='$regno'")or die(mysql_error);
                                                $row11=mysql_fetch_array($result11);
                                                $iae1=$row11['iae1'];
                                                $iae2=$row11['iae2'];
                                                $iae3=$row11['iae3'];$subject_code='ph2161';
                                                ?>
                                                
                                                    <td><?php echo $subject_code;?></td>
                                                    <td><?php echo $iae1;?></td>
                                                    <td><?php echo $iae2;?></td>
                                                    <td><?php echo $iae3;?></td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                   </div>
                        
                    </div>
                </div>
             </div>
         </div>
        
        <div class="footer">
            <strong>ACET</strong> Campus
        </div>
        </div>
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
    <script src="sathish/js/vendor-core.js"></script>
    <script src="sathish/js/vendor-forms.js"></script>
    <script src="sathish/js/vendor-maps.js"></script>
    <script src="sathish/js/module-essentials.js"></script>
    <script src="sathish/js/module-layout.js"></script>
    <script src="sathish/js/module-sidebar.js"></script>
    <script src="sathish/js/module-timeline.js"></script>
    <script src="sathish/js/theme-core.js"></script>
</body>
</html>