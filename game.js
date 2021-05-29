var gamePattern=[];
var userclickPattern=[];
var buttoncolors=["red","green","blue","yellow"];
var level=0;
var start=false;


$(document).keydown(function()
{
   
    if(!start)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        start=true;
    }
    
   
});



$(".btn").click(function()
{
    var userbtn= $(this).attr("id");
    userclickPattern.push(userbtn);
  
    playSound(userbtn);
    animatepress($(this).attr("id"));
    checkAnswer(userclickPattern.lastIndexOf(userbtn));
});

function checkAnswer(currentlevel)
{
    if(gamePattern[currentlevel]==userclickPattern[currentlevel]){
        console.log("right");
        if(userclickPattern.length===gamePattern.length){
        setTimeout(nextSequence,1000);}
    }
    else{
        console.log("wrong");
    var aud=new Audio("sounds/wrong.mp3");
    aud.play();
         $("body").addClass("game-over");
         setTimeout(function(){
             $("body").removeClass("game-over")
            },200);
            $("h1").text("Game over! Start new game");
            startOver();
}

}

function nextSequence()
{
    userclickPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
    var randnum=Math.floor(Math.random()*4);
    var randColor=buttoncolors[randnum];
gamePattern.push(randColor);
$("#"+ randColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randColor);

}

function playSound(name)
{
    var audio=new Audio("sounds/"+ name + ".mp3");
audio.play();
}

function animatepress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver()
{
    level=0;
    start=false;
    gamePattern=[];
}