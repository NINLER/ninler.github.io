function update()
{
    let temp=document.getElementById('bestRecordLeft');
    // console.log(temp);
    // console.log(temp.firstElementChild);
    // console.log(temp.firstElementChild.firstElementChild);
    // console.log(temp.firstElementChild.firstElementChild.firstElementChild);
    temp=temp.firstElementChild.firstElementChild.firstElementChild;
    // temp=temp.firstChild.firstChild.firstChild;
    if(localStorage.getItem('best-maze-time')==undefined)
        temp.innerText='No Record.';
    else
    {
        let process=Math.round(toDouble(localStorage.getItem('best-maze-time'))*1000)/1000;
        temp.innerText='Record:'+process+'s.';
    }
    temp=document.getElementById('winTimes');
    temp=temp.firstElementChild.firstElementChild.firstElementChild;
    if(localStorage.getItem('maze-win-times')==undefined)
        localStorage.setItem('maze-win-times','0');
    temp.innerText='Win:'+localStorage.getItem('maze-win-times');
    temp=document.getElementById('loseTimes');
    temp=temp.firstElementChild.firstElementChild.firstElementChild;
    if(localStorage.getItem('maze-lose-times')==undefined)
        localStorage.setItem('maze-lose-times','0');
    temp.innerText='Lose:'+localStorage.getItem('maze-lose-times');
    return;
}
// update();
setInterval('update()',10);