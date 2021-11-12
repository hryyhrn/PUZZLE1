var colours = ["red","#FFFF5C","orange","brown","palevioletred","peachpuff"];
var up=["a","b","c","d","e","f","g","h","i"];
var down=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var midSquare=[7,8,9,12,13,14,17,18,19];
var moves=0, seconds=0, stopWatch=0;

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
    for(i=0,c=0;i<9;i++) {
        if(document.getElementById(a1[i]).style.backgroundColor==document.getElementById(a2[i]).style.backgroundColor) {
            c++;
        }
    }
    if(c==9) {
        clearInterval(stopWatch);
        document.getElementById("result").innerHTML="Done in "+seconds+" seconds and "+moves+" moves...";
        document.getElementById("cover").style.display="block";
        fadeIn(document.getElementById("cover"));
        c++;
    }
}

//COVER FADE IN
function fadeIn(element) {
    var op = 0.01;
    var time=0.8; 
    var timer = setInterval(function () {
        if(time<=0.1) {
            clearInterval(timer);
        }
        element.style.opacity=op;
        op+=op*0.24;
        time-=time*0.1;
    }, 50);
}

//PAGE RELOAD
function reset() {
    location.reload();
}

//RANDOMISER
    //grid2
var grid2=shuffle(down);
for(i=0,c=0,n=0;i<24;i++) {
    if(c==4) {
        n++;
        c=0;
    }
    document.getElementById(grid2[i]).style.backgroundColor= colours[n];
    c++;
}
var greyBox=parseInt(grid2[24]);
document.getElementById(grid2[24]).style.backgroundColor= "#45535B";

    //grid1
grid2.pop();
grid1=shuffle(grid2);

for(i=0;i<9;i++) {
    document.getElementById(up[i]).style.backgroundColor= document.getElementById(grid1[i]).style.backgroundColor;
}

//DA LOGIKK
document.body.onclick = function printId(e) {
    var e = e || window.event;
    e=e.target || e.srcElement;
    var clickedBox=parseInt(e.id);
    
    if(clickedBox>0&&clickedBox<26) {
        if(clickedBox==5||clickedBox==10||clickedBox==15||clickedBox==20||clickedBox==25) {
            if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox+1) {
                var fill=document.getElementById(greyBox).style.backgroundColor;
                document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                document.getElementById(clickedBox).style.backgroundColor=fill;
                greyBox=clickedBox;
                moves++;
            }
        }
        else if(clickedBox==6||clickedBox==11||clickedBox==16||clickedBox==21) {
            if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox-1) {
                var fill=document.getElementById(greyBox).style.backgroundColor;
                document.getElementById(greyBox).style.backgroundColor=document.getElementById(clickedBox).style.backgroundColor;
                document.getElementById(clickedBox).style.backgroundColor=fill;
                greyBox=clickedBox;
                moves++;
            }
        }
        else {
            if(clickedBox==greyBox-5||clickedBox==greyBox+5||clickedBox==greyBox-1||clickedBox==greyBox+1) {
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
