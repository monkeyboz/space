console.log("testing1");
var space = function(position,stars){
	this.position = position;
	this.galaxies = [];
	this.size = [0,0,0,0];
	
	var total_objects = 0;
	
	//Galaxy
	//-----------------------------
	this.galaxy = function(positon,size){
		this.position = position;
		this.size = size;
		this.stars = [];
		this.galaxy_name = name;
		this.galaxy_elements = '';
		
		this.planet_first_names = ['[y][e]r','[y][e][y]'];
    	this.planet_last_names = ['[e]r[y]','[e]nt[y]','[e]v[y]','[y]x[e]','![e][y]'];
    	this.vowels = ['a','e','i','o','u','y'];
    	this.consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z'];
    	this.info = ['air','water','animals','humans','alien'];
		
		
		this.setPosition = function(position){
		    this.position = position;
		}
		
		//Generate name
		//---------------------------------------
		this.generate_name = function(){
		    var first_name = this.planet_first_names[Math.floor(Math.random()*2)];
			var last_name = this.planet_last_names[Math.floor(Math.random()*4)];
		    var elements = '';
		    
		    while(first_name.indexOf('[y]') != -1){
				var consonants = this.consonants[Math.floor(Math.random()*20)];
				elements += consonants;
				first_name = first_name.replace('[y]',consonants);
			}
			while(last_name.indexOf('[y]') != -1){
				var consonants = this.consonants[Math.floor(Math.random()*20)];
				elements += consonants;
				last_name = last_name.replace('[y]',consonants);
			}
			
			while(first_name.indexOf('[e]') != -1){
				var vowels = this.vowels[Math.floor(Math.random()*5)];
				elements += vowels;
				first_name = first_name.replace('[e]',vowels);
			}
			while(last_name.indexOf('[e]') != -1){
				var vowels = this.vowels[Math.floor(Math.random()*5)];
				elements += vowels;
				last_name = last_name.replace('[e]',vowels);
			}
			
			return {'name':first_name+last_name,'elements':elements};
		}
		
		this.galaxy_name = this.generate_name().name;
		
		//Create Galaxy
		//----------------------------------------
		this.create_galaxy = function(){
		    if(this.galaxy_name != undefined){
		        this.galaxy_name = this.generate_name();
		    }
		}
		
		this.planets = function(position,size,mass,star){
		    this.position = position;
		    this.size = size;
		    this.mas = mass;
		    this.id = 0;
		    this.text = '';
		    this.name = name;
		    this.elements = '';
		    this.currentElements = [];
		    this.star = star;
		    this.moons = [];
		    
		    this.animations = ['rotate','hover','enter','exit'];
		    
		    this.getPlanetElements = function(){
    			var element_holder = [];
    			for(a in elements.elements){
    				for(var i = 0; i < this.elements.length; ++i){
    					if(Object.keys(elements.elements[a]).toString().toLowerCase() == this.elements[i]){
    						if(element_holder[Object.keys(elements.elements[a])] == undefined) element_holder[Object.keys(elements.elements[a])] = [];
    						element_holder[Object.keys(elements.elements[a])].push(elements.elements[a])
    					}
    				}
    			}
    			for(a in element_holder){
    				this.currentElements.push(element_holder[a][Math.floor(Math.random()*element_holder[a].length)]);
    			}
    		}
    		
    		this.getPlanetInfo = function(){
    		    var planet = {'position':position,'size':size,'mass':mass};
    		    return planet;
    		}
		}
		
		//Star Object used for creating stars.
		//-----------------------------------------
		this.star = function(postion,size,mass){
    		this.position = postion;
    		this.size = size;
    		this.mass = mass;
    		this.id = 0;
    		this.text = '';
    		this.name = '';
    		this.elements = '';
    		this.currentElements = [];
    		this.galaxy = '';
    		this.planets = [];
    		
    		this.animations = ['rotate','hover','enter','exit'];
    		
    		this.getStarElements = function(){
    			var element_holder = [];
    			for(a in elements.elements){
    				for(var i = 0; i < this.elements.length; ++i){
    					if(Object.keys(elements.elements[a]).toString().toLowerCase() == this.elements[i]){
    						if(element_holder[Object.keys(elements.elements[a])] == undefined) element_holder[Object.keys(elements.elements[a])] = [];
    						element_holder[Object.keys(elements.elements[a])].push(elements.elements[a])
    					}
    				}
    			}
    			for(a in element_holder){
    				this.currentElements.push(element_holder[a][Math.floor(Math.random()*element_holder[a].length)]);
    			}
    		}
    		
    		// Get Star Info
    		//-------------------------------
    		this.getStarInfo = function(){
    			var star = {'position':position,'size':size,'mass':mass};
    			return star;
    		}
        }
		
		this.randomly_generate_planets = function(total,id){
		    for(var i = 0; i < total; ++i){
		        var ranx = Math.random()*this.size-Math.random()*this.size+Math.random()*1000;
				var rany = Math.random()*this.size-Math.random()*this.size+Math.random()*1000;
				var star = new this.star();
				
				if(Math.floor(Math.random()*10)%2){
				    ranx = -ranx;
				}
				if(Math.floor(Math.random()*10)%2){
				    rany = -rany;
				}
				
				planet.position = {"x":ranx,"y":rany};
				planet.size = Math.random()*100;
				planet.mass = Math.random()*900000;
				
				var planet_holder = new this.planets(planet.position,planet.size,planet.mass,this.star_name);
				
				var generated_name = this.generate_name(planet);
				planet_holder.id = 'planet_'+this.stars.length;
				planet_holder.name = generated_name.name;
				planet_holder.elements = generated_name.elements;
				planet_holder.getPlanetElements();
				this.stars[id].planets.push(planet_holder);
		    }
		}
		
		// Randomely Generate Star
		//-------------------------------
		this.randomly_generate_stars = function(total){
			for(var i = 0; i < total; ++i){
				var ranx = Math.random()*this.size-Math.random()*this.size+Math.random()*1000;
				var rany = Math.random()*this.size-Math.random()*this.size+Math.random()*1000;
				var star = new this.star();
				
				if(Math.floor(Math.random()*10)%2){
				    ranx = -ranx;
				}
				if(Math.floor(Math.random()*10)%2){
				    rany = -rany;
				}
				
				star.position = {"x":ranx,"y":rany};
				star.size = ((Math.random()*100));
				star.mass = Math.random()*900000;
				star.id = 'star_'+this.stars.length;
				
				star.elements = '';
				
				var generated_name = this.generate_name(star);
				star.name = generated_name.name;
				star.elements = generated_name.elements;
				star.name = star.name.charAt(0).toUpperCase()+star.name.slice(1,star.name.length);
				star.getStarElements();
				star.galaxy = this.galaxy_name;
				this.stars.push(star);
			}
			
			for(a in this.stars){
			    ctx.beginPath();
			    ctx.fillStyle = 'white';
			    ctx.arc(this.stars[a].position.x,this.stars[a].position.y,this.stars[a].size,0,2*Math.PI);
			    ctx.fill();
			}
		}
		
		this.randomly_generate_stars(this.size*10);
		
		// Get Stars
    	//-------------------------------
    	this.getStars = function(){
    		return this.stars;
    	}
	}
	
	//generate galaxy
	//-------------------------------
	this.generate_galaxy = function(position,size){
	    var galaxy = new this.galaxy(position,size);
	    galaxy.setPosition(position);
	    this.galaxies.push(galaxy);
	}
	
	// Store Stars
	//-------------------------------
	this.storeStars = function(star){
		this.stars[star.x].push(star);
		
		if(this.star.x > this.size[0]){
			this.size[0] = this.star.x;
		}
		if(this.star.y > this.size[1]){
			this.size[1] = this.star.y;
		}
		if(this.star.x < this.size[2]){
			this.size[2] = this.star.x;
		}
		if(this.star.y < this.size[3]){
			this.size[3] = this.star.y;
		}
	}
	
	// Fartherest reaches of the stars
	//-------------------------------
	this.fartherest = function(){
		return this.size;
	}
}