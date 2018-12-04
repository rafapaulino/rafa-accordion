(function (window, document, $, undefined) {
    'use strict';

    var accordion = (function () {

        var $private = {};
        var $public = {};

        $private.toggleIcon = function($target) {
            $target.prev('.card-header')
            .find('.fa')
            .toggleClass('fa-plus fa-minus');
        };

        $public.init = function() {
            $(".wrapAccordion").on('hide.bs.collapse', function (e) {
                var $target = $(e.target);
                $private.toggleIcon($target);
            });
            $(".wrapAccordion").on('show.bs.collapse', function (e) {
                var $target = $(e.target);
                $private.toggleIcon($target);
            });
        };

        return $public;
    })();

    // Global
    window.accordion = accordion;
    accordion.init();
})(window, document, jQuery);