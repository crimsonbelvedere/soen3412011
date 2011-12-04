

function draw(){
	var calendar= new Calendar();
	calendar.draw();
	
}
var IE = document.all?true:false
var tempX=0;
var tempY=0;

function getMouseXY(e) {
  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  }  
  return true
}
//event handler
document.onmousemove = getMouseXY;



function Calendar(){
	//this.days=get_days();
	this.pos_x=20;
	this.pos_y=20;
	this.width=800;
	this.height=1720;
	this.days=new Array();
	this.header_size=200;
	this.engr_core=new CourseContainer(30,30,'engr_core');
	
	this.soft_core=new CourseContainer(30,140,'soft_core');
	this.comp_group=new CourseContainer(30,250,'comp_group');
	this.course_group=null;
	this.dispatcher=new Dispatcher(new Array(this.engr_core));//ths dispatcher registers an callback on click.
	this.draw=function draw(){
		var canvas = document.getElementById("canvas");  
		var ctx = canvas.getContext("2d"); 
		ctx.strokeStyle = "red";  
		ctx.strokeRect(this.pos_x, this.pos_y, this.width, this.height);
		for(key in this.days){
			this.days[key].draw(ctx);
		}
		this.engr_core.draw(ctx);
		this.soft_core.draw(ctx);
		this.comp_group.draw(ctx);
	}
	
	this.generate_days=function generate_days(){
		this.days['monday']=new Day('monday',this.pos_x,this.pos_y+this.header_size,0);
		this.days['tuesday']=new Day('tuesday',this.pos_x,this.pos_y+this.header_size,1);
		this.days['wednesday']=new Day('wednesday',this.pos_x,this.pos_y+this.header_size,2);
		this.days['thurday']=new Day('thurday',this.pos_x,this.pos_y+this.header_size,3);
		this.days['friday']=new Day('friday',this.pos_x,this.pos_y+this.header_size,4);
		this.days['saturday']=new Day('saturday',this.pos_x,this.pos_y+this.header_size,5);
	}
	this.generate_days();
	
	this.add_engineering_course=function add_engineering_course(course){
		
	}
	
}




this.get_courses=function get_courses(semester,course_slot_container){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			if(this.courses==null){
				var canvas = document.getElementById("canvas");  
				var ctx = canvas.getContext("2d"); 
				course_slot_container.courses=JSON.parse(xhr.responseText);
				course_slot_container.generate_course_slots();
				course_slot_container.draw(ctx);
			}
		}
	}
	
	xhr.open("GET","/soen_341_11_09/mockup/php/ajax_requests.php?semester="+semester,true);
	xhr.send();
	
}





function CourseContainer(pos_x,pos_y,type){
	this.type=type;//can be either engr_core, soft_core, comp_group
	this.width=775;
	this.height=100;
	this.color="red";
	this.pos_x=pos_x;
	this.pos_y=pos_y;
	this.course_slots=new Array();
	this.courses=null;
	this.draw=function draw(ctx){
		ctx.strokeStyle=this.color;
		ctx.strokeRect(this.pos_x,this.pos_y,this.width,this.height);
		for(var x=0;x<this.course_slots.length;x++){
			this.course_slots[x].draw(ctx);
		}
	}
	this.add_course_slot=function add_course_slot(name){
		//ERROR, course slot does not contain all the same position. need to check the number of course slots and assign proper positioninig.
		var cslot=new CourseSlot(this.pos_x+10,this.pos_y+10,name);
		
		var row=this.get_row(cslot);
		var column=this.get_column(cslot);
		cslot.set_y(row*cslot.get_height());
		cslot.set_x(column*cslot.get_width());
		this.course_slots[this.course_slots.length]=cslot;
		
	}
	//return the row of course_slots;
	this.get_row=function get_row(cslot){
		var number=this.course_slots.length;
		var number_that_fits_in_row=Math.floor(this.width/cslot.width);
		
		if((number/number_that_fits_in_row)>0){
			return Math.floor((number/number_that_fits_in_row));
		}else{
			return 0;
		}
		
	}
	this.get_column=function get_column(cslot){
		var number=this.course_slots.length;
		if(number>10){
			var bla=1;
		}
		var number_that_fits_in_row=Math.floor(this.width/cslot.width);
		return (number%number_that_fits_in_row);
	}



//todo: change the occurange of this to my_self. because this is a call back function, this will not be correctly referenced. 
	//this is the function that will run when the user click the screen. it will check which course slot has been clicked.
	
	this.find_receipiant_for_message=function find_receipiant_for_message(my_self){
		coordinate=new Object();
		coordinate.x=tempX;
		coordinate.y=tempY;
	    for(course_slot in this.course_slots){
                if(this.course_slots[course_slot].is_within(coordinate)){
			this.turn_off_previous_course_slot();
		    var blabla=0;
	              this.course_slots[course_slot].my_onclick();
		} 
	    }
	
	}

    this.turn_off_previous_course_slot=function f(){
        for(var i=0;i<this.course_slots.length;i++){
	    if(this.course_slots[i].is_clicked()){
	        this.course_slots[i].set_clicked(false);
		var canvas = document.getElementById("canvas");  
		var ctx = canvas.getContext("2d"); 
		
		this.course_slots[i].draw(ctx);
	    }
	}
    }	
	this.generate_course_slots=function generate_course_slots(){
		if(this.type=='engr_core'){
			//two is the semester
			var x;
			for(course in this.courses){
				
				for(var i=0;i<this.courses[course].class_type.length;i++){
					var bool1=this.courses[course].class_type[i]=='Core Course';
					var bool2=this.courses[course].class_sort[i]=='Engineering Core';
					var xxx=this.courses[course].class_type[i];
					var yyy=this.courses[course].class_sort[i];
					var pass=null;
					if(bool1 && bool2){
						var kkkkkk=this.courses[course].Number;
						this.add_course_slot(kkkkkk);
					}
				}
			}
		}
		
	}

	
	//called to debug.
	//this.generate_course_slots();
	get_courses(2,this);
        //when a click occurs, the find_receipiant_for_message is called.
	//ERROR!!! this is assigned at object creation, so the last intance of this class will be the receipiant of the call back.
	//assign this call back function from some dispatcher, so that it will receive the message and pass it along.
}


