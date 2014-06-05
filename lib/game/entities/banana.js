ig.module(
	'game.entities.banana'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityBanana = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/banana.png', 16, 16 ),	
		size: {x: 9, y: 10},
		offset: {x: 2, y: 3},
        key: 'Banana',

    });

});