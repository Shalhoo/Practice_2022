//
//______________________________Установление параметров для нарезки диска d и m по нажанию на кнопку_________________________________
//
document.querySelector(".createButt").onclick = function() {
    var dParam = parseInt(prompt('Укажите диаметр диска в диапазое от 130 до 230', 230))
    if (dParam >= 130 && dParam <= 230 && dParam / 10) {
        document.querySelector('#dParam').textContent = dParam
        var mParam = parseInt(prompt('Укажите модуль диска в диапазое от 13 до 23', 23))
        if (mParam >= 13 && mParam <= 23) {
            document.querySelector('#mParam').textContent = mParam
        } else {
            alert('Ведите значение модуля в диапазоне от 13 до 23')
            mParam
        }
        if (dParam % mParam) {
            alert('Введите значение диаметра кратное значению модуля')
            dParam
            mParam
        }
        } else {
            alert('Ведите значение диаметра в диапазоне от 130 до 230')
            dParam
            mParam
        }
//
//_________________________________________________________Перемещение линейки______________________________________________________
//
        document.body.append(ruler)
        ruler.onmousedown = function(event) {
            let shiftX = event.clientX - ruler.getBoundingClientRect().left
            let shiftY = event.clientY - ruler.getBoundingClientRect().top
            ruler.style.position = 'absolute'
            ruler.style.zIndex = 4000
            document.body.append(ruler)
            moveAt(event.pageX, event.pageY)

            function moveAt(pageX, pageY) {
                ruler.style.left = pageX - shiftX + 'px'
                ruler.style.top = pageY - shiftY + 'px'
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY)
            }

            document.addEventListener('mousemove', onMouseMove)

            ruler.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove)
                ruler.onmouseup = null
            }
        }

        ruler.ondragstart = function() {
            return false
        }

        let currentDroppable = null
        const blankSA = document.querySelector('.blankStorageAtt')
        blankSA.onmousedown = function(event) {
            var kik = []
            var si
            var blankS = document.createElement('g')
            blankS.innerHTML = `<svg width="42" height="51" viewBox="0 0 42 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_4_16" fill="white">
                            <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z"/>
                            </mask>
                            <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_4_16)"/>
                            </svg>`
            blankS.style.position = 'absolute'
            blankS.style.zIndex = 500
            document.body.append(blankS)
            moveAt(event.pageX, event.pageY)

            function moveAt(pageX, pageY) {
                blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
            }
//
//_________________________________________________________Мусорка________________________________________________________
//
            blankS.onmouseup = function(event) {
                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY)
                    blankS.hidden = true
                    let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
                    blankS.hidden = false
                    if (!elemBelow) return
                    let droppableBelow = elemBelow.closest('.toolsStand_garbage')
                    let creteCircle = elemBelow.closest('.machine-fullStand')
                    let standShelter = elemBelow.closest('.toolsStand-shelter')

                    if (droppableBelow) {
                        enterDroppable(currentDroppable)
                    }
                    if (!creteCircle) {
                        blankS.style.pointerEvents = 'none'
                        CreateCircle()
                    }
                    if (standShelter) {
                        blankS.style.pointerEvents = 'auto'
                        blankS.onmouseup = function() {
                            document.removeEventListener('mousemove', onMouseMove)
                            blankS.onmouseup = null
                            blankS.style.transform = "scale(0.8)"
                            mask.remove()
                            line.remove()
                            blankS.style.pointerEvents.auto = true
                            blankS.onmouseup = function() {
                                document.addEventListener('mousemove', onMouseMove)
                                blankS.onmouseup = null
                                blankS.style.transform = "scale(1)"
                                drawLine(lineMove())
                                document.body.append(blankS)
                                moveAt(event.pageX, event.pageY)

                                function moveAt(pageX, pageY) {
                                    blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                                    blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
                                }
                                change()
                            }
                        }
                    }
                }
                document.addEventListener('mousemove', onMouseMove)
                var line = document.createElement('g')
