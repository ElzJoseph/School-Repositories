document.addEventListener('DOMContentLoaded', ()=>{

		let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");

	var background = new Image();
	background.src = 'Sprites/Background.jpeg';

	let score = 0;
	let start = false;

	let scoreText = {

		font : "20px Courier",
		color : "Black",
		align : "left",
		baseline : "top",

		draw : function () {
			let x = 0;
			let y = 0;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText(`Score : ${score}`, x, y);
		}

	}

	const startButton = {
		x : canvas.width/2,
		y : canvas.height/2,
		width : 100,
		height : 100 ,
		color : "Black",
		textColor : "White",
		font : "32px Courier",
		align : "center",
		baseline : "middle",

		draw : function (){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

			ctx.fillStyle = this.textColor;
			ctx.font = this.font;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText('Start', this.x, this.y);
		},

		checkClicked : function (event){
			if ((event.offsetX >= this.x- this.width/2) && (event.offsetY >= this.y- this.height/2) && (event.offsetX <= (this.x+this.width/2)) && (event.offsetY <= (this.y+this.height/2))) start = true;
		}
	}


	class Trash{ 
		constructor(imagePath)
		{
			this.sprite = new Image();
			this.sprite.src = imagePath;

			this.x = Math.floor(Math.random() * 500)
			this.y = -200 


			this.update = function(proggress) {
				
				this.y += 1 * proggress

				if(this.y > 1000 ){
					for(var i=0; i<trashes.length; i++)
					{
						if(trashes[i] == this)
						{
							trashes.splice(i,1);
						}
					}

				}
				if(checkRectOverlap(this, trash_can))
				{
					for(var i=0; i<trashes.length; i++)
					{
						if(trashes[i] == this)
						{
							trashes.splice(i,1);
						}
					}
						score++;
				}

			}

		}


	}

	class Trash_can{
		constructor(imagePath)
		{
			this.sprite = new Image();
			this.sprite.src = imagePath;

			this.x = 200
			this.y = 600

			this.update = function(proggress){

				trashes.forEach(function (currentTrash){
					


				})

			}
		}
	}
	var trash_can = new Trash_can('Sprites/trashcan.png');


	 

	var Botol_sprite = 'Sprites/Botol_sprite.png';
	var Botol = 'Sprites/Botol.png';	
	var Koran_Bekas = 'Sprites/Koran_Bekas.png';
	var Pemutih = 'Sprites/Pemutih.png';
	var Pizza_Box = 'Sprites/Pizza_Box.png';
	var Box = 'Sprites/Box.png';
	var Kaleng = 'Sprites/Kaleng.png';
	var Rinso = 'Sprites/Rinso.png';

	trash_path = [

		Botol_sprite,
		Botol,
		Koran_Bekas,
		Pemutih,
		Pizza_Box,
		Box,
		Kaleng,
		Rinso	

	]

	trashes = [];



	document.addEventListener("keydown",function onEvent(event){
		if(!start)
		{
			return;
		}

		if(event.code === "ArrowLeft"){
			trash_can.x -= 50;	
			console.log("Hello World")	
		}
		else if(event.code === "ArrowRight"){
			 trash_can.x += 50;
		}

	})

	document.querySelector("#canvas").addEventListener('click', function(event){
		if (!start) startButton.checkClicked(event);
	})

	var time_counter = 0;                                                                                                                                                                                                                                  

	function update(proggress) {
		
		if(!start)
		{
			return;
		}

		if(trash_can.x < 0 ){

			trash_can.x = 0;
		}

		else if(trash_can.x + trash_can.sprite.width > 650){

			trash_can.x = 650 - trash_can.sprite.width;
		}

		time_counter += proggress;
		if(time_counter > 3000 ){

			var random_trash = Math.floor(Math.random() * 8)

			trashes.push(new Trash(trash_path[random_trash]));
			time_counter = 0;
		}

		// console.log(proggress)

		trashes.forEach(function (currentTrash){
			currentTrash.update(proggress);
		})


	}

	function draw() {

		ctx.clearRect(0,0,650,975);
		ctx.drawImage(background,0,0);
		ctx.drawImage(trash_can.sprite,trash_can.x,trash_can.y,trash_can.sprite.width, trash_can.sprite.height);

		trashes.forEach(function (currentTrash){
			ctx.drawImage(currentTrash.sprite, currentTrash.x, currentTrash.y,currentTrash.sprite.width, currentTrash.sprite.height);
		})

		scoreText.draw();
	

		if(!start){
			startButton.draw();
		}
	}

	function loop(timestamp){

		var proggress = timestamp-lastrender;
		update(proggress);
		draw();
		lastrender = timestamp;
		window.requestAnimationFrame(loop); 

	}

	var lastrender = 0;
	window.requestAnimationFrame(loop); 

	function checkRectOverlap(itemA, itemB) {

	    if ((itemA.x < itemB.x && itemB.x < (itemA.x + itemA.sprite.width)) //Event that x3 is inbetween x1 and x2
	        || (itemA.x < (itemB.x + itemB.sprite.width) && (itemB.x + itemB.sprite.width) < (itemA.x + itemA.sprite.width)) //Event that x4 is inbetween x1 and x2
	        || (itemB.x < itemA.x && (itemA.x + itemA.sprite.width) < (itemB.x + itemB.sprite.width))) {  //Event that x1 and x2 are inbetween x3 and x4
	        //Check whether there is a y overlap using the same procedure
	        if ((itemA.y < itemB.y && itemB.y < (itemA.y + itemA.sprite.height)) //Event that y3 is between y1 and y2
	            || (itemA.y < (itemB.y + itemB.sprite.height) && (itemB.y + itemB.sprite.height) < (itemA.y + itemA.sprite.height)) //Event that y4 is between y1 and y2
	            || (itemB.y < itemA.y && (itemA.y + itemA.sprite.height) < (itemB.y + itemB.sprite.height))) { //Event that y1 and y2 are between y3 and y4
	            return true;
	        }
	    }
	    return false;
	}
	
})



