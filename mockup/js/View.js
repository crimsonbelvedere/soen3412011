
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	//alert("NotifyView " + ElementID);	
	//if(ElementID == )
	if(ElementID == "calendar")
	{
		alert("Updating the calendar");		
		
		
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