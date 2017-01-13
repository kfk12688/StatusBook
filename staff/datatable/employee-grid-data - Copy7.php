<?php
/* Database connection start */



$servername = "localhost";
$username = "root";
$password = "";
$dbname = "csebatch2011";

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());

/* Database connection end */


// storing  request (ie, get/post) global array to a variable  
$requestData= $_REQUEST;


$columns = array( 
// datatable column index  => database column name
	0 => 'regno', 
	1 => 'fname',
	2 => 'lname',
	3 => 'email',
	4 => 'gender',
	5 => 'mobile',
	

	
);




// getting total number records without any search
$sql = "SELECT regno, fname, lname, email, gender, mobile";
$sql.=" FROM student";
$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


if( !empty($requestData['search']['value']) ) {
	// if there is a search parameter
	$sql = "SELECT regno, fname, lname, email, gender, mobile,";
	$sql.=" FROM student";
	$sql.=" WHERE regno LIKE '".$requestData['search']['value']."%' ";    // $requestData['search']['value'] contains search parameter
	$sql.=" OR fname LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR lname LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR email LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR gender LIKE '".$requestData['search']['value']."%' ";
	$sql.=" OR mobile LIKE '".$requestData['search']['value']."%' ";
	
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
	$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result without limit in the query 

	$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']." "; 	// $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc , $requestData['start'] contains start row number ,$requestData['length'] contains limit length.
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees"); // again run query with limit
	
} else {	

	$sql = "SELECT regno, fname, lname, email, gender, mobile";
	$sql.=" FROM student";
	$sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
	$query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
	
}	

$data = array();
while( $row=mysqli_fetch_array($query) ) {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["regno"];
	$nestedData[] = $row["fname"];
	$nestedData[] = $row["lname"];
	$nestedData[] = $row["email"];
	$nestedData[] = $row["gender"];
	$nestedData[] = $row["mobile"];
	
	
	
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