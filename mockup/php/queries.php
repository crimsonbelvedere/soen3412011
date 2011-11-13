


<?php
include('db.php');
include('AjaxRequest.php');
/***
 * Set to false if you dont want to debug.
 * 
 * */
$DEBUG=True;
if($DEBUG){
	$result=get_courses('Engineering and Computer Science','Computer Science and Software Engineering','BEng in Software Engineering',2);
	foreach($result as $course){
		echo '<br />';
		echo 'Course:<br />';
		echo 'Description:'.$course->Description.'<br />';
	}
}

/**
 * return an array with courses inside it.
 * Each course, is an instance of the Course class from AjaxRequest.
 * The courses are selected by faculty description, department description, program description, and semester (which is an int).
 * **/
function get_courses($faculty_description,$department_description, $program_description, $semester){
	$db_adapter=new db_adapter();
	$query="
	select * from course where id in
   (
      select course from Group_has_course where course_group in
      (
         select id from course_group where program in
         (
            select id from program where description='".$program_description."'
         )
      )
   )    
and id in 
   (
      select course from schedule where term=".$semester."
   )
and department in 
(
   select department.id from department where department.description='".$department_description."' and 
   department.faculty  in
   (
      select id from faculty where faculty.description='".$faculty_description."'
   )
                                    	
)
	
	";
	$query_set=$db_adapter->query($query);
	$list=array();
	
	if ($query_set!=Null)	{
		foreach($query_set as $course_row){
			$course=new Course;
			$course->Description=$course_row['description'];
			$course->Name=$course_row['title'];
			$list[]=$course;
		}
	}
	return $list;
}


?>