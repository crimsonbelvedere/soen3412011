


<?php
include('db.php');
include('ajax_models.php');
/***
 * Set to false if you dont want to debug.
 * 
 * */
$DEBUG=True;


if($DEBUG){
	$result=get_courses('Engineering and Computer Science','Computer Science and Software Engineering','BEng in Software Engineering',2 );
	$counter=0;
	foreach($result as $course){
		echo $course->string();
		$counter+=1;
	}
}

/**
 * return an array with Course objects inside it.
 * In the course object, only the title and description of the course are defined. The rest is null.
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
			$course=new Course($course_row['id'],$semester);
			$list[]=$course;
		}
	}
	return $list;
}

/** FOR DEBUGGING
 * 
 
 select * from course where id in
   (
      select course from Group_has_course where course_group in
      (
         select id from course_group where program in
         (
            select id from program where description='BEng in Software Engineering'
         )
      )
   )    
and id in 
   (
      select course from schedule where term=2
   )
and department in 
(
   select department.id from department where department.description='Computer Science and Software Engineering' and 
   department.faculty  in
   (
      select id from faculty where faculty.description='Engineering and Computer Science'
   )
                                    	
)
 */
?>