function encodeMap(mapId=0,config=defaultConfiguration,map=``)
{
    map=map.split('\n');
    let height=map.length,width=map[0].length;
    let cnt=0,now=-1,res="";
    for(let i=0; i<height; i++)
        for(let j=0; j<width; j++)
        {
            // console.log(i,j,cnt,now);
            if(!~now||map[i][j]!=charList[now])
            {
                if(~now) res+=String.fromCharCode(65+now)+(cnt==1? "":""+cnt);
                now=charList.indexOf(map[i][j]); cnt=0;
            }
            cnt++;
        }
    if(~now) res+=String.fromCharCode(65+now)+(cnt==1? "":""+cnt);
    res=mapId+' '+JSON.stringify(config)+' '+width+res;
    return res;
}

function decodeMap(data="")
{
    let cnt=data.split(' ');
    if(cnt.length!=3) return [0,{},""]; data=[cnt[2]];
    let id=cnt[0]-0,config=JSON.parse(cnt[1]),width;
    for(let i=0; i<charList.length; i++)
    {
        let tmp=[];
        for(let it of data)
        {
            let char=String.fromCharCode(65+i);
            it=it.split(char).map((it,id)=>(id? char:"")+it);
            for(let str of it) tmp.push(str);
        }
        data=tmp;
    }
    width=data[0]-0; data=data.slice(1);
    data=data.map(it=>charList[it[0].charCodeAt()-65].repeat(it.length>1? it.substr(1)-0:1)).join('');
    data=data.split('').map((it,idx)=>it+'\n'.repeat(!((idx+1)%width))).join('');
    return [id,config,[data.split('\n').length,width],data];
}