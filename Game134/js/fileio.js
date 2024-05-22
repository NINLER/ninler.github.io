function getFso()
{
    let xmlHttp;
    if(window.ActiveXObject)
        xmlHttp=new ActiveXObject("Scripting.FileSystemObject");
    else if(window.XMLHttpRequest)
        xmlHttp=new XMLHttpRequest();
    return xmlHttp;
}

function getNum(s)
{
    let tar=0;
    for(let i=0; i<s.length; i++)
    {
        console.log(s[i]);
        tar=tar*10+(s[i]);
    }
    return tar;
}

function write(message)
{
    if(!window.localStorage)
    {
        // Error("Error : Your browser doesn't support localStorage.");
        return;
    }
    if(window.localStorage.getItem("GameTimes")==null)
        window.localStorage["GameTimes"]="0";
    if(window.localStorage.getItem("GameTimes")=="[object Undefined]")
        window.localStorage["GameTimes"]="0";
    // console.log(getNum(window.localStorage["GameTimes"]));
    // console.log(window.localStorage["GameTimes"].length);
    // console.log(window.localStorage.getItem("GameTimes"));
    // console.log(window.localStorage.getItem("GameTimes")=="[object Undefined]");
    window.localStorage["GameTimes"]=toString(getNum(window.localStorage["GameTimes"])+1);
    for(let i=1; i<=50; i++)
        if(window.localStorage.getItem(toString(i))==null||window.localStorage.getItem(toString(i))=="[object Undefined]")
            window.localStorage[toString(i)]="No";
    for(let i=49; i>=1; i--)
    {
        let temp1=toString(i+1);
        let temp2=toString(i);
        window.localStorage[temp1]=window.localStorage[temp2];
    }
    window.localStorage["1"]=message;
    return;
}

function read(id)
{
    if(!window.localStorage)
    {
        Error("Error : Your browser doesn't support this.");
        return "Error";
    }
    if(id>50)
    {
        Error("Error : We can't read the history before 50 games.");
        return "Error";
    }
    if(Math.floor(id)!=id)
    {
        Error("Error : The number should be an integer.")
        return "Error";
    }
    if(id<1)
    {
        Error("Error : The number should be a positive number.");
        return "Error";
    }
    let result=window.localStorage[toString(id)];
    if(result.length<3)
    {
        Error("Error : The history doesn't exist.");
        return "Error";
    }
    return result;
}