
function drawLine(ctx, startPoint, endPoint) {
    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    ctx.lineTo(endPoint[0], endPoint[1]);
    ctx.stroke();
    ctx.closePath();
}

function drawPath(ctx, pointList) {
    ctx.beginPath();
    ctx.moveTo(pointList[0][0], pointList[0][1]);
    for (const point of pointList.slice(1)) {
        ctx.lineTo(point[0], point[1]);
    }
    ctx.stroke();
    ctx.closePath();
}

function strokeCircle(ctx, xCoord, yCoord, radius, text='', fillStyle='', colorFill=false) {
    ctx.beginPath();
    ctx.arc(xCoord, yCoord, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    if (fillStyle !== '') {
        ctx.fillStyle = fillStyle;
        if (colorFill) {
            ctx.fill();
        }
    }
    ctx.fillText(text, xCoord, yCoord);
}

function strokeRectangle(ctx, xCoord, yCoord, width, height, text='', fillStyle='', colorFill=false) {
    ctx.beginPath();
    ctx.rect(xCoord, yCoord, width, height);
    ctx.stroke();
    ctx.closePath();
    if (fillStyle !== '') {
        ctx.fillStyle = fillStyle;
        if (colorFill) {
            ctx.fill();
        }
    }
    ctx.fillText(text, xCoord + (width / 2), yCoord + (height / 2));
}

function strokeSquareByCenter(ctx, xCoord, yCoord, halfWidth, text='', fillStyle='', colorFill=false) {
    const xCorner = xCoord - halfWidth;
    const yCorner = yCoord - halfWidth;
    strokeRectangle(ctx, xCorner, yCorner, halfWidth * 2, halfWidth * 2, text, fillStyle, colorFill);
}
