on(release){

//	_root.Rack._x-=10;
    moveSystem(10);
    Circle.lineStyle(2, 0x000000);

    Circle._rotation+=5;
    _root.Circle.lineStyle(1, 0x000000);
    drawCogs(Circle, 5-1, -Circle._rotation);
}