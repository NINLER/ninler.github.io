var sourceCode=`// ==UserScript==
// @name         Better bing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cn.bing.com/*
// @match        https://cn.bing.com/chrome/newtab
// @match        https://cn.bing.com/search?*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    work();
})();

function work()
{
    let temp;
    temp=document.body;
    temp.style.backgroundImage='url(https://cdn.luogu.com.cn/upload/image_hosting/0yuynf25.png)';
    temp.style.backgroundRepeat='no-repeat';
    temp.style.backgroundSize='cover';
    temp.style.backgroundPosition='center';
    temp.style.height='100%';
    temp.style.backgroundAttachment='fixed';
    temp=document.getElementsByClassName('bottom_row widget msnpeek');
    if(temp.length>0)
    {
        temp=temp[0];
        temp.style.backgroundImage='url(https://cdn.luogu.com.cn/upload/image_hosting/0yuynf25.png)';
        temp.style.backgroundRepeat='no-repeat';
        temp.style.backgroundSize='cover';
        temp.style.width='100%';
        temp.style.backgroundPosition='fixed';
        temp.style.height='100%';
        temp.style.display='none';
    }
    temp=document.getElementById('vs_cont');
    if(temp!=null)
        temp.style.display='none';
    // temp=document.getElementsByClassName('mc_caro')
    if(document.getElementsByClassName('hp_top_cover').length>0)
        document.getElementsByClassName('hp_top_cover')[0].style.backgroundImage='url(https://cdn.luogu.com.cn/upload/image_hosting/0yuynf25.png)';
    if(document.getElementsByClassName('img_cont').length>0)
        document.getElementsByClassName('img_cont')[0].style.backgroundImage='url(https://cdn.luogu.com.cn/upload/image_hosting/0yuynf25.png)';
    temp=document.getElementsByClassName('b_algo');
    for(let i=0; i<temp.length; i++)
    {
        temp[i].style.borderRadius='10pt';
        temp[i].style.marginBottom="10pt";
    }
    temp=document.getElementsByClassName('b_ad');
    for(let i=0; i<temp.length; i++)
    {
        temp[i].style.borderRadius='10pt';
        temp[i].style.backgroundColor="#ffffff";
        temp[i].style.opacity=1;
        temp[i].style.marginBottom="10pt";
    }
    temp=document.getElementsByClassName('b_ans');
    for(let i=0; i<temp.length; i++)
    {
        temp[i].style.borderRadius='10pt';
        temp[i].style.backgroundColor="#ffffff";
        temp[i].style.opacity=1;
        temp[i].style.marginBottom="10pt";
    }
    temp=document.getElementById('b_tween');
    temp.style.color="black";
    temp=document.getElementsByClassName('fs_label');
    for(let i=0; i<temp.length; i++)
        temp[i].style.color="black";
    return;
}`;