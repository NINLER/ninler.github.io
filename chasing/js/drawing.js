var canvas=document.getElementById('canvas');
canvas=canvas.getContext('2d');

var blkdat=Array(200);
var mapInBin=mapInit();
var visable=Array(200);
var blka=50,pl;
var speed=1.2;
var mv={x:0,y:0};
let clickDir=[0,0,0,0];
var monst=new Array();
var gameStatus='ALIVE';
var notice='';
var spawn={x:8,y:8}

function init()
{
    for(let i=0; i<200; i++)
        visable[i]=Array(200);
    for(let i=0; i<blkdat.length; i++)
    {
        blkdat[i]=Array(200);
        for(let j=0; j<blkdat[i].length; j++)
            blkdat[i][j]=new Block(i,j,mapInBin[i][j]);
            // blkdat[i][j]=new Block(i,j,i==1&&j==1);
    }
    monst.push([copy(blkdat[1][1].center),'NONE']);
    monst.push([copy(blkdat[15][15].center),'NONE']);
    pl=copy(blkdat[spawn.x][spawn.y].center);
    return;
}

function work()
{
    if(gameStatus=='DIED'||gameStatus=='WIN')
        return;
    let crystalCount=0;
    drawRect("#111111",-1e10,-1e10,2e10,2e10);
    // console.log(mapInBin);
    // Process visable blocks
    for(let i=0; i<visable.length; i++)
        for(let j=0; j<visable[i].length; j++)
            visable[i][j]=false;
    let tpos={x:pl.x,y:pl.y},ttpos;
    tpos.x=Math.floor(pl.x/blka);
    tpos.y=Math.floor(pl.y/blka);
    ttpos={x:tpos.x,y:tpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.x++;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.x--;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.y++;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.y--;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.x++,tpos.y--;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.x--,tpos.y--;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.y++,tpos.x++;tpos={x:ttpos.x,y:ttpos.y};
    while(mapInBin[tpos.x][tpos.y])visable[tpos.x][tpos.y]=true,tpos.y++,tpos.x--;tpos={x:ttpos.x,y:ttpos.y};
    // Draw blocks
    for(let i=0; i<mapInBin.length; i++)
        for(let j=0; j<mapInBin[i].length; j++)
            if(mapInBin[i][j]&&visable[i][j])
            {
                let color='#aaaaaa';
                if(gameStatus=='COLLECT OVER'&&i==spawn.x&&j==spawn.y)
                    color='yellow';
                drawRect(color,i*blka-pl.x+250,j*blka-pl.y+250,blka,blka);
                if(blkdat[i][j].crystal)
                    drawCircle('#9c27b0',i*blka-pl.x+250+blka/2,j*blka-pl.y+250+blka/2,blka/6),crystalCount++;
            }
    for(let i=0; i<monst.length; i++)
    {
        let move=monsterMove(monst[i][0],pl,speed,monst[i][1]);
        // console.log(move);
        monst[i]=move;
        drawCircle('rgb(255,0,0)',monst[i][0].x-pl.x+250,monst[i][0].y-pl.y+250,blka/2);
        // Died?
        if(dist(monst[i][0].x,monst[i][0].y,pl.x,pl.y)<blka/2+blka/4)
            gameStatus='DIED';
    }
    for(let i=0; i<mapInBin.length; i++)
        for(let j=0; j<mapInBin[i].length; j++)
        {
            if(!mapInBin)
                drawRect('#111111',i*blka-pl.x+250,j*blka-pl.y+250,blka,blka);
            if(mapInBin[i][j]&&!visable[i][j])
            {
                let color='#555555';
                if(gameStatus=='COLLECT OVER'&&i==spawn.x&&j==spawn.y)
                    color='#6e6e00';
                drawRect(color,i*blka-pl.x+250,j*blka-pl.y+250,blka,blka);
                if(blkdat[i][j].crystal)
                    drawCircle('#9c27b0',i*blka-pl.x+250+blka/2,j*blka-pl.y+250+blka/2,blka/6),crystalCount++;
            }
        }
    if(gameStatus=='DIED')
    {
        drawWord('YOU DIED!','17pt Consolas','red',30,380)
        return;
    }
    // Process Coordinate
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
        drawWord('YOU WIN!','17pt Consolas','#1cc31c',30,380);
        gameStatus='WIN';
        return;
    }
    // Check Crystal
    let newpblk={x:Math.floor(pl.x/blka),y:Math.floor(pl.y/blka)}
    if(blkdat[newpblk.x][newpblk.y].crystal&&dist(pl.x,pl.y,newpblk.x*blka+25,newpblk.y*blka+25)<blka/6+blka/4)
        blkdat[newpblk.x][newpblk.y].crystal=false;
    if(crystalCount==0)
        notice='Go back to the center!!!',gameStatus='COLLECT OVER';
    // Canvas Border
    let mindist=1e10;
    for(let i=0; i<monst.length; i++)
        mindist=Math.min(mindist,dist(pl.x,pl.y,monst[i][0].x,monst[i][0].y));
    mindist-=2*blka;
    let distlim=3*blka;
    if(mindist>distlim)
        mindist=distlim;
    if(mindist<0)
        mindist=0;
    document.getElementById('canvas').style.border=`rgba(255,0,0,${1-parseFloat(mindist/distlim).toFixed(2)}) solid 8pt`;
    // End
    drawCircle('rgb(3, 169, 244)',250,250,blka/4);
    drawWord(`Crystals Left:${crystalCount}`,'15pt Consolas','#c76e1a','30','10');
    drawWord(notice,'15pt Consolas','#ffb300','60','10');
    // console.log(pl);
    return;
}

