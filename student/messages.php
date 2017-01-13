<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];
$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
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
mysql_select_db("csebatch2011", $con);
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
    <link href="sathish/css/vendor.css" rel="stylesheet">
    <link href="sathish/css/theme-core.css" rel="stylesheet">
    <link href="sathish/css/module-essentials.css" rel="stylesheet" />
    <link href="sathish/css/module-layout.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar-skins.css" rel="stylesheet" />
    <link href="sathish/css/module-navbar.css" rel="stylesheet" />
    <link href="sathish/css/module-timeline.css" rel="stylesheet" />
    <link href="sathish/css/module-cover.css" rel="stylesheet" />
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
    }
#textb{
    }
#texta{
        
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

                                        mysql_select_db("csebatch2011", $con);

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
    <script src="sathish/js/theme-core.js"></script>
</body>
</html>