<?php
include "conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from placement where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
$lname=$row['lname'];
$email=$row['email'];
$pic=$regno.".jpg";
if (isset($_POST['submit11'])) 
{
$topic=$_POST['topic'];
$date=$_POST['date'];
$eligibility=$_POST['eligibility'];
$company=$_POST['company'];
mysql_query("insert into placement_activites(id, regno, date, company, eligibility) values(' ','$regno','$date', '$company', '$eligibility')")or die(mysql_error);
header("location:activity schedules.php");

}
if(isset($_POST['submit22']))
{
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("csebatch2011", $con);
         $id=$_POST['id'];
        mysql_query("delete from placement_activites where id='$id'");
        header("location:activity schedules.php");
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

    <link rel="stylesheet" type="text/css" href="dialog/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="dialog/css/demo.css" />
        <!-- common styles -->
        <link rel="stylesheet" type="text/css" href="dialog/css/dialog.css" />
        <!-- individual effect -->
        <link rel="stylesheet" type="text/css" href="dialog/css/dialog-val.css" />
        <script src="dialog/js/modernizr.custom.js"></script>
        
    <link href="sathish/css/vendor.min.css" rel="stylesheet">
    <link href="sathish/css/theme-core.min.css" rel="stylesheet">
    <link href="sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="sathish/css/module-layout.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar.min.css" rel="stylesheet" />
    <link href="sathish/css/module-sidebar-skins.min.css" rel="stylesheet" />
    <link href="sathish/css/module-navbar.min.css" rel="stylesheet" />
     <link href="sathish/css/module-charts.min.css" rel="stylesheet" />
    <link href="sathish/css/module-cover.min.css" rel="stylesheet" />
    <link href="sathish/css/module-timeline.min.css" rel="stylesheet" />
   <link href="sathish/css/module-media.min.css" rel="stylesheet" />
    
    <script src="jquery-2.1.3.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {

    //##### send add record Ajax request to response.php #########
    $("#FormSubmit").click(function (e) {
            e.preventDefault();
            if($("#contentText").val()==='')
            {
                alert("Please enter some text!");
                return false;
            }
            
            $("#FormSubmit").hide(); //hide submit button
            $("#LoadingImage").show(); //show loading image
            
            var myData = 'content_txt='+ $("#contentText").val(); //build a post data structure
            jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "appoinments/response.php", //Where to make Ajax calls
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
            url: "appoinments/response.php", //Where to make Ajax calls
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
<link href="appoinments/css/style.css" rel="stylesheet" type="text/css" />

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
                                <img src="cropimages/uploads/<?php echo $pic?>" width="35" alt="Bill" class="img-circle" /> <?php echo $fname; ?> <span class="caret"></span>
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
                                      
                    
                    <li class=""><a href="activity schedules.php"><i class="md md-my-library-books"></i> <span>Upcoming Companies</span></a>
                    </li>
                    
                      <li class=""><a href="completed task.php"><i class="md md-verified-user"></i> <span>Placed Students</span></a>
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
                  

                  <h1>Upcoming Companies</h1>
                  
                      <h4 class="page-section-heading"></h4>
                      <div class="col-md-8 col-lg-9">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <form class="form-horizontal" method="POST">
                                                 <div class="form-group">

                                                <label for="inputEmail3" class="col-sm-3 control-label">Date</label>
                                                 <div class="col-sm-9">
                                                <input id="datepicker" type="text" class="form-control datepicker" placeholder="Select Date" name="date">
                                                  </div></div>
                                                <div class="form-group">
                                                    <label class="col-sm-3 control-label">Company</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputEmail3" placeholder="Company Name" name="company" >
                                                    </div>
                                                </div>
                                                 
                                                <div class="form-group">
                                                    <label class="col-sm-3 control-label">Eligibility</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" rows="7" name="eligibility" ></textarea>
                                                    </div>
                                                </div>
                                            
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input type="submit" class="btn btn-primary" value="Submit" name="submit11">
                                            </form></div>
                                </div>
                            </div>
                            <!-- // END col -->
                            <!-- col -->
                            
                                <div class="row">
                            <div class="col-md-6">
                                <div class="panel panel-default">
                                    <div class="panel-heading panel-heading-gray">
                                       
                                <form class="form-horizontal" role="form" method="post">
                                            <div class="form-group">
                                            <label class="col-sm-7 control-label"> <i class="fa fa-fw fa-info-circle"></i> Registered Contents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID</label>
                                            <div class="col-sm-5">
                                            <div class="input-group">
                                            <input type="text" class="form-control" name='id'>
                                            <span class="input-group-btn">
                                        <button class="btn btn-inverse" type="submit" name='submit22'>Delete!</button>
                                    </span>
                                        </div>
                                            </div>
                                                </div></form>
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-unstyled profile-about margin-none">
                                            <li class="padding-v-5">
                                                <?php $result=mysql_query("select * from placement_activites")or die(mysql_error);
                                                       while( $row=mysql_fetch_array($result))
                                                       {
                                                         $regno=$row['regno'];
                                                         $id=$row['id'];
                                                        $date=$row['date'];
                                                        $company=$row['company'];
                                                        $eligibility=$row['eligibility'];
                                                        echo '<li class="padding-v-5">';
                                                        echo '<div class="row">';
                                                    echo '<div class="col-sm-4">'.'<span class="text-muted">'.'<b>'.$id.'<br>'.'Date'.'<br>'.'Company Name'.'<br>'.'Eligibility'.'</b>'.'</span>';
                                                    echo '</div>';
                                                    echo '<div class="col-sm-8">'.$regno.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.'<br>'.$date.'<br>'.$company.'<br>'.$eligibility.'</div>';
                                                    echo '</div>';
                                                    echo '</li>';
                                                }?>
                                                
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>

    
                                <!-- /panel-->
                           
                            <!-- // END col -->
                        </div>
                <!-- Related demos -->
                
            </div><!-- /content -->
        </div><!-- /container -->
        <script src="dialog/js/classie.js"></script>
        <script src="dialog/js/dialogFx.js"></script>
        



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
    <script src="sathish/js/module-media.min.js"></script>
    <script src="sathish/js/vendor-tables.min.js"></script>
    <script src="sathish/js/vendor-core.min.js"></script>
    <script src="sathish/js/vendor-forms.min.js"></script>
     <script src="sathish/js/module-essentials.min.js"></script>
    <script src="sathish/js/module-layout.min.js"></script>
    <script src="sathish/js/module-sidebar.min.js"></script>
    <script src="sathish/js/module-timeline.min.js"></script>
    <script src="sathish/js/theme-core.min.js"></script>
    <script src="sathish/js/vendor-tree.min.js"></script>
     <script src="sathish/js/vendor-nestable.min.js"></script>
     <script src="sathish/js/module-charts-all.min.js"></script>
</body>
</html>