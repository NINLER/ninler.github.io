var BetterSSLOJTempermonkeyCode=`// ==UserScript==
// @name         Better SSLOJ
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @author       You
// @match        http://noip.ybtoj.com.cn/*
// @match        http://ssloj.cn/*
// @grant        none
// ==/UserScript==

var getButton=(id,text="Copied Times:0")=>
{
    let button=document.createElement('button');
    button.id=id;
    button.style.borderColor="black !important";
    button.style.height="20pt";
    button.style.fontFamily='consolas';
    button.style.backgroundColor='#000000';
    button.style.color="#38bfff";
    button.style.width="auto";
    button.style.borderRadius="10pt";
    button.style.textAlign="center";
    button.style.transition="all ease 0.5s";
    button.innerText=text;
    return button;
}

(function() {
    'use strict';
    // Your code here...
    var id;
    var copied;
    var tempTimeout;
    function work()
    {
        let temp=document.getElementsByClassName('ui existing segment');
        copied=new Array(temp.length);
        for(let i=0; i<temp.length; i++)
        {
            let button=getButton('copy'+i);
            temp[i].id="text"+i;
            temp[i].insertAdjacentElement('beforeBegin',button);
            copied[i]=0;
        }
        return;
    }
    work();
    document.onclick=function()
    {
        // console.log("try to copy para."+i);
        let tar=event.target;
        let i=tar.id;
        i=i.substr(4);
        // console.log(i);
        id="copy"+i;
        copied[i]+=1;
        const input=document.createElement('textarea');
        let text=document.getElementById('text'+i).firstChild.firstChild.firstChild.innerText;
        // console.log(text[text.length-1]);
        while(text.substring(text.length-1)=='\n'||text.substring(text.length-1)==' '){text=text.substr(0,text.length-1);}
        input.value=text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        document.getElementById(id).innerText="Copied Times:"+copied[i];
        // console.log("Copy Successfully.");
        return;
    }
})();`;
