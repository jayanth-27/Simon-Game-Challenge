var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started= false;
var level=0;
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var numberra = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[numberra];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
function playSound(colour)
{
    switch(colour)
    {
        case "blue" :
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red" :
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default : 
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
    }
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
$(document).keypress(function(event){
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started= true;
    }

});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){ nextSequence(); }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
}
function startover()
{
    level=0;
    gamePattern=[];
    started=false;
}