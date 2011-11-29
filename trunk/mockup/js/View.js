
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	//alert("NotifyView " + ElementID);	
	//if(ElementID == )
	if(ElementID == "constraints")
	{

		var EventObjects = 
    	{
    		events:
    		[
    		
    		]
    	}
		
		//Add all filter objects.
		var ConstraintList =GetConstraintsList();
		var ScheduleNumber = GetScheduleNumber();	
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
	
		$('#calendar').fullCalendar( 'removeEvents').fullCalendar('removeEventSources');  //Removes all event sources
		
		if(ScheduleSequenceList.length > 0)
		{
			
			for (var i=0; i < ScheduleSequenceList[ScheduleNumber].length; i++) 
			{
			 	//Conver day string into day array
				if(ScheduleSequenceList[ScheduleNumber][i].Lecture !== undefined)
				{
					//Conver day string into day array
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Lecture.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;
							var EventLecture = {};			
							
							EventLecture.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LECTURE\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Professor+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Classrom;		     
							EventLecture.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.StartingTime;
							EventLecture.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.EndTime;
							EventLecture.allDay 	= false;
							EventObjects.events.push(EventLecture);
						}		  
					}
				}
				
				if(ScheduleSequenceList[ScheduleNumber][i].Tutorial !== undefined)
				{
					
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Tutorial.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;					
							var EventTutorial = {};
							
								EventTutorial.title = ScheduleSequenceList[ScheduleNumber][i].Number+" TUTORIAL\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Tutorial.Classrom;		     
							EventTutorial.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.StartingTime;
							EventTutorial.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.EndTime;
							EventTutorial.allDay 	= false;
							EventObjects.events.push(EventTutorial);
						}		  
					}
				}
				
				if(ScheduleSequenceList[ScheduleNumber][i].Laboratory !== undefined)
				{
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Laboratory.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;
							var EventLaboratory = {};
							
							EventLaboratory.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LABORATORY\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Laboratory.Classrom;		     
							EventLaboratory.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.StartingTime;
							EventLaboratory.end		= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.EndTime;
							EventLaboratory.allDay 	= false;
							EventObjects.events.push(EventLaboratory);
						}
					}
				}
				
			}
			
			/*if(ScheduleSequenceList[ScheduleNumber].length != 0)
			{
				$('#calendar').fullCalendar( 'addEventSource', EventObjects );  
			}*/
		}
		
			
		if(ConstraintList.length > 0 )
		{
			
			for (var i=0; i < ConstraintList.length; i++) 
			{
				var DayArr = Daystr(ConstraintList[i].Days)
				{
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek + j;
							var EventConstraints = {};
							
							EventConstraints.title 	= ConstraintList[i].Name;		     
							EventConstraints.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ConstraintList[i].StartingTime;
							EventConstraints.end		= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ConstraintList[i].EndingTime;
							EventConstraints.allDay 	= false;
							EventConstraints.color= 'red';    
					        EventConstraints.textColor= 'white' ;
							EventObjects.events.push(EventConstraints);
						}
					}	
				}	
			}
	
					
			/*if(ConstraintList.length != 0)
			{
				$('#calendar').fullCalendar( 'addEventSource', EventObjects );  
			}*/
		}
		
		$('#calendar').fullCalendar( 'addEventSource', EventObjects );
		
		$('#calendar').fullCalendar('refetchEvents');
		
			
		//Change the number of maximum schedule.
		$('#DivIDTitle').empty();	
		var CurrenScheduleNumer = ScheduleNumber + 1;
		var LastScheduleNumber = ScheduleSequenceList.length;
		if(ScheduleSequenceList.length == 0)
		{			
			LastScheduleNumber = 1;
		}
		if(ScheduleSequenceList.length == 0 && GetConstraintsList().length == 0)
		{
			CurrenScheduleNumer =0;
			LastScheduleNumber = 0;
		}
		var ScheduleTitle = "Schedule "+CurrenScheduleNumer+"/"+LastScheduleNumber;
		$('#DivIDTitle').append(ScheduleTitle);
		
		
	}

	if(ElementID == "calendar")
	{
		//alert("Updating the calendar");		

    	var EventObjects = 
    	{
    		events:
    		[
    		
    		]
    	}
    	
    	var ConstraintList =GetConstraintsList();
    	var ScheduleNumber = GetScheduleNumber();	
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

		if(ScheduleSequenceList.length > 0)
		{
			
			for (var i=0; i < ScheduleSequenceList[ScheduleNumber].length; i++) 
			{
			 	
				//Conver day string into day array
				if(ScheduleSequenceList[ScheduleNumber][i].Lecture !== undefined)
				{
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Lecture.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;
							var EventLecture = {};			
							
							EventLecture.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LECTURE\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Professor+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Classrom;		     
							EventLecture.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.StartingTime;
							EventLecture.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.EndTime;
							EventLecture.allDay 	= false;
							EventObjects.events.push(EventLecture);
						}		  
					}
				}
				
				if(ScheduleSequenceList[ScheduleNumber][i].Tutorial !== undefined)
				{
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Tutorial.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;					
							var EventTutorial = {};
							
							EventTutorial.title = ScheduleSequenceList[ScheduleNumber][i].Number+" TUTORIAL\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Tutorial.Classrom;		     
							EventTutorial.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.StartingTime;
							EventTutorial.end	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.EndTime;
							EventTutorial.allDay 	= false;
							EventObjects.events.push(EventTutorial);
						}		  
					}
				}
					
				if(ScheduleSequenceList[ScheduleNumber][i].Laboratory !== undefined)
				{
						
					var DayArr = Daystr(ScheduleSequenceList[ScheduleNumber][i].Laboratory.Days);
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek+j;
							var EventLaboratory = {};
							
							EventLaboratory.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LABORATORY\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Laboratory.Classrom;		     
							EventLaboratory.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.StartingTime;
							EventLaboratory.end		= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.EndTime;
							EventLaboratory.allDay 	= false;
							EventObjects.events.push(EventLaboratory);
						}
					}
					
				}
				
			}
			
			/*if(ScheduleSequenceList[ScheduleNumber].length != 0)
			{
				$('#calendar').fullCalendar( 'addEventSource', EventObjects );  
			}*/
			
		}
		
			
		if(ConstraintList.length > 0 )
		{
			
			for (var i=0; i < ConstraintList.length; i++) 
			{
				var DayArr = Daystr(ConstraintList[i].Days)
				{
					for (var j=0; j < DayArr.length; j++) 
					{
						if(DayArr[j] == 1)
						{
							var DayOfTheWeek=FirtMondayOfThisWeek + j;
							var EventConstraints = {};
							
							EventConstraints.title 	= ConstraintList[i].Name;		     
							EventConstraints.start	= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ConstraintList[i].StartingTime;
							EventConstraints.end		= YearNumber+"-"+MonthNumber+"-"+DayOfTheWeek+" "+ConstraintList[i].EndingTime;
							EventConstraints.allDay 	= false;
							EventConstraints.color= 'red';    
					        EventConstraints.textColor= 'white' ;
							EventObjects.events.push(EventConstraints);
						}
					}	
				}	
			}
	
					
		/*	if(ConstraintList.length != 0)
			{
				$('#calendar').fullCalendar( 'addEventSource', EventObjects );  
			}
		*/
		}		

		$('#calendar').fullCalendar( 'addEventSource', EventObjects );
		
		$('#calendar').fullCalendar('refetchEvents');
			
			
		//Change the number of maximum schedule.
		$('#DivIDTitle').empty();	
		var CurrenScheduleNumer = ScheduleNumber + 1;
		var LastScheduleNumber = ScheduleSequenceList.length;
		if(ScheduleSequenceList.length == 0)
		{			
			CurrenScheduleNumer = 0;
		}
		var ScheduleTitle = "Schedule "+CurrenScheduleNumer+"/"+LastScheduleNumber;
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
			HtmlCode +='<input value="' + LocalCourseSelection[i].Number + '" type="checkbox" id="ID' + LocalCourseSelection[i].Number + '">';
			HtmlCode +='<label for="ID' + LocalCourseSelection[i].Number + '">';
			HtmlCode +='<dfn>' + LocalCourseSelection[i].Number + '</dfn>';
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
			HtmlCode +='<input value="' +LocalCourseCoreEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseCoreEngineering[i].Number + '">';
			HtmlCode +='<label for="ID' + LocalCourseCoreEngineering[i].Number + '">';
			HtmlCode +='<dfn>' + LocalCourseCoreEngineering[i].Number + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
			
	}
	
	if(ElementID == "ULIDFieldEngineering")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseFieldEngineering = GetCourseListFieldEngineering();
				
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseFieldEngineering.length ; i++) 
		{
		
			
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="' + LocalCourseFieldEngineering[i].Description + '">';
			HtmlCode +='<input value="' +LocalCourseFieldEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldEngineering[i].Number + '">';
			HtmlCode +='<label for="ID' + LocalCourseFieldEngineering[i].Number + '">';
			HtmlCode +='<dfn>' + LocalCourseFieldEngineering[i].Number + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
	}
	
	if(ElementID == "ULIDOption")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseFieldOption = GetCourseListOption();
				
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseFieldOption.length ; i++) 
		{
		
			
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="' + LocalCourseFieldOption[i].Description + '">';
			HtmlCode +='<input value="' +LocalCourseFieldOption[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldOption[i].Number + '">';
			HtmlCode +='<label for="ID' + LocalCourseFieldOption[i].Number + '">';
			HtmlCode +='<dfn>' + LocalCourseFieldOption[i].Number + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
			 
		
	}
	
	if(ElementID == "ULIDElective")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseElectives = GetCourseListElectives();
				
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseElectives.length ; i++) 
		{
		
			
			HtmlCode = ""; 
		
			HtmlCode +='<li class="deselected" title="' + LocalCourseElectives[i].Description + '">';
			HtmlCode +='<input value="' +LocalCourseElectives[i].Number + '" type="checkbox" id="ID' + LocalCourseElectives[i].Number + '">';
			HtmlCode +='<label for="ID' + LocalCourseElectives[i].Number + '">';
			HtmlCode +='<dfn>' + LocalCourseElectives[i].Number + '</dfn>';
			HtmlCode +='</label>';
			HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
			HtmlCode +='</li>';
			//alert(HtmlCode);
		
			//Append Course	
			$(HtmlCode).appendTo("#"+ElementID);
			  
		};
		
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
	
	
	
}