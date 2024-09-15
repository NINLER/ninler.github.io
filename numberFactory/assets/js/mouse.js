// variables
let mouseOffset=[0,0],mousePosition=[0,0],posOffset=[0,0],mouseMoving=false,interval;

(()=>{
    document.addEventListener('mousedown',(event)=>{
        mouseMoving=true,posOffset=[...nowpos],mousePosition=[event.clientX,event.clientY];
        mouseOffset=[...mousePosition];
        // console.log('mousedown',mouseMoving,nowpos,mouseOffset,mousePosition,posOffset);
        interval=window.setInterval(()=>{
            if(!mouseMoving) return window.clearInterval(interval);
            nowpos=[posOffset[0]-mousePosition[0]+mouseOffset[0],posOffset[1]-mousePosition[1]+mouseOffset[1]];
        },gapps);
    });
    document.addEventListener('mousemove',(event)=>{
        if(!mouseMoving) return;
        mousePosition=[event.clientX,event.clientY];
        // console.log('mousemove',mouseMoving,nowpos,mouseOffset,mousePosition,posOffset);
    });
    document.addEventListener('mouseup',(event)=>{
        mouseMoving=false;
        // console.log('mouseup',mouseMoving,nowpos,mouseOffset,mousePosition,posOffset);
    });
    document.addEventListener('wheel',(event)=>{
        console.log('wheel',event); let lst=blka,offset=[event.clientX-nowpos[0],event.clientY-nowpos[1]];
        blka-=event.deltaY/10; blka=Math.min(Math.max(blka,20),60); console.log(offset,nowpos);
        // offset[0]=offset[0]/blka*lst, offset[1]=offset[1]/blka*lst;
        // offset[0]=offset[0]/lst*blka, offset[1]=offset[1]/lst*blka;
        nowpos[0]=nowpos[0]-offset[0]+offset[0]/lst*blka,nowpos[1]=nowpos[1]-offset[1]+offset[1]/lst*blka;
        console.log(lst,blka,offset,nowpos,event.clientX,event.clientY);
    });
})();