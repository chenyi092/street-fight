let imgbg, imgryu, imgryuattack, imgryudamage, imgyoshi, imgball, imgyoshiattack, imgyoshidamage;
let ryux = 428, yoshix =1050, ballx = 650;
let ryuy = 300, yoshiy = 420, bally = 400;
let ryusizex = 286, ryusizey = 474;
let yoshisizex = 217, yoshisizey = 334;
let ballsizex = 90, ballsizey = 100;
let yoshiattackx = 950, yoshiattacky = 380;
let yoshiattacksizex= 480, yoshiattacksizey = 400;
let movingUp = false;
let movingLeft = false;
let yoshi_is_hit = false;
let ryu_is_hit = false;
let healthleft = 600;
let healthright = 0;
let maxHealth = 600;
let scene = 0;
let damageright = 50;
let damageleft = 50;
// let drawwidth = 600;
let countleft = 0;
let countright = 0;
var gamestate;
let start = 0;
let soundbg;
let yoshisound;
let ryusound;
let attacksound;
let op_flag = true;
let hasData1 = false; 
let hasData2 = false;



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let ref1 = firebase.database().ref('data1');
    ref1.on("value", gotData1);

let ref2 = firebase.database().ref('data2');
    ref2.on("value", gotData2);

function gotData1(data) {
  value1 = data.val(); // 获取Firebase数据库中的值
  console.log(value1); // 在控制台输出值
}

function gotData2(data) {
  value2 = data.val(); // 将第二个路径的值存储到变量 value2 中
  console.log(value2);
}

function preload() {
  soundFormats('mp3');
  soundop = loadSound('assets/op.mp3');
  soundfight = loadSound('assets/letsfight.mp3');
  soundfighting = loadSound('assets/fightmusic.mp3');
  yoshisound = loadSound('assets/yoshisound.mp3');
  ryusound = loadSound('assets/hadouken.mp3');
  sounded = loadSound('assets/ed.mp3');
  soundcheer = loadSound('assets/crowdcheer.mp3');
}

function setup() {
  imgbg = loadImage('bg.jpg');
  imgryu = loadImage('龍.png');
  imgryuattack = loadImage('龍射出.png');
  imgryudamage = loadImage('龍腳斷.png');
  imgyoshi = loadImage('耀西.png');
  imgball = loadImage('球.png');
  imgyoshiattack = loadImage('耀西舌頭長.png');
  imgyoshidamage = loadImage('耀西被揍.png');
  createCanvas(1773, 896);
  font = loadFont('PressStart2P-Regular.ttf') ;
  gamestate = 2;
  
  
  
}

function draw() {
 
   //預備姿勢
   image(imgbg, 0, 0, 1773, 896);
   image(imgryu, ryux, ryuy, ryusizex, ryusizey);
   if(movingLeft == false){
   image(imgyoshi, yoshix, yoshiy, yoshisizex, yoshisizey);
   }
  
  
  //start scene
  switch(scene){
    case 0:
      fill(240,190,0);
      textFont(font);
      textSize(40);
      textAlign(CENTER);
      stroke(0);
      strokeWeight(8);
      text("press s to start",width/2-20,480);
      if(start == 1){
        scene++;
      }
      break;
    }
 
  //start game
  if(gamestate == 0){
    
    if (value1 != 0) {
      movingUp = true;
      attacksound = ryusound;
      attacksound.play();
      attacksound.setVolume(0.5);
    }
    else movingUp = false;
    
    if(value2 != 0){
      movingLeft = true;
      attacksound = yoshisound;
      attacksound.play();
    }
    else movingLeft = false;
    
    
    //招式
   if(movingUp){
     imgryu = imgryuattack;
     image(imgball, ballx, bally, ballsizex, ballsizey);
     if(ballx < yoshix){
         ballx+=60;
     } else {
         if(healthright <= 600){
          healthright += value1/100;
         }
         imgryu = loadImage('龍.png');
         imgyoshi = imgyoshidamage;
         yoshi_is_hit = true;
         movingUp = false;
         ballx = 650;
     }
    
     // hasData1 = false;
  }
    
  
  if(movingLeft){
      image(imgyoshiattack, yoshiattackx, yoshiattacky, yoshiattacksizex, yoshiattacksizey);
      
    if(yoshiattackx > ryux+270)yoshiattackx-=60;
      
    else {
          if(healthleft >= 0){
          healthleft -= value2/100;
          }
          imgyoshi = loadImage('耀西.png');
          imgryu = imgryudamage;
          ryu_is_hit = true;
          movingLeft = false;
          yoshiattackx = 950;      
    }
    // hasData2 = false;
  }
    
    //被打變回原始姿勢
    if(yoshi_is_hit){
    if(countright < 50){
      countright++;
    }
    else{
      imgyoshi = loadImage('耀西.png');
      yoshi_is_hit = false;
      countright = 0;
    }
  }
  
  if(ryu_is_hit){
    if(countleft < 40){
      countleft++;
    }
    else{
      imgryu = loadImage('龍.png');
      ryu_is_hit = false;
      countleft = 0;
    }
  }
  
    
  //生命條左
 
  //邊框左
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(0, 0, 600, 50);
  
  //顏色左
  if(healthleft < 150){
    fill(255, 0, 0);
  }
  else if(healthleft < 300){
    fill(255, 200, 0);
  }
  else{
    fill(0, 255, 0);
  }
  
  //血量條左
  noStroke();
  drawwidth = healthleft;
  rect(0, 3, drawwidth , 45);
  
  //生命條右
  
  //邊框右
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(1173, 0, 600, 50);
  
  //顏色右
  if(healthright > 450){
    fill(255, 0, 0);
  }
  else if(healthright > 300){
    fill(255, 200, 0);
  }
  else{
    fill(0, 255, 0);
  }
  
  //血量條右
  noStroke();
  drawwidth2 = 1173+healthright;
  rect(drawwidth2, 3, 1773 , 45);


  
  
  //龍勝利
  if(healthright >= 600){
    fill(250,0,0);
      textFont(font);
      textSize(35);
      textAlign(CENTER);
      stroke(255);
      strokeWeight(8);
      text("You Win!",600,300);
      gamestate = 1;
      imgyoshi = loadImage('耀西.png');
      soundcheer.play();
    noLoop();
  }
  
  //耀西勝利
  if(healthleft <= 0){
    fill(250,0,0);
      textFont(font);
      textSize(35);
      textAlign(CENTER);
      stroke(255);
      strokeWeight(8);
      text("You Win!",1200,300);
      gamestate = 1;
      imgryu = loadImage('龍.png');
      soundcheer.play();
    noLoop();
  }
  }
  
  if(gamestate == 1){
    
    fill(240,190,0);
      textFont(font);
      textSize(30);
      textAlign(CENTER);
      stroke(0);
      strokeWeight(8);
      text("press r to restart",width/2-20,480);
      soundfighting.stop();
      soundbg = sounded;
      soundbg.play();
  }
      
}

function mouseClicked() {
  if (op_flag ) {
    soundop.play();
  } 
  op_flag = false;
}


function keyPressed() {
  
  if(key == 'r'){
    restart();
    soundbg.stop();
    soundop.play();
  }
  if(key == 's'){
    gamestate = 0;
    start = 1;
    soundop.stop();
    soundbg = soundfight; 
    soundbg.play();
    soundfighting.loop();
  }
}
  
function restart(){
      start = 0;
      healthright = 0;
      healthleft = 600;
      scene = 0;
      gamestate = 2;
      loop();
}

    
    
      


