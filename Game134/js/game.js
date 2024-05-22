var blocknum=5;
var running=false;
var blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var choose=0;
var computer=false;

function run()
{
    let temp=document.getElementById("block");
    temp.innerHTML="";
    let color="white";
    for(let i=1; i<=blocknum; i++)
    {
        if(running)
        {
            if(blocks[i]==0)
                color="grey";
            if(blocks[i]==1)
                color="#17a2b8";
            if(blocks[i]==2)
                color="#6610f2";
        }
        else
            color="white";
        i=i-1;
        temp.innerHTML+="<svg id=\"block"+i+"\" style=\"transform:translateX("+(12+10*(i%15))+"px) translateY("+(10*Math.floor((i)/15))+"px);z-index="+(1000+i)+"\" xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" fill=\""+color+"\" class=\"bi bi-square-fill\" viewBox=\"0 0 16 16\"><path d=\"M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z\"/></svg>";
        i=i+1;
        if(i%15==0)
            temp.innerHTML+="<br>";
    }
    temp=document.getElementById("blocknum");
    temp.innerHTML="Number of Blocks : "+(blocknum-choose);
    return;
}

run();

function Error(message)
{
    let temp=document.getElementById("ErrorMessage");
    temp.style.opacity=1;
    temp.innerHTML=message;
    window.setTimeout("temp=document.getElementById(\"ErrorMessage\");;temp.style.opacity=1;",1000);
    return;
}

function decrease()
{
    if(running)
        return;
    // console.log(blocknum);
    if(blocknum==1)
        Error("Error : The number of blocks should be a positive number.");
    blocknum=Math.max(blocknum-1,1);
    run();
    return;
}

function increase()
{
    if(running)
        return;
    // console.log(blocknum);
    if(blocknum==90)
        Error("Error : The number of blocks should be not higher than 90.");
    blocknum=Math.min(blocknum+1,90);
    run();
    return;
}

function change(num)
{
    if(running)
        return;
    // console.log(num);
    if(Math.floor(num)!=num)
        Error("Error : The number of blocks should be an integer.")
    else if(num<1)
        Error("Error : The number of blocks should be a positive number.");
    else if(num>90)
        Error("Error : The number of blocks should be not higher than 90.");
    else
        blocknum=Math.floor(num);
    run();
    return;
}

function gameloop()
{
    if(!running)
        return;
    Error("Your turn.")
    let temp;
    temp=document.getElementById("take1");
    // console.log(temp);
    if(blocknum-choose>=1)
        temp.className="alert alert-light";
    else
        temp.className="alert alert-danger";
    temp.style.opacity=1;
    temp=document.getElementById("take3");
    if(blocknum-choose>=3)
        temp.className="alert alert-light";
    else
        temp.className="alert alert-danger";
    temp.style.opacity=1;
    temp=document.getElementById("take4");
    if(blocknum-choose>=4)
        temp.className="alert alert-light";
    else
        temp.className="alert alert-danger";
    temp.style.opacity=1;
    return;
}

function take(num)
{
    if(!running)
        return;
    if(computer)
        return;
    if(blocknum-choose<num)
        return;
    for(let i=choose+1; i<=choose+num; i++)
        blocks[i]=1;
    choose+=num;
    run();
    computer=true;
    let temp2;
    temp2=document.getElementById("take1");
    temp2.style.opacity=0;
    temp2=document.getElementById("take3");
    temp2.style.opacity=0;
    temp2=document.getElementById("take4");
    temp2.style.opacity=0;
    if(blocknum==choose)
    {
        Error("<b style=\"color:lightgreen;\">You win.</b>");
        let message="Win! ";
        for(let i=1; i<=blocknum; i++)
            message=(message+blocks[i]);
        write(message);
        running=false;
        choose=0;
        let temp=document.getElementById("increase");
        temp.className="btn btn-success";
        temp=document.getElementById("decrease");
        temp.className="btn btn-warning";
        temp=document.getElementById("inputNum");
        temp.style.display="inline-block";
        temp=document.getElementById("Start");
        temp.className="alert alert-info";
        // temp.style.display="block";
        return;
    }
    Error("Computer's turn.");
    if((blocknum-choose)%7==0||(blocknum-choose)%7==2)
    {
        let temp3=(Math.floor(Math.random()*3))+1;
        // console.log(temp3);
        if(temp3>1)
            temp3++;
        while(blocknum-choose<temp3)
        {
            temp3=Math.floor(Math.random()*1000)%3+1;
            if(temp3>1)
                temp3++;
        }
        for(let i=choose+1; i<=choose+temp3; i++)
            blocks[i]=2;
        choose+=temp3;
        // console.log(temp3);
    }
    else
    {
        let temp3=0;
        let choise=[1,3,4];
        for(let i=0; i<=2; i++)
        {
            if((blocknum-choose-choise[i])%7==0||(blocknum-choose-choise[i])%7==2)
            {
                temp3=choise[i];
                break;
            }
        }
        for(let i=choose+1; i<=choose+temp3; i++)
            blocks[i]=2;
        choose+=temp3;
    }
    if(blocknum==choose)
    {
        run();
        Error("<b style=\"color:red;\">You lose.</b>");
        let message="Lose ";
        for(let i=1; i<=blocknum; i++)
            message=(message+blocks[i]);
        write(message);
        running=false;
        computer=false;
        choose=0;
        let temp=document.getElementById("increase");
        temp.className="btn btn-success";
        temp=document.getElementById("decrease");
        temp.className="btn btn-warning";
        temp=document.getElementById("inputNum");
        temp.style.display="inline-block";
        temp=document.getElementById("Start");
        temp.className="alert alert-info";
        // temp.style.display="inline-block";
    }
    else
        window.setTimeout("run();gameloop();computer=false;",1500);
    return;
}

function start()
{
    if(running)
        return;
    computer=false;
    let temp=document.getElementById("increase");
    temp.className="btn btn-dark";
    temp=document.getElementById("decrease");
    temp.className="btn btn-dark";
    temp=document.getElementById("inputNum");
    temp.style.display="none";
    temp=document.getElementById("Start");
    temp.className="alert alert-dark";
    // temp.style.display="block";
    running=true;
    for(let i=0; i<=blocknum; i++)
        blocks[i]=0;
    choose=0;
    run();
    gameloop();
    return;
}

let temp2;
temp2=document.getElementById("take1");
temp2.style.opacity=0;
temp2=document.getElementById("take3");
temp2.style.opacity=0;
temp2=document.getElementById("take4");
temp2.style.opacity=0;