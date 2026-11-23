let playing = false;
let score;
let trialleft;
let step;
let action;
let fruits = ["apple","banana","berry","cherry","grapes","mango","orange","peach","pear","pineapple","watermelon"];

$(()=>
 {
     //click on strat  or reset button
     $("#startreset").click(() =>
        {
            //if we are playing
            if(playing)
            {
                //reload page
                location.reload();
                playing = false;
            }
            else{
                //if we are not playing
                //hide the game over box
                $("#gameover").hide();
                //change the text to reeset
                $("#startreset").html("Reset Game");
                //start playing game
                playing = true;
                //score initialize to 0
                score = 0;
                $("#scorevalue").html(score);
                //show the trial or life left
                $("#trialleft").show();
                //setting initial trial value
                trialleft = 3;
                //adding trial hearts
                addHearts();
                //start sending fruits
                startAction();
            }
        });
        function addHearts()
        {
            //clear hearts
            $("#trialleft").empty();
            //fill with hearts
            for(let i = 0;i<trialleft;i++)
            {
                $("#trialleft").append('<img src="img/heart.png" class="heart">');
            }
        }   
        //start sending fruits
        function startAction()
        {
            //generate fruits
            $("#fruit").show();
            //generate random fruits
            chooseFruit();
            //random position
            $("#fruit").css({"left": Math.round(650*Math.random()), "top": -50});
            //generate steps
            step = 1 + Math.round(5*Math.random());
            //move fruit down by step every 10ml secs
            action = setInterval(() => {
                $("#fruit").css("top", $("#fruit").position().top + step);
                //check if the fruit is too low
                if($("#fruit").position().top > $("#fruitContainer").height())
                {
                    //check if we have trials left
                    if(trialleft > 1)
                    {
                        $("#fruit").show();
                        chooseFruit();
                        $("#fruit").css({"left": Math.round(650*Math.random()), "top": -50});
                        step = 1 + Math.round(5*Math.random());
                        //reduce the life or trial
                        trialleft--;
                        //populate hearts
                        addHearts();
                    }
                    else //game over
                    {
                        playing = false;
                        //we are not playing
                        $("#startreset").html("Start Game");
                        $("#gameover").show();
                        $("#gameover").html("<p>Game Over !</p><p>Your Score is "+score +"</p>");
                        //hide the trial left:
                        $("trialleft").hide();
                        stopAction();
                    }
                }
            }, 10)
        }
        //generate random fruits
        function chooseFruit()
        {
            let rand = fruits[Math.round(7*Math.random())];
            //console.log(rand);
            $("#fruit").attr('src', 'img/' + rand + '.png');
        }
        function stopAction()
        {
            clearInterval(action);
            //hide fruits
            $("#fruit").hide();
        }
        //slice the fruits
        $("#fruit").mouseover(() => {
            //increase the score bu 1
            score++;
            //update score value
            $("#scorevalue").html(score);
            //play sound
            $("#slicesound")[0].play();
            //stop fruit
            clearInterval(action);
            //hide fruit and animate
            $("#fruit").hide("explode", 200);
            //send new fruit
            setTimeout(startAction, 400);
        });

 });