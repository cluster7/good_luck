/* 
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify the player of the correct answer if loose
- Let the Player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Element
const game = document.querySelector('#game'),
minNum = document.querySelector('.min-num'),
maxNum = document.querySelector('.max-num'),
guessBtn = document.querySelector('#guess-btn'),
guessInput = document.querySelector('#guess-input'),
message = document.querySelector('.message');

//Assign uUI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again
game.addEventListener('mousedown', function(e){
    if(e.target.className ==='play-again'){
        window.location.reload();
    };
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);

//Validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red' );
    //Don' count an invalid input
    // return;
}

//Check if won
if(guess === winningNum){
    //Game Over Won
   
   gameOver(true, `${winningNum} is correct! YOU WIN!!`);
   
}else{
// Wrong Number
guessesLeft -= 1;

if(guessesLeft === 0){
//Game Over - Lost

gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

}else{
//Game continues - answer wrong

//Change border color
guessInput.style.borderColor = 'red';

//Clear Input
guessInput.value = '';

//Tell user its the wrong number
setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
}
}

});

//Game Over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';

//Disable Input
    guessInput.disabled = true; 
//Change
   guessInput.style.borderColor = color;
//Sext text color
    message.style.color = color;
//Set Message
    setMessage(msg);

//Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
