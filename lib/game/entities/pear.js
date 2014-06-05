ig.module(
	'game.entities.pear'
)
.requires(
    'game.entities.item'
)
.defines(function(){

	EntityPear = EntityItem.extend({

		animSheet: new ig.AnimationSheet( 'media/pear.png', 16, 16 ),	
		size: {x: 7, y: 8},
		offset: {x: 5, y: 5},
        key: 'Pear',
        

    });

});