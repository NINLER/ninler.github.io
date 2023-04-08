var seed=Math.floor(Math.random()*1000);
// var seed=114514;
var digoper=12;
var oper=[' ','+','-','*','/'];
var generateResult;

function rand(l,r)
{
    seed=114514*seed+1919810;
    seed%=998244353;
    seed=Math.abs(seed);
    seed&=((1<<30)-1);
    return seed%(r-l+1)+l;
}

function randRatio(arr,val=[])
{
    let sum=0;
    for(let i=0; i<arr.length; i++)
        sum+=arr[i];
    if(val.length==0)
    {
        val=new Array(arr.length);
        for(let i=0; i<arr.length; i++)
            val[i]=i+1;
    }
    let result=rand(0,sum*100-1);
    // console.log(result);
    for(let i=0; i<arr.length; i++)
    {
        if(result<arr[i]*100)
            return val[i];
        result-=arr[i]*100;
    }
    return -1;
}

function getdig(x)
{
    if(x==0)
        return 1;
    let tar=0;
    while(x)
        x=Math.floor(x/10),tar++;
    return tar;
}

let rare=[[],[100],[95,5],[80,15,5]];

function generate()
{
    let digans=randRatio(rare[2+(digoper>30)]);
    let left=digoper-1-digans;
    // console.log(digans,left);
    let n=rand(1,Math.floor((left-1)/2.00));
    let m=n+1;
    let op=new Array(n+10);
    for(let i=1; i<=n; i++)
        op[i]=rand(1,4);
    let numdig=new Array(m+10);
    left-=n;
    for(let i=1; i<m; i++)
    {
        let maxlen=Math.min(left-m+i,2+(digoper>30));
        let temp=randRatio(rare[maxlen]);
        numdig[i]=temp,left-=temp;
    }
    numdig[m]=left;
    let num=new Array(m+10);
    for(let i=1; i<=m; i++)
        num[i]=rand(Math.pow(10,numdig[i]-1),Math.pow(10,numdig[i])-1);
    let equ="";
    for(let i=1; i<=n; i++)
    {
        equ+=num[i].toString();
        equ+=oper[op[i]];
    }
    equ+=num[m].toString();
    // console.log(digans,left,n,m,op,numdig,num,equ);
    if(numdig[m]>3)
        return ['Invaild',0];
    return [equ,digans];
}

function check(res)
{
    let fail=[false,Infinity];
    if(res[0]=='Invaild')
        return fail;
    let opres=eval(res[0]);
    if(opres<0||opres==Infinity||Math.floor(opres)!=opres)
        return fail;
    if(getdig(opres)!=res[1])
        return fail;
    return [true,opres];
}

function getequaltion(test=false)
{
    let str,targetop,opans;
    let times=0;
    while(true)
    {
        times++;
        str=generate();
        opans=check(str);
        if(test)
            console.log(times,str[0]);
        if(opans[0])
        {
            targetop=str[0]+'='+opans[1];
            break;
        }
    }
    generateResult=[targetop,times]
    return;
}

function guess(g)
{
    let res=new Array(digoper);
    let used=new Array(digoper);
    if(g.length!=digoper)
        return [-1];
    res[0]=0;
    for(let i=1; i<=digoper; i++)
        res[i]=0,used[i]=0;
    for(let i=1; i<=digoper; i++)
        if(g[i-1]==generateResult[0][i-1])
            res[i]=2,used[i]=1;
    for(let i=1; i<=digoper; i++)
    {
        if(res[i]==2)
            continue;
        let flag=false;
        for(let j=1; j<=digoper&&flag==false; j++)
            if(used[j]==0&&g[i-1]==generateResult[0][j-1])
                used[j]=1,res[i]=1,flag=true;
    }
    return res;
}

function testingAverage(times)
{
    let sum=0;
    for(let i=1; i<=times; i++)
    {
        getequaltion();
        sum+=generateResult[1];
        console.log(i,generateResult[0],sum,sum/i);
    }
    console.log('total',sum,'aver',sum/times);
    return;
}

getequaltion();
// console.log(generateResult);
// testingAverage(2000);
// console.log("3-1+7*4+4=22");
// console.log(guess("3-1+7*4+4=22"));