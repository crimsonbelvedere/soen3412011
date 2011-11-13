<?php 

class Course {
	public $Name;
	public $Description;
<<<<<<< .mine
	
	
	//public $PrequisiteArray = array(); //array of string course name
	public $SectionArray = array();
=======
>>>>>>> .r32
	public $NumberOfCredits;
	public $LectureArray= array();
	public $TutorialArray = array();
	public $LaboratoryArray = array(); 
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
$CourseList = array();

$Course0 = new Course;

$Lecture0= new Lecture;
$Lecture1= new Lecture;

$Tutorial0= new Tutorial;
$Tutorial1= new Tutorial;

$Laboratory0 = new Laboratory;
$Laboratory1 = new Laboratory;


$Course0->Name="SOEN258";
$Course0->Description="This is a test course";
$Course0->NumberOfCredits =3;

$Lecture0->Classrom="H-831";
$Lecture0->Professor="Francott";
$Lecture0->Days="M-W--";
$Lecture0->StartingTime="8:45:00";
$Lecture0->EndTime="9:45:00";
$Lecture0->LectureID="L0";

$Lecture1->Classrom="H-831";
$Lecture1->Professor="Francott";
$Lecture1->Days="M-W--";
$Lecture1->StartingTime="10:00:00";
$Lecture1->EndTime="11:00:00";
$Lecture1->LectureID="L1";

$Tutorial0->Classrom="H-831";
$Tutorial0->Professor="TA TUT";
$Tutorial0->Days="----F";
$Tutorial0->StartingTime="12:00:00";
$Tutorial0->EndTime="13:00:00";
$Tutorial0->TutorialID="T0";

$Tutorial1->Classrom="H-831";
$Tutorial1->Professor="TA TUT";
$Tutorial1->Days="---T-";
$Tutorial1->StartingTime="14:00:00";
$Tutorial1->EndTime="15:00:00";
$Tutorial1->TutorialID="T1";


$Laboratory0->Classrom="H-831";
$Laboratory0->Professor="TA LAB";
$Laboratory0->Days="--W--";
$Laboratory0->StartingTime="16:00:00";
$Laboratory0->EndTime="17:00:00";
$Laboratory0->LaboratoryID="Lb0";

$Laboratory1->Classrom="H-831";
$Laboratory1->Professor="TA LAB";
$Laboratory1->Days="M----";
$Laboratory1->StartingTime="18:00:00";
$Laboratory1->EndTime="19:00:00";
$Laboratory1->LaboratoryID="Lb1";

//Populate Object structure from lower level to higher level
//Test with loop of 10 elements
//for ($i=0; $i < 1 ; $i++) { 

	array_push($Course0->LectureArray,$Lecture0);
	array_push($Course0->LectureArray,$Lecture1);
	array_push($Course0->TutorialArray,$Tutorial0);
	array_push($Course0->TutorialArray,$Tutorial1);
	array_push($Course0->LaboratoryArray,$Laboratory0);
	array_push($Course0->LaboratoryArray,$Laboratory1);
	array_push($CourseList,$Course0);
	
	//array_push($Course0->PrequisiteArray
	//array_push($Course0->TermArray
	
	
//}

//Return response to the client.
echo json_encode($CourseList);

?>