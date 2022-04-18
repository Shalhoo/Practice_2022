import * as gsap from "https://cdn.skypack.dev/gsap@3.10.3";
Draggable.create(".kuma", {
  bounds:"svg",
  onPress: function() {
    console.log(this.target);
  }
});