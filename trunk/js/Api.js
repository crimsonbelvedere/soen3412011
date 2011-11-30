function FindFirstMondayOfTheWeek()
{
	//set the day of the calendar to monday
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
	
	return FirtMondayOfThisWeek;
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

