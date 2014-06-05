ig.module(
	'game.entities.adidas'
)
.requires(
    'game.entities.customer'
)
.defines(function(){

	EntityAdidas = EntityCustomer.extend({

		animSheet: new ig.AnimationSheet( 'media/customer_adidas.png', 16, 16 ),	
		speed: 18 + (Math.random()*10)<<0,
		msg_thanks: 'Ok',
		msg_wrong: 'No!',
        
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		},

    });

});