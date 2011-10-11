$(function() {
    $( "#tabs" ).tabs();
});

$(function() {
	/* see if anything is previously checked and reflect that in the view*/
	$(".checklist input:checked").parent().addClass("selected");

	/* handle the user selections */
	$(".checklist .checkbox-select").click(
		function(event) {
			event.preventDefault();
			$(this).parent().addClass("selected");
			$(this).parent().find(":checkbox").attr("checked","checked");
		}
	);

	$(".checklist .checkbox-deselect").click(
		function(event) {
			event.preventDefault();
			$(this).parent().removeClass("selected");
			$(this).parent().find(":checkbox").removeAttr("checked");
		}
	);

		$( ".select" )
			.button()
			.click(function() {

			})
			.next()
				.button( {
					text: false,
					icons: {
						primary: "ui-icon-triangle-1-s"
					}
				})
				.click(function() {

				})
				.parent()
					.buttonset();

    $( "button", ".demo" ).button();

    $( "#slider-range" ).slider({
			range: true,
            min: 525,
            max: 1350,
			values: [ 600, 1200 ],
			step: 15,
			slide: function(event, ui) {
			    var minutes0 = parseInt(ui.values[0] % 60);
                var hours0 = parseInt(ui.values[0] / 60 % 24);
                var minutes1 = parseInt(ui.values[1] % 60);
                var hours1 = parseInt(ui.values[1] / 60 % 24);
                $("#time").text(getTime(hours0, minutes0) + ' - ' + getTime(hours1, minutes1));
            }
		});

http://marcneuwirth.com/blog/2010/02/21/using-a-jquery-ui-slider-to-select-a-time-range/
function getTime(hours, minutes) {
  var time = null;
  minutes = minutes + "";

  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}

    $('#calendar').fullCalendar({
	    theme: true,
			header: {
		    left: 'prev,next',
	    	center: 'title',
	    	right: ''
	    },
        columnFormat: 'dddd',
        titleFormat: '',
        allDaySlot: false,
        defaultView: 'agendaWeek',
        slotMinutes: 15,
        minTime:'8:45',
        maxTime: '22:00',
        weekends: false,
	    editable: true
    });
    $('#calendar').fullCalendar('option', 'height', 600);

	$('.selectDrop').selectmenu();

    //all hover and click logic for buttons
    $(".fg-button:not(.ui-state-disabled)")
    .hover(
    	function(){
    		$(this).addClass("ui-state-hover");
    	},
    	function(){
    		$(this).removeClass("ui-state-hover");
    	}
    )
    .mousedown(function(){
    		$(this).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
    		if( $(this).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') ){ $(this).removeClass("ui-state-active"); }
    		else { $(this).addClass("ui-state-active"); }
    })
    .mouseup(function(){
    	if(! $(this).is('.fg-button-toggleable, .fg-buttonset-single .fg-button,  .fg-buttonset-multi .fg-button') ){
    		$(this).removeClass("ui-state-active");
    	}
    });

   	$(function() {
		$( ".demo" ).tooltip({
			open: function( event ) {
				var tooltip = $( ".ui-tooltip" );
				function position( event ) {
					tooltip.position({
						my: "left+25 center",
						at: "right+25 center",
						of: event
					});
				}
				$( document ).bind( "mousemove.tooltip-position", position );
				// trigger once to override element-relative positioning
				position( event );
			},
			close: function() {
				$( document ).unbind( "mousemove.tooltip-position" );
			}
		});
	});

});
