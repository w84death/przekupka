ig.module(
	'game.entities.cucumber'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityCucumber = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/cucumber.png', 16, 16 ),	
		size: {x: 16, y: 6},
		offset: {x: 0, y: 6},
        key: 'Cucumber',

    });

});