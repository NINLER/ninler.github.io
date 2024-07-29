function webInit()
{
    let temp=document.getElementsByClassName('notice noticeActive');
    for(let i in temp)
    {
        temp[i].onclick=function(event)
        {
            let temp=event.srcElement;
            if(temp.id.length<=0)
                return;
            // while(temp.id.length<=0)
            //     temp=temp.parentElement;
            if(temp.id.match(/.*[0-9]+.*/)==null)
                temp.className='notice noticeActive';
            return;
        }
    }
    return;
}

function gameWin()
{
    if(gamedoing)
        return;
    window.setTimeout(()=>{
        document.getElementById('win').className='notice';
        localData[6]=(parseInt(localData[6])+1).toString();
        console.log(line);
        localData[line]=(parseInt(localData[line])+1).toString();
        writeData(localData);
        progressWinLose();
        progressTimes1to6();
    },750);
    return;
}

function gameLose()
{
    if(gamedoing)
        return;
    window.setTimeout(()=>{
        document.getElementById('lose').className='notice';
        localData[7]=(parseInt(localData[7])+1).toString();
        writeData(localData);
        progressWinLose();
        progressTimes1to6();
    },750);
    return;
}

function gameHelp()
{
    document.getElementById('help').className='notice';
    return;
}

function gameSettings()
{
    document.getElementById('settings').className='notice';
    return;
}

webInit();