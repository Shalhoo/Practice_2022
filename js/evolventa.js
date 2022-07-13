//
//______________________________Установление параметров для нарезки диска d и m по нажанию на кнопку_________________________________
//
document.querySelector(".createButt").onclick = function() {
        var dParam = prompt('Укажите диаметр диска в диапазое от 130 до 230', 200)
        if (dParam >= 130 && dParam <= 230 && dParam / 10) {
            document.querySelector('#dParam').textContent = dParam
            var mParam = parseInt(prompt('Укажите модуль диска в диапазое от 13 до 23', 20))
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
        parseFloat(mParam)
        parseFloat(dParam)
        console.log(typeof dParam)
        console.log(typeof mParam)
        let currentDroppable = null
        const blankSA = document.querySelector('.blankStorageAtt')
        blankSA.onmousedown = function(event) {
            var blankS = document.createElement('g')
            blankS.innerHTML = `<svg width="42" height="51" viewBox="0 0 42 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_4_16" fill="white">
                            <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z"/>
                            </mask>
                            <path d="M34.7049 34.3663C26.2491 47.387 13.2619 53.96 5.69715 49.0474C-1.86757 44.1348 -1.14522 29.597 7.31057 16.5762C15.7664 3.55542 28.7535 -3.01756 36.3183 1.89503C43.883 6.80762 43.1606 21.3455 34.7049 34.3663ZM19.5795 24.5437C18.6978 25.9014 18.6225 27.4173 19.4113 27.9295C20.2001 28.4417 21.5542 27.7564 22.4359 26.3987C23.3176 25.041 23.3929 23.5252 22.6041 23.013C21.8154 22.5007 20.4612 23.1861 19.5795 24.5437Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_4_16)"/>
                            </svg>`
            blankS.style.position = 'absolute'
            blankS.style.zIndex = 1000
            document.body.append(blankS)
            moveAt(event.pageX, event.pageY)

            function moveAt(pageX, pageY) {
                blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
            }
            // -------------------------------------------------------------Мусорка--------------------------------------------------------//
            blankS.onmouseup = function(event) {
                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY)
                    blankS.hidden = true
                    let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
                    blankS.hidden = false
                    if (!elemBelow) return
                    let droppableBelow = elemBelow.closest('.toolsStand_garbage')
                        // if (currentDroppable != droppableBelow) {
                    currentDroppable = droppableBelow
                    if (currentDroppable) {
                        enterDroppable(currentDroppable)
                    }
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
                document.addEventListener('mousemove', onMouseMove)
                var line = document.createElement('g')

                function drawLine() {
                    var lineHeightH = new Map([
                        [23, 88],
                        [22, 93],
                        [21, 98],
                        [20, 103],
                        [19, 108],
                        [18, 113],
                        [17, 118],
                        [16, 123],
                        [15, 128],
                        [14, 133],
                        [13, 138]
                    ])
                    var lineHeight
                    for (let pair of lineHeightH.entries()) {
                        console.log(pair[0]); // ключ
                        console.log(pair[1]); // значение
                        console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
                        if (pair[0] == mParam) {
                            lineHeight = pair[1]+50
                        }
                    }
                    line.innerHTML = `<svg width="313" height="${lineHeight}" viewBox="0 0 313 ${lineHeight}" xmlns="http://www.w3.org/2000/svg"   class="machine-line line poi">
            <style>
            line {
            top: ${267 - (230 - dParam)}px
            }
            </style>
            <path d="M0 50 L0 ${lineHeight+50} L313 ${lineHeight+50} L313 50" fill="url(#paint0_linear_18_84)" stroke="black" stroke-width="0.5"/>
            <path d="M0 ${lineHeight - 18}L10 ${lineHeight - 18}" stroke="black"/>
            <path d="M303 ${lineHeight - 18}L313 ${lineHeight - 18}" stroke="black"/>
            <path d="M0,50 C15.75,50 13,2 31.5,0 M62.6,50 C42.5,50 52.5,2 31.5,0 " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M62.6,50 C78.35,50 75,2 94.1,0 M125.2,50 C105.1,50 115.1,2 94.1,0 " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M125.2,50 C140.95,50 137.6,2 156.7,0 M187.8,50 C167.7,50 177.7,2 156.7,0 " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M187.8,50 C203.55,50 200.2,2 219.3,0 M250.4,50 C230.3,50 240.3,2 219.3,0 " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M250.4,50 C266.15,50 262.8,2 281.9,0 M313,50 C292.9,50 302.9,2 281.9,0 " style="stroke:black; stroke-width:1; fill:none;"/>
            <defs>
                <linearGradient id="paint0_linear_18_84" x1="0.493751" y1="33" x2="313.494" y2="33" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D5DEE7"/>
                <stop offset="0.5" stop-color="#E8EBF2"/>
                <stop offset="1" stop-color="#E2E7ED"/>
                </linearGradient>
            </defs>
            </svg>`
                    var shiftX = 178 + "px"
                    var shiftX1 = 0 + "px"
                    // let l  = 258 + "px"
                    fullLine.style.left = shiftX
                    line.style.left = shiftX1
                    // canvas.style.left = l
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
                
                    //
                    //___________________________________Рычаг и педаль____________________________
                    //

                lever.onmousedown = () => {
                    let shiftX = fullLine.getBoundingClientRect().left
                    let shiftX1 = line.getBoundingClientRect().left
            
                    document.getElementById("lever").style.transform = "rotate(30deg)"
                    document.getElementById("lever").style.transformOrigin = "15% 85%"
                    fullLine.style.left = shiftX + (313/5) + 'px'
                    line.style.left = shiftX1 + (313/5) + 'px'
                  
                }
                lever.onmouseup = () => {
                    // Standard syntax
                    document.getElementById("lever").style.transform = "rotate(360deg)"
                    document.getElementById("lever").style.transformOrigin = "15% 85%"
                }


                // function drawable () {

              var kik = []

  // for (var i = 0; i<3; i++){

                pedal.onmouseup = function ()   {
       
   
var si = document.createElement('g')
var angle = 5     
    var shiftX2 = line.getBoundingClientRect().left    




       
    // var shiftX2 = si.getBoundingClientRect().left  - l
    // shiftX2 = shiftX2 - 10
    var shiftY2 = line.getBoundingClientRect().top 


            si.innerHTML = `<svg width="313" height="300"  xmlns="http://www.w3.org/2000/svg" class="si" >

            <path d="M${shiftX2},${shiftY2 + 97 + 50} C${shiftX2+15.75},${shiftY2 + 97 + 50} ${shiftX2+13},${shiftY2 + 97 + 2} ${shiftX2+31.5},${shiftY2 + 97 + 0} M${shiftX2+62.6},${shiftY2 + 97 + 50} C${shiftX2+42.5},${shiftY2 + 97 + 50} ${shiftX2+52.5},${shiftY2 + 97 + 2} ${shiftX2+31.5},${shiftY2 + 97 + 0} " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M${shiftX2 + 62.6},${shiftY2 + 97 + 50} C${shiftX2 + 78.35},${shiftY2 + 97 + 50} ${shiftX2 + 75},${shiftY2 + 97 + 2} ${shiftX2 + 94.1},${shiftY2 + 97 + 0} M${shiftX2 + 125.2},${shiftY2 + 97 + 50} C${shiftX2+105.1},${shiftY2 + 97 + 50} ${shiftX2+115.1},${shiftY2 + 97 + 2} ${shiftX2+94.1},${shiftY2 + 97 + 0} " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M${shiftX2 + 125.2},${shiftY2 + 97 + 50} C${shiftX2 + 140.95},${shiftY2 + 97 + 50} ${shiftX2 + 137.6},${shiftY2 + 97 + 2} ${shiftX2 + 156.7},${shiftY2 + 97 + 0} M${shiftX2 + 187.8},${shiftY2 + 97 + 50} C${shiftX2+167.7},${shiftY2 + 97 + 50} ${shiftX2+177.7},${shiftY2 + 97 + 2} ${shiftX2+156.7},${shiftY2 + 97 + 0} " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M${shiftX2 + 187.8},${shiftY2 + 97 + 50} C${shiftX2 + 203.55},${shiftY2 + 97 + 50} ${shiftX2 + 200.2},${shiftY2 + 97 + 2} ${shiftX2 + 219.3},${shiftY2 + 97 + 0} M${shiftX2 + 250.4},${shiftY2 + 97 + 50} C${shiftX2+230.3},${shiftY2 + 97 + 50} ${shiftX2+240.3},${shiftY2 + 97 + 2} ${shiftX2+219.3},${shiftY2 + 97 + 0} " style="stroke:black; stroke-width:1; fill:none;"/>
            <path d="M${shiftX2 + 250.4},${shiftY2 + 97 + 50} C${shiftX2 + 266.15},${shiftY2 + 97 + 50} ${shiftX2 + 262.8},${shiftY2 + 97 + 2} ${shiftX2 + 281.9},${shiftY2 + 97 + 0} M${shiftX2 + 313},${shiftY2 + 97 + 50} C${shiftX2+292.9},${shiftY2 + 97 + 50} ${shiftX2+302.9},${shiftY2 + 97 + 2} ${shiftX2+281.9},${shiftY2 + 97 + 0} " style="stroke:black; stroke-width:1; fill:none;"/>
            </svg>`
                  
 

                    document.body.append(si)

            si.style.position = 'absolute'
       si.style.left = 258 + 'px'
      si.style.top = 170 + 'px'

            si.style.zIndex = 100

                   blankS.style.transform = 300

    rotateSin (angle)
                   kik.push(si)
                
console.log(kik)
                    document.getElementById("pedal").style.transform = "rotate(360deg)"
                

       }
           
 function rotateSin (angle){   

   

            for (var n = kik.length-1; n >0; n--){
kik[n].style.transformOrigin="160px 120px"
                    kik[n].style.transform = "rotate("+angle+"deg)"
                
                angle = ((angle + 5) )
            
                
                 console.log(n)
             
}

// angle = angle/n


//                      si.style.transform = "rotate("+angle+"deg)"
//                        angle = angle + 5 
          
// }
  
     }
                    // }
             
    
                         
                      


               pedal.onmousedown = () => {
                                 let shiftX = fullLine.getBoundingClientRect().left 
                                   
             
                                    document.getElementById("pedal").style.transform = "rotate(355deg)"
                                    fullLine.style.left = shiftX - (62.6/7) + 'px'
                                    
    
    var shiftX1 = line.getBoundingClientRect().left 
    line.style.left = shiftX1 - (62.6/7) + 'px'

                                }
                
             //    }
             // drawable(drawSin()) // COUNTING OF COGS
                blankS.onclick = function() {
                    document.removeEventListener('mousemove', onMouseMove)
                    blankS.onmouseup = null
                    blankS.innerHTML = `<svg width="${dParam}" height="${dParam}" viewBox="0 0 ${dParam} ${dParam}" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="${dParam / 2}" cy="${dParam / 2}" r="${dParam / 2}" fill="#ECCF38" stroke="black" stroke-width="0.5"/>
                                </svg>`
                    let leftv = 300 + (230 - dParam) / 2
                    let topv = 178 + (230 - dParam) / 2
                    blankS.style.position = 'absolute'
                    blankS.style.left = leftv + `px`
                    blankS.style.top = topv + `px`
                    blankS.style.zIndex = 100
                    blankS.style.transform = 300
                        // document.body.append(blankS)
                        // moveAt(event.pageX, event.pageY)
                        //    function moveAt(pageX, pageY) {
                        //       blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                        //       blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
                        // }
                        // function onMouseMove(event) {
                        //       moveAt(event.pageX, event.pageY)
                        // }
                        // document.addEventListener('mousemove', onMouseMove)
                    blankS.onmouseup = function() {
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
                        document.body.append(blankS)
                        moveAt(event.pageX, event.pageY)

                        function moveAt(pageX, pageY) {
                            blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                            blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
                        }
                        // -------------------------------------------------------------Мусорка--------------------------------------------------------//
                        blankS.onmouseup = function(event) {
                            function onMouseMove(event) {
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
                            document.addEventListener('mousemove', onMouseMove)
                            blankS.onmouseup = function() {
                                document.removeEventListener('mousemove', onMouseMove)
                                blankS.onmouseup = null
                            }

                            function enterDroppable(elem) {
                                (blankS).remove()
                                    (line).remove()
                            }
                        }
                        document.addEventListener('mousemove', onMouseMove)
                        blankS.onmouseup = function() {
                            document.removeEventListener('mousemove', onMouseMove)
                            blankS.onmouseup = null
                            blankS.innerHTML = `<svg width="65" height="83" viewBox="0 0 65 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1_12_72" fill="white">
                                        <path d="M41.9187 48.8218C35.8976 59.4113 26.6497 64.7569 21.2631 60.7616C15.8765 56.7663 16.3909 44.9431 22.412 34.3536C28.4331 23.7642 37.6809 18.4186 43.0676 22.4138C48.4542 26.4091 47.9398 38.2324 41.9187 48.8218ZM31.1484 40.8334C30.5205 41.9376 30.4669 43.1704 31.0286 43.587C31.5902 44.0036 32.5545 43.4462 33.1823 42.342C33.8101 41.2379 33.8638 40.0051 33.3021 39.5885C32.7404 39.1719 31.7762 39.7293 31.1484 40.8334Z"/>
                                    </mask>
                                    <path d="M41.9187 48.8218C35.8976 59.4113 26.6497 64.7569 21.2631 60.7616C15.8765 56.7663 16.3909 44.9431 22.412 34.3536C28.4331 23.7642 37.6809 18.4186 43.0676 22.4138C48.4542 26.4091 47.9398 38.2324 41.9187 48.8218ZM31.1484 40.8334C30.5205 41.9376 30.4669 43.1704 31.0286 43.587C31.5902 44.0036 32.5545 43.4462 33.1823 42.342C33.8101 41.2379 33.8638 40.0051 33.3021 39.5885C32.7404 39.1719 31.7762 39.7293 31.1484 40.8334Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_12_72)"/>
                                    <path d="M45.5343 29.0395L43.4213 31.1961C42.2118 32.4305 43.1914 34.7519 44.8693 34.6275C46.3079 34.5209 46.9024 36.7289 45.6088 37.3739L42.4773 38.9351C40.943 39.7001 40.8977 42.106 42.3984 43.1255C44.0128 44.2222 43.1849 46.9054 41.3535 46.5122L40.3795 46.3031C38.7362 45.9504 37.435 47.6365 37.9873 49.4029L38.7747 51.9212C39.2561 53.461 37.4897 54.4793 36.5528 53.2021C35.4987 51.7652 33.4716 52.43 33.4232 54.2284L33.3476 57.0412L33.5842 57.0633L33.3481 57.0675C33.4755 59.076 31.0166 59.6375 30.2449 57.7945C29.7779 56.1476 27.6312 56.2803 27.5022 57.9749L27.2966 60.6744C27.0944 61.8667 25.5206 61.7418 25.359 60.5139L25.2372 59.5887C25.2293 59.5286 25.2254 59.4679 25.2254 59.4075C25.2254 57.5691 23.1414 56.5919 22.0827 57.9571L21.6603 58.5018C20.4745 59.7031 18.6105 57.954 19.467 56.4333L21.1209 53.4971C21.8226 52.2513 20.5717 50.6695 19.3542 51.2631C18.3938 51.7313 17.572 50.2182 18.4231 49.5484L22.0949 46.6586C23.3781 45.6487 22.8267 43.3513 21.2236 43.0285L20.8404 42.9514C19.1812 42.6173 19.0696 39.9944 20.7015 39.6881L23.095 39.2387C24.7431 38.9293 25.4481 36.8041 24.4143 35.2616L23.9427 34.5578C22.8152 32.8756 24.514 30.821 26.1107 31.9357L26.3583 32.1085C27.6846 33.0344 29.34 32.0746 29.34 30.3796L29.34 26.344C29.34 25.1245 30.8907 24.9571 31.2185 26.1412C31.6511 27.7038 33.6345 27.7568 33.9811 26.2151L34.7618 22.7423C35.0665 21.3869 36.8923 21.7427 36.8923 23.1574L36.8923 24.1849C36.8923 25.6092 38.572 26.2521 39.2613 25.0918L39.0615 24.939L39.2716 25.0725L40.4646 22.5975C41.0062 21.4737 42.5921 22.2477 42.2922 23.4894C42.2729 23.5692 42.2453 23.6458 42.2099 23.7176L41.7806 24.5879C40.9947 26.1811 42.7229 27.9932 44.105 27.0254C45.2447 26.2273 46.5238 28.0297 45.5343 29.0395Z" stroke="black" stroke-width="0.5"/>
                                    <path d="M42.6644 27.7412L41.5804 29.524C41.0396 30.4134 41.7025 31.6593 42.6904 31.6102L44.933 31.4989C45.6784 31.4618 46.0162 32.5689 45.383 32.9738L40.9512 35.8083C40.2777 36.2391 40.2089 37.2943 40.8147 37.9047L43.8187 40.932C44.3306 41.4479 44.0026 42.3562 43.3295 42.2862L39.7348 41.9123C38.8652 41.8219 38.2575 42.7649 38.6013 43.6714L40.5478 48.8037C40.808 49.4896 40.1759 50.1186 39.584 49.7629L36.7927 48.0849C35.9211 47.561 34.9361 48.3275 35.1092 49.395L35.9989 54.8827C36.1242 55.6555 35.278 56.0851 34.7898 55.4966L32.1092 52.2649C31.3814 51.3874 30.1071 51.8564 30.0755 53.0133L29.9121 58.9819C29.8893 59.8157 28.8619 59.9781 28.554 59.1966L27.0561 55.3949C27.0453 54.9279 26.4816 54.736 26.2741 55.1359L24.0898 59.3458C23.691 60.1144 22.5976 59.5864 22.7764 58.7115L23.4926 55.2058C23.6902 54.2386 22.862 53.3362 21.9949 53.5738L20.0095 54.1181C19.2434 54.3281 18.7391 53.1726 19.3865 52.6909L23.2218 49.8369C24.0227 49.2409 23.7977 47.8432 22.8441 47.4905L19.3539 46.1996C18.7575 45.979 18.6449 45.0897 19.1717 44.7615L24.1323 41.6711C24.7873 41.2631 24.8882 40.2589 24.3374 39.6298L22.2827 37.2831C21.8646 36.8056 22.0908 36.0326 22.668 35.9666L26.88 35.4856C27.5766 35.406 28.0231 34.6678 27.837 33.9029L26.8545 29.863C26.6975 29.2177 27.2737 28.6979 27.8202 28.9916L30.6877 30.5328C31.4872 30.9625 32.3721 30.3433 32.3383 29.3779L32.204 25.5443C32.1746 24.7041 33.1922 24.4658 33.5431 25.2308L34.4574 27.2243C34.9448 28.2871 36.3159 28.238 36.6345 27.1463L37.5722 23.9333C37.8252 23.0663 39.0069 23.3804 38.958 24.3016L38.8475 26.3852C38.7819 27.6214 40.1652 28.3419 40.9121 27.4604L41.539 26.7205C42.1232 26.0311 43.1422 26.9554 42.6644 27.7412Z" stroke="black" stroke-width="0.5"/>
                                </svg>`
                            blankS.style.position = 'absolute'
                            blankS.style.zIndex = 1000
                            blankS.style.transform = 300
                            line.remove()
                            blankS.onmouseup = function() {
                                blankS.innerHTML = `<svg width="92" height="102" viewBox="0 0 92 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <mask id="path-1-inside-1_4_23" fill="white">
                             <path d="M58.8687 60.0312C50.4129 73.052 37.4258 79.625 29.861 74.7124C22.2963 69.7998 23.0187 55.2619 31.4744 42.2412C39.9302 29.2204 52.9174 22.6474 60.4821 27.56C68.0469 32.4726 67.3245 47.0105 58.8687 60.0312ZM43.7434 50.2087C42.8617 51.5664 42.7864 53.0822 43.5752 53.5945C44.3639 54.1067 45.7181 53.4213 46.5998 52.0637C47.4815 50.706 47.5568 49.1902 46.768 48.6779C45.9792 48.1657 44.6251 48.8511 43.7434 50.2087Z"/>
                         </mask>
                         <path d="M58.8687 60.0312C50.4129 73.052 37.4258 79.625 29.861 74.7124C22.2963 69.7998 23.0187 55.2619 31.4744 42.2412C39.9302 29.2204 52.9174 22.6474 60.4821 27.56C68.0469 32.4726 67.3245 47.0105 58.8687 60.0312ZM43.7434 50.2087C42.8617 51.5664 42.7864 53.0822 43.5752 53.5945C44.3639 54.1067 45.7181 53.4213 46.5998 52.0637C47.4815 50.706 47.5568 49.1902 46.768 48.6779C45.9792 48.1657 44.6251 48.8511 43.7434 50.2087Z" fill="#ECCF38" stroke="black" mask="url(#path-1-inside-1_4_23)"/>
                         <path d="M46.9142 70.1574L46.9138 70.1703L46.9147 70.1831C47.1 72.7392 43.6062 73.6516 42.5181 71.3312L42.3974 71.0738C41.7641 69.1008 38.8692 69.4206 38.6889 71.4934L38.4161 74.6311C38.1106 76.2299 35.8001 76.188 35.5572 74.5725L35.3614 73.2698C35.3491 73.1877 35.3429 73.1042 35.3429 73.021C35.3429 70.76 32.5434 69.6663 31.037 71.3669L30.4865 71.9884C28.6578 73.6175 25.9824 71.3364 27.3114 69.2705L29.5666 65.7648C30.5492 64.2374 28.9635 62.3597 27.2931 63.0727C25.8032 63.7088 24.6698 61.651 26.0038 60.7317L30.8485 57.3934C32.6406 56.1585 32.0337 53.3718 29.8904 52.994L29.3753 52.9031C26.9953 52.4835 27.0151 49.0615 29.3998 48.6695L32.3149 48.1903C34.5603 47.8213 35.6021 45.192 34.219 43.3852L33.6902 42.6943C32.1073 40.6264 34.5613 37.901 36.7832 39.2591L37.095 39.4497C38.8583 40.5275 41.1212 39.2584 41.1212 37.1919L41.1212 32.627C41.1212 30.9786 43.4406 30.6207 43.9375 32.1923C44.5259 34.0534 47.1841 33.9804 47.6695 32.0899L48.6836 28.1405C49.1601 26.2847 51.8922 26.6299 51.8922 28.5459L51.8922 29.8313C51.8922 31.5406 54.1033 32.2199 55.063 30.8054L55.0695 30.7958L55.0751 30.7856L56.7322 27.7753C57.5861 26.2242 59.9508 27.1857 59.4799 28.8926C59.4476 29.0098 59.4011 29.1225 59.3414 29.2284L58.7663 30.2493C57.6541 32.2236 59.8966 34.3847 61.8284 33.2003C63.5915 32.1193 65.388 34.5339 63.8459 35.912L61.1522 38.3191C59.4486 39.8414 60.6297 42.6583 62.9096 42.5104C65.0377 42.3723 65.749 45.302 63.7946 46.1551L59.8175 47.8912C57.7018 48.8148 57.5185 51.7449 59.5026 52.925C61.7453 54.2589 60.4425 57.7076 57.878 57.2255L56.721 57.0081C54.5228 56.5949 52.7056 58.7229 53.4578 60.8293L54.4292 63.5496C55.1345 65.5247 52.5652 66.9964 51.2184 65.3888C49.8143 63.7129 47.0831 64.6586 47.016 66.844L46.9142 70.1574Z" stroke="black" stroke-width="0.5"/>
                         <path d="M61.278 29.6901C61.9193 29.0275 62.959 29.8821 62.433 30.6395L58.1095 36.8654C57.5197 37.7147 58.1574 38.8721 59.1905 38.8272L64.4747 38.5975C65.264 38.5631 65.563 39.6151 64.8737 40.0011L57.2726 44.2578C56.521 44.6786 56.4104 45.7158 57.0563 46.2857L62.2059 50.8295C62.7496 51.3092 62.3638 52.2045 61.6417 52.1388L55.3834 51.5689C54.4383 51.4828 53.7458 52.4398 54.123 53.3106L57.3066 60.6602C57.588 61.3098 56.8955 61.9517 56.2691 61.622L51.105 58.904C50.1811 58.4178 49.1036 59.2113 49.2937 60.2378L50.8028 68.3868C50.9388 69.1214 50.0346 69.5815 49.5208 69.0392L44.4961 63.7353C43.7319 62.9287 42.374 63.4454 42.3392 64.5559L42.0494 73.8309C42.0245 74.6258 40.9422 74.8405 40.6158 74.1153L37.9148 68.1131L37.6869 68.2157L37.9148 68.1131C37.9143 68.112 37.9141 68.1107 37.9141 68.1095C37.9141 67.592 37.2313 67.4049 36.9675 67.8501L32.758 74.9536C32.3208 75.6915 31.1875 75.2361 31.3824 74.4008L33.0394 67.2995C33.2507 66.394 32.4345 65.583 31.5304 65.8L26.2382 67.0701C25.4193 67.2667 24.9482 66.1722 25.6538 65.7125L33.0227 60.9114C33.9035 60.3375 33.7255 58.9988 32.7254 58.6749L26.4525 56.6434C25.8261 56.4406 25.7464 55.5868 26.3244 55.2715L34.1105 51.0245C34.8431 50.6249 34.9859 49.6334 34.3958 49.0433L30.833 45.4805C30.3856 45.0331 30.6591 44.2668 31.2887 44.2039L38.007 43.532C38.7787 43.4549 39.2946 42.7009 39.087 41.9537L37.4885 36.1991C37.3168 35.5809 37.95 35.0466 38.5305 35.3197L43.5668 37.6897C44.4156 38.0891 45.3855 37.4461 45.348 36.5087L45.0915 30.097C45.0596 29.2976 46.1341 29.0103 46.5053 29.719L48.8516 34.1983C49.3631 35.1747 50.7962 35.0593 51.1448 34.0136L53.4938 26.9663C53.7713 26.1341 55.0071 26.3732 54.954 27.2489L54.5781 33.451C54.5079 34.6095 55.917 35.2299 56.7241 34.3959L61.278 29.6901Z" stroke="black" stroke-width="0.5"/>
                     </svg>`
                                blankS.style.position = 'absolute'
                                blankS.style.zIndex = 1000
                                blankS.style.transform = 3
                                document.addEventListener('mousemove', onMouseMove)
                                drawLine(lineMove())
                                    //___________________________________Рычаг и педаль____________________________
                                    //
                                lever.onmousedown = () => {
                                    let shiftX = fullLine.getBoundingClientRect().left
                                    let shiftX1 = line.getBoundingClientRect().left
                                    document.getElementById("lever").style.transform = "rotate(30deg)"
                                    document.getElementById("lever").style.transformOrigin = "15% 85%"
                                    fullLine.style.left = shiftX + 50 + 'px'
                                    line.style.left = shiftX1 + 50 + 'px'
                                }
                                lever.onmouseup = () => {
                                    // Standard syntax
                                    document.getElementById("lever").style.transform = "rotate(360deg)"
                                    document.getElementById("lever").style.transformOrigin = "15% 85%"
                                }
                                pedal.onmousedown = () => {
                                    let shiftX = fullLine.getBoundingClientRect().left
                                    let shiftX1 = line.getBoundingClientRect().left
                                    document.getElementById("pedal").style.transform = "rotate(355deg)"
                                    fullLine.style.left = shiftX - 10 + 'px'
                                    line.style.left = shiftX1 - 10 + 'px'
                                }
                                pedal.onmouseup = () => {
                                        blankS.style.transform = 300
                                        // Standard syntax
                                        document.getElementById("pedal").style.transform = "rotate(360deg)"
                                        // paint.style.transform = "rotate(190deg)"
                                    }
                                    // -------------------------------------------------------------Мусорка--------------------------------------------------------//
                                blankS.onmouseup = function(event) {
                                    document.body.append(blankS)

                                    function onMouseMove(event) {
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
                                    document.addEventListener('mousemove', onMouseMove)
                                    blankS.onmouseup = function() {
                                        document.removeEventListener('mousemove', onMouseMove)
                                        blankS.onmouseup = null
                                    }
                                }

                                function enterDroppable(elem) {
                                    (blankS).remove()
                                        (line).remove()
                                }
                                document.addEventListener('mousemove', onMouseMove)
                                blankS.onmouseup = function() {
                                    document.removeEventListener('mousemove', onMouseMove)
                                    blankS.onmouseup = null
                                    blankS.innerHTML = `<svg width="${dParam}" height="${dParam}" viewBox="0 0 ${dParam} ${dParam}" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="${dParam / 2}" cy="${dParam / 2}" r="${dParam / 2}" fill="#ECCF38" stroke="black" stroke-width="0.5"/>
                                </svg>`
                                    let leftv = 300 + (230 - dParam) / 2
                                    let topv = 178 + (230 - dParam) / 2
                                    blankS.style.position = 'absolute'
                                    blankS.style.left = leftv + `px`
                                    blankS.style.top = topv + `px`
                                    blankS.style.zIndex = 100
                                    blankS.style.transform = 300
                                    let shiftX = 178 + "px"
                                    let shiftX1 = 0 + "px"
                                    fullLine.style.left = shiftX
                                    line.style.left = shiftX1
                                        //   let dom = document.querySelector('.toolsStand')
                                        // dom.after(blankS)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // }
    //=== объявление переменных
    // let rad = dParam / 2
let rad = dParam / 2

function radToDeg(rad) {
    return (rad * 180) / Math.PI
}

function degToRad(deg) {
    return (Math.PI * deg) / 180
}

function RotateX(X, Y, Degree) {
    return X * Math.cos(degToRad(Degree)) - Y * Math.sin(degToRad(Degree))
}

function RotateY(X, Y, Degree) {
    return X * Math.sin(degToRad(Degree)) + Y * Math.cos(degToRad(Degree))
}

function curveToIfHit(controlX, controlY, anchorX, anchorY) {
    if (blankS != _root.Circle) {
        blankS.curveTo(controlX, controlY, anchorX, anchorY);
    } else {
        if (!beyondCircle(anchorX, anchorY)) {
            blankS.curveTo(controlX, controlY, anchorX, anchorY);
        } // В ЖОПУ ЭТИ ИФЫ 
        else blankS.moveTo(anchorX, anchorY);
    }
}

function lineToIfHit(X, Y, blankS) {
    if (blankS != _root.Circle) {
        blankS.lineTo(X, Y);
    } else {
        if (!beyondCircle(X, Y)) {
            blankS.lineTo(X, Y);
        } else blankS.moveTo(X, Y);
    }
}
let cf1 = 180 / Math.PI,
    scale = 1,
    alpha = 20,
    ha = 1 * mParam,
    p = Math.PI * mParam,
    pDelTwo = p / 2,
    Rof = 0.38 * mParam,
    Cpar = 0.25 * mParam
    //C -> Cpar, C1=0.25, 10s0 -> pDelTwo, ha1=1, Rof1=0.38
let totalLength = 2 * Cpar + 2 * ha,
    lineHeight = 2 * ha,
    // shiftX1= 100,
    lineLength = lineHeight / (Math.cos(alpha) * Math.PI / 180),
    tgGrad = Math.tan(degToRad(alpha)),
    cosGrad = Math.cos(degToRad(alpha)),
    lineWidth = lineHeight * tgGrad
let b3 = Cpar * tgGrad,
    c3 = Cpar / cosGrad,
    fullRad = rad + 2 * mParam,
    // cogsCount = 5,
    rotate = -5
var dParamLine = 267 - (230 - dParam)
    // ${267 - (230 - dParam)}, 313, ${lineHeight}
    // TEST console.log(b3, c3, rad, fullRad, totalLength, lineHeight, lineLength, tgGrad, cosGrad, lineWidth, Rof, p, pDelTwo)
    // TEST console.log(typeof mParam)
    //
    // _______________________________Окно краткого руководства_____________________________
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
    // что-то с экшена






// var offsetX = 0
//     // dParamL =  267 - (230 - dParam)
// const canvas = document.querySelector("#canvas");
// // canvas.style.top = dParamL + 'px'
// const ctx = canvas.getContext("2d");



// // ctx.beginPath()
// // const gradient = ctx.createLinearGradient(0, 20, 220, 0)
// // gradient.addColorStop(0, '#D5DEE7')
// // gradient.addColorStop(0.5, '#D5DEE7')
// // gradient.addColorStop(1, '#D5DEE7')
// // ctx.moveTo(0, 50);
// // ctx.lineTo(0, 120);
// // ctx.lineTo(313, 120);
// // ctx.lineTo(313, 50);
// // ctx.lineTo(0, 50);
// // ctx.fillStyle = gradient
// // ctx.lineWidth = 0.5
// //            ctx.stroke();



// function drawCogs(cogsCount, rotate) {
//     for (let cogsCount = 0; cogsCount <= 4; cogsCount++) {
//         //          var canvas = document.getElementById("canvas"), 
//         //     ctx = canvas.getContext("2d");
//         //     ctx.beginPath()
//         // ctx.moveTo(0, 50);
//         // ctx.lineTo(0, 120);
//         // ctx.lineTo(313, 120);
//         // ctx.lineTo(313, 50);
//         // ctx.lineTo(0, 50);
//         // ctx.moveTo(0, 50);
//         // ctx.bezierCurveTo(20, 50, 15, 15, 40, 20);
//         // ctx.moveTo(40, 20);
//         // ctx.bezierCurveTo(55, 20, 55, 50, 70, 50);
//         // ctx.lineWidth = 3;
//         // ctx.stroke();
//         function drawCog() {
//             ctx.beginPath()
//             /*    const gradient = ctx.createLinearGradient(0, 20, 220, 0)
//         gradient.addColorStop(0, '#D5DEE7')
//         gradient.addColorStop(0.5, '#D5DEE7')
//         gradient.addColorStop(1, '#D5DEE7')
//         ctx.moveTo(offsetX, 50);
            
//         ctx.bezierCurveTo(offsetX +20, 50,offsetX +15, 15, offsetX +40, 20);
//         ctx.bezierCurveTo( offsetX +55,20,offsetX +55, 50, offsetX +70, 50);
//         ctx.moveTo(offsetX + 50,50);
//         ctx.fillStyle = gradient;
//         ctx.lineWidth = 0.5;
//         offsetX =offsetX + 70;
//         ctx.stroke();*/
//         var gradient = ctx.createLinearGradient(0, 5, 30, 0)
//         gradient.addColorStop(0, '#D5DEE7')
//         gradient.addColorStop(0.5, '#D5DEE7')
//         gradient.addColorStop(1, '#D5DEE7')
//         ctx.moveTo(offsetX, 50);
//         ctx.bezierCurveTo(offsetX + 15.75, 50,offsetX +  13, 2,offsetX +  31.5, 0);
//         ctx.moveTo(offsetX + 62.6, 50);
//         ctx.bezierCurveTo(offsetX + 42.5, 50,offsetX +  52.5,2 ,offsetX + 31.5,0);
//         ctx.lineWidth = 1;
//         offsetX = offsetX + 62.6;
//         ctx.stroke();
//         }
//         drawCog()
//     }


//     cogsCount++
// }
//             