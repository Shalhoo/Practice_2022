const blankSA = document.getElementById('toolsStand-blankStorageAtt')
blankSA.onmousedown = function(event) {

//________________________________________создание элемента для работы с ним______________________
      const blankS = document.createElement('object')
      blankS.className = 'blankStorage'
      blankS.setAttribute('type', 'image/svg+xml')
      blankS.setAttribute('data', 'img/blankStorage.svg')
//___________________________________________drag 'n' drop________________________________________
      blankS.style.position = 'absolute'
      blankS.style.zIndex = 1000
      document.body.append(blankS)
      moveAt(event.pageX, event.pageY)

      function moveAt(pageX, pageY) {
            blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
            blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
      }
      function onMouseMove(event) {
            moveAt(event.pageX, event.pageY)
      }
      document.addEventListener('mousemove', onMouseMove)
      blankS.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove)
            blankS.onmouseup = null
            blankS.setAttribute('data', 'img/baseCircBa.svg')
// __________________________________________________Часть для работы большого диска нужно обернуть в иф, 
//___________________________________________________когда построю прозрачный див, который должен быть поверх базового кольца
//___________________________________________________когда элемент поадает в его зону видимости, он встает точно по центру, 
//___________________________________________________который обозначен на базовом круге
            blankS.style.position = 'absolute'
            blankS.style.zIndex = 1000
            document.body.append(blankS)
            moveAt(event.pageX, event.pageY)

            function moveAt(pageX, pageY) {
                  blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
                  blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
            }
            function onMouseMove(event) {
                  moveAt(event.pageX, event.pageY)
            }

            document.addEventListener('mousemove', onMouseMove)
            blankS.onmouseup = function() {
                  document.removeEventListener('mousemove', onMouseMove)
                  blankS.onmouseup = null
                  blankS.src  = 'img/baseCircBa.svg'
            }
      }
      
//____________________________________добавление созданного элемента на страницу html____________________
      let dom = document.getElementById('hiddenTools')
      dom.after(blankS)
}
// если у нас на странице(в доме) есть 8 элементов на полках, 
//то мы не можем брать новый и появляется модальное окно, которое говорит, 
//что нужно удалить какой-нибудь из экспериментов, для освобождения места под новый
// При изменениии атрибута выставить круг в центр базоваго круга

let place = function() {

}


/*const blankS = document.getElementById('blankStorage')
const blankSA = document.getElementById('toolsStand-blankStorageAtt')
const blankSD = document.getElementById('blankStorageDone')
const blankSDS = document.getElementById('blankStorageDoneSmall')
const basicC = document.getElementById('machine-basicCirc')
const baseCB = document.getElementById('baseCircBa')
const garbage = document.getElementById('toolsStand-garbage')
const shelter = document.getElementById('toolsStand-shelter')
const backRect = document.getElementById('backRect')

//_____________________________МУТКИ С ЦИКЛОМ________________________________
//
//


if () {

//______________________________________  CLONE CREATE_________________________________________________________
//
//
  const blankSCopy = blankS.cloneNode();

//________________________________________BLANKSTORAGEATT=====>BLANKSTORAGE________________________________________
//________________________________________BLANKSTORAGEATT=====>BLANKSTORAGE________________________________________
//
blankSA.onmousedown = function(event) {

  blankSCopy.style.position = 'absolute'
  blankSCopy.style.zIndex = 1000
  
  document.body.append(blankSCopy)
  moveAt(event.pageX, event.pageY)

  // __________________________передвинуть изображение под координаты курсора + центрирование_________________
  //
  function moveAt(pageX, pageY) {
    blankSCopy.style.left = pageX - blankSCopy.offsetWidth / 2 + 'px'
    blankSCopy.style.top = pageY - blankSCopy.offsetHeight / 2 + 'px'
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }

  //___________________________перемещение по экрану_________________________________
  document.addEventListener('mousemove', onMouseMove)

  //_________________положить, удалить более ненужные обработчики событий________________
  blankSCopy.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove)
    blankSCopy.onmouseup = null
    $('#backRect').fadeOut(parameters)
  }
}

//________________________________________BLANKSTORAGEDONESMALL=====>BLANKSTORAGEDONE________________________________________
//________________________________________BLANKSTORAGEDONESMALL=====>BLANKSTORAGEDONE________________________________________
//
blankSDS.onmousedown = function(event) {

  blankSD.style.position = 'absolute'
  blankSD.style.zIndex = 1000
  document.body.append(blankSD)
  moveAt(event.pageX, event.pageY)

  function moveAt(pageX, pageY) {
    blankSD.style.left = pageX - blankSD.offsetWidth / 2 + 'px'
    blankSD.style.top = pageY - blankSD.offsetHeight / 2 + 'px'
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }
  document.addEventListener('mousemove', onMouseMove)
  blankSD.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove)
    blankSD.onmouseup = null
      //____________________________________RECTANGLE VISABILITY___________________________________
      //
      //
     // $('#fadeout').click(function () {
             //   $('#backRect').fadeOut(parameters)
           // })
  }
}

//________________________________________BASICCIRCLE=====>BLANKSTORAGE________________________________________
//________________________________________BASICCIRCLE=====>BLANKSTORAGE________________________________________
//
basicC.onmousedown = function(event) {

  blankS.style.position = 'absolute'
  blankS.style.zIndex = 1000
  document.body.append(blankS)
  moveAt(event.pageX, event.pageY)

  function moveAt(pageX, pageY) {
    blankS.style.left = pageX - blankS.offsetWidth / 2 + 'px'
    blankS.style.top = pageY - blankS.offsetHeight / 2 + 'px'
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }
  document.addEventListener('mousemove', onMouseMove)
  blankS.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove)
    blankS.onmouseup = null
  }
}


//}*/