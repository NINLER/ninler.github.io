var maze=[
    [1,1,1,1,1,1,0,1,1,1],
    [1,0,0,1,0,1,0,1,0,0],
    [1,1,0,0,0,1,1,1,1,1],
    [0,1,1,0,0,1,0,1,0,1],
    [0,0,1,1,0,1,0,1,0,1],
    [0,0,0,1,1,0,1,1,0,0],
    [0,1,1,1,0,0,0,1,1,1],
    [0,1,0,0,0,1,0,1,0,0],
    [0,1,0,1,0,1,0,1,0,2],
    [3,1,0,1,1,1,1,1,1,1]
];
var sx,sy,px,py,step,ex,ey;
var over=false;
class queue
{
    constructor(){this.item=[];this.h=0;this.r=0;}
    push(value){this.item.push(value);this.r++;return;}
    pop(){this.h++;return;}
    front(){return this.item[this.h];}
    size(){return this.item.length;}
    clear(){this.item=[];this.h=0;this.r=0;}
}
function MakePath(sttx,stty)
{
    let dx=[-1,1,0,0];
    let dy=[0,0,-1,1];
    let used=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    used[sttx][stty]=1;
    let stx=sttx,sty=stty;
    // console.log("makepath:"+stx+" "+sty);
    for(let i=1; i<=31; i++)
    {
        let dir=(Math.floor(Math.random()*100))%4;
        let temp1=stx,temp2=sty;
        stx=stx+dx[dir];
        sty=sty+dy[dir];
        // console.log("makepath:"+stx+" "+sty+" "+dir);
        if(stx<0||stx>9||sty<0||sty>9||used[stx][sty]==1)
        {
            i--;
            stx=temp1,sty=temp2;
        }
        else
            maze[stx][sty]=1;
    }
    maze[stx][sty]=3;
    return;
}
function MakeMaze()
{
    let temp1,temp2;
    temp1=Math.floor(Math.floor(Math.random()*100)/10);
    temp2=Math.floor(Math.floor(Math.random()*100)/10);
    // console.log(temp1+" "+temp2);
    for(let i=0; i<=9; i++)
        for(let j=0; j<=9; j++)
            maze[i][j]=0;
    MakePath(temp1,temp2);
    maze[temp1][temp2]=2;
    for(let i=0; i<=9; i++)
        for(let j=0; j<=9; j++)
            if(maze[i][j]==0)
                maze[i][j]=((Math.floor(Math.random()*100000000))%2);
    // for(let i=0; i<=9; i++)
    //     console.log(maze[i]);
    return;
}
function Bfs()
{
    let xp=new queue();
    let yp=new queue();
    let st=new queue();
    let dx=[0,-1,1,0,0];
    let dy=[0,0,0,-1,1];
    let used=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    for(let i=0; i<=9; i++)
        for(let j=0; j<=9; j++)
        {
            if(maze[i][j]==3)
                xp.push(i),yp.push(j),st.push(0),used[i][j]=1,sx=i,sy=j;
            if(maze[i][j]==2)
                px=i,py=j;
        }
    // console.log(xp.front()+" "+yp.front());
    used[sx][sy]=1;
    while(xp.size())
    {
        let x=xp.front();
        let y=yp.front();
        let step=st.front();
        xp.pop(),yp.pop(),st.pop();
        // console.log("bfs:"+x+" "+y+" "+step);
        // for(let i=0; i<=9; i++)
        //     console.log(used[i]);
        if(maze[x][y]==2)
            return step;
        for(let i=1; i<=4; i++)
        {
            let xx=x+dx[i],yy=y+dy[i];
            if(xx<0||xx>9||yy<0||yy>9)
                continue;
            if(maze[xx][yy]==0||used[xx][yy]==1)
                continue;
            used[xx][yy]=1;
            xp.push(xx);
            yp.push(yy);
            st.push(step+1);
        }
    }
    return -1;
}
function ShowMaze()
{
    if(px==sx&&py==sy&&over==false)
    {
        over=true;
        let temp2=document.getElementById("error");
        temp2.style="background-color:rgba(255, 0, 0, 0.397);color:red;text-align:center;display:none";
        temp2=document.getElementById("check-box");
        temp2.style="display:none";
        temp2=document.getElementById("success");
        temp2.style="background-color:rgba(0, 255, 0, 0.226);color:rgb(29, 175, 29);text-align:center;display:inline-block";
        let tempval=toDouble(localStorage['maze-win-times'])+1;
        localStorage['maze-win-times']=tempval.toString();
        tempval=document.getElementById('mazeWin');
        tempval.innerHTML='你已经赢了 '+localStorage['maze-win-times']+' 局';
        time2=new Date();
        calcTime();
    }
    else if(step<=0&&over==false)
    {
        over=true;
        let temp2=document.getElementById("error");
        temp2.style="background-color:rgba(255, 0, 0, 0.397);color:red;text-align:center;display:inline-block";
        temp2=document.getElementById("check-box");
        temp2.style="display:none";
        temp2=document.getElementById("success");
        temp2.style="background-color:rgba(0, 255, 0, 0.226);color:rgb(29, 175, 29);text-align:center;display:none";
        let tempval=toDouble(localStorage['maze-lose-times'])+1;
        localStorage['maze-lose-times']=tempval.toString();
        tempval=document.getElementById('mazeLose');
        tempval.innerHTML='你已经输了 '+localStorage['maze-lose-times']+' 局';
        return;
    }
    else if(over==false)
    {
        let temp2=document.getElementById("error");
        temp2.style="background-color:rgba(255, 0, 0, 0.397);color:red;text-align:center;display:none";
        temp2=document.getElementById("check-box");
        temp2.style="display:inline-block";
        temp2=document.getElementById("success");
        temp2.style="background-color:rgba(0, 255, 0, 0.226);color:rgb(29, 175, 29);text-align:center;display:none";
    }
    maze[ex][ey]=2;
    for(let i=0; i<=9; i=i+1)
        for(let j=0; j<=9; j=j+1)
        {
            let temp=document.getElementById("block"+j+i);
            if(maze[i][j]==0)
            {
                temp.style="background-color:#000000";
            }
            if(maze[i][j]==1)
            {
                temp.style="background-color:#ffffff77";
            }
            if(maze[i][j]==2)
            {
                temp.style="background-color:#1ede43";
            }
            if(maze[i][j]==3)
            {
                temp.style="background-color:#de1e44";
            }
            if(maze[i][j]==4)
            {
                temp.style="background-color:#eaaf19";
            }
            if(i==px&&j==py)
            {
                temp.style="background-color:#00cbff";
            }
        }
    let temp1=document.getElementById("step");
    temp1.innerHTML=step;
    return;
}
function main()
{
    let temp2=document.getElementById("error");
    temp2.style.display="none";
    temp2=document.getElementById("check-box");
    temp2.style.display="none";
    temp2=document.getElementById("success");
    temp2.style.display="none";
    MakeMaze();
    step=Bfs();
    while(step<=12)
    {
        MakeMaze();
        step=Bfs();
    }
    ex=px,ey=py;
    step+=2;
    ShowMaze();
    temp2=document.getElementById("error");
    temp2.style.display="none";
    temp2=document.getElementById("check-box");
    temp2.style.display="inline-box";
    temp2=document.getElementById("success");
    temp2.style.display="none";
    return;
}
let temp2=document.getElementById("error");
temp2.style.display="none";
temp2=document.getElementById("check-box");
temp2.style.display="none";
temp2=document.getElementById("success");
temp2.style.display="none";
main();