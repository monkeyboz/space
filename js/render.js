var render = function(type){
	this.air = null;
	this.water = null;
	this.animals = null;
	this.space = new space();
	this.type = type;
	this.curr_position = {'x':0,'y':0};
	this.zoom = 1;
	this.speed = 10;
	this.position = {'x':0,'y':0};
	this.completed = false;
	this.depths = ['space','galaxy','star','planet'];
	this.animation_store = [];
	this.interval = null;
	this.current_mouse_position = {'x':0,'y':0};
	this.offset = {'x':0,'y':0};
	this.currentPosition = {'x':0,'y':0};
	this.menu_list = [];
	this.current_selected_depth_item_id = [];
	this.galaxy = null;
	this.galaxy_completed = 'false';
	this.solar_system_completed = 'false';
	this.planets = [];
	
	var anime = this.animation_store;
	
	this.createMenu = function(x,y,width,height,title,text){
		ctx.beginPath();
        ctx.rect(0,0,width,height);
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.fill();
	}
	
	this.setOrigin = function(position){
	    this.origin = position;
	}
	
	this.create_galaxies = function(){
		for(var i = 0; i < 1000; i++){
			var x = Math.random()*1000;
			var y = Math.random()*1000;
			var size = Math.random()*100;
			if(Math.floor(Math.random()*10)%2 === 0){
				x = -x;
			}
			if(Math.floor(Math.random()*10)%2 === 0){
				y = -y;
			}
			this.space.generate_galaxy({'x':x,'y':y},size);
		}
		document.getElementsByTagName('body')[0].removeChild(div)
	}
	
	this.animation_store = {
		mouse_position : {'x':0,'y':0},
		set animation_array(info){
			if(this.animation_holder[info.id] === undefined){
				this.animation_holder[info.id] = info;
			    this.animation_holder['length'] = (this.animation_holder['length'] === undefined)?1:++this.animation_holder['length'];
			}
		},
		setMouse : function(info){
			this.mouse_position = info;
		},
		getMouse : function(info){
			return this.mouse_position;
		},
		animation_holder:[],
		checkCollision:function(object,mouse_position){
			if(mouse_position != undefined){
			    object.position.x +=self.position.x-mouse_position.x/5;
			    object.position.y +=self.position.y-mouse_position.y/5;
			}
			object.position.x =(object.position.x*self.zoom);
			object.position.y =(object.position.y*self.zoom);
			
			return object.position.x+(object.size/self.zoom) >= mouse_position.x && object.position.x-(object.size/self.zoom) <= mouse_position.x
				&& object.position.y+(object.size/self.zoom) >= mouse_position.y && object.position.y-(object.size/self.zoom) <= mouse_position.y;
		},
		animate : function(){
		}
	}
	
	this.init = function(){
		self.render_background('space',this.origin);
	}
	
	// Check Window Area
	//-------------------------------
	this.check_window_area = function(){
		 
	}
	
	// Generate Space
	//-------------------------------
	this.generate_space = function(){
		
	}
	
	// Randomely Generate Planets
	//-------------------------------
	this.randomly_generate_planets = function(){
		
	}
	
	// Randomely Generate Stars
	//-------------------------------
	this.randomly_generate_galaxy = function(){
		this.space.generate_galaxy({'x':0,'y':0},10);
	}
	
	//this.randomly_generate_galaxy();
	
	// Store Info
	//-------------------------------
	this.storeInfo = function(base_class,type){
		this.air = base_class.air;
		this.water = base_class.water;
		this.animals = base_class.animals;
	}
	
	this.animate_menu = function(animation,object){
		switch(animation){
			case 'menu':
				break;
			case 'info':
				break;
		}
	}
	
	this.calculate_information = function(elements,mass,size,line,json){
		var info = {'mass':0,'main_elements':[]};
		for(var i = 0; i < elements.length; ++i){
			info['mass'] += parseInt(elements[i][Object.keys(elements[i])][0][0])*size;
			
			info['main_elements'].push(elements[i][Object.keys(elements[i])][0]);
		}
		ctx.font = '12px Arial';
    	ctx.fillStyle = 'white';
	 	ctx.fillText('Mass: '+info['mass'],json.x+20,json.y+20+(line*14));
	 	for(a in info['main_elements']){
	 	    ctx.beginPath();
	 	    ctx.rect(json.x+18,json.y+(line*25),20,18);
	 	    ctx.fillStyle = 'rgba(255,0,0,.5)';
	 	    ctx.fill();
	 	    
	 	    ctx.beginPath();
	 	    ctx.rect(json.x+47,json.y+(line*25),120,18);
	 	    ctx.fillStyle = 'orange';
	 	    ctx.fill();
	 	    
	 	    ctx.font = '12px Arial';
    	    ctx.fillStyle = 'white';
	 	    ctx.fillText(info['main_elements'][a][2],json.x+20,json.y+13+(line*25));
	 	    
	 	    ctx.font = '12px Arial';
    	    ctx.fillStyle = 'white';
	 	    ctx.fillText(info['main_elements'][a][1],json.x+50,json.y+13+(line*25));
	 	    ++line;
	 	}
		return info;
	}
	
	this.render_find_button = function(){
	    ctx.beginPath();
	    ctx.fillRect(0,0,300,90);
	    ctx.fillStyle = 'white';
	    ctx.fill();
	    
	    ctx.beginPath();
	    ctx.fillRect(10,10,100,70);
	    ctx.fillStyle = 'black';
	    ctx.fill();
	}
	
	this.checkmenu = function(mouse_position){
		for(a in this.menu_list){
			if(this.menu_list[a].x >= mouse_position.x &&
				this.menu_list[a].x+this.menu_list[a].width <= mouse_position.x &&
				this.menu_list[a].y >= mouse_position.y &&
				this.menu_list[a].y+this.menu_list[a].height <= mouse_position.y
			){
			}
		}
	}
	
	this.get_calculated_position = function(mouse_position){
		var calc_x = parseFloat(this.origin.x-this.offset.x-mouse_position.x)/this.zoom;
		var calc_y = parseFloat(this.origin.y-this.offset.y-mouse_position.y)/this.zoom;
		return {'x':calc_x,'y':calc_y};
	}
	
	this.placeText = function(x,y,text,color){
		color = (typeof color != 'undefined')?color:"#fff";
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillText(text,x,y);
		ctx.fill();
	}
	
	// Render Background
	//-------------------------------
	this.render_background = function(mouse_position,mouse_type){
		canvas.setAttribute('width',window.innerWidth);
		canvas.setAttribute('height',window.innerHeight);
		
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		
		ctx.beginPath();
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
		ctx.fillStyle = 'black';
		ctx.fill();
		
		var currently_selected = null;
		var galaxies = this.space.galaxies;
		
		var calculated_position = this.get_calculated_position(mouse_position);
		var calc_x = calculated_position.x;
		var calc_y = calculated_position.y;
		
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillText('Calculated1: '+calc_x+':'+calc_y, 10, 90);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillText('Current Mouse: '+mouse_position.x+':'+mouse_position.y, 10, 100);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillText('Origin: '+this.origin.x+':'+this.origin.y, 10, 110);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillText('Zoom: '+this.zoom, 10, 120);
		ctx.fill();
		
		this.menu_list.push({'x':10,'y':120,'height':'100px','width':'300px'});
		
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillText('Offset: '+this.offset.x+':'+this.offset.y, 10, 130);
		ctx.fill();
		
		ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = '3'
		ctx.moveTo((canvas.offsetWidth/2)-10,canvas.offsetHeight/2);
		ctx.lineTo((canvas.offsetWidth/2)+10,canvas.offsetHeight/2);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = '3'
		ctx.moveTo((canvas.offsetWidth/2),(canvas.offsetHeight/2)-10);
		ctx.lineTo((canvas.offsetWidth/2),(canvas.offsetHeight/2)+10);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255,255,255,.3)';
		ctx.lineWidth = '3'
		ctx.moveTo(canvas.offsetWidth/2,canvas.offsetHeight/2);
		ctx.lineTo(mouse_position.x,mouse_position.y);
		ctx.stroke();
		
		switch(this.type){
			case 'galaxy':
				this.render_stars(mouse_position,this.current_selected_depth_item_id[0]);
				this.placeText(10,140,"Total Stars: "+this.space.galaxies[this.current_selected_depth_item_id[0]].getStars().length);
				this.placeText(10,155,"Selecte Galaxy: "+this.current_selected_depth_item_id[0]);
				break;
			case 'star':
				this.render_solar_system(mouse_position,this.current_selected_depth_item_id[0],this.current_selected_depth_item_id[1]);
				this.placeText(10,140,"Total Planets: "+this.space.galaxies[this.current_selected_depth_item_id[0]].stars[parseInt(this.current_selected_depth_item_id[1])].planets.length);
				this.placeText(10,155,"Selected Star: "+this.current_selected_depth_item_id[1],10,155);
				break;
			case 'galaxies':
			default:
				this.render_galaxies(galaxies,mouse_position,calc_x,calc_y);
				this.placeText(10,140,"Total Galaxies: "+galaxies.length);
				break;
		}
		
		this.checkmenu(mouse_position);
		if(currently_selected != null){
		    this.calculate_information(currently_selected[0],currently_selected[1],currently_selected[2],currently_selected[3],currently_selected[4]);
		}
		
		ctx.beginPath();
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText('Depth: '+this.type, canvas.offsetWidth-300, 80);
		ctx.fill();
	}
	
	this.render_solar_system = function(mouse_position,id,star_id){
		if(this.solar_system_completed == 'false'){
			this.galaxy_completed = 'false';
			if(this.space.galaxies[id].stars[parseInt(star_id)].planets.length < 1){
				this.space.galaxies[id].randomly_generate_planets(this.space.galaxies[id].stars[parseInt(star_id)].size/2,star_id);
			}
			this.planets = this.space.galaxies[id].stars[parseInt(star_id)].planets;
			this.galaxy = new galaxy_render(this.space.galaxies[id].stars[parseInt(star_id)].size,this.planets);
			this.galaxy.init();
			this.galaxy.render();
			this.solar_system_completed = 'true';
		} else {
			this.galaxy.render();
			if(this.galaxy.depth_higher == 'true'){
				this.type = 'galaxy';
				this.galaxy_completed = 'false';
				this.solar_system_completed = 'false';
			}
		}
	}
	
	this.render_stars = function(mouse_position,id){
		if(this.galaxy_completed == 'false'){
			var stars = this.space.galaxies[id].getStars();
			this.galaxy = new galaxy_render(this.space.galaxies[id].size,stars);
			this.galaxy.init();
			this.galaxy_completed = 'true';
		} else {
			this.galaxy.render();
			if(this.galaxy.state == 'change_scene'){
        		for(var i = 0; i < this.depths.length;++i){
    		   		if(this.type == this.depths[i]){
    		   			if(this.depths[i+1] != undefined){
    		   				this.current_selected_depth_item_id[1] = this.galaxy.selected_star;
    		   				this.type = this.depths[i+1];
    		   				this.offset = {'x':0,'y':0};
    		   				break;
    		   			} else {
    		   				this.type = this.depths[i];
    		   			}
    		   		}
    		   	}
			} else if(this.galaxy.depth_higher == 'true') {
			    this.galaxy_completed = 'false';
			    this.type = 'space';
			    this.zoom = 1;
			}
		}
	}
	
	this.render_grid = function(point,name,calc_x,calc_y,mouse_position,id){
		var origin_x = ((((point.position.x*this.zoom)+canvas.offsetWidth/2)))-(parseFloat(this.offset.x)/this.zoom);
		var origin_y = ((((point.position.y*this.zoom)+canvas.offsetHeight/2)))-(parseFloat(this.offset.y)/this.zoom);
		var x = ((((point.position.x*this.zoom)+canvas.offsetWidth/2))+calc_x);
		var y = ((((point.position.y*this.zoom)+canvas.offsetHeight/2))+calc_y);
		
		//gradient color
		//-----------------------
		var grd=ctx.createRadialGradient(origin_x,origin_y,1,origin_x,origin_y,(point.size/10)*this.zoom);
		grd.addColorStop(0,"rgba(255,255,255,1)");
		grd.addColorStop('.2',"rgba(255,255,255,.3)");
		grd.addColorStop(1,"rgba(0,0,255,0)");
		
		if(mouse_position.x <= this.offset.x+(canvas.offsetWidth/2)+(point.size) &&
           mouse_position.x >= this.offset.x-(canvas.offsetWidth/2)-(point.size) &&
           mouse_position.y <= this.offset.y+(canvas.offsetHeight/2)+(point.size) &&
           mouse_position.y >= this.offset.y-(canvas.offsetHeight/2)-(point.size)){
        	}
		
		if( ((origin_x+point.size/2)*this.zoom) >= ((mouse_position.x)*this.zoom) &&
		    ((origin_x-point.size/2)*this.zoom) <= ((mouse_position.x)*this.zoom) &&
		    ((origin_y+point.size/2)*this.zoom) >= ((mouse_position.y)*this.zoom) &&
		    ((origin_y-point.size/2)*this.zoom) <= ((mouse_position.y)*this.zoom)
		){
			if(this.mouse_event == 'click'){
			    if(self.currentPosition.x*this.zoom != point.position.x && self.currentPosition.x != point.position.y){
			        self.offset.x = (point.position.x*this.zoom)*this.zoom;
			        self.offset.y = (point.position.y*this.zoom)*this.zoom;
			        self.currentPosition = {'x':point.position.x,'y':point.position.y};
			    }
			   	for(var i = 0; i < this.depths.length;++i){
			   		if(this.type == this.depths[i]){
			   			if(this.depths[i+1] != undefined){
			   				this.current_selected_depth_item_id[0] = id;
			   				this.type = this.depths[i+1];
			   				this.offset = {'x':0,'y':0};
			   				break;
			   			} else {
			   				this.type = this.depths[i];
			   			}
			   		}
			   	}
			}
			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.fillText(point.name+' '+point.position.x+':'+origin_y,origin_x+point.size/2,origin_y);
			ctx.fill();
			
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.beginPath();
			ctx.arc(origin_x,origin_y,(origin_y,point.size/2)-2,0,2*Math.PI);
			ctx.fill();
		}
		
		//beginning circle
		//-----------------------
		if(this.completed == false){
			ctx.beginPath();
			ctx.arc(x,y,(point.size/10)*this.zoom,0,2*Math.PI);
			ctx.fillStyle = 'rgba(255,255,255,.2)';
			ctx.fill();
			
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.beginPath();
			ctx.fillText(point.galaxy_name,point.x+' '+point.size,y);
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.arc(origin_x,origin_y,(point.size/10)*this.zoom,0,2*Math.PI);
		ctx.fillStyle = grd;
		ctx.fill();
	}
	
	this.render_galaxies = function(galaxies,mouse_position,calc_x,calc_y){
		for(var n = 0; n < galaxies.length; ++n){
			var position = this.get_calculated_position(mouse_position);
			this.render_grid(galaxies[n],galaxies[n].galaxy_name,position.x,position.y,mouse_position,n);
		}
	}
	
	var self = this;
	
	setInterval(function(){
		self.render_background(self.current_mouse_position);
		if(self.completed == false && self.completed_timeout == undefined){
			self.completed_timeout = setTimeout(function(){
				self.completed_timeout = undefined;
				self.completed = true;
			},600);
		} else {
		}
	},100);
	
	window.addEventListener('resize',function(el){
		self.origin = {'x':canvas.offsetWidth/2,'y':canvas.offsetHeight/2};
	})
	
	window.addEventListener('mousemove',function(el){
		self.mouse_event = 'mousemove';
		self.current_mouse_position = {'x':el.pageX,'y':el.pageY};
		self.origin = {'x':canvas.offsetWidth/2,'y':canvas.offsetHeight/2};
		self.completed = false;
	});
	
	window.addEventListener('click',function(el){
		var x = self.offset.x+el.pageX-(canvas.offsetWidth/2);
		var y = self.offset.y+el.pageY-(canvas.offsetHeight/2);
		self.offset = {'x':x,'y':y};
		self.setOrigin({'x':x,'y':y});
		self.mouse_event = 'click';
		self.render_background(self.current_mouse_position);
	});
	
	window.addEventListener('mousewheel',function(el){
		//self.offset = self.currentPosition;
		self.mouse_event = 'mousewheel';
		if(el.deltaY > 0){
			if(self.zoom >= 0){
				self.zoom -= .1;
			} else {
				self.zoom = .1;
			}
		} else {
			self.zoom += .1;
		}
	});
}