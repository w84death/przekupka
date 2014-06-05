ig.module(
	'game.entities.tomato'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityTomato = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/tomato.png', 16, 16 ),	
		size: {x: 9, y: 7},
		offset: {x: 4, y: 6},
        key: 'Tomato',        

    });

});