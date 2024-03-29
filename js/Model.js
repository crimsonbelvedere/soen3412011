	// state object reflecting the user selection for retreiving courses
	var State = 
	{	
		/*
		Faculty:"",
		Department:"",		
		Program:"",				
		Semester:""
		*/
	};
	
	// boolean variable that indicate if the user is logged in or not.
	var StudentIsLoggedIn = false;
	
	// strudent information array
	var StudentInformation = 
	[ 
	
	];
	
	//courses that are left to take in this semester for the logged in student
	var CourseLeftToTakeInThisSemester =
	[
	
	];
	
	//courses left to take in the program for the logged in student
	var CourseLeftToTakeInProgram =
	[
	
	];
	
	//student prerequisite array
	var StudentPrerequisite =
	[
	
	];
	
	//courses that the student cannot take
	var CourseCannotTake =
	[
	
	];
	
	//course that the student has already taken
	var StudsentCourseList = 
	[ 
	
	];
	
	//all courses displayed in the course selector
	var AllCourseList = 
	[ 
	
	];
	
	//all courses offered in the fall term
	var FallCourseList = 
	[ 
	
	];
	
	//all courses offered in the winter term 
	var WinterCourseList = 
	[ 
	
	];
	
	//courses from the engineering core
	var CourseListCoreEngineering = 
	[
		
	];


	//courses from the software engineering
	var CourseListFieldEngineering = 
	[
		
	];
	
	//courses from the option
	var CourseListOption = 
	[
		
	];
	
	//Courses from electives
	var CourseListElectives = 
	[
		
	];
	
	//selected courses by the user
	var CourseListSelection = 
	[
		
	];
	
	//   all possible section generated by the selected courses
	var  CompleteCourseSectionTable = 
	[
	
	];
	
	// all possible schedule generetaed by the all sections
	var CourseScheduleList = 
	[
	
	];
	
	// all constraint added by the user
	var ConstraintsList = 
	[
	
	];
	
	function GetStudentIsLoggedIn()
	{
		return StudentIsLoggedIn;
	}	
	function SetStudentIsLoggedIn(Status)
	{
		StudentIsLoggedIn = Status;	
	}	
	
/**********************************************************************************/	
	function GetStudentInformation()
	{
		return StudentInformation;
	}	
	function SetStudentInformation(NewStudentInformation)
	{
		StudentInformation=NewStudentInformation;
	}
/**********************************************************************************/
	function GetStudentPrerequisite()
	{
		return StudentPrerequisite;
	}	
	function SetStudentPrerequisite(NewPrerequisite)
	{
		StudentPrerequisite=NewPrerequisite;
	}
	function AddToStudentPrerequisite(NewPrerequisite)
	{
		StudentPrerequisite.push(NewPrerequisite);
	}	
	function ClearStudentPrerequisite()
	{
		StudentPrerequisite.splice(0,StudentPrerequisite.length);				
	}
/**********************************************************************************/
	function GetStudentCourseCannotTake()
	{
		return CourseCannotTake;
	}	
	function SetStudentCourseCannotTake(NewCourseCannotTake)
	{
		CourseCannotTake=NewCourseCannotTake;
	}
	function AddToStudentCourseCannotTake(NewCourseCannotTake)
	{
		CourseCannotTake.push(NewCourseCannotTake);
	}
	function ClearStudentCourseCannotTake()
	{
		CourseCannotTake.splice(0,CourseCannotTake.length);				
	}
/**********************************************************************************/
	function GetStudentCourseLeftToTakeInThisSemester()
	{
		return CourseLeftToTakeInThisSemester;
	}
	function SetStudentCourseLeftToTakeInThisSemester(NewCourseLeftToTakeInThisSemester)
	{
		CourseLeftToTakeInThisSemester=NewCourseLeftToTakeInThisSemester;
	}
	function AddToStudentCourseLeftToTakeInThisSemester(NewCourseLeftToTakeInThisSemester)
	{
		CourseLeftToTakeInThisSemester.push(NewCourseLeftToTakeInThisSemester);
	}
	function ClearStudentCourseLeftToTakeInThisSemester()
	{
		CourseLeftToTakeInThisSemester.splice(0,CourseLeftToTakeInThisSemester.length);				
	}
/**********************************************************************************/
	function GetStudentCourseLeftToTakeInProgram()
	{
		return CourseLeftToTakeInProgram;
	}
	function SetStudentCourseLeftToTakeInProgram(NewStudentCourseLeftToTakeInProgram)
	{
		CourseLeftToTakeInProgram=NewStudentCourseLeftToTakeInProgram;
	}
	function AddToStudentCourseLeftToTakeInProgram(NewStudentCourseLeftToTakeInProgram)
	{
		CourseLeftToTakeInProgram.push(NewStudentCourseLeftToTakeInProgramInProgram);
	}
	function ClearStudentCourseLeftToTakeInProgram()
	{
		CourseLeftToTakeInProgram.splice(0,CourseLeftToTakeInProgram.length);				
	}
/**********************************************************************************/
	function GetStudentCourseList()
	{
		return StudentCourseList;
	}
	function SetStudentCourseList(NewStudentCourseList)
	{
		StudentCourseList=NewStudentCourseList;
	}
/**********************************************************************************/
	function GetConstraintsList()
	{
		return ConstraintsList;
	}
	function ClearConstraintsList()
	{
		ConstraintsList.splice(0,ConstraintsList.length);				
	}
	function AddToConstraintsList(ConstraintsObject)
	{
		ConstraintsList.push(ConstraintsObject);
	}
