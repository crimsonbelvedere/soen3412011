
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	//alert("NotifyView " + ElementID);	
	//if(ElementID == )
	if(ElementID == "calendar")
	{
		//alert("Updating the calendar");		

    	var EventObjects = 
    	{
    		events:
    		[
    		
    		]
    	}
    	
    	var ScheduleNumber = GetScheduleNumber();	
		//var PossiblitySchedule = GetScheduledCourses();
		var ScheduleSequenceList = GetCourseScheduleList();
		
		var d = new Date();
		var DayNumber = d.getDay();
		var DateNumber = d.getDate();
		var MonthNumber = d.getMonth()+1;
		var YearNumber = d.getFullYear();
		var FirtMondayOfThisWeek;
		
		//DateNumber=19;
		//DayNumber=6;
		//alert(YearNumber+"-"+MonthNumber+"-"+DateNumber);
		
		if(DayNumber > 1)
		{
			FirtMondayOfThisWeek = DateNumber - DayNumber + 1;
		}
		else if(DayNumber < 1)
		{
			FirtMondayOfThisWeek = DateNumber + DayNumber + 1;
		}
		else
		{
			FirtMondayOfThisWeek = DateNumber ;	
		}
	
		//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 12:15:00");
		//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 13:00:00");
		
		$('#calendar').fullCalendar( 'removeEvents').fullCalendar('removeEventSources');  //Removes all event sources

		//Alway show the first schedule.	
		for (var i=0; i < ScheduleSequenceList[ScheduleNumber].length; i++) 
		{
		 	
			//Conver day string into day array
			var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Lecture.Days);
			for (var j=0; j < DayArr.length; j++) 
			{
				if(DayArr[j] == 1)
				{
					var DayOfTheWeek=FirtMondayOfThisWeek+j;
					var EventLecture = {};			
					
					EventLecture.title 	= ScheduleSequenceList[ScheduleNumber][i].Name+" Lecture";		     
					EventLecture.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.StartingTime;
					EventLecture.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.EndTime;
					EventLecture.allDay 	= false;
					EventObjects.events.push(EventLecture);
				}		  
			}
			
			var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Tutorial.Days);
			for (var j=0; j < DayArr.length; j++) 
			{
				if(DayArr[j] == 1)
				{
					var DayOfTheWeek=FirtMondayOfThisWeek+j;					
					var EventTutorial = {};
					
					EventTutorial.title = ScheduleSequenceList[ScheduleNumber][i].Name+" Tutorial";		     
					EventTutorial.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.StartingTime;
					EventTutorial.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.EndTime;
					EventTutorial.allDay 	= false;
					EventObjects.events.push(EventTutorial);
				}		  
			}
			
			var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Laboratory.Days);
			for (var j=0; j < DayArr.length; j++) 
			{
				if(DayArr[j] == 1)
				{
					var DayOfTheWeek=FirtMondayOfThisWeek+j;
					var EventLaboratory = {};
					
					EventLaboratory.title 	= ScheduleSequenceList[ScheduleNumber][i].Name+" Laboratory";		     
					EventLaboratory.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.StartingTime;
					EventLaboratory.end		= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.EndTime;
					EventLaboratory.allDay 	= false;
					EventObjects.events.push(EventLaboratory);
				}
			}
			
		}
		
		if(ScheduleSequenceList[ScheduleNumber].length != 0)
		{
			$('#calendar').fullCalendar( 'addEventSource', EventObjects );  
		}
		
		$('#calendar').fullCalendar('refetchEvents');
			
			
		//Change the number of maximum schedule.
		$('#DivIDTitle').empty();	
		var LastScheduleNumber = ScheduleSequenceList.length - "1";
		var ScheduleTitle = "Schedule "+ScheduleNumber+"/"+LastScheduleNumber;
		$('#DivIDTitle').append(ScheduleTitle);
	
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