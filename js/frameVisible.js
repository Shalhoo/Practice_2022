function radToDeg(rad : Number) : Number
{
    return (rad * 180) / Math.PI;
}
function degToRad(deg : Number) : Number
{
    return (Math.PI * deg) / 180;
}
function RotateX(X, Y, Degree : Number) : Number
{
    return X*Math.cos(degToRad(Degree))-Y*Math.sin(degToRad(Degree));
}
function RotateY(X, Y, Degree : Number) : Number
{
    return X*Math.sin(degToRad(Degree))+Y*Math.cos(degToRad(Degree));
}
function beyondCircle(X, Y : Number) {
    if(fullRad*fullRad*1.5<=X*X+Y*Y)
        return true;
    else
        return false;
}
function curveToIfHit(controlX, controlY, anchorX, anchorY : Number, Clip : MovieClip)
{
    if(Clip!=_root.Circle)
    {
        Clip.curveTo(controlX, controlY, anchorX, anchorY);
        drawed=true;
    }
    else
    {
        if(!beyondCircle(anchorX, anchorY))
        {
            Clip.curveTo(controlX, controlY, anchorX, anchorY);
            drawed=true;
        }
        else
            Clip.moveTo(anchorX, anchorY);
    }
}
function lineToIfHit(X, Y : Number, Clip : MovieClip)
{
    if(Clip!=_root.Circle)
    {
        Clip.lineTo(X, Y);
        drawed=true;
    }
    else
    {
        if(!beyondCircle(X, Y))
        {
            Clip.lineTo(X, Y);
            drawed=true;
        }
        else
            Clip.moveTo(X, Y);
    }
}
function drawCogs( Clip : MovieClip, koef : Number, Rotate: Number)
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
//			moveTo(X, Y);

            controlX=(l0s0/2-line_width/2-b3)+p*koef;
            controlY=2*C+line_height;
            anchorX=(l0s0/2-line_width/2)+p*koef;
            anchorY=line_height+C;
