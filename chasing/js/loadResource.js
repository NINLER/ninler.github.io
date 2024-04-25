const JsResourcesList=[
    "./js/modules/constants.js",
    "./js/modules/canvasDrawing.js",
    "./js/modules/map.js",
    "./js/modules/monster.js",
    "./js/modules/gameLoop.js",
];

const addElement=(id=0)=>{
    if(id>=JsResourcesList.length) return;
    const element=document.createElement('script');
    element.onload=()=>{addElement(id+1)};
    element.src=JsResourcesList[id]; document.body.appendChild(element);
};

addElement();