
<?php
include"conn.php";
session_start();
$regno=$_SESSION['regno'];

$result=mysql_query("select * from student where regno='$regno'")or die(mysql_error);
$row=mysql_fetch_array($result);

$fname=$row['fname'];


?>

 <html class="st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2" lang="en">

	<title>Status Book</title>
	<head>
		 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
		
		<link href="../sathish/css/vendor.min.css" rel="stylesheet">
    <link href="../sathish/css/theme-core.min.css" rel="stylesheet">
    <link href="../sathish/css/module-essentials.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-layout.min.css" rel="stylesheet" />
    <link href="../sathish/css/module-navbar.min.css" rel="stylesheet" />
    	
		<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
		<link rel="stylesheet" type="text/css" href="css/dataTables.tableTools.css">
		<script type="text/javascript" language="javascript" src="js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
		<script type="text/javascript" language="javascript" src="js/dataTables.tableTools.js"></script>
		
        <script type="text/javascript" language="javascript" >
			$(document).ready(function() {
			   var dataTable =  $('#employee-grid').DataTable( {
			   	dom: 'T<"clear">lfrtip',
			   		"tableTools": {
			   	   	"sSwfPath": "swf/copy_csv_xls_pdf.swf",
			   	    	"sRowSelect": "multi",
				    	"aButtons": [
					        	
							{
						    		"sExtends":    "collection",
						    		"sButtonText": "Export",
						    		"aButtons":    [  "xls", "pdf" ]
							}
				    	]
				},
			   	processing: true,
			   	serverSide: true,
		   		ajax: "employee-grid-data.php", // json datasource
			    } );
			} );
		</script>
		<style>
			div.container11 {
			    max-width: 1290px;
			    margin: 0 auto;
			    height: auto;
			    margin-bottom: 10px;
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
                   <a class="navbar-brand" href="../timeline.php">Status Book</a><a class="navbar-brand" href="../dashboard.php"></a>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    
                    <ul class="nav navbar-nav navbar-right">
                        
                        <!-- User -->
                        <li class="dropdown">
                            <a href="../dashboard.php" class="dropdown-toggle user" data-toggle="dropdown">
                                Back To Dashboard </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="edit profile.php">Profile</a>
                                </li>
                                <li><a href="#">Messages</a>
                                </li>
                                <li><a href="logout.php">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div></div></div>

                
		<div class="container11">
			<table id="employee-grid"  class="display" cellspacing="0" width="100%">
				<thead>
					<tr>
						<td>Regno</td>
						<td>Name</td>

						<td>Email</td>						
						<td>Department</td>
						<td>Mobile Number</td>
						
					</tr>
				</thead>	
			</table>
		</div>
        <div class="footer">
            <strong>ACET</strong> Campus
        </div>

	</body>
</html>