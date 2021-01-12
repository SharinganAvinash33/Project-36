var dog, happyDog, sadDog;
var foodstock;
var foodS;
var foodButton,feedButton,fedTime,lastFed,food;

function preload(){
happyDog=loadImage("images/dogImg.png");
sadDog=loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(800, 500);
  dog=createSprite(600,200,50,50);
  dog.addImage(sadDog)
  dog.scale=0.5
  database=firebase.database();
  
  foodstock=database.ref('Dog/Food/Milk');
  foodstock.on("value",(data)=>{
    foodS=data.val();
    if(foodS<0){
      foodS=0
    }
    foodstock=foodS;
    console.log(foodS)
  });
  food=new Food();
  foodButton=createButton("Add Food");
  feedButton=createButton("Feed Dog")
  foodButton.position(200,15)
  feedButton.position(300,15)
  foodButton.mousePressed(addFood)
  feedButton.mousePressed(feedDog);
  fedTime=database.ref('Dog/Food/FedTime')
  fedTime.on("value",(data)=>{
    lastFed=data.val();
  })
}


function draw() {  
  background(46,139,87)
  if(foodS!==undefined){
  textSize(20)
  text("Food:"+foodstock,20,20)

  food.display();
  fill(255)
  textSize(20);
  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("Last Fed:12 AM",350,30)
  }else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }

  drawSprites();
 
  }}

function feedDog(){
  foodstock=foodstock-1;
  if(foodstock<0){
    foodstock=0
  }
  
  dog.addImage(happyDog);
  var time=hour();
  //time=hour();
  food.updateFoodStock(-1)
  database.ref('Dog/Food').update({
    'Milk':foodstock,
    'FedTime':time
  })
  
}
function addFood(){
  foodstock++;
  database.ref('Dog/Food').update({
    'Milk':foodstock
  })
 food.updateFoodStock(+1)
  var time=hour();
   database.ref('Dog/Food').update({
     'Milk':foodstock,
     'FedTime':time
   })
}