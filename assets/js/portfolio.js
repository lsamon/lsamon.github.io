$(document).ready(function() {
  //PG Slider Section
    var pgwSlider = $('.pgwSlider').pgwSlider();
    pgwSlider.startSlide();

  //Type JS section
  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    backDelay: 1500, //delay backspace action
    typeSpeed: 30,
    callback: function(){
      $('.typed-cursor').remove();
    }
  });
});
