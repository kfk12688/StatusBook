
<?php

?>

<html class="hide-sidebar ls-bottom-footer" lang="en">

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
    <link href="sathish/css/module-cover.min.css" rel="stylesheet" />
    
   
</head>

<body class="login">
    <div id="content">
        <div class="container-fluid">
            <div class="lock-container">
                <h1>Account Access</h1>
                <div class="panel panel-default text-center">
                    <img src="sathish/images/login.jpg" class="img-circle">
                    <div class="panel-body">
                        <form method="post">
                            <?php
                            include('conn.php');
if (isset($_POST['submit'])) 
{
$regno=$_POST['regno'];
$npassword=$_POST['npassword'];
$result=mysql_query("select * from placement where regno='$regno' and npassword='$npassword'")or die (mysql_error());
        
$count=mysql_num_rows($result);
$row=mysql_fetch_array($result);
      

                            if ($count > 0){
        session_start();
        $_SESSION['regno']=$row['regno'];
        header('location:timeline.php');
        mysql_query("update club set lilostatus='Online' where regno='$regno'");
        }
                            else{
                                echo '<div class="alert alert-danger">';
                            echo '<button type="button" class="close" data-dismiss="alert">';
                            echo '</button>';
                           echo ' Invalid User Id or Password';
                        echo '</div>';
        echo "";
        }}
        ?>
                        <input type="text" class="form-control"  placeholder="Username" name="regno">
                        <input  type="password" class="form-control"  placeholder="Enter Password" name="npassword">
                        <button  class="btn btn-primary" name="submit" type="submit" >Login <i class="fa fa-fw fa-unlock-alt"></i></button>
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <strong>ACET</strong> Campus
    </div>
       
    
</body>

</html>
