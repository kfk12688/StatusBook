<?php
/* Database connection start */



$servername = "localhost";
$username = "root";
$password = "";
$dbname = "csebatch2011";

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());
session_start();
$regno=$_SESSION['regno'];
$sql = "SELECT subject";
$sql.=" FROM student where regno='$regno'";
$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData1 = mysqli_fetch_array($query);
$subject=$totalData1['subject'];
/* Database connection end */


// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
	0 => 'regno', 
	1 => 'name',
	2 => 'model_exam',
	3 => 'university_exam',
	4 => 'month',
	5 => 'year'

	
);




// getting total number records without any search
$sql = "SELECT regno, name,model_exam, university_exam, month, year";
$sql.=" FROM $subject";
$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


if( !empty($requestData['search']['value']) ) {
	// if there is a search parameter
	$sql = "SELECT regno, name, model_exam, university_exam, month, year ";
	$sql.=" FROM $subject";
	$sql.=" WHERE regno LIKE '".$requestData['search']['value']."%' ";    // $requestData['search']['value'] contains search parameter
	$sql.=" OR name LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR model_exam LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR university_exam LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR month LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR year LIKE '".$requestData['search']['value']."%' ";
	
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
	$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result without limit in the query 

	$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']." "; 	// $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc , $requestData['start'] contains start row number ,$requestData['length'] contains limit length.
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees"); // again run query with limit
	
} else {	

	$sql = "SELECT regno, name, class_test1, class_test2, class_test3, iae1, iae2, iae3, model_exam, university_exam, month, year ";
	$sql.=" FROM $subject";
	$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
	
}	

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["regno"];
	$nestedData[] = $row["name"];
	$nestedData[] = $row["model_exam"];
	$nestedData[] = $row["university_exam"];
	$nestedData[] = $row["month"];
	$nestedData[] = $row["year"];
	
	
	$data[] = $nestedData;
}

$json_data = array(
			"draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
			"recordsTotal"    => intval( $totalData ),  // total number of records
			"recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
			"data"            => $data   // total data array
			);

echo json_encode($json_data);  // send data as json format

?>