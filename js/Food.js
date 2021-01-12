class Food{
    constructor(){
        this.foodStock=0
        this.lastFed=0;
        this.img=loadImage("images/milk.png")
    }
        getFoodStock(){
            this.foodStock=database.ref('Dog/Food/Milk')
            this.foodStock.on("value",(data)=>{
                this.foodStock=data.val()
            })
        }
        updateFoodStock(x){
            this.foodStock+=x
            if(this.foodStock<0){
                this.foodStock=0;
            }

        }
        deductFood(){

        }
        display(){
            var x=80;
            var y=100;

            imageMode(CENTER);
            image(this.img,1024,220,70,70);

            if(this.foodStock!==0){
                for(var i=0;i<this.foodStock;i++){
                    if(i%10===0){
                        x=80;
                        y=y+50;
                    }
                    image(this.img,x,y,50,50);
                    x=x+30;
                }
            }
        }
    
}
