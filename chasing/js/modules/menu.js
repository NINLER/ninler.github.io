const levelInfo=document.getElementById('levelInfo');
const startButton=document.getElementById('start');
const aboutButton=document.getElementById('about');
const exitButton=document.getElementById('exit');
const prevButton=document.getElementById('prev');
const nextButton=document.getElementById('next');
const thisButton=document.getElementById('this');

var nowDisplay=1;

startButton.addEventListener('click',function (){
    let fa=this.parentElement;
    fa.classList.remove("active");
    fa.nextElementSibling.classList.add("active");
    nowDisplay=1; flushLevel();
    return;
});

exitButton.addEventListener('click',function (){
    let fa=this.parentElement;
    fa.classList.remove("active");
    fa.previousElementSibling.classList.add("active");
    return;
});

prevButton.addEventListener('click',function (){ nowDisplay=nowDisplay-(nowDisplay-1>0? 1:0); flushLevel(); });
nextButton.addEventListener('click',function (){ nowDisplay=nowDisplay+(nowDisplay+1<=MapData.length? 1:0); flushLevel(); });

thisButton.addEventListener('click',function (){
    document.getElementById('level').classList.remove("active");
    return startGame(nowDisplay-1);
});

document.addEventListener('keydown',(event)=>{
    if(!document.getElementById('level').classList.contains("active")) return;
    switch(event.key)
    {
        case 'ArrowLeft': case 'a': case "A": nowDisplay=nowDisplay-(nowDisplay-1>0? 1:0); flushLevel(); break;
        case 'ArrowRight': case 'd': case "D": nowDisplay=nowDisplay+(nowDisplay+1<=MapData.length? 1:0); flushLevel(); break;
        case 'c': case "C": thisButton.click(); break;
        case 'x': case "X": exitButton.click(); break;
    }
    return;
});

MapDataDecoded=MapData.map(it=>decodeMap(it));

function flushLevel() { levelInfo.innerHTML=getLevelHtml(MapDataDecoded[nowDisplay-1]); return; }

function getLevelHtml(data=[0, defaultConfiguration, [0, 0], ""])
{
    let str="",conf={},tmp,id;
    [id,conf,tmp,str]=data;
    conf={...defaultConfiguration,...conf};
    return `
        <div class="pos" style="top: 100px; left: 250px; width: 250px; font-size: 25px; text-align: center;">Level ${id+1}</div>
        <div class="pos" style="top: 250px; left: 100px; width: 250px; font-size: 18px; text-align: left;">大小: ${tmp[0]}x${tmp[1]}</div>
        <div class="pos" style="top: 280px; left: 100px; width: 250px; font-size: 18px; text-align: left;">玩家速度: ${conf.speed}</div>
        <div class="pos" style="top: 310px; left: 100px; width: 250px; font-size: 18px; text-align: left;">怪速度: ${conf.monsterSpeed}</div>
        <div class="pos" style="top: 340px; left: 100px; width: 250px; font-size: 18px; text-align: left;">视野限制: ${conf.visableOption}</div>
        <div class="pos" style="top: 370px; left: 100px; width: 250px; font-size: 18px; text-align: left;">视野大小: ${conf.visionRange} 格</div>
        <div class="pos" style="top: 250px; right: 100px; width: 250px; font-size: 18px; text-align: right;">怪物停止持续时间: ${conf.stunTime}s</div>
        <div class="pos" style="top: 280px; right: 100px; width: 250px; font-size: 18px; text-align: right;">视野扩大持续时间: ${conf.visionTime}s</div>
        <div class="pos" style="top: 310px; right: 100px; width: 250px; font-size: 18px; text-align: right;">准备时间: ${conf.readyTime}s</div>
    `;
}