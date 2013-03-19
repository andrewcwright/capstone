goog.provide('capstone_rpg.water');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */
capstone_rpg.water = function(gameObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('water.png');
}

goog.inherits(capstone_rpg.water,lime.Sprite);