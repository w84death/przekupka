ig.module(
	'game.entities.basket'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityBasket = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,
        animSheet: new ig.AnimationSheet( 'media/baskets.png', 24, 24 ),	
		size: {x: 19, y: 9},
		offset: {x: 4, y: 13},
        key: null,
        translate: null,
        font: new ig.Font( 'media/quake.font.png' ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );			
			this.zIndex = this.pos.y;
			this.addAnim( 'idle', 1, [5] );
			this.addAnim( 'Apple', 1, [0] );
			this.addAnim( 'Lemon', 1, [1] );
			this.addAnim( 'Pear', 1, [2] );
			this.addAnim( 'Tomato', 1, [3] );
			this.addAnim( 'Carrot', 1, [4] );
			this.addAnim( 'Cucumber', 1, [5] );
			this.addAnim( 'Banana', 1, [6] );
			this.addAnim( 'Beet', 1, [7] );
			this.key = settings.key;
			this.currentAnim = this.anims[this.key];
		},       			

		check: function( other ){
			if(other.player && !other.in_hand){
				ig.game.getAPI(this.key);			
				ig.game.spawnEntity( 'Entity'+this.key, other.pos.x, other.pos.y, {key:this.key, owner:other} );				
			}
		},

		update: function() {			
			this.parent();
		},		

		draw: function(){
			this.parent();
			if(ig.game.player){
				if(this.distanceTo(ig.game.player) < 48){
					this.font.draw(this.translate, this.pos.x+this.offset.x - (this.size.x*0.5)<<0, this.pos.y + 6, ig.Font.ALIGN.CENTER);
				}
			}
		},

    });

});