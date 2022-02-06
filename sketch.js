const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope2,rope3;

var bg_img;
var food;
var rabbit;

var button,blower,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var bgmusic,cutsound,sadsound,eatsound,airsound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bgmusic= loadSound("sound1.mp3");
  cutsound= loadSound("rope_cut.mp3");
  sadsound= loadSound("sad.wav");
  eatsound= loadSound("eating_sound.mp3");
  airsound= loadSound("air.wav");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);
  bgmusic.play();
  bgmusic.setVolume(0.25);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(170,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button2 = createImg('cut_btn.png');
  button2.position(350,60);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(430,190);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  
  rope = new Rope(7,{x:200,y:30});
  rope2 = new Rope(6.5,{x:370,y:60});
  rope3 = new Rope(7,{x:470,y:200});
  ground = new Ground(200,windowHeight,600,20);

   blower = createImg("blower.png");
   blower.position(10,250);
   blower.size(100,100);
   blower.mouseClicked(airblow);

mute_btn = createImg("mute.png");
mute_btn.position(440,20);
mute_btn.size(50,50);
mute_btn.mouseClicked(muteSound);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(430,windowHeight-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,windowWidth,windowHeight);

 push();
 imageMode(CENTER);
 if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatsound.play();
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     bgmusic.stop();
     sadsound.play();
     fruit=null;
   }

   drawSprites();
}

function drop()
{
  rope.break();
  cutsound.play();
  fruit_con.dettach();
  fruit_con = null; 
}
function drop2()
{
  rope2.break();
  cutsound.play();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
}
function drop3()
{
  rope3.break();
  cutsound.play();
  fruit_con_3.dettach();
  fruit_con_3 = null; 
}

function keyPressed(){
  if (keyCode==LEFT_ARROW) {
    airblow();
  }
}
function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.03,y:0});
  airsound.play();
}
function muteSound(){
  if (bgmusic.isPlaying()) {
    bgmusic.stop();
  } else {
    bgmusic.play();
  
  }
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
        }
