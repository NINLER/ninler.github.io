var BetterSSLOJTempermonkeyCode=`// ==UserScript==
// @name         Better SSLOJ
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       You
// @match        http://noip.ybtoj.com.cn/*
// @match        http://ssloj.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var id;
    var copied;
    var tempTimeout;
    function work()
    {
        let temp1=document.getElementsByClassName("font-content");
        let example=temp1[3].firstChild;
        let children=example.children;
        let size=example.childElementCount;
        let added="";
        // example.innerHTML="";
        copied=new Array(size/2);
        for(let i=1; i<=size/2; i++)
        {
            added+='<p>'+children[i*2-2].innerHTML+'</p>';
            // Button
            added+='<button id="copy'+i+'" style="border-color:black !important;height:20pt;font-family:consolas;background-color:#000000 !important;color:#38bfff !important;width:auto !important;border-radius:10pt !important;text-ailgn:center;">Copied Times:0</button>'
            added+='<div id="text'+i+'"class="ui existing segment">'+children[i*2-1].innerHTML+'</div>';
            copied[i]=0;
        }
        example.innerHTML=added;
        return;
    }
    work();
    document.onclick=function()
    {
        // console.log("try to copy para."+i);
        let tar=event.target;
        let i=tar.id;
        i=i.substr(4);
        console.log(i);
        id="copy"+i;
        copied[i]+=1;
        const input=document.createElement('textarea');
        let text=document.getElementById('text'+i).firstChild.firstChild.firstChild.innerText;
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
