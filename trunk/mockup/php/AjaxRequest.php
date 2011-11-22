<?php 

class Course {
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
$Course1 = new Course;
$Course2 = new Course;

$Lecture0= new Lecture;
$Lecture1= new Lecture;
$Lecture2= new Lecture;

$Tutorial0= new Tutorial;
$Tutorial1= new Tutorial;
$Tutorial2= new Tutorial;

$Laboratory0 = new Laboratory;
$Laboratory1 = new Laboratory;
$Laboratory2 = new Laboratory;


$Course0->Name="SOEN258";
$Course0->Description="This is a test course";
$Course0->NumberOfCredits =3;

$Course1->Name="ELEC273";
$Course1->Description="This is a test course";
$Course1->NumberOfCredits =3;

$Course2->Name="COMP346";
$Course2->Description="This is a test course";
$Course2->NumberOfCredits =3;

$Lecture0->Classrom="H-831";
$Lecture0->Professor="Francott";
$Lecture0->Days="M----";
$Lecture0->StartingTime="08:45:00";
$Lecture0->EndTime="09:45:00";
$Lecture0->LectureID="L0";

$Lecture1->Classrom="H-831";
$Lecture1->Professor="Francott";
$Lecture1->Days="M----";
$Lecture1->StartingTime="10:45:00";
$Lecture1->EndTime="11:45:00";
$Lecture1->LectureID="L1";

$Lecture2->Classrom="H-831";
$Lecture2->Professor="Francott";
$Lecture2->Days="M----";
$Lecture2->StartingTime="12:45:00";
$Lecture2->EndTime="13:45:00";
$Lecture2->LectureID="L2";

$Tutorial0->Classrom="H-831";
$Tutorial0->Professor="TA TUT";
$Tutorial0->Days="-T---";
$Tutorial0->StartingTime="12:00:00";
$Tutorial0->EndTime="13:00:00";
$Tutorial0->TutorialID="T0";

$Tutorial1->Classrom="H-831";
$Tutorial1->Professor="TA TUT";
$Tutorial1->Days="--W--";
$Tutorial1->StartingTime="14:00:00";
$Tutorial1->EndTime="15:00:00";
$Tutorial1->TutorialID="T1";

$Tutorial2->Classrom="H-831";
$Tutorial2->Professor="TA TUT";
$Tutorial2->Days="--W--";
$Tutorial2->StartingTime="16:00:00";
$Tutorial2->EndTime="17:00:00";
$Tutorial2->TutorialID="T2";

$Laboratory0->Classrom="H-831";
$Laboratory0->Professor="TA LAB";
$Laboratory0->Days="---T-";
$Laboratory0->StartingTime="16:00:00";
$Laboratory0->EndTime="17:00:00";
$Laboratory0->LaboratoryID="Lb0";

$Laboratory1->Classrom="H-831";
$Laboratory1->Professor="TA LAB";
$Laboratory1->Days="----F";
$Laboratory1->StartingTime="18:00:00";
$Laboratory1->EndTime="19:00:00";
$Laboratory1->LaboratoryID="Lb1";

$Laboratory2->Classrom="H-831";
$Laboratory2->Professor="TA LAB";
$Laboratory2->Days="----F";
$Laboratory2->StartingTime="20:00:00";
$Laboratory2->EndTime="21:00:00";
$Laboratory2->LaboratoryID="Lb2";


//Populate Object structure from lower level to higher level
//Test with loop of 10 elements
//for ($i=0; $i < 2 ; $i++) { 

	array_push($Course0->LectureArray,$Lecture0);
	array_push($Course0->TutorialArray,$Tutorial0);
	array_push($Course0->LaboratoryArray,$Laboratory0);
	array_push($Course0->LectureArray,$Lecture1);
	array_push($Course0->TutorialArray,$Tutorial1);
	array_push($Course0->LaboratoryArray,$Laboratory1);
	array_push($CourseList,$Course0);
	
	array_push($Course1->LectureArray,$Lecture0);
	array_push($Course1->TutorialArray,$Tutorial0);
	array_push($Course1->LaboratoryArray,$Laboratory0);
	array_push($Course1->LectureArray,$Lecture1);
	array_push($Course1->TutorialArray,$Tutorial1);
	array_push($Course1->LaboratoryArray,$Laboratory1);
	array_push($CourseList,$Course1);
	
	array_push($Course2->LectureArray,$Lecture0);
	array_push($Course2->TutorialArray,$Tutorial0);
	array_push($Course2->LaboratoryArray,$Laboratory0);
	array_push($Course2->LectureArray,$Lecture1);
	array_push($Course2->TutorialArray,$Tutorial1);
	array_push($Course2->LaboratoryArray,$Laboratory1);
	array_push($CourseList,$Course2);
	
	//array_push($Course0->PrequisiteArray
	//array_push($Course0->TermArray
	
	
//}

//Return response to the client.
echo json_encode($CourseList);

?>