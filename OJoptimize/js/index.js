var target;
function work()
{
    let body=document.body;
    for(let i=0; i<body.childElementCount; i++)
    {
        let temp=body.children[i];
        // console.log(i+' '+temp.nodeName);
        temp.style.width="80%";
        temp.style.transform="translateX(20pt) translateY(20pt)";
        if(temp.nodeName=="HR")
        {
            temp.style.backgroundColor="white";
            temp.style.transform="translateX(0pt) translateY(20pt)";
            temp.style.textAlign="left";
            temp.style.width="100%";
        }
    }
    if(document.getElementById("BetterSmartLuogu")!=null)
        document.getElementById("BetterSmartLuogu").innerText=BetterSmartLuoguCode;
    if(document.getElementById("BetterSSLOJStylus")!=null)
        document.getElementById("BetterSSLOJStylus").innerText=BetterSSLOJStylusCode;
    if(document.getElementById("BetterSSLOJTempermonkey")!=null)
        document.getElementById("BetterSSLOJTempermonkey").innerText=BetterSSLOJTempermonkeyCode;
    return;
}
document.onclick=function(event)
{
    // console.log(event);
    target=event.srcElement;
    if(target.classList.length==1&&target.classList[0]=="btn-copy")
    {
        let getText=target.nextElementSibling;
        getText=getText.children[0].innerText;
        let input=document.createElement('textarea');
        input.value=getText;
        document.body.appendChild(input);
        input.select();
        if(document.execCommand('copy'))
        {
            target.innerText="Copy Successfully.";
            window.setTimeout('target.innerText="Copy it!"',1000);
        }
        else
        {
            target.innerText="Copy Failed.";
            window.setTimeout('target.innerText="Copy it!"',1000);
        }
        document.body.removeChild(input);
    }
    return;
}
work();
