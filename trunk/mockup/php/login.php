<?php
include('ajax_models.php');
function login($student_id, $password){
	
	$student= new student($student_id);
	if($student->password==$password){
		if(!is_set($SESSION['login'])){
			session_start();
			$SESSION['login']=True;
			return $student;
		}
		$SESSION['login']=True;
		return $student;
	}
	session_start();
	$SESSION['login']=False;
}

?>