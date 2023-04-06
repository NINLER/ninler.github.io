var dft=new Array(200);
var arr=new Array();
var seed=144853;

function power(a,b,p)
{
    let tar=1;
    for(; b; b>>=1,a=a*a%p)
        if(b&1)
            tar=tar*a%p;
    return tar;
}

function randSeed()
{
    seed=1;
    for(let i=1; i<=100; i++)
    {
        let a=Math.floor(Math.random()*1000);
        let b=Math.floor(Math.random()*1000);
        seed=(seed*a+b)%(1e10);
    }
    return;
}

function getRand(l,r)
{
    let mod=10000000000;
    for(let i=1; i<=20; i++)
    {
        seed=(seed^seed>>5)%mod;
        seed=(seed^seed<<7)%mod;
        seed=(seed^seed>>8)%mod;
        seed=(seed^seed<<10)%mod;
        seed=(seed^0x14BE7A491D4C1)%mod;
    }
    seed=(seed%mod+mod)%mod;
    return seed%(r-l+1)+l;
}

function init()
{
    arr.push(' ');
    for(let i=0; i<26; i++)
        arr.push(String.fromCharCode(i+65));
    for(let i=0; i<26; i++)
        arr.push(String.fromCharCode(i+97));
    for(let i=0; i<10; i++)
        arr.push(String.fromCharCode(i+48));
    arr.push('.',',','&','*','=','\'','\"','@');
    for(let i=0; i<arr.length; i++)
        dft[arr[i].charCodeAt()]=i;
    // console.log(arr,dft);
    return;
}

function encode(data=Array())
{
    let str="",target1;
    for(let i=0; i<data.length; i++)
    {
        str+=data[i].toString();
        if(i<data.length-1)
            str+=',';
    }
    // console.log(str);
    target1=str;
    let k=getRand(1,20);
    // console.log(k);
    for(let i=1; i<=k; i++)
    {
        let res="";
        for(let j=0; j<str.length; j+=4)
            res+=str[j];
        for(let j=1; j<str.length; j+=2)
            res+=str[j];
        for(let j=2; j<str.length; j+=4)
            res+=str[j];
        // console.log(res);
        str=res;
    }
    // console.log(str);
    str+='='+k.toString();
    let key="";
    for(let i=1; i<=10; i++)
        key+=arr[getRand(1,70)];
    let k2=getRand(1,9);
    // console.log(key,k2);
    for(let i=1; i<=k2; i++)
    {
        let pos=0,res="";
        for(let j=0; j<str.length; j++)
        {
            res+=arr[dft[str[j].charCodeAt()]*dft[key[pos].charCodeAt()]%71];
            pos=(pos+1)%10;
        }
        // console.log(res);
        str=res;
    }
    return [str+'#'+key+'#'+k2,target1];
}

function decode(str=String())
{
    let k2pos=str.lastIndexOf('#'),kpos=str.lastIndexOf('#',k2pos-1);
    let k2=str.substring(k2pos+1),key=str.substring(kpos+1,k2pos);
    str=str.substring(0,kpos);
    k2=parseInt(k2);
    // console.log(str,key,k2);
    for(let i=1; i<=k2; i++)
    {
        let pos=0,res="";
        for(let j=0; j<str.length; j++)
        {
            let inv=power(dft[key[pos].charCodeAt()],69,71);
            res+=arr[dft[str[j].charCodeAt()]*inv%71];
            pos=(pos+1)%10;
        }
        // console.log(res);
        str=res;
    }
    // console.log(str);
    let k1pos=str.lastIndexOf('='),k1;
    k1=str.substring(k1pos+1);
    str=str.substring(0,k1pos);
    k1=parseInt(k1);
    let res1=new Array(str.length);
    for(let i=1; i<=k1; i++)
    {
        let res='';
        for(let j=0; j<res.length; j++)
            res1[j]='';
        let mid=Math.floor(str.length/2);
        let down=Math.floor((str.length-mid)/2);
        let up=Math.ceil((str.length-mid)/2);
        for(let j=0; j<up; j++)
            res1[4*j]=str[j];
        for(let j=0; j<mid; j++)
            res1[1+2*j]=str[j+up];
        for(let j=0; j<down; j++)
            res1[2+4*j]=str[j+up+mid];
        for(let j=0; j<str.length; j++)
            res+=res1[j];
        // console.log(res);
        str=res;
    }
    return str.split(',');
}