ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	// PLUGINS
	'plugins.canvas-css3-scaling',

	// LEVEL
	'game.levels.menu',
	'game.levels.market',
	
	// CUSTOMERS
	'game.entities.player',
	'game.entities.customer',
	'game.entities.adidas',
	'game.entities.lady',

	// ITEMS
	'game.entities.basket',
	'game.entities.item',
	'game.entities.apple',
	'game.entities.banana',
	'game.entities.beet',
	'game.entities.carrot',
	'game.entities.cucumber',
	'game.entities.lemon',
	'game.entities.pear',
	'game.entities.tomato',
	'game.entities.box'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	version: '0.1',
	api_key: 'q0X0eBgwsN965QIZcDMCfDvrAqoDLRuU',
	STATE: 'menu',
	font: new ig.Font( 'media/quake.font.png' ),
	font_big: new ig.Font( 'media/quake_big.font.png' ),
	overlay: new ig.Image( 'media/overlay.png'),
	hearth: new ig.Image( 'media/hearth.png' ),
	noise: new ig.Image( 'media/noise.png' ),
	logo: new ig.Image( 'media/logo.png' ),
	sponsor: new ig.Image( 'media/p1x_logo.png' ),
	tutorial: new ig.Image( 'media/tutorial.png' ),
	key: null,
	definition: 'loading..',
	points: 0,
	points_for_ok: 3,
	points_for_wrong: -1,
	points_for_coffee: 7,
	customers: { all:0, handled:0 },
	timer: new ig.Timer(),
	game_time: 0,
	new_customers: 4,
	max_hearths: 7,
	menu_camera_direction: 1,
	wait_for_tutorial: 10,
	
	init: function() {

		if(ig.ua.mobile){
			ig.input.bind( ig.KEY.MOUSE1, 'touch' );	
		}

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.ENTER, 'action' );
		
		this.loadLevel( LevelMenu );

	},

	getAPI: function(key){
		this.key = key;
		this.definition = 'Loading..';
		$.ajax({
			url: 'http://api.pearson.com/v2/dictionaries/entries?part_of_speech=noun&headword='+ key +'&apikey='+this.api_key,
			type: "GET",
			dataType: "json",
			success: function (data) {
			    ig.game.definition = data.results[0].senses[0].definition;			    
			}
			});
	},
	
	startGame: function(){
		this.timer.set(0);
		this.points = 0;

		this.STATE = 'game';

		this.loadLevel( LevelMarket );
		this.screen.x = 16;

		for (var i = 0; i < this.entities.length; i++) {
    		if(this.entities[i].player){
    			this.player = this.entities[i];
    		}
	    };

	},

	update: function() {
		this.parent();
		
		if(this.STATE == 'menu'){			
			var maxX = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
			if(this.screen.x > maxX) { this.menu_camera_direction = -1; }
			if(this.screen.x < 0 ) { this.menu_camera_direction = 1; }
			this.screen.x += 0.1 * this.menu_camera_direction;

			if(ig.input.state('action') || ig.input.state('touch')){				
				this.STATE = 'tutorial';
			}
		}

		if(this.STATE == 'tutorial'){	
			if(this.wait_for_tutorial > 0){
				this.wait_for_tutorial -= 1;
			}					
			if(( ig.input.state('action') || ig.input.state('touch') ) && this.wait_for_tutorial < 1){				
				this.wait_for_tutorial = 3;
				this.startGame();
			}
		}

		if(this.STATE == 'game'){
			this.game_time = 360 - this.timer.delta()<<0;

			this.customers.all = 0;
			this.customers.handled = 0;
			for (var i = 0; i < this.entities.length; i++) {
	    		if(this.entities[i].customer){
	    			this.customers.all += 1;
	    			if(!this.entities[i].want){
	    				this.customers.handled += 1;
	    			}

	    			if(this.entities[i].pos.x+ this.entities[i].offset.x> ig.system.width){
	    				if(this.entities[i].want){
	    					ig.game.player.hearth -= 1;
	    				}else{
	    					this.new_customers += 0.5;
	    				}
	    				this.entities[i].drop();
	    				this.entities[i].kill();
	    				
	    			}
	    		}
		    }
		    
		    var want = ['Apple','Lemon','Pear','Tomato','Carrot','Cucumber','Banana','Beet'], 
		    	entity = ['EntityCustomer','EntityAdidas', 'EntityLady'],
		    	position;

		    if(this.customers.all - this.customers.handled < (this.new_customers << 0)){
		    	

				position = 32 + (Math.random()*64)<<0;
		    	ig.game.spawnEntity( entity[(Math.random()*entity.length)<<0], 10, position, {want:want[(Math.random()*want.length)<<0]} );				
		    }

		    if(this.player.hearth < 1){
		    	this.STATE = 'game_over';
		    }
			
		}

		if(this.STATE == 'game_over'){
			if(ig.input.state('action') || ig.input.state('touch')){				
				this.startGame();
			}
		}

		if(this.STATE == 'game_win'){
			
		}
	},
	
	draw: function() {
		this.parent();

		if(this.STATE == 'game_over'){
			this.noise.draw(0,0);
		}

		if(this.STATE == 'tutorial'){
			
			this.tutorial.draw(0,0);

		}

		this.overlay.draw(0,0);

		if(this.STATE == 'menu'){

			this.logo.draw(((ig.system.width*0.5)<<0)-120, 32);
			this.sponsor.draw(16, 100);

			this.font.draw( 'IDEA, CODE, PIXELS: Krzysztof Jankowski', 64, 113, ig.Font.ALIGN.LEFT );

			this.font_big.draw( 'PAN-PEARSON HACKATHON 2k13', (ig.system.width*0.5)<<0, ig.system.height-32, ig.Font.ALIGN.CENTER );
			this.font.draw( 'PRESS ENTER', (ig.system.width*0.5)<<0, ig.system.height-12, ig.Font.ALIGN.CENTER );
		}	

		if(this.STATE == 'tutorial'){
			
			this.font_big.draw( 'Ready to play?', (ig.system.width*0.5)<<0, ig.system.height-32, ig.Font.ALIGN.CENTER );
			this.font.draw( 'PRESS ENTER TO START', (ig.system.width*0.5)<<0, ig.system.height-12, ig.Font.ALIGN.CENTER );
		}	

		if(this.STATE == 'game'){
			this.font_big.draw( 'MONEY: ' + this.points + 'PLN', 8, ig.system.height-38, ig.Font.ALIGN.LEFT );
			//this.font.draw( 'TIME: ' + this.game_time, ig.system.width-104, ig.system.height-37, ig.Font.ALIGN.RIGHT );
			this.font.draw( this.customers.handled + ' / ' + this.customers.all, ig.system.width-100, ig.system.height-37, ig.Font.ALIGN.RIGHT );
			if(this.player){				
				for (var i = 0; i < this.max_hearths; i++) {
					var hearth = 1;
					if(this.player.hearth > i){ hearth = 0; }
					this.hearth.drawTile( ig.system.width - 12*i - 16, ig.system.height-38, hearth, 9 );
				};
			}
			if(this.key){
				this.font.draw( this.key + ': ' + this.definition, 8, ig.system.height-16, ig.Font.ALIGN.LEFT );
			}
		}		
		
		if(this.STATE == 'game_over'){
			this.font_big.draw( 'GAME OVER', (ig.system.width*0.5)<<0, ig.system.height-36, ig.Font.ALIGN.CENTER );
			this.font.draw( 'MONEY: ' + this.points + 'PLN', (ig.system.width*0.5)<<0, ig.system.height-20, ig.Font.ALIGN.CENTER );
			this.font.draw( 'PRESS ENTER TO RESTART', (ig.system.width*0.5)<<0, ig.system.height-12, ig.Font.ALIGN.CENTER );
		}

		if(this.STATE == 'game_win'){
			
		}		
	}
});


	var w = 1024,
		h = 768,
		z = 4,
		fps = 30;

	ig.main( '#canvas', MyGame, fps, w/z, h/z, z );    
	if(!ig.ua.mobile){
		ig.CanvasCSS3Scaling = new CanvasCSS3Scaling();
	}
});
