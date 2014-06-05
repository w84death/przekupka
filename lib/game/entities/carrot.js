ig.module(
	'game.entities.carrot'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityCarrot = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/carrot.png', 16, 16 ),	
		size: {x: 11, y: 3},
		offset: {x: 3, y: 7},
        key: 'Carrot',      

    });

});