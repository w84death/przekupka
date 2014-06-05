ig.module(
	'game.entities.customer'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityCustomer = ig.Entity.extend({
		
		customer: true,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        font: new ig.Font( 'media/quake.font.png' ),
		animSheet: new ig.AnimationSheet( 'media/customer_old.png', 16, 16 ),	
		size: {x: 7, y:5},
		offset: {x: 4, y: 12},
        health: 100,
        speed: 8 + (Math.random()*10)<<0,
        friction: {x:100,y:100},
        simpleAI: {
        	idle:0,
			up:0,
			down:0,
			left:0,
			right:0	
		},
		last_orient:0,		
		want: null,
		msg: null,		
		show_message: 35,
		angry: false,
		msg_thanks: 'Thanks',
		msg_wrong: 'Wrong!',


		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;			
			this.addAnim( 'idle_u', 1, [0] );
			this.addAnim( 'idle_r', 1, [4] );
			this.addAnim( 'idle_d', 1, [8] );
			this.addAnim( 'idle_l', 1, [12] );			
			this.addAnim( 'run_u', 0.3, [1,2,3,2] );
			this.addAnim( 'run_r', 0.3, [5,6,7,6] );
			this.addAnim( 'run_d', 0.3, [9,10,11,10] );
			this.addAnim( 'run_l', 0.3, [13,14,15,14] );
			this.addAnim( 'angry', 0.3, [16,17,18,17,18,17,18] );
			
			this.want = settings.want;
			
		},
        
        updateZindex: function(){
			if( this.vel.y !== 0 ) {												    			    
			    if(this.owner){
			    	this.zIndex = this.owner.zIndex - 1;
			    }else{
			    	this.zIndex = this.pos.y;
			    }
            	ig.game.sortEntitiesDeferred();
			}
		},


		check: function( other ){
			if(other.player && other.in_hand && this.want){
				
				if(this.want == other.in_hand.key){
					other.give( this );
					this.want = null;
					this.msg = this.msg_thanks;
					ig.game.points += ig.game.points_for_ok;
				}else{
					other.drop();
					this.msg = this.msg_wrong;	
					this.angry = 128;		
					
					ig.game.points += ig.game.points_for_wrong;				
				}
				
			}
		},		

		drop: function(){
			if(this.in_hand){
				this.in_hand.kill();
				this.in_hand = false;
			}
		},

        think: function(){
        	var random = (Math.random()*200)<<0;

        	if( this.simpleAI.up + this.simpleAI.right + this.simpleAI.down + this.simpleAI.idle < 1){
	        	if( random < 25 ){
	        		if(this.want){
	        			this.simpleAI.up += (Math.random()*50)<<0;
	        		}else{
	        			this.simpleAI.up += (Math.random()*10)<<0;
	        		}
	        	}else
	        	if( random < 50 ){
	        		if(this.want){
						this.simpleAI.right += (Math.random()*150)<<0;
					}else{
						this.simpleAI.right += 300;
					}
	        	}else
	        	if( random < 75 ){
	        		if(this.want){
	        			this.simpleAI.down += (Math.random()*50)<<0;
	        		}else{
	        			this.simpleAI.down += (Math.random()*10)<<0;
	        		}
	        	}else{	        	
	        		if(this.want){
	        			this.simpleAI.idle += (Math.random()*50)<<0;
	        		}else{
	        			this.simpleAI.idle += (Math.random()*10)<<0;
	        		}
	        	}
        	}        	
        },

		update: function() {
			if(!ig.game.STATE == 'game') return;

			this.parent();



			/*
			* 	Movement
			********************************************************************************/			
			
			this.think();

			if( this.simpleAI.up > 0 ) this.simpleAI.up -= 1;
        	if( this.simpleAI.right > 0 ) this.simpleAI.right -= 1;
        	if( this.simpleAI.down > 0 ) this.simpleAI.down -= 1;
        	if( this.simpleAI.left > 0 ) this.simpleAI.left -= 1;
        	if( this.simpleAI.idle > 0 ) this.simpleAI.idle -= 1;

        	if(!this.angry){
				if( this.simpleAI.left > 0 ) {
	                this.vel.x = -this.speed;
	                this.vel.y = 0;
				}else			
				if( this.simpleAI.right > 0  ) {
	                this.vel.x = this.speed;
	                this.vel.y = 0;
				}else
				if( this.simpleAI.up > 0 ) {
					this.vel.x = 0;
	                this.vel.y = -this.speed;
				}else			
				if( this.simpleAI.down > 0  ) {
					this.vel.x = 0;
	                this.vel.y = this.speed;
				}else{
					if(this.vel.x > 0) this.vel.x -= 1;
					if(this.vel.x < 0) this.vel.x += 1;
					if(this.vel.y > 0) this.vel.y -= 1;
					if(this.vel.y < 0) this.vel.y += 1;
				}
			}else{
				this.vel.x = 0;
				this.vel.y = 0;
				if(this.angry > 0){
					this.angry -= 1;
				}else{
					this.angry = false;
				}
			}
			

			/*
			* 	Animations
			********************************************************************************/
			if(!this.angry){
				if( this.vel.x !== 0 || this.vel.y !== 0 ) {				
					if(this.vel.y < 0){							
						this.currentAnim = this.anims.run_u;
						this.last_orient = 0;
					}
					if(this.vel.x > 0){	
						this.currentAnim = this.anims.run_r;
						this.last_orient = 1;
					}				
					if(this.vel.y > 0){							
						this.currentAnim = this.anims.run_d;
						this.last_orient = 2;
					}
					if(this.vel.x < 0){						
						this.currentAnim = this.anims.run_l;
						this.last_orient = 3;
					}
				}else{
					if( ig.input.state('action') ) {
						if(this.control){
							this.currentAnim = this.anims.action;
						}
					}else{								
						if(this.last_orient == 0){						
							this.currentAnim = this.anims.idle_u;
						}
						if(this.last_orient == 1){						
							this.currentAnim = this.anims.idle_r;
						}
						if(this.last_orient == 2){						
							this.currentAnim = this.anims.idle_d;
						}
						if(this.last_orient == 3){						
							this.currentAnim = this.anims.idle_l;
						}
					}
				}
			}else{
				this.currentAnim = this.anims.angry;
			}


			if(this.vel.y > 0 || this.vel.y < 0){
				this.updateZindex();
			}


			if(this.msg && this.show_message > 0){
				this.show_message -= 1;				
			}else{
				this.msg = false;
				this.show_message = 35;
			}
		},

		draw: function(){
			this.parent();

			if(this.msg){
				this.font.draw(this.msg, this.pos.x+this.offset.x - (this.size.x*0.5)<<0, this.pos.y - this.offset.y - 4, ig.Font.ALIGN.RIGHT);
			}else	
			if(this.want){
				if(this.distanceTo(ig.game.player) < 48){
					this.font.draw(this.want, this.pos.x+this.offset.x - (this.size.x*0.5)<<0, this.pos.y - this.offset.y - 4, ig.Font.ALIGN.RIGHT);
				}
			}		
			
		},
    });
});