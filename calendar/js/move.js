const chess=document.querySelector(".chess");
let cursor=[0,0];

function LoadJigsawEvents()
{
    const jigsaw=document.getElementsByClassName('jigsaw');
    for(let it of jigsaw)
    {
        const parts=[...it.children].filter(it=>!it.classList.contains('null'));
        for(let it of parts)
            it.addEventListener('mousedown',function(ev) {
                if(!(ev.buttons&1)) return;
                const jigsaw=document.getElementsByClassName('jigsaw');
                for(let it of jigsaw)
                    if(it.classList.contains('follow'))
                        return;
                JigsawMouseIn(this.parentElement);
                return;
            });
    }

    function JigsawTurn()
    {
        const jigsaw=document.getElementsByClassName('jigsaw');
        for(let it of jigsaw)
            if(it.classList.contains('follow'))
            {
                let turn=(it.getAttribute("turn")??0)-0;
                let flip=(it.getAttribute("flip")??0)-0;
                let col=it.getAttribute("color");
                let info=it.getAttribute("info");
                turn=(turn+1)&3;
                it.setAttribute("turn",turn);
                it.innerHTML=GetJigsaw(col,RotateInfo(info,turn,flip));
                const parts=[...it.children].filter(it=>!it.classList.contains('null'));
                for(let it of parts)
                    it.addEventListener('mousedown',function(ev) {
                        if(!(ev.buttons&1)) return;
                        const jigsaw=document.getElementsByClassName('jigsaw');
                        for(let it of jigsaw)
                            if(it.classList.contains('follow'))
                                return;
                        JigsawMouseIn(this.parentElement);
                        return;
                    });
            }
        return;
    }
    
    function JigsawFlip()
    {
        const jigsaw=document.getElementsByClassName('jigsaw');
        for(let it of jigsaw)
            if(it.classList.contains('follow'))
            {
                let turn=(it.getAttribute("turn")??0)-0;
                let flip=(it.getAttribute("flip")??0)-0;
                let col=it.getAttribute("color");
                let info=it.getAttribute("info");
                flip^=1;
                it.setAttribute("flip",flip);
                it.innerHTML=GetJigsaw(col,RotateInfo(info,turn,flip));
                const parts=[...it.children].filter(it=>!it.classList.contains('null'));
                for(let it of parts)
                    it.addEventListener('mousedown',function(ev) {
                        if(!(ev.buttons&1)) return;
                        JigsawMouseIn(this.parentElement);
                    });
            }
        return;
    }

    document.addEventListener('mousemove',function(ev) {
        const rect=chess.getBoundingClientRect();
        cursor=[ev.clientX-rect.left,ev.clientY-rect.top];
        // console.log(ev.clientX,ev.clientY,rect.left,rect.top);
        const jigsaw=document.getElementsByClassName('jigsaw');
        for(let it of jigsaw) JigsawMouseMove(it);
        return;
    });

    document.addEventListener('mouseup',function(ev) {
        if(ev.buttons&1) return;
        const jigsaw=document.getElementsByClassName('jigsaw');
        for(let it of jigsaw)
            if(it.classList.contains('follow'))
                JigsawMouseOut(it);
        return;
    });

    document.addEventListener('contextmenu',function(ev) {
        ev.preventDefault();
        return JigsawTurn();
    });

    document.addEventListener('keypress',function(ev) {
        if(ev.key!==" ") return;
        return JigsawTurn();
    });

    document.addEventListener('keypress',function(ev) {
        if(ev.key!=="F"&&ev.key!=="f") return;
        return JigsawFlip();
    });

    document.addEventListener('keypress',function(ev) {
        if(ev.key!=="R"&&ev.key!=="r") return;
        return JigsawTurn();
    });

    return;
}

function JigsawMouseIn(self)
{
    let [x,y]=cursor;
    let dx=self.offsetLeft-x,dy=self.offsetTop-y;
    self.setAttribute("dx",dx),self.setAttribute("dy",dy);
    self.classList.add("follow");
    return;
}

function JigsawMouseOut(self)
{
    self.classList.remove("follow");
    let stx=self.offsetLeft,sty=self.offsetTop;
    let x=stx,y=sty; [x,y]=JigsawStickToBoard(self,[x,y]);
    self.style.left=x+'px',self.style.top=y+'px';
    CheckComplete();
    return;
}

function JigsawMouseMove(self)
{
    if(!self.classList.contains('follow')) return;
    let [x,y]=cursor;
    let dx=self.getAttribute('dx')-0,dy=self.getAttribute('dy')-0;
    self.style.left=x+dx+'px',self.style.top=y+dy+'px';
    return;
}

function JigsawStickToBoard(self,def)
{
    const cells=document.querySelectorAll(".chess > .cell:not(.null)");
    const parts=[...self.children].filter(it=>!it.classList.contains('null'));
    let mxdis=-Infinity,mn=Infinity,off=[];
    for(let it of parts)
    {
        let top=it.offsetTop+self.offsetTop,left=it.offsetLeft+self.offsetLeft;
        let mndis=Infinity,offset=[0,0];
        for(let c of cells)
        {
            let rect={top: c.offsetTop-0, left: c.offsetLeft-0};
            let val=(top-rect.top)**2+(left-rect.left)**2;
            if(mndis>val)
                mndis=val,offset=[rect.left-left,rect.top-top];
        }
        // console.log("mndis",it,top,left,mndis,offset);
        if(mndis>mxdis) mxdis=mndis,off=offset;
    }
    if(mxdis<=30**2)
    {
        let res=[self.offsetLeft+off[0],self.offsetTop+off[1]];
        // console.log("return",off,res,mxdis);
        return res;
    }
    // console.log("return def",mxdis,off);
    return def;
}

function CheckComplete()
{
    const win=document.getElementById('win');
    const cells=document.querySelectorAll(".chess > .cell:not(.null)");
    const parts=document.querySelectorAll(".jigsaw > .cell:not(.null)");
    win.style.opacity=0;
    for(let c of cells)
    {
        if(c.classList.contains("banned")) continue;
        let rect={top: c.offsetTop-0, left: c.offsetLeft-0};
        let mndis=Infinity;
        for(let it of parts)
        {
            let self=it.parentElement;
            let top=it.offsetTop+self.offsetTop;
            let left=it.offsetLeft+self.offsetLeft;
            let val=(top-rect.top)**2+(left-rect.left)**2;
            console.log(top,left,rect.top,rect.left);
            if(mndis>val) mndis=val;
        }
        // if(mndis>30**2) console.log("check",c,mndis);
        if(mndis>30**2) return false;
    }
    win.style.opacity=1;
    return true;
}