//			trace("curveToIfHit("+RotateX(controlX, controlY, Rotate)+offsetX+", "+RotateY(controlX, controlY, Rotate)+offsetY+", "+RotateX(anchorX, anchorY, Rotate)+offsetX+", "+RotateY(anchorX, anchorY, Rotate)+offsetY+", Clip);");
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//			curveTo(controlX, controlY, anchorX, anchorY);

            X=(l0s0/2+line_width/2)+p*koef;
            Y=C;
            lineToIfHit(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//			lineTo(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//			lineTo(X, Y);

            controlX=(l0s0/2+line_width/2+b3)+p*koef;
            controlY=0;
            anchorX=l0s0+p*koef;
            anchorY=0;
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//			curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
//			curveTo(controlX, controlY, anchorX, anchorY);

            controlX=(l0s0+l0s0/2-line_width/2)+p*koef;
            controlY=0;
            anchorX=(l0s0+l0s0/2-line_width/2+b3)+p*koef;
            anchorY=C;
//			curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//			curveTo(controlX, controlY, anchorX, anchorY);

            X=(l0s0+l0s0/2-line_width/2+b3+line_width)+p*koef;
            Y=C+line_height;
//			lineTo(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
            lineToIfHit(RotateX(X, Y, Rotate)+offsetX, RotateY(X, Y, Rotate)+offsetY, Clip);
//			lineTo(X, Y);

            controlX=(l0s0+l0s0/2-line_width/2+b3*2+line_width)+p*koef;
            controlY=2*C+line_height;
            anchorX=p+p*koef;
            anchorY=2*C+line_height;
//			curveTo(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY);
            curveToIfHit(RotateX(controlX, controlY, Rotate)+offsetX, RotateY(controlX, controlY, Rotate)+offsetY, RotateX(anchorX, anchorY, Rotate)+offsetX, RotateY(anchorX, anchorY, Rotate)+offsetY, Clip);
//			curveTo(controlX, controlY, anchorX, anchorY);
        }
        drawCogs(Clip, koef-1, Rotate);
    }
}
function drawCircle (Clip : MovieClip, x:Number, y:Number, r:Number):Void {
    with( Clip )
    {
        _x=x;
        _y=y;
        moveTo (r, 0);
        curveTo (r, Math.tan(Math.PI/8)*r, Math.sin(Math.PI/4)*r, Math.sin(Math.PI/4)*r);
        curveTo (Math.tan(Math.PI/8)*r, r, 0, r);
        curveTo (-Math.tan(Math.PI/8)*r, r, -Math.sin(Math.PI/4)*r, Math.sin(Math.PI/4)*r);
        curveTo (-r, Math.tan(Math.PI/8)*r, -r, 0);
        curveTo (-r, -Math.tan(Math.PI/8)*r, -Math.sin(Math.PI/4)*r, -Math.sin(Math.PI/4)*r);
        curveTo (-Math.tan(Math.PI/8)*r, -r, 0, -r);
        curveTo (Math.tan(Math.PI/8)*r, -r, Math.sin(Math.PI/4)*r, -Math.sin(Math.PI/4)*r);
        curveTo (r, -Math.tan(Math.PI/8)*r, r, 0);
    }
}
function drawRackRuler(Clip : MovieClip, X, Y : Number, invert){
    with(Clip)
    {
        lineStyle(1, 0x000000);
        beginFill(0xFFFF00);
        moveTo(X, Y);
        lineTo(X+30, Y);
        lineTo(X+30, Y+100);
        lineTo(X, Y+100);
        endFill;

        for(i=0; i<=20; i=i+2)
        {
            if(i%5==0)
                scale_width=20;
            else
                scale_width=10;

            if(!invert)
            {
                moveX=X+30;
                lineX=X+30-scale_width;
            }
            else
            {
                moveX=X;
                lineX=X+scale_width;
            }

            moveTo(moveX, i+Y+70);
            lineTo(lineX, i+Y+70);
        }
    }
}
function moveSystem(X : Number){
    _root.rackRuler._x-=X;
    _root.rackRuler2._x-=X;
    _root.bolt1._x-=X;
    _root.bolt2._x-=X;
    _root.Rack._x-=X;
}
function drawRuler(){
    with(_root.Ruler)
    {
        lineStyle(1, 0x000000);
        beginFill(0xFFFF00);
        moveTo(-10, 0);
        lineTo(210, 0);
        lineTo(210, 30);
        lineTo(-10, 30);
        lineTo(-10, 0);

        endFill();
    }
    for(i=0; i<=200; i=i+2)
    {
        if(i%5==0)
            scale_width=10;
        else
            scale_width=5;
        _root.Ruler.moveTo(i, 0);
        _root.Ruler.lineTo(i, scale_width);
    }
}
function putStorage(){
    if(currentStorage.hitTest(_root.trash)){
        currentStorage.stopDrag();
        currentStorage._visible=false;
        if(currentStorage==_root["cellStorage"+cellNumber])
        {
            _root["cellStorage"+cellNumber].removeMovieClip();
            _root["circleMem"+cellNumber].removeMovieClip();
        }
    }
    else
    if(currentStorage.hitTest(_root.glassCircle))
    {
        if((currentStorage==_root.blankStorage) || (currentStorage==_root.fullStorage))
        {
            _root.currentStorage._visible=false;
        }
        else
        {
            currentStorage.removeMovieClip();
        }

        if(!_root["circleMem"+cellNumber] || currentStorage==_root.blankStorage)
        {
            if(currentStorage==_root.fullStorage)
            {
                _root.Circle._visible=true;
                drawed=true;
            }
            else
            {
                _root.Circle.swapDepths(this.getNextHighestDepth());
                _root.Circle.removeMovieClip();
                _root.blankCircle.duplicateMovieClip("Circle", "", this.getNextHighestDepth());
                drawed=false;
            }
            _root.blankCircle._visible=true;
            Circle.setMask( Mask );
        }
        else
        if(_root["circleMem"+cellNumber] || currentStorage==_root.fullStorage)
        {
            _root.Circle.swapDepths(this.getNextHighestDepth());
            _root.Circle.removeMovieClip();
            _root["circleMem"+cellNumber].duplicateMovieClip("Circle", "", this.getNextHighestDepth());
            _root["circleMem"+cellNumber].removeMovieClip();
            _root.blankCircle._visible=true;
            Circle.setMask( Mask );
            drawed=true;
        }

        currentStorage.stopDrag();
    }
    else
        for(i=1;i<=6;i++)
            if(currentStorage.hitTest(_root["cell"+i]) && !currentStorage.hitTest(_root["cellStorage"+i]))
            {
                cellPoint={x:0, y:0};
                _root["cell"+i].localToGlobal(cellPoint);
                if((currentStorage==_root.blankStorage) || (currentStorage==_root.fullStorage))
                {
                    currentStorage.duplicateMovieClip("cellStorage"+i, this.getNextHighestDepth());
                    currentStorage._visible=false;
                    if(currentStorage==_root.fullStorage)
                    {
                        Circle.duplicateMovieClip("circleMem"+i, this.getNextHighestDepth());
                        _root["circleMem"+i]._visible=false;
                        Circle._visible=false;
                    }
                }
                else
                if(currentStorage==_root["cellStorage"+cellNumber])
                {
                    currentStorage.duplicateMovieClip("cellStorage"+i, this.getNextHighestDepth());
                    currentStorage.removeMovieClip();

                    _root["circleMem"+cellNumber].duplicateMovieClip("circleMem"+i, this.getNextHighestDepth());
                    _root["circleMem"+i]._visible=false;
                    _root["circleMem"+cellNumber].removeMovieClip();
                }
                _root["cellStorage"+i]._x=cellPoint.x;
                _root["cellStorage"+i]._y=cellPoint.y;


                break;
            }
            else
            {
//		currentStorage._x=oldX;
//		currentStorage._y=oldY;
//		trace("I feel badly!");
                if((currentStorage==_root.blankStorage) || (currentStorage==_root.fullStorage))
                    currentStorage._visible=false;
            }
    dragging=false;
}

