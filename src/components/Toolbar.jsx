import React, {useState} from 'react';
import "../style/toolbar.scss"
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Img from "../tools/Img";
import {Button, Modal} from "react-bootstrap";
import Text from "../tools/Text";
import Cursor from "../tools/Cursor";
import Template1 from "../assets/image/template1.jpg"
import Tempalte2 from "../assets/image/template2.jpg"
import Tempalte3 from "../assets/image/template3.png"
import Tempalte4 from "../assets/image/template4.jpg"
import Tool from "../tools/Tool";
const Toolbar = () => {
    const [modalText, setModalText] = useState(false)
    const [modalSave, setModalSave] = useState(false)
    const [modalTemplate, setModalTemplate] = useState(false)
    const [embedText, setEmbedText] = useState("")
    const [sizeText, setSizeText] = useState(12)
    const [textToSave, setTextToSave] = useState("undefined")

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    const pasteTemplate = userImage => {
        let canvas = canvasState.canvas
        let ctx = canvas.getContext('2d')
        var url = userImage;
        var img = new Image();
        img.src = url;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            Tool.shapes.push({x: 0 , y: 0, width: 0, height:  0, type: "background", text: img})
        }
    }

    const download = (name, format) => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = name + format
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="toolbar">
            <button className="toolbar__btn cursor" onClick={() => toolState.setTool(new Cursor(canvasState.canvas))}/>
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className="toolbar__btn image"/>
            <input type="file" accept="image/*" className="toolbar__btn img"
                   onChange={e => toolState.setTool(new Img(canvasState.canvas, e))}/>
            <button className="toolbar__btn text" onClick={() => setModalText(true)}/>
            <Modal show={modalText} onHide={() => setModalText(false)}>
                <Modal.Header >
                    <Modal.Title>Текст для вставки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Введите текст для вставки</p>
                    <input type="text" value={embedText}
                           onChange={(e) => setEmbedText(e.target.value)}/>
                    <p>Введите размер текста</p>
                    <input type="number" value={sizeText}
                           onChange={(e) => setSizeText(+e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() =>
                    {toolState.setTool(new Text(canvasState.canvas, embedText, sizeText)); setModalText(false)}}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className="toolbar__btn template" onClick={() => setModalTemplate(true)}/>
            <Modal size="lg" show={modalTemplate} onHide={() => setModalTemplate(false)}>
                <Modal.Header >
                    <Modal.Title>Выбор шаблона</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="templates">
                        <button className="templates__template temp1" onClick={() => pasteTemplate(Template1)}/>
                        <button className="templates__template temp2" onClick={() => pasteTemplate(Tempalte2)}/>
                        <button className="templates__template temp3" onClick={() => pasteTemplate(Tempalte3)}/>
                        <button className="templates__template temp4" onClick={() => pasteTemplate(Tempalte4)}/>
                    </div>
                </Modal.Body>
            </Modal>
            <input onChange={e => changeColor(e)} style={{marginLeft:10}} type="color"/>
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>
            <button className="toolbar__btn save" onClick={() => setModalSave(true)}/>
            <Modal show={modalSave} onHide={() => setModalSave(false)}>
            <Modal.Header >
                <Modal.Title>Сохранение файла</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <text>Название файла: </text>
                <input type="text" value={textToSave}
                       onChange={(e) => setTextToSave(e.target.value)}/>
                <Button style={{marginLeft: 4}} onClick={() => {download(textToSave,".jpg"); setModalSave(false)}}>.jpg</Button>
                <Button style={{marginLeft: 3}} onClick={() => {download(textToSave,".png"); setModalSave(false)}}>.png</Button>
            </Modal.Body>
            </Modal>
        </div>
    );
};

export default Toolbar;