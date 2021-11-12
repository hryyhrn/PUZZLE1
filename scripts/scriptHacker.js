var seed=0, moves=0, seconds=0, stopWatch=0;

//Fade OUT
function fadeOut(element) {
    var fade = setInterval(function () {
        if (!element.style.opacity) {
            element.style.opacity = 1;
        }
        if (element.style.opacity > 0) {
            element.style.opacity -= 0.1;
        } else {
            clearInterval(fade);
        }
    }, 200);
}

//COVER FADE IN
function fadeIn(element,Mult) {
    var op = 0.01;
    var time=0.8; 
    var timer = setInterval(function () {
        if(time<=0.1) {
            clearInterval(timer);
        }
        element.style.opacity=op;
        op+=op*Mult;
        time-=time*0.1;
    }, 32);
}

//ARRAY SHUFFLE FUNCTION
function shuffle(nos) {
    var j=0, x=0;
    for (i=nos.length-1;i>0;i--) {
        j=Math.floor(Math.random()*(i+1));
        x=nos[i];
        nos[i]=nos[j];
        nos[j]=x;
    }
    return nos;
}

//CHECKING LOGIC
function check(a1,a2) {
    for(i=0,c=0;i<seed*seed;i++) {
        if(document.getElementById(a1[i]).style.backgroundColor==document.getElementById(a2[i]).style.backgroundColor) {
            c++;
        }
    }
    if(c==seed*seed) {
        clearInterval(stopWatch);
        
        if(localStorage.getItem("highscore"+seed)==null) {
            document.querySelector("#highs").play();
            document.getElementById("resultH").innerHTML="Done in "+seconds+" seconds and "+moves+" moves...";
            document.getElementById("highscore").style.display="block";
            fadeIn(document.getElementById("highscore"), 0.24);
        }
        else if(moves<localStorage.getItem("highscore"+seed)) {
            document.querySelector("#highs").play();
            document.getElementById("resultH").innerHTML="Done in "+seconds+" seconds and "+moves+" moves...";
            document.getElementById("highscore").style.display="block";
            fadeIn(document.getElementById("highscore"), 0.24);
        }
        else {
            document.querySelector("#endscr").play();
            document.getElementById("result").innerHTML="Done in "+seconds+" seconds and "+moves+" moves...";
            document.getElementById("cover").style.display="block";
            fadeIn(document.getElementById("cover"), 0.24);
        }
    }
}

//name SUBMIT
function submit() {
    var el=document.getElementById("name");
    localStorage.setItem("highscore"+seed,moves);
    localStorage.setItem("name"+seed, el.value);
    el.disabled=true;
}

//leaderBoard
function highscore() {
    document.getElementById("scoreboard").style.display="block";
    document.getElementById("text").innerHTML="NAME: "+localStorage.getItem("name"+seed)+"| MOVES: "+localStorage.getItem("highscore"+seed);
}

document.getElementById("scoreboard").onclick=function() {
    document.getElementById("scoreboard").style.display="none";
}

//PAGE RELOAD
function reset() {
    location.reload();
}

document.getElementById("EASY").addEventListener("click", function () {
    document.querySelector("#start").play();
    fadeOut(document.getElementById("homescreen"));
    document.getElementById("homescreen").style.display="none";
    fadeIn(document.getElementById("main"), 0.4);
    document.getElementById("main").style.display="block";
    seed=3;
    main();
});

document.getElementById("NORMAL").addEventListener("click", function () {
    document.querySelector("#start").play();
    fadeOut(document.getElementById("homescreen"));
    document.getElementById("homescreen").style.display="none";
    fadeIn(document.getElementById("main"), 0.5);
    document.getElementById("main").style.display="block";
    seed=4;
    main();
});








