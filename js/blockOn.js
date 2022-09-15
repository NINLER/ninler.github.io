document.onmouseover=function(event)
{
    // console.log(event.target.getAttribute("name"));
    if(event.target.getAttribute("name")==null)
        return;
    if(event.target.getAttribute("name").length<=4)
        return;
    let id=event.target.getAttribute("name");
    // console.log(id);
    let pos=id[id.length-1];
    let temp=document.getElementById("into"+pos);
    // console.log(temp.className);
    temp.className="btn btn-success";
    return;
}
document.onmouseout=function(event)
{
    // console.log(event.target.name);
    if(event.target.getAttribute("name")==null)
    return;
    if(event.target.getAttribute("name").length<=4)
        return;
    let id=event.target.getAttribute("name");
    // console.log(id);
    let pos=id[id.length-1];
    let temp=document.getElementById("into"+pos);
    // console.log(temp.className);
    temp.className="btn btn-warning";
    return;
}
for(let i=1; i<=3; i++)
{
    temp=document.getElementById("into"+i)
    // temp.style.opacity=1;
    temp.className="btn btn-warning";
}