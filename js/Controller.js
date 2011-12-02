/*
 * Function to retreives courses from the database,
 * the must have already selected a a valid faculty , program, department, semester
 */
function RetreiveCourses()
{
	if(GetFaculty() === undefined ||  GetFaculty() == "None" ||  GetProgram() === undefined || GetProgram() == "None" ||  GetDepartment() === undefined || GetDepartment() == "None"  || GetSemester() === undefined)
	{	
		//	alert("Invalid selection");
	}
	else
	{
		AjaxRetreiveCourses(GetFaculty(), GetDepartment(), GetProgram(), GetSemester());
		
		var AllCourses = GetAllCourseList();
		
		var FieldEngineeringCourses =  new Array();
		var CoreEngineeringCourses =  new Array();
		var OptionCourses =  new Array();
		var ElectivesCourses =  new Array();
		
		for (var i=0; i < AllCourses.length; i++) 
		{
			if(AllCourses[i].class_type == "Core Course" )
			{
				if(AllCourses[i].class_sort == "Engineering Core")
				{
					CoreEngineeringCourses.push(AllCourses[i]);
				}
				else if(AllCourses[i].class_sort == "Software Engineering Core")
				{
					FieldEngineeringCourses.push(AllCourses[i]);
				}
				else if(AllCourses[i].class_sort == "Computer Science Group")
				{
					//maybe we should create a section for it.
					FieldEngineeringCourses.push(AllCourses[i]);
				}				
				else if(AllCourses[i].class_sort == "Basic Science Courses")
				{
					//maybe we should create a section for it.
					ElectivesCourses.push(AllCourses[i]);
				}
			}
			else if (AllCourses[i].class_type == "Option" )
			{
				OptionCourses.push(AllCourses[i]);
			}
			else if (AllCourses[i].class_type == "Elective" )
			{
				ElectivesCourses.push(AllCourses[i]);
			}
				
		}
		
		SetCourseListFieldEngineering(FieldEngineeringCourses);
		NotifyView("ULIDFieldEngineering");	
			
		SetCourseListCoreEngineering(CoreEngineeringCourses);
		NotifyView("ULIDCoreEngineering");	
		
		SetCourseListOption(OptionCourses);
		NotifyView("ULIDOption");	
		
		SetCourseListElectives(ElectivesCourses);
		NotifyView("ULIDElective");	
		
	}	
}

/*
 * Function to verify if the student has all the prerequisite for the given course
 * course to take
 * prerequisite of all course
 */
function HasPrerequisite(Course,PrerequisiteArray)
{
						 
	//check if the student has prerequisite before adding it otherwise put the course a cannot take
	for (var i=0; i < PrerequisiteArray.length; i++) 
	{
		//course has a prerequisite
		if(PrerequisiteArray[i].length > 0 && CoursePrerequisite[i][0].parent.Number == Course.Number)
		{
			
			for (var j=0; j < PrerequisiteArray[i].length; l++) 
			{
				
				//Check course list
				for (var k=0; k < PrerequisiteArray[j].course_list.lenght; k++) 
				{
				
					
					
				}
				
			}
			
		}
	}
	
}

/*
 * Detect if a course is in the array
 * course to take
 * array to check
 * return bool
 */
function IsCourseInArray(Course,CourseArray)
{
	
	for (var i=0; i < CourseArray.length; i++) 
	{
		if (Course.Number == CourseArray[i].Number) 
		{
			break;
		}
	}
	
	if( i ==  CourseArray.length)
	{
		return false;
	}
	else
	{
		return true;		
	}
}

/*
 * Ajax call to get the login information from the database
 * the database will return the student object
 */
