ig.module(
	'game.entities.apple'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityApple = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/apple.png', 16, 16 ),	
		size: {x: 9, y: 7},
		offset: {x: 3, y: 7},
        key: 'Apple',

    });

});