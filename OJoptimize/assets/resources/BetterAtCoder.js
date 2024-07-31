// ==UserScript==
// @name         Better atcoder
// @version      1.0
// @description  Connect to CPH
// @author       NINLER
// @match        https://atcoder.jp/contests/*
// @grant        none
// ==/UserScript==

var transfer;

function uuidv4()
{
    const s4=()=>{return (((1+Math.random())*0x10000)|0).toString(16).substring(1);};
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function sendProblemInfo()
{
    let info={};
    info.name=document.querySelector('#main-container > div.row > div:nth-child(2) > span.h2').firstChild.data.replaceAll(' ','');
    while("\n\t\r ".indexOf(info.name.at(0))!=-1) info.name=info.name.slice(1);
    while("\n\t\r ".indexOf(info.name.at(-1))!=-1) info.name=info.name.slice(0,info.name.length-1);
    info.group="AtCoder";
    info.url=window.location.href;
    info.interactive=false;
    info.timeLimit=parseInt(document.body.innerHTML.match(/Time Limit: ([0-9]*) sec/).at(1))*2;
    info.memoryLimit=parseInt(document.body.innerHTML.match(/Memory Limit: ([0-9]*) MB/).at(1));
    info.testType="single";
    info.input={"type":"stdin"};
    info.output={"type":"stdout"};
    info.language={"java":{"mainClass":"Main","taskClass":info.name}};
    info.batch={"id":uuidv4(),"size":1};
    info.tests=new Array();
    let size=0; while(document.getElementById(`pre-sample${size}`)) size++;
    for(let i=0; i<size/2; i+=2)
    {
        let input=document.getElementById('pre-sample'+i);
        let output=document.getElementById('pre-sample'+(i+1));
        input=input.innerText; output=output.innerText;
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

function addCPHButton(available)
{
    let title=document.querySelector('#main-container > div.row > div:nth-child(2) > span.h2');
    title.innerHTML+=`
        <div class="btn btn-default btn-sm ${(available? "":"CPHunavailable")}" id="transferToCPH">
            ${["CPH unavailable","Transfer to CPH"][new Number(available)]}
        </div>`;
    document.addEventListener('click',(event)=>{
        let tar=event.target; console.log(tar);
        if(tar.id=="transferToCPH"&&tar.innerHTML.indexOf("Transfer to CPH")!=-1) sendProblemInfo();
    });
    return;
}

function checkCPHavailable()
{
    document.body.innerHTML+="<style>.CPHunavailable{background:#ff00002e !important;color:red !important}</style>";
    let temp=new XMLHttpRequest();
    temp.open("POST","http://localhost:27121");
    temp.timeout=100;
    temp.ontimeout=()=>{console.log("TIMEOUT");addCPHButton(false)};
    temp.onerror=()=>{console.log("ERROR");addCPHButton(true)};
    temp.send();
    return;
}

(function() {
    'use strict';
    checkCPHavailable();
})();