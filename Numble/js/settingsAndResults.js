var localData=[0,0,0,0,0,0,0,0,0];

function getData()
{
    let temp=localStorage.getItem('NumbleData');
    if(temp==null)
        return Array(0,0,0,0,0,0,0,0,0);
    else
        return decode(temp);
}

function writeData(dataArr)
{
    let temp=encode(dataArr);
    localStorage.setItem('NumbleData',temp[0]);
    return;
}

init();
randSeed();
localData=getData();
if(localData[8]==0)
{
    localData[8]=12;
    writeData(localData);
}
document.getElementById('len'+localData[8]).className='golden';
let changeblk=document.getElementsByClassName('blocks');
for(let i=0; i<changeblk.length; i++)
    changeblk[i].setAttribute('name',localData[8].toString());
processBlocks();
digoper=localData[8];
getequaltion();
for(let i=7; i<13; i++)
{
    let temp=document.getElementById('len'+i);
    temp.onclick=function(event)
    {
        if(gamedoing)
            return;
        let tar=event.target;
        let num=tar.id.match(/[^0-9]*([0-9]+)$/);
        if(num==null)
            return;
        // console.log(num);
        num=parseInt(num[1]);
        document.getElementById('len'+localData[8]).className='wrong';
        document.getElementById('len'+num).className='golden';
        localData[8]=num;
        writeData(localData);
        let change=document.getElementsByClassName('blocks');
        for(let i=0; i<change.length; i++)
            change[i].setAttribute('name',num.toString());
        processBlocks();
        digoper=localData[8];
        getequaltion();
        return;
    }
}
progressWinLose();
progressTimes1to6();