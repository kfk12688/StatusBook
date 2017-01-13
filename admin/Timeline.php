
<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from admin where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
$lname=$row['lname'];
$email=$row['email'];
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
    <link href="sathish/css/module-cover.min.css" rel="stylesheet" />
    <link href="sathish/css/module-timeline.min.css" rel="stylesheet" />

    <script src="status/jquery-2.1.3.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {

    //##### send add record Ajax request to response.php #########
    $("#FormSubmit").click(function (e) {
            e.preventDefault();
            if($("#contentText").val()==='')
            {
                
                return false;
            }
            
            $("#FormSubmit").hide(); //hide submit button
            $("#LoadingImage").show(); //show loading image
            
            var myData = 'content_txt='+ $("#contentText").val(); //build a post data structure
            jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "status/response.php", //Where to make Ajax calls
            dataType:"text", // Data type, HTML, json etc.
            data:myData, //Form variables
            success:function(response){
                $("#responds").append(response);
                $("#contentText").val(''); //empty text field on successful
                $("#FormSubmit").show(); //show submit button
                $("#LoadingImage").hide(); //hide loading image

            },
            error:function (xhr, ajaxOptions, thrownError){
                $("#FormSubmit").show(); //show submit button
                $("#LoadingImage").hide(); //hide loading image
                alert(thrownError);
            }
            });
    });

    //##### Send delete Ajax request to response.php #########
    $("body").on("click", "#responds .del_button", function(e) {
         e.preventDefault();
         var clickedID = this.id.split('-'); //Split ID string (Split works as PHP explode)
         var DbNumberID = clickedID[1]; //and get number from array
         var myData = 'recordToDelete='+ DbNumberID; //build a post data structure
         
        $('#item_'+DbNumberID).addClass( "sel" ); //change background of this element by adding class
        $(this).hide(); //hide currently clicked delete button
         
            jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "status/response.php", //Where to make Ajax calls
            dataType:"text", // Data type, HTML, json etc.
            data:myData, //Form variables
            success:function(response){
                //on success, hide  element user wants to delete.
                $('#item_'+DbNumberID).fadeOut();
            },
            error:function (xhr, ajaxOptions, thrownError){
                //On error, we alert user
                alert(thrownError);
            }
            });
    });

});
</script>
<link href="status/css/style.css" rel="stylesheet" type="text/css" />
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
         <div class="navbar navbar-main navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="#sidebar-menu" data-effect="st-effect-1" data-toggle="sidebar-menu" class="toggle pull-left visible-xs"><i class="fa fa-bars"></i></a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#sidebar-chat" data-toggle="sidebar-menu" data-effect="st-effect-1" class="toggle pull-right visible-xs"><i class="fa fa-comments"></i></a>
                    <a class="navbar-brand navbar-brand-primary hidden-xs" href="index.html">Status Book</a>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    
                    <ul class="nav navbar-nav navbar-user">
                         <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="cropimages/uploads/<?php echo $pic?>" width="35"  class="img-circle" /><?php echo $fname; ?>
 <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                               
                                <li><a href="messages.php">Messages</a>
                                </li>
                                <li><a href="logout.php">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form class="navbar-form margin-none navbar-left hidden-xs">
                          <div class="search-1">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="icon-search"></i></span>
                                <input type="text" class="form-control" placeholder="Search">
                            </div>
                        </div>
                        </form>
                    
                </div>
            </div>
        </div>
         <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-visible-desktop sidebar-visible-mobile sidebar-skin-dark" id="sidebar-menu" data-type="collapse">
            <div data-scrollable>
                <ul class="sidebar-menu">
                    <li><a href="timeline.php"><i class="md md-assignment"></i> <span>Home</span></a>
                    </li>
                    <li class="category">Categories</li>
                    <li class="active"><a href="timeline.php"><i class="icon-user-1"></i> <span>Timeline</span></a>
                    </li>
                    <li class=""><a href="edit profile.php"><i class="icon-user-1"></i> <span>Contents</span></a>
                    </li>
                   
                    <li class=""><a href="messages.php"><i class="icon-comment-fill-1"></i> <span>Messages</span></a>
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
                    <div class="container-fluid">
                        
                    
                    <div class="cover profile">
                            <div class="wrapper">
                                <div class="image">
                                    <img src="sathish/timeline.jpg" alt="people" />
                                </div>
                                
                            </div>
                            <div class="cover-info">
                                <div class="avatar">
                                    <img src="cropimages/uploads/<?php echo $pic?>" alt="people" />
                                </div>
                                <div class="name"><a href="#"><?php echo $fname; ?></a>
                                </div>
                                <ul class="cover-nav">
                                    <li ><a href="timeline.php"><i class="fa fa-fw icon-ship-wheel"></i> Timeline</a>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                        
    

                        <div class="timeline row" data-toggle="isotope">
                            <div class="col-xs-12 col-md-6 col-lg-6 item">
                                <div class="timeline-block">
                                    <div class="panel panel-default share clearfix-xs">
                                        <div class="panel-heading panel-heading-gray title">
                                            What&acute;s new
                                        </div>
                                        <div class="panel-body">
                                            <textarea name="status" id="contentText" class="form-control share-text" rows="6" placeholder="Share your status..."></textarea>
                                        </div>
                                        <div class="panel-footer share-buttons">
                                            <a href="#"><i></i></a>
                                            <a href="#"><i></i></a>
                                            <a href="#"><i ></i></a>
                                            
                                            <button type="submit" id="FormSubmit" class="btn btn-primary btn-xs pull-right display-none" href="#">Post</button>
                                             </div></div><div class="panel panel-default">
                                             <div class="datepicker"></div>
                                        </div></div></div>

                                        <div class="col-xs-12 col-md-6 col-lg-6 item">
                                        <div class="timeline-block">
                                        <ul id="responds">
<?php
//include db configuration file
include_once("status/config.php");

//MySQL query
$results = $mysqli->query("SELECT id,content FROM add_delete_record");
//get all records from add_delete_record table
while($row = $results->fetch_assoc())
{
  echo '<li id="item_'.$row["id"].'">';
  echo '<div class="del_wrapper"><a href="#" class="del_button" id="del-'.$row["id"].'">';
  echo '<img src="status/images/icon_del.gif" border="0" />';
  echo '</a></div>';
  echo $row["id"].'&nbsp;&nbsp;' .'posted  a new status'.'<br>';
  echo $row["content"].'&nbsp;&nbsp;' .'</li>';
}

//close db connection
$mysqli->close();
?>
</ul></div></div>
 
                                        <div class="timeline-block">
<div class="panel panel-default">
                                   
                                </div>

                                   </div></div> 
                                </div>
                            </div>
                        
                </div></div>

                </div>
              </div></div>
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
        theme: "social-1",
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
            }
        }
    };
    </script>
    <script src="sathish/js/vendor-core.min.js"></script>
    <script src="sathish/js/vendor-forms.min.js"></script>
     <script src="sathish/js/vendor-maps.min.js"></script>
     <script src="sathish/js/module-essentials.min.js"></script>
    <script src="sathish/js/module-layout.min.js"></script>
    <script src="sathish/js/module-sidebar.min.js"></script>        
    <script src="sathish/js/theme-core.min.js"></script>
    <script src="sathish/js/module-timeline.min.js"></script>
    
</body>


</html>
