function IsTimeConflict(D1,S1,E1,D2,S2,E2)
{
	//Convert string in usable format
	//Find out if it is the Same Day
	if(CompareDay(D1,D2) == true)
	{
		if( ( CompareTime(S1,E1) == -1 && CompareTime(S2,E2) == -1 ) && ( ( CompareTime(S2,S1) == -1 && CompareTime(E2,S1) == -1 )  || ( CompareTime(S2,E1) == 1 && CompareTime(E2,E1) == 1 ) ) )	
		{
			//alert("There is no time confict bewteen:"+D1+" "+S1+" "+E1+" "+D2+" "+S2+" "+E2);
			return false;
		}
		else
		{
			//alert("There is a time confict bewteen:"+D1+" "+S1+" "+E1+" "+D2+" "+S2+" "+E2);
			return true;
		}
	}
	else
	{
		//alert("There is no time confict bewteen Days "+D1+" "+D2);
		return false;	
	}
}

function IsConstraintsTimeConflict(Section1)
{
	//retreive the time conflict array
	var TimeConflictList= GetConstraintsList();
	
	if(Section1.Lecture === undefined)
	{
		return true;
	}
	else
	{
		for (var i=0; i < TimeConflictList.length; i++) 
		{
		
			if(IsTimeConflict(Section1.Lecture.Days,Section1.Lecture.StartingTime,Section1.Lecture.EndTime,TimeConflictList[i].Days,TimeConflictList[i].StartingTime,TimeConflictList[i].EndingTime))
			{
				return true;
			}  
		}

	}
	
	if(Section1.Tutorial !== undefined)
	{
		for (var i=0; i < TimeConflictList.length; i++) 
		{
		
			if(IsTimeConflict(Section1.Tutorial.Days,Section1.Tutorial.StartingTime,Section1.Tutorial.EndTime,TimeConflictList[i].Days,TimeConflictList[i].StartingTime,TimeConflictList[i].EndingTime))
			{
				return true;
			}  
		}
	}
	
	
	if(Section1.Laboratory !== undefined)
	{
	
		for (var i=0; i < TimeConflictList.length; i++) 
		{
		
			if(IsTimeConflict(Section1.Laboratory.Days,Section1.Laboratory.StartingTime,Section1.Laboratory.EndTime,TimeConflictList[i].Days,TimeConflictList[i].StartingTime,TimeConflictList[i].EndingTime))
			{
				return true;
			}  
		}
	}
	return false;
}

