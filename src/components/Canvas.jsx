import React, {useEffect, useRef, useState} from 'react';
import "../style/canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import  {Modal, Button} from "react-bootstrap";
import Cursor from "../tools/Cursor";

const Canvas = observer( () => {
    const canvasRef = useRef();
    const [modal, setModal] = useState(true)
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(600)


    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Cursor(canvasRef.current))
        let ctx = canvasRef.current.getContext('2d')
    }, [])

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header >
                    <Modal.Title>Введите размеры холста</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ширина</p>
                    <input type="number" value={width} onChange={e => setWidth(+e.target.value)}/>
                    <p>Длинна</p>
                    <input type="number" value={height} onChange={e => setHeight(+e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setModal(false)}>
                         Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={width} height={height}>
            </canvas>
        </div>
    );
});

export default Canvas;