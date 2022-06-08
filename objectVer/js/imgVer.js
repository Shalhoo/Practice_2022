 function dragStart( event ) {
          event.dataTransfer.setData("Text", event.target.id); // используется для хранения данных, перетаскиваемых мышью во время операции drag and drop. 
         }
         function dragging( event ) {
           document.getElementById("toolsStand-blankStorageAtt").innerHTML = "Элемент <p> перетаскивается (ondrag)";
         }
         function allowDrop( event ) {
           event.preventDefault(); // отмена действия браузера по умолчанию (через событие ondragover) 
         }
         function dragEnter( event ) {
           if ( event.target.className == "machine-basicCirc" ) { // изменение цвета границы и заднего фона
             event.target.style.background = "yellow";
             event.target.style.border = "3px dotted black";
           }
         }
         function dragLeave( event ) {
           if ( event.target.className == "machine-basicCirc" ) { // значения стиля границы и заднего фона возвращаются в первоначальный вид
             event.target.style.background = "";
             event.target.style.border = "";
           }
         }
         function drop( event ) {
           var data = event.dataTransfer.getData("Text"); // позволяет получить данные.
           event.target.appendChild( document.getElementById( data ));// добавляем перетаскиваемый элемент 
         }
         function dragEnd( event ) {
	   document.getElementById("toolsStand-blankStorageAtt").innerHTML = "Перетаскиваемый элемент <p> опустился на объект перетаскивания (ondragend)" ;
         }