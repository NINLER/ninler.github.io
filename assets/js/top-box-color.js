let href=new Array(110);
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
    href[0]='https://cdnjson.com/images/2023/03/21/0.png';
    href[1]='https://cdnjson.com/images/2023/03/21/1.webp';
    href[2]='https://cdnjson.com/images/2023/03/21/2.webp';
    href[3]='https://cdnjson.com/images/2023/03/21/3.webp';
    href[4]='https://cdnjson.com/images/2023/03/21/4.png';
    href[5]='https://cdnjson.com/images/2023/03/21/5.webp';
    href[6]='https://cdnjson.com/images/2023/03/21/6.png';
    href[7]='https://cdnjson.com/images/2023/03/21/7.jpg';
    href[8]='https://cdnjson.com/images/2023/03/21/8.jpg';
    href[9]='https://cdnjson.com/images/2023/03/21/9.webp';
    href[10]='https://cdnjson.com/images/2023/03/21/10.png';
    href[11]='https://cdnjson.com/images/2023/03/21/11.webp';
    href[12]='https://cdnjson.com/images/2023/03/21/12.jpg';
    href[13]='https://cdnjson.com/images/2023/03/21/13.png';
    href[14]='https://cdnjson.com/images/2023/03/21/14.jpg';
    href[15]='https://cdnjson.com/images/2023/03/21/15.jpg';
    href[16]='https://cdnjson.com/images/2023/03/21/16.png';
    href[17]='https://cdnjson.com/images/2023/03/21/17.jpg';
    href[18]='https://cdnjson.com/images/2023/03/21/18.jpg';
    href[19]='https://cdnjson.com/images/2023/03/21/19.png';
    href[20]='https://cdnjson.com/images/2023/03/21/20.png';
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
    temp.style.backgroundImage="url(\""+href[id]+"\")";
    temp.style.backgroundRepeat="no-repeat";
    temp.style.color=(col[id]==0? 'white':(col[id]==1? 'black':col[id]));
    return;
}

initArr();
init(0);
init(getRand(1,availableNum));
