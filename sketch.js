
var PLAY=1;
var START  = 2;
var END=0;
var gameState=2;
var fail = 0;

var sword,fruit ,monster,fruitGroup,enemyGroup,bomb,bombImage,
    explode , score,r,position,randomFruit,w,w2,w3,w4,f1,f2,f3,failImage;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,slash,gameOverSound,bgImage,bg,title ,titlePhoto,f1,f2,f3,failImage,failSound,bgSound;


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  slash = loadSound("slash.mp3");
  gameOverSound = loadSound("gameover.mp3");
  bgImage = loadImage("bg.jpg");
  bombImage= loadAnimation("b1.png","b2.png","b3.png","b4.png");
  explode = loadImage("explode.png");
  titlePhoto = loadImage("titlePhoto.jpg");
  failImage = loadImage("fail.png");
  failSound = loadSound("fail.mp3");
  bgSound  = loadSound("background.mp3");
}



function setup() {
  createCanvas(400, 400);
  title = createSprite(200,30);
  title.addImage(titlePhoto);
  
  bg = createSprite(200,200);
  bg.addImage(bgImage)
  bg.scale = 2.3
  //creating sword
   
  sword=createSprite(-50,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7;
  
  w = createSprite(200,-70,400,10);
  
  w2 = createSprite(200,470,400,10);
  
  w3 = createSprite(-70,200,10,400);
  
  w4 = createSprite(470,200,10,400);
  
  
  
  //set collider for sword
  sword.debug = false; 
  sword.setCollider("rectangle",0,0,50,100);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
      f1 = createSprite(375,50);
      f1.addImage(failImage);
      f1.scale = 0.5;
      f1.visible = false;
  
      f2 = createSprite(330,50);
      f2.addImage(failImage);
      f2.scale = 0.5;
      f2.visible = false;
  
      f3 = createSprite(285,50);
      f3.addImage(failImage);
      f3.scale = 0.5;
      f3.visible = false;
  
}

function draw() {
  background("black");
 
  drawSprites();
  if(gameState === START){
  textSize(40)
    f1.visible = false;
    f2.visible = false;
    f3.visible = false;
    
    
    
    fill("red")
    text("Press Space To Start!",10,380);
    textSize(25);
    fill("Lightgreen");
    

    
    text("1) Thou must cut fruits ",10,100);
    text("to earn points.",10,125)
    text("2) Shall you miss any,",10,180);
    text(" prepare to lose a life.",10,205);
    text("3) Shall you lose 3 life,",10,255);
    text(" The game shall END.",10,280);
    text("4) The game shall TERMINATE,",10,315);
    text("Dare you cut the BOMB.",10,340);
    bg.visible = false;
  }
  if (gameState === START&& keyDown ("space")){
gameState=PLAY;
    bgSound.play(true);
  }
  if(gameState===PLAY){
  textSize(25);
  fill("lightgreen");
  text("Score : "+ score,150,30);
    //Call fruits and Enemy function
    fruits();
    Enemy();
    bg.visible = true;
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
   if(fruitGroup.isTouching(w)||fruitGroup.isTouching(w2)||
      fruitGroup.isTouching(w3)||fruitGroup.isTouching(w4))  {
      fail = fail + 1;
     score = score - 3;
     failSound.play();
     fruitGroup.destroyEach();
    }
    if(fail === 1){
      f1.visible = true;
      
     
    }
     if(fail === 2){
     f2.visible = true;
      
    }
    if(fail === 3){
      failSound.stop();
      f3.visible = true;
      gameState=END;
      
      fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
        sword.scale = 2;
        
        gameOverSound.play();
    }
     
    
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
      slash.play();
    }
    else
    {
      // Go to end state if sword touching enemy
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
        sword.scale = 2;
        
        gameOverSound.play();
      
       
      }
   
    }
  }
  if (gameState===END){
      textSize(25);
    fill("lightgreen");
    text("Score : "+ score,150,30); 
    text("Press r to Restart.",100,350)
    sword.addImage(gameOverImage);
    bgSound.stop();
  }
  if (gameState===END&&keyDown("r")){      
    gameState =START;
    score = 0;
    sword.scale = 0.7;
    sword.x = -50;
    sword.addImage(swordImage);
    fail = 0;
  }
  
  
  //Display score

}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,430,20,20);
    monster.addAnimation("bomb",bombImage);
    monster.scale= 0.5,
    monster.x = Math.round(random(50,350));
    
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  
  position = Math.round(random(1,4))
switch(position){
      case 1 :monster.y =400;
    monster.x=Math.round(random(50,350));
      monster.velocityY = -8;
      break;
      case 2 :  monster.y = 0;
    monster.x=Math.round(random(50,350));
      monster.velocityY = 8;
      break;
      case 3 : monster.x = 0;                                         monster.y=Math.round(random(50,350));
      monster.velocityX = 8;
        break;
      case 4 : monster.x = 400;
        monster.y=Math.round(random(50,350));
        monster.velocityX = -8;
        break;
      default : break;
  
}
    switch(position){

case 1: if (score > 10){
  monster.velocityY = -(8+ score/4);
}
break;
case 2: if (score > 10){
  monster.velocityY = (8+ score/4);
}
break;
case 3 :if (score > 10){
  monster.velocityX = (8+ score/4);
}
break;
case 4 :if (score > 10){
  monster.velocityX = -(8+ score/4);
}
break;
 default : break;
  }
}
}
function fruits(){
  if(frameCount%60===0){
    fruit=createSprite(400,430,20,20);
    fruit.scale=0.2;
    fruit.collide(w)
     //fruit.debug=true;
    position = Math.round(random(1,4))
  switch(position){
      case 1 :fruit.y = 420 ;fruit.x=Math.round(random(50,350));
      fruit.velocityY = -7;
      break;
      case 2 :  fruit.y = -20;
      fruit.x=Math.round(random(50,350));
      fruit.velocityY = 7;
      break;
      case 3 : fruit.x = -20; fruit.y=Math.round(random(50,350));
      fruit.velocityX = 7;
        break;
      case 4 : fruit.x = 420;fruit.y=Math.round(random(50,350));
        fruit.velocityX = -7;
        break;
      default : break;
  }
  switch(position){

case 1: if (score > 4){
  fruit.velocityY = -(7+ score/4);
}
break;
case 2: if (score > 4){
  fruit.velocityY = (7+ score/4);
}
break;
case 3 :if (score > 4){
  fruit.velocityX = (7+ score/4);
}
break;
case 4 :if (score > 4){
  fruit.velocityX = -(7+ score/4);
}
break;
 default : break;
  }
      
    
     r=Math.round(random(1,4));
    switch(r){
      case 1 :                                  fruit.addImage(fruit1);
      break;
      case 2 :    fruit.addImage(fruit2);
      break;
      case 3 : fruit.addImage(fruit3);   
        break;
      case 4 : 
        fruit.addImage(fruit4);
        break;
      default : break;
      
    }
    
    
   
    
    
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
   
   
  
    }
  
}