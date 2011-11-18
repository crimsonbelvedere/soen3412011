<?php
class Course {
	private $pk;
	function __construct($pk){
		$this->pk=$pk;
		$db_adapter=new db_adapter();
		$query="select * from course where id=".$this->pk();
		$query_set=$db_adapter->query($query);
		$query_set=$query_set[0];
		$this->Description=$query_set['description'];
		$this->Name=$query_set['title'];
		$this->populate_lecture_arr();
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
	function populate_lecture_arr(){
		$db_adapter=new db_adapter();
		$query="select * from schedule where course=".$this->pk()." and schedule_type in
		(select id from schedule_type where description='Lecture')";
		$query_set=$db_adapter->query($query);
		foreach($query_set as $schedule){
			$this->LectureArray[]=new Lecture($schedule['id']);
		}
	}
	function pk(){
		return $this->pk;
		
	}
	function string(){
		echo 'Course: <br />Name:'.$this->Name.'<br />'.'Description:'.$this->Description;
		if ($this->LectureArray!=Null){
			foreach($this->LectureArray as $lecture){
				echo $lecture->string().'<br />';
			}
			
		}
		echo '<br /><br /><br />';
	}
}
// A lecture is a type of schedule table. 
class Lecture {
	private $pk;
	// Precondition, this is a Lecture  type of schedule. meaning that it has 'lecture' as description in schedule type.
	function __construct($pk){
		$this->pk=$pk;
		$db_adapter=new db_adapter();
		//TODO: Populate the tutorial and the laboratory arrays.
		$lab_query="select * from schedule where schedule_type in
		(select id from schedule_type where description='Lab') and
		lecture=".$this->pk()."";
		$tutorial_query="select * from schedule where schedule_type in
		(select id from schedule_type where description='Tutorial') and
		lecture=".$this->pk()."";
		$this->populate_yourself();
		$x=$db_adapter->query($tutorial_query);
		$y=$db_adapter->query($lab_query);
		$this->TutorialArray=$this->populate_tut_arr($x);
		$this->LaboratoryArray=$this->populate_lab_arr($y);
	}
	function populate_yourself(){
		$query="select * from schedule where id=".$this->pk()."";
		$db_adapter=new db_adapter();
		$query_set=$db_adapter->query($query);
		$query_set=$query_set[0];
		$this->Days=$query_set['days'];
		$StartingTime=$query_set['begin'];
		$EndTime=$query_set['end'];
	    $Professor=$query_set['professor'];
	    $Classrom=$query_set['location'];
	    $LectureID=$query_set['id'];
	}
	//return the lab associated with this lecture.
	function lab_array(){
		return $this->LaboratoryArray;
	}
	//return the tutorial associated with this lecture.
	function tutorial_array(){
		return $this->TutorialArray;
	}
	function pk(){
		return $this->pk;
	}
	function populate_tut_arr($tut_query_set){
		if($tut_query_set!=Null){
			foreach($tut_query_set as $tutorial_row){
				$this->TutorialArray[]=new Tutorial($tutorial_row);
			}
		}
	}
	function populate_lab_arr($lab_query_set){
		if($lab_query_set!=Null){
			foreach($lab_query_set as $lab_row ){
				$this->LaboratoryArray[]=new Laboratory($lab_row);
			}
		}
		
	}
	public $TutorialArray = array();
	public $LaboratoryArray = array();
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LectureID;
	function string(){
		$string= '<br />Lecture: <br />'.'Days:'.$this->Days.'<br />'.'Start:'.$this->StartingTime.'<br />'.
		'End:'.$this->EndTime.'<br />'.'Professor:'.$this->Professor.'<br />'.
		'Class room'.$this->Classrom.'<br />'.'Laboratory:'.$this->LectureID.'<br />';
		if($this->TutorialArray!=Null){
			foreach($this->TutorialArray as $tutorial){
				$string+=$tutorial->string();
			}
		}
		if($this->LaboratoryArray!=Null){
			foreach($this->LaboratoryArray as $lab){
				$string+=$lab->string();
			}
		}
		return $string;
	}
}


class Tutorial {
	function __constructor($table_row){
		$this->Days=$table_row['days'];
		$this->StartingTime=$table_row['begin'];
		$this->EndTime=$table_row['end'];
	    $this->Professor=$table_row['professor'];
	    $this->Classrom=$table_row['location'];
	    $this->TutorialID=$table_row['id'];
	}
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $TutorialID;
	function string(){
		return 'TUTORIAL:<br />'.'Days:'.$this->Days.'<br />'.'Start:'.$this->StartingTime.'<br />'.
		'End:'.$this->EndTime.'<br />'.'Professor:'.$this->Professor.'<br />'.
		'Class room'.$this->Classrom.'<br />'.'Laboratory:'.$this->LaboratoryID.'<br />';
	}
}

class Laboratory {
	function __constructor($table_row){
		$this->Days=$table_row['days'];
		$StartingTime=$table_row['begin'];
		$EndTime=$table_row['end'];
	    $Professor=$table_row['professor'];
	    $Classrom=$table_row['location'];
	    $LaboratoryID=$table_row['id'];
	}
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LaboratoryID;
	function string(){
		return 'LABORATORY:<br />'.'Days:'.$this->Days.'<br />'.'Start:'.$this->StartingTime.'<br />'.
		'End:'.$this->EndTime.'<br />'.'Professor:'.$this->Professor.'<br />'.
		'Class room'.$this->Classrom.'<br />'.'Laboratory:'.$this->LaboratoryID.'<br />';
		
	}
}
?>