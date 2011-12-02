<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

		<title>SOEN 341 Planner</title>

		<!-- CSS section -->
		<link rel="stylesheet" type="text/css" href="css/vader/jquery-ui-1.8.16.custom.css">
		<link rel="stylesheet" type="text/css" href="css/jquery.ui.selectmenu.css">
		<link rel="stylesheet" type="text/css" href="css/custom.css">
		<link rel="stylesheet" type="text/css" href="css/fullcalendar.css">
		<link rel="stylesheet" type="text/css" href="css/fullcalendar.print.css" media="print">
		<!-- CSS section -->


		<!-- Javascript section -->
		<script src="js/jquery-1.6.4.min.js"></script>
		<script src="http://cdn.jquerytools.org/1.2.6/full/jquery.tools.min.js"></script>
		<script src="js/jquery-ui-1.8.16.custom.min.js"></script>
		<script src="js/jquery.ui.core.js"></script>
		<script src="js/jquery.ui.widget.js"></script>
		<script src="js/jquery.ui.button.js"></script>
		<script src="js/jquery.ui.mouse.js"></script>
		<script src="js/jquery.ui.slider.js"></script>
		<script src="js/jquery.ui.position.js"></script>
		<script src="js/jquery.ui.tooltip.js"></script>
		<script src="js/jquery.ui.selectmenu.js"></script>
		<script src="js/jquery.calendars.package-1.1.4/jquery.calendars.js"></script>
		<script src="js/jquery.calendars.package-1.1.4/jquery.calendars.plus.js"></script>
		
		<script src="js/fullcalendar.min.js"></script>
		<!--<script src="js/custom.js"></script>-->
		<script src="js/Api.js"></script>
		<script src="js/Scheduler.js"></script>
		
		<script type="text/javascript">
		//Create Tabs using JQuery
		$(function() {


		$( "#DivIDTabs" ).tabs();


        //Create navigation buttons using jQuery
        $(function() {
    		$( "#ButtonIDBack" )
    			.button( {
    					text: false,
    					icons: {
    						primary: "ui-icon-circle-triangle-w"
    					}
    				})
    			.next()
    				.button( {
    					text: false,
    					icons: {
    						primary: "ui-icon-circle-triangle-e"
    					}
    				})
    				.parent()
    					.buttonset();
    	});

		//Create Slider using JQuery

        $( "#slider-range" ).slider({
			range: true,
            min: 525,
            max: 1350,
			values: [ 600, 1200 ],
			step: 15,
			slide: function(event, ui) {

			    SetLeftSliderMinute(parseInt(ui.values[0] % 60));
			    var LeftSliderHour = parseInt(ui.values[0] / 60 % 24);
			    if(LeftSliderHour < 10)
			    {
			    	LeftSliderHour="0"+LeftSliderHour;
			   	}
                SetLeftSliderHour(LeftSliderHour);

                SetRigthSliderMinute(parseInt(ui.values[1] % 60));
                var RigthSliderHour = parseInt(ui.values[1] / 60 % 24);
			    if(RigthSliderHour < 10)
			    {
			    	RigthSliderHour="0"+RigthSliderHour;
			   	}
                SetRigthSliderHour(RigthSliderHour);

                $("#DivIDTime").text(SlidergetTime(GetLeftSliderHour(), GetLeftSliderMinute()) + ' - ' + SlidergetTime(GetRigthSliderHour(), GetRigthSliderMinute()));
            }
		});
        //http://marcneuwirth.com/blog/2010/02/21/using-a-jquery-ui-slider-to-select-a-time-range/
		SetLeftSliderMinute(parseInt(600 % 60));
        SetLeftSliderHour(parseInt(600 / 60 % 24));
        SetRigthSliderMinute(parseInt(1200 % 60));
        SetRigthSliderHour(parseInt(1200 / 60 % 24));
        $("#DivIDTime").text(SlidergetTime(GetLeftSliderHour(), GetLeftSliderMinute()) + ' - ' + SlidergetTime(GetRigthSliderHour(), GetRigthSliderMinute()));


       		//var FirtMondayOfThisWeek = FindFirstMondayOfTheWeek();

			//Create Calendar using JQuery
			$('#calendar').fullCalendar({
			theme: true,
			header: {
				left: '',
				center: '',
				right: ''
			},
			contentHeight: 1200,
			columnFormat: 'ddd',
			titleFormat: '',
			allDaySlot: false,
			defaultView: 'agendaWeek',
			slotMinutes: 15,
			minTime:'8:45',
			maxTime: '22:30',
			weekends: false,
			editable: true,
			eventSources:
			[
	        // your event source
	        //Must put the first 0 digit if the number is less than 10., 08:45:00
	        	/*{
		            events:
		            [
					    {
					        title  : 'ENGR233\n\rDR HOLO\n\r H-535',
					        start  : "2011"+"-"+"11"+"-"+FirtMondayOfThisWeek+" 08:45:00",
					        end	   : "2011"+"-"+"11"+"-"+FirtMondayOfThisWeek+" 22:30:00",
					        allDay : false // will make the time show
					    }
					],
					color: 'white',     // an option!
            		textColor: 'red' // an option!
				}*/
			]
			});

			$('#calendar').fullCalendar( 'removeEvents').fullCalendar('removeEventSources');  //Removes all event sources

			SetScheduleNumber(0);

			//Create SelectMenu using JQuery
			$('.selectDrop').selectmenu();


		});
		</script>

		<script src="js/Controller.js"></script>
		<script src="js/Model.js"></script>
		<script src="js/View.js"></script>

		<!-- Javascript section -->


	</head>

	<body class="Body">
	<div id="DivIDTopbanner"></div>
	

	
	<div id="DivIDContent" class="CssContent ui-corner-bottom">
		
		<div id="DivIDLogin" class="DivIDLoginLogoutVisible">			
			<form>
				<dfn id="DfnIDUserName" >User name: </dfn><input type="text" id="InputIDUserName" name="NameUserName"/>
				<br></br>
				<dfn id="DfnIDPassword" >Password: </dfn><input type="password" id="InputIDPassword" name="NamePassword"/>
				<br></br>
			</form>
		</div>
		
		<div id="DivIDLogout" class="DivIDLoginLogoutHidden">			
			<dfn id="DfnIDWelcome" >Welcome </dfn><dfn id="DfnIDStudentName" ></dfn>			
			<button id="ButtonIDLogOut" class="logfg-button ui-state-default ui-corner-all">Log out</button>	
		</div>
		
		<div id="DivIDSelectFieldSets">
			<fieldset id="FieldSetIDSelectFieldSets" class="ui-corner-all gray-border ">
				<legend id="LegendIDSelectProgram" class="CssLegend">Select program</legend>

				<select id="SelectIDFaculty"  class=" DropdownProgram selectDrop">

					<option id="OptionIDFacultyNone" value="None">
					---Choose a faculty---
					</option>

					<option id="OptionIDENCS" value="Engineering and Computer Science">
					Engineering and Computer Science
					</option>
				</select>

				<select id="SelectIDDepartment"  class=" DropdownProgram selectDrop">

					<option id="OptionIDDepartmentNone" value="None">
					---Choose a department---
					</option>

					<option id="OptionIDSOEN" value="Computer Science and Software Engineering" >
					Computer Science and Software Engineering
					</option>
				</select>

				<select id="SelectIDProgram"  class="DropdownProgram  selectDrop">

					<option id="OptionIDProgramNone" value="None">
					---Choose a program---
					</option>


					<option id="OptionIDBSOENENG" value="BEng in Software Engineering" >
					BEng in Software Engineering
					</option>
				</select>

			</fieldset>
		</div>


		<div id="DivIDTerm">
			<fieldset id="FieldSetIDTerm" class="ui-corner-all gray-border">
    			<legend id="LegendIDTerm" class="CssLegend">Select term</legend>
    			<div class="fg-buttonset fg-buttonset-single ui-helper-clearfix">
    				<!--<button id="ButtonIDFall" value="1" class="fg-button ui-state-default ui-state-active ui-priority-primary ui-corner-left">Fall</button>-->
    				<button id="ButtonIDFall" value= 2 class="fg-button ui-state-default ui-priority-primary ui-corner-left">Fall</button>
    				<button id="ButtonIDWinter" value= 4 class="fg-button ui-state-default ui-priority-primary ui-corner-right">Winter</button>
    				<!--<button id="ButtonIDSummer" value="Summer" class="fg-button ui-state-default ui-priority-primary ui-corner-right">Summer</button>-->
    			</div>
			</fieldset>
		</div>

		<!--<div id="DivIDStudentInfo">
			<fieldset id="FieldSetIDStudentInfo" class="ui-corner-all gray-border">
				<legend id="LegendIDStudentInfo" class="CssLegend">Student information</legend>
					<dfn id="DfnIDStudentName">Name:</dfn>
					<br></br>
					<dfn id="DfnIDStudentProgram">Program:</dfn>
					<br></br>
					<dfn id="DfnIDStudentOption">Option:</dfn>
					<br></br>
			</fieldset>
		</div>-->

	
	
	

