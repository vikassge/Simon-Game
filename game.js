
var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var started = false;

var buttonColors = ["red", "blue", "green", "yellow"];

//starting the game
$(document).keydown(function() {
  if(!started){
  nextSequence();
  started = true;
}
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});


function nextSequence() {

    $("h1").text("Level " + (level+1));

    userClickedPattern=[];

    level++;

    var randomNumber = Math.floor(4*Math.random());

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    var randomColourId = "#" + randomChosenColour;

    $(randomColourId).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function checkAnswer(index) {
  if(gamePattern[index] === userClickedPattern[index]) {

    if(gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
            nextSequence();
          },1000);
    }
   }

  else {

  playSound("wrong");

  $("body").addClass("game-over");

  setTimeout(function () {
    document.querySelector("body").classList.remove("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
  }
}


function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour) {

  $("#"+currentColour).addClass("pressed"); //adding shadow.

  setTimeout(function() {
    document.querySelector("." + currentColour).classList.remove("pressed");
  },100);

}


 function startOver() {
   level=0;
   started=false;
   gamePattern=[];
 }
