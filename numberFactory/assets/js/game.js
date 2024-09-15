function render()
{
    const winSize={width:window.innerWidth,height:window.innerHeight};
    drawboard.setAttribute('width',winSize.width);
    drawboard.setAttribute('height',winSize.height);
    for(let i=Math.round(nowpos[0]/blka)*blka; i<=Math.round((nowpos[0]+winSize.width)/blka)*blka; i+=blka)
        canvas.drawLine((i==0? '#ff0000':'black'),i-nowpos[0],-1,i-nowpos[0],winSize.height+1,1,true);
    for(let i=Math.round(nowpos[1]/blka)*blka; i<=Math.round((nowpos[1]+winSize.height)/blka)*blka; i+=blka)
        canvas.drawLine((i==0? '#ff0000':'black'),-1,i-nowpos[1],winSize.width+1,i-nowpos[1],1,true);
    // for(let i=0; i<=1000; i++) canvas.drawLine('black',-1000,i*blka,10000,i*blka,1,true);
    return;
}

function mainLoop()
{
    let stTime=null,frames=[],times=0;
    function frame(timestamp)
    {
        if(stTime==null) stTime=timestamp; let nxtTime=times*gapps;
        let elapse=timestamp-stTime;
        while(nxtTime<=elapse) times++,nxtTime+=gapps; times++;
        while(frames.length&&elapse-frames.at(0)>=1000) frames.shift(); frames.push(elapse);
        document.getElementById('fps').innerHTML="FPS : "+(frames.length);
        // console.log(frames);
        // console.log(elapse,nxtTime,timestamp,nxtTime-elapse,times);
        render(); window.setTimeout(()=>{ requestAnimationFrame(frame); },nxtTime-elapse);
        return;
    }
    requestAnimationFrame(frame);
    return;
}

mainLoop();