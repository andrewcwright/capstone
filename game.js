window.onload = function() {
 //start crafty
 Crafty.init(400, 336);
 // Crafty.canvas.init();
 
	//turn the sprite map into usable components
	Crafty.sprite(16, "img/bananabomber-sprites.png", {
	    grass1: [0, 0],
	    grass2: [1, 0],
	    grass3: [2, 0],
	    grass4: [3, 0],
	    flower: [0, 1],
	    bush1: [0, 2],
	    bush2: [1, 2],
	    player: [0, 3],
	    enemy: [0, 3],
	    banana: [4, 0],
	    empty: [4, 0]
	});
	//method to generate the map
	function generateWorld() {
  //loop through all tiles
  for (var i = 0; i < 25; i++) {
   for (var j = 0; j < 21; j++) {
    //place grass on all tiles
    grassType = Crafty.math.randomInt(1, 4);
    Crafty.e("2D, DOM, grass" + grassType)
        .attr({ x: i * 16, y: j * 16, z:1 });
   }
  }
 }
 //loading screen
 Crafty.scene("loading", function() {

 	//take array, run main scene when everything is loaded
 	Crafty.load(["img/bananabomber-sprites.png"], function() {
 		Crafty.scene("main");
 	});

 	//loading screen
 	Crafty.background("#000");
 	Crafty.e("2D, DOM, Text").attr({w:100, h:20, x:150, y:120})
 		.text("Loading")
 		.css({"text-align": "center"});
 }); //end scene load

 Crafty.scene("loading");

 Crafty.scene("main", function() {
 	generateWorld();
 });


};