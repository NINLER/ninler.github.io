function work()
{
    let temp=document.getElementById("history");
    let kid=temp.children;
    console.log(kid);
    let after=document.createElement("div");
    while(kid.length)
    {
        after.appendChild(kid[kid.length-3]);
        after.appendChild(kid[kid.length-2]);
        after.appendChild(kid[kid.length-1]);
    }
    console.log(after);
    temp.innerHTML=after.innerHTML;
    return;
}
work();