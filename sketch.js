var dog,happyDog,dogg,running,sadDog;
var dogImg,database,foodS,foodStock;
var feedTime,Food,gameState;
var lastFed=0
var feed,addFood;
var washroom,bedroom,garden,livingRoom;
var currentTime,vacci,Inject_img,injection;
var viewFood,viewFood_img,viewFoodBtn;
var back1,back2,done;
var viewSchedule,viewSchedule_img,viewScheduleBtn;

function preload(){
    dogImg = loadImage("Dog.png")
    dogg = loadImage("DogSleeping.png")
    happyDog= loadImage("happydog.png")
    running=loadImage("runningLeft.png")
    washroom=loadImage("Wash Room.png")
    bedroom=loadImage("Bed Room.png")
    garden=loadImage("Garden.png")
    livingRoom=loadImage("Living Room.png")
    viewFood_img=loadImage("Food Stock.png")
    viewSchedule_img=loadImage("VaccinationSchedule.png")
    Inject_img=loadImage("DoggyInject.png")
    //sadDog=loadImage("")
}

function setup() {
   createCanvas(1250, 550);
    database=firebase.database();
    food = new Foods(400,100);
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    readState=database.ref('gameState');
    readState.on("value",function(data){
      gameState=data.val();
    })

    dog = createSprite(600,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3
    //food=new Foods(290,100,50,50)
    viewFood=createSprite(1000,400,30,30)
    viewFood.addImage(viewFood_img)
    viewFood.scale=0.3
    viewFood.visible=false;

    viewSchedule=createSprite(1000,400,30,30)
    viewSchedule.addImage(viewSchedule_img)
    viewSchedule.scale=0.3
    viewSchedule.visible=false;

    injection=createSprite(1000,400,900,900)
    injection.addImage(Inject_img)
    injection.scale=0.7
    injection.visible=false;
    
    feed=createButton("Feed the dog")
    feed.position(550,75)
    feed.mousePressed(feedDog)
    this.feed.style("height","50px")
    this.feed.style("width","200px")
    this.feed.style("background-color","green")
    this.feed.style("border","2px solid red")
    this.feed.style("border-radius","20px")
    this.feed.style("color","red")
    this.feed.style("font-size","20px")
    this.feed.style("outline","none")

    addFood=createButton("Add Food")
    addFood.position(780,75)
    this.addFood.style("height","50px")
    this.addFood.style("width","200px")
    this.addFood.style("background-color","green")
    this.addFood.style("border","2px solid red")
    this.addFood.style("border-radius","20px")
    this.addFood.style("color","red")
    this.addFood.style("font-size","20px")
    this.addFood.style("outline","none")
    addFood.mousePressed(addFoods)

    NameDog=createInput("Name your Dog:")
    this.NameDog.style("height","40px")
    this.NameDog.style("width","230px")
    this.NameDog.style("background-color","green")
    this.NameDog.style("border","2px solid red")
    this.NameDog.style("border-radius","20px")
    this.NameDog.style("color","red")
    this.NameDog.style("font-size","20px")
    this.NameDog.style("outline","none")
    this.NameDog.style("text-align","center")
    NameDog.position(1000,80)

    viewFoodBtn=createButton("View Food Stock")
    viewFoodBtn.position(880,220)
    this.viewFoodBtn.style("height","50px")
    this.viewFoodBtn.style("width","200px")
    this.viewFoodBtn.style("background-color","green")
    this.viewFoodBtn.style("border","2px solid red")
    this.viewFoodBtn.style("border-radius","20px")
    this.viewFoodBtn.style("color","red")
    this.viewFoodBtn.style("font-size","20px")
    this.viewFoodBtn.style("outline","none")
    viewFoodBtn.mousePressed(seeFood);

    back1=createButton("Back")
    back1.position(1100,220)
    this.back1.style("height","50px")
    this.back1.style("width","100px")
    this.back1.style("background-color","green")
    this.back1.style("border","2px solid red")
    this.back1.style("border-radius","20px")
    this.back1.style("color","red")
    this.back1.style("font-size","20px")
    this.back1.style("outline","none")
    back1.mousePressed(backk)

    viewScheduleBtn=createButton("View Vaccination Schedule")
    viewScheduleBtn.position(880,155)
    this.viewScheduleBtn.style("height","50px")
    this.viewScheduleBtn.style("width","200px")
    this.viewScheduleBtn.style("background-color","green")
    this.viewScheduleBtn.style("border","2px solid red")
    this.viewScheduleBtn.style("border-radius","20px")
    this.viewScheduleBtn.style("color","red")
    this.viewScheduleBtn.style("font-size","14px")
    this.viewScheduleBtn.style("outline","none")
    viewScheduleBtn.mousePressed(seeSchedule)

    back1=createButton("Back")
    back1.position(1100,155)
    this.back1.style("height","50px")
    this.back1.style("width","100px")
    this.back1.style("background-color","green")
    this.back1.style("border","2px solid red")
    this.back1.style("border-radius","20px")
    this.back1.style("color","red")
    this.back1.style("font-size","20px")
    this.back1.style("outline","none")
    back1.mousePressed(bacck)

    vacci=createButton("Proceed with Vaccination")
    this.vacci.style("height","50px")
    this.vacci.style("width","200px")
    this.vacci.style("background-color","green")
    this.vacci.style("border","2px solid red")
    this.vacci.style("border-radius","20px")
    this.vacci.style("color","red")
    this.vacci.style("font-size","20px")
    this.vacci.style("outline","none")
    vacci.position(900,500)
    vacci.scale=10
    vacci.mousePressed(proceed)
    vacci.hide();

    done=createButton("Done-->")
    done.position(900,500)
    this.done.style("height","50px")
    this.done.style("width","200px")
    this.done.style("background-color","green")
    this.done.style("border","2px solid red")
    this.done.style("border-radius","20px")
    this.done.style("color","red")
    this.done.style("font-size","20px")
    this.done.style("outline","none")
    done.mousePressed(donedone)
    done.hide();

}
function draw() {  
  background(46, 139, 87)
  //food.display();
  stroke(0,0,0)
  textSize(20)

  feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })
console.log(lastFed)

  fill(255,255,254);

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  currentTime=hour();
  if (currentTime===(lastFed+1)) {
        update("Playing")
        food.garden();
        textSize(30)
        text("Its Playing Time!!",200,300)
  }else if(currentTime===(lastFed+2)){
        update("Sleeping");
        food.bedroom();
        textSize(30)
        text("Its Sleeping Time!!",200,300)
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
        update("Bathing")
        food.washroom();
        textSize(30)
        text("Its Time To Bath!!",150,300)
  }else if(foodStock===0){
    update("living room")
    food.livingRoom();
    textSize(30)
    //text("Its Sleeping Time!!",200,500)
  }
  else{
        update("Hungry")
        food.display();
  }

  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.add//Image(dogImg)
  }

 drawSprites()
}

function feedDog(){
  //dog.addImage(happyDog);
  dog.addImage(running);
  dog.x=400

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function seeFood(){
  viewFood.visible=true;
}

function backk(){
  viewFood.visible=false;
}

function seeSchedule(){
  viewSchedule.visible=true;
  vacci.show();
}

function bacck(){
  viewSchedule.visible=false;
  vacci.hide();
}

function proceed(){

  injection.visible=true;
  done.show();
}

function donedone(){
   injection.visible=false;
   done.hide();
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS)
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
function showError(){
  console.log("Error in writing to the database");
}