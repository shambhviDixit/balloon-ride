var balloon,balloonImage1,balloonImage2;
var database;
var height;
var score = 0;
function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(2800,800);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, console.log("error"));
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg,100,200,2800,900);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-20,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //add the animation of balloon [use balloonImage2]
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(20,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //add the animation of balloon [use balloonImage2]
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
 //add the animation of balloon [use balloonImage2]
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  //add the animation of balloon [use balloonImage2]
    balloon.scale=balloon.scale+0.005;
  }



   



  drawSprites();
  fill(0);
  stroke("pink");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  text("**have FUN!**",1000,700);

}


function updateHeight(x,y){
  database.ref('/balloon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
  //assign the value of data to height
 height = data.val();
balloon.x = height.x;
balloon.y = height.y;

  //assign the x and y value of height to the respective x and y position of balloon
 }

function showError(){
  console.log("Error in writing to the database");
}
