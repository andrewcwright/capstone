============
Capstone RPG
============

This is my capstone project for the Nashville Software School. It uses the Crafty javascript framework to create a small top down rpg environment. You can use the arrow keys to move around.

===========================
03/18/2013 - MAJOR REDESIGN
===========================

I have decided to move the project to the limeJS framework. You can run the game by going to the capstone_rpg directory and running the html file there. The current functionality allows the player to move around the screen with a mouseclick or screen tap. If the player moves on top of the wolf, the collision is detected and a fight scene engages. In the fight scene the hero can either run or fight. If the hero runs he is returned to his starting position in the game. I he chooses to fight, a random number is used to calculate whether the hero hits the monster or vice-versa. The person who gets hit has the opponent's attack score subtracted from their life. This continues until someone is dead. I the heros wins the monster vanishes. Otherwise a game over message is displayed.

===============================================
03/19/2012 - More controls, collision detection
===============================================

I have added movement with the arrow keys. I changed the map to be dynamically generated from tile objects. The stone object has some problems with collision detection. The player will not move through it but becomes stuck on the object.

===================
Future Design Goals
===================
* resolve collision bugs
* create level which resembles a maze
* add more monsters
* create a treasure chest with a key in it, and a door that can only be opened if you have the key
