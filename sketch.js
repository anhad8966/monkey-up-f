var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var cSound;
var endSound;
var score;
var ig;
var ground, groundImage;

function preload(){
  
  groundImage  = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
endSound = loadSound("331912__kevinvg207__wrong-buzzer (1).wav");
  cSound = loadSound("166184__drminky__retro-coin-collect.wav");
}



function setup() {
  
  createCanvas(500,400);
  
FoodsGroup = createGroup();
obstacleGroup = createGroup();

  
  ground= createSprite(250,200);
ground.addImage(groundImage);


  
  
  
  
  monkey = createSprite(70,330);
  monkey.addAnimation("running",monkey_running)
monkey.scale = 0.12;
  
  ig = createSprite(200,365,400,10);
  ig.visible=false;
  
  
  score=0;
  
}


function draw() {
 
   
  background(0,0,0);
 
   ground.velocityX=-6;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  textSize(30);
  fill("black");
  
  
  
  
  
  if (gameState===PLAY){
    
   if(keyDown("space")  && monkey.y>300){
    monkey.velocityY= monkey.velocityY-6;
  }
  monkey.velocityY= monkey.velocityY+0.7;
  monkey.collide(ig);  
    
    
    spawnFood();
    if(monkey.isTouching(FoodsGroup)){
      FoodsGroup.destroyEach();
    monkey.scale= monkey.scale+ 0.005;
    score = score+2;
      cSound.play();
    }
    
    spawnObstacles();

  if(obstacleGroup.isTouching(monkey)){
   monkey.scale=monkey.scale-0.02;
    obstacleGroup.destroyEach();
    gameState = END;
  }
  
    
  }
  monkey.debug=false;
  
 
  
  
  
  
drawSprites();
   textSize(40);
   stroke("blue");
    fill("white");
  text("Score : "+score,170,90);
  if(gameState===END){
   ground.velocityX = 0;
   monkey.destroy();
   obstacleGroup.destroyEach();
   FoodsGroup.destroyEach();
  
   textSize(40);
   stroke("blue");
    fill("white");
  text("Game Over",120,200);
   
  
 }
}
function spawnFood(){
  
  if(frameCount%80===0){
   
    food = createSprite(500,200);
  food.addImage(bananaImage);
  food.scale=0.08;
    food.velocityX=-6;
    food.y=Math.round(random(120,270));
    FoodsGroup.add(food);
    
    
  }
}

function spawnObstacles(){
  if(frameCount%150===0){
   
    obstacle = createSprite(500,345);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacleGroup.add(obstacle);
    
    obstacle.depth=ground.depth;
    obstacle.depth = obstacle.depth+1;
  }
  
}

