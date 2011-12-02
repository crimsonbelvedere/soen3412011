	//1 instance of this object.
	var State = 
	{	
		/*
		Faculty:"",
		Department:"",		
		Program:"",				
		Semester:""
		*/
	};
	
	var StudentIsLoggedIn = false;
	
	var StudentInformation = 
	[ 
	
	];
	
	var CourseLeftToTakeInThisSemester =
	[
	
	];
	
	var CourseLeftToTakeInProgram =
	[
	
	];
	
	var StudentPrerequisite =
	[
	
	];
	
	var CourseCannotTake =
	[
	
	];
	
	var StudentCourseList = 
	[ 
	
	];
	
	var AllCourseList = 
	[ 
	
	];
	
	var FallCourseList = 
	[ 
	
	];
	
	var WinterCourseList = 
	[ 
	
	];
	
	var CourseListCoreEngineering = 
	[
		/* 
		Course: 
		{
			Name:"",
			Description:"",
			NumberOfCredits:"",
			LectureArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LectureID:""
				}
			],
			TutorialArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					TutorialID:""
				}
			],
			LaboratoryArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LaboratoryID:""
				}
			]
		}
		*/		
	];


	//1 instance of this object.
	var CourseListFieldEngineering = 
	[
		/* 
		Course: 
		{
			Name:"",
			Description:"",
			NumberOfCredits:"",
			LectureArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LectureID:""
				}
			],
			TutorialArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					TutorialID:""
				}
			],
			LaboratoryArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LaboratoryID:""
				}
			]
		}
		*/	
	];
	
	//1 instance of this object.
	var CourseListOption = 
	[
		/* 
		Course: 
		{
			Name:"",
			Description:"",
			NumberOfCredits:"",
			LectureArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LectureID:""
				}
			],
			TutorialArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					TutorialID:""
				}
			],
			LaboratoryArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LaboratoryID:""
				}
			]
		}
		*/	
	];
	
	//1 instance of this object.
	var CourseListElectives = 
	[
		/* 
		Course: 
		{
			Name:"",
			Description:"",
			NumberOfCredits:"",
			LectureArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LectureID:""
				}
			],
			TutorialArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					TutorialID:""
				}
			],
			LaboratoryArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LaboratoryID:""
				}
			]
		}
		*/	
	];
	
	//1 instance of this object.
	var CourseListSelection = 
	[
		/* 
		Course: 
		{
			Name:"",
			Description:"",
			NumberOfCredits:"",
			LectureArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LectureID:""
				}
			],
			TutorialArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					TutorialID:""
				}
			],
			LaboratoryArray:
			[
				{
					Days:"",
					StartingTime:"",
					EndTime:"",
					Professor:"",
					Classrom:"",
					LaboratoryID:""
				}
			]
		}
		*/	
	];
	
	//  matrix that contains array of course combiantion	
	var  CompleteCourseSectionTable = 
	[
	
	];
	
	// ValidSchedue	
	var CourseScheduleList = 
	[
	
	];
	
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
	
	function GetStudentInformation()
	{
		return StudentInformation;
	}
	
	function SetStudentInformation(NewStudentInformation)
	{
		StudentInformation=NewStudentInformation;
	}
	

	
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
	
	
	
	function GetStudentCourseList()
	{
		return StudentCourseList;
	}
	function SetStudentCourseList(NewStudentCourseList)
	{
		StudentCourseList=NewStudentCourseList;
	}
	
	
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
	
	//Course List
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
	
	//Course List
	function SetFallCourseList(Courses)
	{
		FallCourseList = Courses;
	}
	function GetFallCourseList()
	{
		return FallCourseList;
	}
	//Course List
	function SetWinterCourseList(Courses)
	{
		WinterCourseList = Courses;
	}
	function GetWinterCourseList()
	{
		return WinterCourseList;
	}
	
	//Course List FieldEngineeing
	function SetCourseListFieldEngineering(Courses)
	{
		CourseListFieldEngineering = Courses;
	}
	function GetCourseListFieldEngineering()
	{
		return CourseListFieldEngineering;
	}
	
	//Course List Core Engineeing
	function SetCourseListCoreEngineering(Courses)
	{
		CourseListCoreEngineering = Courses;
	}
	function GetCourseListCoreEngineering()
	{
		return CourseListCoreEngineering;
	}
	
	//Course List Electives
	function SetCourseListElectives(Courses)
	{
		CourseListElectives = Courses;
	}
	function GetCourseListElectives()
	{
		return CourseListElectives;
	}
	
	//Course List Option
	function SetCourseListOption(Courses)
	{
		CourseListOption = Courses;
	}
	function GetCourseListOption()
	{
		return CourseListOption;
	}
	
	//State.Faculty
	function SetFaculty(Faculty)
	{
		State.Faculty = Faculty;
	}
	function GetFaculty()
	{
		return State.Faculty;
	}
	
	//State.Department
	function SetDepartment(Department)
	{
		State.Department = Department;
	}
	function GetDepartment()
	{
		return State.Department;
	}
	
	//State.Program
	function SetProgram(Program)
	{
		State.Program = Program;
	}
	function GetProgram()
	{
		return State.Program;
	}
	
	//State.Semester 
	function SetSemester(Semester)
	{
		State.Semester = Semester;
	}
	function GetSemester()
	{
		return State.Semester;
	}
	
	//State.ScheduleNumber 
	function SetScheduleNumber(ScheduleNumber)
	{
		State.ScheduleNumber=ScheduleNumber;
	}
	
	function GetScheduleNumber()
	{
		return State.ScheduleNumber;
	}
	
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
	
	 
	function SetLeftSliderMinute(LeftSliderMinute)
	{
		State.LeftSliderMinute = LeftSliderMinute;
	}
	function GetLeftSliderMinute()
	{
		return State.LeftSliderMinute;
	}

	 
	function SetLeftSliderHour(LeftSliderHour)
	{
		State.LeftSliderHour = LeftSliderHour;
	}
	function GetLeftSliderHour()
	{
		return State.LeftSliderHour;
	}
	
	function SetRigthSliderMinute(RigthSliderMinute)
	{
		State.RigthSliderMinute = RigthSliderMinute;
	}
	function GetRigthSliderMinute()
	{
		return State.RigthSliderMinute;
	}	
	
	function SetRigthSliderHour(RigthSliderHour)
	{
		State.RigthSliderHour = RigthSliderHour;
	}
	function GetRigthSliderHour()
	{
		return State.RigthSliderHour;
	}	
		