init();
setInterval('work()',1);

document.onkeydown=function(event)
{
    // console.log(event.key);
    switch(event.key)
    {
        case 'ArrowUp':case 'w':
            if(!clickDir[0])
                clickDir[0]=1,mv.y-=speed;
            break;
        case 'ArrowDown':case 's':
            if(!clickDir[1])
                clickDir[1]=1,mv.y+=speed;
            break;
        case 'ArrowLeft':case 'a':
            if(!clickDir[2])
                clickDir[2]=1,mv.x-=speed;
            break;
        case 'ArrowRight':case 'd':
            if(!clickDir[3])
                clickDir[3]=1,mv.x+=speed;
            break;
    }
    // console.log(clickDir,mv);
    return;
}

document.onkeyup=function(event)
{
    switch(event.key)
    {
        case 'ArrowUp':case 'w':clickDir[0]=0,mv.y+=speed;break;
        case 'ArrowDown':case 's':clickDir[1]=0,mv.y-=speed;break;
        case 'ArrowLeft':case 'a':clickDir[2]=0,mv.x+=speed;break;
        case 'ArrowRight':case 'd':clickDir[3]=0,mv.x-=speed;break;
    }
    return;
}

function playerMove(mv1,ttpos)
{
    let respl=copy(pl);
    let newpl={x:pl.x+mv1.x,y:pl.y};
    let check=true;
    for(let i=1; i<9&&check; i++)
    {
        let temp=create(ttpos.x+dir8[0][i],ttpos.y+dir8[1][i]);
        if(mapInBin[temp.x][temp.y])
            continue;
        blkdat[temp.x][temp.y].corner.forEach((val)=>{
            if(!check)
                return;
            if(dist(val.x,val.y,newpl.x,newpl.y)<blka/4)
                check=false;
            return;
        });
        if(!check)
            break;
        for(let i=0; i<4; i++)
        {
            let edge=blkdat[temp.x][temp.y].edge[dir[i]];
            if(i==0||i==2)
            {
                if(edge.x[0]<=newpl.x&&newpl.x<=edge.x[1])
                    if(sgn(newpl.y-edge.y[0])==sgn(dir[dir[i]].y))
                        if(Math.abs(edge.y[0]-newpl.y)<blka/4)
                            check=false;
            }
            else
            {
                if(edge.y[0]<=newpl.y&&newpl.y<=edge.y[1])
                    if(sgn(newpl.x-edge.x[0])==sgn(dir[dir[i]].x))
                        if(Math.abs(edge.x[0]-newpl.x)<blka/4)
                            check=false;
            }
        }
    }
    if(check)
        respl.x+=mv1.x;
    newpl={x:pl.x,y:pl.y+mv1.y};
    check=true;
    for(let i=1; i<9&&check; i++)
    {
        let temp=create(ttpos.x+dir8[0][i],ttpos.y+dir8[1][i]);
        if(mapInBin[temp.x][temp.y])
            continue;
        blkdat[temp.x][temp.y].corner.forEach((val)=>{
            if(!check)
                return;
            if(dist(val.x,val.y,newpl.x,newpl.y)<blka/4)
                check=false;
            return;
        });
        if(!check)
            break;
        for(let i=0; i<4; i++)
        {
            let edge=blkdat[temp.x][temp.y].edge[dir[i]];
            if(i==0||i==2)
            {
                if(edge.x[0]<=newpl.x&&newpl.x<=edge.x[1])
                {
                    // console.log(temp,dir[i],sgn(edge.y[0]-newpl.y),sgn(dir[dir[i]].y))
                    if(sgn(newpl.y-edge.y[0])==sgn(dir[dir[i]].y))
                        if(Math.abs(edge.y[0]-newpl.y)<blka/4)
                            check=false;
                }
            }
            else
            {
                if(edge.y[0]<=newpl.y&&newpl.y<=edge.y[1])
                {
                    // console.log(temp,dir[i],sgn(edge.x[0]-newpl.x),sgn(dir[dir[i]].x))
                    if(sgn(newpl.x-edge.x[0])==sgn(dir[dir[i]].x))
                        if(Math.abs(edge.x[0]-newpl.x)<blka/4)
                            check=false;
                }
            }
        }
    }
    if(check)
        respl.y+=mv1.y;
    // console.log(Math.abs((ttpos.x+mv.x)*blka+blka/2-newpl.x),Math.abs((ttpos.y+mv.y)*blka+blka/2-newpl.y))
    return respl;
}