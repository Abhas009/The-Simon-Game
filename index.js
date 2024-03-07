// Array containing the colors of the buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game's pattern of colors
var gamePattern = [];

// Array to store the user's clicked pattern of colors
var userClickedPattern = [];

// Variable to store the current level of the game
var level = 0;

// Variable to track if the game has started
var gameStarted = false;

// Listen for keydown events on the document to start the game
$(document).keydown(function(event) {
  if (!gameStarted) {
    // Display the current level on the page
    $("#level-title").html("Level " + level);
    // Start the game by generating the next sequence
    nextSequence();
    // Set gameStarted to true to prevent starting the game multiple times
    gameStarted = true;
  }
});

// Event listener for when a button is clicked
$(".btn").on("click",function()
{
  // Get the id of the clicked button, which represents its color
  var userChosenColour = $(this).attr("id");
  // Add the clicked color to the userClickedPattern array
  userClickedPattern.push(userChosenColour);
  // Play the sound corresponding to the clicked color
  playSound(userChosenColour);
  // Animate the button to provide feedback to the user
  animatePress(userChosenColour);
  // Check the user's answer
  var index = userClickedPattern.length - 1;
  checkAnswer(index);
})

// Function to generate the next sequence of colors
function nextSequence()
{
  // Generate a random number between 0 and 3 to select a color from buttonColours
  var randomNumber = Math.floor(Math.random() * 4);
  // Select a random color from buttonColours based on the random number
  var randomChosenColour = buttonColours[randomNumber];
  // Add the random color to the gamePattern array
  gamePattern.push(randomChosenColour);

  // Display the selected color to the user by fading in and out the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound corresponding to the selected color
  playSound(randomChosenColour);
  // Increase the level by 1 and display it on the page
  level += 1;
  $("#level-title").html("Level " + level);

  // Reset userClickedPattern to an empty array for the next sequence
  userClickedPattern = [];
}

// Function to play a sound
function playSound(name)
{
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Function to animate a button press
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed")
  setTimeout(() =>
  {
    $("#" + currentColour).removeClass("pressed");
  },100)
}

// Function to check the user's answer
function checkAnswer(currentLevel)
{
  // Check if the user's clicked color matches the color in the gamePattern at the same index
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    // If the user has completed the current level, start the next sequence after a delay
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function ()
      {
        nextSequence();
      },1000);
    }
  }
  else
  {
    // If the user's answer is incorrect, play a wrong sound, show game over message, and restart the game
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

// Function to restart the game
function startOver()
{
  // Reset the level, gamePattern, gameStarted, and userClickedPattern arrays
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
}









/*
Even though the userClickedPattern array is reset at the beginning of each new sequence, we still need to compare the lengths of userClickedPattern and gamePattern to determine if the user has clicked all the colors for the current sequence.

Here's why this check is necessary:

Checking Sequence Completion: When the user clicks on a color, it is added to the userClickedPattern array. At each click, we need to check if the length of userClickedPattern matches the length of gamePattern to see if the user has clicked all the colors for the current sequence. If the lengths match, it means the user has completed the sequence and clicked all the colors in the correct order.

Advancing to Next Level: If the user has completed the sequence (i.e., userClickedPattern.length === gamePattern.length), we advance to the next level by generating a new sequence (nextSequence()). This check ensures that the user cannot proceed to the next level until they have completed the current sequence.

Ensuring Correctness: The check ensures that the user has clicked all the colors in the correct order before advancing to the next level. If the lengths do not match, it means the user has not completed the sequence and has clicked a color out of order, triggering a game over condition.

In summary, the if (userClickedPattern.length === gamePattern.length) condition is crucial for determining when the user has completed a sequence and ensuring that the game progresses correctly to the next level.





*/
