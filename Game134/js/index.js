const cellNumInfo=document.querySelector(".cell-hint > span");
const cellNum=document.querySelector(".cell-num");
const winTip=document.getElementById("win-tip");
const cell=document.querySelector(".cell-grid");

let cellPick=[],nowPick=0,lstPick=0,playing=false,turn=1;

$.renderBox=()=>{
    let num=cellNum.value;
    let getCell=(pos=0,pick=0,lst=0)=>{
        return `<div pos="${pos}" class="cell ${pick? "pick"+pick:""} ${lst? "lst":""}">`
    };
    cell.innerHTML="";
    cellNumInfo.innerHTML=(playing? (num-nowPick)+" / ":"")+num;
    console.log("renderBox",num,cellPick);
    for(let i=0; i<num; i++) cell.innerHTML+=getCell(i,cellPick[i],(i<nowPick&&nowPick-i<=lstPick));
    [1,3,4].forEach(it=>{
        if(nowPick+it<=num&&playing) document.getElementById("pick"+it).classList.remove("ban");
        else document.getElementById("pick"+it).classList.add("ban");
    });
    if(nowPick==num)
    {
        playing=false,cellNum.removeAttribute("disabled");
        document.getElementById("start").innerHTML="Start";
        if(turn==1) document.getElementById("win-lose").innerHTML="You win.";
        else document.getElementById("win-lose").innerHTML="Bot wins.",winTip.style.display="block";
    }
    return;
};

$.changeBox=()=>{
    let num=cellNum.value; cellPick=[]; nowPick=lstPick=0;
    for(let i=0; i<num; i++) cellPick.push(0);
    document.getElementById("win-lose").innerHTML="";
    return $.renderBox();
};

$.applyMove=(step=0,pick=1)=>{
    lstPick=step; nowPick+=step;
    for(let i=1; i<=step; i++) cellPick[nowPick-i]=pick;
    $.renderBox();
    return;
}

$.botMove=()=>{
    let num=cellNum.value;
    let ava=[1,3,4].filter(it=>(it+nowPick<=num));
    console.log(ava);
    if((num-nowPick)%7==0||(num-nowPick)%7==2)
        $.applyMove(ava[Math.floor(Math.random()*100000)%ava.length],2);
    else
        for(let it of ava)
            if((num-nowPick-it)%7==0||(num-nowPick-it)%7==2)
            {
                $.applyMove(it,2);
                break;
            }
    turn=1;
    return;
};

document.getElementById("start").addEventListener("click",(ev)=>{
    if(playing) cellNum.removeAttribute("disabled"),ev.target.innerHTML="Start",turn=1;
    else
    {
        cellNum.setAttribute("disabled",""),ev.target.innerHTML="Abort";
        document.getElementById("win-lose").innerHTML="";
    }
    playing=!playing; $.changeBox();
    return;
});

cellNum.addEventListener("input",()=>{
    $.changeBox();
});

[1,3,4].forEach(it=>{
    document.getElementById("pick"+it).addEventListener("click",(ev)=>{
        let target=ev.target;
        if(target.classList.contains('ban')) return;
        if(!playing||turn!=1) return;
        $.applyMove(it,1);
        if(!playing) return; turn=2;
        window.setTimeout(()=>{$.botMove()},1000);
    });
});

winTip.addEventListener("click",(ev)=>{
    alert(`必败状态: 剩余的格子数除以 7 的余数 是 2 或 0.\n必胜状态: 剩余的格子数除以 7 的余数 不是 2 或 0.\n尝试让 bot 一直处于必败状态吧!`);
    return;
});

$.changeBox();