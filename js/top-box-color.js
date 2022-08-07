let lv=127,rv=205;
let r=lv,g=rv,b=lv;
let rs=1,gs=1,bs=1;
function change()
{
    r+=(Math.random()*rs*20);
    if(r>rv||r<lv)
    {
        r=Math.min(r,rv);
        r=Math.max(r,lv);
        rs=-rs;
    }
    g+=(Math.random()*gs*20);
    if(g>rv||g<lv)
    {
        g=Math.min(g,rv);
        g=Math.max(g,lv);
        gs=-gs;
    }
    b+=(Math.random()*bs*20);
    if(b>rv||b<lv)
    {
        b=Math.min(b,rv);
        b=Math.max(b,lv);
        bs=-bs;
    }
    let temp=document.getElementById("head-box");
    temp.style="background:rgb("+r+","+g+","+b+")";
    console.log(temp.style.background);
    console.log(r+' '+g+" "+b);
    return;
}
window.setInterval(change,200);
