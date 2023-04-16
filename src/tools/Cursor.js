import Tool from "./Tool";

export default class Cursor extends Tool {
    constructor(canvas) {
        super(canvas);
        this.currentShapeIndex = null
        this.isDragging = false
        this.isResizing = false
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmouseout = this.mouseOutHandler.bind(this)

    }

    isMouseInShape(x, y, shape){
        this.shapeLeft = shape.x
        this.shapeRigth = shape.x + shape.width
        this.shapeTop = shape.y
        this.shapeBottom = shape.y + shape.height

        return x > this.shapeLeft + this.shapeLeft * 0.01 && x < this.shapeRigth - this.shapeRigth * 0.01 && y > this.shapeTop + this.shapeTop* 0.01 && y < this.shapeBottom - this.shapeBottom * 0.01
    }

    isMouseAtEdge(x, y, shape){
        this.shapeLeft = shape.x
        this.shapeRigth = shape.x + shape.width
        this.shapeTop = shape.y
        this.shapeBottom = shape.y + shape.height

        return x > this.shapeLeft && x < this.shapeRigth && y > this.shapeTop && y < this.shapeBottom
    }

    mouseUpHandler(e) {
        if(!this.isDragging && !this.isResizing){
            return
        }

        this.ctx.beginPath()
        this.isDragging = false
        this.isResizing = false
    }

    mouseOutHandler(e){
        if(!this.isDragging && !this.isResizing){
            return
        }

        this.ctx.beginPath()
        this.isDragging = false
        this.isResizing = false
    }

    mouseDownHandler(e) {
        this.ctx.beginPath()

        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop

        this.index = 0;
        for(let shape of Tool.shapes){
            if(this.isMouseInShape(this.startX, this.startY, shape)){
                this.currentShapeIndex = this.index
                this.isDragging = true
                return;
            }
            this.index++
        }

        this.index = 0;
        for(let shape of Tool.shapes){
            if(this.isMouseAtEdge(this.startX, this.startY, shape)){
                this.currentShapeIndex = this.index
                this.isResizing = true
                return;
            }
            this.index++
        }
    }
    mouseMoveHandler(e) {
        this.ctx.beginPath()

        this.mouseX = e.pageX - e.target.offsetLeft
        this.mouseY = e.pageY - e.target.offsetTop

        this.dx = this.mouseX - this.startX
        this.dy = this.mouseY - this.startY

        this.currentShape = Tool.shapes[this.currentShapeIndex]

        if(this.isDragging){
            this.currentShape.x += this.dx
            this.currentShape.y += this.dy

            this.draw(this.currentShape.x, this.currentShape.y, this.currentShape.width, this.currentShape.height)

            this.startX = this.mouseX
            this.startY = this.mouseY
        }
        else if(this.isResizing){
            this.currentShape.width += this.dx
            this.currentShape.height += this.dy

            this.draw(this.currentShape.x, this.currentShape.y, this.currentShape.width, this.currentShape.height)

            this.startX = this.mouseX
            this.startY = this.mouseY
        }
    }
    draw(x, y, w, h) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for(let shape of Tool.shapes) {
            switch(shape.type){
                case("rect"):
                    this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
                    break
                case("circle"):
                    this.ctx.arc(shape.x + shape.width / 2, shape.y + shape.width / 2, shape.width / 2, 0, 2*Math.PI)
                    this.ctx.fill()
                    break
                case("text"):
                    this.ctx.font = shape.height + "px Arial"
                    this.ctx.fillText(shape.text, shape.x, shape.y + shape.height)
                    break
                case("img"):
                    this.ctx.drawImage(shape.text, shape.x, shape.y, shape.width, shape.height);
                    break
                case("background"):
                    this.ctx.drawImage(shape.text, 0, 0, this.canvas.width, this.canvas.height);
                    break
                default:
                    break
           }
        }
    }
}