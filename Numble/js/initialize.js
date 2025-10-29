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
        localData[6]=(localData[6]-0+1)+'';
        console.log(line);
        localData[line-1]=(localData[line-1]-0+1)+'';
        writeData(localData);
        progressWinLose();
        progressTimes1to6();
    },0);
    return;
}

function gameLose()
{
    if(gamedoing)
        return;
    window.setTimeout(()=>{
        document.getElementById('lose').className='notice';
        localData[7]=(localData[7]-0+1)+'';
        writeData(localData);
        progressWinLose();
        progressTimes1to6();
    },0);
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