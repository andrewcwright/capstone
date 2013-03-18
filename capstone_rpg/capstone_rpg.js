//set main namespace 
goog.provide('capstone_rpg'); 

//get requirements
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.GlossyButton');

//entrypoint 
capstone_rpg.start = function(){   
    //define director       
    var director = new lime.Director(document.body,352,256);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);  

    //create mapScene
    var mapScene = new lime.Scene();  
    var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var gameMap = new lime.Sprite().setSize(352,256).setFill('map.png').setPosition(0,0).setAnchorPoint(0,0);

    //create mapScene hero
    var hero = new lime.Sprite().setSize(47,40).setFill('spellun-sprite.png').setPosition(100,100);
    hero.life = 20;
    hero.money = 100;
    hero.attack = 5;

    //create mapScene monster
    var monster = new lime.Sprite().setSize(64,64).setFill('fenrir_wolf.png').setPosition(250, 200);
    monster.life = 15;
    monster.money = 10;
    monster.attack = 1;

    //create fightScene
    var fightScene = new lime.Scene().setRenderer();
    var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var skyGradient = new lime.fill.LinearGradient().setDirection(1,1,1,0).addColorStop(0, '#B2DFEE').addColorStop(1, '#0000CD');
    var sky = new lime.Sprite().setSize(352,128).setPosition(0,0).setAnchorPoint(0,0).setFill(skyGradient);
    var grass = new lime.Sprite().setSize(352,128).setPosition(0,128).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
    fightLayer.appendChild(sky);
    fightLayer.appendChild(grass);

    //create fightScene hero and monster
    var fighter1 = new lime.Sprite().setSize(hero.getSize()).setFill(hero.getFill()).setPosition(50,210);
    var fighter2 = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setPosition(280,210);

    //create fightScene labels
    var labelFighter1Life = new lime.Label().setText('Life:' + hero.life).setPosition(50,150);
    var labelFighter1Attack = new lime.Label().setText('Attack:' + hero.attack).setPosition(50, 170);
    var labelFighter2Life = new lime.Label().setText('Life:' + monster.life).setPosition(280, 150);
    var labelFighter2Attack = new lime.Label().setText('Attack:' + monster.attack).setPosition(280, 170);

    //create fightScene buttons
    var attackButton = new lime.GlossyButton().setSize(70,20).setPosition(40,10).setText('ATTACK').setColor('#B0171F');
    var runButton = new lime.GlossyButton().setSize(70,20).setPosition(120,10).setText('RUN').setColor('#00CD00');

    fightLayer.appendChild(fighter1);
    fightLayer.appendChild(fighter2);

    fightLayer.appendChild(labelFighter1Life);
    fightLayer.appendChild(labelFighter1Attack);
    fightLayer.appendChild(labelFighter2Life);
    fightLayer.appendChild(labelFighter2Attack);

    fightLayer.appendChild(attackButton);
    fightLayer.appendChild(runButton);

    fightScene.appendChild(fightLayer);

    //hero monster collision event
    hero.inFightScene = false;

    lime.scheduleManager.schedule(function(dt) {
        if (!this.inFightScene) {
            if (monster.life>0 && goog.math.Box.intersects(this.getBoundingBox(), monster.getBoundingBox())) {
                director.replaceScene(fightScene);
                fightLayer.setDirty(255);
                hero.inFightScene = true;
            }
        }
    }, hero);

    //mouse click event listener
    goog.events.listen(gameMap, ['mousedown', 'touchstart'], function(e) {
        var movement = new lime.animation.MoveTo(e.position.x, e.position.y).setDuration(1);
        hero.runAction(movement);
    });

    //run button click event
    goog.events.listen(runButton, ['mousedown', 'touchstart'], function(e) {
        //replace mapScene
        director.replaceScene(mapScene);
        mapLayer.setDirty(255);
        //move hero away from the monster so fightScene does not retrigger
        position = hero.getPosition();
        hero.setPosition(position.x-60, position.y-60);
        hero.inFightScene = false;
    });

    //attack button click event
    goog.events.listen(attackButton, ['mousedown', 'touchstart'], function(e) {
        //make random number
        var randomNum = Math.random();

        if (randomNum < .5) {
            monster.life -= hero.attack;
            if (monster.life <= 0) {
                console.log('monster dead');
                //add monster money
                hero.money += monster.money;
                //return to map
                director.replaceScene(mapScene);
                mapLayer.setDirty(255);
                hero.inFightScene = false;
                //delete monster object
                monster.setHidden(true);
                delete monster;
            }
        }
        else {
            hero.life -= monster.attack;
            //initiate game over if hero is dead
            if (hero.life <= 0) {
                var labelGameOver = new lime.Label().setText('GAMEOVER').setPosition(160,100);
                fightLayer.appendChild(labelGameOver);
            }
        }
        //update life totals
        labelFighter1Life.setText('Life:' + hero.life);
        labelFighter2Life.setText('Life:' + monster.life);
    });

    mapLayer.appendChild(gameMap);
    mapLayer.appendChild(hero);
    mapLayer.appendChild(monster);
    mapScene.appendChild(mapLayer);
    director.replaceScene(mapScene);
}


