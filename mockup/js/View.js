
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	//alert("NotifyView " + ElementID);	
	//if(ElementID == )
	if(ElementID == "calendar")
	{
		alert("Updating the calendar");		
	
		var LocalCourseSelection = GetCourseSelection();
		
		//take the first course, first section (lecture and tutorial) and try to fit it will the next one
		//if there is no confilct add it to the calendar.
		//find every possible combination
		
		/*ex: 
		 
		Course 1 has 2 lectures and each lecture has 3 tutorials and 2 Labs
		Course 2 has 2 lectures and each lecture has 2 tutorials and 2 Labs
		Course 3 has 1 lectures and each lecture has 2 tutorials and 2 Labs
		
		All possible combination are these, total = n lectures * n tutorials * n labs (2*3*2 = 12) 
		
		
		C1.1)Course 1	->		Lecture A	->	Tutorial T1	->	Lab L1
		C1.2)Course 1	->		Lecture A	->	Tutorial T1	->	Lab L2
		C1.3)Course 1	->		Lecture A	->	Tutorial T2	->	Lab L1
		C1.4)Course 1	->		Lecture A	->	Tutorial T2	->	Lab L2
		C1.5)Course 1	->		Lecture A	->	Tutorial T3	->	Lab L1
		C1.6)Course 1	->		Lecture A	->	Tutorial T3	->	Lab L2		
		C1.7)Course 1	->		Lecture B	->	Tutorial T1	->	Lab L1
		C1.8)Course 1	->		Lecture B	->	Tutorial T1	->	Lab L2
		C1.9)Course 1	->		Lecture B	->	Tutorial T2	->	Lab L1
		C1.10)Course 1	->		Lecture B	->	Tutorial T2	->	Lab L2
		C1.11)Course 1	->		Lecture B	->	Tutorial T3	->	Lab L1
		C1.12)Course 1	->		Lecture B	->	Tutorial T3	->	Lab L2
		
		
		For C1.1) maximum of (2*3*2) * (2*2*2) = 12 * 8 = 96	
		[Course 1	->		Lecture A	->	Tutorial T1	->	Lab L1]  
		C2.1)Course 2	->		Lecture A	->	Tutorial T1	->	Lab L1
		C2.2)Course 2	->		Lecture A	->	Tutorial T1	->	Lab L2
		C2.3)Course 2	->		Lecture A	->	Tutorial T2	->	Lab L1
		C2.4)Course 2	->		Lecture A	->	Tutorial T2	->	Lab L2
		C2.5)Course 2	->		Lecture B	->	Tutorial T1	->	Lab L1
		C2.6)Course 2	->		Lecture B	->	Tutorial T1	->	Lab L2
		C2.7)Course 2	->		Lecture B	->	Tutorial T2	->	Lab L1
		C2.8)Course 2	->		Lecture B	->	Tutorial T2	->	Lab L2
		
		
		For C1.1 and C2.1) 2*3*2 *2*2*2 *1*2*2 = 12*8*4= 384
		C3.1)Course 3	->		Lecture A	->	Tutorial T1	->	Lab L1
		C3.2)Course 3	->		Lecture A	->	Tutorial T1	->	Lab L2
		C3.3)Course 3	->		Lecture A	->	Tutorial T2	->	Lab L1
		C3.4)Course 3	->		Lecture A	->	Tutorial T2	->	Lab L2
		
		*/
	
	}	
	
	/*Populate tabs with query courses*/
	if(ElementID == "ULIDSelection")
	{

		//alert("Update the selection of courses");	
		
		//Clear the current selection and replace it by the entire new one		
		$("#"+ElementID).empty();
		
		var LocalCourseSelection = GetCourseSelection();
		
		for (var i=0; i < LocalCourseSelection.length ; i++) 
		{
			HtmlCode = ""; 
		
			HtmlCode +='<li class="LiIDCourseSelected" title="' + LocalCourseSelection[i].Description + 'next line \n' + 'next line \n">';
			HtmlCode +='<input value="' + LocalCourseSelection[i].Name + '" type="checkbox" id="ID' + LocalCourseSelection[i].Name + '">';
			HtmlCode +='<label for="ID' + LocalCourseSelection[i].Name + '">';
			HtmlCode +='<dfn>' + LocalCourseSelection[i].Name + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
		}
		
	}
	
	
	if(ElementID == "ULIDCoreEngineering")
	{
		//alert("#"+ElementID);	
		
	
		//alert("Name: " +GetCourseCoreEngineering().CourseArray[0].Name);
		//alert("Description: " +GetCourseCoreEngineering().CourseArray[0].Description);
		//alert("NumberOfCredits: " +GetCourseCoreEngineering().CourseArray[0].NumberOfCredits);
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseCoreEngineering = GetCourseCoreEngineering();
				
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseCoreEngineering.CourseArray.length ; i++) 
		{
		
			
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="' + LocalCourseCoreEngineering.CourseArray[i].Description + '">';
			HtmlCode +='<input value="' +LocalCourseCoreEngineering.CourseArray[i].Name + '" type="checkbox" id="ID' + LocalCourseCoreEngineering.CourseArray[i].Name + '">';
			HtmlCode +='<label for="ID' + LocalCourseCoreEngineering.CourseArray[i].Name + '">';
			HtmlCode +='<dfn>' + LocalCourseCoreEngineering.CourseArray[i].Name + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
		
		//Change all the html
		//$("#"+ElementID).html(HtmlCode);  		
		
	}
	
	if(ElementID == "ULIDFieldEngineering")
	{
		alert("#"+ElementID);	
		
		/*lert("Name: " +GetCourseFieldEngineering().CourseArray[0].Name);
		alert("Description: " +GetCourseFieldEngineering().CourseArray[0].Description);
		alert("NumberOfCredits: " +GetCourseFieldEngineering().CourseArray[0].NumberOfCredits);*/
	
		 
		for (var i=0; i < GetCourseFieldEngineering().CourseArray.length ; i++) 
		{
		
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="System Hardware description">';
			HtmlCode +='<input value="SOEN 258" type="checkbox" id="IDSOEN258">';
			HtmlCode +='<label for="IDSOEN258">';
			HtmlCode +='<dfn>SOEN 258</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
		};
		
		//$("#"+ElementID).html(HtmlCode); 
			 
				
	}
	
	if(ElementID == "ULIDOption")
	{
		alert("#"+ElementID);	
		
		/*alert("Name: " +GetCourseOption().CourseArray[0].Name);
		alert("Description: " +GetCourseOption().CourseArray[0].Description);
		alert("NumberOfCredits: " +GetCourseOption().CourseArray[0].NumberOfCredits);*/
	
			
		for (var i=0; i < GetCourseOption().CourseArray.length  ; i++) 
		{
					
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="System Hardware description">';
			HtmlCode +='<input value="SOEN 258" type="checkbox" id="IDSOEN258">';
			HtmlCode +='<label for="IDSOEN258">';
			HtmlCode +='<dfn>SOEN 258</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
		};
		
		//$("#"+ElementID).html(HtmlCode); 
			 
		
	}
	
	if(ElementID == "ULIDElective")
	{
		alert("#"+ElementID);	
		
		/*alert("Name: " +GetCourseElectives().CourseArray[0].Name);
		alert("Description: " +GetCourseElectives().CourseArray[0].Description);
		alert("NumberOfCredits: " +GetCourseElectives().CourseArray[0].NumberOfCredits);*/
	
		
			
		for (var i=0; i < GetCourseElectives().CourseArray.length ; i++) 
		{
		
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="System Hardware description">';
			HtmlCode +='<input value="SOEN 258" type="checkbox" id="IDSOEN258">';
			HtmlCode +='<label for="IDSOEN258">';
			HtmlCode +='<dfn>SOEN 258</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
		};	
		
		//$("#"+ElementID).html(HtmlCode); 
		
	}
	
	
	
	//Buttons Update
	if(ElementID == "ButtonIDFall")
	{
		alert("#"+ElementID);	
		
		//Update the View
		$("#"+ElementID).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
		if( $("#"+ElementID).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') )
		{ 
			$("#"+ElementID).removeClass("ui-state-active"); 
		}
		else 
		{ 
			$("#"+ElementID).addClass("ui-state-active"); 
		}	
	}
	
	if(ElementID == "ButtonIDWinter")
	{
		alert("#"+ElementID);	
		
		//Update the View
		$("#"+ElementID).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
		if( $(this).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') )
		{ 
			$("#"+ElementID).removeClass("ui-state-active"); 
		}
		else 
		{ 
			$("#"+ElementID).addClass("ui-state-active"); 
		}		
	}
	
	
	/*if(ElementID == "ButtonIDSummer")
	{
		alert("#"+ElementID);
		
		//Update the View
		$("#"+ElementID).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
		if( $("#"+ElementID).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') )
		{ 
			$("#"+ElementID).removeClass("ui-state-active"); 
		}
		else 
		{ 
			$("#"+ElementID).addClass("ui-state-active"); 
		}	
	}*/
	
}