function AjaxLogin(StudentId, Password)
{
	var ajax_load = "<img src='img/ajax-loader.gif'/>";  
	
	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/php/AjaxRequest.php",
	async: false,
	data: { FunctionCall:"login",StudentId:StudentId,Password:Password},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
		
	},
	
	success:function(StudentInformation){
	//do your stuff with the JSON data
		//alert("JSON request succeeded");
		if(StudentInformation != null)
		{
			if(StudentInformation.first_name !=  "" && StudentInformation.last_name !=  "")
			{
						
				SetStudentIsLoggedIn(true);
						
				//set student info including id
				SetStudentInformation(StudentInformation);				
				NotifyView("DivIDLogin");
				NotifyView("DfnIDStudentName");
				NotifyView("DfnIDStudentProgram");
				
				
				//set course taken
				SetStudentCourseList(StudentInformation.taken_courses);
				
				//set course left in program
				AjaxGetStudentCoursesToTake(StudentInformation.studentid)
					
				//prereq for course left
				AjaxGetPrerequisite(StudentInformation.studentid);		
										
				//filter courses and show courses that had been taken, not taken, 
				var AllCoursesFromThisSemester = GetAllCourseList();
				var StudentCourseTaken = GetStudentCourseList();
				var StudentCourseLeftToTakeInProgram = GetStudentCourseLeftToTakeInProgram();				
				var StudentCoursePrerequisite = GetStudentPrerequisite();
				
				//get the course you are left to take in this semester.
				for (var i=0; i < AllCoursesFromThisSemester.length; i++) 
				{
					
					if(IsCourseInArray(AllCoursesFromThisSemester[i],StudentCourseLeftToTakeInProgram) == true)
					{							
						AddToStudentCourseLeftToTakeInThisSemester(AllCoursesFromThisSemester[i]);											
					}
					else
					{
						//not in program curriculum
						AddToStudentCourseCannotTake(AllCoursesFromThisSemester[i]);
					}
									
				 
				}								
					
				var StudentCourseCanTakeInThisSemester 		= GetStudentCourseLeftToTakeInThisSemester();	
				var StudentCourseCannotTakeInThisSemester 	= GetStudentCourseCannotTake();
					
					
				if(AllCoursesFromThisSemester.length > 0)
				{
					NotifyView("ULIDFieldEngineering");				
					NotifyView("ULIDCoreEngineering");										
					NotifyView("ULIDOption");										
					NotifyView("ULIDElective");	
					
				}
											
			}
		}
		else
		{
			alert("Bad Username or Password, please try again!");
			$("#InputIDUserName").val("");
			$("#InputIDPassword").val("");
		}
	},
	
	error:function(){
		// failed request; give feedback to user
		//$('body').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		alert("Failed to execute Ajax request");
	},
	
	dataType: "json"
			
	});     
	
}

/*
 * Ajax call to get the course that student must take
 * student Id
 * return the array of course that the student must take
 * 
 */
function AjaxGetStudentCoursesToTake(StudentId)
{
	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/php/AjaxRequest.php",
	async: false,
	data: { FunctionCall:"get_courses_to_take",StudentId:StudentId},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
		
	},
	
	success:function(CourseArray){
	//do your stuff with the JSON data
		//alert("JSON request succeeded get student courses");
	
		SetStudentCourseLeftToTakeInProgram(CourseArray);
	},
	
	error:function(){
		// failed request; give feedback to user
		//$('body').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		alert("Failed to execute Ajax request");
	},
	
	dataType: "json"
			
	});     
 
}

/*
 * Ajax call to retreive courses from the selected faculty, department, program, semester
 * return the list of courses
 */
function AjaxRetreiveCourses(Faculty, Department, Program, Semester)
{
		
  	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/php/AjaxRequest.php",
	async: false,
	data: { FunctionCall:"get_courses" ,Faculty: Faculty, Department: Department , Program: Program, Semester: Semester},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
		
	},
	
	success:function(CourseArray){
	//do your stuff with the JSON data
	//alert("JSON request succeeded");
	
		if(Semester == 2)
		{
			SetFallCourseList(CourseArray);
			SetAllCourseList(GetFallCourseList());
		}
		else if(Semester == 4)
		{
			SetWinterCourseList(CourseArray);
			SetAllCourseList(GetWinterCourseList());
		}
		
	},
	
	error:function(){
		// failed request; give feedback to user
		//$('body').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		alert("Failed to execute Ajax request");
	},
	
	dataType: "json"
			
	});     
 
		
}		

/*
 * Ajax call to return the prerequisite arrau for the student
 * student id
 * 
 */
function AjaxGetPrerequisite(StudentId)
{
	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/php/AjaxRequest.php",
	async: false,
	data: { FunctionCall:"get_prerequisites",StudentId:StudentId},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
		
	},
	
	success:function(CourseArray){
	//do your stuff with the JSON data
		//alert("JSON request succeeded get student prerequisites");
	
		SetStudentPrerequisite(CourseArray);
	},
	
	error:function(){
		// failed request; give feedback to user
		//$('body').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		alert("Failed to execute Ajax request");
	},
	
	dataType: "json"
			
	});     
 
}
		
		
//MVC PATTERN
//1) Handle the event by the controller
//2) Service the event, access the model(WRITE)
//3) Notify the view that the model has changed
//4) The update itself using the model (READ)
//Handle events
/*
 * Event handler function, handle all the action trigerred by the user on the view.
 */
