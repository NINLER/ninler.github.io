const JsResourcesList=[
    "./js/modules/constants.js",
    "./js/modules/canvasDrawing.js",
    "../assets/js/coding.js",
    "./js/modules/mapCoding.js",
    "./js/modules/map.js",
    "./js/modules/monster.js",
    "./js/modules/gameLoop.js",
];

var loadedResourceCountdown=JsResourcesList.length;

async function startGame(id)
{
    cancelAnimationFrame(animationId);
    blkdat=Array(200),mapInBin=await mapInit(id),visable=Array(200);
    mv={x:0,y:0},clickDir=[0,0,0,0],crystalCount=0;
    monst=new Array(),gameStatus='ALIVE',notice='';
    stunStart=false,visionStart=false,stTime=0;
    initGame(); work();
    return;
}

const addElement=(id=0)=>{
    return new Promise((res,rej)=>{
        if(id>=JsResourcesList.length) return res();
        const elem=document.createElement('script');
        elem.src=JsResourcesList[id];
        elem.onload=()=>{addElement(id+1).then(()=>{res()})}
        document.body.appendChild(elem);
    });
};

// addElement().then(()=>{startGame(0)});
addElement();