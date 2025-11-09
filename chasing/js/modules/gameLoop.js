var canvas=document.getElementById('canvas');
canvas=canvas.getContext('2d');

var blkdat=Array(200),mapInBin,visable=Array(200); // map
var pl,mv={x:0,y:0},clickDir=[0,0,0,0],spawn; // player
var monst=new Array(),gameStatus='ALIVE',notice='',crystalCount=0; // game stats
var stunStart=false,visionStart=false,stTime=0,nowTime; // timer
var animationId; // game loop

function initGame()
{
    let plspawn;
    for(let i=0; i<200; i++)
        visable[i]=Array(200);
    for(let i=0; i<blkdat.length; i++)
    {
        blkdat[i]=Array(200);
        for(let j=0; j<blkdat[i].length; j++)
        {
            let crystalType=[1,6,7].indexOf(mapInBin[i][j])+1;
            blkdat[i][j]=new Block(i,j,crystalType);
            if(mapInBin[i][j]==2) monst.push([copy(blkdat[i][j].center),'NONE']);
            if(mapInBin[i][j]==3) pl=copy(blkdat[i][j].center),plspawn=create(i,j);
            if(mapInBin[i][j]==4) spawn=create(i,j);
        }
    }
    if(!spawn) spawn=copy(plspawn);
    return;
}

function processVisableBlock() // Process visable blocks
{
    for(let i=0; i<visable.length; i++)
        for(let j=0; j<visable[i].length; j++)
            visable[i][j]=!visableOption;
    if(visableOption)
        for(let i=0; i<visable.length; i++)
            for(let j=0; j<visable[i].length; j++)
                // if(len(sub(blkdat[i][j].center,pl))<=visionRange)
                    visable[i][j]=true;
    return;
}

function drawBlocks(visableOption,vision) // vision : Draw blocks with visibility <vision>.
{
    // Special invisible effect!
    if(!vision&&visableOption)
    {
        let gra=canvas.createRadialGradient(canvasWidth/2,canvasHeight/2,0,canvasWidth/2,canvasHeight/2,1e5);
        gra.addColorStop(0,"#5550");
        gra.addColorStop(visionRange*blka/1e5,"#5550");
        gra.addColorStop((visionRange*blka+25)/1e5,"#555");
        gra.addColorStop(1,"#555");
        canvas.fillStyle=gra;
        canvas.beginPath();
        canvas.rect(0,0,canvasWidth,canvasHeight);
        canvas.fill();
        for(let i=-canvasWidth/blka; i<mapInBin.length+canvasWidth/blka; i++)
            for(let j=-canvasWidth/blka; j<mapInBin[0].length+canvasHeight/blka; j++)
            {
                if(i<0||i>=mapInBin.length||j<0||j>=mapInBin[0].length||!mapInBin[i][j])
                    drawRect("#111111",i*blka+canvasWidth/2-pl.x,j*blka+canvasHeight/2-pl.y,blka,blka);
                if(i<0||i>=mapInBin.length||j<0||j>=mapInBin[i].length) continue;
                if(blkdat[i][j].crystal==1)
                    drawCircle('#9c27b0',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/6),
                    crystalCount++;
                if(blkdat[i][j].crystal==2) // vision
                    drawCircle('#fe4c61',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/5);
                if(blkdat[i][j].crystal==3) // stun
                    drawCircle('#ffe169',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/5);
            }
        return;
    }
    for(let i=-canvasWidth/blka; i<mapInBin.length+canvasWidth/blka; i++)
        for(let j=-canvasWidth/blka; j<mapInBin[0].length+canvasHeight/blka; j++)
        {
            if(!mapInBin&&!vision&&(i<0||i>=mapInBin.length||j<0||j>=mapInBin[0].length))
                drawRect('#111111',i*blka-pl.x+canvasWidth/2,j*blka-pl.y+canvasHeight/2,blka,blka);
            if(i<0||i>=mapInBin.length||j<0||j>=mapInBin[i].length) continue;
            if(mapInBin[i][j]&&visable[i][j]==vision)
            {
                let color=(visableOption&&vision? '#aaaaaa':'#555555');
                if(gameStatus=='COLLECT OVER'&&i==spawn.x&&j==spawn.y)
                    color=(vision? 'yellow':'#6e6e00');
                drawRect(color,i*blka-pl.x+canvasWidth/2,j*blka-pl.y+canvasHeight/2,blka,blka);
                if(visableOption) continue;
                if(blkdat[i][j].crystal==1)
                    drawCircle('#9c27b0',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/6),
                    crystalCount++;
                if(blkdat[i][j].crystal==2) // vision
                    drawCircle('#fe4c61',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/5);
                if(blkdat[i][j].crystal==3) // stun
                    drawCircle('#ffe169',i*blka+blka/2-pl.x+canvasWidth/2,j*blka+blka/2-pl.y+canvasHeight/2,blka/5);
            }
        }
    return;
}

