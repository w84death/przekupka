ig.module(
	'game.entities.lady'
)
.requires(
    'game.entities.customer'
)
.defines(function(){

	EntityLady = EntityCustomer.extend({

		animSheet: new ig.AnimationSheet( 'media/customer_lady.png', 16, 16 ),	
		speed: 12 + (Math.random()*8)<<0,
		msg_thanks: ':)',
		msg_wrong: '??',
        
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		},

    });

});