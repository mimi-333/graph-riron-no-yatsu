class Graph{
    constructor(w,h){
        this.canvas = document.getElementById('canvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.radius = 10;
        this.ctx = canvas.getContext('2d');

        this.data = [
            [100,10],
            [10,60],
            [190,60],
            [40,150],
            [160,150]
        ];

        this.selected = -1;

        this.path = [
            [0,1],
            [0,2],
            [0,3],
            [0,4],
            [1,2],
            [1,3],
            [1,4],
            [2,3],
            [2,4],
            [3,4]
        ];

        this.funMouseMove = e => this.moveRing(e);
        this.funMouseUp = e => {
            this.canvas.removeEventListener('mousemove',this.funMouseMove);
            this.selected = -1;
        };
        this.canvas.addEventListener('mousedown', e => {
            this.clickListener(e);
        }, false);
    }

    drawRing(){
        for(let i=0; i < this.data.length;i++){
            this.ctx.beginPath();
            this.ctx.arc(this.data[i][0],this.data[i][1], this.radius, 0 * Math.PI / 180, 360 * Math.PI / 180);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    drawLine(){
        for(let i = 0; i < this.path.length; i++){
            this.ctx.beginPath();

            let a = this.path[i][0];
            let b = this.path[i][1];

            this.ctx.moveTo(this.data[a][0],this.data[a][1]);
            this.ctx.lineTo(this.data[b][0],this.data[b][1]);

            this.ctx.stroke();
        }
    }

    checkInRing(x,y){
        for(let i = 0; i < this.data.length; i++){
            if((this.data[i][0]-x)**2 + (this.data[i][1]-y)**2 <= this.radius**2){
                return i;
            }
        }

        return -1;
    }

    clickListener(e){
        var rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        var i = this.checkInRing(x,y);
        if(i != -1){
            this.selected = i;
            this.canvas.addEventListener("mousemove", this.funMouseMove, false)
            this.canvas.addEventListener("mouseup", this.funMouseUp, false);
        }
    }

    moveRing(e){
        if(this.selected != -1){
            this.data[this.selected][0] = e.clientX;
            this.data[this.selected][1] = e.clientY;
            this.resetCanvas();
        }
    }

    draw(){
        this.drawLine();
        this.drawRing();
    }

    resetCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
    }
}

let wrapper = document.getElementById("wrapper");
let w = wrapper.clientWidth;
let h = wrapper.clientHeight;
myGraph = new Graph(w,h);
myGraph.draw();