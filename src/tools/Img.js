import Tool from "./Tool";

export default class Img extends Tool {
    constructor(canvas, userImage) {
        super(canvas)
        this.userImage = userImage
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.paste(this.startX, this.startY)
    }

    paste(x, y) {
        var URL = window.webkitURL || window.URL;
        var url = URL.createObjectURL(this.userImage.target.files[0]);
        var img = new Image();
        img.src = url;
        img.onload = () => {
            this.ctx.beginPath()
            this.ctx.drawImage(img, x - img.width / 2, y - img.height / 2);
            Tool.shapes.push({x: x , y: y - img.height, width: img.width, height:  img.height, type: "img", text: img})
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}