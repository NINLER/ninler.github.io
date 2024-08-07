var graph=new Array(),title=new Map();
var source=new Map();
var nownode;

class Node{
    name="";introduction="";id=-1;fat=-1;child=Array();type=-1;
    constructor(id,type,name,introduction){
        this.type=type;this.id=id;this.name=name,this.introduction=introduction;
        title.set(name,id);
    }
    static addChild(fat,child){
        fat=graph[(title.has(fat)? title.get(fat):fat)];
        child=graph[(title.has(child)? title.get(child):child)];
        if(!fat||!child) return console.log("ERROR on connecting",fat,"and",child);
        child.fat=fat;fat.child.push(child);
    }
}

function initialize()
{
    // Nodes
    graph.push(new Node(0,0,'root','Root of the files.'));
    graph.push(new Node(1,0,'Stylus','Stylus files.'));
    graph.push(new Node(2,0,'Tempermonkey','Tempermonkey files.'));
    graph.push(new Node(3,1,'Better Smart Luogu','Better Smart Luogu (Stylus Code) .'));
    graph.push(new Node(4,0,'Better SSLOJ','Better SSLOJ.')); //  --- deprecated ---
    graph.push(new Node(5,1,'Better Bing','Better Bing.'));
    graph.push(new Node(6,1,'Better SSLOJ (Tempermonkey)','Better SSLOJ (Tempermonkey Code) .'));
    graph.push(new Node(7,1,'Better SSLOJ (Stylus)','Better SSLOJ (Stylus Code) .'));
    graph.push(new Node(8,1,'Better AtCoder','Transfer AtCoder problem data to CPH.'));
    // Edge
    Node.addChild('root','Stylus');
    Node.addChild('root','Tempermonkey');
    Node.addChild('Stylus','Better Smart Luogu');
    Node.addChild('Stylus','Better SSLOJ (Stylus)');
    Node.addChild('Tempermonkey','Better Bing');
    Node.addChild('Tempermonkey','Better SSLOJ (Tempermonkey)');
    Node.addChild('Tempermonkey','Better AtCoder');
    // Sources
    source.set('Better Smart Luogu','BetterSmartLuogu.css');
    source.set('Better Bing','BetterBing.js');
    source.set('Better SSLOJ (Tempermonkey)','BetterSSLOJjs.js');
    source.set('Better SSLOJ (Stylus)','BetterSSLOJStylus.css');
    source.set('Better AtCoder','BetterAtCoder.js');
    return;
}

function work()
{
    nownode=graph[0];
    let body=document.body;
    for(let i=0; i<body.childElementCount; i++)
    {
        let temp=body.children[i];
        // console.log(i+' '+temp.nodeName);
        if(temp.nodeName=='SCRIPT')
            continue;
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
    processHTML(nownode);
    return;
}

initialize();
work();

let stTime,nowTime;

document.onclick=function(event)
{
    // console.log(event);
    let target=event.srcElement;
    if(target.id=='copyButton')
    {
        stTime=new Date();
        let getText=document.getElementById('sourceCode').innerText;
        let input=document.createElement('textarea');
        input.value=getText.replaceAll('\u00A0',' ');
        document.body.appendChild(input);
        input.select();
        if(document.execCommand('copy'))
            target.innerText="Copy Successfully.";
        else
            target.innerText="Copy Failed.";
        window.setTimeout(()=>{
            nowTime=new Date();
            if(nowTime.getTime()-stTime.getTime()>=990)
                document.getElementById('copyButton').innerText="Copy it!";
        },1000);
        document.body.removeChild(input);
        return;
    }
    // console.log(target);
    if(target.id=='backbutton')
    {
        console.log(nownode);
        if(nownode.fat==-1)
            return;
        nownode=nownode.fat;
        processHTML(nownode);
        return;
    }
    return;
}
