function clearWebsite()
{
    document.getElementById('paths').innerText='';
    document.getElementById('title').innerText='';
    document.getElementById('introduction').innerText='';
    document.getElementById('files').innerHTML='';
    document.getElementById('code').innerHTML='';
    document.getElementById('backbutton').className='';
    // console.log('clearOver');
    return;
}

async function processHTML(now=new Node())
{
    clearWebsite();
    if(now.fat!=-1)
        document.getElementById('backbutton').className="btn btn-primary";
    if(now.fat==-1)
        document.getElementById('backbutton').className="btn btn-danger";
    let path=Array(),pathnode=now.fat;
    while(pathnode!=-1)
    {
        // console.log(pathnode);
        path.push(pathnode.name);
        pathnode=pathnode.fat;
    }
    document.getElementById('paths').innerHTML="Github / ";
    for(let i=path.length-1; i>=0; i--)
        document.getElementById('paths').innerHTML+=
        `<a class="addressLink" onclick=processHTML(graph[${title.get(path[i])}])>${path[i]}</a> / `;
    // console.log(now.type);
    document.getElementById('title').innerText=now.name;
    document.getElementById('introduction').innerText=now.introduction;
    if(now.type==0)
    {
        // console.log(now.child);
        for(let i in now.child)
        {
            let temp=now.child[i];
            let insert=document.createElement('a');
            if(temp.type==0)
            {
                insert.classList=['folder'];
                insert.innerText='(Folder) '+temp.name;
            }
            if(temp.type==1)
            {
                insert.classList=['file'];
                insert.innerText='(File) '+temp.name;
            }
            insert.style.display='block';
            insert.setAttribute('nodeId',temp.id);
            insert.onclick=function(){
                let selfId=parseInt(insert.getAttribute('nodeId'));
                // console.log("processHTML(graph["+selfId+"])")
                nownode=graph[selfId];
                processHTML(graph[selfId]);
            };
            // console.log(insert.onclick);
            document.getElementById('files').appendChild(insert);
        }
    }
    else if(now.type==1)
    {
        document.getElementById('code').innerHTML=`
        <div class="editor">
            <button id='copyButton' type="button" class="btn-copy" onclick=>Copy it!</button>
            <div class="code">
                <code id='sourceCode'>
                    Loading...
                </code>
            </div>
        </div>`
        const askForResources=(url,callback=()=>{console.log("Get resource succesfully.")},turn=1)=>{
            if(turn>10) return document.getElementById('sourceCode').innerHTML=
            "Load Failed. Please refresh the page or ask the creator for help.";
            document.getElementById('sourceCode').innerHTML=`Loading for the ${turn}-th time ...`;
            let xhr=new XMLHttpRequest(); xhr.open("GET",url); xhr.timeout=2000;
            xhr.ontimeout=()=>{ askForResources(url,callback,turn+1) };
            xhr.onerror=()=>{ askForResources(url,callback,turn+1) };
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4&&(xhr.status>=200&&xhr.status<300||xhr.status==304))
                    document.getElementById('sourceCode').innerText=xhr.responseText.replaceAll(' ','\u00A0'),
                    callback();
                return;
            };
            xhr.send();
        };
        askForResources("./assets/resources/"+source.get(now.name));
        // let scr=document.createElement('script');
        // scr.src='js/Codes/'+source.get(now.name);
        // scr.onload=()=>{
        //     document.getElementById('sourceCode').innerText=sourceCode.replaceAll(' ','\u00A0');
        //     CODE=document.getElementById('code');
        //     document.body.removeChild(CODE.nextElementSibling);
        // };
        // document.getElementById('code').insertAdjacentElement('afterend',scr);
    }
    return;
}