
/*
 * View of the MVC
 * This function receive which element has change and do the establish behaviour.
 * all element from the GUI are here (html div)
 */
function NotifyView(ElementID)
{
	//Generate html code
	var HtmlCode = ""; 
		
	if(ElementID == "DivIDLogout")
	{
		//alert("#"+ElementID);	
		
		//Update the View
		$("#"+ElementID).removeClass("DivIDLoginLogoutVisible");
		$("#"+ElementID).addClass("DivIDLoginLogoutHidden"); 
		$("#DivIDLogin").removeClass("DivIDLoginLogoutHidden");
		$("#DivIDLogin").addClass("DivIDLoginLogoutVisible"); 
		
	}	
	
	if(ElementID == "DivIDLogin")
	{
		//alert("#"+ElementID);	
		
		//Update the View
		$("#"+ElementID).removeClass("DivIDLoginLogoutVisible");
		$("#"+ElementID).addClass("DivIDLoginLogoutHidden"); 
		$("#DivIDLogout").removeClass("DivIDLoginLogoutHidden");
		$("#DivIDLogout").addClass("DivIDLoginLogoutVisible"); 
		$("#InputIDUserName").val("");
		$("#InputIDPassword").val("");
	}
	
	if(ElementID == "DfnIDStudentName")
	{
		$("#"+ElementID).empty();
		
		var StudentInformation = GetStudentInformation();
		
		HtmlCode = StudentInformation.first_name+" "+StudentInformation.last_name; 
		
		$("#"+ElementID).html(HtmlCode);
	}
	
	if(ElementID == "DfnIDStudentProgram")
	{
		$("#"+ElementID).empty();
		
		var StudentInformation = GetStudentInformation();
		
		HtmlCode = StudentInformation.program+" "+StudentInformation.program_option;
		
		$("#"+ElementID).html(HtmlCode);
	}
	
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
		
		var FirsMondayOfTheWeekDate = FindFirstMondayOfTheWeek();
		
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;
							var EventLecture = {};			
							
							EventLecture.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LECTURE\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Professor+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Classrom;		     
							EventLecture.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.StartingTime;
							EventLecture.end	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;					
							var EventTutorial = {};
							
							EventTutorial.title = ScheduleSequenceList[ScheduleNumber][i].Number+" TUTORIAL\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Tutorial.Classrom;		     
							EventTutorial.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.StartingTime;
							EventTutorial.end	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;
							var EventLaboratory = {};
							
							EventLaboratory.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LABORATORY\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Laboratory.Classrom;		     
							EventLaboratory.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.StartingTime;
							EventLaboratory.end		= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day + j;
							var EventConstraints = {};
							
							EventConstraints.title 	= ConstraintList[i].Name;		     
							EventConstraints.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ConstraintList[i].StartingTime;
							EventConstraints.end		= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ConstraintList[i].EndingTime;
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
		
		/*var d = new Date();
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
			
			if(FirtMondayOfThisWeek < 0)
			{
				
			}
		}
		else if(DayNumber < 1)
		{
			FirtMondayOfThisWeek = DateNumber + DayNumber + 1;
		}
		else
		{
			FirtMondayOfThisWeek = DateNumber ;	
		}
	*/
		//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 12:15:00");
		//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 13:00:00");
		
		var FirsMondayOfTheWeekDate = FindFirstMondayOfTheWeek();
	
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;
							var EventLecture = {};			
							
							EventLecture.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LECTURE\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Professor+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Lecture.Classrom;		     
							EventLecture.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.StartingTime;
							EventLecture.end	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Lecture.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;					
							var EventTutorial = {};
							
							EventTutorial.title = ScheduleSequenceList[ScheduleNumber][i].Number+" TUTORIAL\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Tutorial.Classrom;		     
							EventTutorial.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.StartingTime;
							EventTutorial.end	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Tutorial.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day+j;
							var EventLaboratory = {};
							
							EventLaboratory.title 	= ScheduleSequenceList[ScheduleNumber][i].Number+" LABORATORY\n\r"+"\n\r"+ScheduleSequenceList[ScheduleNumber][i].Laboratory.Classrom;		     
							EventLaboratory.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.StartingTime;
							EventLaboratory.end		= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ScheduleSequenceList[ScheduleNumber][i].Laboratory.EndTime;
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
							var DayOfTheWeek=FirsMondayOfTheWeekDate._day + j;
							var EventConstraints = {};
							
							EventConstraints.title 	= ConstraintList[i].Name;		     
							EventConstraints.start	= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ConstraintList[i].StartingTime;
							EventConstraints.end		= FirsMondayOfTheWeekDate._year+"-"+FirsMondayOfTheWeekDate._month+"-"+DayOfTheWeek+" "+ConstraintList[i].EndingTime;
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
		
		if(GetStudentIsLoggedIn() == true)
		{	
			var StudentTakenCourse=GetStudentCourseList();
			var StudentLeftToTake=GetStudentCourseLeftToTakeInThisSemester();
			var StudentCannotTake = GetStudentCourseCannotTake();
		}
		//alert("Selected Term:"+SelectedTerm);		
		//Populate the CoreEngineering Tab				
		for (var i=0; i < LocalCourseCoreEngineering.length ; i++) 
		{				
			if(GetStudentIsLoggedIn() == true)
			{	
				for (var j=0; j < StudentTakenCourse.length ; j++) 
				{					
					if(LocalCourseCoreEngineering[i].Number == StudentTakenCourse[j].Number)
					{
						break;
					}
				}
				
				//nothing was not found
				if(j == StudentTakenCourse.length)
				{
					
					for (var j=0; j < StudentLeftToTake.length ; j++) 
					{					
						if(LocalCourseCoreEngineering[i].Number == StudentLeftToTake[j].Number)
						{
							break;
						}
					}
					
					//nothing was not found
					if(j == StudentLeftToTake.length)
					{
						
							for (var j=0; j < StudentCannotTake.length ; j++) 
							{					
								if(LocalCourseCoreEngineering[i].Number == StudentCannotTake[j].Number)
								{
									break;
								}
							}
														
							if(j == StudentTakenCourse.length)
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
								//$(HtmlCode).appendTo("#"+ElementID);		
							}
							else
							{
								HtmlCode = ""; 
							
								HtmlCode +='<li class="disabled" title="' + LocalCourseCoreEngineering[i].Description + '">';
								HtmlCode +='<input value="' +LocalCourseCoreEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseCoreEngineering[i].Number + '">';
								HtmlCode +='<label for="ID' + LocalCourseCoreEngineering[i].Number + '">';
								HtmlCode +='<dfn>' + LocalCourseCoreEngineering[i].Number + '</dfn>';
								HtmlCode +='</label>';
								HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
								HtmlCode +='</li>';
								//alert(HtmlCode);
							
								//Append Course	
								//$(HtmlCode).appendTo("#"+ElementID);										
							}		
						
					}
					else
					{
						HtmlCode = ""; 
				
						HtmlCode +='<li class="hasprerequisite" title="' + LocalCourseCoreEngineering[i].Description + '">';
						HtmlCode +='<input value="' +LocalCourseCoreEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseCoreEngineering[i].Number + '">';
						HtmlCode +='<label for="ID' + LocalCourseCoreEngineering[i].Number + '">';
						HtmlCode +='<dfn>' + LocalCourseCoreEngineering[i].Number + '</dfn>';
						HtmlCode +='</label>';
						HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
						HtmlCode +='</li>';
						//alert(HtmlCode);
					
						//Append Course	
						
					}
					
				}
				else
				{
					HtmlCode = ""; 
			
					HtmlCode +='<li class="taken" title="' + LocalCourseCoreEngineering[i].Description + '">';
					HtmlCode +='<input value="' +LocalCourseCoreEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseCoreEngineering[i].Number + '">';
					HtmlCode +='<label for="ID' + LocalCourseCoreEngineering[i].Number + '">';
					HtmlCode +='<dfn>' + LocalCourseCoreEngineering[i].Number + '</dfn>';
					HtmlCode +='</label>';
					HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
					HtmlCode +='</li>';
					//alert(HtmlCode);
				
					//Append Course	
					//$(HtmlCode).appendTo("#"+ElementID);
				}
				
				
				
				$(HtmlCode).appendTo("#"+ElementID);
			}
			else
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
			}
		
		}
	
		/*for (var i=0; i < LocalCourseCoreEngineering.length ; i++) 
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
			  
		};*/
			
	}
	
	if(ElementID == "ULIDFieldEngineering")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseFieldEngineering = GetCourseListFieldEngineering();
		if(GetStudentIsLoggedIn() == true)
		{	
			var StudentTakenCourse=GetStudentCourseList();
			var StudentLeftToTake=GetStudentCourseLeftToTakeInThisSemester();
			var StudentCannotTake = GetStudentCourseCannotTake();
		}
		for (var i=0; i < LocalCourseFieldEngineering.length ; i++) 
		{		
			if(GetStudentIsLoggedIn() == true)
			{	
							
				for (var j=0; j < StudentTakenCourse.length ; j++) 
				{					
					if(LocalCourseFieldEngineering[i].Number == StudentTakenCourse[j].Number)
					{
						break;
					}
				}
				
				//nothing was found
				if(j == StudentTakenCourse.length)
				{
					for (var j=0; j < StudentLeftToTake.length ; j++) 
					{					
						if(LocalCourseFieldEngineering[i].Number == StudentLeftToTake[j].Number)
						{
							break;
						}
					}
					
					//nothing was not found
					if(j == StudentLeftToTake.length)
					{
							for (var j=0; j < StudentCannotTake.length ; j++) 
							{					
								if(LocalCourseFieldEngineering[i].Number == StudentCannotTake[j].Number)
								{
									break;
								}
							}
														
							if(j == StudentTakenCourse.length)
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
								//$(HtmlCode).appendTo("#"+ElementID);		
							}
							else
							{
								HtmlCode = ""; 
							
								HtmlCode +='<li class="disabled" title="' + LocalCourseFieldEngineering[i].Description + '">';
								HtmlCode +='<input value="' +LocalCourseFieldEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldEngineering[i].Number + '">';
								HtmlCode +='<label for="ID' + LocalCourseFieldEngineering[i].Number + '">';
								HtmlCode +='<dfn>' + LocalCourseFieldEngineering[i].Number + '</dfn>';
								HtmlCode +='</label>';
								HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
								HtmlCode +='</li>';
								//alert(HtmlCode);
							
								//Append Course	
								//$(HtmlCode).appendTo("#"+ElementID);										
							}		
					}
					else
					{
						HtmlCode = ""; 
				
						HtmlCode +='<li class="hasprerequisite" title="' + LocalCourseFieldEngineering[i].Description + '">';
						HtmlCode +='<input value="' +LocalCourseFieldEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldEngineering[i].Number + '">';
						HtmlCode +='<label for="ID' + LocalCourseFieldEngineering[i].Number + '">';
						HtmlCode +='<dfn>' + LocalCourseFieldEngineering[i].Number + '</dfn>';
						HtmlCode +='</label>';
						HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
						HtmlCode +='</li>';
						//alert(HtmlCode);
					
						//Append Course	
						
					}
				}
				else
				{
					HtmlCode = ""; 
			
					HtmlCode +='<li class="taken" title="' + LocalCourseFieldEngineering[i].Description + '">';
					HtmlCode +='<input value="' +LocalCourseFieldEngineering[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldEngineering[i].Number + '">';
					HtmlCode +='<label for="ID' + LocalCourseFieldEngineering[i].Number + '">';
					HtmlCode +='<dfn>' + LocalCourseFieldEngineering[i].Number + '</dfn>';
					HtmlCode +='</label>';
					HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
					HtmlCode +='</li>';
					//alert(HtmlCode);
				
					//Append Course	
					//$(HtmlCode).appendTo("#"+ElementID);
				}
				
				
				$(HtmlCode).appendTo("#"+ElementID);	
			}
			else
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
			}
		
			//if found tag the course as taken
			//otherwise tag it as normal
		
		}
	
		
		
		//Populate the CoreEngineering Tab				
		/*for (var i=0; i < LocalCourseFieldEngineering.length ; i++) 
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
			  
		};*/
		
		
	}
	
	if(ElementID == "ULIDOption")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseFieldOption = GetCourseListOption();
		
		if(GetStudentIsLoggedIn() == true)
		{	
			var StudentTakenCourse=GetStudentCourseList();
			var StudentLeftToTake=GetStudentCourseLeftToTakeInThisSemester();
			var StudentCannotTake = GetStudentCourseCannotTake();
		}
		
		for (var i=0; i < LocalCourseFieldOption.length ; i++) 
		{	
			if(GetStudentIsLoggedIn() == true)
			{					
				for (var j=0; j < StudentTakenCourse.length ; j++) 
				{					
					if(LocalCourseFieldOption[i].Number == StudentTakenCourse[j].Number)
					{
						break;
					}
				}
						
				
				//nothing was found
				if(j == StudentTakenCourse.length)
				{
					for (var j=0; j < StudentLeftToTake.length ; j++) 
					{					
						if(LocalCourseFieldOption[i].Number == StudentLeftToTake[j].Number)
						{
							break;
						}
					}
					
					//nothing was not found
					if(j == StudentLeftToTake.length)
					{
							for (var j=0; j < StudentCannotTake.length ; j++) 
							{					
								if(LocalCourseFieldOption[i].Number == StudentCannotTake[j].Number)
								{
									break;
								}
							}
														
							if(j == StudentTakenCourse.length)
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
								//$(HtmlCode).appendTo("#"+ElementID);		
							}
							else
							{
								HtmlCode = ""; 
							
								HtmlCode +='<li class="disabled" title="' + LocalCourseFieldOption[i].Description + '">';
								HtmlCode +='<input value="' +LocalCourseFieldOption[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldOption[i].Number + '">';
								HtmlCode +='<label for="ID' + LocalCourseFieldOption[i].Number + '">';
								HtmlCode +='<dfn>' + LocalCourseFieldOption[i].Number + '</dfn>';
								HtmlCode +='</label>';
								HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
								HtmlCode +='</li>';
								//alert(HtmlCode);
							
								//Append Course	
								//$(HtmlCode).appendTo("#"+ElementID);										
							}		
					}
					else
					{
						HtmlCode = ""; 
				
						HtmlCode +='<li class="hasprerequisite" title="' + LocalCourseFieldOption[i].Description + '">';
						HtmlCode +='<input value="' +LocalCourseFieldOption[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldOption[i].Number + '">';
						HtmlCode +='<label for="ID' + LocalCourseFieldOption[i].Number + '">';
						HtmlCode +='<dfn>' + LocalCourseFieldOption[i].Number + '</dfn>';
						HtmlCode +='</label>';
						HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
						HtmlCode +='</li>';
						//alert(HtmlCode);
					
						//Append Course	
						
					}
				}
				else
				{
					HtmlCode = ""; 
			
					HtmlCode +='<li class="taken" title="' + LocalCourseFieldOption[i].Description + '">';
					HtmlCode +='<input value="' +LocalCourseFieldOption[i].Number + '" type="checkbox" id="ID' + LocalCourseFieldOption[i].Number + '">';
					HtmlCode +='<label for="ID' + LocalCourseFieldOption[i].Number + '">';
					HtmlCode +='<dfn>' + LocalCourseFieldOption[i].Number + '</dfn>';
					HtmlCode +='</label>';
					HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
					HtmlCode +='</li>';
					//alert(HtmlCode);
				
					//Append Course	
					//$(HtmlCode).appendTo("#"+ElementID);
				}
				
				
				$(HtmlCode).appendTo("#"+ElementID);	
			}
			else
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
			}
		
			//if found tag the course as taken
			//otherwise tag it as normal
		
		}
	
				
		/*//Populate the CoreEngineering Tab				
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
		*/	 
		
	}
	
	if(ElementID == "ULIDElective")
	{
		$("#"+ElementID).empty();
		$("ULIDSelection").empty();
		
		var LocalCourseElectives = GetCourseListElectives();
		
		if(GetStudentIsLoggedIn() == true)
		{	
			var StudentTakenCourse=GetStudentCourseList();
			var StudentLeftToTake=GetStudentCourseLeftToTakeInThisSemester();
			var StudentCannotTake = GetStudentCourseCannotTake();
		}
		
		for (var i=0; i < LocalCourseElectives.length ; i++) 
		{	
			if(GetStudentIsLoggedIn() == true)
			{					
				for (var j=0; j < StudentTakenCourse.length ; j++) 
				{					
					if(LocalCourseElectives[i].Number == StudentTakenCourse[j].Number)
					{
						break;
					}
				}
			
			
							
				//nothing was found
				if(j == StudentTakenCourse.length)
				{
					for (var j=0; j < StudentLeftToTake.length ; j++) 
					{					
						if(LocalCourseElectives[i].Number == StudentLeftToTake[j].Number)
						{
							break;
						}
					}
					
					//nothing was not found
					if(j == StudentLeftToTake.length)
					{
							for (var j=0; j < StudentCannotTake.length ; j++) 
							{					
								if(LocalCourseElectives[i].Number == StudentCannotTake[j].Number)
								{
									break;
								}
							}
														
							if(j == StudentTakenCourse.length)
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
								//$(HtmlCode).appendTo("#"+ElementID);		
							}
							else
							{
								HtmlCode = ""; 
							
								HtmlCode +='<li class="disabled" title="' + LocalCourseElectives[i].Description + '">';
								HtmlCode +='<input value="' +LocalCourseElectives[i].Number + '" type="checkbox" id="ID' + LocalCourseElectives[i].Number + '">';
								HtmlCode +='<label for="ID' + LocalCourseElectives[i].Number + '">';
								HtmlCode +='<dfn>' + LocalCourseElectives[i].Number + '</dfn>';
								HtmlCode +='</label>';
								HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
								HtmlCode +='</li>';
								//alert(HtmlCode);
							
								//Append Course	
								//$(HtmlCode).appendTo("#"+ElementID);										
							}		
					}
					else
					{
						HtmlCode = ""; 
				
						HtmlCode +='<li class="hasprerequisite" title="' + LocalCourseElectives[i].Description + '">';
						HtmlCode +='<input value="' +LocalCourseElectives[i].Number + '" type="checkbox" id="ID' + LocalCourseElectives[i].Number + '">';
						HtmlCode +='<label for="ID' + LocalCourseElectives[i].Number + '">';
						HtmlCode +='<dfn>' + LocalCourseElectives[i].Number + '</dfn>';
						HtmlCode +='</label>';
						HtmlCode +='<a class="checkbox-select" href="#DivIDTabs"></a>';
						HtmlCode +='</li>';
						//alert(HtmlCode);
					
						//Append Course	
						
					}
				}
				else
				{
					HtmlCode = ""; 
			
					HtmlCode +='<li class="taken" title="' + LocalCourseElectives[i].Description + '">';
					HtmlCode +='<input value="' +LocalCourseElectives[i].Number + '" type="checkbox" id="ID' + LocalCourseElectives[i].Number + '">';
					HtmlCode +='<label for="ID' + LocalCourseElectives[i].Number + '">';
					HtmlCode +='<dfn>' + LocalCourseElectives[i].Number + '</dfn>';
					HtmlCode +='</label>';
					HtmlCode +='<a class="checkbox-disabled" href="#DivIDTabs"></a>';
					HtmlCode +='</li>';
					//alert(HtmlCode);
				
					//Append Course	
					//$(HtmlCode).appendTo("#"+ElementID);
				}
				
				
				$(HtmlCode).appendTo("#"+ElementID);	
			}
			else
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
			}
		
			//if found tag the course as taken
			//otherwise tag it as normal
		
		}
			
		/*//Populate the CoreEngineering Tab				
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
			  
		};*/
		
	}
	
	//Buttons Update
	if(ElementID == "ButtonIDFall")
	{
		//alert("#"+ElementID);	
		
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
		//alert("#"+ElementID);	
		
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