drawRackRuler(_root.rackRuler, -130, -30, false);
drawRackRuler(_root.rackRuler2, -45, -30, true);
circleDepth=this.getNextHighestDepth()-1;
_root.createEmptyMovieClip( "Rack", this.getNextHighestDepth()+10);

_root.blankStorage._visible=false;
_root.fullStorage._visible=false;
drawRuler();

dragging=false;
rotatingRuler=false;
dragRuler=false;
circleX=358;
circleY=154;

rackRuler.moduleTxt.text="m="+m;
rackRuler.radiusTxt.text="d="+d;

_root.Ruler._rotation=-5;
startRulerX=_root.Ruler._x;
startRulerY=_root.Ruler._y;

cf1= 180 / Math.PI;

scale=1;
//m=18*scale;
alpha=20;
C1=0.25;
C=C1*m;
ha1=1;
ha=ha1*m;
p=Math.PI*m;
l0s0=p/2;
Rof1=0.38;
Rof=Rof1*m;

total_length=2*C+2*ha;

line_height=2*ha;
line_length=line_height/(Math.cos(alpha)*Math.PI/180);

tg_grad=Math.tan(degToRad(alpha));
cos_grad=Math.cos(degToRad(alpha));
line_width=line_height*tg_grad;

b3=C*tg_grad;
c3=C/cos_grad;

with ( _root.Rack )
{
    lineStyle(2, 0x000000);

    beginFill(0xCCCCCC);
    moveTo(0, total_length);
    lineTo(0, 110);
    lineTo(p*5, 110);
    lineTo(p*5, total_length);

    drawCogs( _root.Rack, 5-1, 0);

    endFill();
    moveTo(p*5, 100);
    lineTo(p*5-20, 100);
    moveTo(0, 100);
    lineTo(20, 100);
}
//rad=120*scale;

fullRad=rad+2*m;

drawed=false;
_root.removeMovieClip("Circle");
_root.createEmptyMovieClip("Circle", circleDepth);
_root["Circle"].lineStyle(1, 0x000000);
_root["Circle"].beginFill(0xFFCC00);
drawCircle(_root["Circle"], circleX, circleY, fullRad);
_root.Circle.endFill;

_root.createEmptyMovieClip("blankCircle", circleDepth-3);
_root.blankCircle.lineStyle(1, 0x000000);
_root.blankCircle.beginFill(0xFFCC00);
drawCircle(_root.blankCircle, circleX, circleY, fullRad);
_root.blankCircle.endFill;

_root.createEmptyMovieClip("Mask", 3 );
_root.Mask.lineStyle(1, 0x000000);
_root.Mask.beginFill(0xFFCC00);
_root.Mask.endFill;
drawCircle(_root.Mask, circleX, circleY, fullRad);

_root.Rack._y=circleY+rad-line_height/2;
_root.rackRuler2._y=circleY+rad-line_height/2+50;
rackRulerY=_root.rackRuler2._y;

bolt1point = {x:0, y:total_length+10};
_root.Rack.localToGlobal(bolt1point);
_root.bolt1._y=bolt1point.y;

bolt2point = {x:0, y:total_length+10};
_root.Rack.localToGlobal(bolt2point);
_root.bolt2._y=bolt2point.y;

_root.rackRuler.swapDepths(this.getNextHighestDepth());
_root.rackRuler2.swapDepths(this.getNextHighestDepth());

_root.Ruler.swapDepths(this.getNextHighestDepth());
_root.paddle.swapDepths(this.getNextHighestDepth());

trace(_root.Circle._width);

