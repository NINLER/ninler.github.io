function drawRect(color,x,y,width,height)
{
    canvas.fillStyle=color;
    canvas.fillRect(x,y,width,height);
    return;
}

function drawLine(color,sx,sy,ex,ey,stroke=false)
{
    canvas.fillStyle=color;
    canvas.moveTo(sx,sy);
    canvas.lineTo(ex,ey);
    stroke? canvas.stroke():canvas.fill();
    return;
}

function drawCircle(color,x,y,r,stroke=false,sangle=0,eangle=2*Math.PI)
{
    canvas.fillStyle=color;
    sangle=2*pi-sangle;
    eangle=2*pi-eangle;
    let t=sangle;sangle=eangle;eangle=t;
    canvas.beginPath();
    canvas.arc(x,y,r,sangle,eangle);
    canvas.lineTo(x,y);
    canvas.lineTo(x+r*Math.cos(sangle),y+r*Math.sin(sangle));
    stroke? canvas.stroke():canvas.fill();
    return;
}

function drawWord(text,font,color,marginTop,marginLeft,stroke=false)
{
    canvas.fillStyle=color;
    canvas.font=font;
    if(stroke)
        canvas.strokeText(text,marginLeft,marginTop);
    else
        canvas.fillText(text,marginLeft,marginTop);
    return;
}