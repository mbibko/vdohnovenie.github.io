'use strict';

// (function($) {
//     var $event = $.event,
//         $special,
//         resizeTimeout;
//     $special = $event.special.debouncedresize = {
//         setup: function() {
//             $(this).on("resize", $special.handler);
//         },
//         teardown: function() {
//             $(this).off("resize", $special.handler);
//         },
//         handler: function(event, execAsap) {
//             // Save the context
//             var context = this,
//                 args = arguments,
//                 dispatch = function() {
//                     // set correct event type
//                     event.type = "debouncedresize";
//                     $event.dispatch.apply(context, args);
//                 };
//             if (resizeTimeout) {
//                 clearTimeout(resizeTimeout);
//             }
//             execAsap ?
//                 dispatch() :
//                 resizeTimeout = setTimeout(dispatch, $special.threshold);
//         },
//         threshold: 150
//     };
// })(jQuery);

// var wHeight = $(window).outerHeight();
// var wWidth = $(window).outerWidth();
// var screenOrientation = ($(window).width() > $(window).height()) ? 90 : 0;

// $.fn.exists = function(callback) {
//     var args = [].slice.call(arguments, 1);

//     if (this.length) {
//         callback.call(this, args);
//     }

//     return this;
// };

// var mobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ;(function() {
// var autosizeTextarea = autosize($('.js-autosize'));
// }());


// ;(function() {

// var $menu = $('.main-menu');
// $('.js-menu-link').on('click', function(e) {
//     $(this).toggleClass('active');
//     if (!$menu.hasClass('active')) {
//         $menu.addClass('active');
//     } else {
//         $menu.removeClass('active');
//     };
//     e.preventDefault();
// });


// $('.main-menu a, .js-scroll-to').on('click', function(e) {
//     $('html, body').animate({
//         scrollTop: $($(this).attr('href')).offset().top
//     }, 900);
//     $menu.removeClass('active');
//     e.preventDefault();
// });

// }());
// $(window).on('scroll', function() {

// });

// $(window).on('resize', function() {
// wHeight = $(window).outerHeight();
// wWidth = $(window).outerWidth();
// });

// $(document).on('click', function(event) {
//   if (!$(event.target).closest('#menucontainer').length) {
//     // Hide the menus.
//   }
// });