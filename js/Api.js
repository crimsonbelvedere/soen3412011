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

function FindFirstMondayOfTheWeek()
{
	//set the day of the calendar to monday
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
	}
	else if(DayNumber < 1)
	{
		FirtMondayOfThisWeek = DateNumber + DayNumber + 1;
	}
	else
	{
		FirtMondayOfThisWeek = DateNumber ;	
	}
	
	
	return FirtMondayOfThisWeek;
	*/
	
	//Get the current date
	var Calendar 	=	$.calendars.instance(); 
	var CurrentDate =	Calendar.today();
	var JulianDate 	= 	CurrentDate.toJD();
	var DayOfWeek	=	Calendar.dayOfWeek(CurrentDate); 
	var JulianDateModay = JulianDate - ( DayOfWeek - 1 );
	var MondayDate = Calendar.fromJD(JulianDateModay);
	
	return MondayDate;
	//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 12:15:00");
	//alert(YearNumber+"-"+MonthNumber+"-"+FirtMondayOfThisWeek+" 13:00:00");
}
function SlidergetTime(hours, minutes) {
  var time = null;
  minutes = minutes + "";

  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}
function Daystr(days) 
{ 
	//alert("gogogogo");
	var weekday = new Array();
	for (var i=0;i<days.length;i++)
	{
		if (days.charAt(i)=='-')
		{
			weekday[i]=0;
		}
		else
		weekday[i]=1;
	}
	return weekday;
}

function Timestr(timestring)
{
	var str = timestring;
	var time = str.split(":");
	time[0]=parseInt(time[0],10);
	time[1]=parseInt(time[1],10);
	return time;
	
}
function CompareDay(days1, days2)
{
	var week1 = Daystr(days1);
	var week2 = Daystr(days2);
	for(var j=0; j<week1.length ;j++)
	{
		if (week1[j]== 1 && week2[j]== 1)
		{
			return true;
		}
	}
	return false;
}
function CompareTime(Time1, Time2)
{
	var TimeArr1 = Timestr(Time1);
	var TimeArr2 = Timestr(Time2);
	//alert(TimeArr1+", "+TimeArr2)
	if((TimeArr1[0] < TimeArr2[0]))
	{
		return -1;
	}
	else if ((TimeArr1[0] == TimeArr2[0]))
	{
		if( TimeArr1[1] < TimeArr2[1])
		return -1;
		else if(TimeArr1[1] == TimeArr2[1])
		return 0;
		else if(TimeArr1[1] > TimeArr2[1])
		return 1;
	}
	else if ((TimeArr1[0] > TimeArr2[0]))
	{
		return 1;
	}
}

