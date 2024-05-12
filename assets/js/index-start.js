var started=true;
var op=1;
let flag=false;
document.onmousedown=function()
{
    if(started)
        return;
    let temp=event.srcElement;
    if(temp.id=="start")
    {
        flag=true;
        op-=0.1;
        if(op<=0)
            started=true,op=0;
    }
}
function opcomeback()
{
    let temp1;
    temp1=document.getElementById("start");
    temp1.style="opacity:"+op;
    temp1=document.getElementById("block-up");
    temp1.style="opacity:"+op;
    temp1=document.getElementById("hint1");
    temp1.style="opacity:"+op;
    temp1=document.getElementById("hint2");
    temp1.style="font-family:Consolas;opacity:"+op;
    let temp2=1-op;
    temp1.innerHTML="Progress:"+Math.floor(temp2*10000)/100+"%";
    if(started)
    {
        temp1=document.getElementById("start");
        temp1.style="opacity:"+op+";display:none";
        temp1=document.getElementById("block-up");
        temp1.style="opacity:"+op+";display:none";
        temp1=document.getElementById("hint1");
        temp1.style="opacity:"+op+";display:none";
        temp1=document.getElementById("hint2");
        temp1.style="font-family:Consolas;opacity:"+op+";display:none";
        return;
    }
    if(flag)
        flag=false;
    else
    {
        op+=0.003;
        if(op>1)
            op=1;
    }
}
window.setInterval(opcomeback,50);