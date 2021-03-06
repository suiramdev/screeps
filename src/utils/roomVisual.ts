if (!Memory.debug) Memory.debug = {
    drawSpeeches: 1,
    drawRoles: 1
}

function relPoly(x: number, y: number, poly: number[][]){
    return poly.map(p=>{
        p[0] += x
        p[1] += y
        return p
    });
}

RoomVisual.prototype.speech = function (pos, text) {
    if (Memory.debug.drawSpeeches === 0) return;

    let pointer = [
        [-0.2, -0.8],
        [ 0.2, -0.8],
        [ 0,   -0.3]
    ];
    pointer = relPoly(pos.x, pos.y, pointer);
    pointer.push(pointer[0]);

    // @ts-ignore
    this.poly(pointer, {
        fill: "#202020",
        stroke: "#000000",
        opacity: 0.75,
        strokeWidth: 0.025
    });

    this.text(text, pos.x, pos.y-1.15, {
        color: "#FFFFFF",
        align: "center",
        opacity: 0.75,
        font: 0.5
    });

    return this;
}

Creep.prototype.speech = function (message) {
    this.room.visual.speech(this.pos, message);
}