function drawMonster() // Draw Monster
{
    for(let i=0; i<monst.length; i++)
    {
        let move=monsterMove(monst[i][0],pl,monsterSpeed,monst[i][1],i);
        // console.log(move);
        monst[i]=move;
        drawCircle('rgb(255,0,0)',monst[i][0].x-pl.x+canvasWidth/2,monst[i][0].y-pl.y+canvasHeight/2,blka/2);
        // Died?
        if(dist(monst[i][0].x,monst[i][0].y,pl.x,pl.y)<blka/2+blka/4&&nowTime-stunStart>stunTime*1000)
            gameStatus='DIED';
    }
}

function drawMap(ttpos)
{
    processVisableBlock();
    drawBlocks(visableOption,true);
    if(nowTime-visionStart<=visionTime*1000)
        drawBlocks(visableOption,false),drawMonster();
    else drawMonster(),drawBlocks(visableOption,false);
    return;
}

function work(lstTime=0)
{
    nowTime=Date.now();
    if(!lstTime) stTime=0,lstTime=Date.now();
    if(gameStatus=='DIED'||gameStatus=='WIN')
        return;
    if(!stTime) stTime=nowTime-lstTime;
    crystalCount=0;
    drawRect("#111111",-1e10,-1e10,2e10,2e10);
    let tpos={x:pl.x,y:pl.y},ttpos;
    tpos.x=Math.floor(pl.x/blka);
    tpos.y=Math.floor(pl.y/blka);
    ttpos={x:tpos.x,y:tpos.y};
    drawMap(false,ttpos);
    if(gameStatus=='DIED') { drawWord('YOU DIED!','17pt Consolas','red',30,canvasWidth-120); return; }

    // Process Player Movement
    // console.log(mv);
    for(let i=0.1; i<=Math.abs(mv.x)||i<=Math.abs(mv.y); i+=0.1)
    {
        let tar=playerMove(create((i<=Math.abs(mv.x)? 0.1*sgn(mv.x):0),(i<=Math.abs(mv.y)? 0.1*sgn(mv.y):0)),copy(ttpos));
        // console.log(tar);
        pl=copy(tar);
    }
    if(gameStatus=='COLLECT OVER'&&Math.floor(pl.x/blka)==spawn.x&&Math.floor(pl.y/blka)==spawn.y)
    {
        document.getElementById('canvas').style.border=`#1cc31c solid 8pt`;
        drawWord('YOU WIN!','17pt Consolas','#1cc31c',30,canvasWidth-120);
        gameStatus='WIN';
        return;
    }

    // Check Crystal
    let newpblk={x:Math.floor(pl.x/blka),y:Math.floor(pl.y/blka)}
    if(blkdat[newpblk.x][newpblk.y].crystal==1) // Has crystal
        blkdat[newpblk.x][newpblk.y].crystal=0;
    if(blkdat[newpblk.x][newpblk.y].crystal==2) // Vision crystal
        blkdat[newpblk.x][newpblk.y].crystal=0,
        visionStart=nowTime;
    if(blkdat[newpblk.x][newpblk.y].crystal==3) // Stun crystal
        blkdat[newpblk.x][newpblk.y].crystal=0,
        stunStart=nowTime;
    if(crystalCount==0) notice='Go to the goal !!!',gameStatus='COLLECT OVER';

    // Canvas Border
    let mindist=1e10;
    for(let i=0; i<monst.length; i++)
        mindist=Math.min(mindist,dist(pl.x,pl.y,monst[i][0].x,monst[i][0].y));
    mindist-=2*blka;
    let distlim=3*blka;
    if(mindist>distlim) mindist=distlim;
    if(mindist<0) mindist=0;
    document.getElementById('canvas').style.border=`rgba(255,0,0,${1-parseFloat(mindist/distlim).toFixed(2)}) solid 8pt`;
    
    // Draw Stats
    drawCircle('rgb(3, 169, 244)',canvasWidth/2,canvasHeight/2,blka/4);
    drawWord(`Crystals Left:${crystalCount}`,'15pt Consolas','#c76e1a',30,10);
    drawWord(notice,'15pt Consolas','#ffb300',60,10);
    if(nowTime-stunStart<=stunTime*1000)
        drawWord("Stun remain : "+(stunTime-(nowTime-stunStart)/1000).toFixed(2)+'s',"18px Consolas",'#ffe169',canvasHeight-45,15);
    if(nowTime-visionStart<=visionTime*1000)
        drawWord("Vision remain : "+(visionTime-(nowTime-visionStart)/1000).toFixed(2)+'s',"18px Consolas",'orange',canvasHeight-20,15);
    drawWord("Time : "+((nowTime-stTime-readyTime*1000)/1000).toFixed(2)+'s',"20px Consolas",'lightblue',canvasHeight-20,canvasWidth-20,false,"right");
    if(nowTime-stTime<=readyTime*1000)
        drawRect("rgb(50, 50, 50, 0.8)",canvasWidth/2-75,canvasHeight/2-30,150,40),
        drawWord(((readyTime*1000-(nowTime-stTime))/1000).toFixed(2),"30px Consolas","orange",canvasHeight/2,canvasWidth/2,false,"center");

    // Test Frame
    // if(true) { notice=(lstTime-(nowTime-stTime)).toFixed(2); }
    
    animationId=requestAnimationFrame(work);
    return;
}

