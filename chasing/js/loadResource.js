const JsResourcesList=[
    "./js/modules/constants.js",
    "./js/modules/canvasDrawing.js",
    "./js/modules/map.js",
    "./js/modules/monster.js",
    "./js/modules/gameLoop.js",
];

var loadedResourceCountdown=JsResourcesList.length;

const addElement=()=>{
    for(let it of JsResourcesList)
    {
        const temp=document.createElement('script');
        temp.src=it;
        temp.onload=()=>{
            loadedResourceCountdown--;
            if(!loadedResourceCountdown) { init(); work(new Date().getTime(),0); }
        }
        document.body.appendChild(temp);
    }
    return;
};

addElement();