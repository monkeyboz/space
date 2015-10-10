var planet = function(size,position,animals,air,water,parent){
	this.size = size;
	this.position = position;
	
	this.animals = animals;
	this.air = air;
	this.water = water;
	
	this.parentClass = parent;
	
	this.parentClass.storeInfo(this);
}