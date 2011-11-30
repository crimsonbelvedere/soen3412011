<?php
include('queries.php');
/*
 * Prerequisite_group number is 2. The courses that are part of that group are 11,1,6.
 */
	function test_get_courses_from_group(){
		$course_list=array();
		$course_list=get_courses_from_group(2);
		//echo count($course_list);
		assert($course_list[0]->pk()==11);
		assert($course_list[1]->pk()==1);
		assert($course_list[2]->pk()==6);
	}
	function test_get_prerequisite_course_groups(){
		$prerequisite_group=get_prerequisite_course_groups(9);
		assert($prerequisite_group[0]==2);
		assert($prerequisite_group[1]==3);
	}
	function my_assert($bool){
		if ($bool==False){
			echo 'AssertionFailed';
			
		}
	}
	function test_get_courses_for_option(){
		$option='Web Services and Applications (WSA) Option';
		$course_list=get_courses_for_option(null,$option);
		assert($course_list[0]->pk()==49);
		assert($course_list[1]->pk()==59);
		assert($course_list[2]->pk()==69);
		assert($course_list[3]->pk()==120);
		assert($course_list[4]->pk()==130);
		assert($course_list[5]->pk()==137);
		
	}
	function test_get_prerequisite_groups_for_course(){
		$prerequisite_groups=get_prerequisite_groups_for_course(9);
		assert(count($prerequisite_groups==2));
		assert($prerequisite_groups[0]->course_list[0]->pk()==11);
		assert($prerequisite_groups[0]->course_list[1]->pk()==1);
		assert($prerequisite_groups[0]->course_list[2]->pk()==6);
		assert($prerequisite_groups[1]->course_list[0]->pk()==19);
	}
	function test_get_student_courses(){
		$student_courses=get_student_courses(3333);
		assert(count($student_courses)==30);
		assert($student_courses[0]->pk()==16);
		assert($student_courses[1]->pk()==17);
		assert($student_courses[2]->pk()==18);
		assert($student_courses[3]->pk()==25);
		assert($student_courses[29]->pk()==131);
		
	}
	function test_process_courses_query(){
		$query='select id from course where id=5';
		$course_list=process_courses_query($query);
		assert($course_list[0]->pk()==5);
		$query='select id from course where id in
		(select course from group_has_course where course_group=7)';
		$course_list=process_courses_query($query);
		assert(count($course_list)==19);
		assert($course_list[0]->pk()==1);
		assert($course_list[1]->pk()==4);
		assert($course_list[2]->pk()==6);
		assert($course_list[18]->pk()==117);
		
	}
	function test_get_courses_to_take(){
			echo count(get_courses_to_take(3333));
			foreach(get_courses_to_take(3) as $var){
				echo $var->string();
			}
	}
	function test_small_function(){
		assert(count(get_engineering_core_courses())==11);
		assert(count(get_software_engineering_courses())==15);
		assert(count(get_computer_science_group())==9);
		assert(count(f(get_courses_for_program(null)))==35);
	}
	function test_set_difference(){
		$list1=array();
		$list1[]=new Course(1,null);
		$list1[]=new Course(2,null);
		$list1[]=new Course(3,null);
		$list1[]=new Course(4,null);
		$list1[]=new Course(5,null);
		$list1[]=new Course(6,null);
		
		$list2=array();
		$list2[]=new Course(1,null);
		$list2[]=new Course(4,null);
		$set=course_set_difference($list1,$list2);
		assert(count($set)==4);
		assert($set[0]->pk()==2);
		assert($set[1]->pk()==3);
		assert($set[2]->pk()==5);
		assert($set[3]->pk()==6);
		
		
	}
	function test_get_prerequisites(){
		$list=get_prerequisites(3333);
		foreach($list as $prerequisite_groups_for_course){
			foreach($prerequisite_groups_for_course as $prerequisite_group){
				foreach($prerequisite_group->course_list as $course){
					echo $course->string();
				}
			}
		}
	}
	test_set_difference();
	test_get_prerequisites();
	//THIS IS COMMENTED OUT CAUSE THE UNIT TEST IS VISUAL.
	 
	test_get_courses_to_take();
	
	test_get_courses_from_group();
	
	test_get_prerequisite_course_groups();
	
	test_get_courses_for_option();
	
	test_get_prerequisite_groups_for_course();
	
	test_process_courses_query();
	
	//test_get_student_courses();
	//test_small_function();
	 
?>