/**********************************************************************************/
	function GetCourseScheduleList()
	{
		return CourseScheduleList;
	}
	function ClearCourseFromScheduleList()
	{
		CourseScheduleList.splice(0,CourseScheduleList.length);				
	}
	function SetScheduleList(NewScheduleList)
	{
		CourseScheduleList = NewScheduleList;	
	}
	function AddToCourseScheduleList(ValidCourseSectionArrangment)
	{
		CourseScheduleList.push(ValidCourseSectionArrangment);
	}
/**********************************************************************************/
	function GetCompleteCourseSectionTable()
	{
		return CompleteCourseSectionTable;
	}
	function AddToCompleteCourseSectionTable(SingleCourseSectionList)
	{
		CompleteCourseSectionTable.push(SingleCourseSectionList);
	}
	function RemoveFromCompleteCourseSectionTable(Course)
	{
		for (var i=0; i < CompleteCourseSectionTable.length; i++) 
		{			
			for (var j=0; j < CompleteCourseSectionTable[i].length; j++) 
			{	
				if(CompleteCourseSectionTable[i][j].Number == Course.Number)
				{
					//alert("Course found, remove it from the list");
					CompleteCourseSectionTable.splice(i,1);			
					break;	
				}
			}
			
		};
	}
	function ClearCompleteCourseSectionTable()
	{
		CompleteCourseSectionTable.splice(0,CompleteCourseSectionTable.length);		
	}
/**********************************************************************************/
	//Course List Selection api
	function GetCourseListSelection()
	{
		return CourseListSelection;
	}
	function AddCourseToCourseListSelection(Course)
	{
		//Create course Structure object
		CourseListSelection.push(Course);
	}
	function RemoveCourseFromCourseListSelection(Course)
	{
		for (var i=0; i < CourseListSelection.length; i++) 
		{			
			if(CourseListSelection[i].Number == Course.Number)
			{
				//alert("Course found, remove it from the list");
				CourseListSelection.splice(i,1);			
				break;	
			}
			
		}
	}
	function ClearCourseListSelection()
	{
		CourseListSelection.splice(0,CourseListSelection.length);		
	}	
/**********************************************************************************/
	function SetAllCourseList(Courses)
	{
		AllCourseList = Courses;
	}
	function GetAllCourseList()
	{
		return AllCourseList;
	}
	
	function ClearCourseList()
	{
		AllCourseList.splice(0,AllCourseList.length);		
	}
/**********************************************************************************/
	function SetFallCourseList(Courses)
	{
		FallCourseList = Courses;
	}
	function GetFallCourseList()
	{
		return FallCourseList;
	}
/**********************************************************************************/
	function SetWinterCourseList(Courses)
	{
		WinterCourseList = Courses;
	}
	function GetWinterCourseList()
	{
		return WinterCourseList;
	}
/**********************************************************************************/
	function SetCourseListFieldEngineering(Courses)
	{
		CourseListFieldEngineering = Courses;
	}
	function GetCourseListFieldEngineering()
	{
		return CourseListFieldEngineering;
	}
/**********************************************************************************/
	function SetCourseListCoreEngineering(Courses)
	{
		CourseListCoreEngineering = Courses;
	}
	function GetCourseListCoreEngineering()
	{
		return CourseListCoreEngineering;
	}
/**********************************************************************************/
	function SetCourseListElectives(Courses)
	{
		CourseListElectives = Courses;
	}
	function GetCourseListElectives()
	{
		return CourseListElectives;
	}
/**********************************************************************************/
	function SetCourseListOption(Courses)
	{
		CourseListOption = Courses;
	}
	function GetCourseListOption()
	{
		return CourseListOption;
	}
/**********************************************************************************/
	function SetFaculty(Faculty)
	{
		State.Faculty = Faculty;
	}
	function GetFaculty()
	{
		return State.Faculty;
	}
/**********************************************************************************/
	function SetDepartment(Department)
	{
		State.Department = Department;
	}
	function GetDepartment()
	{
		return State.Department;
	}
/**********************************************************************************/
	function SetProgram(Program)
	{
		State.Program = Program;
	}
	function GetProgram()
	{
		return State.Program;
	}
/**********************************************************************************/ 
	function SetSemester(Semester)
	{
		State.Semester = Semester;
	}
	function GetSemester()
	{
		return State.Semester;
	}
/**********************************************************************************/
	function SetScheduleNumber(ScheduleNumber)
	{
		State.ScheduleNumber=ScheduleNumber;
	}	
	function GetScheduleNumber()
	{
		return State.ScheduleNumber;
	}
/**********************************************************************************/	
	function NextSchedule()
	{
		if(State.ScheduleNumber < CourseScheduleList.length - 1 )
		{
			State.ScheduleNumber ++ ;
		}
		
	}
	function PreviousSchedule()
	{
		if(State.ScheduleNumber > 0 )
		{
			State.ScheduleNumber -- ;
		}
	}
/**********************************************************************************/	
	function SetLeftSliderMinute(LeftSliderMinute)
	{
		State.LeftSliderMinute = LeftSliderMinute;
	}
	function GetLeftSliderMinute()
	{
		return State.LeftSliderMinute;
	}
/**********************************************************************************/ 
	function SetLeftSliderHour(LeftSliderHour)
	{
		State.LeftSliderHour = LeftSliderHour;
	}
	function GetLeftSliderHour()
	{
		return State.LeftSliderHour;
	}
/**********************************************************************************/
	function SetRigthSliderMinute(RigthSliderMinute)
	{
		State.RigthSliderMinute = RigthSliderMinute;
	}
	function GetRigthSliderMinute()
	{
		return State.RigthSliderMinute;
	}	
/**********************************************************************************/
	function SetRigthSliderHour(RigthSliderHour)
	{
		State.RigthSliderHour = RigthSliderHour;
	}
	function GetRigthSliderHour()
	{
		return State.RigthSliderHour;
	}	
/**********************************************************************************/	