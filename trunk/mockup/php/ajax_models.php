<?php
class Course {
	
	function __construct($pk){
		//TODO: populate the lecture_array with all the lectures for this course. 
		
	}
	public $Name;
	public $Description;
	/**
<<<<<<< .mine
	
	
	//public $PrequisiteArray = array(); //array of string course name
	public $SectionArray = array();
=======
>>>>>>> .r32
**/
	public $NumberOfCredits;
	public $LectureArray= array();

	
	function pk(){
		
		
	}



}

// A lecture is a type of schedule table. 
class Lecture {
	// Precondition, this is a Lecture  type of schedule. meaning that it has 'lecture' as description in schedule type.
	function __construct($pk){
		$db_adapter=new db_adapter();
		//TODO: Populate the tutorial and the laboratory arrays.
		
	}
	//return the lab associated with this lecture.
	function lab_array(){
		
		
	}
	//return the tutorial associated with this lecture.
	function tutorial_array(){
		
		
	}
	
	public $TutorialArray = array();
	public $LaboratoryArray = array();
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LectureID;
}


class Tutorial {
	
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $TutorialID;
}

class Laboratory {
	
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LaboratoryID;
}
?>