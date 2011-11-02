<?php
	include "GlobalVariables.php";
?>

<?php
function PrintHeader()
{

echo'
	<head>
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
	<script src="js/custom.js"></script>
	
	<title>'.$GLOBALS["title"].'</title>
	</head>';

}
?>