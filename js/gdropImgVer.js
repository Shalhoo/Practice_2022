 let     cf1 = 180 / Math.PI,
                scale=1,
                alpha = 20,
                ha = 1 * mParam,
                p = Math.PI * mParam,
                pDelTwo = p / 2,
                Rof = 0.38 * mParam,
                Cpar = 0.25 * mParam
                //C -> Cpar, C1=0.25, 10s0 -> pDelTwo, ha1=1, Rof1=0.38
                
        let     totalLength = 2 * Cpar + 2 * ha,
                lineHeight = 2 * ha,
                lineLength = lineHeight / (Math.cos(alpha) * Math.PI / 180),
                tgGrad = Math.tan(degToRad(alpha)),
                cosGrad = Math.cos(degToRad(alpha)),
                lineWidth=lineHeight * tgGrad

        let     b3 = Cpar * tgGrad,
                c3 = Cpar / cosGrad,
                fullRad = rad + 2 * mParam

function drawCogs( Clip, koef, Rotate)
{
    if(koef>=0)
    {
        with ( Clip )
        {
            offsetX=0;
            offsetY=0;

            if(Clip!=_root.Rack)
            {
                point = new Object();
                point.x = _root.Rack._x;
                point.y = _root.Rack._y;
                Circle.globalToLocal(point);
                //trace(point.x+"; "+point.y);
                offsetX=point.x;
                offsetY=point.y;

            }


            X=koef*p;
            Y=line_height+2*C;
            moveTo(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY);
//                moveTo(X, Y);

            controlX=(l0s0/2-line_width/2-b3)+p*koef;
            controlY=2*C+line_height;
            anchorX=(l0s0/2-line_width/2)+p*koef;
            anchorY=line_height+C;
//                trace("curveToIfHit("+RotateX(controlX, controlY, Rotate)+offsetX+", "+RotateY(controlX, controlY, Rotate)+offsetY+", "+RotateX(anchorX, anchorY, Rotate)+offsetX+", "+RotateY(anchorX, anchorY, Rotate)+offsetY+", Clip);");
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//                curveTo(controlX, controlY, anchorX, anchorY);

            X=(l0s0/2+line_width/2)+p*koef;
            Y=C;
            lineToIfHit(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//                lineTo(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//                lineTo(X, Y);

            controlX=(l0s0/2+line_width/2+b3)+p*koef;
            controlY=0;
            anchorX=l0s0+p*koef;
            anchorY=0;
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//                curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
//                curveTo(controlX, controlY, anchorX, anchorY);

            controlX=(l0s0+l0s0/2-line_width/2)+p*koef;
            controlY=0;
            anchorX=(l0s0+l0s0/2-line_width/2+b3)+p*koef;
            anchorY=C;
//                curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//                curveTo(controlX, controlY, anchorX, anchorY);

            X=(l0s0+l0s0/2-line_width/2+b3+line_width)+p*koef;
            Y=C+line_height;
//                lineTo(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
            lineToIfHit(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//                lineTo(X, Y);

            controlX=(l0s0+l0s0/2-line_width/2+b3*2+line_width)+p*koef;
            controlY=2*C+line_height;
            anchorX=p+p*koef;
            anchorY=2*C+line_height;
//                curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//                curveTo(controlX, controlY, anchorX, anchorY);
        }
        drawCogs(Clip, koef-1, Rotate);
    }
}