//THE MAIN LOGIC (MADE THIS A FUNCTION SO THAT THE CODE INSIDE DOESN'T EXECUTE BEFORE THE DIFFICULTY IS SELECTED)
function main() {
    var colours = ["red","#FFFF5C","orange","brown","palevioletred","peachpuff","#b5651d"];
    var up=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
    var down=[];
    for(i=0;i<(seed+2)*(seed+2);i++) {
        down[i]=i+1;
    }
    var midSquare=[];
    if(seed==3)
        midSquare=[7,8,9,12,13,14,17,18,19];
    else
        midSquare=[8,9,10,11,14,15,16,17,20,21,22,23,26,27,28,29];


    //GRID GENERATor
    document.getElementById("grid1").style.gridTemplateRows="repeat("+seed+",1fr)";
    document.getElementById("grid1").style.gridTemplateColumns="repeat("+seed+",1fr)";

    for(i=0;i<seed*seed;i++) {
        var element=document.createElement("div");
        element.setAttribute("id", up[i]);
        element.setAttribute("class", "tile");
        document.getElementById("grid1").appendChild(element);
    }

    document.getElementById("innerbox").style.width=60/(seed+2)*seed+"vmin";
    document.getElementById("innerbox").style.height=60/(seed+2)*seed+"vmin";
    document.getElementById("innerbox").style.marginTop=(60/(seed+2)*(seed+1)+0.6)*(-1)+"vmin";

    document.getElementById("grid2").style.gridTemplateRows="repeat("+(seed+2)+",1fr)";
    document.getElementById("grid2").style.gridTemplateColumns="repeat("+(seed+2)+",1fr)";

    for(i=0;i<(seed+2)*(seed+2);i++) {
        var element=document.createElement("div");
        element.setAttribute("id", i+1);
        element.setAttribute("class", "tile");
        document.getElementById("grid2").appendChild(element);
    }



    //RANDOMISER

        //grid2
    var grid2=shuffle(down);
    for(i=0,c=0,n=0;i<(seed+2)*(seed+2)-1;i++) {
        if(c==seed+1) {
            n++;
            c=0;
        }
        document.getElementById(grid2[i]).style.backgroundColor= colours[n];
        c++;
    }
    var greyBox=parseInt(grid2[(seed+2)*(seed+2)-1]);
    document.getElementById(grid2[(seed+2)*(seed+2)-1]).style.backgroundColor= "#45535B";

        //grid1
    grid2.pop();
    grid1=shuffle(grid2);

    for(i=0;i<seed*seed;i++) {
        document.getElementById(up[i]).style.backgroundColor= document.getElementById(grid1[i]).style.backgroundColor;
    }



    //DA LOGIKK

        //5x5
    if(seed==3) {
        document.body.onclick = function printId(e) {
            var e = e || window.event;
            e=e.target;
            var clickedBox=parseInt(e.id);

            if(clickedBox>0&&clickedBox<26) {
                if(clickedBox==5||clickedBox==10||clickedBox==15||clickedBox==20||clickedBox==25) {
                    if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox+1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                else if(clickedBox==6||clickedBox==11||clickedBox==16||clickedBox==21) {
                    if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox-1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                else {
                    if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox-1||clickedBox==greyBox+1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                if(moves==1) {
                    stopWatch=setInterval(function () {
                        seconds++;
                    }, 1000);
                }
                check(up,midSquare);
            } 
        }
    }

        //6x6
    else {
        document.body.onclick = function printId(e) {
            var e = e || window.event;
            e=e.target;
            var clickedBox=parseInt(e.id);

            if(clickedBox>0&&clickedBox<37) {
                if(clickedBox==6||clickedBox==12||clickedBox==18||clickedBox==24||clickedBox==30||clickedBox==36) {
                    if(clickedBox==greyBox-6||clickedBox==greyBox+6||clickedBox==greyBox+1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                else if(clickedBox==7||clickedBox==13||clickedBox==19||clickedBox==25||clickedBox==31) {
                    if(clickedBox==greyBox-6||clickedBox==greyBox+6||clickedBox==greyBox-1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                else {
                    if(clickedBox==greyBox-6||clickedBox==greyBox+6||clickedBox==greyBox-1||clickedBox==greyBox+1) {
                        document.querySelector("#click").play();
                        var fill=document.getElementById(greyBox).style.backgroundColor;
                        document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                        document.getElementById(clickedBox).style.backgroundColor=fill;
                        greyBox=clickedBox;
                        moves++;
                    }
                }
                if(moves==1) {
                    stopWatch=setInterval(function () {
                        seconds++;
                    }, 1000);
                }
                check(up,midSquare);
            } 
        }
    }
}