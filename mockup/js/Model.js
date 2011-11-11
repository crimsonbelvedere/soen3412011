
	/* State Data structure Description
	"State" : {
		
		"Faculty":"",
		"Department":"",		
		"Program":"",				
		"Semester":"",
	}
	*/	
	var State = {};
	
	/*Course Data structure Description
	"Course" : {
	
	"Name":""
	"Description":""
	"PrequisiteArray": {
		
	},
	"SectionArray": {
		
		"LectureArray":{
			
			"Days":"",
			"StartingTime":"",
			"EndTime":"",
			"Professor":"",
			"Classrom":"",
			"LectureID:"",
		
		},
		"TutorialArray":{
			
			"Days":"",
			"StartingTime":"",
			"EndTime":"",
			"Professor":"",
			"Classrom":"",
			"TutorialID:"",
		
		}, 
		"LaboratoryArray":{
			
			"Days":"",
			"StartingTime":"",
			"EndTime":"",
			"Professor":"",
			"Classrom":"",
			"LaboratoryID:"",
			
		}, 
		"SectionNumber":""
	
	},
	"NumberOfCredits":"1.5, 3, 4",
	"TermArray":"Fall,Winter",
	}
	 */
	var CourseFieldEngineering = {};
	var CourseCoreEngineering = {};
	var CourseOption = {};
	var CourseElectives = {};
	var CourseSelection = new Array();
	
	//1 schedule contains an array of section courses
	//var Permutations = new Array();
	//var Schedule = new Array();
	//Course actually shown in the schedule.
	
	/*function InsertPermutationToSchedule(Permutation,ScheduleID)
	{
		Schedule[ScheduleID].Permutations.push(Permutation);
	}*/
	
	/*function GetSectionsFromSchedule(ScheduleID)
	{
		return Schedules[ScheduleID].Sections;
	}*/
	
	function GetCourseSelection()
	{
		return CourseSelection;
	}
	
	function AddCourseToSelection(Course)
	{
		//Create course Structure object
		CourseSelection.push(Course);
	}
	
	function RemoveCourseFromSelection(Course)
	{
		for (var i=0; i < CourseSelection.length; i++) 
		{			
			if(CourseSelection[i].Name == Course.Name)
			{
				//alert("Course found, remove it from the list");
				CourseSelection.splice(i,1);			
				break;	
			}
			
		};
	}
	
	
	function SetCourseFieldEngineering(Courses)
	{
		CourseFieldEngineering = Courses;
	}
	function GetCourseFieldEngineering()
	{
		return CourseFieldEngineering;
	}
	
	
	function SetCourseCoreEngineering(Courses)
	{
		CourseCoreEngineering = Courses;
	}
	function GetCourseCoreEngineering()
	{
		return CourseCoreEngineering;
	}
	
	
	function SetCourseElectives(Courses)
	{
		CourseElectives = Courses;
	}
	function GetCourseElectives()
	{
		return CourseElectives;
	}
	
	
	function SetCourseOption(Courses)
	{
		CourseOption = Courses;
	}
	function GetCourseOption()
	{
		return CourseOption;
	}
	
	
	function SetFaculty(Faculty)
	{
		State.Faculty = Faculty;
	}
	function GetFaculty()
	{
		return State.Faculty;
	}
	
		
	function SetDepartment(Department)
	{
		State.Department = Department;
	}
	function GetDepartment()
	{
		return State.Department;
	}
	
		
	function SetProgram(Program)
	{
		State.Program = Program;
	}
	function GetProgram()
	{
		return State.Program;
	}
	
	
	function SetSemester(Semester)
	{
		State.Semester = Semester;
	}
	function GetSemester()
	{
		return State.Semester;
	}
	
		