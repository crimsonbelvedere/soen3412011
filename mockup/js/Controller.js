function IsTimeConflict(D1,S1,E1,D2,S2,E2)
{
	//Convert string in usable format
	//Find out if it is the Same Day
	if(CompareDay(D1,D2))
	{
		if(	(CompareTime(S1,E1) == -1 && CompareTime(S1,S2) == -1 && CompareTime(S2,E2) == -1 )  || (CompareTime(E2,E2) == -1 && CompareTime(E2,S1) == -1 && CompareTime(S1,E1) == -1))	
		{
			alert("There is no time confict bewteen:"+S1+" "+E1+" "+S2+" "+E2);
			return false;
		}
		else
		{
			alert("There is a time confict bewteen:"+S1+" "+E1+" "+S2+" "+E2);
			return true;
		}
	}
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
		//Compare lectures
 		if(IsTimeConflict(Section1.Lecture.Days,Section1.Lecture.StartingTime,Section1.Lecture.EndingTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndingTime))	
		{
			return true;
		}

		if(Section2.Tutorial !== undefined)
		{
			//Compare Lecture , turorial 		
			if(IsTimeConflict(Section1.Lecture.Days, Section1.Lecture.StartingTime,Section1.Lecture.EndingTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndingTime))	
			{
				return true;
			}
		}

		if(Section2.Laboratory !== undefined)
		{
			//Compare Lecture , Laboratory		
			if(IsTimeConflict(Section1.Lecture.Days, Section1.Lecture.StartingTime,Section1.Lecture.EndingTime,Section2.Laboratory.Days, Section2.Laboratory.StartingTime,Section2.Laboratory.EndingTime))	
			{
				return true;
			}
		}
		
		if(Section1.Tutorial !== undefined)
		{
			//Compare Tutorial , Lecture
			if(IsTimeConflict(Section1.Tutorial.Days, Section1.Tutorial.StartingTime,Section1.Tutorial.EndingTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndingTime))	
			{
				return true;
			}
		}
		
		if(Section1.Tutorial !== undefined && Section2.Tutorial !== undefined)
		{
			//Compare tutorial , tutorial
			if(IsTimeConflict(Section1.Tutorial.Days, Section1.Tutorial.StartingTime,Section1.Tutorial.EndingTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndingTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined)
		{
			//Compare Lab, Lecture
			if(IsTimeConflict(Section1.Laboratory.Days ,Section1.Laboratory.StartingTime,Section1.Laboratory.EndingTime,Section2.Lecture.Days,Section2.Lecture.StartingTime,Section2.Lecture.EndingTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined && Section2.Tutorial !== undefined)
		{
			//Compare Lab, Tutorial
			if(IsTimeConflict(Section1.Laboratory.Days, Section1.Laboratory.StartingTime,Section1.Laboratory.EndingTime,Section2.Tutorial.Days,Section2.Tutorial.StartingTime,Section2.Tutorial.EndingTime))	
			{
				return true;
			}
		}
		
		if(Section1.Laboratory !== undefined && Section2.Laboratory !== undefined)
		{
			//Compare Lab, Lab
			if(IsTimeConflict(Section1.Laboratory.Days, Section1.Laboratory.StartingTime,Section1.Laboratory.EndingTime,Section2.Laboratory.Days,Section2.Laboratory.StartingTime,Section2.Laboratory.EndingTime))	
			{
				return true;
			}
		}		
	}
	
	//No conflict in time periods
	return false;
}

function SolveCompleteCourseSectionTable()
{
	var CompleteCourseSectionTable = GetCompleteCourseSectionTable();
	
	//There is only one course so just  make all the possibility equal to the valid martrix	
	alert("Number of courses in the complete course section table:"+CompleteCourseSectionTable.length);
	//alert("Number of courses in the Valid matrix:"+GetValidPossibilityMatrix().length);
	
	//Compare the last added couse section list whit the rest of the matrix.
	if(CompleteCourseSectionTable.length > 1)
	{
		/*for (var i=0; i < CompleteCourseSectionTable.length - 1; i++) 
		{
			alert("Number of section :"+CompleteCourseSectionTable[i].length);
	
		 	for (var j=0; j < CompleteCourseSectionTable[i].length; j++) 
		 	{
		   		//alert("Name: "+CompleteCourseSectionTable[i][j].Name);			
	   			//alert("Descp:"+CompleteCourseSectionTable[i][j].Description);	
		   		//alert("Nb Cred "+CompleteCourseSectionTable[i][j].NumberOfCredits);
	   			//alert("LectID "+CompleteCourseSectionTable[i][j].Lecture.LectureID);			
	   			//alert("TutID "+CompleteCourseSectionTable[i][j].Tutorial.TutorialID);
	   			//alert("LabID "+CompleteCourseSectionTable[i][j].Laboratory.LaboratoryID);
	   			
	   			for (var k=0; k < CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1].length; k++) 
		 		{
		 			
		   			alert("Compare "+CompleteCourseSectionTable[i][j].Name+" with "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Name);
		   			alert("Name: "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Name);			
		   			alert("Descp:"+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Description);	
			   		alert("Nb Cred "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].NumberOfCredits);
		   			alert("LectID "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Lecture.LectureID);			
		   			alert("TutID "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Tutorial.TutorialID);
		   			alert("LabID "+CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k].Laboratory.LaboratoryID);
		   			
		   			//if there is a time conflict we don t put this combinasion in the 
		   			//valid table
		   			
		   			//AddToCourseScheduleList(CompleteCourseSectionTable[CompleteCourseSectionTable.length - 1][k]);
	   				//IsSectionTimeConfict(Section1,Section2)
		 		
		 		}
		 	}
		}
	}
	else
	{
		alert("Number of sections :"+CompleteCourseSectionTable[0].length);

	   	for (var j=0; j < CompleteCourseSectionTable[0].length; j++) 
	 	{
	   		alert("Name: "+CompleteCourseSectionTable[0][j].Name);			
	   		alert("Descp:"+CompleteCourseSectionTable[0][j].Description);	
	   		alert("Nb Cred "+CompleteCourseSectionTable[0][j].NumberOfCredits);
	   		alert("LectID "+CompleteCourseSectionTable[0][j].Lecture.LectureID);			
	   		alert("TutID "+CompleteCourseSectionTable[0][j].Tutorial.TutorialID);
	   		alert("LabID "+CompleteCourseSectionTable[0][j].Laboratory.LaboratoryID);
	   		
	   		//Directly add the section in the valid storage
	   		AddToCourseScheduleList(CompleteCourseSectionTable[0][j]);
	 	}
	}
	
	
	/*if(FullPossiblityMatrix().length == 1)
	{					
		//ThisCoursePossibility.push(CourseSection);
		//AddPossibilityToSchedule(ThisCoursePossibility);
	}
	else
	{
		//compare and store
	}*/
	
}

function GenerateCourseSectionList(Course)
{
	alert("Generate all possible section from a course");
	
	var CourseSection = {};
	var CourseSectionList = 
	[
	
	];
	
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		for (var k=0; k < Course.TutorialArray.length ; k++) 
		{
			for (var l=0; l < Course.LaboratoryArray.length ; l++) 
			{
				CourseSection.Name				=	Course.Name;
				CourseSection.Description		=	Course.Description;
				CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
				
				CourseSection.Lecture		=	Course.LectureArray[j];
				CourseSection.Tutorial		=	Course.TutorialArray[k];
				CourseSection.Laboratory	=	Course.LaboratoryArray[l];		
				
				//alert("Lect "+CourseSection.Lecture.LectureID);
				//alert("Lect Start Time"+CourseSection.Lecture.StartingTime);
				//alert("Lect End Time"+CourseSection.Lecture.EndTime);
				
				//alert("Tut "+CourseSection.Tutorial.TutorialID);
				//alert("Lab "+CourseSection.Laboratory.LaboratoryID);
				
				CourseSectionList.push(CourseSection);
			}
		}
		
	}
	return CourseSectionList;
}

/*
function CreateSectionFromCourses(Course)
{
	
	alert("Generate permutaions");
	
	//acreate all the different combinasion
	//a Section contais a lecture a turorial and a lab
	//var CourseSection = new Array() ;
	var CourseSection = {};
	var ThisCoursePossibility = new Array();
	
	alert("Max Lect "+Course.LectureArray.length );
	alert("Max Tut "+Course.TutorialArray.length);
	alert("Max Lab "+Course.LaboratoryArray.length);
	
	alert("Maximum Section " + (Course.LectureArray.length * Course.TutorialArray.length * Course.LaboratoryArray.length));  
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		for (var k=0; k < Course.TutorialArray.length ; k++) 
		{
			for (var l=0; l < Course.LaboratoryArray.length ; l++) 
			{
				CourseSection.Name				=	Course.Name;
				CourseSection.Description		=	Course.Description;
				CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
				
				CourseSection.Lecture		=	Course.LectureArray[j];
				CourseSection.Tutorial		=	Course.TutorialArray[k];
				CourseSection.Laboratory	=	Course.LaboratoryArray[l];		
				
				//alert("Lect "+CourseSection.Lecture.LectureID);
				//alert("Lect Start Time"+CourseSection.Lecture.StartingTime);
				//alert("Lect End Time"+CourseSection.Lecture.EndTime);
				
				//alert("Tut "+CourseSection.Tutorial.TutorialID);
				//alert("Lab "+CourseSection.Laboratory.LaboratoryID);
				
				if(GetCourseSelection().length == 1)
				{					
					ThisCoursePossibility.push(CourseSection);
					AddPossibilityToSchedule(ThisCoursePossibility);
				}
				else
				{
					//compare and store
				}
			}
		}
		
	}
	
	NotifyView("calendar");	
}

*/


function RetreiveCourses()
{
	if(GetFaculty() === undefined ||  GetFaculty() == "None" ||  GetProgram() === undefined || GetProgram() == "None" ||  GetDepartment() === undefined || GetDepartment() == "None" || GetSemester() === undefined )
	{	
	//	alert("Invalid selection");
	}
	else
	{
		AjaxRetreiveCourses("CoreEngineering");
		//AjaxRetreiveCourses("FieldEngineering");
		//AjaxRetreiveCourses("Option");
		//AjaxRetreiveCourses("Elective");
	}	
}

function AjaxRetreiveCourses(CourseCategory)
{
		
  	$.ajax({
	type: "GET",
	url: "/Website/soen3412011/trunk/mockup/php/AjaxRequest.php",
	async: false,
	data: { Faculty: GetFaculty(), Department: GetDepartment(), Program: GetProgram(), Semester: GetSemester(), Category: CourseCategory},

	beforeSend:function(x) {
		//alert("Before Sending Ajax request");
	},
	
	success:function(CourseArray){
	//do your stuff with the JSON data
		alert("JSON request succeeded");
		
		if(CourseCategory == "FieldEngineering")
		{
			SetCourseListFieldEngineering(CourseArray);
			NotifyView("ULID"+CourseCategory);	
		}
		else if(CourseCategory == "CoreEngineering")
		{
			SetCourseListCoreEngineering(CourseArray);
			NotifyView("ULID"+CourseCategory);	
		}
		else  if (CourseCategory == "Option")
		{
			SetCourseListOption(CourseArray);
			NotifyView("ULID"+CourseCategory);	
		}
		else  if (CourseCategory == "Elective")
		{
			SetCourseListElectives(CourseArray);
			NotifyView("ULID"+CourseCategory);	
		}
		
		alert("Name: " + CourseArray[0].Name);   	
		alert("Description: " + CourseArray[0].Description);   	
		alert("Number of Credits: " + CourseArray[0].NumberOfCredits);   	
		
		/*
		alert("LectureID: " + Schedule.CourseArray[0].LectureArray[0].LectureID);	 			
		alert("Lecture classroom: " + Schedule.CourseArray[0].LectureArray[0].Classrom); 
		alert("Lecture Professor: " + Schedule.CourseArray[0].LectureArray[0].Professor);
		alert("Lecture Days: " + Schedule.CourseArray[0].LectureArray[0].Days);
		alert("Lecture StartingTime: " + Schedule.CourseArray[0].LectureArray[0].StartingTime);
		alert("Lecture EndTime: " + Schedule.CourseArray[0].LectureArray[0].EndTime);
		
		alert("TutorialID: " + Schedule.CourseArray[0].TutorialArray[0].TutorialID);	 			
		alert("Tutorial classroom: " + Schedule.CourseArray[0].TutorialArray[0].Classrom); 
		alert("Tutorial Professor: " + Schedule.CourseArray[0].TutorialArray[0].Professor);
		alert("Tutorial Days: " + Schedule.CourseArray[0].TutorialArray[0].Days);
		alert("Tutorial StartingTime: " + Schedule.CourseArray[0].TutorialArray[0].StartingTime);
		alert("Tutorial EndTime: " + Schedule.CourseArray[0].TutorialArray[0].EndTime);
		
		alert("LaboratoryID: " + Schedule.CourseArray[0].LaboratoryArray[0].LaboratoryID);	 			
		alert("Laboratory classroom: " + Schedule.CourseArray[0].LaboratoryArray[0].Classrom); 
		alert("Laboratory Professor: " + Schedule.CourseArray[0].LaboratoryArray[0].Professor);
		alert("Laboratory Days: " + Schedule.CourseArray[0].LaboratoryArray[0].Days);
		alert("Laboratory StartingTime: " + Schedule.CourseArray[0].LaboratoryArray[0].StartingTime);
		alert("Laboratory EndTime: " + Schedule.CourseArray[0].LaboratoryArray[0].EndTime);
		*/
		
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
$(document).ready(function(){
	
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
		
			RetreiveCourses();
		}
	});

	$("#ButtonIDWinter").click(function() 
	{ 
		if(GetSemester() != $(this).val())
		{	
			SetSemester($(this).val());
			//alert(GetSemester());
		
			NotifyView(this.id);
		
			RetreiveCourses();
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
					
					if(CourseListCoreEngineering[i].Name == $(this).parent().children('input').attr('value'))
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
						
						//NotifyView("calendar");	
							
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
				
				for (var i=0; i < CourseListCoreEngineering.CourseArray.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseListCoreEngineering.CourseArray[i].Name == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromCourseListSelection(CourseListCoreEngineering.CourseArray[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
				
						break;	
					}
					
				}
			}				
			
		}
	});
	

});
		
