Memory.debug = {
  drawPath: 1,
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

// @ts-ignore
Creep.prototype._moveTo = Creep.prototype.moveTo;
// @ts-ignore
Creep.prototype.moveTo = function (...args) {
    if (Memory.debug.drawPath === 1) {
        const style: LineStyle = {color: '#000000', lineStyle: "dashed"};

        if (typeof args[0] === "object")
            if (args[0].pos)
              this.room.visual.line(this.pos, args[0].pos, style);
            else
              this.room.visual.line(this.pos.x, this.pos.y, args[0].x, args[1].y, style);
        else
            this.room.visual.line(this.pos.x, this.pos.y, args[0], args[1], style);
    }
    // @ts-ignore
    this._moveTo.apply(this, args);
}