//
//_________________________________________________________Отрисовка рейки  зубьями________________________________________________________
//
               function drawLine() {
                    var lineHeightH = new Map([
                        [23, 52],
                        [22, 58],
                        [21, 64],
                        [20, 71],
                        [19, 78],
                        [18, 85],
                        [17, 94],
                        [16, 99],
                        [15, 106],
                        [14, 118],
                        [13, 124]
                    ])

                    var lineHeight,
                    Cpar = 0.25 * mParam,
                    p = Math.PI * mParam,
                    pDelTwo = p / 2,
                    fourth = pDelTwo / 4,
                    sixth = pDelTwo / 6,
                    Rof = 0.38 * mParam,
                    totalLength = 2 * Cpar + 2 * mParam,
                    //s - small, m - middle
                    sYParam = 50 - Cpar,
                    mYParam = 50 - totalLength,
                    yParam = 50 - (Cpar + 2 * mParam)

                    for (let pair of lineHeightH.entries()) {
                        if (pair[0] == mParam) {
                            lineHeight = pair[1] + 50
                        }
                    } 

                    //первая строчка паса-линия снизу, вторая-полувершина, третья-вторая часть вершины, четвертая-первая часть впадины, пятая-впадина
                    line.innerHTML = `
                    <svg width="313" height="${lineHeight + 20}" viewBox="0 0 313 ${lineHeight}" xmlns="http://www.w3.org/2000/svg" class="machine-line line poi">
                    <path d="M0 50 L0 ${lineHeight} L313 ${lineHeight} L313 50" fill="url(#paint0_linear_18_84)" stroke="black" stroke-width="0.5"/>
                    <path d="M0 ${lineHeight - 25}L10 ${lineHeight - 25}" stroke="black"/>
                    <path d="M303 ${lineHeight - 25}L313 ${lineHeight - 25} M0,50" stroke="black"/>

                    <path d="M0,50 C0,50 ${Rof},50 ${sixth},${sYParam} 
                    L${sixth * 2 + fourth},${yParam}
                    C${sixth * 2 + fourth},${yParam} ${sixth * 3.5 + fourth - Rof},${mYParam} ${sixth * 3.5 + fourth},${mYParam} 
                    C${sixth * 3.5 + fourth},${mYParam} ${sixth * 3.5 + fourth + Rof},${mYParam} ${sixth * 5 + fourth},${yParam}

                    L${sixth * 6 + fourth * 2},${sYParam} 
                    C${sixth * 6 + fourth * 2},${sYParam} ${sixth * 7 + fourth * 2 - Rof},50 ${sixth * 7 + fourth * 2},50 
                    C${sixth * 7 + fourth * 2},50 ${sixth * 7 + fourth * 2 + Rof},50 ${sixth * 8 + fourth * 2},${sYParam}

                    L${sixth * 9 + fourth * 3},${yParam}
                    C${sixth * 9 + fourth * 3},${yParam} ${sixth * 10.5 + fourth * 3 - Rof},${mYParam} ${sixth * 10.5 + fourth * 3},${mYParam}
                    C${sixth * 10.5 + fourth * 3},${mYParam} ${sixth * 10.5 + fourth * 3 + Rof},${mYParam} ${sixth * 12 + fourth * 3},${yParam}

                    L${sixth * 13 + fourth * 4},${sYParam} 
                    C${sixth * 13 + fourth * 4},${sYParam} ${sixth * 14 + fourth * 4 - Rof},50 ${sixth * 14 + fourth * 4},50
                    C${sixth * 14 + fourth * 4},50 ${sixth * 14 + fourth * 4 + Rof},50 ${sixth * 15 + fourth * 4},${sYParam}

                    L${sixth * 16 + fourth * 5},${yParam}
                    C${sixth * 16 + fourth * 5},${yParam} ${sixth * 17.5 + fourth * 5 - Rof},${mYParam} ${sixth * 17.5 + fourth * 5},${mYParam}
                    C${sixth * 17.5 + fourth * 5},${mYParam} ${sixth * 17.5 + fourth * 5 + Rof},${mYParam} ${sixth * 19 + fourth * 5},${yParam}

                    L${sixth * 20 + fourth * 6},${sYParam}
                    C${sixth * 20 + fourth * 6},${sYParam} ${sixth * 21 + fourth * 6 - Rof},50 ${sixth * 21 + fourth * 6},50
                    C${sixth * 21 + fourth * 6},50 ${sixth * 21 + fourth * 6 + Rof},50 ${sixth * 22 + fourth * 6},${sYParam}

                    L${sixth * 23 + fourth * 7},${yParam}
                    C${sixth * 23 + fourth * 7},${yParam} ${sixth * 24.5 + fourth * 7 - Rof},${mYParam} ${sixth * 24.5 + fourth * 7},${mYParam}
                    C${sixth * 24.5 + fourth * 7},${mYParam} ${sixth * 24.5 + fourth * 7 + Rof},${mYParam} ${sixth * 26 + fourth * 7},${yParam}

                    L${sixth * 27 + fourth * 8},${sYParam}
                    C${sixth * 27 + fourth * 8},${sYParam} ${sixth * 28 + fourth * 8 - Rof},50 ${sixth * 28 + fourth * 8},50
                    C${sixth * 28 + fourth * 8},50 ${sixth * 28 + fourth * 8 + Rof},50 ${sixth * 29 + fourth * 8},${sYParam}

                    L${sixth * 30 + fourth * 9},${yParam}
                    C${sixth * 30 + fourth * 9},${yParam} ${sixth * 31.5 + fourth * 9 - Rof},${mYParam} ${sixth * 31.5 + fourth * 9},${mYParam}
                    C${sixth * 31.5 + fourth * 9},${mYParam} ${sixth * 31.5 + fourth * 9 + Rof},${mYParam} ${sixth * 33 + fourth * 9},${yParam}

                    L${sixth * 34 + fourth * 10},${sYParam}
                    C${sixth * 34 + fourth * 10},${sYParam} ${sixth * 35 + fourth * 10 - Rof},50 ${sixth * 35 + fourth * 10},50
                    C${sixth * 35 + fourth * 10},50 ${sixth * 35 + fourth * 10 + Rof},50 ${sixth * 36 + fourth * 10},${sYParam}

                    L${sixth * 37 + fourth * 11},${yParam}
                    C${sixth * 37 + fourth * 11},${yParam} ${sixth * 38.5 + fourth * 11 - Rof},${mYParam} ${sixth * 38.5 + fourth * 11},${mYParam}
                    C${sixth * 38.5 + fourth * 11},${mYParam} ${sixth * 38.5 + fourth * 11 + Rof},${mYParam} ${sixth * 40 + fourth * 11},${yParam}

                    L${sixth * 41 + fourth * 12},${sYParam}
                    C${sixth * 41 + fourth * 12},${sYParam} ${sixth * 42 + fourth * 12 - Rof},50 ${sixth * 42 + fourth * 12},50
                    C${sixth * 42 + fourth * 12},50 ${sixth * 42 + fourth * 12 + Rof},50 ${sixth * 43 + fourth * 12},${sYParam}

                    L${sixth * 44 + fourth * 13},${yParam}
                    C${sixth * 44 + fourth * 13},${yParam} ${sixth * 45.5 + fourth * 13 - Rof},${mYParam} ${sixth * 45.5 + fourth * 13},${mYParam}
                    C${sixth * 45.5 + fourth * 13},${mYParam} ${sixth * 45.5 + fourth * 13 + Rof},${mYParam} ${sixth * 47 + fourth * 13},${yParam}

                    L${sixth * 48 + fourth * 14},${sYParam}
                    C${sixth * 48 + fourth * 14},${sYParam} ${sixth * 49 + fourth * 14 - Rof},50 ${sixth * 49 + fourth * 14},50
                    C${sixth * 49 + fourth * 14},50 ${sixth * 49 + fourth * 14 + Rof},50 ${sixth * 50 + fourth * 14},${sYParam}

                    L${sixth * 51 + fourth * 15},${51 - (Cpar + 2 * mParam)}
                    C${sixth * 51 + fourth * 15},${51 - (Cpar + 2 * mParam)} ${sixth * 52.5 + fourth * 15 - Rof},${mYParam} ${sixth * 52.5 + fourth * 15},${mYParam}
                    C${sixth * 52.5 + fourth * 15},${mYParam} ${sixth * 52.5 + fourth * 15 + Rof},${mYParam} ${sixth * 54 + fourth * 15},${yParam}

                    L${sixth * 55 + fourth * 16},${sYParam}
                    C${sixth * 55 + fourth * 16},${sYParam} ${sixth * 56 + fourth * 16 - Rof},50 ${sixth * 56 + fourth * 16},50
                    C${sixth * 56 + fourth * 16},50 ${sixth * 56 + fourth * 16 + Rof},50 ${sixth * 57 + fourth * 16},${sYParam}

                    L${sixth * 58 + fourth * 17},${yParam}
                    C${sixth * 58 + fourth * 17},${yParam} ${sixth * 59.5 + fourth * 17 - Rof},${mYParam} ${sixth * 59.5 + fourth * 17},${mYParam}
                    C${sixth * 59.5 + fourth * 17},${mYParam} ${sixth * 59.5 + fourth * 17 + Rof},${mYParam} ${sixth * 61 + fourth * 17},${yParam}

                    L${sixth * 62 + fourth * 18},${sYParam}
                    C${sixth * 62 + fourth * 18},${sYParam} ${sixth * 63 + fourth * 18 - Rof},50 ${sixth * 63 + fourth * 18},50
                    C${sixth * 63 + fourth * 18},50 ${sixth * 63 + fourth * 18 + Rof},50 ${sixth * 64 + fourth * 18},${sYParam}

                    L${sixth * 65 + fourth * 19},${yParam} L${sixth * 65 + fourth * 19},50" fill="url(#paint0_linear_18_84)" stroke="black" stroke-width="0.5""/>

                    <defs>
                        <linearGradient id="paint0_linear_18_84" x1="0.493751" y1="33" x2="313.494" y2="33" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#D5DEE7"/>
                        <stop offset="0.5" stop-color="#E8EBF2"/>
                        <stop offset="1" stop-color="#E2E7ED"/>
                        </linearGradient>
                    </defs>
                    </svg>`

                    var shiftX = 178 + "px",
                        shiftX1 = 0 + "px"
                    fullLine.style.left = shiftX
                    line.style.left = shiftX1
                    line.style.top = 100 + "px"

                    document.body.append(line)
                    line.style.position = 'absolute'
                    line.style.zIndex = 3000
                }

                function lineMove() {
                    line.onmousedown = function(event) {
                        let shiftY = event.clientY - line.getBoundingClientRect().top
                        moveAt(event.pageX, event.pageY)

                        function moveAt(pageX, pageY) {
                            line.style.top = pageY - shiftY + 'px'
                        }
                        function onMouseMove(event) {
                            moveAt(event.pageX, event.pageY)
                            line.hidden = true
                            let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
                            line.hidden = false
                            if (!elemBelow) return
                        }

                        document.addEventListener('mousemove', onMouseMove)
                        line.onmouseup = function() {
                            document.removeEventListener('mousemove', onMouseMove)
                            line.onmouseup = null
                        }
                    }

                    line.ondragstart = function() {
                        return false
                    }
                }

                drawLine(lineMove())
                toolsStand_shelter.onmouseup = function() {
                    blankS.style.pointerEvents = 'auto'
                }
                document.addEventListener('mousemove', onMouseMove)
                blankS.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove)
                    blankS.onmouseup = null
                }

                function enterDroppable() {
                    (blankS).remove()
                    line.remove()
                }

                change()
