var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;

// Listen for keydown events on the document
$(document).keydown(function(event) {
  if (!gameStarted) {
    $("#level-title").html("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").on("click",function()
{
   var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

})

//Create a new Function called nextSequence()
function nextSequence()
{
  //random number
  var randomNumber = Math.floor(Math.random(randomNumber) * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level += 1;
  $("#level-title").html("Level " + level);

}


//Sound Play
function playSound(name)
{
  //Play Sound
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


//animate
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed")

  setTimeout(() =>
  {
    $("#" + currentColour).removeClass("pressed");
  },100)
}
