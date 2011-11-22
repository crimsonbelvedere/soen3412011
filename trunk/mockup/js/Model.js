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
		
	// ValidSchedue	
	var CourseScheduleList = 
	[
	
	];
		
	//  matrix that contains array of course combiantion	
	var  CompleteCourseSectionTable = 
	[
	
	];

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
				if(CompleteCourseSectionTable[i][j].Name == Course.Name)
				{
					//alert("Course found, remove it from the list");
					CompleteCourseSectionTable.splice(i,1);			
					break;	
				}
			}
			
		};
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
			if(CourseListSelection[i].Name == Course.Name)
			{
				//alert("Course found, remove it from the list");
				CourseListSelection.splice(i,1);			
				break;	
			}
			
		}
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
	
		