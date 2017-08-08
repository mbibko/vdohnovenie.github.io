;
(function() {
    // динамические линки на деревянные страницы
    $.ajax({
            'url': 'ajax.pages_list.php',
            'type': 'get'
        })
        .fail(function() {
            // alert('no pages');
        })
        .success(function(data) {
            if (data.toString().indexOf('<?php') == 0) return;
            var $wnd = $('<div style="font-size: 14px; color: #ffffff; position: absolute; top: 10px; left: 10px; background: #000000; border: 2px solid #cccccc; z-index: 51000; padding: 8px; "/>');
            var $close = $('<a href="#" style="font-size: 14px; color: #ffffff; font-weight: normal; display: block;">Список шаблонов страниц :: Закрыть</a>')
                .click(function(e) {
                    e.preventDefault();
                    $wnd.hide();
                })
                .appendTo($wnd);

            var even = false;
            $(data.pages).each(function() {
                var page = this;
                var style = even ? 'color: #000000; background: #aaaaaa; ' : 'background: #ffffff; color: #000000; '
                $wnd.append('<a href="' + page + '" style="' + style + ' font-size: 14px; padding: 4px; font-weight: normal; display: block;">' + page + '</a>');
                even = !even;
            });
            $('body').append($wnd);
        });
}());