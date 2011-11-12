
function TimeToMs(TimeString) 
{ 
	var d = new Date;
	d.setTime(Date.parse(TimeString));
	return d.toUTCString();
}


function CompareTime(TimeString1, TimeString2)
{
	if(TimeToMs(TimeString1) < TimeToMs(TimeString2))
	{
		return -1;
	}
	else if (TimeToMs(TimeString1) == TimeToMs(TimeString2)) 
	{
		return 0;
	}
	else if (TimeToMs(TimeString1) > TimeToMs(TimeString2)) 
	{
		return 1;
	}
	
}

