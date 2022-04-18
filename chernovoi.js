const zone1 = document.querySelector('.zone-1');
const zone2 = document.querySelector('.zone-2');
const kuma = document.querySelector('#kuma');

zone1.ondragover = allowDrop;

function allowDrop(event) {
	event.preventDefault();
}

kuma.ondragstart = drag;

function drag (event) {
		event.dataTransfer.setData('id', event.target.id);
}

zone1.ondrop = drop;
zone2.ondrop = drop;

function drop (event) {
	let itemId = event.dataTransfer.getData('id');
	console.log(itemId);
	event.target.append(document.getElementById(itemId));
}

	


	Draggable.create(".kuma", {
	  	bounds:"svg",
	  	onPress: function() {
	    console.log(this);
		  }
	}); 




		Draggable.create(".kuma", {
		  	bounds:"svg",
		  	onDrag: function() {
		    if(this.hitTest("#zone-2")){
		    	TweenLite.to(this.target, 1, {opacity:0});
			  }
		});


		
			document.addEventListener("click", function () {
			  if (kuma.style.fill == "#FEB89E")
			  {
			    kuma.style.fill = "#A2747B";
			  }
			  else {
			    kuma.style.fill = "#FEB89E";
			  }
			});
			document.addEventListener("click", function () {
	        {
	          if (kuma.style.fill == "#FEB89E") {
	          kuma.style.fill = "#A2747B";
	          }
	          else {
	            kuma.style.fill = "#FEB89E";
	          }
	        }
	      });
			document.addEventListener("dblclick", function () {
	        {
	          if (kuma.style.fill == "#A2747B") {
	            kuma.style.fill = "#a8296b";
	          }
	          else {
	            kuma.style.fill = "#a8296b";
	          }
	        }
	      });
	      document.addEventListener("dblclick", function () {
	        {
	          if (kuma.style.fill == "#a8296b") {
	            kuma.style.fill = "#a8296b";
	          }
	          else {
	            kuma.style.fill = "#a8296b";
	          }
	        }
	      });
	    };
	    (function () {
	      let kuma = document.getElementsByClassName('kuma');
	      for (let i = 0; i < kuma.length; i++) {
	        kuma[i].addEventListener('click', function () {
	          setTimeout(function () {
	            kuma[i].style.fill = '#FEB89E';
	          }, 5000);
	        });
	      }
	    })();




	    		let currentDroppable = null;

    kuma.onmousedown = function(event) {

      let shiftX = event.clientX - kuma.getBoundingClientRect().left;
      let shiftY = event.clientY - kuma.getBoundingClientRect().top;

      kuma.style.position = 'absolute';
      kuma.style.zIndex = 1000;
      document.body.append(kuma);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        kuma.style.left = pageX - shiftX + 'px';
        kuma.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        kuma.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        kuma.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null если мы были не над droppable до этого события
            // (например, над пустым пространством)
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
            // (например, только что покинули droppable)
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      kuma.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        kuma.onmouseup = null;
      };

    };

    function enterDroppable(elem) {
      elem.style.background = 'pink';
    }

    function leaveDroppable(elem) {
      elem.style.background = '';
    }

    kuma.ondragstart = function() {
      return false;
    };
</script>