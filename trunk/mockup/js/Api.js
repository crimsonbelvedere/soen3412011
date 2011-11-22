
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
	time[0]=parseInt(time[0]);
	time[1]=parseInt(time[1]);
	return time;
	
}
function CompareDay(days1, days2)
{
	var week1 = Daystr(days1);
	var week2 = Daystr(days2);
	for(var j=0; j<week1.size;j++)
	{
		if (week1[j]==week2[j])
		{}
		else
		return false;
	}
	return true;
}
function CompareTime(Time1, Time2)
{
	var TimeArr1 = Timestr(Time1);
	var TimeArr2 = Timestr(Time2);
	alert(TimeArr1+", "+TimeArr2)
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

