var tower,towerImg;
var ghost, ghostImg;
var doorGroup,door,doorImg;
var climberGroup,climber,climberImg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas (600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=5;
  
  ghost = createSprite(300,400);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  ghost.debug=true;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  background(0);
  if (gameState === "play"){
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if (keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if (keyDown("space")){
      ghost.velocityY=-7;
    }
    ghost.velocityY=ghost.velocityY+0.8;      
    if (tower.y>400){
      tower.y=300;
    }
    spawnDoors();
    
  if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
  

  drawSprites();
  }
  if (gameState==="end"){
    fill("white");
    textSize(24);
    text("Game Over",230,300);
  }
  
}

function spawnDoors(){
  if (frameCount%240===0){
    door = createSprite(200,50);
    door.addImage(doorImg);
    door.x=Math.round (random(120,400));
    door.velocityY=1;
    
    climber = createSprite(200,100);
    climber.addImage(climberImg);
    climber.debug=true;
    invisibleBlock = createSprite(200,105);
    invisibleBlock.height=2;
    invisibleBlock.debug=true;
    //invsibleBlock.visible=false;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    invisibleBlock.width=climber.width;
    invisibleBlock.velocityY=climber.velocityY;
    invisibleBlock.x=climber.x;
    invisibleBlock.y=climber.y;

    climber.velocityY=door.velocityY;
    climber.x =door.x;
    
    door.lifetime=700;
    climber.lifetime=700;
    invisibleBlock.lifetime=700;
    
    ghost.depth=door.depth+1;
    ghost.depth=climber.depth+1;
  }
  
  
  
  
}

