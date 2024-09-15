class Canvas {
    canvas;
    constructor(canvas=document.createElement('canvas')){this.canvas=canvas.getContext('2d');}
    drawRect(color='black',x=0,y=0,width=0,height=0)
    {
        this.canvas.strokeStyle=color;
        this.canvas.fillStyle=color;
        this.canvas.fillRect(x,y,width,height);
        return;
    }
    drawLine(color='black',sx=0,sy=0,ex=0,ey=0,width=1,stroke=false)
    {
        this.canvas.fillStyle=color;
        this.canvas.strokeStyle=color;
        this.canvas.lineWidth=width;
        this.canvas.beginPath();
        this.canvas.moveTo(sx,sy);
        this.canvas.lineTo(ex,ey);
        this.canvas.closePath();
        stroke? this.canvas.stroke():this.canvas.fill();
        return;
    }
    drawCircle(color='black',x=0,y=0,r=0,stroke=false,sangle=0,eangle=2*Math.PI)
    {
        this.canvas.strokeStyle=color;
        this.canvas.fillStyle=color;
        sangle=2*pi-sangle;
        eangle=2*pi-eangle;
        let t=sangle;sangle=eangle;eangle=t;
        this.canvas.beginPath();
        this.canvas.arc(x,y,r,sangle,eangle);
        this.canvas.lineTo(x,y);
        this.canvas.lineTo(x+r*Math.cos(sangle),y+r*Math.sin(sangle));
        stroke? this.canvas.stroke():this.canvas.fill();
        return;
    }
    drawWord(text="",font="",color='black',marginTop=0,marginLeft=0,stroke=false)
    {
        this.canvas.strokeStyle=color;
        this.canvas.fillStyle=color;
        this.canvas.font=font;
        if(stroke) this.canvas.strokeText(text,marginLeft,marginTop);
        else this.canvas.fillText(text,marginLeft,marginTop);
        return;
    }
}

// constants
const drawboard=document.getElementById('canvas');
const canvas=new Canvas(drawboard);
const fps=30,gapps=1000/fps;

// variables
var nowpos=[-50,-50],blka=50;