let pos=new Array(110);
let col=new Array(110);
let availableNum=20;

function getRand(l,r)
{
    let temp=1;
    for(let i=1; i<=100; i++)
    {
        let mul=(Math.floor(Math.random()*10000)+1);
        let add=(Math.floor(Math.random()*10000)+1);
        temp=(temp*mul+add);
        temp%=(1e10);
        // console.log(temp,mul);
    }
    return temp%(r-l+1)+l;
}

function initArr()
{
    for(let i=0; i<pos.length; i++)
        pos[i]=0,col[i]=0;
    pos[3]=-100;
    pos[12]=-140;
    pos[13]=-50;
    pos[14]=-60;
    pos[17]=-90;
    pos[18]=-70;
    col[2]='#818181';
    col[6]=1;
    col[8]=1;
    col[11]=1;
    col[14]='#c5c5c5';
    return;
}

function init(id)
{
    if(id>availableNum||id<0)
    {
        console.log("Error : Image not found.");
        return;
    }
    let temp=document.getElementById('top');
    temp.style.backgroundPosition="center "+pos[id]+"pt";
    temp.style.backgroundSize="cover";
    temp.style.backgroundImage="url(\"image/"+id+".png\")";
    temp.style.backgroundRepeat="no-repeat";
    temp.style.color=(col[id]==0? 'white':(col[id]==1? 'black':col[id]));
    return;
}

initArr();
init(0);
init(getRand(1,availableNum));