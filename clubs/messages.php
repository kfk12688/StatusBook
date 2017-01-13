<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from club where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
$lname=$row['lname'];
$email=$row['email'];
$pic=$regno.".jpg";
if(isset($_POST['submit1']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("chat4", $con);
        $message=$_POST['message'];
        $regno1=$_POST['regno1'];
        mysql_query("INSERT INTO message(message, regno1 ,fname, regno11)VALUES('$message', '$regno1' ,'$fname', '$regno')");
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
    <!-- Compressed Vendor BUNDLE
    Includes vendor (3rd party) styling such as the customized Bootstrap and other 3rd party libraries used for the current theme/module -->
    <link href="sathish/css/vendor.min.css" rel="stylesheet">
    <!-- Compressed Theme BUNDLE
    Note: The bundle includes all the custom styling required for the current theme, however
    it was tweaked for the current theme/module and does NOT include ALL of the standalone modules;
    The bundle was generated using modern frontend development tools that are provided with the package
    To learn more about the development process, please refer to the documentation. -->
    <!-- <link href="css/theme.bundle.min.css" rel="stylesheet"> -->
    <!-- Compressed Theme CORE
    This variant is to be used when loading the separate styling modules -->
    <link href="sathish/css/theme-core.min.css" rel="stylesheet">
    <!-- Standalone Modules
    As a convenience, we provide the entire UI framework broke down in separate modules
    Some of the standalone modules may have not been used with the current theme/module
    but ALL modules are 100% compatible -->
    <link href="sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="sathish/css/module-layout.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar-skins.min.css" rel="stylesheet" />
    <link href="sathish/css/module-navbar.min.css" rel="stylesheet" />
    <!-- <link href="css/module-media.min.css" rel="stylesheet" /> -->
    <link href="sathish/css/module-timeline.min.css" rel="stylesheet" />
    <link href="sathish/css/module-cover.min.css" rel="stylesheet" />
    <link href="sathish/css/module-chat.min.css" rel="stylesheet" />
    <!-- <link href="css/module-charts.min.css" rel="stylesheet" /> -->
    <link href="sathish/css/module-maps.min.css" rel="stylesheet" />
    <!-- <link href="css/module-colors-alerts.min.css" rel="stylesheet" /> -->
    <!-- <link href="css/module-colors-background.min.css" rel="stylesheet" /> -->
    <!-- <link href="css/module-colors-buttons.min.css" rel="stylesheet" /> -->
    <!-- <link href="css/module-colors-calendar.min.css" rel="stylesheet" /> -->
    <!-- <link href="css/module-colors-progress-bars.min.css" rel="stylesheet" /> -->
    <!-- <link href="css/module-colors-text.min.css" rel="stylesheet" /> -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries
    WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!-- If you don't need support for Internet Explorer <= 8 you can safely remove these -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script language="javascript" src="chat/jquery-1.2.6.min.js"></script>
<script language="javascript" src="chat/jquery.timers-1.0.0.js"></script>

<script type="text/javascript">

$(document).ready(function(){
   var j = jQuery.noConflict();
    j(document).ready(function()
    {
        j(".refresh").everyTime(1000,function(i){
            j.ajax({
              url: "chat/refresh.php",
              cache: false,
              success: function(html){
                j(".refresh").html(html);
              }
            })
        })
        
    });
    j(document).ready(function() {
            j('#post_button').click(function() {
                $text = $('#post_text').val();
                j.ajax({
                    type: "POST",
                    cache: false,
                    url: "chat/save.php",
                    data: "text="+$text,
                    success: function(data) {
                        alert('data has been stored to database');
                    }
                });
            });
        });
   j('.refresh').css({color:"green"});
});
</script>
<style type="text/css">
.refresh {
    border: 0px solid #25ad9f;
    border-left: 4px solid #25ad9f;
    color: green;
    font-family: tahoma;
    font-size: 12px;
    height: auto ;
    overflow: auto;
    width: auto;
    padding:;
    background-color:#FFFFFF;
}
#post_button{
    /*border: 1px solid #25ad9f;
    background-color:#25ad9f;
    width: 100px;
    color:#FFFFFF;
    font-weight: bold;
    margin-left: -105px; padding-top: 4px; padding-bottom: 4px;
    cursor:pointer;*/
}
#textb{
    /*border: 1px solid #25ad9f;
    border-left: 4px solid #25ad9f;
    width: 320px;
    margin-top: 10px; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; width: 415px;*/
}
#texta{
    /*border: 1px solid #25ad9f;
    border-left: 4px solid #25ad9f;
    width: 410px;
    margin-bottom: 10px;
    padding:5px;*/
}
p{
border-top: 1px solid #EEEEEE;
margin-top: 0px; margin-bottom: 5px; padding-top: 5px;
}
.col{
    font-weight: bold;
    color: #25ad9f;
}
</style>

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
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="main-nav">
                    <ul class="nav navbar-nav">
                        
                        
                        
                        
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        
                        <!-- User -->
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle user" data-toggle="dropdown">
                                <img src="cropimages/uploads/<?php echo $pic?>"  class="img-circle" width="40" /> <?php echo $fname; ?> <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="edit profile.php">Profile</a>
                                </li>
                                <li><a href="">Messages</a>
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
                    
                    <li class="active"><a href=""><i class="icon-comment-fill-1"></i> <span>Messages</span></a>
                    </li>
                   
                    <li><a href="logout.php"><i class="icon-unlock-fill"></i> <span>Logout</span></a>
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
        <!-- Sidebar component with st-effect-1 (set on the toggle button within the navbar) -->
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
                        <div class="refresh">
<form  method="post"> <div class="panel panel-default">
                                        <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label class="col">TO</label>
                                                            <input type="text" class="form-control" name="regno1"  >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label class="col">Message</label>
                                                            <input type="text" class="form-control" name="message" >
                                                        </div>
                                                    </div>
                                                </div>
                                                    <button type="submit" class="btn btn-primary" name="submit1">Send</button>
                                            </form> 
                                            </div>
                                                    </div>

                                <div class="media">
                                    <div class="media-left">
                                        
                                    </div>
                                    <div class="media-body message">
                                        <div class="panel panel-default">
                                            <div class="panel-heading panel-heading-white">
                                                <div class="pull-right">
                                                    <small class="text-muted"></small>
                                                </div>
                                                <a class="col">Messages</a>
                                            </div>
                                            
                                                
<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("chat4", $con);

$result = mysql_query("SELECT * FROM message ORDER BY id DESC");


while($row = mysql_fetch_array($result))

  {
    

    $regno1=$row['regno1'];
    $message=$row['message'];
    $fname=$row['fname'];
     $regno11=$row['regno11'];
    if($regno==$regno1){
   echo '<div class="panel-body">';
  echo '<p>'.'<span></span>'. '&nbsp;&nbsp;'.'<i class="col">'.$fname.'&nbsp;&nbsp;'.'('.$regno11.')'.'&nbsp;&nbsp;'.'Leave a Message to you'.'</i>'.'&nbsp;&nbsp;&nbsp;' . $message.'</p>';
  echo ' </div>';
}
  }

mysql_close($con);
?>

</div>
                                           
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