function Dispatcher(course_containers){
    this.course_containers=course_containers;
    this.find_receipiant= function find_receipiant(myself){
	for(var x=0;x<myself.course_containers.length;x++){
	    var course_container=myself.course_containers[x];
	    course_container.find_receipiant_for_message(course_container); 
	}
    }
    
    document.onclick=partial(this.find_receipiant,this);
}










//careful, text is often null
function CourseSlot(pos_x,pos_y,text){
	this.clicked_flag=false;
	this.name=name;
	this.width=	75;
	this.height=25;
	this.color="blue";
	this.pos_x=pos_x;
	this.pos_y=pos_y;
	this.text=text;//text is often null
	//set x adds x to the curret position
	this.set_x=function set_x(x){
		this.pos_x+=x;
	}
	//set y adds y to the curret position
	this.set_y=function set_y(y){
		this.pos_y+=y;
	}
	//verfies if the pos_x and pos_y are within the bounds of this object.
	//
        this.is_within=function is_within(coordinate){
	
            if(is_between(coordinate.x,this.pos_x,this.pos_x+this.width)&&is_between(coordinate.y,this.pos_y,this.pos_y+this.height)){

	      return true; 
	    }	
	    return false;

	}
	this.get_x=function get_x(){
		return this.pos_x;
	}
	this.get_y=function get_y(){
		return this.pos_y;
	}
	this.get_width=function get_width(){
		return this.width;
	}
	this.get_height=function get_height(){
		return this.height;
	}
	this.is_clicked=function f(){
	    return this.clicked_flag;
	}
	this.set_clicked=function f(flag){
	    this.clicked_flag=flag;
	}
	this.draw=function draw(ctx){
		//the flag is set but the container who looks for the CourseSlot based on the coordinate of the click and the
		//coordinate and dimentions of the CourseSlot
		//it is the dispatcher
		    if(this.clicked_flag){
			ctx.strokeStyle='yellow';
			ctx.strokeRect(this.pos_x,this.pos_y,this.width,this.height);
			this.draw_text(ctx,this.pos_x,this.pos_y);
		    }else{
			ctx.strokeStyle=this.color;
			ctx.strokeRect(this.pos_x,this.pos_y,this.width,this.height);
			this.draw_text(ctx,this.pos_x,this.pos_y)
		    }
	}
	this.draw_text=function draw_text(ctx,pos_x,pos_y) {

	    ctx.fillStyle = "blue";

	    ctx.font="8pt Helvetica";
	    ctx.fillText(this.text, pos_x, pos_y+13);

	}
	function set_test(text){
		this.text=text;
	}
	this.set_clicked=function set_clicked(){
	    if(this.clicked_flag=true){
                this.clicked_flag=false;
	    }
	    else{
		this.clicked_flag=true
	    }
	
	}
	this.my_onclick=function my_onclick(my_self){
		if(!this.clicked_flag){
		this.clicked_flag=true;
			
		}else{
		this.clicked_flag=false;
		}
		var canvas = document.getElementById("canvas");  
		var ctx = canvas.getContext("2d"); 
		this.draw(ctx);
		
	}
        
	//TODO: assign this function from somewhere else.
}












function Day( name, pos_x, pos_y,n_th){
	this.space=10;
	this.width=121;
	this.height=1500;
	this.pos_x=pos_x+this.space+this.space*n_th+this.width*n_th;
	this.pos_y=pos_y+this.space+200;//to move all the day down, add 50
	this.name=name;
	this.hours_in_a_day=14;
	this.slot_time=15;//there are minutes 15 minutes in a time slot.
	this.slots_array=new Array();
	this.n_th=n_th;
	this.generate_slots=function generate_slots(){
		var slots_number=(60/this.slot_time)*this.hours_in_a_day;
		for(var x=0; x<56;x++){
			this.slots_array[x]=new Slot(this.pos_x,this.pos_y,x)
		}
		
	}
	this.draw=function draw(ctx){
		ctx.strokeStyle="blue";
		ctx.strokeRect(this.pos_x,this.pos_y, this.width,this.height);
		for(var x=0; x<this.slots_array.length; x++){
			this.slots_array[x].draw(ctx);
		}
	}
	
	this.generate_slots();
	
}	

function Slot(pos_x,pos_y,n_th){
	this.width=121;
	this.height=25;
	this.color="blue";
	this.pos_x=pos_x;
	this.pos_y=pos_y+this.height*n_th;
	this.draw=function draw(ctx){
		ctx.strokeStyle="blue";
		ctx.strokeRect(this.pos_x, this.pos_y, this.width, this.height);
	}
}

	
function Course(pos_x,pos_y,n_th){
	
	
}

//return an array with course objects in it.

/**	
function Color( red,  green,  blue){
	this->red=red;
	this->green=green;
	this->blue=blue;
	
}
**/
function partial(func /*, 0..n args */) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  return function() {
	    var allArguments = args.concat(Array.prototype.slice.call(arguments));
	    return func.apply(this, allArguments);
	  };
	}


function is_between(coordinate_1_d,first_end,second_end){
	if(coordinate_1_d>first_end && coordinate_1_d<second_end){
	   return true;
	
	}
	return false;
}
