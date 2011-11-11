
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	
	<head>
		<!--PrintHeader();-->
		<meta charset="utf-8">
		
		<link rel="stylesheet" type="text/css" href="css/vader/jquery-ui-1.8.16.custom.css">
		<link rel="stylesheet" type="text/css" href="css/jquery.ui.selectmenu.css">
		<link rel="stylesheet" type="text/css" href="css/fullcalendar.css">
		<link rel="stylesheet" type="text/css" href="css/fullcalendar.print.css" media="print">
		<link rel="stylesheet" type="text/css" href="css/custom.css">
	  
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
		<script src="js/fullcalendar.min.js"></script>
		
		<script>
			$(document).ready(function(){
				$("a.checklist").click(function(){
					alert("Element clicked");
				});

				$("#ButtonFall").click(function(){
					alert("ButtonFall clicked");
				});
				
				$("#ButtonWinter").click(function(){
					alert("ButtonWinter clicked");
				});
				
				$("#ButtonSummer").click(function(){
					alert("ButtonSummer clicked");
				});
				
				$("#StudentID").click(function(){
					alert("StudentID clicked");
				});
				
				$("#StudentName").click(function(){
					alert("StudentName clicked");
				});
				
				$("#StudentProgram").click(function(){
					alert("StudentProgram clicked");
				});
			});
		</script>
		
	</head>

	<body>
	<!--	
	THIS IS AN EXAMPLE OF HOW TO USE THE db_adapter class
		-->
		
	<?php 
	include('php/db.php');
	//create a new db_adapter
	$db_adapter=new db_adapter();
	//make a query
	$query_set=$db_adapter->query('select * from student');
	//iterate over the results	
	foreach($query_set as $student){
		echo "<p>Student:</p>";
		foreach($student as $key=>$value)
		echo "Value:".$value."</br> key:".$key."<br/>";
	}
	?>
		<div id="content">
			<div id="demo">
				<div id="SelectfieldSets" class="ui-corner-all float-left gray-border">
					<fieldset class="ui-corner-all gray-border left">
						<legend>Select Program</legend>
						
						<select id="selectFaculty" class="selectDrop">	
							<option value="encs">
							Engineering and Computer Science
							</option>						
						</select> 
						
						<select id="selectDepartment" class="selectDrop">	
							<option value="csse">
							Computer Science and Software Engineering
							</option>						
						</select> 
						
						<select id="selectProgram" class="selectDrop">	
							<option value="se">
							BEng in Software Engineering
							</option>						
						</select>
					</fieldset>
				</div>
				
				<div id="Student Info" class="ui-corner-all float-left gray-border">				
				<fieldset class="ui-corner-all gray-border left">
					<legend>Student Information</legend>
					<strong id="StudentID">ID:</strong>
					<br></br>
					<strong id="StudentName">Name:</strong>										
					<br></br>
					<strong id="StudentProgram">Program:</strong>						
					</fieldset>
				</div>
				
				<div class="clear-both"></div>
				
				<div id="Term" class="ui-corner-all float-left">				
				<fieldset class="ui-corner-all gray-border left">
				<legend>Term</legend>
					<div class="fg-buttonset fg-buttonset-single ui-helper-clearfix">
					  <button id="ButtonFall" class="fg-button ui-state-default ui-state-active ui-priority-primary ui-corner-left" value="1">Fall</button>
					  <button id="ButtonWinter" class="fg-button ui-state-default ui-priority-primary ui-corner-right" value="2">Winter</button>
					  <button id="ButtonSummer" class="fg-button ui-state-default ui-priority-primary ui-corner-right" value="3">Summer</button>					
					</div>
				</fieldset>
				</div>
				
				
				<div id=":Login" class="ui-corner-all float-left">				
				<fieldset class="ui-corner-all gray-border left">
				<legend>Login</legend>
				<strong>User Name:</strong>
				<br></br>
				<strong>Password:</strong>
				</fieldset>
				</div>
				<div class="clear-both"></div>
					
				<div id="tabs">
					<ul>
						<li><a href="#tabs-1">Core courses</a></li>
						<li><a href="#tabs-2">Options</a></li>
						<li><a href="#tabs-3">Electives</a></li>
					</ul>
					
					<form action="">
					<div id="tabs-1">
						
							<fieldset class="float-left">
								<legend>Engineering</legend>
								
								<ul class="checklist">
									<li title="Principles of Electrical Engineering/nFundamentals of electric circuits: Kirchoff’s laws, voltage and current sources, Ohm’s law, series and parallel circuits. Nodal and mesh analysis of DC circuits. Superposition theorem, Thevenin and Norton Equivalents. Use of operational amplifiers. Transient analysis of simple RC, RL and RLC circuits. Steady state analysis: Phasors and impedances, power and power factor. Single and three phase circuits. Magnetic circuits and transformers. Power generation and distribution.">
										<input value="ELEC 275" type="checkbox" id="elec725">
										<label for="elec275"><strong>ELEC 275</strong></label>
										<a class="checkbox-select" href="#">Select</a>
										<a class="checkbox-deselect" href="#">Remove</a>
									</li>
								</ul>
								<div class="clear-both"></div><br />	
							</fieldset>

							<fieldset class="float-left">
								<legend>Software Engineering</legend>
								
								<ul class="checklist">
									<li title="System Hardware">
										<input value="SOEN 228" type="checkbox" id="soen228">
										<label for="soen228"><strong>SOEN 228</strong></label>
										<a class="checkbox-select" href="#">Select</a>
										<a class="checkbox-deselect" href="#">Remove</a>
									</li>
								</ul>
								<div class="clear-both"></div><br />
							</fieldset>
						<div class="clear-both"></div>
					</div>

					<div id="tabs-2">
						<fieldset class="float-left">
							<legend>Option Courses</legend>						
							<ul class="checklist">
								<li title="Artificial Intelligence">
									<input value="COMP 472" type="checkbox" id="comp472">
									<label for="comp472"><strong>COMP 472</strong></label>
									<a class="checkbox-select" href="#">Select</a>
									<a class="checkbox-deselect" href="#">Remove</a>
								</li>
							</ul>
							<div class="clear-both"></div><br />						
						</fieldset>
						<div class="clear-both"></div>
					</div>

					<div id="tabs-3">
						<fieldset class="float-left">
							<legend>Electives</legend>						
							<ul class="checklist">
								<li title="Parallel programming">
									<input value="COMP 428" type="checkbox" id="comp428">
									<label for="comp428"><strong>COMP 428</strong></label>
									<a class="checkbox-select" href="#">Select</a>
									<a class="checkbox-deselect" href="#">Remove</a>
								</li>
							</ul>
							<div class="clear-both"></div><br />						
						</fieldset>
						<div class="clear-both"></div>
					</div>
					
					<form action="">
				</div>
			</div>
		
		<div id='calendar'></div>

		<div id="options" class="ui-corner-all float-left">
		  <fieldset class="ui-corner-all gray-border center">
			<legend>Constraints</legend>

			<select id="selectDay" class="selectDrop margin10">
			  <option value="monday">Monday</option>
			  <option value="tuesday">Tuesday</option>
			  <option value="wednesday">Wednesday</option>
			  <option value="thursday">Thursday</option>
			  <option value="friday">Friday</option>
			</select>

			<div id="time">10:00 - 20:00</div>

			<div id="slider-range" class="margin10">
			</div><button class="fg-button ui-state-default ui-corner-all" type="button" id="add">Add</button>
			<button class="fg-button ui-state-default ui-corner-all" type="button" id="clear">Clear all</button>
		  </fieldset>
		</div>

		<div class="clear-both"></div>

	  </div>
	</body>
</html>