$(document).ready(function()
{
	
	//Ready Function document is loaded()
	//alert("Document is loaded"); 

	
	//var gc = $.calendars.instance(); 
	//var CurrentDate = gc.newDate(2010, 12, 1);
	//jd2455531.5
	//var CurrentDate = gc.newDate(2011, 12, 1);
	//jd2455896.5
	//var CurrentDate = gc.newDate(2011, 11, 30);
	//jd2455895.5
	//var jd = CurrentDate.toJD();
	var Calendar 	=	$.calendars.instance(); 
	var CurrentDate =	Calendar.today();
	var JulianDate 	= 	CurrentDate.toJD();
	var DayOfWeek	=	Calendar.dayOfWeek(CurrentDate); 
	var JulianDateModay = JulianDate - ( DayOfWeek - 1 );
	var MondayDate = Calendar.fromJD(JulianDateModay);
	//Select Events
	$("#SelectIDFaculty").change(function() 
	{ 
		SetFaculty($(this).val());
		NotifyView(this.id);
		
		/*alert("Faculty :"+GetFaculty());
		alert("Program :"+GetProgram()); 
		alert("Department :"+GetDepartment());
		alert("Semester :"+GetSemester());
		*/
		RetreiveCourses();
	});
	
	$("#SelectIDDepartment").change(function() 
	{ 
		SetDepartment($(this).val());
		NotifyView(this.id);
		
		/*alert("Faculty :"+GetFaculty());
		alert("Program :"+GetProgram()); 
		alert("Department :"+GetDepartment());*/ 
		RetreiveCourses();
					
	});
	
	$("#SelectIDProgram").change(function() 
	{ 
		
		SetProgram($(this).val());
		NotifyView(this.id);

		/*alert("Faculty :"+GetFaculty());
		alert("Program :"+GetProgram()); 
		alert("Department :"+GetDepartment());*/ 
		 
		RetreiveCourses();
	});


	//Button clicked Events
	$("#ButtonIDFall").click(function() 
	{ 
		if(GetSemester() != $(this).val())
		{
			SetSemester($(this).val());
			
			ClearCourseListSelection();
			
			//Update Selection View
			NotifyView("ULIDSelection");	
			
			ClearCompleteCourseSectionTable();
						
			//Solve and filter matrix
			SolveCompleteCourseSectionTable();
		
			SetScheduleNumber(0);
	
			//change calendar data
			NotifyView("calendar");	
			
			RetreiveCourses();
			
			NotifyView(this.id);
		}
	});

	$("#ButtonIDWinter").click(function() 
	{ 
		if(GetSemester() != $(this).val())
		{	
			SetSemester($(this).val());
			//alert(GetSemester());
			ClearCourseListSelection();
			
			//Update Selection View
			NotifyView("ULIDSelection");	
			
			ClearCompleteCourseSectionTable();
			
			//Solve and filter matrix
			SolveCompleteCourseSectionTable();
		
			SetScheduleNumber(0);
	
			//change calendar data
			NotifyView("calendar");	
			
			RetreiveCourses();	
			
			NotifyView(this.id);
		
		}
	});
	
	/*$("#ButtonIDSummer").click(function() 
	{ 
		SetSemester($(this).val());
		//alert(GetSemester()); 
		
		NotifyView(this.id);
		
		TryToGetCourses();
	});*/

	//Hover event, includes all buttons.
	$(".fg-button").hover(
		function()
		{
			$(this).addClass("ui-state-hover");
		},
		function()
		{
			$(this).removeClass("ui-state-hover");
		}
	);

	/* see if anything is previously checked and reflect that in the view*/
	//$(".checklist input:checked").parent().addClass("selected");

	/* handle the user selections for the checklist*/
	
	$("a.checkbox-select").live({
		click: function() 
		{
			//Check if it is an element in the selection fieldset
			//alert($(this).parent().parent().attr('id'));	
			//alert($(this).parent().children('input').attr('id'));		
			
			//li selected css
			//Encapsulate this code in the view and ad a property to the model
			$(this).parent().attr("value","selected");			
			$(this).parent().removeClass("deselected");
			$(this).parent().addClass("selected");
			
			$(this).removeClass("checkbox-select");
			$(this).addClass("checkbox-deselect");
			$("a.checkbox-deselect").css( "visibility","visible");
			
						
			if(	$(this).parent().parent().attr('id') == "ULIDCoreEngineering")
			{	
				//alert("Add course to selection");	
				
				//add the course in the selection tab
				//retreive course list in the according tab
				//search for the course object				
				var CourseListCoreEngineering = GetCourseListCoreEngineering();
				
				for (var i=0; i < CourseListCoreEngineering.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListCoreEngineering[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Add course to selection");
						AddCourseToCourseListSelection(CourseListCoreEngineering[i]);							
						
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Update the calendaSection/Create all possible section with a a course
						var SingleCourseSectionList = GenerateCourseSectionList(CourseListCoreEngineering[i]);
					
						//Add course section list to the storage table.	
						AddToCompleteCourseSectionTable(SingleCourseSectionList);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
							
						break;	
					}
					
				}
												
			}
			
			else if($(this).parent().parent().attr('id') == "ULIDFieldEngineering")
			{	
				//alert("Add course to selection");	
				
				//add the course in the selection tab
				//retreive course list in the according tab
				//search for the course object				
				var CourseListFieldEngineering = GetCourseListFieldEngineering();
				
				for (var i=0; i < CourseListFieldEngineering.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListFieldEngineering[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Add course to selection");
						AddCourseToCourseListSelection(CourseListFieldEngineering[i]);							
						
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Update the calendaSection/Create all possible section with a a course
						var SingleCourseSectionList = GenerateCourseSectionList(CourseListFieldEngineering[i]);
					
						//Add course section list to the storage table.	
						AddToCompleteCourseSectionTable(SingleCourseSectionList);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
							
						break;	
					}
					
				}
												
			}
			else if($(this).parent().parent().attr('id') == "ULIDOption")
			{	
				//alert("Add course to selection");	
				
				//add the course in the selection tab
				//retreive course list in the according tab
				//search for the course object				
				var CourseListOption = GetCourseListOption();
				
				for (var i=0; i < CourseListOption.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListOption[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Add course to selection");
						AddCourseToCourseListSelection(CourseListOption[i]);							
						
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Update the calendaSection/Create all possible section with a a course
						var SingleCourseSectionList = GenerateCourseSectionList(CourseListOption[i]);
					
						//Add course section list to the storage table.	
						AddToCompleteCourseSectionTable(SingleCourseSectionList);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
							
						break;	
					}
					
				}
												
			}
			else if($(this).parent().parent().attr('id') == "ULIDElective")
			{	
				//alert("Add course to selection");	
				
				//add the course in the selection tab
				//retreive course list in the according tab
				//search for the course object				
				var CourseListElectives = GetCourseListElectives();
				
				for (var i=0; i < CourseListElectives.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListElectives[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Add course to selection");
						AddCourseToCourseListSelection(CourseListElectives[i]);							
						
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Update the calendaSection/Create all possible section with a a course
						var SingleCourseSectionList = GenerateCourseSectionList(CourseListElectives[i]);
					
						//Add course section list to the storage table.	
						AddToCompleteCourseSectionTable(SingleCourseSectionList);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
							
						break;	
					}
					
				}
												
			}
			
			
		}
	});

	$("a.checkbox-deselect").live({
		click: function() 
		{

			//alert("Button Unselected");
			
			//Check if it is an element in the selection fieldset
			//alert($(this).parent().parent().attr('id'));	
			//alert($(this).parent().children('input').attr('id'));	
			
			$(this).parent().removeClass("selected");
			$(this).parent().addClass("deselected");
			
			
			$(this).removeClass("checkbox-deselect");
			$(this).addClass("checkbox-select");
			$("a.checkbox-select").css( "visibility","visible");
			
			
			if(	$(this).parent().parent().attr('id') == "ULIDCoreEngineering")
			{
				
				var CourseListCoreEngineering = GetCourseListCoreEngineering();
				
				for (var i=0; i < CourseListCoreEngineering.length ; i++) 
				{
					//alert(CourseListCoreEngineering[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListCoreEngineering[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromCourseListSelection(CourseListCoreEngineering[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Remove generated section from this course.
						RemoveFromCompleteCourseSectionTable(CourseListCoreEngineering[i]);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
						
						break;	
					}
					
				}
			}	
			else if($(this).parent().parent().attr('id') == "ULIDFieldEngineering")
			{
				
				var CourseListFieldEngineering = GetCourseListFieldEngineering();
				
				for (var i=0; i < CourseListFieldEngineering.length ; i++) 
				{
					//alert(CourseListCoreEngineering[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListFieldEngineering[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromCourseListSelection(CourseListFieldEngineering[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Remove generated section from this course.
						RemoveFromCompleteCourseSectionTable(CourseListFieldEngineering[i]);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
						
						break;	
					}
					
				}
			}				
			else if($(this).parent().parent().attr('id') == "ULIDOption")
			{
				
				var CourseListOption = GetCourseListOption();
				
				for (var i=0; i < CourseListOption.length ; i++) 
				{
					//alert(CourseListCoreEngineering[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListOption[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromCourseListSelection(CourseListOption[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Remove generated section from this course.
						RemoveFromCompleteCourseSectionTable(CourseListOption[i]);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
						
						break;	
					}
					
				}
			}
			else if($(this).parent().parent().attr('id') == "ULIDElective")
			{	
				//alert("Add course to selection");	
				
				//add the course in the selection tab
				//retreive course list in the according tab
				//search for the course object				
				var CourseListElectives = GetCourseListElectives();
				
				for (var i=0; i < CourseListElectives.length ; i++) 
				{
					
					//alert(CourseListCoreEngineering[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListElectives[i].Number == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromCourseListSelection(CourseListElectives[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Remove generated section from this course.
						RemoveFromCompleteCourseSectionTable(CourseListElectives[i]);
						
						//Solve and filter matrix
						SolveCompleteCourseSectionTable();
						
						SetScheduleNumber(0);
						
						//change calendar data
						NotifyView("calendar");	
						
						break;	
					}
					
				}
												
			}	
		}
	});
	
	
	$("#ButtonIDBack").click(function() 
	{ 
		PreviousSchedule();
		
		//change calendar data
		NotifyView("calendar");	
		//NotifyView("contraints");	

	});
	
	
	$("#ButtonIDForward").click(function() 
	{ 
		NextSchedule();
	
		//change calendar data	
		NotifyView("calendar");	
		//NotifyView("constraints");	

	});
	
	
	
	$("#ButtonIDAdd").click(function() 
	{ 
		//alert($("#SelectIDSelectDay").val());
		//alert(SlidergetTime(GetLeftSliderHour(), GetLeftSliderMinute())+":"+"00");
		//alert(SlidergetTime(GetRigthSliderHour(), GetRigthSliderMinute())+":"+"00");
		
		//Create a filter object and add it to the complete schedule
		var ConstraintsItem = { };
		ConstraintsItem.Name = "CONSTRAINTS";
		ConstraintsItem.Days = $("#SelectIDSelectDay").val(); 
		ConstraintsItem.StartingTime = SlidergetTime(GetLeftSliderHour(), GetLeftSliderMinute())+":"+"00";
		ConstraintsItem.EndingTime = SlidergetTime(GetRigthSliderHour(), GetRigthSliderMinute())+":"+"00";
		
		var CurrentConstraints = GetConstraintsList();
		
		for (var i=0; i < CurrentConstraints.length; i++) 
		{
			if(IsTimeConflict(CurrentConstraints[i].Days,CurrentConstraints[i].StartingTime,CurrentConstraints[i].EndingTime,ConstraintsItem.Days,ConstraintsItem.StartingTime,ConstraintsItem.EndingTime))
			{
				break;	
			}	
				  
		}
		
		if(i == CurrentConstraints.length)
		{
			
			AddToConstraintsList(ConstraintsItem);
			
			//Solve and filter matrix
			SolveCompleteCourseSectionTable();
			
			SetScheduleNumber(0);
			
			//change calendar data
			NotifyView("constraints");
		}	
	});
	
	
	$("#ButtonIDClearAll").click(function() 
	{ 
		ClearConstraintsList();
		
		//Solve and filter matrix
		SolveCompleteCourseSectionTable();
		
		SetScheduleNumber(0);
		
		//change calendar data
		NotifyView("constraints");
	});
	

	//Logged in user
	$('.Body').bind('keypress', function(e) 
	{
		//enter key pressed.
        if(e.keyCode==13)
        {      
             //alert("Enter key");
             //alert($("#InputIDUserName").val());
             //alert($("#InputIDPassword").val());
             AjaxLogin($("#InputIDUserName").val(),$("#InputIDPassword").val());	             
	
        }
	});
	
	$("#ButtonIDLogOut").click(function() 
	{ 
		SetStudentIsLoggedIn(false);
				
		NotifyView("DivIDLogout");
		NotifyView("ULIDFieldEngineering");				
		NotifyView("ULIDCoreEngineering");										
		NotifyView("ULIDOption");										
		NotifyView("ULIDElective");
		
		//change calendar data
		ClearCourseListSelection();
		
		//Update Selection View
		NotifyView("ULIDSelection");	
		
		ClearCompleteCourseSectionTable();
		
		//Solve and filter matrix
		SolveCompleteCourseSectionTable();
	
		SetScheduleNumber(0);

		//change calendar data
		NotifyView("calendar");		
	});
	
	
});
		
