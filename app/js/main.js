
$(document).ready(()=>{
    var toggleMenu = (mobile) => {
        $('header > nav').toggleClass('show-menu');
        $('header').toggleClass('show-menu');
        if(mobile){
            $('body').toggleClass('no-scroll');
        }
        $('div.wrapper').toggleClass('show-menu');
    };
    $('.menu-btn').click(() => toggleMenu(true));
    $('.menu-btn-link').click(() => toggleMenu($(window).width() < 960));

    particlesJS(
        'particle-js',
        {"particles":{"number":{"value":80,"density":{"enable":false,"value_area":800}},"color":{"value":["#BD10E0","#B8E986","#50E3C2","#FFD300","#E86363"]},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"","width":100,"height":100}},"opacity":{"value":0.9,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0.3,"sync":true}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
    );


    $(window).scroll(()=>{
        if($(window).scrollTop() > 0){
            $('header').addClass('sticky');
        }else{
            $('header').removeClass('sticky');            
        }
    });


    $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 30 < 0?0:target.offset().top - 30
        }, 1000);
        return false;
      }
    }
  });
  
});