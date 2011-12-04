<?php
include('queries.php');
if(isset($_GET['semester'])==true){
	$semester=$_GET['semester'];
	echo get_courses_short_cut($semester);
}
?>