var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird= new Image();
var background= new Image();
var ground= new Image();
var poleUp= new Image();
var poleDown= new Image();


bird.src="images/bird.png";
background.src="images/background.png";
ground.src="images/ground.png";
poleUp.src="images/poleUp.png";
poleDown.src="images/poleDown.png";



var gap=85;
var constant;

var bX=10;
var bY= 150;

var gravity=1.5;

var score=0;

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


document.addEventListener("click",moveUp);


function moveUp(){
    bY-=25;
    fly.play();

}



var pole=[];
pole[0]={

    x : canvas.width,
    y : 0
};

function draw(){
    ctx.drawImage(background,0,0);

    for (var i=0; i<pole.length;i++){ 
        
        constant=poleDown.height+gap;
    
        ctx.drawImage(poleDown,pole[i].x,pole[i].y)
        ctx.drawImage(poleUp,pole[i].x,pole[i].y+constant)
        
        pole[i].x--;

        if(pole[i].x==125){

            pole.push({

                x:canvas.width,
                y:Math.floor(Math.random()*poleDown.height)-poleDown.height

            }
            );
       

        }

        if( bX + bird.width >= pole[i].x && bX <= pole[i].x + poleDown.width && (bY <= pole[i].y + poleDown.height || bY+bird.height >= pole[i].y+constant) || bY + bird.height >=  canvas.height - ground.height){
            location.reload(); // reload the page
        }
        
        if(pole[i].x == 5){
            score++;
            scor.play();
        }

    }
    

   

    ctx.drawImage(ground,0,canvas.height-ground.height);

    ctx.drawImage(bird,bX,bY)

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,canvas.height-20);
    bY+=gravity;

    requestAnimationFrame(draw);

}
draw();