function IsSectionTimeConfict(Section1,Section2)
{
	//a Section can contain a lecture and optionnaly a lab and a tutorial
	
	if(Section1.Lecture === undefined || Section2.Lecture === undefined)
	{
		return true;
	}	
	else
	{
		//Compare lectures to something else
 		if(IsTimeConflict(Section1.Lecture.Days,Section1.Lecture.StartingTime,Section1.Lecture.EndTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndTime))	
		{
			return true;
		}

		if(Section2.Tutorial !== undefined)
		{
			//Compare Lecture , turorial 		
			if(IsTimeConflict(Section1.Lecture.Days, Section1.Lecture.StartingTime,Section1.Lecture.EndTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndTime))	
			{
				return true;
			}
		}

		if(Section2.Laboratory !== undefined)
		{
			//Compare Lecture , Laboratory		
			if(IsTimeConflict(Section1.Lecture.Days, Section1.Lecture.StartingTime,Section1.Lecture.EndTime,Section2.Laboratory.Days, Section2.Laboratory.StartingTime,Section2.Laboratory.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Tutorial !== undefined)
		{
			//Compare Tutorial , Lecture
			if(IsTimeConflict(Section1.Tutorial.Days, Section1.Tutorial.StartingTime,Section1.Tutorial.EndTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Tutorial !== undefined && Section2.Tutorial !== undefined)
		{
			//Compare tutorial , tutorial
			if(IsTimeConflict(Section1.Tutorial.Days, Section1.Tutorial.StartingTime,Section1.Tutorial.EndTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Tutorial !== undefined && Section2.Laboratory !== undefined)
		{
			//Compare tutorial , tutorial
			if(IsTimeConflict(Section1.Tutorial.Days, Section1.Tutorial.StartingTime,Section1.Tutorial.EndTime,Section2.Tutorial.Days,Section2.Laboratory.StartingTime,Section2.Laboratory.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined)
		{
			//Compare Lab, Lecture
			if(IsTimeConflict(Section1.Laboratory.Days ,Section1.Laboratory.StartingTime,Section1.Laboratory.EndTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined && Section2.Tutorial !== undefined)
		{
			//Compare Lab, Tutorial
			if(IsTimeConflict(Section1.Laboratory.Days, Section1.Laboratory.StartingTime,Section1.Laboratory.EndTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined && Section2.Laboratory !== undefined)
		{
			//Compare Lab, Lab
			if(IsTimeConflict(Section1.Laboratory.Days, Section1.Laboratory.StartingTime,Section1.Laboratory.EndTime,Section2.Laboratory.Days,Section2.Laboratory.StartingTime,Section2.Laboratory.EndTime))	
			{
				return true;
			}
		}		
	}
	
	//No conflict in time periods
	return false;
}

function FilterCompleteCourseSectionTable(TemporaryScheduleSequence)
{
	//Remove colliding section courses
	//backup the temporary schedule
	var IndexToRemove= new Array();
	for (var p=0; p < TemporaryScheduleSequence.length; p++) 
	{
	  
	  	if(TemporaryScheduleSequence[p].length > 1)
	  	{
		  	for (var j=0; j < TemporaryScheduleSequence[p].length - 1; j++) 
		  	{
			
				for (var k=j+1; k < TemporaryScheduleSequence[p].length; k++) 
				{
					//Compare course [j] and [k]
					//if there is a time conflict remove the schedule from selection.
					if(IsSectionTimeConfict(TemporaryScheduleSequence[p][j],TemporaryScheduleSequence[p][k]) == true || IsConstraintsTimeConflict(TemporaryScheduleSequence[p][j]) == true || IsConstraintsTimeConflict(TemporaryScheduleSequence[p][k]) == true )
					{
						//alert("Remove schedule from temporary list.");
						IndexToRemove.push(p);		
											
						//break the two loops this schedule is void.
						k=TemporaryScheduleSequence[p].length;
						j=TemporaryScheduleSequence[p].length - 1;					
					}
					
					
				}
		 
		 	}
	 	}
	 	else
	 	{
 			//Compare course [j] and [k]
			//if there is a time conflict remove the schedule from selection.
			if(IsConstraintsTimeConflict(TemporaryScheduleSequence[p][0]) == true )
			{
				//alert("Remove schedule from temporary list.");
				IndexToRemove.push(p);												
			}
			

	 	}
	  
	}
	// tag incompleted schedule.
	for (var p=0; p < TemporaryScheduleSequence.length; p++) 
	{
		if(TemporaryScheduleSequence[p].length != CompleteCourseSectionTable.length)
		{
			IndexToRemove.push(p);	
		}
	}

	for (var p=0; p < IndexToRemove.length; p++) 
	{
		delete TemporaryScheduleSequence[IndexToRemove[p]];
	}
	
	var MaximumScheduleSize = TemporaryScheduleSequence.length;
	for (var p=0; p < MaximumScheduleSize; p++) 
	{
		if(TemporaryScheduleSequence[p] === undefined)
		{
			TemporaryScheduleSequence.splice(p,1);
		}
	}
	
	//clean up the array
	TemporaryScheduleSequence = TemporaryScheduleSequence.filter(function(){return true});	
	
	return TemporaryScheduleSequence;		
	
}


function AddSection(SingleSchedule,CourseIndex,FullSchedule)
{
	var CompleteCourseSectionTable = GetCompleteCourseSectionTable();
	
	if(CompleteCourseSectionTable.length > 0)
	{
		for (var i=0; i < CompleteCourseSectionTable[CourseIndex].length; i++) 
		{
			var CopySchedule = SingleSchedule.slice();
			
			if(CourseIndex < CompleteCourseSectionTable.length - 1)
			{
				SingleSchedule.push(CompleteCourseSectionTable[CourseIndex][i]);		
				AddSection(SingleSchedule,CourseIndex+1,FullSchedule);
			}
			else
			{
				
				SingleSchedule.push(CompleteCourseSectionTable[CourseIndex][i]);
				FullSchedule.push(SingleSchedule);
			}
			
			SingleSchedule = CopySchedule.slice();
		}
	}	
	return FullSchedule;
}


function SolveCompleteCourseSectionTable()
{
	
	var FullSchedule = new Array();
	var SingleSchedule = new Array();
	
	var CompleteCourseSectionTable = GetCompleteCourseSectionTable();

	for (var i=0; i < CompleteCourseSectionTable.length; i++) 
	{
		alert("Maximum number of section:"+CompleteCourseSectionTable[i].length);
	}	
	//Recursive function to generate all schedules.
	AddSection(SingleSchedule,0,FullSchedule); 
	
	FullSchedule = FilterCompleteCourseSectionTable(FullSchedule);
	
	SetScheduleList(FullSchedule);	
	
	
}

function GenerateCourseSectionList(Course)
{
	//alert("Generate all possible section from a course");	
	
	var CourseSectionList = new Array();
	
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		if(Course.TutorialArray.length > 0)
		{
			for (var k=0; k < Course.TutorialArray.length ; k++) 
			{
				
				if(Course.LaboratoryArray.length > 0)
				{
					for (var l=0; l < Course.LaboratoryArray.length ; l++) 
					{
						var CourseSection = {};
						CourseSection.Number				=	Course.Number;
						CourseSection.Description		=	Course.Description;
						CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
						
						CourseSection.Lecture		=	Course.LectureArray[j];
						CourseSection.Tutorial		=	Course.TutorialArray[k];
						CourseSection.Laboratory	=	Course.LaboratoryArray[l];		
										
						CourseSectionList.push(CourseSection);
					}
				}
				else
				{
					var CourseSection = {};
					CourseSection.Number				=	Course.Number;
					CourseSection.Description		=	Course.Description;
					CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
					
					CourseSection.Lecture		=	Course.LectureArray[j];
					CourseSection.Tutorial		=	Course.TutorialArray[k];
					CourseSectionList.push(CourseSection);
					
				}
			}
		}
		else
		{
			var CourseSection = {};
			CourseSection.Number				=	Course.Number;
			CourseSection.Description		=	Course.Description;
			CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
			
			CourseSection.Lecture		=	Course.LectureArray[j];	
			CourseSectionList.push(CourseSection);
		}
		
	}
	return CourseSectionList;
	
	
/*	var CourseSectionList = new Array();
	
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		if(Course.LectureArray[j].TutorialArray.length > 0)
		{
			for (var k=0; k < Course.LectureArray[j].TutorialArray.length ; k++) 
			{				
				if(Course.LectureArray[j].LaboratoryArray.length > 0)
				{
					for (var l=0; l < Course.LectureArray[j].LaboratoryArray.length ; l++) 
					{
						var CourseSection = {};
						CourseSection.Number			=	Course.Number;
						CourseSection.Description		=	Course.Description;
						CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
						
						CourseSection.Lecture		=	Course.LectureArray[j];
						CourseSection.Tutorial		=	Course.LectureArray[j].TutorialArray[k];
						CourseSection.Laboratory	=	Course.LectureArray[j].LaboratoryArray[l];		
										
						CourseSectionList.push(CourseSection);
					}
				}
				else
				{
					var CourseSection = {};
					CourseSection.Number				=	Course.Number;
					CourseSection.Description		=	Course.Description;
					CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
					
					CourseSection.Lecture		=	Course.LectureArray[j];
					CourseSection.Tutorial		=	Course.TutorialArray[k].TutorialArray[k];
					
					CourseSectionList.push(CourseSection);				
				}
			
			}
		}
		else
		{
			var CourseSection = {};
			CourseSection.Number				=	Course.Number;
			CourseSection.Description		=	Course.Description;
			CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
			
			CourseSection.Lecture		=	Course.LectureArray[j];	
			CourseSectionList.push(CourseSection);
		}
		
	}
	
	return CourseSectionList;
*/
}

function RetreiveCourses()
{
	if(GetFaculty() === undefined ||  GetFaculty() == "None" ||  GetProgram() === undefined || GetProgram() == "None" ||  GetDepartment() === undefined || GetDepartment() == "None" )
	{	
	//	alert("Invalid selection");
	}
	else
	{
		AjaxRetreiveCourses(GetFaculty(), GetDepartment(), GetProgram());
		
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

function AjaxRetreiveCourses(Faculty, Department, Program)
{
		
  	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/php/AjaxRequest.php",
	async: false,
	data: { Faculty: Faculty, Department: Department , Program: Program},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
		
	},
	
	success:function(CourseArray){
	//do your stuff with the JSON data
	//alert("JSON request succeeded");
	
		SetAllCourseList(CourseArray);

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
$(document).ready(function()
{
	
	//Ready Function document is loaded()
	alert("Document is loaded"); 

	 		


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
			//alert(GetSemester()); 
			NotifyView(this.id);
		
			//RetreiveCourses();
		}
	});

	$("#ButtonIDWinter").click(function() 
	{ 
		if(GetSemester() != $(this).val())
		{	
			SetSemester($(this).val());
			//alert(GetSemester());
		
			NotifyView(this.id);
		
			//RetreiveCourses();
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
			
			else if(	$(this).parent().parent().attr('id') == "ULIDFieldEngineering")
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
	});
	
	
	$("#ButtonIDForward").click(function() 
	{ 
		NextSchedule();
	
		//change calendar data	
		NotifyView("calendar");	
	});
	
	
	
	$("#ButtonIDAdd").click(function() 
	{ 
		alert($("#SelectIDSelectDay").val());
		alert(SlidergetTime(GetLeftSliderHour(), GetLeftSliderMinute())+":"+"00");
		alert(SlidergetTime(GetRigthSliderHour(), GetRigthSliderMinute())+":"+"00");
		
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
});
		
