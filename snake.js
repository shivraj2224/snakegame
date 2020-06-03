const canvas = document.getElementById("canvas") ;
const ctx = canvas.getContext("2d") ;

//Create Unit
const box = 32 ;

//load Img
const ground = new Image() ;
ground.src = "img/ground.png" ;
//const foodImg = new Image() ;
//foodImg.scr = "img\food.jpg" ;

//Audio Files
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3" ;
eat.src = "audio/eat.mp3" ;
left.src = "audio/left.mp3" ;
up.src = "audio/up.mp3" ;
right.src = "audio/right.mp3" ;
down.src = "audio/down.mp3" ;

//Create Snake
let snake = [] ;
snake[0] = {
    x : 9*box,
    y : 10*box
}

//Create Food
let food = {
     x : Math.floor(Math.random()*17+1) * box ,
     y : Math.floor(Math.random()*15+3) * box
}


//Score
let score = 0;

//Control the snake
let d;
document.addEventListener("keydown",direction) ;

function direction(event)
{
    if( event.keyCode == 37 && d != "RIGHT")
    {
        left.play() ;
        d = "LEFT" ;
    }else if( event.keyCode == 38 && d != "DOWN") 
    {
        up.play() ;
        d = "UP" ;
    }else if( event.keyCode == 39 && d != "LEFT")
    {
        right.play() ;
        d = "RIGHT" ;        
    }else if( event.keyCode == 40 && d != "UP")
    {
        down.play() ;
        d = "DOWN" ;        
    }
}

//Cheak Collision
function collision(head,array)
{
    for(let i=0 ; i< array.length ;i++)
    {
        if( head.x == array[i].x && head.y == array[i].y)
        {
            return true ;
        }
    }
    return false ;
}

//Draw everything to canvas
function draw()
{
    //ctx.drawImage(foodImg,food.x,food.y) ;
    ctx.drawImage(ground,0,0) ;
    
    for(let i=0 ; i<snake.length ; i++)
    {
        ctx.fillStyle = (i==0)? "Green" : "White";
        ctx.fillRect(snake[i].x ,snake[i].y ,box ,box);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(snake[i].x ,snake[i].y ,box ,box)
    }

    ctx.fillStyle =  "yellow" ;
    ctx.fillRect(food.x ,food.y ,box ,box);
    ctx.strokeStyle = "Red";
    ctx.strokeRect(food.x ,food.y,box ,box)

    //old head position
    let snakeX = snake[0].x ;
    let snakeY = snake[0].y ;

    //Which direction 
    if(d == "LEFT") snakeX -= box ;
    if(d == "UP") snakeY -= box ;
    if(d == "RIGHT") snakeX += box ;
    if(d == "DOWN") snakeY += box ;

    //if the snake eats the food
    if(snakeX == food.x && snakeY == food.y)
    {
        score++ ;
        eat.play() ;
        food = {
            x : Math.floor(Math.random()*17+1)*box ,
            y : Math.floor(Math.random()*15+3)*box
        }
    }else
    {
        //remove the tail
        snake.pop() ;
    }

     //Add new head
     let newHead = {
        x : snakeX ,
        y : snakeY 
    } 
           
    //Game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
    {
        clearInterval(game);
        dead.play() ;
    }

    snake.unshift(newHead) ;
    
    ctx.fillStyle = "White" ;
    ctx.font = "45px changa one" ;
    ctx.fillText(score,2.2*box,1.6*box) ;
    
}

//Call draw function
let game = setInterval(draw,100) ;






















