<?php
class Course {
	private $pk;
	function __construct($pk,$term){
		$this->pk=$pk;
		$db_adapter=new db_adapter();
		$query="select * from course where id=".$this->pk();
		$query_set=$db_adapter->query($query);
		$query_set=$query_set[0];
		$this->Description=$query_set['description'];
		$this->Name=$query_set['title'];
		$this->populate_lecture_arr($term);
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
	function populate_lecture_arr($term){
		$db_adapter=new db_adapter();
		$query="select * from schedule where course=".$this->pk()." and schedule_type in
		(select id from schedule_type where description='Lecture') and 
		term=".$term;
		$query_set=$db_adapter->query($query);
		foreach($query_set as $schedule){
			$this->LectureArray[]=new Lecture($schedule['id'],$term);
		}
	}
	function pk(){
		return $this->pk;
		
	}
	function string(){
		echo 'Course: <br />Name:'.$this->Name.'<br />'.'Description:'.$this->Description;
		if ($this->LectureArray!=Null){
			foreach($this->LectureArray as $lecture){
				echo $lecture->string().'<br /><br />';
			}
			
		}
		echo '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
	}
}
// A lecture is a type of schedule table. 
class Lecture {
	private $pk;
	private $course;
	private $term;
	public $TutorialArray = array();
	public $LaboratoryArray = array();
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LectureID;
	// Precondition, this is a Lecture  type of schedule. meaning that it has 'lecture' as description in schedule type.
	function __construct($pk,$term){
		$this->pk=$pk;
		$this->term=$term;
		$this->populate_yourself();
		$this->populate_tut_arr($term);
		$this->populate_lab_arr($term);
	}
	function populate_yourself(){
		$query="select * from schedule where id=".$this->pk();
		$db_adapter=new db_adapter();
		$query_set=$db_adapter->query($query);
		$query_set=$query_set[0];
		$this->Days=$query_set['days'];
		$this->StartingTime=$query_set['begin'];
		$this->EndTime=$query_set['end'];
	    $this->Professor=$query_set['professor'];
	    $this->Classrom=$query_set['location'];
	    $this->LectureID=$query_set['id'];
	    $this->course=$query_set['course'];
	    
	}
	
	function populate_tut_arr(){
		$db_adapter=new db_adapter();
		$tutorial_query="select * from schedule where schedule_type in
		(select id from schedule_type where description='Tutorial') and
		course=".$this->course." and term=".$this->term;
		$tut_query_set=$db_adapter->query($tutorial_query);
		if($tut_query_set!=Null){
			foreach($tut_query_set as $tutorial_row){
				$this->TutorialArray[]=new Tutorial($tutorial_row);
			}
		}
	}
	function populate_lab_arr(){
		$lab_query="select * from schedule where schedule_type in
		(select id from schedule_type where description='Lab') and
		course=".$this->course." and term=".$this->term;
		$db_adapter=new db_adapter();
		$lab_query_set=$db_adapter->query($lab_query);
		if($lab_query_set!=Null){
			foreach($lab_query_set as $lab_row ){
				$this->LaboratoryArray[]=new Laboratory($lab_row);
			}
		}
		
	}

	
	function string(){
		//echo '<br />inside string lecture.<br />Tutorial array:'.count($this->TutorialArray).'<br />Lab array:'.count($this->LaboratoryArray). '<br />';
		//echo count($this->TutorialArray);
		//echo count($this->LaboratoryArray);
		$string= '<br />Lecture: <br />'.'Days:'.$this->Days.'<br />'.'Start:'.$this->StartingTime.'<br />'.
		'End:'.$this->EndTime.'<br />'.'Professor:'.$this->Professor.'<br />'.
		'Class room'.$this->Classrom.'<br />'.'Lecture_id:'.$this->LectureID.'<br />Term:'.$this->term.'<br />';
		if($this->TutorialArray!=Null){
			foreach($this->TutorialArray as $tutorial){
				$string.=$tutorial->string();
			}
		}
		if($this->LaboratoryArray!=Null){
			foreach($this->LaboratoryArray as $lab){
				$string.=$lab->string();
			}
		}
		return $string;
	}
	function lab_array(){
		return $this->LaboratoryArray;
	}
	function tutorial_array(){
		return $this->TutorialArray;
	}
	function pk(){
		return $this->pk;
	}
}


class Tutorial {
	function __construct($table_row){
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
		'Class room'.$this->Classrom.'<br />'.'Tutorial wonderbar:'.$this->TutorialID.'<br />';
	}
}

class Laboratory {
	public $Days;
	public $StartingTime;
	public $EndTime;
	public $Professor;
	public $Classrom;
	public $LaboratoryID;
	function __construct($table_row){
		$this->Days=$table_row['days'];
		$this->StartingTime=$table_row['begin'];
		$this->EndTime=$table_row['end'];
	    $this->Professor=$table_row['professor'];
	    $this->Classrom=$table_row['location'];
	    $this->LaboratoryID=$table_row['id'];
	}
	
	function string(){
		
		return 'LABORATORY:<br />'.'Days:'.$this->Days.'<br />'.'Start:'.$this->StartingTime.'<br />'.
		'End:'.$this->EndTime.'<br />'.'Professor:'.$this->Professor.'<br />'.
		'Class room'.$this->Classrom.'<br />'.'Laboratory grobazon:'.$this->LaboratoryID.'<br />';
	}
}
?>