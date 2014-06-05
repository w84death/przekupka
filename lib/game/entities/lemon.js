ig.module(
	'game.entities.lemon'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityLemon = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/lemon.png', 16, 16 ),	
		size: {x: 5, y: 6},
		offset: {x: 6, y: 6},
        key: 'Lemon',

    });

});