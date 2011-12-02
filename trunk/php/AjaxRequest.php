<?php 
/*
 * This file is used to redirect the ajax call to the right function that interact with the database.
 */
include('queries.php');

	$FunctionCall = $_GET['FunctionCall'];
	
	if($FunctionCall == "get_courses")
	{	
		$Faculty= $_GET['Faculty'];
		$Department= $_GET['Department'];
		$Program= $_GET['Program'];
		$Semester= $_GET['Semester'];
		
		//$resultFall=get_courses($Faculty,$Department,$Program,2);
		//$resultFall=get_courses($Faculty,$Department,$Program,4);
		//$result=array_merge($resultFall,$resultFall);
		$result=get_courses($Faculty,$Department,$Program,$Semester);
		
		echo json_encode($result);
	}
	elseif ($FunctionCall == "get_courses_to_take") 
	{
		$StudentId= $_GET['StudentId'];
		$result = get_courses_to_take($StudentId);
		
		echo json_encode($result);
	}
	elseif ($FunctionCall == "login") 
	{
		$StudentId= $_GET['StudentId'];
		$Password = $_GET['Password'];
		$result = login($StudentId,$Password);
		echo json_encode($result);
	}
	elseif ($FunctionCall == "get_prerequisites")
	{
		$StudentId= $_GET['StudentId'];
		$result = get_prerequisites($StudentId);
		
		echo json_encode($result);
	}
?>