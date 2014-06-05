ig.module( 'game.levels.demo' )
.requires( 'impact.image','game.entities.customer','game.entities.player','game.entities.basket' )
.defines(function(){
LevelDemo=/*JSON[*/{"entities":[{"type":"EntityCustomer","x":164,"y":99},{"type":"EntityCustomer","x":244,"y":59},{"type":"EntityCustomer","x":84,"y":95},{"type":"EntityCustomer","x":80,"y":143},{"type":"EntityCustomer","x":164,"y":135},{"type":"EntityCustomer","x":176,"y":59},{"type":"EntityCustomer","x":20,"y":59},{"type":"EntityCustomer","x":100,"y":71,"settings":{"control":"true"}},{"type":"EntityPlayer","x":56,"y":76},{"type":"EntityBasket","x":28,"y":77,"settings":{"key":"Apple","translate":"Jabłko"}},{"type":"EntityBasket","x":48,"y":93,"settings":{"key":"Lemon","translate":"Cytryna"}}],"layer":[{"name":"background","width":20,"height":12,"linkWithCollision":false,"visible":1,"tilesetName":"media/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,3,3,3,3,7,3,3,3,3,8,3,3,3,3,3,3,3,3,1],[1,2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,3,3,3,3,6,3,3,3,3,8,3,3,3,3,3,3,3,3,1],[1,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"new_layer_3","width":20,"height":12,"linkWithCollision":false,"visible":1,"tilesetName":"media/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,13,14,14,14,15,13,14,15,0,0,13,14,14,14,15,13,15,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,13,14,14,15,0,13,15,13,15,0,0,13,14,15,13,14,14,15,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"new_layer_2","width":20,"height":12,"linkWithCollision":false,"visible":1,"tilesetName":"media/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":true,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,9,10,10,10,11,9,10,11,0,0,9,10,10,10,11,9,11,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,9,10,10,11,0,9,11,9,11,0,0,9,10,11,9,10,10,11,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":20,"height":12,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":true,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelDemoResources=[new ig.Image('media/background.png'), new ig.Image('media/background.png'), new ig.Image('media/background.png')];
});