//
//____________________________________________________Рычаг и педаль____________________________________________________________________
//
                function change() {
                    lever.onmousedown = () => {
                        let shiftX = fullLine.getBoundingClientRect().left,
                            shiftX1 = line.getBoundingClientRect().left
                        document.getElementById("lever").style.transform = "rotate(30deg)"
                        document.getElementById("lever").style.transformOrigin = "15% 85%"

                            if (mParam == 23) {
                                fullLine.style.left = shiftX + (313 / 5.2) + 'px'
                                line.style.left = shiftX1 + (313 / 5.2) + 'px'
                            } if (mParam == 22) {
                                fullLine.style.left = shiftX + (313 / 5.5) + 'px'
                                line.style.left = shiftX1 + (313 / 5.5) + 'px'
                            } if (mParam == 21) {
                                fullLine.style.left = shiftX + (313 / 5.75) + 'px'
                                line.style.left = shiftX1 + (313 / 5.75) + 'px'
                            } if (mParam == 20) {
                                fullLine.style.left = shiftX + (313 / 6) + 'px'
                                line.style.left = shiftX1 + (313 / 6) + 'px'
                            } if (mParam == 19) {
                                fullLine.style.left = shiftX + (313 / 6.25) + 'px'
                                line.style.left = shiftX1 + (313 / 6.25) + 'px'
                            } if (mParam == 18) {
                                fullLine.style.left = shiftX + (313 / 6.75) + 'px'
                                line.style.left = shiftX1 + (313 / 6.75) + 'px'
                            } if (mParam == 17) {
                                fullLine.style.left = shiftX + (313 / 7) + 'px'
                                line.style.left = shiftX1 + (313 / 7) + 'px'
                            } if (mParam == 16) {
                                fullLine.style.left = shiftX + (313 / 7.5) + 'px'
                                line.style.left = shiftX1 + (313 / 7.5) + 'px'
                            } if (mParam == 15) {
                                fullLine.style.left = shiftX + (313 / 8) + 'px'
                                line.style.left = shiftX1 + (313 / 8) + 'px'
                            } if (mParam == 14) {
                                fullLine.style.left = shiftX + (313 / 8.5) + 'px'
                                line.style.left = shiftX1 + (313 / 8.5) + 'px'
                            } if (mParam == 13) {
                                fullLine.style.left = shiftX + (313 / 9.25) + 'px'
                                line.style.left = shiftX1 + (313 / 9.25) + 'px'
                            }
                        }

                    function levFunc() {
                        lever.onmouseup = () => {
                            document.getElementById("lever").style.transform = "rotate(360deg)"
                            document.getElementById("lever").style.transformOrigin = "15% 85%"
                        }
                    }
                    levFunc()

                    pedal.onmouseup = function() {
                        si = document.createElement('g')
                        var angle = 10,
                        shiftX2 = line.getBoundingClientRect().left,
                        shiftY2 = line.getBoundingClientRect().top + 156,
                        Cpar = 0.25 * mParam,
                        p = Math.PI * mParam,
                        pDelTwo = p / 2,
                        fourth = pDelTwo / 4,
                        sixth = pDelTwo / 6,
                        Rof = 0.38 * mParam,
                        totalLength = 2 * Cpar + 2 * mParam,
                        //Sm - Small, M - Middle, sec - second
                        secYParam = shiftY2 - (Cpar + 2 * mParam),
                        secMYParam = shiftY2 - totalLength,
                        secSmYParam = shiftY2 - Cpar

                        si.innerHTML = `<svg width="313" height="300"  xmlns="http://www.w3.org/2000/svg" id="ggg"  clip-path="url(#cut-off-bottom)" class = "ggg">
                        <path d="
                    
                    M${shiftX2},${shiftY2} C${shiftX2},${shiftY2} ${shiftX2 + Rof},${shiftY2} ${shiftX2 + sixth},${secSmYParam} 
                    L${shiftX2 + sixth * 2 + fourth},${secYParam}
                    C${shiftX2 + sixth * 2 + fourth},${secYParam} ${shiftX2 + sixth * 3.5 + fourth - Rof},${secMYParam} ${shiftX2 + sixth * 3.5 + fourth},${secMYParam} 
                    C${shiftX2 + sixth * 3.5 + fourth},${secMYParam} ${shiftX2 + sixth * 3.5 + fourth + Rof},${secMYParam} ${shiftX2 + sixth * 5 + fourth},${secYParam}

                    L${shiftX2 + sixth * 6 + fourth * 2},${secSmYParam} 
                    C${shiftX2 + sixth * 6 + fourth * 2},${secSmYParam} ${shiftX2 + sixth * 7 + fourth * 2 - Rof},${shiftY2} ${shiftX2 + sixth * 7 + fourth * 2},${shiftY2} 
                    C${shiftX2 + sixth * 7 + fourth * 2},${shiftY2} ${shiftX2 + sixth * 7 + fourth * 2 + Rof},${shiftY2} ${shiftX2 + sixth * 8 + fourth * 2},${secSmYParam}

                    L${shiftX2 + sixth * 9 + fourth * 3},${secYParam}
                    C${shiftX2 + sixth * 9 + fourth * 3},${secYParam} ${shiftX2 + sixth * 10.5 + fourth * 3 - Rof},${secMYParam} ${shiftX2 + sixth * 10.5 + fourth * 3},${secMYParam}
                    C${shiftX2 + sixth * 10.5 + fourth * 3},${secMYParam} ${shiftX2 + sixth * 10.5 + fourth * 3 + Rof},${secMYParam} ${shiftX2 + sixth * 12 + fourth * 3},${secYParam}

                    L${shiftX2 + sixth * 13 + fourth * 4},${secSmYParam} 
                    C${shiftX2 + sixth * 13 + fourth * 4},${secSmYParam} ${shiftX2 + sixth * 14 + fourth * 4 - Rof},${shiftY2} ${shiftX2 + sixth * 14 + fourth * 4},${shiftY2}
                    C${shiftX2 + sixth * 14 + fourth * 4},${shiftY2} ${shiftX2 + sixth * 14 + fourth * 4 + Rof},${shiftY2} ${shiftX2 + sixth * 15 + fourth * 4},${secSmYParam}

                    L${shiftX2 + sixth * 16 + fourth * 5},${secYParam}
                    C${shiftX2 + sixth * 16 + fourth * 5},${secYParam} ${shiftX2 + sixth * 17.5 + fourth * 5 - Rof},${secMYParam} ${shiftX2 + sixth * 17.5 + fourth * 5},${secMYParam}
                    C${shiftX2 + sixth * 17.5 + fourth * 5},${secMYParam} ${shiftX2 + sixth * 17.5 + fourth * 5 + Rof},${secMYParam} ${shiftX2 + sixth * 19 + fourth * 5},${secYParam}

                    L${shiftX2 + sixth * 20 + fourth * 6},${secSmYParam}
                    C${shiftX2 + sixth * 20 + fourth * 6},${secSmYParam} ${shiftX2 + sixth * 21 + fourth * 6 - Rof},${shiftY2} ${shiftX2 + sixth * 21 + fourth * 6},${shiftY2}
                    C${shiftX2 + sixth * 21 + fourth * 6},${shiftY2} ${shiftX2 + sixth * 21 + fourth * 6 + Rof},${shiftY2} ${shiftX2 + sixth * 22 + fourth * 6},${secSmYParam}

                    L${shiftX2 + sixth * 23 + fourth * 7},${secYParam}
                    C${shiftX2 + sixth * 23 + fourth * 7},${secYParam} ${shiftX2 + sixth * 24.5 + fourth * 7 - Rof},${secMYParam} ${shiftX2 + sixth * 24.5 + fourth * 7},${secMYParam}
                    C${shiftX2 + sixth * 24.5 + fourth * 7},${secMYParam} ${shiftX2 + sixth * 24.5 + fourth * 7 + Rof},${secMYParam} ${shiftX2 + sixth * 26 + fourth * 7},${secYParam}

                    L${shiftX2 + sixth * 27 + fourth * 8},${secSmYParam}
                    C${shiftX2 + sixth * 27 + fourth * 8},${secSmYParam} ${shiftX2 + sixth * 28 + fourth * 8 - Rof},${shiftY2} ${shiftX2 + sixth * 28 + fourth * 8},${shiftY2}
                    C${shiftX2 + sixth * 28 + fourth * 8},${shiftY2} ${shiftX2 + sixth * 28 + fourth * 8 + Rof},${shiftY2} ${shiftX2 + sixth * 29 + fourth * 8},${secSmYParam}

                    L${shiftX2 + sixth * 30 + fourth * 9},${secYParam}
                    C${shiftX2 + sixth * 30 + fourth * 9},${secYParam} ${shiftX2 + sixth * 31.5 + fourth * 9 - Rof},${secMYParam} ${shiftX2 + sixth * 31.5 + fourth * 9},${secMYParam}
                    C${shiftX2 + sixth * 31.5 + fourth * 9},${secMYParam} ${shiftX2 + sixth * 31.5 + fourth * 9 + Rof},${secMYParam} ${shiftX2 + sixth * 33 + fourth * 9},${secYParam}

                    L${shiftX2 + sixth * 34 + fourth * 10},${secSmYParam}
                    C${shiftX2 + sixth * 34 + fourth * 10},${secSmYParam} ${shiftX2 + sixth * 35 + fourth * 10 - Rof},${shiftY2} ${shiftX2 + sixth * 35 + fourth * 10},${shiftY2}
                    C${shiftX2 + sixth * 35 + fourth * 10},${shiftY2} ${shiftX2 + sixth * 35 + fourth * 10 + Rof},${shiftY2} ${shiftX2 + sixth * 36 + fourth * 10},${secSmYParam}

                    L${shiftX2 + sixth * 37 + fourth * 11},${secYParam}
                    C${shiftX2 + sixth * 37 + fourth * 11},${secYParam} ${shiftX2 + sixth * 38.5 + fourth * 11 - Rof},${secMYParam} ${shiftX2 + sixth * 38.5 + fourth * 11},${secMYParam}
                    C${shiftX2 + sixth * 38.5 + fourth * 11},${secMYParam} ${shiftX2 + sixth * 38.5 + fourth * 11 + Rof},${secMYParam} ${shiftX2 + sixth * 40 + fourth * 11},${secYParam}

                    L${shiftX2 + sixth * 41 + fourth * 12},${secSmYParam}
                    C${shiftX2 + sixth * 41 + fourth * 12},${secSmYParam} ${shiftX2 + sixth * 42 + fourth * 12 - Rof},${shiftY2} ${shiftX2 + sixth * 42 + fourth * 12},${shiftY2}
                    C${shiftX2 + sixth * 42 + fourth * 12},${shiftY2} ${shiftX2 + sixth * 42 + fourth * 12 + Rof},${shiftY2} ${shiftX2 + sixth * 43 + fourth * 12},${secSmYParam}

                    L${shiftX2 + sixth * 44 + fourth * 13},${secYParam}
                    C${shiftX2 + sixth * 44 + fourth * 13},${secYParam} ${shiftX2 + sixth * 45.5 + fourth * 13 - Rof},${secMYParam} ${shiftX2 + sixth * 45.5 + fourth * 13},${secMYParam}
                    C${shiftX2 + sixth * 45.5 + fourth * 13},${secMYParam} ${shiftX2 + sixth * 45.5 + fourth * 13 + Rof},${secMYParam} ${shiftX2 + sixth * 47 + fourth * 13},${secYParam}

                    L${shiftX2 + sixth * 48 + fourth * 14},${secSmYParam}
                    C${shiftX2 + sixth * 48 + fourth * 14},${secSmYParam} ${shiftX2 + sixth * 49 + fourth * 14 - Rof},${shiftY2} ${shiftX2 + sixth * 49 + fourth * 14},${shiftY2}
                    C${shiftX2 + sixth * 49 + fourth * 14},${shiftY2} ${shiftX2 + sixth * 49 + fourth * 14 + Rof},${shiftY2} ${shiftX2 + sixth * 50 + fourth * 14},${secSmYParam}

                    L${shiftX2 + sixth * 51 + fourth * 15},${shiftY2 + 146 + 51 - (Cpar + 2 * mParam)}
                    C${shiftX2 + sixth * 51 + fourth * 15},${shiftY2 + 146 + 51 - (Cpar + 2 * mParam)} ${shiftX2 + sixth * 52.5 + fourth * 15 - Rof},${secMYParam} ${shiftX2 + sixth * 52.5 + fourth * 15},${secMYParam}
                    C${shiftX2 + sixth * 52.5 + fourth * 15},${secMYParam} ${shiftX2 + sixth * 52.5 + fourth * 15 + Rof},${secMYParam} ${shiftX2 + sixth * 54 + fourth * 15},${secYParam}

                    L${shiftX2 + sixth * 55 + fourth * 16},${secSmYParam}
                    C${shiftX2 + sixth * 55 + fourth * 16},${secSmYParam} ${shiftX2 + sixth * 56 + fourth * 16 - Rof},${shiftY2} ${shiftX2 + sixth * 56 + fourth * 16},${shiftY2}
                    C${shiftX2 + sixth * 56 + fourth * 16},${shiftY2} ${shiftX2 + sixth * 56 + fourth * 16 + Rof},${shiftY2} ${shiftX2 + sixth * 57 + fourth * 16},${secSmYParam}

                    L${shiftX2 + sixth * 58 + fourth * 17},${secYParam}
                    C${shiftX2 + sixth * 58 + fourth * 17},${secYParam} ${shiftX2 + sixth * 59.5 + fourth * 17 - Rof},${secMYParam} ${shiftX2 + sixth * 59.5 + fourth * 17},${secMYParam}
                    C${shiftX2 + sixth * 59.5 + fourth * 17},${secMYParam} ${shiftX2 + sixth * 59.5 + fourth * 17 + Rof},${secMYParam} ${shiftX2 + sixth * 61 + fourth * 17},${secYParam}

                    L${shiftX2 + sixth * 62 + fourth * 18},${secSmYParam}
                    C${shiftX2 + sixth * 62 + fourth * 18},${secSmYParam} ${shiftX2 + sixth * 63 + fourth * 18 - Rof},${shiftY2} ${shiftX2 + sixth * 63 + fourth * 18},${shiftY2}
                    C${shiftX2 + sixth * 63 + fourth * 18},${shiftY2} ${shiftX2 + sixth * 63 + fourth * 18 + Rof},${shiftY2} ${shiftX2 + sixth * 64 + fourth * 18},${secSmYParam}

                    L${shiftX2 + sixth * 65 + fourth * 19},${secYParam} L${shiftX2 + sixth * 65 + fourth * 19},${shiftY2}" style="stroke:black; stroke-width:1; fill:none;""/>

                    </svg>`

                        console.log(dParam)
                        document.body.append(si)
                        si.style.position = 'absolute'
                        si.style.left = 258 + 'px'
                        si.style.top = 170 + 'px'
                        si.style.zIndex = 101
                        si.style.pointerEvents = 'none'
                        blankS.style.transform = 300
                        rotateSin(angle)
                        kik.push(si)
                        console.log(kik)
                        document.getElementById("pedal").style.transform = "rotate(360deg)"
                    }

                    function rotateSin(angle) {
                        for (var n = kik.length - 1; n >= 0; n--) {
                            kik[n].style.transformOrigin = "156.9px 123px"
                            kik[n].style.transform = "rotate(" + angle + "deg)"
                            angle = ((angle + 5))
                          
                        }
                        cca++
                        console.log(cca)
                    }
                    pedal.onmousedown = () => {
                        var shiftX = fullLine.getBoundingClientRect().left,
                            shiftX1 = line.getBoundingClientRect().left
                        document.getElementById("pedal").style.transform = "rotate(355deg)"
                        if (mParam == 23) {
                            fullLine.style.left = shiftX - (1011.08 / 120.5) + 'px'
                            line.style.left = shiftX1 - (1011.08 / 120.5) + 'px'
                        } if (mParam == 22) {
                            fullLine.style.left = shiftX - (722.56631 / 81.325) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 81.325) + 'px'
                        } if (mParam == 21) {
                            fullLine.style.left = shiftX - (722.56631 / 76.825) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 76.825) + 'px'
                        } if (mParam == 20) {
                            fullLine.style.left = shiftX - (722.56631 / 92.325) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 92.325) + 'px'
                        } if (mParam == 19) {
                            fullLine.style.left = shiftX - (722.56631 / 98.825) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 98.825) + 'px'
                        } if (mParam == 18) {
                            fullLine.style.left = shiftX - (722.56631 / 103.325) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 103.325) + 'px'
                        } if (mParam == 17) {
                            fullLine.style.left = shiftX - (722.56631 / 108.825) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 108.825) + 'px'
                        } if (mParam == 16) {
                            fullLine.style.left = shiftX - (722.56631 / 114.325) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 114.325) + 'px'
                        } if (mParam == 15) {
                            fullLine.style.left = shiftX - (722.56631 / 119.825) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 119.825) + 'px'
                        } if (mParam == 14) {
                            fullLine.style.left = shiftX - (722.56631 / 125.325) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 125.325) + 'px'
                        } if (mParam == 13) {
                            fullLine.style.left = shiftX - (722.56631 / 130.825) + 'px'
                            line.style.left = shiftX1 - (722.56631 / 130.825) + 'px'
                        }
                    }
                }
                var mask = document.createElement('g')

                function CreateCircle() {
                    fullStand.onmouseup = function() {
                            document.removeEventListener('mousemove', onMouseMove)
                            cca = 0
                            blankS.onmouseup = null
                            blankS.innerHTML = `<svg width="${1.4*dParam}" height="${1.4*dParam}" viewBox="0 0 ${dParam} ${dParam}" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="${dParam / 2}" cy="${dParam / 2}" r="${dParam / 2}" id = "gg" fill="#ECCF38" stroke="black" stroke-width="0.5"/>
                                </svg>`

                            let leftv = 300 + (230 - 1.4 * dParam) / 2
                            let topv = 178 + (230 - 1.4 * dParam) / 2
                            blankS.style.position = 'absolute'
                            blankS.style.left = leftv + `px`
                            blankS.style.top = topv + `px`
                            blankS.style.zIndex = 100
                            blankS.style.transform = 300
                            let shiftX = 178 + "px"
                            let shiftX1 = 0 + "px"
                            fullLine.style.left = shiftX
                            line.style.left = shiftX1
                            blankS.style.pointerEvents = 'auto'

                            mask.innerHTML = `<svg width="313" height="300" fill="url(#paint0_linear_18_84)" stroke="black" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg" id="aaa"  clip-path="url(#cut-off-bottom)" class = "ggg">
                                <clipPath id="cut-off-bottom"> 
                                    <circle cx="156.9" cy="123" r="${(1.4*dParam / 2)}" fill-rule="evenodd" />
                                </clipPath>
                                </svg>`

                            console.log(dParam)
                            document.body.append(mask)
                            mask.style.position = 'absolute'
                            mask.style.left = 258 + 'px'
                            mask.style.top = 170 + 'px'
                            mask.style.zIndex = 200
                            mask.style.pointerEvents = 'none'
                            openSin()

                            function openSin() {
                                for (var n = kik.length - 1; n >= 0; n--) {
                                    // kik[n].style.transformOrigin = ((dParam / 2)+57) + "px" + " " + ((dParam / 2)+24) + "px"
                                    kik[n].style.opacity = 1
                                }
                            }

                            blankS.onmouseup = function() {
                                if (kik.length == 0) {
                                    document.removeEventListener('mousemove', onMouseMove)
                                    blankS.onmouseup = null
                                    blankS.innerHTML = `<svg width="42" height="51" viewBox="0 0 42 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="path-1-inside-1_4_16" fill="white">
                                            <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z"/>
                                        </mask>
                                        <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_4_16)"/>
                                        </svg>`

                                    blankS.style.position = 'absolute'
                                    blankS.style.zIndex = 1000
                                    blankS.style.transform = 300
                                    mask.remove()
                                    deleteSin()

                                    function deleteSin() {
                                        for (var n = kik.length - 1; n >= 0; n--) {
                                            kik[n].style.opacity = 0
                                        }
                                    }

                                    document.body.append(blankS)
                                    moveAt(event.pageX, event.pageY)

                                    function moveAt(pageX, pageY) {
                                        blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                                        blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
                                    }
                                }

                                if (kik.length >= 1) {
                                    document.removeEventListener('mousemove', onMouseMove)
                                    blankS.onmouseup = null
                                    blankS.innerHTML = `<svg width="92" height="102" viewBox="0 0 92 102" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                        <mask id="path-1-inside-1_4_23" fill="white">
                                            <path d="M58.8687 60.0312C50.4129 73.052 37.4258 79.625 29.861 74.7124C22.2963 69.7998 23.0187 55.2619 31.4744 42.2412C39.9302 29.2204 52.9174 22.6474 60.4821 27.56C68.0469 32.4726 67.3245 47.0105 58.8687 60.0312ZM43.7434 50.2087C42.8617 51.5664 42.7864 53.0822 43.5752 53.5945C44.3639 54.1067 45.7181 53.4213 46.5998 52.0637C47.4815 50.706 47.5568 49.1902 46.768 48.6779C45.9792 48.1657 44.6251 48.8511 43.7434 50.2087Z"/>
                                        </mask>
                                        <path d="M58.8687 60.0312C50.4129 73.052 37.4258 79.625 29.861 74.7124C22.2963 69.7998 23.0187 55.2619 31.4744 42.2412C39.9302 29.2204 52.9174 22.6474 60.4821 27.56C68.0469 32.4726 67.3245 47.0105 58.8687 60.0312ZM43.7434 50.2087C42.8617 51.5664 42.7864 53.0822 43.5752 53.5945C44.3639 54.1067 45.7181 53.4213 46.5998 52.0637C47.4815 50.706 47.5568 49.1902 46.768 48.6779C45.9792 48.1657 44.6251 48.8511 43.7434 50.2087Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_4_23)"/>
                                        <path d="M46.9142 70.1574L46.9138 70.1703L46.9147 70.1831C47.1 72.7392 43.6062 73.6516 42.5181 71.3312L42.3974 71.0738C41.7641 69.1008 38.8692 69.4206 38.6889 71.4934L38.4161 74.6311C38.1106 76.2299 35.8001 76.188 35.5572 74.5725L35.3614 73.2698C35.3491 73.1877 35.3429 73.1042 35.3429 73.021C35.3429 70.76 32.5434 69.6663 31.037 71.3669L30.4865 71.9884C28.6578 73.6175 25.9824 71.3364 27.3114 69.2705L29.5666 65.7648C30.5492 64.2374 28.9635 62.3597 27.2931 63.0727C25.8032 63.7088 24.6698 61.651 26.0038 60.7317L30.8485 57.3934C32.6406 56.1585 32.0337 53.3718 29.8904 52.994L29.3753 52.9031C26.9953 52.4835 27.0151 49.0615 29.3998 48.6695L32.3149 48.1903C34.5603 47.8213 35.6021 45.192 34.219 43.3852L33.6902 42.6943C32.1073 40.6264 34.5613 37.901 36.7832 39.2591L37.095 39.4497C38.8583 40.5275 41.1212 39.2584 41.1212 37.1919L41.1212 32.627C41.1212 30.9786 43.4406 30.6207 43.9375 32.1923C44.5259 34.0534 47.1841 33.9804 47.6695 32.0899L48.6836 28.1405C49.1601 26.2847 51.8922 26.6299 51.8922 28.5459L51.8922 29.8313C51.8922 31.5406 54.1033 32.2199 55.063 30.8054L55.0695 30.7958L55.0751 30.7856L56.7322 27.7753C57.5861 26.2242 59.9508 27.1857 59.4799 28.8926C59.4476 29.0098 59.4011 29.1225 59.3414 29.2284L58.7663 30.2493C57.6541 32.2236 59.8966 34.3847 61.8284 33.2003C63.5915 32.1193 65.388 34.5339 63.8459 35.912L61.1522 38.3191C59.4486 39.8414 60.6297 42.6583 62.9096 42.5104C65.0377 42.3723 65.749 45.302 63.7946 46.1551L59.8175 47.8912C57.7018 48.8148 57.5185 51.7449 59.5026 52.925C61.7453 54.2589 60.4425 57.7076 57.878 57.2255L56.721 57.0081C54.5228 56.5949 52.7056 58.7229 53.4578 60.8293L54.4292 63.5496C55.1345 65.5247 52.5652 66.9964 51.2184 65.3888C49.8143 63.7129 47.0831 64.6586 47.016 66.844L46.9142 70.1574Z" stroke="black" stroke-width="0.5"/>
                                        <path d="M61.278 29.6901C61.9193 29.0275 62.959 29.8821 62.433 30.6395L58.1095 36.8654C57.5197 37.7147 58.1574 38.8721 59.1905 38.8272L64.4747 38.5975C65.264 38.5631 65.563 39.6151 64.8737 40.0011L57.2726 44.2578C56.521 44.6786 56.4104 45.7158 57.0563 46.2857L62.2059 50.8295C62.7496 51.3092 62.3638 52.2045 61.6417 52.1388L55.3834 51.5689C54.4383 51.4828 53.7458 52.4398 54.123 53.3106L57.3066 60.6602C57.588 61.3098 56.8955 61.9517 56.2691 61.622L51.105 58.904C50.1811 58.4178 49.1036 59.2113 49.2937 60.2378L50.8028 68.3868C50.9388 69.1214 50.0346 69.5815 49.5208 69.0392L44.4961 63.7353C43.7319 62.9287 42.374 63.4454 42.3392 64.5559L42.0494 73.8309C42.0245 74.6258 40.9422 74.8405 40.6158 74.1153L37.9148 68.1131L37.6869 68.2157L37.9148 68.1131C37.9143 68.112 37.9141 68.1107 37.9141 68.1095C37.9141 67.592 37.2313 67.4049 36.9675 67.8501L32.758 74.9536C32.3208 75.6915 31.1875 75.2361 31.3824 74.4008L33.0394 67.2995C33.2507 66.394 32.4345 65.583 31.5304 65.8L26.2382 67.0701C25.4193 67.2667 24.9482 66.1722 25.6538 65.7125L33.0227 60.9114C33.9035 60.3375 33.7255 58.9988 32.7254 58.6749L26.4525 56.6434C25.8261 56.4406 25.7464 55.5868 26.3244 55.2715L34.1105 51.0245C34.8431 50.6249 34.9859 49.6334 34.3958 49.0433L30.833 45.4805C30.3856 45.0331 30.6591 44.2668 31.2887 44.2039L38.007 43.532C38.7787 43.4549 39.2946 42.7009 39.087 41.9537L37.4885 36.1991C37.3168 35.5809 37.95 35.0466 38.5305 35.3197L43.5668 37.6897C44.4156 38.0891 45.3855 37.4461 45.348 36.5087L45.0915 30.097C45.0596 29.2976 46.1341 29.0103 46.5053 29.719L48.8516 34.1983C49.3631 35.1747 50.7962 35.0593 51.1448 34.0136L53.4938 26.9663C53.7713 26.1341 55.0071 26.3732 54.954 27.2489L54.5781 33.451C54.5079 34.6095 55.917 35.2299 56.7241 34.3959L61.278 29.6901Z" stroke="black" stroke-width="0.5"/>
                                    </svg>`
                                    blankS.style.position = 'absolute'
                                    blankS.style.zIndex = 1000
                                    blankS.style.transform = 300
                                    mask.remove()
                                    deleteSin()

                                    function deleteSin() {
                                        for (var n = kik.length - 1; n >= 0; n--) {
                                            kik[n].style.opacity = 0
                                        }
                                    }
                                    document.body.append(blankS)
                                    moveAt(event.pageX, event.pageY)

                                    function moveAt(pageX, pageY) {
                                        blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                                        blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
                                    
                                    }
                                }
//
//_________________________________________________________Мусорка________________________________________________________
//
                                blankS.onmouseup = function(event) {
                                    function onMouseMove(event) {
                                        function onMouseMoveIn() {
                                            moveAt(event.pageX, event.pageY)
                                            blankS.hidden = true
                                            let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
                                            blankS.hidden = false
                                            if (!elemBelow) return
                                            let droppableBelow = elemBelow.closest('.toolsStand_garbage')
                                            currentDroppable = droppableBelow
                                            if (currentDroppable) {
                                                enterDroppable(currentDroppable)
                                            }
                                        }
                                    }

                                    document.addEventListener('mousemove', onMouseMove)
                                    blankS.onmouseup = function() {
                                        document.removeEventListener('mousemove', onMouseMove)
                                        blankS.onmouseup = null
                                    }
                                    enterDroppable()
                                }
                                document.addEventListener('mousemove', onMouseMove)
                                var si
                            }
                        }
                    }
                }
            }
        }

 var cca
//
// _________________________________________________Окно краткого руководства__________________________________________________________
//
const manualBtn = $('.manual-btn'),
      manual = $('.manual')
    
    manualBtn.on('click', function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active')
            manual.slideUp()
        } else {
            $(this).addClass('is-active')
            manual.slideDown()
        }
    })

$(document).click(function(e) {
    if (!manualBtn.is(e.target) && !manual.is(e.target) && manual.has(e.target).length === 0) {
        manual.slideUp()
        manualBtn.removeClass('is-active')
    }
})