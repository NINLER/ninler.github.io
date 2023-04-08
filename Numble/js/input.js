var vaild=['0','1','2','3','4','5','6','7','8','9','Backspace','Enter','+','-','*','/','='];
var equal='';
var line=0;
var mesnum=0;
var gamedoing=0;

document.onkeydown=function(event)
{
    let temp=event.key;
    if(temp=='f')
    {
        document.getElementById('mess').innerHTML='';
        return;
    }
    if(gamedoing!=1)
        return;
    // console.log(event.key);
    let flag=false;
    for(let i=0; i<vaild.length; i++)
        if(temp==vaild[i])
            flag=true;
    if(!flag)
        return;
    if(temp=='Backspace')
        equal=equal.substr(0,equal.length-1);
    else if(temp=='Enter')
    {
        if(equal.length==digoper)
        {
            let res=checkInput();
            if(res==0)
            {
                giveOutput(line,equal);
                line++,equal="";
                if(line>=7)
                {
                    gamedoing=false;
                    gameLose();
                    stopGame(false);
                }
            }
            else if(res==-1)
                addMessage('#ff0000','Error','不能有前导零或第一位为符号！')
            else if(res==-3)
                addMessage('#ff0000','Error','你连等号都没有算什么等式啊')
            else if(res==-2)
                addMessage('#ffff00','Warning','等式不成立！')
        }
        else
            addMessage('#ffff00','Warning','等式未填满！')
    }
    else
    {
        if(equal.length<digoper)
            equal+=temp;
    }
    processInput();
    return;
}

function giveOutput(l,equ)
{
    // Code
    let result=guess(equ);
    // console.log(result);
    let flag=true;
    for(let i=0; i<equal.length; i++)
    {
        if(result[i+1]==0)
        {
            document.getElementById((l*100+i).toString()).className='inputblock wrong';
            flag=false;
        }
        if(result[i+1]==1)
        {
            document.getElementById((l*100+i).toString()).className='inputblock silver';
            flag=false;
        }
        if(result[i+1]==2)
            document.getElementById((l*100+i).toString()).className='inputblock golden';
    }
    if(flag)
    {
        gamedoing=0;
        gameWin();
        stopGame(false);
    }
    return;
}

function checkInput()
{
    if(equal.indexOf('=')==-1)
        return -3;
    if(!(equal[0].charCodeAt()>='1'.charCodeAt()&&equal[0].charCodeAt()<='9'.charCodeAt()))
        return -1;
    let temp=equal.indexOf('=');
    let compare=equal.substring(0,temp+1)+'='+equal.substring(temp+1,equal.length);
    // console.log(compare);
    // console.log(eval(compare));
    if(eval(compare))
        return 0;
    else
        return -2;
}

function processInput()
{
    for(let i=0; i<equal.length; i++)
        document.getElementById((line*100+i).toString()).firstElementChild.innerHTML=equal.substr(i,1);
    for(let i=equal.length; i<digoper; i++)
        document.getElementById((line*100+i).toString()).firstElementChild.innerHTML='';
    return;
}

function delMes(id)
{
    document.getElementById('message'+id).parentNode.removeChild(document.getElementById('message'+id));
    return;
}

function addMessage(color='#ffc107',title,article)
{
    ++mesnum;
    let code=`
    <div id="message`+mesnum+`">
        <div class="toast-header" style="z-index:90;background-color: rgb(124, 124, 124);width:200pt !important">
            <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" role="img" aria-label=" :  " preserveAspectRatio="xMidYMid slice" focusable="false"><title> </title><rect width="100%" height="100%" fill="`+color+`"></rect><text x="50%" y="50%" fill="" dy=".3em"></text></svg>
            <strong class="mr-auto" style="color:rgb(199, 199, 199)">`+title+`</strong>
            <small class="text-muted" style="color:#aaaaaa !important"> 按 F 关闭弹窗</small>
            </button>
        </div>
        <div class="toast-body" style="background-color: rgb(68, 68, 68);">
        `+article+`
        </div>
        <br>
    </div>
    `
    document.getElementById('mess').innerHTML=code;
    return;
}

function stopGame(replace=true)
{
    gamedoing=0;
    for(let i=7; i<13; i++)
    {
        let temp=document.getElementById('len'+i);
        if(temp.className.indexOf('golden')==-1)
            temp.className="wrong";
    }
    if(replace)
    {
        processBlocks();
        localData[7]=(parseInt(localData[7])+1).toString();
        writeData(localData);
        progressWinLose();
        progressTimes1to6();
        line=0;
        equal="";
    }
    document.getElementById('stopGame').style.display='none';
    document.getElementById('restartGame').style.display='inline-block';
    return;
}

function restartGame(replace=true)
{
    gamedoing=1;
    line=0;
    equal="";
    getequaltion();
    if(replace)
        processBlocks();
    for(let i=7; i<13; i++)
    {
        let temp=document.getElementById('len'+i);
        if(temp.className.indexOf('golden')==-1)
            temp.className="danger";
    }
    document.getElementById('restartGame').style.display='none';
    document.getElementById('stopGame').style.display='inline-block';
    return;
}