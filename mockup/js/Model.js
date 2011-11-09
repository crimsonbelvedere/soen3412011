
	//State object for the Ajax request.
	
	var State = {};
	
	var CourseFieldEngineering = {};
	var CourseCoreEngineering = {};
	var CourseOption = {};
	var CourseElectives = {};
	var CourseSelection = new Array();
	var CourseGeneratedSchedule = new Array();
	
	
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
	
		