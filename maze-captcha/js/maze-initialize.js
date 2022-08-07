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
var px=9,py=0,step=35;
var over=false;
ShowMaze();
function ShowMaze()
{
    if(px==8&&py==9&&over==false)
    {
        over=true;
        let temp2=document.getElementById("error");
        temp2.style="background-color:rgba(255, 0, 0, 0.397);color:red;text-align:center;display:none";
        temp2=document.getElementById("check-box");
        temp2.style="display:none";
        temp2=document.getElementById("success");
        temp2.style="background-color:rgba(0, 255, 0, 0.226);color:rgb(29, 175, 29);text-align:center;display:inline-block";
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
            if(i==px&&j==py)
            {
                temp.style="background-color:#00cbff";
            }
        }
    let temp1=document.getElementById("step");
    temp1.innerHTML=step;
    return;
}