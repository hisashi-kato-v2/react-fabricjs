import { fabric } from 'fabric';
let canvas = new fabric.Canvas('canvas');
// create your "bounding box"
let boundingBox = new fabric.Rect({
    id: 'bounding-box',
    width: 499,
    height: 399,
    hasBorders: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    evented: false,
    stroke: 'black',
    fill: 'white',
    selectable: false,
});
canvas.add(boundingBox);
// Create default object
let object = new fabric.Rect({
    top: 50,
    left: 50,
    width: 50,
    height: 50,
});
canvas.add(object);
// Event on object moving
canvas.on('object:moving', function (e) {
    var object = e.target;
    //console.log(e.target.left, e.target.oCoords, 2);
    // check left
    if (object.left < boundingBox.left) {
        object.set('left', boundingBox.left);
    }
    // check right
    else if (object.left + object.width > boundingBox.left + boundingBox.width) {
        object.set('left', boundingBox.left + boundingBox.width - object.width);
    }
    // check top
    if (object.top < boundingBox.top) {
        object.set('top', boundingBox.top);
    }
    // check bottom
    else if (object.top + object.height > boundingBox.top + boundingBox.height) {
        object.set('top', boundingBox.top + boundingBox.height - object.height);
    }
});
let rect = null;
let isDrawing = false; //描画中
let isMoving = false; // 動かし中
let startPoint = { x: 0, y: 0 };
canvas.on('mouse:down', (object) => {
    if (isMoving || isDrawing) {
        return;
    }
    console.log('描画します');
    isDrawing = true;
    const pointer = canvas.getPointer(object.e);
    startPoint = { x: pointer.x, y: pointer.y };
    rect = new fabric.Rect({
        left: startPoint.x,
        top: startPoint.y,
        width: 0,
        height: 0,
        stroke: '#219800',
        fill: 'rgba(22,22,22,0.1)',
        lockRotation: true,
    });
    canvas.add(rect);
});
// ドラッグ中でBBoxを更新する
canvas.on('mouse:move', (object) => {
    if (!isDrawing || !rect || isMoving) {
        return;
    }
    const pointer = canvas.getPointer(object.e);
    rect.set({
        width: pointer.x - startPoint.x,
        height: pointer.y - startPoint.y,
        lockRotation: true,
    });
    canvas.renderAll();
});
// クリックを話してBBoxを確定する
canvas.on('mouse:up', () => {
    isDrawing = false;
});
canvas.on('object:moving', function (e) {
    isMoving = true;
});
canvas.on('object:moved', () => {
    isMoving = false;
});
function positionMe() {
    const cx = parseInt(document.getElementById('txtX').value);
    const cy = parseInt(document.getElementById('txtY').value);
    console.log(cx, cy);
    var pt = new fabric.Point(cx, cy);
    object.setPositionByOrigin(pt, 'center', 'center');
    // object.set('left', 300);
    // object.set('top', 300);
    canvas.renderAll();
}
window.positionMe = positionMe;