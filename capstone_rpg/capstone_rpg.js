//set main namespace 
goog.provide('capstone_rpg');   
//get requirements 
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');   

    //entrypoint 
capstone_rpg.start = function(){   
    //define director       
    var director = new lime.Director(document.body,352,256);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);  

    //create map
    var mapScene = new lime.Scene();  
    var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var gameMap = new lime.Sprite().setSize(352,256).setFill('map.png').setPosition(0,0).setAnchorPoint(0,0);

    //create hero
    var hero = new lime.Sprite().setSize(47,40).setFill('spellun-sprite.png').setPosition(100,100);
    hero.life = 20;
    hero.money = 100;
    hero.attack = 5;

    //create monster
    var monster = new lime.Sprite().setSize(64,64).setFill('fenrir_wolf.png').setPosition(250, 200);
    monster.life = 15;
    monster.money = 10;
    monster.attack = 1;

    //create fight scene
    var fightScene = new lime.Scene().setRenderer();
    var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var skyGradient = new lime.fill.LinearGradient().setDirection(1,1,1,0).addColorStop(0, '#B2DFEE').addColorStop(1, '#0000CD');
    var sky = new lime.Sprite().setSize(352,128).setPosition(0,0).setAnchorPoint(0,0).setFill(skyGradient);
    var grass = new lime.Sprite().setSize(352,128).setPosition(0,128).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
    fightLayer.appendChild(sky);
    fightLayer.appendChild(grass);

    //draw hero and monster
    var fighter1 = new lime.Sprite().setSize(hero.getSize()).setFill(hero.getFill()).setPosition(50,210);
    var fighter2 = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setPosition(280,210);
    fightLayer.appendChild(fighter1);
    fightLayer.appendChild(fighter2);
    fightScene.appendChild(fightLayer);

    //hero monster collision event
    hero.inFightScene = false;

    lime.scheduleManager.schedule(function(dt) {
        if (!this.inFightScene) {
            if (goog.math.Box.intersects(this.getBoundingBox(), monster.getBoundingBox())) {
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

    mapLayer.appendChild(gameMap);
    mapLayer.appendChild(hero);
    mapLayer.appendChild(monster);
    mapScene.appendChild(mapLayer);
    director.replaceScene(mapScene);
}