onEnterFrame = function () {
    _root.Rack._x=_root.rackRuler._x-100;
    _root.rackRuler2._x=_root.Rack._x+p*5+45;
    _root.rackRuler2._y=rackRulerY;
    _root.rackRuler._y=rackRulerY;

    bolt1point = {x:40, y:0};
    _root.Rack.localToGlobal(bolt1point);
    _root.bolt1._x=bolt1point.x;

    bolt2point = {x:_root.Rack._width-40, y:0};
    _root.Rack.localToGlobal(bolt2point);
    _root.bolt2._x=bolt2point.x;

    _root.currentStorage.swapDepths(this.getNextHighestDepth());


    cellStorage1.onRelease = function(){
        if(!dragging)
        {
            cellNumber=1;
            currentStorage=_root.cellStorage1;
            _root.cellStorage1.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }

    cellStorage2.onRelease = function(){
        if(!dragging)
        {
            cellNumber=2;
            currentStorage=_root.cellStorage2;
            _root.cellStorage2.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }
    cellStorage3.onRelease = function(){
        if(!dragging)
        {
            cellNumber=3;
            currentStorage=_root.cellStorage3;
            _root.cellStorage3.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }
    cellStorage4.onRelease = function(){
        if(!dragging)
        {
            cellNumber=4;
            currentStorage=_root.cellStorage4;
            _root.cellStorage4.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }
    cellStorage5.onRelease = function(){
        if(!dragging)
        {
            cellNumber=5;
            currentStorage=_root.cellStorage5;
            _root.cellStorage5.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }
    cellStorage6.onRelease = function(){
        if(!dragging)
        {
            cellNumber=6;
            currentStorage=_root.cellStorage6;
            _root.cellStorage6.startDrag()
            dragging=true;
        }
        else
            putStorage();
    }
    Circle.onRelease = function() {
        //	Circle.stopDrag();
        if(!dragging)
        {
            if(drawed)
                currentStorage=_root.fullStorage;
            else
                currentStorage=_root.blankStorage;

            _root.Circle._visible=false;
            _root.blankCircle._visible=false;
            currentStorage._x=_xmouse;
            currentStorage._y=_ymouse;
            currentStorage._visible=true;
            currentStorage.startDrag();
            dragging=true;
        }
        else
            putStorage();

    }
    Ruler.onRelease = function(){
        if(!dragRuler)
        {
            Ruler.startDrag();
            dragRuler=true;
            _root.Ruler._rotation=0;
        }
        else
        {
            if(_root.Ruler.hitTest(_root.paddle))
            {
                Ruler.stopDrag();
                dragRuler=false;
                rotatingRuler=false;
                _root.Ruler._x=startRulerX;
                _root.Ruler._y=startRulerY;
                _root.Ruler._rotation=-5;

            }
            else
            {
                if(rotatingRuler)
                {
                    rotatingRuler=false;
                    Ruler.startDrag();
                }
                else
                {
                    Ruler.stopDrag();
                    rotatingRuler=true;
                }
            }
        }
    }
    if(rotatingRuler)
    {
        xm = Math.floor (_root._xmouse);
        ym = Math.floor (_root._ymouse);
        x = xm - _root.Ruler._x;
        y = ym - _root.Ruler._y;
        _root.Ruler._rotation = 0 - Math.floor (Math.atan2 (x, y) * cf1);
    }
    /*	_root.Rack.localToGlobal(bolt1point);
        _root.Rack.localToGlobal(bolt2point);
        _root.bolt1._x=bolt1point.x;
        _root.bolt2._x=bolt2point.x;
        _root.Rack.globalToLocal(bolt1point);
        _root.Rack.globalToLocal(bolt2point);*/
}

Circle.setMask( Mask );

Circle.onPress = function() {
//	Circle.startDrag();
};

Rack.onPress = function() {
//	Rack.startDrag("", true, _root.Rack._x, 0, _root.Rack._x+100, 0);
    _root.Rack.startDrag();
}
Rack.onRelease = function() {
    _root.Rack.stopDrag();
}
rackRuler.onPress = function() {
    _root.rackRuler.startDrag();
    /*	startPoint = {x:0, y:0};
    endPoint = {x:200, y:140};

    _root.rackRuler.globalToLocal(startPoint);
    _root.rackRuler.globalToLocal(endPoint);
    _root.rackRuler.startDrag(this, false, -200, 0, 400, 250);*/
//	startDrag(target, lockcenter, left, top, right, bottom);
}
rackRuler.onRelease = function() {
    _root.rackRuler.stopDrag();
}

rackRuler2.onPress = function() {
    _root.rackRuler.startDrag();
}
rackRuler2.onRelease = function() {
    _root.rackRuler.stopDrag();
}
storages.onRelease = function(){
    currentStorage = _root.blankStorage;
    currentStorage._x=_xmouse;
    currentStorage._y=_ymouse;
    currentStorage._visible=true;
    oldX=currentStorage._x;
    oldY=currentStorage._y;
    currentStorage.startDrag();
    drawed=false;
}
blankStorage.onRelease = function(){
    putStorage();
}

fullStorage.onRelease = function(){
    putStorage();
}
stop();
