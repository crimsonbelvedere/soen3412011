
function FilterCompleteCourseSectionTable(TemporaryScheduleSequence)
{
	//Remove colliding section courses
	//backup the temporary schedule
	var IndexToRemove= new Array();
	for (var p=0; p < TemporaryScheduleSequence.length; p++) 
	{
	  
	  	if(TemporaryScheduleSequence[p].length > 1)
	  	{
		  	for (var j=0; j < TemporaryScheduleSequence[p].length - 1; j++) 
		  	{
			
				for (var k=j+1; k < TemporaryScheduleSequence[p].length; k++) 
				{
					//Compare course [j] and [k]
					//if there is a time conflict remove the schedule from selection.
					if(IsSectionTimeConfict(TemporaryScheduleSequence[p][j],TemporaryScheduleSequence[p][k]) == true || IsConstraintsTimeConflict(TemporaryScheduleSequence[p][j]) == true || IsConstraintsTimeConflict(TemporaryScheduleSequence[p][k]) == true )
					{
						//alert("Remove schedule from temporary list.");
						IndexToRemove.push(p);		
											
						//break the two loops this schedule is void.
						k=TemporaryScheduleSequence[p].length;
						j=TemporaryScheduleSequence[p].length - 1;					
					}
					
					
				}
		 
		 	}
	 	}
	 	else
	 	{
 			//Compare course [j] and [k]
			//if there is a time conflict remove the schedule from selection.
			if(IsConstraintsTimeConflict(TemporaryScheduleSequence[p][0]) == true )
			{
				//alert("Remove schedule from temporary list.");
				IndexToRemove.push(p);												
			}
			

	 	}
	  
	}
	// tag incompleted schedule.
	for (var p=0; p < TemporaryScheduleSequence.length; p++) 
	{
		if(TemporaryScheduleSequence[p].length != CompleteCourseSectionTable.length)
		{
			IndexToRemove.push(p);	
		}
	}

	for (var p=0; p < IndexToRemove.length; p++) 
	{
		delete TemporaryScheduleSequence[IndexToRemove[p]];
	}
	
	var MaximumScheduleSize = TemporaryScheduleSequence.length;
	for (var p=0; p < MaximumScheduleSize; p++) 
	{
		if(TemporaryScheduleSequence[p] === undefined)
		{
			TemporaryScheduleSequence.splice(p,1);
		}
	}
	
	//clean up the array
	TemporaryScheduleSequence = TemporaryScheduleSequence.filter(function(){return true});	
	
	return TemporaryScheduleSequence;		
	
}


function AddSection(SingleSchedule,CourseIndex,FullSchedule)
{
	var CompleteCourseSectionTable = GetCompleteCourseSectionTable();
	
	if(CompleteCourseSectionTable.length > 0)
	{
		for (var i=0; i < CompleteCourseSectionTable[CourseIndex].length; i++) 
		{
			var CopySchedule = SingleSchedule.slice();
			
			if(CourseIndex < CompleteCourseSectionTable.length - 1)
			{
				SingleSchedule.push(CompleteCourseSectionTable[CourseIndex][i]);		
				AddSection(SingleSchedule,CourseIndex+1,FullSchedule);
			}
			else
			{
				
				SingleSchedule.push(CompleteCourseSectionTable[CourseIndex][i]);
				FullSchedule.push(SingleSchedule);
			}
			
			SingleSchedule = CopySchedule.slice();
		}
	}	
	return FullSchedule;
}


function SolveCompleteCourseSectionTable()
{
	
	var FullSchedule = new Array();
	var SingleSchedule = new Array();
	
	var CompleteCourseSectionTable = GetCompleteCourseSectionTable();

	for (var i=0; i < CompleteCourseSectionTable.length; i++) 
	{
		//alert("Maximum number of section:"+CompleteCourseSectionTable[i].length);
	}	
	//Recursive function to generate all schedules.
	AddSection(SingleSchedule,0,FullSchedule); 
	
	FullSchedule = FilterCompleteCourseSectionTable(FullSchedule);
	
	SetScheduleList(FullSchedule);	
	
	
}

function GenerateCourseSectionList(Course)
{
	//alert("Generate all possible section from a course");	
	
	var CourseSectionList = new Array();
	
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		if(Course.TutorialArray.length > 0)
		{
			for (var k=0; k < Course.TutorialArray.length ; k++) 
			{
				
				if(Course.LaboratoryArray.length > 0)
				{
					for (var l=0; l < Course.LaboratoryArray.length ; l++) 
					{
						var CourseSection = {};
						CourseSection.Number				=	Course.Number;
						CourseSection.Description		=	Course.Description;
						CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
						
						CourseSection.Lecture		=	Course.LectureArray[j];
						CourseSection.Tutorial		=	Course.TutorialArray[k];
						CourseSection.Laboratory	=	Course.LaboratoryArray[l];		
										
						CourseSectionList.push(CourseSection);
					}
				}
				else
				{
					var CourseSection = {};
					CourseSection.Number				=	Course.Number;
					CourseSection.Description		=	Course.Description;
					CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
					
					CourseSection.Lecture		=	Course.LectureArray[j];
					CourseSection.Tutorial		=	Course.TutorialArray[k];
					CourseSectionList.push(CourseSection);
					
				}
			}
		}
		else
		{
			var CourseSection = {};
			CourseSection.Number				=	Course.Number;
			CourseSection.Description		=	Course.Description;
			CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
			
			CourseSection.Lecture		=	Course.LectureArray[j];	
			CourseSectionList.push(CourseSection);
		}
		
	}
	return CourseSectionList;
	
	
/*	var CourseSectionList = new Array();
	
	for (var j=0; j < Course.LectureArray.length; j++) 
	{
		if(Course.LectureArray[j].TutorialArray.length > 0)
		{
			for (var k=0; k < Course.LectureArray[j].TutorialArray.length ; k++) 
			{				
				if(Course.LectureArray[j].LaboratoryArray.length > 0)
				{
					for (var l=0; l < Course.LectureArray[j].LaboratoryArray.length ; l++) 
					{
						var CourseSection = {};
						CourseSection.Number			=	Course.Number;
						CourseSection.Description		=	Course.Description;
						CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
						
						CourseSection.Lecture		=	Course.LectureArray[j];
						CourseSection.Tutorial		=	Course.LectureArray[j].TutorialArray[k];
						CourseSection.Laboratory	=	Course.LectureArray[j].LaboratoryArray[l];		
										
						CourseSectionList.push(CourseSection);
					}
				}
				else
				{
					var CourseSection = {};
					CourseSection.Number				=	Course.Number;
					CourseSection.Description		=	Course.Description;
					CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
					
					CourseSection.Lecture		=	Course.LectureArray[j];
					CourseSection.Tutorial		=	Course.TutorialArray[k].TutorialArray[k];
					
					CourseSectionList.push(CourseSection);				
				}
			
			}
		}
		else
		{
			var CourseSection = {};
			CourseSection.Number				=	Course.Number;
			CourseSection.Description		=	Course.Description;
			CourseSection.NumberOfCredits	=	Course.NumberOfCredits;
			
			CourseSection.Lecture		=	Course.LectureArray[j];	
			CourseSectionList.push(CourseSection);
		}
		
	}
	
	return CourseSectionList;
*/
}
