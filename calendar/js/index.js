function LoadCell()
{
    const chess=document.getElementById("chess");
    const board=[
        "Jan","Feb","Mar","Apr","May","Jun","\n",
        "Jul","Aug","Sept","Oct","Nov","Dec","\n",
        "1","2","3","4","5","6","7",
        "8","9","10","11","12","13","14",
        "15","16","17","18","19","20","21",
        "22","23","24","25","26","27","28",
        "29","30","31","Sun","Mon","Tues","Wed",
        "","","","","Thur","Fri","Sat",
    ]
    const Month=[
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sept","Oct","Nov","Dec",
    ]
    const Week=["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
    let tm=new Date()
    const ban=[
        Month[tm.getMonth()],
        tm.getDate()+"",
        Week[tm.getDay()]
    ]
    for(let it of board)
    {
        let tmp=document.createElement("div");
        tmp.className="cell";
        if(it==="\n") tmp=document.createElement("br");
        else if(it==="") tmp.classList.add('null');
        else if(ban.includes(it))
            tmp.classList.add('banned'),tmp.innerHTML=it;
        else tmp.classList.add("empty"),tmp.innerHTML=it;
        chess.appendChild(tmp);
    }
    return;
}

function RotateInfo(info="",turn=0,flip=0)
{
    let nw=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    info=info.split('\n');
    for(let i=0; i<4; i++)
        for(let j=0; j<4; j++)
        {
            if(turn===0) nw[i+0][j+0]=info[i][j];
            if(turn===1) nw[j+0][3-i]=info[i][j];
            if(turn===2) nw[3-i][3-j]=info[i][j];
            if(turn===3) nw[3-j][i+0]=info[i][j];
        }
    info=nw.map(it=>it.join('')).join('\n');
    nw=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    info=info.split('\n');
    for(let i=0; i<4; i++)
        for(let j=0; j<4; j++)
        {
            if(flip===0) nw[i+0][j+0]=info[i][j];
            if(flip===1) nw[3-i][j+0]=info[i][j];
        }
    info=nw.map(it=>it.join('')).join('\n');
    return info;
}

function GetJigsaw(col="",info="")
{
    info=info.replaceAll('\n','')
        .replaceAll('.','<div class="cell null"></div>')
        .replaceAll('#',`<div class="cell ${col}"></div>`)
    return info;
}

function LoadJigsaw()
{
    const cont=document.getElementById('jigsaw-container');
    const Jigsaws=[
        [[-44,-272],"darkred","###.\n#...\n#...\n....",],
        [[51,-189],"red",".#..\n.#..\n###.\n....",],
        [[239,-284],"orange",".#..\n##..\n#...\n#...",],
        [[386,-185],"yellow",".#..\n##..\n#...\n....",],
        [[445,166],"lightgreen","##..\n#...\n#...\n....",],
        [[412,-14],"green","##..\n#...\n#...\n#...",],
        [[54,449],"lightblue",".##.\n###.\n....\n....",],
        [[215,409],"blue","#.#.\n###.\n....\n....",],
        [[-40,436],"purple","####\n....\n....\n....",],
        [[392,360],"darkblue","..#.\n###.\n#...\n....",],
    ];
    for(let [offset,col,info] of Jigsaws)
    {
        let tmp=document.createElement('div');
        tmp.className="jigsaw";
        tmp.setAttribute("color",col);
        tmp.setAttribute("info",info);
        tmp.style.top=offset[0]+"px";
        tmp.style.left=offset[1]+"px";
        tmp.innerHTML=GetJigsaw(col,info);
        cont.appendChild(tmp);
    }
    return;
}

LoadCell();
LoadJigsaw();
LoadJigsawEvents();