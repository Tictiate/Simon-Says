buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

$("#start-btn").show();
$("body").addClass("hide-buttons");

$("#start-btn").on("click", function() {
    if (!started) {
        setTimeout(function() {
            startOver();
            nextSequence();
            started = true;
        }, 200);
    }
});

$(document).on("keypress", function(){
    if(!started){
        startOver();
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
          nextSequence();
        }, 1000);
        }
    }
    else{
        console.log("wrong")
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over! Click start or press any key.");
        $("#start-btn").show();
        $("body").addClass("hide-buttons");
        started = false;
    } 
}

function nextSequence(){
    $("#start-btn").hide();
    $("body").removeClass("hide-buttons");
    userClickedPattern = [];
    level+=1;
    animateLevelTitle(level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animateLevelTitle(level) {
    if(level === 1){
        $("#level-title")
        .hide()
        .text("Level " + level)
        .fadeIn(400)
    ;
    }
    else{
        $("#level-title").text("Level " + level);
    }     
}