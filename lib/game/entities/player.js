ig.module(
	'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityPlayer = ig.Entity.extend({

		player: true,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.ACTIVE,
		animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),	
		size: {x: 7, y:5},
		offset: {x: 4, y: 12},
        speed: 50,
        friction: {x:100,y:100},
        last_orient:0,
        in_hand: false,
        hearth: 5,
        movement: 50,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'idle_u', 1, [0] );
			this.addAnim( 'idle_r', 1, [4] );
			this.addAnim( 'idle_d', 1, [8] );
			this.addAnim( 'idle_l', 1, [12] );			
			this.addAnim( 'run_u', 0.2, [1,2,3,2] );
			this.addAnim( 'run_r', 0.2, [5,6,7,6] );
			this.addAnim( 'run_d', 0.2, [9,10,11,10] );
			this.addAnim( 'run_l', 0.2, [13,14,15,14] );
			this.hearth = ig.game.max_hearths;			
		},

		updateZindex: function(){
			if( this.vel.y !== 0 ) {												    			    			    
			    this.zIndex = this.pos.y;			    
            	ig.game.sortEntitiesDeferred();
			}
		},

		give: function( other ){
			this.in_hand.take ( other );
			this.in_hand = false;
			ig.game.key = null;
		},


		drop: function(){
			this.in_hand.kill();
			this.in_hand = false;
			ig.game.key = null;
		},

		update: function() {
			if(!ig.game.STATE == 'game') return;

			this.parent();
			this.updateZindex();

			if( ig.input.state('left') ) {
                this.vel.x = -this.speed;
                this.vel.y = 0;	                  
			}else			
			if( ig.input.state('right')) {
                this.vel.x = this.speed;
                this.vel.y = 0;
			}else
			if( ig.input.state('up') ) {
				this.vel.x = 0;
                this.vel.y = -this.speed;
			}else			
			if( ig.input.state('down')) {
				this.vel.x = 0;
                this.vel.y = this.speed;
			}else{
				if(this.vel.x > 0) this.vel.x -= 1;
				if(this.vel.x < 0) this.vel.x += 1;
				if(this.vel.y > 0) this.vel.y -= 1;
				if(this.vel.y < 0) this.vel.y += 1;
			}

			if(ig.ua.mobile){
				if( ig.input.state('touch') ){
					
					var mx = ig.input.mouse.x + ig.game.screen.x;
					var my = ig.input.mouse.y + ig.game.screen.y;

									
						var mouseAngle =  Math.atan2(
						    my - (this.pos.y + this.size.y*0.5),
						    mx - (this.pos.x + this.size.x*0.5)
						);


						// -1.6
						if( mouseAngle > -2 && mouseAngle < -1.2){
							this.vel.y = -this.movement;
	                		this.direction = 'top';
						}

						if(mouseAngle > -1.2 && mouseAngle < -0.4 ){
							this.vel.y = -this.movement*0.5;
	                		this.vel.x = this.movement*0.5;
						}						

						// 0
						if(mouseAngle > -0.4 && mouseAngle < 0.4 ){
							this.vel.x = this.movement;
	                		this.direction = 'right';
						}
						if(mouseAngle > 0.4 && mouseAngle < 1.2 ){
							this.vel.x = this.movement*0.5;
	                		this.vel.y = this.movement*0.5;
						}
						// 1.6
						if(mouseAngle > 1.2 && mouseAngle < 2 ){
							this.vel.y = this.movement;
	                		this.direction = 'down';
						}
						if(mouseAngle > 2 && mouseAngle < 2.74 ){
							this.vel.y = this.movement*0.5;
	                		this.vel.x = -this.movement*0.5;
						}
						// -3.14
						if(mouseAngle > 2.74 || mouseAngle < -2.74 ){
							this.vel.x = -this.movement;
	                		this.direction = 'left';
						}

						if(mouseAngle > -2.74 && mouseAngle < -2 ){
							this.vel.x = -this.movement*0.5;
	                		this.vel.y = -this.movement*0.5;
						}
					
					
				}
			}


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
			
		},
        
 		
    });
});