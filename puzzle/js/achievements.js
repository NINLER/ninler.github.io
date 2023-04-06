function checker(id)
{
    // console.log("ID",id);
    let puzzle=localStorage.getItem('puzzle');
    let decodeId;
    if(puzzle==null)
        decodeId=0;
    else
    {
        decodeId=decode(puzzle);
        decodeId=decodeId[3];
    }
    if(id-1>decodeId)
        return false;
    if(id>decodeId)
        decodeId=id;
    let encodeArr=Array(getRand(10,25));
    for(let i=0; i<encodeArr.length; i++)
        encodeArr[i]=getRand(1,20).toString();
    encodeArr[3]=decodeId.toString();
    // console.log(encodeArr);
    let encodeRes=encode(encodeArr);
    localStorage.setItem('puzzle',encodeRes[0]);
    return true;
}

function failCheck()
{
    let temp=document.getElementsByClassName('title');
    temp=temp[0];
    temp.innerHTML="ERROR";
    temp.style.color="red";
    temp=document.getElementsByClassName('article');
    temp=temp[0];
    temp.innerHTML="你 是 不 是 跳 关 了 =)";
    return;
}

function work()
{
    init();
    randSeed();
    let id=document.getElementById('problem');
    id=id.firstElementChild.innerHTML;
    id=id.match(/.*([0-9]+).*/);
    // console.log(id);
    if(id!=null)
        id=parseInt(id[1]);
    else
        id=0;
    if(id.toString()===NaN.toString())
        id=0;
    // console.log(id);
    let res=checker(id);
    if(res==false)
        failCheck();
    return;
}

work();