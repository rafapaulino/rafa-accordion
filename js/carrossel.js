(function (window, document, $, undefined) {
    'use strict';

    var carrossel = (function () {

        var $private = {};
        var $public = {};

        //cria o evento de touch no carrossel do bootstrap
        //exemplo em: https://codepen.io/andrearufo/pen/rVWpyE
        //documentação: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
        $public.touchSwipeCarousel = function() {
            $(".carouselSwipe").each(function(){
                var $this = $(this);
                $this.swipe({
                    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                        if (direction == 'left') $this.carousel('next');
                        if (direction == 'right') $this.carousel('prev');
                    },
                    allowPageScroll:"vertical"
                });
            });
        };

        //cria as animacoes no carrossel
        $private.doAnimations = function(elems) {
            //Cache the animationend event in a variable
            var animEndEv = "webkitAnimationEnd animationend";

            elems.each(function() {
                var $this = $(this),
                $animationType = $this.data("animation");
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        };

        //chama as funcoes e inicializa o carrossel e animacoes carousel
        //referencia: https://codepen.io/SitePoint/pen/KQzPvK
        //tutorial: https://www.sitepoint.com/bootstrap-carousel-with-css3-animations/
        //documentacao carrossel: https://getbootstrap.com/docs/4.0/components/carousel/
        $public.initCarousel = function() {
            //Variables on page load
            var $myCarousel = $(".carousel");
            
            //Initialize carousel
            $myCarousel.each(function(){
                var $this = $(this);
                var $interval = $this.data('interval');

                var $firstAnimatingElems = $this
                    .find(".carousel-item:first")
                    .find("[data-animation ^= 'animated']");

                $this.carousel({
                    interval: $interval
                });

                //Animate captions in first slide on page load
                $private.doAnimations($firstAnimatingElems);

                //Other slides to be animated on carousel slide event
                $this.on("slide.bs.carousel", function(e) {
                    var $animatingElems = $(e.relatedTarget).find(
                        "[data-animation ^= 'animated']"
                    );
                    $private.doAnimations($animatingElems);
                });
            });

        };

        return $public;
    })();

    // Global
    window.carrossel = carrossel;
    carrossel.touchSwipeCarousel();
    carrossel.initCarousel();
})(window, document, jQuery);