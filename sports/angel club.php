
<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];
$result=mysql_query("select * from sports where regno='$regno'")or die(mysql_error);
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
    <link href="sathish/css/module-chat.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
<link rel="stylesheet" type="text/css" href="fancybox/jquery.fancybox-1.2.6.css" media="screen" />
<script type="text/javascript" src="jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="script.js"></script>
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
                        <img src="cropimages/uploads/<?php echo $pic?>" alt="people" class="img-circle" />
                        <h4><?php echo $fname; ?></h4>
                    </div>
                </div>
                <h4 class="category">Account</h4>
                <ul class="sidebar-menu">
                    <li class="active"><a href="edit profile.php"><i class="icon-user-1"></i> <span>Edit Profile</span></a>
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
                        <div class="tabbable">
                            <ul class="nav nav-tabs">
                             </ul>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-gray">
                                        <a href="edit profile1.php" class="btn btn-white btn-xs pull-right"></a>
                                        <i class="fa fa-fw fa-info-circle"></i> Club Activity Schedules 
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-unstyled profile-about margin-none">
                                                 <?php $result=mysql_query("select * from club_activites")or die(mysql_error);
                                                       while( $row=mysql_fetch_array($result))
                                                       {
                                                         $regno=$row['regno'];
                                                         $id=$row['id'];
                                                        $date=$row['date'];
                                                        $topic=$row['topic'];
                                                        $content=$row['content'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted"><b>'.$id.'<br>'.'Date'.'<br>'.'Title'.'<br>'.'Contents'.'</b></span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-8">'.$regno.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>'.$date.'<br>'.$topic.'<br>'.$content.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }?>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-gray">
                                        <i class="icon-user-1"></i> Completed Activites From Club
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-unstyled profile-about margin-none">
                                                  <?php $result=mysql_query("select * from club_schedules")or die(mysql_error);
                                                       while( $row=mysql_fetch_array($result))
                                                       {
                                                         $regno=$row['regno'];
                                                         $id=$row['id'];
                                                        $date=$row['date'];
                                                        $topic=$row['topic'];
                                                        $content=$row['content'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted"><b>'.$id.'<br>'.'Date'.'<br>'.'Title'.'<br>'.'Contents'.'</b></span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-8">'.$regno.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>'.$date.'<br>'.$topic.'<br>'.$content.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }?>    
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <strong>ACET</strong>Campus
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
    <script src="sathish/js/module-chat.js"></script>
    <script src="sathish/js/module-maps.js"></script>
    <script src="sathish/js/theme-core.js"></script>
</body>
</html>