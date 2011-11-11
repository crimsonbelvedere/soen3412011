
function AddCoursePermutationWhitoutCollision(Course)
{
	
	alert("Generate permutaions");
	
	//acreate all the different combinasion
	//a permutation contais a lecture a turorial and a lab
	//var CoursePermutation = new Array() ;
	var CoursePermutation = {};
	
	alert("Max Lect "+Course.LectureArray.length );
	alert("Max Tut "+Course.TutorialArray.length);
	alert("Max Lab "+Course.LaboratoryArray.length);
	
	alert("Maximum permutation " + (Course.LectureArray.length * Course.TutorialArray.length * Course.LaboratoryArray.length));  
	
	//for (var i=0; i < (Course.LectureArray.length * Course.TutorialArray.length * Course.LaboratoryArray.length ); i++) 
	//{
		for (var j=0; j < Course.LectureArray.length; j++) 
		{
			for (var k=0; k < Course.TutorialArray.length ; k++) 
			{
				for (var l=0; l < Course.LaboratoryArray.length ; l++) 
				{
					/*
					CoursePermutation[i].Lecture	=	Course.LectureArray[j];
					CoursePermutation[i].Tutorial	=	Course.TutorialArray[k];
					CoursePermutation[i].Laboratory	=	Course.LaboratoryArray[l];		
					
					alert("Lect"+CoursePermutation[i].Lecture);
					alert("Tut"+CoursePermutation[i].Tutorial);
					alert("Lab"+CoursePermutation[i].Laboratory);
					*/
					CoursePermutation.Lecture	=	Course.LectureArray[j];
					CoursePermutation.Tutorial	=	Course.TutorialArray[k];
					CoursePermutation.Laboratory	=Course.LaboratoryArray[l];		
					
					alert("Lect "+CoursePermutation.Lecture.LectureID);
					alert("Tut "+CoursePermutation.Tutorial.TutorialID);
					alert("Lab "+CoursePermutation.Laboratory.LaboratoryID);
				}
			}
			
		}
	//}

	//InsertPermutationToSchedule(Permutation,0);
	
	//NotifyView("calendar");	
}




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
	
	success:function(Schedule){
	//do your stuff with the JSON data
		//alert("JSON request succeeded");
		
		if(CourseCategory == "FieldEngineering")
		{
			SetCourseFieldEngineering(Schedule);
			NotifyView("ULID"+CourseCategory);	
		}
		else if(CourseCategory == "CoreEngineering")
		{
			SetCourseCoreEngineering(Schedule);
			NotifyView("ULID"+CourseCategory);	
		}
		else  if (CourseCategory == "Option")
		{
			SetCourseOption(Schedule);
			NotifyView("ULID"+CourseCategory);	
		}
		else  if (CourseCategory == "Elective")
		{
			SetCourseElectives(Schedule);
			NotifyView("ULID"+CourseCategory);	
		}
		
		/*alert("Name: " + Schedule.CourseArray[0].Name);   	
		alert("Description: " + Schedule.CourseArray[0].Description);   	
		alert("Number of Credits: " + Schedule.CourseArray[0].NumberOfCredits);   	
		
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
				var CourseCoreEngineering = GetCourseCoreEngineering();
				
				for (var i=0; i < CourseCoreEngineering.CourseArray.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseCoreEngineering.CourseArray[i].Name == $(this).parent().children('input').attr('value'))
					{
						//alert("Add course to selection");
						AddCourseToSelection(CourseCoreEngineering.CourseArray[i]);							
						
						//Update Selection View
						NotifyView("ULIDSelection");	
						
						//Update the calendar 
						AddCoursePermutationWhitoutCollision(CourseCoreEngineering.CourseArray[i]);
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
				
				var CourseCoreEngineering = GetCourseCoreEngineering();
				
				for (var i=0; i < CourseCoreEngineering.CourseArray.length ; i++) 
				{
					//alert(CourseCoreEngineering.CourseArray[i].Name);
					//alert($(this).parent().children('input').attr('value'));
					
					if(CourseCoreEngineering.CourseArray[i].Name == $(this).parent().children('input').attr('value'))
					{
						//alert("Remove course from selection");
						
						RemoveCourseFromSelection(CourseCoreEngineering.CourseArray[i]);
												
						//Update Selection View
						NotifyView("ULIDSelection");	
				
						break;	
					}
					
				}
			}				
			
		}
	});
	

});
		
