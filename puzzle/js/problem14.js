let temp=document.getElementById("next-problem");
temp.href="level15.html";
temp.style.display="none";
let progress=0;
let button=[119,99,97,107,109,101];
document.onkeypress=function()
{
    if(progress>=5)
    {
        let temp2=document.getElementById("image14");
        temp2.style.display="none";
        temp.style.display="inline-block";
        return;
    }
    let temp1=event.keyCode;
    if(temp1==button[progress])
        progress++;
    return;
}