var galaxy_render = function(star_size,orbits,offset){
    this.star_size = star_size;
    this.galaxy_offset = offset;
    this.orbits = orbits;
    this.state = 'none';
    this.selected_star = '';
    this.depth_higher = 'false';
    
    this.init = function(){
        this.grd=ctx.createRadialGradient(100,105,5,100,100,10);
        this.grd.addColorStop(0,"rgba(0,0,0,.1)");
        this.grd.addColorStop(1,"rgba(0,0,0,.5)");
        
        ctx.beginPath();
        ctx.fillStyle = this.grd;
        ctx.arc(100,100,10,0,2*Math.PI);
        ctx.fill();
        
        this.pi_circle = 2*Math.PI;
        
        ctx.fillStyle = 'black';
        
        ctx.beginPath();
        ctx.arc(canvas.offsetWidth/2,canvas.offsetHeight/2,this.star_size,0,this.pi_circle);
        ctx.stroke();
        
        this.zoom = 1;
        this.offset = {'x':0,'y':0};
        this.current_selected = '';
        
        this.selected_objects = [];
        this.current_selected = '';
        this.mouse_state = 'hover';
        
        this.circles = [];
        
        for(var i = 0; i < this.orbits.length; i++){
            var position = {'x':parseFloat(this.orbits[i].position.x),'y':parseFloat(this.orbits[i].position.y)};
            if(this.circles[i-1] != undefined){
                position.x += (this.circles[i-1].x);
            }
            
            position.angle = i;
            position.size = ((Math.random()*2)*(Math.random()*this.star_size/7))+5;
            position.radius = Math.sqrt(Math.pow(position.x,2)+Math.pow(position.y,2));
            position.name = this.orbits[i].name;
            
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.arc(position.x,position.y,position.size,0,this.pi_circle);
            ctx.stroke();
            
            position.z_index = Math.random()*100;
            position.moons = [];
            
            this.circles.push(position);
        }
        
        this.mouse_position = {'x':0,'y':0};
        
        this.star_color = [];
        for(var i = 0; i < 3; i++){
        	this.star_color[i] = Math.floor(Math.random()*255);
        }
        
        var galaxy_self = this;
        
        this.render = function(){
            if(galaxy_self.star_size*galaxy_self.zoom < 1){
                this.depth_higher = 'true';
            } else {
            	var grd=ctx.createRadialGradient(galaxy_self.offset.x+(canvas.offsetWidth/2),
                    							galaxy_self.offset.y+(canvas.offsetHeight/2),1,
                    							galaxy_self.offset.x+(canvas.offsetWidth/2),
                    							galaxy_self.offset.y+(canvas.offsetHeight/2),galaxy_self.star_size*galaxy_self.zoom);
            			grd.addColorStop('.5',"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",1)");
            			grd.addColorStop(0,'rgba(255,255,255,1)');
            			grd.addColorStop('.4','rgba(255,255,255,1)');
            			grd.addColorStop(1,"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",0)");
            	
            	ctx.beginPath();
                ctx.arc(galaxy_self.offset.x+(canvas.offsetWidth/2),galaxy_self.offset.y+(canvas.offsetHeight/2),galaxy_self.star_size*galaxy_self.zoom,0,galaxy_self.pi_circle);
                ctx.fillStyle = grd;
                ctx.fill();
            	
            	if(galaxy_self.mouse_position != undefined && 
                    	galaxy_self.mouse_position.x <= galaxy_self.offset.x+(canvas.offsetWidth/2)+(galaxy_self.star_size) &&
                    	galaxy_self.mouse_position.x >= galaxy_self.offset.x-(canvas.offsetWidth/2)-(galaxy_self.star_size) &&
                    	galaxy_self.mouse_position.y <= galaxy_self.offset.y+(canvas.offsetHeight/2)+(galaxy_self.star_size) &&
                    	galaxy_self.mouse_position.y >= galaxy_self.offset.y-(canvas.offsetHeight/2)-(galaxy_self.star_size)){
                            //galaxy_self.offset = {'x':(canvas.offsetWidth/4),'y':(canvas.offsetHeight/4)};
            	}
            	
            	for(a in galaxy_self.circles){
            		var speed = (galaxy_self.pi_circle*(1000/galaxy_self.circles[a].radius)/(100*galaxy_self.circles[a].size));
                    var position = {'x':Math.cos(galaxy_self.circles[a].angle+speed)*galaxy_self.circles[a].radius,'y':Math.sin(galaxy_self.circles[a].angle+speed)*galaxy_self.circles[a].radius};
                    
                    position.moons = [];
                    
                    position.angle = galaxy_self.circles[a].angle+speed;
                    position.radius = galaxy_self.circles[a].radius;
                    position.size = galaxy_self.circles[a].size;
                    position.name = galaxy_self.circles[a].name;
                    position.speed = speed;
                    position.z_index = galaxy_self.circles[a].z_index;
                    
                    ctx.beginPath();
                    
                    var collide = 'false';
                    if(galaxy_self.mouse_position != undefined && 
                    	galaxy_self.mouse_position.x <= (galaxy_self.offset.x-(position.x*galaxy_self.zoom)+(position.size+10))+(canvas.offsetWidth/2) &&
                    	galaxy_self.mouse_position.x >= (galaxy_self.offset.x-(position.x*galaxy_self.zoom)-(position.size+10))+(canvas.offsetWidth/2) &&
                    	galaxy_self.mouse_position.y <= (galaxy_self.offset.y-(position.y*galaxy_self.zoom)+(position.size+10))+(canvas.offsetHeight/2) &&
                    	galaxy_self.mouse_position.y >= (galaxy_self.offset.y-(position.y*galaxy_self.zoom)-(position.size+10))+(canvas.offsetHeight/2)){
                    		if(galaxy_self.mouse_state == 'click' ){
                    			if(galaxy_self.current_selected != galaxy_self.circles[a].name){
                    				galaxy_self.mouse_state = 'hover';
    	                			galaxy_self.current_selected = galaxy_self.circles[a].name;
    	                    		id = a;
    	                    		galaxy_self.selected_objects.push(a);
                    			} else {
                    				galaxy_self.state = 'change_scene';
                    				galaxy_self.selected_star = a;
                    			}
                    		} else {
                    			ctx.beginPath();
                    			ctx.fillStyle = grd;
                    			ctx.arc((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2),(galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2),
                    				position.size+10,
                    				0,galaxy_self.pi_circle);
                    			ctx.fill();
                    		}
                    		
                    		
                    }
                    
                   	for(i in galaxy_self.circles[a].moons){
                    	var moon_speed = (galaxy_self.pi_circle*(1000/galaxy_self.circles[a].size)/(100000*galaxy_self.circles[a].moons[i].size));
                    	var moon_position = {'x':Math.cos(galaxy_self.circles[a].moons[i].angle+moon_speed)*galaxy_self.circles[a].moons[i].radius,'y':Math.sin(galaxy_self.circles[a].moons[i].angle+speed)*galaxy_self.circles[a].moons[i].radius};
                    	
                    	moon_position.angle = galaxy_self.circles[a].moons[i].angle+moon_speed;
                        moon_position.radius = galaxy_self.circles[a].moons[i].radius;
                        moon_position.size = galaxy_self.circles[a].moons[i].size;
                        moon_position.name = galaxy_self.circles[a].moons[i].name;
                        moon_position.speed = moon_speed;
                    	
                    	var grd=ctx.createRadialGradient((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2)+(moon_position.x*galaxy_self.zoom),
                    									 (galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2)+(moon_position.y*galaxy_self.zoom),1,
                    									 (galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2)+(moon_position.x*galaxy_self.zoom),
                    									 (galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2)+(moon_position.y*galaxy_self.zoom),moon_position.size*galaxy_self.zoom);
        				grd.addColorStop('.5',"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",1)");
            			grd.addColorStop(0,'rgba(255,255,255,1)');
            			grd.addColorStop('.4','rgba(255,255,255,1)');
            			grd.addColorStop(1,"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",0)");
                    	
                    	ctx.beginPath();
                    	ctx.fillStyle = grd;
                    	ctx.arc((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2)+(moon_position.x*galaxy_self.zoom),(galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2)+(moon_position.y*galaxy_self.zoom),galaxy_self.circles[a].moons[i].size*galaxy_self.zoom,0,galaxy_self.pi_circle);
                    	ctx.fill();
                    	
                    	if(galaxy_self.circles[a].name == galaxy_self.current_selected && moon_position.radius > 0){
                    		ctx.beginPath();
                    		ctx.strokeStyle = 'rgba(255,255,255,1)';
                    		ctx.lineWidth = 1;
                    		ctx.arc((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2),(galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2),
                        		 moon_position.radius*galaxy_self.zoom,
                        		 0,galaxy_self.pi_circle);
                    		ctx.stroke();
                    	}
                    	
                    	position.moons[i] = moon_position;
                    }
                    
                	if(position.size > 0){
                    	var grd=ctx.createRadialGradient((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2),
                    									 (galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2),1,
                    									 (galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2),
                    									 (galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2),galaxy_self.circles[a].size*galaxy_self.zoom);
        				grd.addColorStop('.5',"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",1)");
            			grd.addColorStop(0,'rgba(255,255,255,1)');
            			grd.addColorStop('.4','rgba(255,255,255,1)');
            			grd.addColorStop(1,"rgba("+galaxy_self.star_color[0]+","+galaxy_self.star_color[1]+","+galaxy_self.star_color[2]+",0)");
        				
                    	ctx.beginPath();
                        ctx.fillStyle = grd;
                        ctx.arc((galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2),(galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2),
                        		 position.size*galaxy_self.zoom,
                        		 0,galaxy_self.pi_circle);
                        ctx.fill();
                	}
                    
                    if(galaxy_self.current_selected == galaxy_self.circles[a].name){
                    	ctx.fillStyle = 'rgba(255,255,255,.3)';
                    	ctx.lineWidth = 1;
                    	ctx.fillText(galaxy_self.current_selected,(galaxy_self.offset.x-(position.x*galaxy_self.zoom))+(canvas.offsetWidth/2)+position.size+10,(galaxy_self.offset.y-(position.y*galaxy_self.zoom))+(canvas.offsetHeight/2));
                    	galaxy_self.offset = {'x':position.x*galaxy_self.zoom,'y':position.y*galaxy_self.zoom};
                    }
                    galaxy_self.circles[a] = position;
                }
                
                ctx.beginPath();
                ctx.fillText('Star: '+star_size,10,86);
                ctx.fill();
                
                for(a in galaxy_self.selected_objects){
                    if(galaxy_self.selected_objects[parseInt(a)+1] != undefined){
                        var position = galaxy_self.circles[galaxy_self.selected_objects[a]];
                        var position2 = galaxy_self.circles[galaxy_self.selected_objects[parseInt(a)+1]];
                    	ctx.beginPath();
                    	ctx.lineWidth = 1;
                    	ctx.lineStyle = 'white';
                    	ctx.moveTo((parseInt(position.x*galaxy_self.zoom)-parseInt(galaxy_self.offset.x*galaxy_self.zoom))+parseInt(canvas.offsetWidth/2),parseInt((position.y*galaxy_self.zoom)-(galaxy_self.offset.y*galaxy_self.zoom))+parseInt(canvas.offsetHeight/2));
                    	ctx.lineTo((parseInt(position.x*galaxy_self.zoom)-parseInt(galaxy_self.offset.x*galaxy_self.zoom))+parseInt(canvas.offsetWidth/2),parseInt((position.y*galaxy_self.zoom)-(galaxy_self.offset.y*galaxy_self.zoom))+parseInt(canvas.offsetHeight/2));
                    	ctx.stroke();
                    }
                }
            }
        }
        
        window.onmousewheel = function(el){
        	if(el.wheelDelta > 0){
        		galaxy_self.zoom +=.03;
        	} else {
        		galaxy_self.zoom -=.03;
        	}
        }
        
        window.onmousemove = function(el){
            galaxy_self.mouse_position.x = el.pageX;
            galaxy_self.mouse_position.y = el.pageY;
        }
        
        window.onclick = function(el){
        	galaxy_self.mouse_state = 'click';
        	galaxy_self.mouse_position.x = el.pageX;
        	galaxy_self.mouse_position.y = el.pageY;
        }
    }
}