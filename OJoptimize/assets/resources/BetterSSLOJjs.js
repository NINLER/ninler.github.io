// ==UserScript==
// @name         Better SSLOJ
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       NINLER
// @match        http://ssloj.cn/*
// @grant        none
// ==/UserScript==

/*

----------------------------- README -----------------------------

    This is a README of this extension script for SSLOJ.
    To use this script, you have to pay attention to these tips:
    1.  If this script can't transfer the data to CPH after clicking,
        follow these steps: ( Chrome engine )
            (1) Open "chrome://flags" in your browser to open experiment page.
            (2) Search "Insecure origins treated as secure" in the search bar.
            (3) Turn that option to "Enable" and type "http://ssloj.cn" to the textarea.
            (4) Relaunch the browser and check the script is available or not.
            (5) If these can't solve the problem, find me offline.
    2. Errors in the console is not a big deal. Just ignore them.

*/

var testcase,size,transfer;

function uuidv4()
{
    const s4=()=>{return (((1+Math.random())*0x10000)|0).toString(16).substring(1);};
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function copyContent(content)
{
    let input=document.createElement('textarea'); input.value=content;
    document.body.appendChild(input);
    input.select(); document.execCommand('copy');
    document.body.removeChild(input);
    return;
}

function sendProblemInfo()
{
    let info={};
    info.name=document.getElementsByTagName("h1").item(0).innerHTML;
    while("\n\t\r ".indexOf(info.name.at(0))!=-1) info.name=info.name.slice(1);
    while("\n\t\r ".indexOf(info.name.at(-1))!=-1) info.name=info.name.slice(0,info.name.length-1);
    info.group="SSLOJ";
    info.url=window.location.href;
    info.interactive=false;
    info.memoryLimit=parseInt(document.body.innerHTML.match(/内存限制：([0-9]*) MiB/gm).at(0).match(/内存限制：([0-9]*) MiB/).at(1));
    info.timeLimit=parseInt(document.body.innerHTML.match(/时间限制：([0-9]*) ms/gm).at(0).match(/时间限制：([0-9]*) ms/).at(1))*2;
    info.testType="single";
    info.input={"type":"stdin"};
    info.output={"type":"stdout"};
    info.language={"java":{"mainClass":"Main","taskClass":`Problem${info.name}`}};
    info.batch={"id":uuidv4(),"size":1};
    info.tests=new Array();
    for(let i=0; i<size; i+=2)
    {
        let input=document.getElementById('test'+i);
        let output=document.getElementById('test'+(i+1));
        input=input.firstChild.firstChild.firstChild.innerText;
        output=output.firstChild.firstChild.firstChild.innerText;
        while("\n\t\r ".indexOf(input.at(-1))!=-1) input=input.slice(0,input.length-1);
        while("\n\t\r ".indexOf(output.at(-1))!=-1) output=output.slice(0,output.length-1);
        info.tests.push({input:input,output:output});
    }
    console.log("SEND INFO",info);
    let temp=new XMLHttpRequest();
    temp.open("POST","http://localhost:27121");
    temp.onreadystatechange=()=>{console.log(temp);};
    temp.send(JSON.stringify(info));
    return;
}

function processTransfer(fail=false)
{
    const hint=["Transfer to CPH","CPH unavailable"][new Number(fail)];
    const html=`<div class="${["transferToCPH","CPHunavailable"][new Number(fail)]}" id="transferCPH"><p id="transferInfo">${hint}</p></div>`;
    document.body.innerHTML=document.body.innerHTML.replace("样例","样例"+html);
    transfer=document.getElementById('transferCPH');
    return;
}

function checkCphOpen()
{
    let check=new XMLHttpRequest();
    check.open("POST","http://localhost:27121");
    check.timeout=100;
    check.addEventListener("error",(event)=>{console.log("CHECK : ERROR"); processTransfer(); });
    check.addEventListener("success",(event)=>{console.log("CHECK : SUCCESS"); processTransfer(); });
    check.addEventListener("timeout",(event)=>{console.log("CHECK : TIMEOUT"); processTransfer(true); });
    check.send();
    return;
}

function addExtraContent()
{
    document.body.innerHTML=document.body.innerHTML.replace(
        `<h4 class="ui top attached block header">样例</h4>`,
        `<h4 class="ui top attached block header" id="Example">样例</h4>`
    );
    if(!document.getElementById('Example')) return (console.log("Not in the problem page."),false);
    testcase=document.getElementById('Example').nextElementSibling;
    let res=testcase.innerHTML.match(/<div class="ui existing segment"><pre style="margin-top: 0; margin-bottom: 0; "><code><span class="hl-text hl-plain">(?:[^<]*)<\/span><\/code><\/pre>/gm);
    res.map((it,idx)=>{testcase.innerHTML=testcase.innerHTML.replace(it,it.replace('segment"',`segment copyTextDown" id="test${idx}"`))});
    size=res.length;
    for(let i=0; i<size; i++)
    {
        let temp=document.getElementById('test'+i);
        let add=document.createElement('div');
        add.className="copyTextUp"; add.innerHTML=`<p style="display:inline-block"><strong>Source Code</strong></p><div class="copyInfo"></div>`;
        temp.insertAdjacentElement('beforebegin',add);
    }
    document.addEventListener('click',(event)=>{
        let item=event.target; console.log(item);
        if(item.className=="copyInfo")
        {
            let copyText=item.parentNode.nextElementSibling;
            copyText=copyText.firstChild.firstChild.firstChild.innerText;
            while("\n\t\r ".indexOf(copyText.at(-1))!=-1) copyText=copyText.slice(0,copyText.length-1);
            copyContent(copyText);
        }
        else if(["transfer","transferInfo"].indexOf(item.id)!=-1&&item.innerText=="Transfer to CPH") sendProblemInfo();
        return true;
    });
    return true;
}

(function() {
    'use strict';
    if(addExtraContent()) checkCphOpen();
    if(!document.getElementById('stylus-1')) addStyleIndex();
})();

function addStyleIndex()
{
    document.body.parentElement.innerHTML+=`
        <style id="userscriptCSS">
            .copyTextUp {
                border-top-left-radius: 3pt;
                border-top-right-radius: 3pt;
                background-color: #c5c5c58c;
                height: 25pt;
                width: 100%;
                font-size: 1rem;
            }
            
            .copyTextUp > p {
                padding-top: calc( 10pt - 0.5rem );
                padding-left: 10pt;
            }
            
            .copyTextDown {
                margin-top: 0 !important;
                border-top-left-radius: 0 !important;
                border-top-right-radius: 0 !important;
            }
            
            .copyInfo {
                background-image: url("data:image/svg+xml;utf8,<svg class='icon' style='width: 1em;height: 1em;vertical-align: middle;fill: rgb(108, 117, 125);overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2669'><path d='M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z' p-id='2670'></path></svg>");
                display:inline-block;
                transition:all ease 0.25s;
                width: 1.3rem !important;
                height: 1.3rem !important;
                background-repeat:no-repeat;
                transform: translateX(3pt) translateY(calc( 10pt - 0.7rem ));
            }
            
            .copyInfo:hover {
                transition:all ease 0.25s;
                background-image: url("data:image/svg+xml;utf8,<svg class='icon' style='width: 1em;height: 1em;vertical-align: middle;fill: white;overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2669'><path d='M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z' p-id='2670'></path></svg>");
            }
            
            .copyInfo:active {
                transition:all ease 0.1s;
                background-image: url("data:image/svg+xml;utf8,<svg class='icon' style='width: 1em;height: 1em;vertical-align: middle;fill: rgb(75,255,50);overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2669'><path d='M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z' p-id='2670'></path></svg>");
            }
            
            .CPHunavailable {
                display: inline-block;
                background: #87000094;
                margin-left: calc( 100% - 2rem - 23px - 85pt );
                /* display: none; */
                font-size: 15px;
                position: relative;
                border-radius: 5px;
                transition: all ease 0.25s;
            }
            
            .CPHunavailable:hover {
                background: #b80000;
                transition: all ease 0.25s;
            }
            
            .transferToCPH {
                display: inline-block;
                background: #b6b6b6;
                margin-left: calc( 100% - 2rem - 23px - 85pt );
                /* display: none; */
                font-size: 15px;
                position: relative;
                border-radius: 5px;
                transition: all ease 0.25s;
            }
            
            .transferToCPH:hover {
                background: #00b390;
                transition: all ease 0.25s;
            }
            
            .transferToCPH:active {
                background: #1ba61f;
                transition: all ease 0.1s;
            }
            
            .transferToCPH > p, .CPHunavailable > p {
                margin: 1pt 7pt 1pt 7pt;
            }
        </style>
    `;
    return;
}
