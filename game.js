$(".indexrulebtn").on('click', function() {
  window.location = "rules.html";
});

$(".rulebtn").on('click', function() {
  window.location = "index.html";
});
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var buttonColor;
var level = 0;
var start = true;

if (level === 0) {
  $(document).keydown(function(event) {
    nextSequence();
  });
  $(".starterbtn").on('click', function() {
    nextSequence();
  });
}


function nextSequence() {
  $(".starterbtn").attr("disabled", true);
  userClickedPattern.length = 0;
  level++;
  $("h1").text("Level " + level);

  var randomChosenColour = buttonColours[Math.floor(Math.random() * 3)];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$(".gamebtn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {

  var audioSelect = new Audio("sounds/" + name + ".mp3");
  audioSelect.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(curentLength) {

  if (userClickedPattern[curentLength] === gamePattern[curentLength]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 1000);

    }
  } else {
    $("h1").text("Game Over!!");
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    level = 0;
    gamePattern.length = 0;
    $(".starterbtn").removeAttr("disabled");

  }

}
