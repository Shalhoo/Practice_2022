const ruler = document.querySelector('.toolsStand-ruler')
ruler.onmousedown = function(event) {

  ruler.style.position = 'absolute'
  ruler.style.zIndex = 1000
  document.body.append(ruler)
  moveAt(event.pageX, event.pageY)

  function moveAt(pageX, pageY) {
    ruler.style.left = pageX - ruler.offsetWidth / 2 + 'px'
    ruler.style.top = pageY - ruler.offsetHeight / 2 + 'px'
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