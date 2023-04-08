var blockhtml=(h,c,stat)=>{return `<div id="`+(h*100+c)+`" class="inputblock `+(stat? `normal`:`unavailable`)+`">
<p style="z-index:4;display:inline-block;transform:translateY(-17pt);height:33px">

<p>
</div>
<div style="width:3pt;display:inline-block"></div>`;}

function processBlocks()
{
    let tar=document.getElementsByClassName('blocks');
    for(let i=0; i<tar.length; i++)
    {
        let temp=toNum(tar[i].getAttribute('name'));
        tar[i].innerHTML="";
        for(let j=0; j<temp; j++)
            tar[i].innerHTML+=blockhtml(i,j,gamedoing);
    }
    return;
}

function toNum(str)
{
    let tar=0;
    for(let i=0; i<str.length; i++)
        tar=tar*10+str[i].charCodeAt()-48;
    return tar;
}

function progressWinLose()
{
    let win=parseInt(localData[6]);
    let lose=parseInt(localData[7]);
    if(win+lose==0)
    {
        let temp;
        temp=document.getElementById('progressWin');
        temp.style.width='80%';
        temp.innerText='No Data';
        temp=document.getElementById('progressLose');
        temp.style.width='0%';
        temp.innerText='';
        return;
    }
    let perWin=win/(win+lose)*100;
    let perLose=lose/(win+lose)*100;
    console.log(win,lose,perWin,perLose);
    let temp;
    temp=document.getElementById('progressWin');
    temp.style.width=(perWin*0.7)+'%';
    temp.innerText=win+'('+Math.round(perWin)+'%)';
    temp=document.getElementById('progressLose');
    temp.style.width=(perLose*0.7)+'%';
    temp.innerText=lose+'('+Math.round(perLose)+'%)';
    return;
}

function progressTimes1to6()
{
    let sum=0,maxx=0;
    for(let i=0; i<6; i++)
    {
        sum+=parseInt(localData[i]);
        maxx=Math.max(parseInt(localData[i]),maxx);
    }
    console.log(sum);
    if(sum==0)
    {
        for(let i=1; i<7; i++)
        {
            document.getElementById('progress'+i).innerHTML="No Data";
            document.getElementById('progress'+i).style.width="80%";
        }
        return;
    }
    for(let i=1; i<7; i++)
    {
        document.getElementById('progress'+i).innerHTML=localData[i-1];
        document.getElementById('progress'+i).style.width=(parseInt(localData[i-1])/maxx*80)+'%';
    }
    return;
}

processBlocks();