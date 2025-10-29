document.onclick=function(event)
{
    let tar=event.srcElement;
    console.log(tar);
    if(tar.id=='resetButton')
    {
        let result=window.prompt("Are you sure you want to reset your all datas?\nIf yes,please input \"I know what I'm doing.\"");
        if(result=='I know what I\'m doing.')
        {
            localStorage.removeItem('best-maze-time');
            localStorage.removeItem('maze-win-times');
            localStorage.removeItem('maze-lose-times');
            window.alert("Data reset successfully.");
        }
        else
            window.alert("Have fun playing.");
        return;
    }
    if(time1=='not start')
        time1=new Date();
    var temp=event.srcElement;
    // console.log(process,temp.type);
    if(temp.id=="button-left")
    {
        if(py>0&&maze[px][py-1]!=0)
            maze[px][py]=4,py=py-1,step=step-1;
        ShowMaze();
    }
    if(temp.id=="button-up")
    {
        if(px>0&&maze[px-1][py]!=0)
            maze[px][py]=4,px=px-1,step=step-1;
        ShowMaze();
    }
    if(temp.id=="button-down")
    {
        if(px<9&&maze[px+1][py]!=0)
            maze[px][py]=4,px=px+1,step=step-1;
        ShowMaze();
    }
    if(temp.id=="button-right")
    {
        if(py<9&&maze[px][py+1]!=0)
            maze[px][py]=4,py=py+1,step=step-1;
        ShowMaze();
    }
}
document.addEventListener('keydown',(event)=>{
    if(time1=='not start') time1=new Date();
    var key=event.key;
    // console.log(key);
    if(["W",'w','ArrowUp'].includes(key))
    {
        if(px>0&&maze[px-1][py]!=0)
            maze[px][py]=4,px=px-1,step=step-1;
        ShowMaze();
    }
    if(["A",'a','ArrowLeft'].includes(key))
    {
        if(py>0&&maze[px][py-1]!=0)
            maze[px][py]=4,py=py-1,step=step-1;
        ShowMaze();
    }
    if(["D",'d','ArrowRight'].includes(key))
    {
        if(py<9&&maze[px][py+1]!=0)
            maze[px][py]=4,py=py+1,step=step-1;
        ShowMaze();
    }
    if(["S",'s','ArrowDown'].includes(key))
    {
        if(px<9&&maze[px+1][py]!=0)
            maze[px][py]=4,px=px+1,step=step-1;
        ShowMaze();
    }
});