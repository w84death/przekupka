ig.module(
	'game.entities.item'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityItem = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,        
        owner: false,
        can_take: true,
        key: null,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'move', 1, [0] );
			this.key = settings.key;
			this.owner = settings.owner;
			this.owner.in_hand = this;		
		},       			

		updateZindex: function(){
			//if( this.vel.y !== 0 ) {												    			    
			    if(this.owner){
			    	this.zIndex = this.owner.zIndex + 1;
			    }else{
			    	this.zIndex = this.pos.y;
			    }
            	ig.game.sortEntitiesDeferred();
			//}
		},

		take: function( other ){
			other.in_hand = this;
            this.owner = other;            
            this.updateZindex();
		},

		drop: function( other ){
			other.in_hand = false;
			this.owner = false;
			this.kill();
		},

		update: function() {			
			this.parent();
			this.updateZindex();

			if(this.owner){				
				this.pos.y = this.owner.pos.y-6;
				this.pos.x = this.owner.pos.x + ((this.owner.size.x*0.5)<<0) - ((this.size.x*0.5)<<0);			
			}			
			
		},		

    });

});