<!--		<div id="DivIDTerm">
			<fieldset id="FieldSetIDTerm" class="ui-corner-all gray-border">
    			<legend id="LegendIDTerm" class="CssLegend">Select term</legend>
    			<div class="fg-buttonset fg-buttonset-single ui-helper-clearfix">
    				<button id="ButtonIDFall" value="Fall" class="fg-button ui-state-default ui-priority-primary ui-corner-left">Fall</button>
    				<button id="ButtonIDWinter" value="Winter" class="fg-button ui-state-default ui-priority-primary ui-corner-right">Winter</button>
    			</div>
			</fieldset>
		</div>-->


		<br style="clear:both"></br>

		<fieldset id="FieldSetIDTabs"  class="ui-corner-all">
		<legend id="LegendIDTabs" class="CssLegend">Course selector</legend>
			<div id="DivIDTabs">

				<ul id="ULIDTabs">
					<li><a href="#DivIDCoreEngineering">Core courses</a></li>
					<li><a href="#DivIDOption">Options</a></li>
					<li><a href="#DivIDElective">Electives</a></li>
				</ul>

				<div id="DivIDCoreEngineering">

					<fieldset id="FieldSetIDCoreEngineering"  class="ui-corner-all">
						<legend id="LegendIDCoreEngineering" class="CssLegend">Engineering</legend>
						<ul id="ULIDCoreEngineering" class="checklist">

						<br style="clear:both"></br>
						<br style="clear:both"></br>
						<br style="clear:both"></br>
							<!-- ADD COURSES HERE-->
							<!--<li class = "hasprerequisite" title="Principles of Electrical Engineering/nFundamentals of electric circuits: Kirchoff’s laws, voltage and current sources, Ohm’s law, series and parallel circuits. Nodal and mesh analysis of DC circuits. Superposition theorem, Thevenin and Norton Equivalents. Use of operational amplifiers. Transient analysis of simple RC, RL and RLC circuits. Steady state analysis: Phasors and impedances, power and power factor. Single and three phase circuits. Magnetic circuits and transformers. Power generation and distribution.">
								<input value="ELEC 275" type="checkbox" id="IDELEC275">
								<label for="IDELECT275">
									<dfn>ELEC 275</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>
							<li class = "taken" title="Principles of Electrical Engineering/nFundamentals of electric circuits: Kirchoff’s laws, voltage and current sources, Ohm’s law, series and parallel circuits. Nodal and mesh analysis of DC circuits. Superposition theorem, Thevenin and Norton Equivalents. Use of operational amplifiers. Transient analysis of simple RC, RL and RLC circuits. Steady state analysis: Phasors and impedances, power and power factor. Single and three phase circuits. Magnetic circuits and transformers. Power generation and distribution.">
								<input value="ELEC 275" type="checkbox" id="IDELEC275">
								<label for="IDELECT275">
									<dfn>ELEC 275</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>
							<li class = "disabled" title="Principles of Electrical Engineering/nFundamentals of electric circuits: Kirchoff’s laws, voltage and current sources, Ohm’s law, series and parallel circuits. Nodal and mesh analysis of DC circuits. Superposition theorem, Thevenin and Norton Equivalents. Use of operational amplifiers. Transient analysis of simple RC, RL and RLC circuits. Steady state analysis: Phasors and impedances, power and power factor. Single and three phase circuits. Magnetic circuits and transformers. Power generation and distribution.">
								<input value="ELEC 275" type="checkbox" id="IDELEC275">
								<label for="IDELECT275">
									<dfn>ELEC 275</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>
							<li class = "deselected" title="Principles of Electrical Engineering/nFundamentals of electric circuits: Kirchoff’s laws, voltage and current sources, Ohm’s law, series and parallel circuits. Nodal and mesh analysis of DC circuits. Superposition theorem, Thevenin and Norton Equivalents. Use of operational amplifiers. Transient analysis of simple RC, RL and RLC circuits. Steady state analysis: Phasors and impedances, power and power factor. Single and three phase circuits. Magnetic circuits and transformers. Power generation and distribution.">
								<input value="ELEC 275" type="checkbox" id="IDELEC275">
								<label for="IDELECT275">
									<dfn>ELEC 275</dfn>
								</label>
								<a class="checkbox-disabled" href="#"></a>
							</li>-->
							


						</ul>
					</fieldset>

					<fieldset id="FieldSetIDFieldEngineering" class="ui-corner-all" >
						<legend id="LegendIDFieldEngineering" class="CssLegend">Software engineering</legend>
						<ul id="ULIDFieldEngineering" class="checklist">

						<br style="clear:both"></br>
						<br style="clear:both"></br>
						<br style="clear:both"></br>
							<!-- ADD COURSES HERE-->
							<!--<li class="deselected" title="System Hardware description">
								<input value="SOEN228" type="checkbox" id="IDSOEN228">
								<label for="IDSOEN228">
									<dfn>SOEN 228</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>-->
						</ul>
					</fieldset>

				</div>


				<div id="DivIDOption" >
					<fieldset id="FieldSetIDOption" class="ui-corner-all">
						<legend id="LegendIDOption" class="CssLegend">Option courses</legend>
						<ul id="ULIDOption" class="checklist">

						<br style="clear:both"></br>
						<br style="clear:both"></br>
						<br style="clear:both"></br>
							<!-- ADD COURSES HERE-->
							<!-- <li class = "deselected"  title="Artificial Intelligence description">
								<input value="COMP 472" type="checkbox" id="IDCOMP472">
								<label for="IDCOMP472">
									<dfn>COMP 472</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>-->

						</ul>
					</fieldset>
				</div>


				<div id="DivIDElective">
					<fieldset id="FieldSetIDElective" class="ui-corner-all">
						<legend id="LegendIDElective" class="CssLegend">Electives</legend>
						<ul id="ULIDElective" class="checklist">

						<br style="clear:both"></br>
						<br style="clear:both"></br>
						<br style="clear:both"></br>
										<!-- ADD COURSES HERE-->
							<!-- <li class = "deselected"  title="Parallel programming description">
								<input value="COMP 428" type="checkbox" id="IDCOMP428">
								<label for="IDCOMP428">
									<dfn>COMP 428</dfn>
								</label>
								<a class="checkbox-select" href="#"></a>
							</li>-->

						</ul>
					</fieldset>
				</div>

			</div>

		</fieldset>

		<div id="DivIDSelection">
			<fieldset id="FieldSetIDSelectedCourses"  class="ui-corner-all">
				<legend id="LegendIDSelection" class="CssLegend">Selected courses</legend>
				<ul id="ULIDSelection" class="checklist">

				<br style="clear:both"></br>
				<br style="clear:both"></br>
				<br style="clear:both"></br>

					<!-- ADD SELECTED COURSES HERE-->
					<!--<li  class = "deselected" title="Parallel programming description">
						<input value="COMP 428" type="checkbox" id="IDCOMP428">
						<label for="IDCOMP428">
							<dfn>COMP 428</dfn>
						</label>
						<a class="checkbox-select" href="#"></a>
					</li>-->


				</ul>
			</fieldset>
		</div>


		<!--<div id="DivIDStatusInfo">
			<fieldset id="FieldSetIDStatusInfo" class="ui-corner-all">
			<legend id="LegendIDStatusInfo" class="CssLegend">Status Info</legend>
			<dfn>Program :</dfn>
			<br></br>
			<dfn>Number Of Credits :</dfn>
			<br></br>
			</fieldset>
		</div>-->


		<!--<div id="DivIDBrowseSchedule">
			<fieldset id="FieldSetIDBrowseSchedule" class="ui-corner-all">
			<legend id="LegendIDBrowseSchedule" class="CssLegend">Browse Schedule</legend>
			<label>Previous</label>
			<label>Next</label>
			</fieldset>
		</div>-->

		<fieldset id="FieldSetIDSchedule" class="ui-corner-all">
  			<legend id="LegendIDSchedule" class="CssLegend">Schedule</legend>

    		<div id="DivIDNavigation">
    				<button id="ButtonIDBack">Back</button>
    				<button id="ButtonIDForward">Forward</button>
    		</div>

            <div id="DivIDTitle" align="center">Schedule 0/0</div>


        	<div id="calendar"></div>


            <div id="DivIDConstraints" class="ui-corner-all">

            	<fieldset id="FieldSetIDConstraints" class="ui-corner-all gray-border center">
              		<legend id="LegendIDConstraints" class="CssLegend">Constraints</legend>

                	<div align="center">
                		<select id="SelectIDSelectDay" class="selectDrop margin10">
                  			<option value="M----">Monday</option>
                  			<option value="-T---">Tuesday</option>
                  			<option value="--W--">Wednesday</option>
                  			<option value="---T-">Thursday</option>
                  			<option value="----F">Friday</option>
                		</select>
                	</div>

              		<div id="DivIDTime" align="center">10:00 - 20:00</div>

	                <div id="slider-range" class="margin10"></div>
    	            <button class="fg-button ui-state-default ui-corner-all" id="ButtonIDAdd">Add</button>
        	        <button class="fg-button ui-state-default ui-corner-all" id="ButtonIDClearAll">Clear all</button>

              </fieldset>
            </div>
		</fieldset>

        </div>
       
	</body>
</html>