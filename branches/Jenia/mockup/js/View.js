
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	//alert("NotifyView " + ElementID);	
	//if(ElementID == )
	if(ElementID == "calendar")
	{
		alert("Updating the calendar");		

    	var EventObjects = 
    	{
    		events:
    		[
    		
    		]
    	}
    		
		var PossiblitySchedule = GetScheduledCourses();
		
		/*var Events = {};
		Events.title 	= PossiblitySchedule[0].Name+" Lecture";
    	Events.start	= "2011-11-09 " + ScheduleArray[0].Lecture.StartingTime;
    	Events.end		= "2011-11-09 " + ScheduleArray[0].Lecture.EndTime;
    	Events.allDay 	= false;
    	EventObjects.events.push(Events);
    	
	   	var Events = {};
		Events.title 	= ScheduleArray[1].Name+" Lecture";
    	Events.start	= "2011-11-11 " + ScheduleArray[1].Lecture.StartingTime;
    	Events.end		= "2011-11-11 " + ScheduleArray[1].Lecture.EndTime;
    	Events.allDay 	= false;
    	EventObjects.events.push(Events);
    	
	    $('#calendar').fullCalendar( 'addEventSource', EventObjects );  */
	   /*
		alert("Number of permutation to generate data from:"+ ValidPermutation.length);
		
		for (var i=0; i < ValidPermutation.length; i++) 
		{
		
			var Events = {};	
			Events.title 	= ValidPermutation[i].Name+" Lecture";
	    	Events.start	= "2011-11-08 " + ValidPermutation[i].Lecture.StartingTime;
	    	Events.end		= "2011-11-08 " + ValidPermutation[i].Lecture.EndTime;
	    	Events.allDay 	= false;
			alert("Lect Time: "+Events.start+" "+Events.end);
	    	EventObjects.events.push(Events);
	    	
	    	var Events = {};
			Events.title 	= ValidPermutation[i].Name+" Tutorial";
	    	Events.start	= "2011-11-09 " + ValidPermutation[i].Tutorial.StartingTime;
	    	Events.end		= "2011-11-09 " + ValidPermutation[i].Tutorial.EndTime;
	    	Events.allDay 	= false;
	    	alert("Tut Time: "+Events.start+" "+Events.end);
	    	EventObjects.events.push(Events);
	    
	    	var Events = {};
			Events.title 	= ValidPermutation[i].Name+" Laboratory";
	    	Events.start	= "2011-11-10 " + ValidPermutation[i].Laboratory.StartingTime;
	    	Events.end		= "2011-11-10 " + ValidPermutation[i].Laboratory.EndTime;
	    	Events.allDay 	= false;	
	    	alert("Labo Time: "+Events.start+" "+Events.end);
	    	EventObjects.events.push(Events);
	    	
		
		}
    	
		$('#calendar').fullCalendar( 'addEventSource', EventObjects );  

		*/
		
	}	
	
	/*Populate tabs with query courses*/
	if(ElementID == "ULIDSelection")
	{

		//alert("Update the selection of courses");	
		
		//Clear the current selection and replace it by the entire new one		
		$("#"+ElementID).empty();
		
		var LocalCourseSelection = GetCourseListSelection();
		
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
		
		var LocalCourseCoreEngineering = GetCourseListCoreEngineering();
				
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseCoreEngineering.length ; i++) 
		{
		
			
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="' + LocalCourseCoreEngineering[i].Description + '">';
			HtmlCode +='<input value="' +LocalCourseCoreEngineering[i].Name + '" type="checkbox" id="ID' + LocalCourseCoreEngineering[i].Name + '">';
			HtmlCode +='<label for="ID' + LocalCourseCoreEngineering[i].Name + '">';
			HtmlCode +='<dfn>' + LocalCourseCoreEngineering[i].Name + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
			
	}
	/*
	if(ElementID == "ULIDFieldEngineering")
	{
		alert("#"+ElementID);	
		
			 
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
	
	*/
	
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
	
	
	
}