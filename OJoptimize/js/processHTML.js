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
    path.push('Github');
    for(let i=path.length-1; i>=0; i--)
        document.getElementById('paths').innerHTML+=path[i]+' / ';
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
                </code>
            </div>
        </div>`
        let scr=document.createElement('script'),CODE;
        scr.src='js/Codes/'+source.get(now.name);
        scr.onload=()=>{
            document.getElementById('sourceCode').innerText=sourceCode;
            CODE=document.getElementById('code');
            document.body.removeChild(CODE.nextElementSibling);
        };
        document.getElementById('code').insertAdjacentElement('afterend',scr);
    }
    return;
}