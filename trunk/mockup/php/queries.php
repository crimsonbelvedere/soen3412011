


<?php
include('db.php');
include('ajax_models.php');
/***
 * Set to false if you dont want to debug.
 * 
 * */
$DEBUG=False;
$DEBUG_PREREQUISITES=False;

if($DEBUG_PREREQUISITES){
	$prerequisite_group=null;
	$x=9;
	$prerequisite_group=get_prerequisite_groups_for_course($x);
	$counter=0;	
	foreach($prerequisite_group as $group){
			foreach($group->course_list as $course){
				echo $course->string();
				$counter++;
			}
		}
}

if($DEBUG){
		
	//$arr = array ('item1'=>"I love jquery4u",'item2'=>"You love jQuery4u",'item3'=>"We love jQuery4u");
	//echo json_encode($arr);
	
	//print "Testing db call";
	$result=get_courses('Engineering and Computer Science','Computer Science and Software Engineering','BEng in Software Engineering',2 );
	/*$counter=0;
	foreach($result as $course){
		echo $course->string();
		$counter+=1;
	}*/
	echo json_encode($result);
	
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
			//print_r($couse);

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
/*
 * Returns all the prerequites for a course.
 * The returned values are prerequisite_group object within an array.
 */

function get_prerequisite_groups_for_course($course){
	$prerequisite_groups_ids=get_prerequisite_course_groups($course);
	$parent=new Course($course,null);
	$prerequisite_group_list=array();
	$course_list=array();
	foreach($prerequisite_groups_ids as $group_id){
		$course_list=get_courses_from_group($group_id);
		$prerequisite_group=new Prerequisite_group($parent,$course_list);
		$prerequisite_group_list[]=$prerequisite_group;
	}
	return $prerequisite_group_list;
}
function get_prerequisite_group_description_by_id($id){
	$query='select description from prerequisite_group where id='.$id;
	$db_adapter=new db_adapter();
	$query_set=$db_adapter->query($query);
	return $query_set['description'];
}
/*
 * Takes as input the $course_list to populate and the course group-number
 * return all the courses that are part of that course group (they are basically alternatives)
 */
/*
 * TESTED
 */
function get_courses_from_group($group_number){
	$query='select * from prerequisite_group where prerequisite_group='.$group_number;
	$adapter=new db_adapter();
	$query_set=$adapter->query($query);
	$course_list=array();
	foreach($query_set as $group){
		$course_id=$group['prerequisite'];
		$course_list[]=new Course($course_id,null);
	}
	return $course_list;
}

/*
 * This is the record that stores all the courses that are part of a course_group.
 * These courses are in essense alternatives to each other.
 * For example, math 213 and engr213 would be part of the same prerequisite_group.
 * Elec 275, would the the $parent.
 */
class Prerequisite_group{
	public $parent;
	public $course_list;
	function __construct($parent,$course_list){
		$this->course_list=$course_list;
		$this->parent=$parent;
	}
}
/* CONTRACT
 * returns an array of prerequisite_group objects array
 * each such array is a list of prerequisite group for a give course that the student has to take
 * 
 */
function get_prerequisites($student_id){
	$student=new student($student_id);
	$courses_left_to_take=get_courses_to_take($student_id);
	$prerequisist_list=array();
	foreach($courses_left_to_take as $course){
		$prerequisite_list[]=get_prerequisite_groups_for_course($course->pk());
	}
	return $prerequisite_list;
}
/*
 * this function is used only once in this application
 * it takes and array of arrays, and just appends all the values to one array(and return it)
 */
function f($x){
	$list=array();
	foreach($x as $var){
		foreach($var as $var2){
			$list[]=$var2;
		}
	}
	return $list;
}

/* CONTRACT
 * Return all the courses that the student is still to take.
 */
function get_courses_to_take($student_id){
	$x=f(get_courses_for_program(null));
	$student=new student($student_id);
	$y=get_courses_for_option(null,$student->program_option_description());
	$necessary_courses=my_merge($x,$y);
 	$courses_to_take=course_set_difference($necessary_courses,$student->courses_taken());
	return $courses_to_take;
	
}
function my_merge($x_array,$y_array){
	$z=array();
	foreach($x_array as $x){
		$z[]=$x;
		
	}
	foreach ($y_array as $y){
		$z[]=$y;
	}
	return $z;
}
function course_set_difference($all_courses,$taken_courses){
	$difference=array();
	//where or not the course has been taken
	$flag=False;
	foreach($all_courses as $course1){
		
		foreach($taken_courses as $course2){
			if($course1->pk()==$course2->pk()){
				//set the flag to true; meaning that the course has been taken.
				$flag=True;
				continue;
			}
		//if after checking through the whole list of taken_courses, and this course is not there, append it to the difference.
		
		}
		if($flag==False){
			$difference[]=$course1;
		}
		$flag=False;
		
	}
	return $difference;
}

/* 
 * Return all the courses that the student has already taken
 * TESTED
 */
function get_student_courses($student_id){
	$student=new Student($student_id);
	return $student->courses_taken();
	
}
/*
 * Return all the courses in the given program
 */
function get_courses_for_program($program){
	$course_array=array('core'=>get_engineering_core_courses(),
						'software_engineering_core'=>get_software_engineering_courses(),
						'computer_science_group'=>get_computer_science_group(),
	
	);
	return $course_array;
}
function get_engineering_core_courses(){
	$query='select * from course where id in
   (select course from group_has_course as ghc where ghc.course_group in
		(select id from course_group where course_group.id = 4))';
	$courses=process_courses_query($query);
	return $courses;}
function get_software_engineering_courses(){
	$query='select * from course where id in
   (select course from group_has_course as ghc where ghc.course_group in
		(select id from course_group where course_group.id = 5))';
	$courses=process_courses_query($query);
	return $courses;}
function get_computer_science_group(){
	$query='select * from course where id in
   (select course from group_has_course as ghc where ghc.course_group in
		(select id from course_group where course_group.id = 6))';
	$courses=process_courses_query($query);
	return $courses;}
function get_electives(){
	$query='select * from course where id in
   (select course from group_has_course as ghc where ghc.course_group in
		(select id from course_group where course_group.id =3))';
	$courses=process_courses_query($query);
	return $courses;
}
function process_courses_query($query_string){
	$db_adapter=new db_adapter();
	$query_set=$db_adapter->query($query_string);
	$list=array();
	if($query_set!=null){
		foreach($query_set as $course_row){
			$course=new Course($course_row['id'],null);
			$list[]=$course;
		}
	}
	return $list;
	
}
function get_courses_for_option($program,$option){
	$adapter= new db_adapter();
	$query="select * from course where id in
		(select course from group_has_course where course_group in
			(select id from course_group where description='".$option."'))";
	$query_set=$adapter->query($query);
	$course_list=array();
	foreach($query_set as $course){
		$course_list[]=new Course($course['id'],null);
	}
	return $course_list;
	
}
/*
 * return the id's of the prerequisite groups for this course
 */
/**
 * TESTED
 */
function get_prerequisite_course_groups($course_id){
	$db_adapter=new db_adapter();
	$query='select prerequisite_group from prerequisite_group where course='.$course_id.' GROUP BY prerequisite_group';
	$query_set=$db_adapter->query($query);
	$group_id=array();
	if($query_set!=null){
		foreach($query_set as $group){
			$group_id[]=$group['prerequisite_group'];
		}
	}	
	return $group_id;
}
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