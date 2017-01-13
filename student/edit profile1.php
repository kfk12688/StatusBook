<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];
$pic=$regno.".jpg";
$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);
$fname=$row['fname'];
$lname=$row['lname'];
$email=$row['email'];
$dob=$row['dob'];
$paddress=$row['paddress'];
$taddress=$row['taddress'];
$npassword=$row['npassword'];
$gender=$row['gender'];
$mobile=$row['mobile'];
$amobile=$row['amobile'];
$nationality=$row['nationality'];
$relegion=$row['relegion'];
$hobbies=$row['hobbies'];
$aoi=$row['aoi'];
if (isset($_POST['submit'])) 
{
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$email=$_POST['email'];
$dob=$_POST['dob'];
$npassword=$_POST['npassword'];
$cpassword=$_POST['cpassword'];
$mobile=$_POST['mobile'];
$amobile=$_POST['amobile'];
$gender=$_POST['gender'];
$paddress=$_POST['paddress'];
$taddress=$_POST['taddress'];
$nationality=$_POST['nationality'];
$relegion=$_POST['relegion'];
$aoi=$_POST['aoi'];
$hobbies=$_POST['hobbies']; 
if(($npassword>0)&&($npassword == $cpassword))
    {
mysql_query("update student set  npassword='$npassword', cpassword='$cpassword' where regno='$regno'");
}
mysql_query("update student set fname='$fname' where regno='$regno'");
mysql_query("update student set lname='$lname' where regno='$regno'");
mysql_query("update student set email='$email' where regno='$regno'");
mysql_query("update student set dob='$dob' where regno='$regno'");
mysql_query("update student set amobile='$amobile' where regno='$regno'");
mysql_query("update student set mobile='$mobile' where regno='$regno'");
mysql_query("update student set gender='$gender' where regno='$regno'");
mysql_query("update student set taddress='$taddress' where regno='$regno'");
mysql_query("update student set paddress='$paddress' where regno='$regno'");
mysql_query("update student set aoi='$aoi' where regno='$regno'");
mysql_query("update student set nationality='$nationality' where regno='$regno'");
mysql_query("update student set relegion='$relegion' where regno='$regno'");
mysql_query("update student set hobbies='$hobbies' where regno='$regno'");
header("location:edit profile.php");
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
                     <li><a href="timeline.php"><i class="fa fa-fw icon-ship-wheel"></i> <span>Timeline</span></a>
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
                    <div class="st-content">
                  <div class="st-content-inner">
                    <div class="container">
                         <div class="page-section">
                            <div class="row">
                                <div class="col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
                                    <h4 class="page-section-heading">Edit Your Profile</h4>
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <form  method="post">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label for="fname">First name</label>
                                                            <input type="text" class="form-control" name="fname" value="<?php echo $fname; ?>">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label for="lname">Last name</label>
                                                            <input type="text" class="form-control" name="lname" value="<?php echo $lname; ?>">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group form-control-default ">
                                                    <label for="email">Email address</label>
                                                    <input type="email" class="form-control" name="email" value="<?php echo $email; ?>">
                                                </div>
                                                <div class="row">
                                                <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                    <label for="npassword1"> New Password</label>
                                                    <input type="password" class="form-control" name="npassword" placeholder="Enter your new password">
                                                </div>
                                                </div>
                                                
                                                <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                    <label for="cpassword1">Confirm Password</label>
                                                    <input type="password" class="form-control" name="cpassword" placeholder="Confirm your new password">
                                                </div>
                                                </div>
                                                </div>
                                                 <div class="row">  
                                                 <div class="col-md-6">                                              
                                            <div class="form-group form-control-default">
                                                <label for="datepicker">Date Of Birth</label>
                                                <input id="datepicker" type="text" class="form-control datepicker" name="dob" value="<?php echo $dob; ?>">
                                            </div>
                                            </div>
                                            <div class="col-md-6">  
                                            <div class="form-group form-control-default ">
                                            <label>Gender</label><div class="radio radio-primary">
                                                        <input type="radio" name="gender" id="radio12" value="male">
                                                        <label for="radio12">Male</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="gender" id="radio13" value="female">
                                                        <label for="radio13">Female</label>
                                                    </div></div></div></div>
                                                    <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default ">
                                                            <label for="mnumber">Mobile Number</label>
                                                            <input type="text" class="form-control" id="mnumber" name="mobile" value="<?php echo $mobile; ?>">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label for="amnumber">Alternate Mobile Number</label>
                                                            <input type="text" class="form-control" id="amnumber" name="amobile" value="<?php echo $amobile; ?>">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                <label>Permanent Address</label>
                                                <textarea name="paddress" class="form-control share-text" rows="4" name="paddress"><?php echo $paddress; ?></textarea>
                                        </div></div>
                                        <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                <label>Temporary Address</label>
                                                <textarea name="taddress" class="form-control share-text" rows="4" name="taddress"><?php echo $taddress; ?></textarea>
                                        </div></div></div>
                                        <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default ">
                                                            <label for="nationality">Nationality</label>
                                                            <input type="text" class="form-control" id="nationality" name="nationality" value="<?php echo $nationality; ?>">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default ">
                                                            <label for="religion">Religion</label>
                                                            <input type="text" class="form-control" id="relegion" name="relegion" value="<?php echo $relegion; ?>">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                <label>Hobbies</label>
                                                <textarea name="hobbies" class="form-control share-text" rows="2"><?php echo $hobbies; ?></textarea>
                                        </div></div>
                                        <div class="col-md-6">
                                                <div class="form-group form-control-default ">
                                                <label>Area Of Interest</label>
                                                <textarea name="aoi" class="form-control share-text" rows="2" ><?php echo $aoi; ?></textarea>
                                        </div></div></div>
                                             <button type="submit" class="btn btn-primary" name="submit">Submit</button>
                                            </form>
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