var time1=new Date();
var time2;
function toDouble(str)
{
    let pos=str.indexOf('.');
    if(pos==-1)
    {
        let tar=0;
        for(let i=0; i<str.length; i++)
            tar=tar*10+str[i].charCodeAt()-48;
        return tar;
    }
    let part1=0,part2=0;
    for(let i=0; i<pos; i++)
        part1=part1*10+str[i].charCodeAt()-48;
    for(let i=str.length-1; i>pos; i--)
        part2=part2*0.1+str[i].charCodeAt()-48;
    let tar=part1+part2*0.1;
    return tar;
}
function calcTime()
{
    let tar=time2-time1;
    tar/=1000;
    console.log(tar);
    let temp=document.getElementById("timeUsing");
    temp.innerHTML="你的用时 : "+tar+" s.";
    console.log(localStorage['best-maze-time']);
    if(localStorage.getItem('best-maze-time')==undefined)
        localStorage.setItem('best-maze-time',tar.toString());
    else
    {
        let best=toDouble(localStorage['best-maze-time']);
        best=Math.min(best,tar);
        console.log(best.toString());
        localStorage['best-maze-time']=best.toString();
    }
    console.log(localStorage['best-maze-time']);
    temp=document.getElementById("bestTime");
    let process=Math.floor(toDouble(localStorage['best-maze-time'])*1000)/1000;
    temp.innerHTML="最佳用时 : "+process+" s.";
    return;
}