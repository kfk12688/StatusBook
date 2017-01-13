<?php 
include"conn.php";
session_start();
$regno=$_SESSION['regno'];
$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];
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
		mysql_query("INSERT INTO message(message, regno1 ,fname)VALUES('$message', '$regno1' ,'$fname')");
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Simple Chat</title>
<script language="javascript" src="jquery-1.2.6.min.js"></script>
<script language="javascript" src="jquery.timers-1.0.0.js"></script>

<script type="text/javascript">

$(document).ready(function(){
   var j = jQuery.noConflict();
    j(document).ready(function()
    {
        j(".refresh").everyTime(1000,function(i){
            j.ajax({
              url: "refresh.php",
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
                    url: "save.php",
                    data: "text="+$text,
                    success: function(data) {
                        alert('data has been stored to database');
                    }
                });
            });
        });
   j('.refresh').css({color:"green"});
});
</script><link href="../sathish/css/vendor.min.css" rel="stylesheet">
    <link href="../sathish/css/theme-core.min.css" rel="stylesheet">
    <link href="../sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-navbar.min.css" rel="stylesheet" />
     <link href="../sathish/css/module-charts.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-cover.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-timeline.min.css" rel="stylesheet" />
   <link href="../sathish/css/module-media.min.css" rel="stylesheet" />

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
span{
	font-weight: bold;
	color: #25ad9f;
}
</style>
</head>
<body>
<div class="refresh">
<form  method="post"> <div class="panel panel-default">
                                        <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label for="fname">TO</label>
                                                            <input type="text" class="form-control" name="regno1"  >
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group form-control-default">
                                                            <label for="lname">Message</label>
                                                            <input type="text" class="form-control" name="message" >
                                                        </div>
                                                    </div>
                                                </div>
                                                    <button type="submit" class="btn btn-primary" name="submit1">Send</button>
                                            </form> <a href="../dashboard.php" class="btn btn-primary">Back To Dashboard</a>
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
                                                <a href="#">Messages</a>
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
    if($regno==$regno1){
   echo '<div class="panel-body">';
  echo '<p>'.'<span></span>'. '&nbsp;&nbsp;'.'<span>'.$fname.'&nbsp;&nbsp;'.'Leave a Message to you'.'</span>'.'&nbsp;&nbsp;' . $message.'</p>';
  echo ' </div>';
}
  }

mysql_close($con);
?>

</div>
                                           
                                        </div>
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
    <script src="../sathish/js/module-media.min.js"></script>
    <script src="../sathish/js/vendor-tables.min.js"></script>
    <script src="../sathish/js/vendor-core.min.js"></script>
    <script src="../sathish/js/vendor-forms.min.js"></script>
     <script src="../sathish/js/module-essentials.min.js"></script>
    <script src="../sathish/js/module-layout.min.js"></script>
    <script src="../sathish/js/module-sidebar.min.js"></script>
    <script src="../sathish/js/module-timeline.min.js"></script>
    <script src="../sathish/js/theme-core.min.js"></script>
    <script src="../sathish/js/vendor-tree.min.js"></script>
     <script src="../sathish/js/vendor-nestable.min.js"></script>
     <script src="../sathish/js/module-charts-all.min.js"></script>

</body>
</html>
