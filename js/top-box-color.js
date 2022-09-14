let lv=127,rv=200;
let r=lv,g=rv,b=lv;
let rs=1,gs=1,bs=1;
function change(time)
{
    r+=(Math.random()*rs*0.1*time);
    if(r>rv||r<lv)
    {
        r=Math.min(r,rv);
        r=Math.max(r,lv);
        rs=-rs;
    }
    g+=(Math.random()*gs*0.1*time);
    if(g>rv||g<lv)
    {
        g=Math.min(g,rv);
        g=Math.max(g,lv);
        gs=-gs;
    }
    b+=(Math.random()*bs*0.1*time);
    if(b>rv||b<lv)
    {
        b=Math.min(b,rv);
        b=Math.max(b,lv);
        bs=-bs;
    }
    let temp=document.getElementById("top");
    // console.log(temp.style.background);
    // console.log(r+' '+g+" "+b);
    // console.log(temp);
    temp.style.backgroundColor="rgb("+r+","+g+","+b+")";
    return;
}
window.setInterval("change(10)",10);