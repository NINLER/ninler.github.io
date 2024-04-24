function bfs(pos={x:0,y:0},tar={x:0,y:0})
{
    // console.log(pos,tar);
    let q=new Array();
    let vis=new Array(200);
    for(let i=0; i<vis.length; i++)
        vis[i]=new Array(200).fill(0);
    q.push([pos,[]]);
    vis[pos.x][pos.y]=true;
    // console.log(mapInBin);
    while(q.length)
    {
        let now=q[0];
        // console.log(q);
        q=q.splice(1);
        if(q.length>100)
            return false;
        if(now[0].x==tar.x&&now[0].y==tar.y)
            return now[1];
        for(let i=0; i<4; i++)
        {
            let d=dir[dir[i]];
            let temp=create(d.x+now[0].x,d.y+now[0].y);
            if(mapInBin[temp.x][temp.y]&&!vis[temp.x][temp.y])
            {
                let temp2=new Array(now[1].length);
                for(let j=0; j<now[1].length; j++)
                    temp2[j]=now[1][j];
                temp2.push(dir[i]);
                vis[temp.x][temp.y]=true;
                q.push([temp,temp2]);
            }
        }
    }
    return;
}

function monsterMove(now,tar,speed,last,debug=true)
{
    if(debug) { return [now,last]; }
    // console.log(now,tar);
    let nowblk=create(Math.floor(now.x/blka),Math.floor(now.y/blka))
    let res=bfs(nowblk,create(Math.floor(tar.x/blka),Math.floor(tar.y/blka))),nxtpos;
    // if(now.x!=blkdat[nowblk.x][nowblk.y].center.x||now.y!=blkdat[nowblk.x][nowblk.y].center.y)
    //     res=[last].concat(res).concat('TARGET');
    // else
    //     res=res.concat('TARGET');
    res=res.concat('TARGET');
    if(last!='NONE')
        res=[last].concat(res);
    // console.log(res);
    let turn=-1;
    for(let i=1; i<res.length; i++)
    {
        if(res[i]!=res[i-1])
        {
            turn=i;
            break;
        }
        nowblk=add(nowblk,dir[res[i]]);
    }
    if(turn==-1)
        return;
    let cent=blkdat[nowblk.x][nowblk.y].center,direction=[];
    if(now.x==blkdat[nowblk.x][nowblk.y].center.x&&now.y==blkdat[nowblk.x][nowblk.y].center.y&&turn==1)
        turn++;
    nxtpos=create(now.x+dir[res[turn-1]].x*speed,now.y+dir[res[turn-1]].y*speed);
    if(nxtpos.x!=cent.x)
        direction.push((nxtpos.x<cent.x? 'LEFT':'RIGHT'))
    if(nxtpos.y!=cent.y)
        direction.push((nxtpos.y<cent.y? 'UP':'DOWN'))
    if(direction.length==1&&direction[0]==res[turn-1])
        nxtpos=cent;
    return [nxtpos,res[turn-1]];
}