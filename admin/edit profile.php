
<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from admin where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];

$pic=$regno.".jpg";
if(isset($_POST['submit1']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['regno1'];
        mysql_query("INSERT INTO student(regno ,npassword)VALUES('$regno1', '$regno1' )");
}
if(isset($_POST['submit2']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['staff'];
        mysql_query("INSERT INTO staff(regno ,npassword)VALUES('$regno1', '$regno1' )");
}
if(isset($_POST['submit3']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['club'];
        mysql_query("INSERT INTO club(regno ,npassword)VALUES('$regno1', '$regno1' )");
}
if(isset($_POST['submit9']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['regno1'];
        mysql_query("delete from student where regno='$regno1'");
}
if(isset($_POST['submit10']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['regno1'];
        mysql_query("delete from staff where regno='$regno1'");
}
if(isset($_POST['submit11']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $regno1=$_POST['regno1'];
        mysql_query("delete from club where regno='$regno1'");
}
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
                    <li class="active"><a href="edit profile.php"><i class="icon-user-1"></i> <span>Contents</span></a>
                    </li>
                    
                    <li><a href="messages.php"><i class="icon-comment-fill-1"></i> <span>Messages</span></a>
                    </li>
                     <li><a href="timeline.php"><i class="md md-assignment"></i> <span>Timeline</span></a>
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
                        <div class="row">
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-gray">
                                        <a href="edit profile1.php" class="btn btn-white btn-xs pull-right"></a>
                                        <i class="fa fa-fw fa-info-circle"></i> Contents
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-unstyled profile-about margin-none">
                                            <li class="padding-v-5">
                                                <div class="row">
                                                     <form class="form-horizontal" method="POST">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Add Student</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit1">Add</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                                </div>
                                            </li>
                                            <li class="padding-v-5">
                                                <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Add New Staff</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="staff">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit2">Add</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Add New Club</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="club">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit3">Add</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Student Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit4">Get Password</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Staff Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit5">Get Password</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Placement Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit6">Get Password</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Club Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit7">Get Password</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Sports Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit8">Get Password</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Student Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit9">Delete It!</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Staff Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit10">Delete It!</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-3 control-label">Club Id</label>
                                            <div class="col-sm-8">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name="regno1">
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name="submit11">Delete It!</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                            </li>
                                            <li class="padding-v-5">
                                                <div class="row">
                                                    
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-gray">
                                        
                                        <i class="icon-user-1"></i> Searched Contents 
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-unstyled profile-about margin-none">
                                            
                                            <li class="padding-v-5">
                                                        <div class="row">
                                                    
                                                    </div>
                                                    </li>
                                                
                                                   <?php 

                                                   if(isset($_POST['submit4']))
                                                {
                                                $con = mysql_connect("localhost","root","");
                                                if (!$con)
                                                  {
                                                  die('Could not connect: ' . mysql_error());
                                                  }

                                                mysql_select_db("csebatch2011", $con);
                                                         $regno1=$_POST['regno1'];
                                                        $result=mysql_query("select * from student where regno='$regno1'" )or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         

                                                   
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                         $npassword=$row['npassword'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                        echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.'regno'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.'<b>'.'name'.'</b>'.'</div>';
                                                     echo '<div class="col-sm-4">'.'<b>'.'Password'.'</b>'.'</div>';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.$regno.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.$fname.'</div>';
                                                    echo '<div class="col-sm-4">'.$npassword.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }
                                                
                                                ?>
                                                
                                            
                                            
                                        
                                        </ul>
                                        <ul class="list-unstyled profile-about margin-none">
                                            
                                                
                                                   <?php 
                                                   if(isset($_POST['submit5']))
                                                {
                                                $con = mysql_connect("localhost","root","");
                                                if (!$con)
                                                  {
                                                  die('Could not connect: ' . mysql_error());
                                                  }

                                                mysql_select_db("csebatch2011", $con);
                                                         $regno1=$_POST['regno1'];
                                                        $result=mysql_query("select * from staff where regno='$regno1'" )or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         

                                                   
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                         $npassword=$row['npassword'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                        echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.'regno'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.'<b>'.'name'.'</b>'.'</div>';
                                                     echo '<div class="col-sm-4">'.'<b>'.'Password'.'</b>'.'</div>';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.$regno.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.$fname.'</div>';
                                                    echo '<div class="col-sm-4">'.$npassword.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }
                                               
                                                ?>
                                                
                                            
                                            
                                        
                                        </ul>
                                        <ul class="list-unstyled profile-about margin-none">
                                            
                                                <?php
                                                    if(isset($_POST['submit6']))
                                                {
                                                $con = mysql_connect("localhost","root","");
                                                if (!$con)
                                                  {
                                                  die('Could not connect: ' . mysql_error());
                                                  }

                                                mysql_select_db("csebatch2011", $con);
                                                         $regno1=$_POST['regno1'];
                                                        $result=mysql_query("select * from placement where regno='$regno1'" )or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                                                                              

                                                   
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                         $npassword=$row['npassword'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                        echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.'regno'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.'<b>'.'name'.'</b>'.'</div>';
                                                     echo '<div class="col-sm-4">'.'<b>'.'Password'.'</b>'.'</div>';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.$regno.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.$fname.'</div>';
                                                    echo '<div class="col-sm-4">'.$npassword.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }
                                               
                                                ?>
                                                
                                            
                                            
                                        
                                        </ul>
                                        <ul class="list-unstyled profile-about margin-none">
                                            
                                                <?php
                                                    if(isset($_POST['submit7']))
                                                {
                                                $con = mysql_connect("localhost","root","");
                                                if (!$con)
                                                  {
                                                  die('Could not connect: ' . mysql_error());
                                                  }

                                                mysql_select_db("csebatch2011", $con);
                                                         $regno1=$_POST['regno1'];
                                                        $result=mysql_query("select * from club where regno='$regno1'" )or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         

                                                   
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                         $npassword=$row['npassword'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                        echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.'regno'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.'<b>'.'name'.'</b>'.'</div>';
                                                     echo '<div class="col-sm-4">'.'<b>'.'Password'.'</b>'.'</div>';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.$regno.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.$fname.'</div>';
                                                    echo '<div class="col-sm-4">'.$npassword.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }
                                                
                                                ?>
                                                   <?php $result=mysql_query("select * from admin")or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                       
                                                ?>
                                                
                                            
                                            
                                        
                                        </ul>
                                         <ul class="list-unstyled profile-about margin-none">
                                            
                                                <?php
                                                    if(isset($_POST['submit8']))
                                                {
                                                $con = mysql_connect("localhost","root","");
                                                if (!$con)
                                                  {
                                                  die('Could not connect: ' . mysql_error());
                                                  }

                                                mysql_select_db("csebatch2011", $con);
                                                         $regno1=$_POST['regno1'];
                                                        $result=mysql_query("select * from sports where regno='$regno1'" )or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         

                                                   
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                         $npassword=$row['npassword'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                        echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.'regno'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.'<b>'.'name'.'</b>'.'</div>';
                                                     echo '<div class="col-sm-4">'.'<b>'.'Password'.'</b>'.'</div>';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.$regno.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-4">'.$fname.'</div>';
                                                    echo '<div class="col-sm-4">'.$npassword.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }
                                                
                                                ?>
                                                   <?php $result=mysql_query("select * from admin")or die(mysql_error);
                                                        $row=mysql_fetch_array($result);
                                                       
                                                         $regno=$row['regno'];
                                                        $fname=$row['fname'];
                                                       
                                                ?>
                                                
                                            
                                            
                                        
                                        </ul>
                                        <ul class="list-unstyled profile-about margin-none">
                                            
                                                
                                                   
                                                
                                            
                                            
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
            <strong>ACET</strong>Campus
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