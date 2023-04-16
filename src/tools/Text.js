import Tool from "./Tool";

export default class Text extends Tool {
    constructor(canvas, embedText, sizeText) {
        super(canvas)
        this.embedText = embedText
        this.sizeText = sizeText
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
        this.ctx.font = this.sizeText + "px Arial"
        this.ctx.fillText(this.embedText, x, y)
        Tool.shapes.push({x: x, y: y - this.sizeText - 2, width: this.ctx.measureText(this.embedText).width, height: this.sizeText + 2, type: "text", text: this.embedText})
        this.ctx.fill()
    }
}
