ig.module(
	'game.entities.box'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityBox = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,        
        animSheet: new ig.AnimationSheet( 'media/box.png', 14, 11 ),
        size: {x:14,y:4},
        offset: {x:0,y:8},

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;

			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'normal', 1, [0] );
			this.addAnim( 'pl', 1, [1] );
			this.addAnim( 'blue', 1, [2] );

			var v = ['normal','pl','blue'];

			this.currentAnim = this.anims[ v[(Math.random()*v.length)<<0] ];
		},       					

    });

});