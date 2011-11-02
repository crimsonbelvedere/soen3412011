<?php 
 
class Schedule {

	public $CourseArray= array();
}

class Course {
	
	public $Name;
	public $Description;
	//public $PrequisiteArray = array(); //array of string course name
	public $SectionArray = array();
	public $NumberOfCredits;
	//public $TermArray = array(); 
}

class Section {
	
	public $LectureArray = array();
	public $TutorialArray = array();
	public $LaboratoryArray = array();
	public $SectionNumber;
}


class Lecture {
	
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


//Element transmitted from the user interface to the server
$Faculty= $_GET['Faculty'];
$Department= $_GET['Department'];
$Program= $_GET['Program'];
$Semester= $_GET['Semester'];
$Category= $_GET['Category'];


//GET DATA FROM DATABASE HERE.....
//SELECT * FROM FACULTY AND DEPARTMENT AND PROGRAM AND SEMESTER AND CATEGORY




//getCousesFromDb($Faculty...)










//Create the Schedule Object
$RequestedSchedule = new Schedule;


//Courses from the retrevied from the database
$Course0 = new Course;
$Course0->Name="SOEN258";
$Course0->Description="This is a test course";
$Course0->NumberOfCredits =3;
//array_push($Course0->PrequisiteArray
//array_push($Course0->SectionArray
//array_push($Course0->TermArray

$Section0= new Section;
$Section0->SectionNumber="AA";
//array_push($Section0->LectureArray
//array_push($Section0->TutorialArray
//array_push($Section0->LaboratoryArray


$Lecture0= new Lecture;
$Lecture0->Classrom="H-831";
$Lecture0->Professor="Francott";
$Lecture0->Days="Monday";
$Lecture0->StartingTime="8:45";
$Lecture0->EndTime="10:00";
$Lecture0->LectureID="AA/LECA";

$Tutorial0= new Tutorial;
$Tutorial0->Classrom="H-831";
$Tutorial0->Professor="TA TUT";
$Tutorial0->Days="Monday";
$Tutorial0->StartingTime="12:00";
$Tutorial0->EndTime="13:15";
$Tutorial0->TutorialID="AA/TUTA";

$Laboratory0 = new Laboratory;
$Laboratory0->Classrom="H-831";
$Laboratory0->Professor="TA LAB";
$Laboratory0->Days="Tuesday";
$Laboratory0->StartingTime="9:00";
$Laboratory0->EndTime="11:15";
$Laboratory0->LaboratoryID="AA/LABA";


//Populate Object structure from lower level to higher level
//Test with loop of 10 elements
for ($i=0; $i < 3 ; $i++) { 

	array_push($Section0->LectureArray,$Lecture0);
	array_push($Section0->TutorialArray,$Tutorial0);
	array_push($Section0->LaboratoryArray,$Laboratory0);
	
	
	//array_push($Course0->PrequisiteArray
	array_push($Course0->SectionArray,$Section0);
	//array_push($Course0->TermArray
	

	array_push($RequestedSchedule->CourseArray,$Course0);
}

//Return response to the client.
echo json_encode($RequestedSchedule);

?>