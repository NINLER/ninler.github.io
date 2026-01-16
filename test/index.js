
class DragComponent {
    moving = false;
    #cursor = [];
    #lastCursor = [];
    #components = [];
    constructor() {
        document.addEventListener('mousemove', (ev) => {
            this.#cursor = [ev.clientX, ev.clientY];
            this.#mouseMoveListener();
            return;
        });
    }

    static mouseDownEvent = new CustomEvent("clickdown", {bubbles: true, cancelable: true});
    static mouseUpEvent = new CustomEvent("clickup", {bubbles: true, cancelable: true});

    #mouseDownListener = () => {
        this.moving = true;
        this.#lastCursor = [...this.#cursor];
        return;
    }
    
    #mouseUpListener = () => {
        this.moving = false;
        return;
    }

    #mouseMoveListener = () => {
        if(!this.moving) return;
        let delta = [
            this.#cursor[0]-this.#lastCursor[0],
            this.#cursor[1]-this.#lastCursor[1]
        ]
        for(let it of this.#components)
        {
            let x = parseInt(it.style.left);
            let y = parseInt(it.style.top);
            x += delta[0], y += delta[1];
            it.style.left = x+'px';
            it.style.top = y+'px';
        }
        this.#lastCursor = [...this.#cursor];
        return;
    }

    addListener(item = document.createElement('div'), originalEvent = true) {
        item.addEventListener('clickdown', this.#mouseDownListener);
        item.addEventListener('clickup', this.#mouseUpListener);
        if(!originalEvent) return;
        item.addEventListener('mousedown', this.#mouseDownListener);
        item.addEventListener('mouseup', this.#mouseUpListener);
        return;
    }

    removeListener(item = document.createElement('div')) {
        item.removeEventListener('clickdown', this.#mouseDownListener);
        item.removeEventListener('clickup', this.#mouseUpListener);
        item.removeEventListener('mousedown', this.#mouseDownListener);
        item.removeEventListener('mouseup', this.#mouseUpListener);
        return;
    }
    
    addElem(item = document.createElement('div'), drag = false, originalEvent = true) {
        this.#components.push(item);
        if(drag) this.addListener(item, originalEvent);
        return;
    }

    removeElem(item = document.createElement('div')) {
        let pos = this.#components.indexOf(item);
        if(pos == -1) return;
        this.#components.splice(pos, 1);
        this.removeListener(item);
        return;
    }
};

class ImageComponent {
    #drag = new DragComponent();
    #width = 0
    #height = 0
    #clickArea = []
    #loading = false;
    #frontCanvas = document.createElement('canvas');
    #behindCanvas = document.createElement('canvas');
    #frontCtx = this.#frontCanvas.getContext("2d");
    constructor(front = document.createElement('canvas'), behind = document.createElement('canvas'), image = "") {
        this.#frontCanvas = front;
        this.#behindCanvas = behind;
        this.#frontCtx = this.#frontCanvas.getContext("2d");
        this.#drag.addElem(this.#frontCanvas, false);
        this.#drag.addElem(this.#behindCanvas, true, false);
        this.#addClickEvent();
        this.loadImage(image);
        return;
    }

    #processImageData(imgdata = new ImageData(), limit = 50) {
        let opa = imgdata.data.filter((it, idx) => idx%4 == 3);
        let width = imgdata.width, height = imgdata.height;
        let queue = []
        this.#clickArea = new Array(opa.length).fill(true);
        for(let i of [0, height-1])
            for(let j = 0; j < width; j++)
                if(opa[i*width+j] <= limit)
                    this.#clickArea[i*width+j] = false, queue.push([i, j]);
        for(let j of [0, width-1])
            for(let i = 0; i < height; i++)
                if(opa[i*width+j] <= limit)
                    this.#clickArea[i*width+j] = false, queue.push([i, j]);
        while(queue.length)
        {
            let [x, y] = queue[0]; queue.shift();
            for(let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]])
                if(x+dx >= 0 && x+dx < height && y+dy >= 0 && y+dy <= width && opa[(x+dx)*width+y+dy] <= limit && this.#clickArea[(x+dx)*width+y+dy])
                    this.#clickArea[(x+dx)*width+y+dy] = false,
                    queue.push([x+dx, y+dy])
        }
        this.#loading = false;
        return;
    }

    loadImage(image) {
        if(!image) return;
        let img = new Image();
        img.src = image;
        img.loading = "eager";
        img.crossOrigin = "";
        this.#loading = true;
        img.onload = (ev) => {
            let width = img.width, height = img.height;
            this.#width = width, this.#height = height;
            this.#frontCanvas.setAttribute('width', width);
            this.#frontCanvas.setAttribute('height', height);
            this.#behindCanvas.setAttribute('width', width);
            this.#behindCanvas.setAttribute('height', height);
            this.#frontCtx.drawImage(img, 0, 0, width, height);
            let imgdata = this.#frontCtx.getImageData(0, 0, width, height);
            this.#processImageData(imgdata);
        };
        return;
    }

    #addClickEvent() {
        this.#behindCanvas.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            let x = ev.offsetY, y = ev.offsetX, id = x*this.#width+y;
            if(!this.#loading && id >= 0 && id < this.#width*this.#height && this.#clickArea[id])
                return this.#behindCanvas.dispatchEvent(DragComponent.mouseDownEvent);
            this.#frontCanvas.style.pointerEvents = "none";
            this.#behindCanvas.style.pointerEvents = "none";
            let it = document.elementFromPoint(ev.clientX, ev.clientY);
            let e = new MouseEvent('mousedown', {
                bubbles: ev.bubbles, cancelable: ev.cancelable, 
                clientX: ev.clientX, clientY: ev.clientY, 
                button: ev.button, buttons: ev.buttons, 
            });
            if(it) it.dispatchEvent(e);
            setTimeout(() => {
                this.#frontCanvas.style.pointerEvents = "auto";
                this.#behindCanvas.style.pointerEvents = "auto";
            }, 1);
            return;
        });

        this.#behindCanvas.addEventListener('mouseup', (ev) => {
            ev.preventDefault();
            let x = ev.offsetY, y = ev.offsetX, id = x*this.#width+y;
            if(!this.#loading && id >= 0 && id < this.#width*this.#height && this.#clickArea[id] && this.#drag.moving)
                return this.#behindCanvas.dispatchEvent(DragComponent.mouseUpEvent);
            this.#frontCanvas.style.pointerEvents = "none";
            this.#behindCanvas.style.pointerEvents = "none";
            let it = document.elementFromPoint(ev.clientX, ev.clientY);
            let e = new MouseEvent('mouseup', {
                bubbles: ev.bubbles, cancelable: ev.cancelable, 
                clientX: ev.clientX, clientY: ev.clientY, 
                button: ev.button, buttons: ev.buttons, 
            });
            if(it) it.dispatchEvent(e);
            setTimeout(() => {
                this.#frontCanvas.style.pointerEvents = "auto";
                this.#behindCanvas.style.pointerEvents = "auto";
            }, 1);
            return;
        });
    }
}