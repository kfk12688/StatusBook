<?php
error_reporting(E_ALL^E_NOTICE);
require('connect.php');
if(!$_GET['file']) error('Missing parameter!');
if($_GET['file']{0}=='.') error('Wrong file!');
if(file_exists($directory.'/'.$_GET['file']))
{
	if(!is_bot())
	mysql_query("	INSERT INTO download_manager SET filename='".mysql_real_escape_string($_GET['file'])."'
					ON DUPLICATE KEY UPDATE downloads=downloads+1");
		header("Location: ".$directory."/".$_GET['file']);
	exit;
}
else error("This file does not exist!");
function error($str)
{
	die($str);
}


function is_bot()
{
		$botlist = array("Teoma", "alexa", "froogle", "Gigabot", "inktomi",
	"looksmart", "URL_Spider_SQL", "Firefly", "NationalDirectory",
	"Ask Jeeves", "TECNOSEEK", "InfoSeek", "WebFindBot", "girafabot",
	"crawler", "www.galaxy.com", "Googlebot", "Scooter", "Slurp",
	"msnbot", "appie", "FAST", "WebBug", "Spade", "ZyBorg", "rabaz",
	"Baiduspider", "Feedfetcher-Google", "TechnoratiSnoop", "Rankivabot",
	"Mediapartners-Google", "Sogou web spider", "WebAlta Crawler","TweetmemeBot",
	"Butterfly","Twitturls","Me.dium","Twiceler");

	foreach($botlist as $bot)
	{
		if(strpos($_SERVER['HTTP_USER_AGENT'],$bot)!==false)
		return true;	
			}

	return false;	
}
?>