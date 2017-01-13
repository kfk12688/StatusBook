<?php
error_reporting(E_ALL^E_NOTICE);
require 'connect.php';
$extension='';
$files_array = array();
$dir_handle = @opendir($directory) or die("There is an error with your file directory!");
while ($file = readdir($dir_handle)) 
{
	if($file{0}=='.') continue;
		$parts = explode('.',$file);
	$extension = strtolower(end($parts));
		if($extension == 'php') continue;
	$files_array[]=$file;
}
sort($files_array,SORT_STRING);
$file_downloads=array();
$result = mysql_query("SELECT * FROM download_manager");
if(mysql_num_rows($result))
while($row=mysql_fetch_assoc($result))
{
		$file_downloads[$row['filename']]=$row['downloads'];
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link rel="stylesheet" type="text/css" href="styles.css" />
<link rel="stylesheet" type="text/css" href="fancybox/jquery.fancybox-1.2.6.css" media="screen" />
<script type="text/javascript" src="jquery-2.1.3.js"></script>
<script type="text/javascript" src="script.js"></script>
</head>
<body>
<div id="file-manager">
    <ul class="manager">
    <?php 
        foreach($files_array as $key=>$val)
        {
            echo '<li><a href="download.php?file='.urlencode($val).'">'.$val.' 
                    <span class="download-count" title="Times Downloaded">'.(int)$file_downloads[$val].'</span> <span class="download-label">download</span></a>
                    </li>';
        }
        ?>
  </ul>
</div>
</body>
</html>
