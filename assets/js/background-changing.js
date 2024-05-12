let black=false;
function change()
{
    black=!black;
    let temp=document.getElementById("body");
    if(black==true)
        temp.style.backgroundColor="#000000";
    if(black==false)
        temp.style.backgroundColor="rgb(233, 233, 233)";
    temp=document.getElementById("hint3");
    if(black==false)
        temp.style.color="#000000";
    if(black==true)
        temp.style.color="rgb(233, 233, 233)";
    return;
}
document.onclick=function()
{
    let temp=event.srcElement;
    if(temp.id=="head-box")
        change();
    return;
}