document.addEventListener('keydown',(event)=>{
    // console.log(event.key);
    switch(event.key)
    {
        case 'ArrowUp': case 'w': if(!clickDir[0]) clickDir[0]=1,mv.y-=speed; break;
        case 'ArrowDown': case 's': if(!clickDir[1]) clickDir[1]=1,mv.y+=speed; break;
        case 'ArrowLeft': case 'a': if(!clickDir[2]) clickDir[2]=1,mv.x-=speed; break;
        case 'ArrowRight': case 'd': if(!clickDir[3]) clickDir[3]=1,mv.x+=speed; break;
    }
    // console.log(clickDir,mv);
    return;
});

document.addEventListener('keyup',(event)=>{
    switch(event.key)
    {
        case 'ArrowUp': case 'w': if(clickDir[0]) clickDir[0]=0,mv.y+=speed; break;
        case 'ArrowDown': case 's': if(clickDir[1]) clickDir[1]=0,mv.y-=speed; break;
        case 'ArrowLeft': case 'a': if(clickDir[2]) clickDir[2]=0,mv.x+=speed; break;
        case 'ArrowRight': case 'd': if(clickDir[3]) clickDir[3]=0,mv.x-=speed; break;
    }
    return;
});

function playerMove(mv1,ttpos,debug=false)
{
    if(nowTime-stTime<=readyTime*1000) return copy(pl);
    let respl=copy(pl),resultX=checkPlayerCanMove(create(mv1.x,0),ttpos),resultY=checkPlayerCanMove(create(0,mv1.y),ttpos);
    if(resultX[0]) respl.x+=mv1.x; if(resultY[0]) respl.y+=mv1.y;
    if(debug) console.log("MOVEMENT RESULT",resultX,resultY);
    // console.log(Math.abs((ttpos.x+mv.x)*blka+blka/2-newpl.x),Math.abs((ttpos.y+mv.y)*blka+blka/2-newpl.y);
    if(!((!resultX[0]||!resultY[0])&&(resultX[2][0]!='E'&&resultY[2][0]!='E'))) return respl;
    let corner={...(resultX[1]??resultY[1])};
    let forceDir=sub(corner,pl);
    let partForce=mulnum(forceDir,len(divnum(mul(mv1,forceDir),dist(0,0,forceDir.x,forceDir.y)**2)));
    let realForce=add(mv1,sub(create(0,0),partForce));
    if(debug) console.log(resultX,resultY,mv1,forceDir,partForce,realForce);
    respl={...pl};
    if(checkPlayerCanMove(create(realForce.x,0),ttpos)[0]) respl=add(respl,create(realForce.x,0));
    if(checkPlayerCanMove(create(0,realForce.y),ttpos)[0]) respl=add(respl,create(0,realForce.y));
    return respl;
}

function checkPlayerCanMove(mv1,ttpos)
{
    let newpl={x:pl.x+mv1.x,y:pl.y+mv1.y};
    let check=true,collideBlock=null,collideCode="NULL";
    for(let i=1; i<9&&check; i++)
    {
        let temp=create(ttpos.x+dir8[0][i],ttpos.y+dir8[1][i]);
        if(mapInBin[temp.x][temp.y]) continue;
        blkdat[temp.x][temp.y].corner.forEach((val)=>{
            if(!check) return;
            if(dist(val.x,val.y,newpl.x,newpl.y)<blka/4) check=false,collideBlock={...val},collideCode="CORNER";
            return;
        });
        if(!check) break;
        for(let i=0; i<4; i++)
        {
            let edge=blkdat[temp.x][temp.y].edge[dir[i]];
            if(i==0||i==2) { if(edge.x[0]<=newpl.x&&newpl.x<=edge.x[1]) if(sgn(newpl.y-edge.y[0])==sgn(dir[dir[i]].y)) if(Math.abs(edge.y[0]-newpl.y)<blka/4) check=false; }
            else { if(edge.y[0]<=newpl.y&&newpl.y<=edge.y[1]) if(sgn(newpl.x-edge.x[0])==sgn(dir[dir[i]].x)) if(Math.abs(edge.x[0]-newpl.x)<blka/4) check=false; }
            if(!check) { collideBlock={...temp},collideCode="EDGE "+i; break; }
        }
    }
    return [check,collideBlock,collideCode];
}