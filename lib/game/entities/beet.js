ig.module(
	'game.entities.beet'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityBeet = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/beet.png', 16, 16 ),	
		size: {x: 7, y: 8},
		offset: {x: 1, y: 5},
        key: 'Beet',

    });

});