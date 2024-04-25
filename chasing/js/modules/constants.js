const framePerSecond=1000/60,blka=50,speed=4,monsterSpeed=4;
const hex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
const dir8=[[0,-1,-1,-1,0,0,1,1,1],[0,-1,0,1,-1,1,-1,0,1]];
const dir={
    0:'UP',1:'RIGHT',2:'DOWN',3:'LEFT',
    'UP':{x:0,y:-1},
    'RIGHT':{x:1,y:0},
    'DOWN':{x:0,y:1},
    'LEFT':{x:-1,y:0},
};
const arc=2*Math.PI,pi=Math.PI;

class Block{
    constructor(cx,cy,cry=false)
    {
        cx=cx*blka+blka/2,cy=cy*blka+blka/2;
        this.center={x:cx,y:cy};
        this.crystal=cry;
        this.corner=[
            create(cx-blka/2,cy-blka/2),
            create(cx-blka/2,cy+blka/2),
            create(cx+blka/2,cy-blka/2),
            create(cx+blka/2,cy+blka/2),
        ]
        this.edge={
            'LEFT':create([cx-blka/2,cx-blka/2],[cy-blka/2,cy+blka/2]),
            'RIGHT':create([cx+blka/2,cx+blka/2],[cy-blka/2,cy+blka/2]),
            'UP':create([cx-blka/2,cx+blka/2],[cy-blka/2,cy-blka/2]),
            'DOWN':create([cx-blka/2,cx+blka/2],[cy+blka/2,cy+blka/2])
        };
        // console.log(this.corner);
        return;
    }
};

function dist(sx,sy,ex,ey){return Math.sqrt((sx-ex)**2+(sy-ey)**2);}
function create(x,y){let temp={x:x,y:y};return temp;}
function copy(x){let temp={x:x.x,y:x.y};return temp;}
function sgn(x){return (x==0? 0:(x<0? -1:1));}
function len(x){return dist(0,0,x.x,x.y);}
function add(x,y){return create(x.x+y.x,x.y+y.y);}
function sub(x,y){return create(x.x-y.x,x.y-y.y);}
function mul(x,y){return create(x.x*y.x,x.y*y.y);}
function div(x,y){return create(x.x/y.x,x.y/y.y);}
function mulnum(x,y){return create(x.x*y,x.y*y);}
function divnum(x,y){return create(x.x/y,x.y/y);}
function lst(x,loop=4){return (x+loop-1)%loop;}
function nxt(x,loop=4){return (x+1)%loop;}