$(document).ready(function() {
	var PLAYGROUND_HEIGHT = 250;
	var PLAYGROUND_WIDTH = 700;

 $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});
 $.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
}); //end document ready