// Game Constants and Variables
let inputDir = { x: 0, y: 0}; // snake will be static when the game starts but will move once the any key is pressed
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y: 15}  // this is the position of the snake head
]
let food = {x: 6, y: 7};



//Game Functions
function main(ctime) {  // ctime refers to the current time 
    window.requestAnimationFrame(main); // this creats an event loop

    //but this reneders the frame very fast, so we need to control the fps
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    } // this helps to slow down the rendering speed to our required time
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }

    // if you bumo into the wall 
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //Part 1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};  // resets the game
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenrate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi-Score: " + hiscoreval;
            speed = speed + 0.5;

        }
        scoreBox.innerHTML = "Score: " + score;  // we need to change the name from score to scoreBox cuz when we make an ID we create a variable of the same name in JS and here score is already defined
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})  // updating the new body of the snake
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}  // formula to create a random number b/w a and b = Math.round(a + (b-a) * Math.random())
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};  // we are creating a new object and thus need to have the spread operator to not face the referencing error
    }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;  // these are for updating the head of the snake

        
    //Part 2: Display the snake and food

    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{  // the forEach takes the element which will be added next to the head in snakeArr and the index 
        // here 'e' is just a variable

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;  // row number = y
        snakeElement.style.gridColumnStart = e.x;  // col number = x
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');  // we are making a class to add all the css to the snake
        }
        board.appendChild(snakeElement);
    });
    
    //Display the Food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;  // row number = y
        foodElement.style.gridColumnStart = food.x;  // col number = x
        foodElement.classList.add('food');  // we are making a class to add all the css to the snake
        board.appendChild(foodElement);

}





//Game Logic
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi-Score: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 0}  // starts the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;
    }
});