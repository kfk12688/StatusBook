(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/social-2/main.js":[function(require,module,exports){
// Essentials
require('../../../vendor/ui/js/main');

// Layout
require('../../../vendor/layout/js/main');

// Sidebar
require('../../../vendor/sidebar/js/main');

// Chat
require('../../../vendor/chat/js/main');

// Social
require('../../../vendor/social/js/main');

// Maps
window.initGoogleMaps = require('../../../vendor/maps/js/google/main');

// CORE
require('./theme-core');
},{"../../../vendor/chat/js/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/main.js","../../../vendor/layout/js/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/main.js","../../../vendor/maps/js/google/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/main.js","../../../vendor/sidebar/js/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/main.js","../../../vendor/social/js/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/social/js/main.js","../../../vendor/ui/js/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/main.js","./theme-core":"/persistent/var/www/html/themekit-3.6.2/dev/app/js/themes/social-2/theme-core.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint320', function () {
        var img = $('.messages-list .panel ul img');
        $('.messages-list .panel ul').width(img.first().width() * img.length);
    });

    $(window).bind('exitBreakpoint320', function () {
        $('.messages-list .panel ul').width('auto');
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/_nicescroll.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var nice = $('.messages-list .panel').niceScroll({cursorborder: 0, cursorcolor: "#25ad9f", zindex: 1});

    var _super = nice.getContentSize;

    nice.getContentSize = function () {
        var page = _super.call(nice);
        page.h = nice.win.height();
        return page;
    };

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_nicescroll');
},{"./_breakpoints":"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/_breakpoints.js","./_nicescroll":"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/_nicescroll.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/js/pages/users.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#users-filter-select').on('change', function () {
        if (this.value === 'name') {
            $('#user-first').removeClass('hidden');
            $('#user-search-name').removeClass('hidden');
        } else {
            $('#user-first').addClass('hidden');
            $('#user-search-name').addClass('hidden');
        }
        if (this.value === 'friends') {
            $('.select-friends').removeClass('hidden');

        } else {
            $('.select-friends').addClass('hidden');
        }
        if (this.value === 'name') {
            $('.search-name').removeClass('hidden');

        } else {
            $('.search-name').addClass('hidden');
        }
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/js/themes/social-2/theme-core.js":[function(require,module,exports){
// Users
require('../../pages/users');

// Messages
require('../../components/messages/main');
},{"../../components/messages/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/js/components/messages/main.js","../../pages/users":"/persistent/var/www/html/themekit-3.6.2/dev/app/js/pages/users.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint480', function () {
        $('.chat-window-container .panel:not(:last)').remove();
        $('.chat-window-container .panel').attr('id', 'chat-0001');
    });

    $(window).bind('enterBreakpoint768', function () {
        if ($('.chat-window-container .panel').length == 3) {
            $('.chat-window-container .panel:first').remove();
            $('.chat-window-container .panel:first').attr('id', 'chat-0001');
            $('.chat-window-container .panel:last').attr('id', 'chat-0002');
        }
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_search.js":[function(require,module,exports){
(function ($) {

    // match anything
    $.expr[ ":" ].containsNoCase = function (el, i, m) {
        var search = m[ 3 ];
        if (! search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    // Search Filter
    function searchFilterCallBack($data, $opt) {
        var search = $data instanceof jQuery ? $data.val() : $(this).val(),
            opt = typeof $opt == 'undefined' ? $data.data.opt : $opt;

        var $target = $(opt.targetSelector);
        $target.show();

        if (search && search.length >= opt.charCount) {
            $target.not(":containsNoCase(" + search + ")").hide();
        }
    }

    // input filter
    $.fn.searchFilter = function (options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function () {
            var $el = $(this);
            $el.off("keyup", searchFilterCallBack);
            $el.on("keyup", null, {opt: opt}, searchFilterCallBack);
        });

    };

    // Filter by All/Online/Offline
    $(".chat-filter a").on('click', function (e) {

        e.preventDefault();
        $('.chat-contacts li').hide();
        $('.chat-contacts').find($(this).data('target')).show();

        $(".chat-filter li").removeClass('active');
        $(this).parent().addClass('active');

        $(".chat-search input").searchFilter({targetSelector: ".chat-contacts " + $(this).data('target')});

        // Filter Contacts by Search and Tabs
        searchFilterCallBack($(".chat-search input"), {
            targetSelector: ".chat-contacts " + $(this).data('target'),
            charCount: 1
        });
    });

    // Trigger Search Filter
    $(".chat-search input").searchFilter({targetSelector: ".chat-contacts li"});

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_windows.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var container = $('.chat-window-container');

    // Click User
    $(".chat-contacts li").on('click', function () {

        if ($('.chat-window-container [data-user-id="' + $(this).data('userId') + '"]').length) return;

        // If user is offline do nothing
        if ($(this).attr('class') === 'offline') return;

        var source = $("#chat-window-template").html();
        var template = Handlebars.compile(source);

        var context = {user_image: $(this).find('img').attr('src'), user: $(this).find('.contact-name').text()};
        var html = template(context);

        var clone = $(html);

        clone.attr("data-user-id", $(this).data("userId"));

        container.find('.panel:not([id^="chat"])').remove();

        var count = container.find('.panel').length;

        count ++;
        var limit = $(window).width() > 768 ? 3 : 1;
        if (count >= limit) {
            container.find('#chat-000'+ limit).remove();
            count = limit;
        }

        clone.attr('id', 'chat-000' + parseInt(count));
        container.append(clone).show();

        clone.show();
        clone.find('> .panel-body').removeClass('display-none');
        clone.find('> input').removeClass('display-none');
    });

    // Change ID by No. of Windows
    function chatLayout() {
        container.find('.panel').each(function (index, value) {
            $(this).attr('id', 'chat-000' + parseInt(index + 1));
        });
    }

    // remove window
    $("body").on('click', ".chat-window-container .close", function () {
        $(this).parent().parent().remove();
        chatLayout();
        if ($(window).width() < 768) $('.chat-window-container').hide();
    });

    // Chat heading collapse window
    $('body').on('click', '.chat-window-container .panel-heading', function (e) {
        e.preventDefault();
        $(this).parent().find('> .panel-body').toggleClass('display-none');
        $(this).parent().find('> input').toggleClass('display-none');
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_search');
require('./_windows');
},{"./_breakpoints":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_breakpoints.js","./_search":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_search.js","./_windows":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/chat/js/_windows.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable], .st-content-inner').tkScrollable();

    $('[data-scrollable-h]').each(function () {

        $(this).tkScrollable(true);

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h], .st-content-inner').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_async.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_edit.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var find = function (mapData, location, marker, markerData) {

        var eventData = $.extend({}, {marker: marker}, markerData, mapData),
            state = '',
            country = '',
            address = '';

        mapData.container.gmap('search', {'location': location}, function (results, status) {

            if (status === 'OK') {
                address = results[ 0 ].formatted_address;
                $.each(results[ 0 ].address_components, function (i, v) {
                    if (v.types[ 0 ] == "administrative_area_level_1" || v.types[ 0 ] == "administrative_area_level_2") {
                        state = v.long_name;
                    } else if (v.types[ 0 ] == "country") {
                        country = v.long_name;
                    }
                });
                eventData = $.extend({}, eventData, {state: state, country: country, address: address});
            }

            $(document).trigger('map.marker.find', eventData);

        });

    };

    var bindFind = function(marker, markerData, data) {

        if (typeof markerData.open !== 'undefined' && markerData.open === true) {
            find(data, markerData.latLng, marker, markerData);
        }

        google.maps.event.addListener(marker, 'dragend', function (e) {
            find(data, e.latLng, this, markerData);
        });

        google.maps.event.addListener(marker, 'click', function (e) {
            find(data, e.latLng, this, markerData);
        });

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('id') == 'map-edit') {

            var markers = data.container.gmap('get', 'markers'),
                markerOptions = {
                    "draggable": true
                },
                markerData = {
                    "open": true,
                    "template": "tpl-edit",
                    "icon": "building-01"
                };

            google.maps.event.addListener(data.map, 'click', function (event) {

                markerData = $.extend({}, markerData, {"latLng": event.latLng});

                var marker = data.addMarker(markers.length, markerData, markerOptions);

                bindFind(marker, markerData, data);

            });

            google.maps.event.addListener(data.iw.window, 'domready', function () {

                $('#map-delete-marker').on('click', function (e) {
                    e.stopPropagation();
                    var id = $(this).data('id');
                    data.iw.close(id);
                    markers[ id ].setMap(null);
                });

            });

            $.each(markers, function(i, marker){

                var markerData = marker.get('content');

                bindFind(marker, markerData, data);

            });

        }

    });

    $(document).on('map.marker.find', function (event, data) {

        data.marker.setTitle(data.address);

        if (data.iw.window.isOpen === false) return;

        data.iw.open(data.marker.get('id'), data);

    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_filters.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    var filter = function(data){

        data.iw.close();
        data.container.gmap('set', 'bounds', null);

        var filters = [];

        $('#radios :checked').each(function (i, checkbox) {
            filters.push($(checkbox).val());
        });

        if (filters.length) {
            data.container.gmap('find', 'markers', {
                'property': 'tags',
                'value': filters,
                'operator': 'OR'
            }, function (marker, found) {
                if (found) {
                    data.container.gmap('addBounds', marker.position);
                }
                marker.setVisible(found);
            });
        } else {
            $.each(data.container.gmap('get', 'markers'), function (i, marker) {
                data.container.gmap('addBounds', marker.position);
                marker.setVisible(false);
            });
        }

    };

    $(document).on('map.init', function (event, data) {

        if (data.container.data('filters') === true) {

            var map = data,
                markers = data.container.gmap('get', 'markers'),
                tags = [],
                templateId = data.container.data('filtersTemplate') || '#map-filters-template';

            $.each(markers, function(i, marker){
                $.each(marker.tags, function(i, tag){
                    tags.push(tag);
                });
            });

            tags = arrayUnique(tags);

            var source = $(templateId).html();
            var template = Handlebars.compile(source);
            var $el = $(template({ tags: tags }));

            $el.insertAfter(data.container);

            var skin = require('../../../layout/js/_skin')();

            $('[data-scrollable]', $el).niceScroll({
                cursorborder: 0,
                cursorcolor: config.skins[ skin ][ 'primary-color' ],
                horizrailenabled: false
            });

            setTimeout(function(){
                filter(data);
            }, 100);

            $('body').on('click', '#radios :checkbox', function(){
                filter(data);
            });

        }

    });

})(jQuery);
},{"../../../layout/js/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_library.js":[function(require,module,exports){
module.exports = function () {

    var centerWindow = function (container, map, data) {

        if (data.lat && data.lng) {

            container.gmap('option', 'center', new google.maps.LatLng(data.lat, data.lng));

            map.panBy(0, -170);

            return true;

        }
        return false;
    };

    var centerMap = function (container, data) {

        if (data && data.length === 2) {

            container.gmap('option', 'center', new google.maps.LatLng(data[ 0 ], data[ 1 ]));

            return true;

        }
        return false;
    };

    var resize = function (container, map, windowData, mapData) {

        if (typeof google == 'undefined') return;

        google.maps.event.trigger(map, 'resize');

        if (! centerMap(container, mapData)) centerWindow(container, map, windowData);

    };

    return {
        centerWindow: centerWindow,
        centerMap: centerMap,
        resize: resize
    };

};
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/main.js":[function(require,module,exports){
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
    'callback=initGoogleMaps';
    document.body.appendChild(script);
}

window.onload = loadScript;

function initScripts() {
    var $scripts = [
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.extensions.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.services.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.microdata.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.microformat.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.overlays.js",
        "js/plugins/maps_google/jquery-ui-map/ui/jquery.ui.map.rdfa.js",
        "js/plugins/maps_google/jquery-ui-map/addons/infobox_packed.js",
        "js/plugins/maps_google/jquery-ui-map/addons/markerclusterer.min.js"
    ];

    $.each($scripts, function (k, v) {
        if ($('[src="' + v + '"]').length) return true;
        var scriptNode = document.createElement('script');

        scriptNode.src = v;
        $('head').prepend($(scriptNode));
    });

    $.extend($.ui.gmap.prototype, {
        pagination: function (prop, mapData) {
            var source = $("#map-pagination").html();
            var template = Handlebars.compile(source);
            var $el = $(template());

            var self = this, i = 0;
            prop = prop || 'title';
            self.set('pagination', function (a, b) {
                if (a) {
                    i = i + b;
                    var m = self.get('markers')[ i ];
                    mapData.iw.open(i, m.get('content'));
                    $el.find('.display').text(m[ prop ]);
                    self.get('map').panTo(m.getPosition());
                }
            });
            self.get('pagination')(true, 0);
            $el.find('.back-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i > 0), - 1, this);
            });
            $el.find('.fwd-btn').click(function (e) {
                e.preventDefault();
                self.get('pagination')((i < self.get('markers').length - 1), 1, this);
            });
            self.addControl($el, google.maps.ControlPosition[ mapData.options.paginationPosition ]);
        }
    });
}

var library = require('./_library.js')();

// Holds google maps styles
var styles = {
    "light-grey": require('./styles/_light-grey.js'),
    "light-monochrome": require('./styles/_light-monochrome.js'),
    "cool-grey": require('./styles/_cool-grey.js'),
    "blue-gray": require('./styles/_blue-gray.js'),
    "paper": require('./styles/_paper.js'),
    "apple": require('./styles/_apple.js'),
    "light-green": require('./styles/_light-green.js'),
    "lemon-tree": require('./styles/_lemon-tree.js'),
    "clean-cut": require('./styles/_clean-cut.js'),
    "nature": require('./styles/_nature.js')
};

// Process the infoWindow content via Handlebars templates
var infoWindowContent = function (marker) {
    var source = $("#" + marker.template).html();
    var template = Handlebars.compile(source);
    return template(marker);
};

/**
 * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
 */
$.fn.tkGoogleMap = function () {

    if (! this.length) return;

    var container = this;

    if (typeof google == 'undefined') {
        setTimeout(function(){
            container.tkGoogleMap();
        }, 200);

        return;
    }

    var options = {
        mapZoomPosition: container.data('zoomPosition') || "TOP_LEFT",
        mapZoom: container.data('zoom') || 16,
        mapStyle: container.data('style') || "light-grey",
        mapType: container.data('type') || "ROADMAP",
        file: container.data('file'),
        center: container.data('center') ? container.data('center').split(",") : false,
        pagination: container.data('pagination') || false,
        paginationPosition: container.data('paginationPosition') || 'TOP_LEFT'
    };

    var mapData;

    // provide a default object for data collected from the currently opened infoWindow
    var infoWindowData = {
        lat: false,
        lng: false
    };

    var infoWindowOpen = function (i, marker) {

        var markerInst = container.gmap('get', 'markers')[ i ];

        infoWindow.setContent(infoWindowContent(marker));
        infoWindow.open(map, markerInst);
        infoWindow.isOpen = i;

        infoWindowData = {
            lat: marker.latitude,
            lng: marker.longitude
        };
    };

    var infoWindowClose = function (i) {
        if (typeof i == 'undefined') {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        if (typeof infoWindow.isOpen != 'undefined' && infoWindow.isOpen === i) {
            infoWindow.close();
            infoWindow.isOpen = false;
            return true;
        }
        return false;
    };

    /* InfoBox */
    var infoWindow = new InfoBox({
        maxWidth: 240,
        alignBottom: true
    });

    var addMarker = function (i, marker, options) {
        var iconBase = 'images/markers/';
        var position = typeof marker.latLng !== 'undefined' ? marker.latLng : false;
        if (! position && typeof marker.latitude !== 'undefined' && typeof marker.longitude !== 'undefined') position = new google.maps.LatLng(marker.latitude, marker.longitude);
        if (! position) return false;

        var markerOptions = {
            "id": i,
            "position": position,
            "draggable": true,
            "icon": iconBase + marker.icon + ".png"
        };

        if (typeof options == 'object') markerOptions = $.extend({}, markerOptions, options);

        var open = typeof marker.open !== 'undefined' && marker.open === true;

        container.gmap('addMarker', markerOptions);

        var markerInst = container.gmap('get', 'markers')[ i ];

        markerInst.setTitle(marker.title);

        google.maps.event.addListener(markerInst, 'click', function () {
            if (! infoWindowClose(i)) {
                infoWindowOpen(i, marker);
                library.centerWindow(container, map, infoWindowData);
            }
        });

        google.maps.event.addListener(markerInst, 'dragend', function () {
            var lat = markerInst.getPosition().lat();
            var lng = markerInst.getPosition().lng();
            console.log('"latitude": ' + lat + ', "longitude": ' + lng);
        });

        var markerData = $.extend({}, marker, {
            "id": i,
            "latLng": new google.maps.LatLng(marker.latitude, marker.longitude)
        });

        markerInst.set('content', markerData);

        if (open) infoWindowOpen(i, marker);

        return markerInst;
    };

    container.gmap(
        {
            'zoomControl': true,
            'zoomControlOptions': {
                'style': google.maps.ZoomControlStyle.SMALL,
                'position': google.maps.ControlPosition[ options.mapZoomPosition ]
            },
            'panControl': false,
            'streetViewControl': false,
            'mapTypeControl': false,
            'overviewMapControl': false,
            'scrollwheel': false,
            'mapTypeId': google.maps.MapTypeId[ options.mapType ],
            'zoom': options.mapZoom,
            'styles': styles[ options.mapStyle ]
        })
        .bind('init', function () {

            mapData = {
                container: container,
                map: map,
                options: options,
                addMarker: addMarker,
                library: library,
                iw: {
                    data: infoWindowData,
                    window: infoWindow,
                    content: infoWindowContent,
                    open: infoWindowOpen,
                    close: infoWindowClose
                }
            };

            if (options.file) {

                $.getJSON(options.file, function (data) {

                    $.each(data.markers, function (i, marker) {
                        var o = typeof marker.options !== 'undefined' ? marker.options : {};
                        addMarker(i, marker, o);
                    });

                    google.maps.event.addListenerOnce(map, 'idle', function () {

                        library.resize(container, map, infoWindowData, options.center);

                        if (options.pagination) {
                            container.gmap('pagination', 'title', mapData);
                        }

                    });
                });

            }
            else {
                library.centerMap(container, options.center);
            }

            google.maps.event.addListenerOnce(map, 'idle', function () {

                $(document).trigger('map.init', mapData);

            });

            google.maps.event.addListener(infoWindow, 'domready', function () {
                var iw = $('.infoBox');
                infoWindow.setOptions({
                    pixelOffset: new google.maps.Size(- Math.abs(iw.width() / 2), - 45)
                });
            });
        });

    var map = container.gmap('get', 'map');

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            library.resize(container, map, infoWindowData, options.center);
        }, 100);
    });

    // handle maps in collapsibles
    $('.collapse').on('shown.bs.collapse', function(){
        if ($(container, this).length) {
            library.resize(container, map, infoWindowData, options.center);
        }
    });

};

module.exports = function () {
    initScripts();

    /*
     * Clustering
     */
    if ($('#google-map-clustering').length) {
        // We need to bind the map with the "init" event otherwise bounds will be null
        $('#google-map-clustering').gmap({'zoom': 2, 'disableDefaultUI': true}).bind('init', function (evt, map) {
            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            function openInfoWindow() {
                $('#google-map-clustering').gmap('openInfoWindow', {content: 'Hello world!'}, this);
            }

            for (var i = 0; i < 1000; i ++) {
                var lat = southWest.lat() + latSpan * Math.random();
                var lng = southWest.lng() + lngSpan * Math.random();
                $('#google-map-clustering').gmap('addMarker', {
                    'position': new google.maps.LatLng(lat, lng)
                }).click(openInfoWindow);
            }

            $('#google-map-clustering').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(this).gmap('get', 'markers')));
        });
    }

    $(document).on('map.init', function (event, data) {

        var styleTpl = $('#map-style-switch'),
            toggleStyleWrapper = $('[data-toggle="map-style-switch"]');

        if (styleTpl.length && toggleStyleWrapper.length) {

            var target = $(toggleStyleWrapper.data('target'));

            if (! target) return;

            if (data.container.is(target)) {

                var s = styleTpl.html();
                var t = Handlebars.compile(s);

                toggleStyleWrapper.html(t({
                    styles: styles
                }));

                $('select', toggleStyleWrapper).val(data.options.mapStyle);

                if (typeof $.fn.selectpicker != 'undefined') {

                    $('.selectpicker', toggleStyleWrapper).each(function () {
                        $(this).selectpicker({
                            width: $(this).data('width') || '100%'
                        });
                    });

                }

                var skin = require('../../../layout/js/_skin')();

                $('[data-scrollable]', toggleStyleWrapper).niceScroll({
                    cursorborder: 0,
                    cursorcolor: config.skins[ skin ][ 'primary-color' ],
                    horizrailenabled: false
                });

                $('select', toggleStyleWrapper).on('change', function () {
                    var style = typeof styles[ $(this).val() ] ? styles[ $(this).val() ] : false;
                    if (! style) return;

                    target.gmap('option', 'styles', style);
                });

            }

        }

    });

    var containers = $('[data-toggle="google-maps"]');

    if (containers.length) {

        containers.each(function () {

            $(this).tkGoogleMap();

        });
    }

};

require('./_edit');
require('./_filters');
},{"../../../layout/js/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js","./_edit":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_edit.js","./_filters":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_filters.js","./_library.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/_library.js","./styles/_apple.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_apple.js","./styles/_blue-gray.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_blue-gray.js","./styles/_clean-cut.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_clean-cut.js","./styles/_cool-grey.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_cool-grey.js","./styles/_lemon-tree.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_lemon-tree.js","./styles/_light-green.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-green.js","./styles/_light-grey.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-grey.js","./styles/_light-monochrome.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-monochrome.js","./styles/_nature.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_nature.js","./styles/_paper.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_paper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_apple.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [ {"color": "#f7f1df"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [ {"color": "#d0e3b4"} ]
}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [ {"color": "#fbd3da"} ]
}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [ {"color": "#bde6ab"} ]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffe15f"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#efd151"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "black"} ]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#cfb2db"} ]
}, {"featureType": "water", "elementType": "geometry", "stylers": [ {"color": "#a2daf2"} ]} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_blue-gray.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "stylers": [ {"visibility": "on"}, {"color": "#b5cbe4"} ]
}, {"featureType": "landscape", "stylers": [ {"color": "#efefef"} ]}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"color": "#83a5b0"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#bdcdd3"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#e3eed3"} ]
}, {
    "featureType": "administrative",
    "stylers": [ {"visibility": "on"}, {"lightness": 33} ]
}, {"featureType": "road"}, {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"}, {"lightness": 20} ]
}, {}, {"featureType": "road", "stylers": [ {"lightness": 20} ]} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_clean-cut.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"}, {"color": "#C6E2FF"} ]
}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [ {"color": "#C5E3BF"} ]}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#D1D1B8"} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_cool-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "transit", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "water", "elementType": "labels", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [ {"visibility": "off"} ]
}, {"stylers": [ {"hue": "#00aaff"}, {"saturation": - 100}, {"gamma": 2.15}, {"lightness": 12} ]}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [ {"visibility": "on"}, {"lightness": 24} ]
}, {"featureType": "road", "elementType": "geometry", "stylers": [ {"lightness": 57} ]} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_lemon-tree.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "landscape.natural",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "on"} ]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"hue": "#ffe94f"}, {"saturation": 100}, {"lightness": 4}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"hue": "#333333"}, {"saturation": - 100}, {"lightness": - 74}, {"visibility": "off"} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-green.js":[function(require,module,exports){
module.exports = [ {"stylers": [ {"hue": "#baf4c4"}, {"saturation": 10} ]}, {
    "featureType": "water",
    "stylers": [ {"color": "#effefd"} ]
}, {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [ {"visibility": "on"} ]
}, {"featureType": "road", "elementType": "all", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-grey.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ {"color": "#e9e9e9"}, {"lightness": 17} ]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 20} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 17} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2} ]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 18} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [ {"color": "#f5f5f5"}, {"lightness": 21} ]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [ {"color": "#dedede"}, {"lightness": 21} ]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [ {"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16} ]
}, {
    "elementType": "labels.text.fill",
    "stylers": [ {"saturation": 36}, {"color": "#333333"}, {"lightness": 40} ]
}, {"elementType": "labels.icon", "stylers": [ {"visibility": "off"} ]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [ {"color": "#f2f2f2"}, {"lightness": 19} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 20} ]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [ {"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_light-monochrome.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [ {"hue": "#2c2e33"}, {"saturation": 7}, {"lightness": 19}, {"visibility": "on"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "simplified"} ]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [ {"hue": "#ffffff"}, {"saturation": - 100}, {"lightness": 100}, {"visibility": "off"} ]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "simplified"} ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": 31}, {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [ {"hue": "#bbc0c4"}, {"saturation": - 93}, {"lightness": - 2}, {"visibility": "simplified"} ]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 90}, {"lightness": - 8}, {"visibility": "simplified"} ]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"hue": "#e9ebed"}, {"saturation": - 78}, {"lightness": 67}, {"visibility": "simplified"} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_nature.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "landscape",
    "stylers": [ {"hue": "#FFA800"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.highway",
    "stylers": [ {"hue": "#53FF00"}, {"saturation": - 73}, {"lightness": 40}, {"gamma": 1} ]
}, {
    "featureType": "road.arterial",
    "stylers": [ {"hue": "#FBFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1} ]
}, {
    "featureType": "road.local",
    "stylers": [ {"hue": "#00FFFD"}, {"saturation": 0}, {"lightness": 30}, {"gamma": 1} ]
}, {
    "featureType": "water",
    "stylers": [ {"hue": "#00BFFF"}, {"saturation": 6}, {"lightness": 8}, {"gamma": 1} ]
}, {
    "featureType": "poi",
    "stylers": [ {"hue": "#679714"}, {"saturation": 33.4}, {"lightness": - 25.4}, {"gamma": 1} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/maps/js/google/styles/_paper.js":[function(require,module,exports){
module.exports = [ {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100} ]
}, {"featureType": "poi", "elementType": "all", "stylers": [ {"visibility": "simplified"} ]}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [ {"visibility": "off"}, {"weight": 0.6}, {"saturation": - 85}, {"lightness": 61} ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ {"visibility": "on"} ]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [ {"visibility": "off"} ]
}, {"featureType": "road.local", "elementType": "all", "stylers": [ {"visibility": "on"} ]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"} ]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [ {"visibility": "simplified"}, {"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86} ]
} ];
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_collapsible.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarCollapse = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('click');
        sidebar.off('mouseleave');
        sidebar.find('.dropdown').off('mouseover');
        sidebar.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        sidebar.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        sidebar.find('#dropdown-temp').remove();

        sidebar.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse').on('click', function(e){
                e.preventDefault();
            });

        sidebar.find('.collapse').on('shown.bs.collapse', function () {
            sidebar.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        sidebar.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open [data-toggle="collapse"]');
            if (parents.length) {
                parents.trigger('click');
            }
            $(this).closest('.hasSubmenu').addClass("open");
        });

        sidebar.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass("open");
        });

        sidebar.find('.collapse').collapse({ toggle: false });

    };

    $('.sidebar[data-type="collapse"]').each(function(){
        $(this).tkSidebarCollapse();
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarDropdown = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = sidebar.find('[data-scrollable]').getNiceScroll()[ 0 ];

        nice.scrollstart(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            sidebar.addClass('scrolling');
            sidebar.find('#dropdown-temp > ul > li').empty();
            sidebar.find('#dropdown-temp').hide();
            sidebar.find('.open').removeClass('open');
        });

        nice.scrollend(function () {
            if (! sidebar.is('[data-type="dropdown"]')) return;
            $.data(this, 'lastScrollTop', nice.getScrollTop());
            sidebar.removeClass('scrolling');
        });

        sidebar.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        sidebar.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        sidebar.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        sidebar.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        sidebar.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        sidebar.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    };

    var transform_dd = function(){

        $('.sidebar[data-type="dropdown"]').each(function(){
            $(this).tkSidebarDropdown();
        });

    };

    var transform_collapse = function(){

        $('.sidebar[data-type="collapse"]').each(function(){
            $(this).tkSidebarCollapse();
        });

    };

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_options.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#subnav').collapse({'toggle': false});

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            containerSelector = '.st-container',

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var container = $(containerSelector);

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var container = $(containerSelector);

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {

            var container = $(containerSelector);

            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }

        });

        /**
         * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
         */
        $.fn.tkSidebarToggleBar = function () {

            if (! this.length) return;

            var sidebar = this;

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }

        };

        $('.sidebar').each(function(){
            $(this).tkSidebarToggleBar();
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');

(function($){
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebar = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            menuType: false,
            toggleBar: false
        }, options);

        var sidebar = this;

        if (settings.menuType == "collapse") {
            sidebar.tkSidebarCollapse();
        }

        if (settings.menuType == "dropdown") {
            sidebar.tkSidebarDropdown();
        }

        if (settings.toggleBar === true) {
            sidebar.tkSidebarToggleBar();
        }

    };

})(jQuery);
},{"./_breakpoints":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_breakpoints.js","./_collapsible":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_collapsible.js","./_dropdown":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_dropdown.js","./_sidebar-menu":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/sidebar/js/_sidebar-toggle.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/social/js/_timeline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/social/js/main.js":[function(require,module,exports){
require('./_timeline');
},{"./_timeline":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/social/js/_timeline.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-carousel.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCarousel = function () {

        if (! this.length) return;

        this.carousel();

        this.find('[data-slide]').click(function (e) {
            e.preventDefault();
        });

    };

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCollapse = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function(e){
            e.preventDefault();
        });

        $(target).collapse({toggle: false});

    };

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-switch.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle="switch-checkbox"]').each(function () {

        $(this).bootstrapSwitch({
            offColor: 'danger'
        });

    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCheckAll = function(){

        if (! this.length) return;

        this.on('click', function () {
            $($(this).data('target')).find(':checkbox').prop('checked', this.checked);
        });

    };

    // Check All Checkboxes
    $('[data-toggle="check-all"]').tkCheckAll();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    $.fn.tkCover = function(){

        if (! this.length) return;

        this.filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            t.height(i.height());
            $('.overlay-full', t).innerHeight(i.height());
            $(document).trigger('domChanged');
        });

        this.filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                img = t.find('img');

            img.each(function () {
                var i = $(this);
                $(i).removeAttr('style');
                $(i).css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
            });
        });

    };

    function height() {

        $('.cover.overlay').each(function(){
            $(this).tkCover();
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').tkDatePicker();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#reportrange').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            startDate: moment().subtract('days', 29),
            endDate: moment()
        },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );

    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_expandable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkExpandable = function () {

        if (! this.length) return;

        this.find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');

    };

    $('.expandable').each(function () {
        $(this).tkExpandable();
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkMiniColors = function () {

        if (! this.length) return;

        if (typeof $.fn.minicolors != 'undefined') {

            this.minicolors({
                control: this.attr('data-control') || 'hue',
                defaultValue: this.attr('data-defaultValue') || '',
                inline: this.attr('data-inline') === 'true',
                letterCase: this.attr('data-letterCase') || 'lowercase',
                opacity: this.attr('data-opacity'),
                position: this.attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        }

    };

    $('.minicolors').each(function () {

        $(this).tkMiniColors();

    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_panel-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var randomId = function() {
        /** @return String */
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkPanelCollapse = function () {

        if (! this.length) return;

        var body = $('.panel-body', this),
            id = body.attr('id') || randomId(),
            collapse = $('<div/>');

        collapse
            .attr('id', id)
            .addClass('collapse' + (this.data('open') ? ' in' : ''))
            .append(body.clone());

        body.remove();

        $(this).append(collapse);

        $('.panel-collapse-trigger', this)
            .attr('data-toggle', 'collapse' )
            .attr('data-target', '#' + id)
            .collapse({ trigger: false });

    };

    $('[data-toggle="panel-collapse"]').each(function(){
        $(this).tkPanelCollapse();
    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2 = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            var t = this,
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Enable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $($(this).data('target')).select2("enable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Disable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $(this.data('target')).select2("disable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Flags = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            // templating
            var format = function (state) {
                if (! state.id) return state.text;
                return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
            };

            this.select2({
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

        }

    };

    $('[data-toggle*="select2"]').each(function() {

        $(this).tkSelect2();

    });

    $('[data-toggle="select2-enable"]').tkSelect2Enable();

    $('[data-toggle="select2-disable"]').tkSelect2Disable();

    $("#select2_7").tkSelect2Flags();

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelectPicker = function () {

        if (! this.length) return;

        if (typeof $.fn.selectpicker != 'undefined') {

            this.selectpicker({
                width: this.data('width') || '100%'
            });

        }

    };

    $(function () {

        $('.selectpicker').each(function () {
           $(this).tkSelectPicker();
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_skin.js":[function(require,module,exports){
module.exports=require("/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js")
},{"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var bars = function(el){
        $('.slider-handle', el).html('<i class="fa fa-bars fa-rotate-90"></i>');
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider();

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider({
                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderUpdate = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.on("slide", function (slideEvt) {
                $(this.attr('data-on-slide')).text(slideEvt.value);
            });

            bars(this);

        }

    };

    $('[data-slider="default"]').tkSlider();

    $('[data-slider="formatter"]').tkSliderFormatter();

    $('[data-on-slide]').tkSliderUpdate();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tables.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDataTable = function(){

        if (! this.length) return;

        if (typeof $.fn.dataTable != 'undefined') {

            this.dataTable();

        }

    };

    $('[data-toggle="data-table"]').tkDataTable();

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_touchspin.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tree.js":[function(require,module,exports){
(function ($) {

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_check-all');
require('./_progress-bars');
require('./_iframe');
require('./_bootstrap-collapse');
require('./_bootstrap-carousel');
require('./_panel-collapse');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
require('./_bootstrap-switch');
},{"./_bootstrap-carousel":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-collapse.js","./_bootstrap-switch":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_bootstrap-switch.js","./_check-all":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_check-all.js","./_cover":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_cover.js","./_datepicker":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_datepicker.js","./_daterangepicker":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_daterangepicker.js","./_expandable":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_expandable.js","./_iframe":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_iframe.js","./_minicolors":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_minicolors.js","./_nestable":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_nestable.js","./_panel-collapse":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_panel-collapse.js","./_progress-bars":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_progress-bars.js","./_select2":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_select2.js","./_selectpicker":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_selectpicker.js","./_show-hover":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_show-hover.js","./_slider":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_slider.js","./_tables":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tables.js","./_tabs":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tabs.js","./_tooltip":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tooltip.js","./_touchspin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_touchspin.js","./_tree":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/ui/js/_tree.js"}]},{},["./app/js/themes/social-2/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzL3NvY2lhbC0yL21haW4uanMiLCJhcHAvanMvY29tcG9uZW50cy9tZXNzYWdlcy9fYnJlYWtwb2ludHMuanMiLCJhcHAvanMvY29tcG9uZW50cy9tZXNzYWdlcy9fbmljZXNjcm9sbC5qcyIsImFwcC9qcy9jb21wb25lbnRzL21lc3NhZ2VzL21haW4uanMiLCJhcHAvanMvcGFnZXMvdXNlcnMuanMiLCJhcHAvanMvdGhlbWVzL3NvY2lhbC0yL3RoZW1lLWNvcmUuanMiLCJhcHAvdmVuZG9yL2NoYXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9jaGF0L2pzL19zZWFyY2guanMiLCJhcHAvdmVuZG9yL2NoYXQvanMvX3dpbmRvd3MuanMiLCJhcHAvdmVuZG9yL2NoYXQvanMvbWFpbi5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19hc3luYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19icmVha3BvaW50cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19ncmlkYWxpY2lvdXMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9faXNvdG9wZS5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19zY3JvbGxhYmxlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NpZGViYXItcGMuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2tpbi5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2lucy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL21haW4uanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL19lZGl0LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9fZmlsdGVycy5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvX2xpYnJhcnkuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL21haW4uanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fYXBwbGUuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fYmx1ZS1ncmF5LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2NsZWFuLWN1dC5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19jb29sLWdyZXkuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fbGVtb24tdHJlZS5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19saWdodC1ncmVlbi5qcyIsImFwcC92ZW5kb3IvbWFwcy9qcy9nb29nbGUvc3R5bGVzL19saWdodC1ncmV5LmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX2xpZ2h0LW1vbm9jaHJvbWUuanMiLCJhcHAvdmVuZG9yL21hcHMvanMvZ29vZ2xlL3N0eWxlcy9fbmF0dXJlLmpzIiwiYXBwL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9zdHlsZXMvX3BhcGVyLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19icmVha3BvaW50cy5qcyIsImFwcC92ZW5kb3Ivc2lkZWJhci9qcy9fY29sbGFwc2libGUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX2Ryb3Bkb3duLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19vcHRpb25zLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL19zaWRlYmFyLW1lbnUuanMiLCJhcHAvdmVuZG9yL3NpZGViYXIvanMvX3NpZGViYXItdG9nZ2xlLmpzIiwiYXBwL3ZlbmRvci9zaWRlYmFyL2pzL21haW4uanMiLCJhcHAvdmVuZG9yL3NvY2lhbC9qcy9fdGltZWxpbmUuanMiLCJhcHAvdmVuZG9yL3NvY2lhbC9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLWNhcm91c2VsLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLWNvbGxhcHNlLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fYm9vdHN0cmFwLXN3aXRjaC5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2NoZWNrLWFsbC5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2NvdmVyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fZGF0ZXBpY2tlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2RhdGVyYW5nZXBpY2tlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX2V4cGFuZGFibGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19pZnJhbWUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19taW5pY29sb3JzLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fbmVzdGFibGUuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19wYW5lbC1jb2xsYXBzZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3Byb2dyZXNzLWJhcnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL19zZWxlY3QyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2VsZWN0cGlja2VyLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fc2hvdy1ob3Zlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3NsaWRlci5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYmxlcy5qcyIsImFwcC92ZW5kb3IvdWkvanMvX3RhYnMuanMiLCJhcHAvdmVuZG9yL3VpL2pzL190b29sdGlwLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdG91Y2hzcGluLmpzIiwiYXBwL3ZlbmRvci91aS9qcy9fdHJlZS5qcyIsImFwcC92ZW5kb3IvdWkvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gRXNzZW50aWFsc1xucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3VpL2pzL21haW4nKTtcblxuLy8gTGF5b3V0XG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvbGF5b3V0L2pzL21haW4nKTtcblxuLy8gU2lkZWJhclxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3NpZGViYXIvanMvbWFpbicpO1xuXG4vLyBDaGF0XG5yZXF1aXJlKCcuLi8uLi8uLi92ZW5kb3IvY2hhdC9qcy9tYWluJyk7XG5cbi8vIFNvY2lhbFxucmVxdWlyZSgnLi4vLi4vLi4vdmVuZG9yL3NvY2lhbC9qcy9tYWluJyk7XG5cbi8vIE1hcHNcbndpbmRvdy5pbml0R29vZ2xlTWFwcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3ZlbmRvci9tYXBzL2pzL2dvb2dsZS9tYWluJyk7XG5cbi8vIENPUkVcbnJlcXVpcmUoJy4vdGhlbWUtY29yZScpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDMyMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGltZyA9ICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCB1bCBpbWcnKTtcbiAgICAgICAgJCgnLm1lc3NhZ2VzLWxpc3QgLnBhbmVsIHVsJykud2lkdGgoaW1nLmZpcnN0KCkud2lkdGgoKSAqIGltZy5sZW5ndGgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2V4aXRCcmVha3BvaW50MzIwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwgdWwnKS53aWR0aCgnYXV0bycpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgbmljZSA9ICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCcpLm5pY2VTY3JvbGwoe2N1cnNvcmJvcmRlcjogMCwgY3Vyc29yY29sb3I6IFwiIzI1YWQ5ZlwiLCB6aW5kZXg6IDF9KTtcblxuICAgIHZhciBfc3VwZXIgPSBuaWNlLmdldENvbnRlbnRTaXplO1xuXG4gICAgbmljZS5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgcGFnZS5oID0gbmljZS53aW4uaGVpZ2h0KCk7XG4gICAgICAgIHJldHVybiBwYWdlO1xuICAgIH07XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX25pY2VzY3JvbGwnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyN1c2Vycy1maWx0ZXItc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnI3VzZXItZmlyc3QnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkKCcjdXNlci1zZWFyY2gtbmFtZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyN1c2VyLWZpcnN0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnI3VzZXItc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICdmcmllbmRzJykge1xuICAgICAgICAgICAgJCgnLnNlbGVjdC1mcmllbmRzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LWZyaWVuZHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnLnNlYXJjaC1uYW1lJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIi8vIFVzZXJzXG5yZXF1aXJlKCcuLi8uLi9wYWdlcy91c2VycycpO1xuXG4vLyBNZXNzYWdlc1xucmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZXNzYWdlcy9tYWluJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NDgwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbDpub3QoOmxhc3QpJykucmVtb3ZlKCk7XG4gICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsJykuYXR0cignaWQnLCAnY2hhdC0wMDAxJyk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NzY4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwnKS5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWw6Zmlyc3QnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsOmZpcnN0JykuYXR0cignaWQnLCAnY2hhdC0wMDAxJyk7XG4gICAgICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbDpsYXN0JykuYXR0cignaWQnLCAnY2hhdC0wMDAyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIG1hdGNoIGFueXRoaW5nXG4gICAgJC5leHByWyBcIjpcIiBdLmNvbnRhaW5zTm9DYXNlID0gZnVuY3Rpb24gKGVsLCBpLCBtKSB7XG4gICAgICAgIHZhciBzZWFyY2ggPSBtWyAzIF07XG4gICAgICAgIGlmICghIHNlYXJjaCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChzZWFyY2gsIFwiaVwiKS50ZXN0KCQoZWwpLnRleHQoKSk7XG4gICAgfTtcblxuICAgIC8vIFNlYXJjaCBGaWx0ZXJcbiAgICBmdW5jdGlvbiBzZWFyY2hGaWx0ZXJDYWxsQmFjaygkZGF0YSwgJG9wdCkge1xuICAgICAgICB2YXIgc2VhcmNoID0gJGRhdGEgaW5zdGFuY2VvZiBqUXVlcnkgPyAkZGF0YS52YWwoKSA6ICQodGhpcykudmFsKCksXG4gICAgICAgICAgICBvcHQgPSB0eXBlb2YgJG9wdCA9PSAndW5kZWZpbmVkJyA/ICRkYXRhLmRhdGEub3B0IDogJG9wdDtcblxuICAgICAgICB2YXIgJHRhcmdldCA9ICQob3B0LnRhcmdldFNlbGVjdG9yKTtcbiAgICAgICAgJHRhcmdldC5zaG93KCk7XG5cbiAgICAgICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gubGVuZ3RoID49IG9wdC5jaGFyQ291bnQpIHtcbiAgICAgICAgICAgICR0YXJnZXQubm90KFwiOmNvbnRhaW5zTm9DYXNlKFwiICsgc2VhcmNoICsgXCIpXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlucHV0IGZpbHRlclxuICAgICQuZm4uc2VhcmNoRmlsdGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdCA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIC8vIHRhcmdldCBzZWxlY3RvclxuICAgICAgICAgICAgdGFyZ2V0U2VsZWN0b3I6IFwiXCIsXG4gICAgICAgICAgICAvLyBudW1iZXIgb2YgY2hhcmFjdGVycyBiZWZvcmUgc2VhcmNoIGlzIGFwcGxpZWRcbiAgICAgICAgICAgIGNoYXJDb3VudDogMVxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJGVsLm9mZihcImtleXVwXCIsIHNlYXJjaEZpbHRlckNhbGxCYWNrKTtcbiAgICAgICAgICAgICRlbC5vbihcImtleXVwXCIsIG51bGwsIHtvcHQ6IG9wdH0sIHNlYXJjaEZpbHRlckNhbGxCYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy8gRmlsdGVyIGJ5IEFsbC9PbmxpbmUvT2ZmbGluZVxuICAgICQoXCIuY2hhdC1maWx0ZXIgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLmNoYXQtY29udGFjdHMgbGknKS5oaWRlKCk7XG4gICAgICAgICQoJy5jaGF0LWNvbnRhY3RzJykuZmluZCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5zaG93KCk7XG5cbiAgICAgICAgJChcIi5jaGF0LWZpbHRlciBsaVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICQoXCIuY2hhdC1zZWFyY2ggaW5wdXRcIikuc2VhcmNoRmlsdGVyKHt0YXJnZXRTZWxlY3RvcjogXCIuY2hhdC1jb250YWN0cyBcIiArICQodGhpcykuZGF0YSgndGFyZ2V0Jyl9KTtcblxuICAgICAgICAvLyBGaWx0ZXIgQ29udGFjdHMgYnkgU2VhcmNoIGFuZCBUYWJzXG4gICAgICAgIHNlYXJjaEZpbHRlckNhbGxCYWNrKCQoXCIuY2hhdC1zZWFyY2ggaW5wdXRcIiksIHtcbiAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yOiBcIi5jaGF0LWNvbnRhY3RzIFwiICsgJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSxcbiAgICAgICAgICAgIGNoYXJDb3VudDogMVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXIgU2VhcmNoIEZpbHRlclxuICAgICQoXCIuY2hhdC1zZWFyY2ggaW5wdXRcIikuc2VhcmNoRmlsdGVyKHt0YXJnZXRTZWxlY3RvcjogXCIuY2hhdC1jb250YWN0cyBsaVwifSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBjb250YWluZXIgPSAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyJyk7XG5cbiAgICAvLyBDbGljayBVc2VyXG4gICAgJChcIi5jaGF0LWNvbnRhY3RzIGxpXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciBbZGF0YS11c2VyLWlkPVwiJyArICQodGhpcykuZGF0YSgndXNlcklkJykgKyAnXCJdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gSWYgdXNlciBpcyBvZmZsaW5lIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignY2xhc3MnKSA9PT0gJ29mZmxpbmUnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjY2hhdC13aW5kb3ctdGVtcGxhdGVcIikuaHRtbCgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoc291cmNlKTtcblxuICAgICAgICB2YXIgY29udGV4dCA9IHt1c2VyX2ltYWdlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLCB1c2VyOiAkKHRoaXMpLmZpbmQoJy5jb250YWN0LW5hbWUnKS50ZXh0KCl9O1xuICAgICAgICB2YXIgaHRtbCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuXG4gICAgICAgIHZhciBjbG9uZSA9ICQoaHRtbCk7XG5cbiAgICAgICAgY2xvbmUuYXR0cihcImRhdGEtdXNlci1pZFwiLCAkKHRoaXMpLmRhdGEoXCJ1c2VySWRcIikpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcucGFuZWw6bm90KFtpZF49XCJjaGF0XCJdKScpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBjb3VudCA9IGNvbnRhaW5lci5maW5kKCcucGFuZWwnKS5sZW5ndGg7XG5cbiAgICAgICAgY291bnQgKys7XG4gICAgICAgIHZhciBsaW1pdCA9ICQod2luZG93KS53aWR0aCgpID4gNzY4ID8gMyA6IDE7XG4gICAgICAgIGlmIChjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmZpbmQoJyNjaGF0LTAwMCcrIGxpbWl0KS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvdW50ID0gbGltaXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbG9uZS5hdHRyKCdpZCcsICdjaGF0LTAwMCcgKyBwYXJzZUludChjb3VudCkpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKGNsb25lKS5zaG93KCk7XG5cbiAgICAgICAgY2xvbmUuc2hvdygpO1xuICAgICAgICBjbG9uZS5maW5kKCc+IC5wYW5lbC1ib2R5JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgICBjbG9uZS5maW5kKCc+IGlucHV0JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hhbmdlIElEIGJ5IE5vLiBvZiBXaW5kb3dzXG4gICAgZnVuY3Rpb24gY2hhdExheW91dCgpIHtcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy5wYW5lbCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdpZCcsICdjaGF0LTAwMCcgKyBwYXJzZUludChpbmRleCArIDEpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHdpbmRvd1xuICAgICQoXCJib2R5XCIpLm9uKCdjbGljaycsIFwiLmNoYXQtd2luZG93LWNvbnRhaW5lciAuY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgICBjaGF0TGF5b3V0KCk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lcicpLmhpZGUoKTtcbiAgICB9KTtcblxuICAgIC8vIENoYXQgaGVhZGluZyBjb2xsYXBzZSB3aW5kb3dcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsLWhlYWRpbmcnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnPiAucGFuZWwtYm9keScpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCc+IGlucHV0JykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX3NlYXJjaCcpO1xucmVxdWlyZSgnLi9fd2luZG93cycpOyIsImZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG4gICAgdmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuICAgICAgICBkb2MgPSB3aW4uZG9jdW1lbnQsXG4gICAgICAgIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBtb2Rlcm4gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgICAgICBhZGQgPSBtb2Rlcm4gPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgICAgICByZW0gPSBtb2Rlcm4gPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgICAgICBwcmUgPSBtb2Rlcm4gPyAnJyA6ICdvbicsXG5cbiAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG4gICAgICAgICAgICAoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbIHJlbSBdKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCEgZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBvbGwsIDUwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0KCdwb2xsJyk7XG4gICAgICAgIH07XG5cbiAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghIG1vZGVybiAmJiByb290LmRvU2Nyb2xsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRvcCA9ICEgd2luLmZyYW1lRWxlbWVudDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3ApIHBvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICB3aW5bIGFkZCBdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgdmFyIGFzeW5jTG9hZGVyID0gZnVuY3Rpb24gKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdXJscy5mb3JlYWNoKGZ1bmN0aW9uIChpLCBmaWxlKSB7XG4gICAgICAgICAgICBsb2FkQ3NzKGZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVja2luZyBmb3IgYSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBjb250ZW50TG9hZGVkKHdpbmRvdywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkQ3NzID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVsgMCBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH07XG5cbiAgICAvLyBzaW1wbGUgZm9yZWFjaCBpbXBsZW1lbnRhdGlvblxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JlYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIHRoaXNbIGkgXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmNMb2FkZXIodXJscywgY2FsbGJhY2spO1xuXG59OyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgJCh3aW5kb3cpLnNldEJyZWFrcG9pbnRzKHtcbiAgICAgICAgZGlzdGluY3Q6IHRydWUsXG4gICAgICAgIGJyZWFrcG9pbnRzOiBbIDMyMCwgNDgwLCA3NjgsIDEwMjQgXVxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0dyaWRhbGljaW91cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZ3JpZGFsaWNpb3VzKHtcbiAgICAgICAgICAgIGd1dHRlcjogdGhpcy5kYXRhKCdndXR0ZXInKSB8fCAxNSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmRhdGEoJ3dpZHRoJykgfHwgMzcwLFxuICAgICAgICAgICAgc2VsZWN0b3I6ICc+IGRpdicsXG4gICAgICAgICAgICBhbmltYXRpb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlKj1cImdyaWRhbGljaW91c1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrR3JpZGFsaWNpb3VzKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrSXNvdG9wZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaXNvdG9wZSh7XG4gICAgICAgICAgICBsYXlvdXRNb2RlOiB0aGlzLmRhdGEoJ2xheW91dE1vZGUnKSB8fCBcInBhY2tlcnlcIixcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJ1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlzb3RvcGUoJ29uJywgJ2xheW91dENvbXBsZXRlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbigpe1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykudGtJc290b3BlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZG9tQ2hhbmdlZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJpc290b3BlXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykuaXNvdG9wZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi9fc2tpbicpKCk7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2Nyb2xsYWJsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZVxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgbmljZSA9IHRoaXMubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogc2V0dGluZ3MuaG9yaXpvbnRhbFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoISBzZXR0aW5ncy5ob3Jpem9udGFsKSByZXR1cm47XG5cbiAgICAgICAgdmFyIF9zdXBlciA9IG5pY2UuZ2V0Q29udGVudFNpemU7XG5cbiAgICAgICAgbmljZS5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwobmljZSk7XG4gICAgICAgICAgICBwYWdlLmggPSBuaWNlLndpbi5oZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdLCAuc3QtY29udGVudC1pbm5lcicpLnRrU2Nyb2xsYWJsZSgpO1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZS1oXScpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQodGhpcykudGtTY3JvbGxhYmxlKHRydWUpO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oJ2RlYm91bmNlZHJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXSwgW2RhdGEtc2Nyb2xsYWJsZS1oXSwgLnN0LWNvbnRlbnQtaW5uZXInKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmZuLnRrU2lkZWJhclNpemVQY0RlbW8gPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciB0LCBzcGNfZGVtbyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEgc3BjX2RlbW8ubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgIC5vbignc2lkZWJhci5zaG93JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzaWRlYmFyLmhpZGRlbicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3BjLW9wZW4nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNwY19kZW1vLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHMgPSAkKCcuc2lkZWJhcicpLCB2ZSA9ICQoJyNwYy12YWx1ZScpLCB2ID0gdmUudmFsKCk7XG4gICAgICAgICAgICB2ZS5ibHVyKCk7XG4gICAgICAgICAgICBpZiAoISB2Lmxlbmd0aCB8fCB2IDwgMjUpIHtcbiAgICAgICAgICAgICAgICB2ID0gMjU7XG4gICAgICAgICAgICAgICAgdmUudmFsKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc1sgMCBdLmNsYXNzTmFtZSA9IHNbIDAgXS5jbGFzc05hbWUucmVwbGFjZSgvc2lkZWJhci1zaXplLShbXFxkXSspcGMvaWcsICdzaWRlYmFyLXNpemUtJyArIHYgKyAncGMnKTtcbiAgICAgICAgICAgIHNpZGViYXIub3Blbignc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgnc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1zaXplLXBjLWRlbW9cIl0nKS50a1NpZGViYXJTaXplUGNEZW1vKCk7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsInZhciBhc3luY0xvYWRlciA9IHJlcXVpcmUoJy4vX2FzeW5jJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYW5nZVNraW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpLFxuICAgICAgICAgICAgZmlsZSA9ICQuY29va2llKFwic2tpbi1maWxlXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFzeW5jTG9hZGVyKFsgJ2Nzcy8nICsgZmlsZSArICcubWluLmNzcycgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXNraW5dJykucmVtb3ZlUHJvcCgnZGlzYWJsZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luXCIsICQodGhpcykuZGF0YSgnc2tpbicpKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW4tZmlsZVwiLCAkKHRoaXMpLmRhdGEoJ2ZpbGUnKSk7XG5cbiAgICAgICAgY2hhbmdlU2tpbigpO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgc2tpbiA9ICQuY29va2llKFwic2tpblwiKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJyAmJiBza2luICE9ICdkZWZhdWx0Jykge1xuICAgICAgICBjaGFuZ2VTa2luKCk7XG4gICAgfVxuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzLmpzJyk7XG5yZXF1aXJlKCcuL19ncmlkYWxpY2lvdXMuanMnKTtcbnJlcXVpcmUoJy4vX3Njcm9sbGFibGUuanMnKTtcbnJlcXVpcmUoJy4vX3NraW5zJyk7XG5yZXF1aXJlKCcuL19pc290b3BlJyk7XG5cbi8vIFNpZGViYXIgUGVyY2VudGFnZSBTaXplcyBEZW1vXG5yZXF1aXJlKCcuL19zaWRlYmFyLXBjJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgZmluZCA9IGZ1bmN0aW9uIChtYXBEYXRhLCBsb2NhdGlvbiwgbWFya2VyLCBtYXJrZXJEYXRhKSB7XG5cbiAgICAgICAgdmFyIGV2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCB7bWFya2VyOiBtYXJrZXJ9LCBtYXJrZXJEYXRhLCBtYXBEYXRhKSxcbiAgICAgICAgICAgIHN0YXRlID0gJycsXG4gICAgICAgICAgICBjb3VudHJ5ID0gJycsXG4gICAgICAgICAgICBhZGRyZXNzID0gJyc7XG5cbiAgICAgICAgbWFwRGF0YS5jb250YWluZXIuZ21hcCgnc2VhcmNoJywgeydsb2NhdGlvbic6IGxvY2F0aW9ufSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzcyA9IHJlc3VsdHNbIDAgXS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0c1sgMCBdLmFkZHJlc3NfY29tcG9uZW50cywgZnVuY3Rpb24gKGksIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYudHlwZXNbIDAgXSA9PSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMVwiIHx8IHYudHlwZXNbIDAgXSA9PSBcImFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHYubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHYudHlwZXNbIDAgXSA9PSBcImNvdW50cnlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IHYubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnREYXRhID0gJC5leHRlbmQoe30sIGV2ZW50RGF0YSwge3N0YXRlOiBzdGF0ZSwgY291bnRyeTogY291bnRyeSwgYWRkcmVzczogYWRkcmVzc30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdtYXAubWFya2VyLmZpbmQnLCBldmVudERhdGEpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciBiaW5kRmluZCA9IGZ1bmN0aW9uKG1hcmtlciwgbWFya2VyRGF0YSwgZGF0YSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWFya2VyRGF0YS5vcGVuICE9PSAndW5kZWZpbmVkJyAmJiBtYXJrZXJEYXRhLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpbmQoZGF0YSwgbWFya2VyRGF0YS5sYXRMbmcsIG1hcmtlciwgbWFya2VyRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGZpbmQoZGF0YSwgZS5sYXRMbmcsIHRoaXMsIG1hcmtlckRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBmaW5kKGRhdGEsIGUubGF0TG5nLCB0aGlzLCBtYXJrZXJEYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ21hcC5pbml0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmRhdGEoJ2lkJykgPT0gJ21hcC1lZGl0Jykge1xuXG4gICAgICAgICAgICB2YXIgbWFya2VycyA9IGRhdGEuY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJyksXG4gICAgICAgICAgICAgICAgbWFya2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJkcmFnZ2FibGVcIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWFya2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJvcGVuXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwidGVtcGxhdGVcIjogXCJ0cGwtZWRpdFwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25cIjogXCJidWlsZGluZy0wMVwiXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZGF0YS5tYXAsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgbWFya2VyRGF0YSA9ICQuZXh0ZW5kKHt9LCBtYXJrZXJEYXRhLCB7XCJsYXRMbmdcIjogZXZlbnQubGF0TG5nfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWFya2VyID0gZGF0YS5hZGRNYXJrZXIobWFya2Vycy5sZW5ndGgsIG1hcmtlckRhdGEsIG1hcmtlck9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgYmluZEZpbmQobWFya2VyLCBtYXJrZXJEYXRhLCBkYXRhKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGRhdGEuaXcud2luZG93LCAnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAkKCcjbWFwLWRlbGV0ZS1tYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaXcuY2xvc2UoaWQpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzWyBpZCBdLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQuZWFjaChtYXJrZXJzLCBmdW5jdGlvbihpLCBtYXJrZXIpe1xuXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlckRhdGEgPSBtYXJrZXIuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICAgICAgICAgICAgICBiaW5kRmluZChtYXJrZXIsIG1hcmtlckRhdGEsIGRhdGEpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAubWFya2VyLmZpbmQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICBkYXRhLm1hcmtlci5zZXRUaXRsZShkYXRhLmFkZHJlc3MpO1xuXG4gICAgICAgIGlmIChkYXRhLml3LndpbmRvdy5pc09wZW4gPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgZGF0YS5pdy5vcGVuKGRhdGEubWFya2VyLmdldCgnaWQnKSwgZGF0YSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcnJheVVuaXF1ZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIGEucmVkdWNlKGZ1bmN0aW9uKHAsIGMpIHtcbiAgICAgICAgICAgIGlmIChwLmluZGV4T2YoYykgPCAwKSBwLnB1c2goYyk7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSwgW10pO1xuICAgIH07XG5cbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24oZGF0YSl7XG5cbiAgICAgICAgZGF0YS5pdy5jbG9zZSgpO1xuICAgICAgICBkYXRhLmNvbnRhaW5lci5nbWFwKCdzZXQnLCAnYm91bmRzJywgbnVsbCk7XG5cbiAgICAgICAgdmFyIGZpbHRlcnMgPSBbXTtcblxuICAgICAgICAkKCcjcmFkaW9zIDpjaGVja2VkJykuZWFjaChmdW5jdGlvbiAoaSwgY2hlY2tib3gpIHtcbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCgkKGNoZWNrYm94KS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YS5jb250YWluZXIuZ21hcCgnZmluZCcsICdtYXJrZXJzJywge1xuICAgICAgICAgICAgICAgICdwcm9wZXJ0eSc6ICd0YWdzJyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiBmaWx0ZXJzLFxuICAgICAgICAgICAgICAgICdvcGVyYXRvcic6ICdPUidcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChtYXJrZXIsIGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGFpbmVyLmdtYXAoJ2FkZEJvdW5kcycsIG1hcmtlci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZvdW5kKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJC5lYWNoKGRhdGEuY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJyksIGZ1bmN0aW9uIChpLCBtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRhaW5lci5nbWFwKCdhZGRCb3VuZHMnLCBtYXJrZXIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJChkb2N1bWVudCkub24oJ21hcC5pbml0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGFpbmVyLmRhdGEoJ2ZpbHRlcnMnKSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICB2YXIgbWFwID0gZGF0YSxcbiAgICAgICAgICAgICAgICBtYXJrZXJzID0gZGF0YS5jb250YWluZXIuZ21hcCgnZ2V0JywgJ21hcmtlcnMnKSxcbiAgICAgICAgICAgICAgICB0YWdzID0gW10sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJZCA9IGRhdGEuY29udGFpbmVyLmRhdGEoJ2ZpbHRlcnNUZW1wbGF0ZScpIHx8ICcjbWFwLWZpbHRlcnMtdGVtcGxhdGUnO1xuXG4gICAgICAgICAgICAkLmVhY2gobWFya2VycywgZnVuY3Rpb24oaSwgbWFya2VyKXtcbiAgICAgICAgICAgICAgICAkLmVhY2gobWFya2VyLnRhZ3MsIGZ1bmN0aW9uKGksIHRhZyl7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRhZ3MgPSBhcnJheVVuaXF1ZSh0YWdzKTtcblxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9ICQodGVtcGxhdGVJZCkuaHRtbCgpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgICAgICB2YXIgJGVsID0gJCh0ZW1wbGF0ZSh7IHRhZ3M6IHRhZ3MgfSkpO1xuXG4gICAgICAgICAgICAkZWwuaW5zZXJ0QWZ0ZXIoZGF0YS5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xheW91dC9qcy9fc2tpbicpKCk7XG5cbiAgICAgICAgICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJywgJGVsKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6IDAsXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZGF0YSk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJyNyYWRpb3MgOmNoZWNrYm94JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBjZW50ZXJXaW5kb3cgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBtYXAsIGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YS5sYXQgJiYgZGF0YS5sbmcpIHtcblxuICAgICAgICAgICAgY29udGFpbmVyLmdtYXAoJ29wdGlvbicsICdjZW50ZXInLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGRhdGEubGF0LCBkYXRhLmxuZykpO1xuXG4gICAgICAgICAgICBtYXAucGFuQnkoMCwgLTE3MCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgY2VudGVyTWFwID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID09PSAyKSB7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5nbWFwKCdvcHRpb24nLCAnY2VudGVyJywgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhkYXRhWyAwIF0sIGRhdGFbIDEgXSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIHJlc2l6ZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIG1hcCwgd2luZG93RGF0YSwgbWFwRGF0YSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZ29vZ2xlID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcblxuICAgICAgICBpZiAoISBjZW50ZXJNYXAoY29udGFpbmVyLCBtYXBEYXRhKSkgY2VudGVyV2luZG93KGNvbnRhaW5lciwgbWFwLCB3aW5kb3dEYXRhKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjZW50ZXJXaW5kb3c6IGNlbnRlcldpbmRvdyxcbiAgICAgICAgY2VudGVyTWFwOiBjZW50ZXJNYXAsXG4gICAgICAgIHJlc2l6ZTogcmVzaXplXG4gICAgfTtcblxufTsiLCJmdW5jdGlvbiBsb2FkU2NyaXB0KCkge1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP3Y9My5leHAmJyArXG4gICAgJ2NhbGxiYWNrPWluaXRHb29nbGVNYXBzJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBsb2FkU2NyaXB0O1xuXG5mdW5jdGlvbiBpbml0U2NyaXB0cygpIHtcbiAgICB2YXIgJHNjcmlwdHMgPSBbXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5leHRlbnNpb25zLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAuc2VydmljZXMuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5taWNyb2RhdGEuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvdWkvanF1ZXJ5LnVpLm1hcC5taWNyb2Zvcm1hdC5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC91aS9qcXVlcnkudWkubWFwLm92ZXJsYXlzLmpzXCIsXG4gICAgICAgIFwianMvcGx1Z2lucy9tYXBzX2dvb2dsZS9qcXVlcnktdWktbWFwL3VpL2pxdWVyeS51aS5tYXAucmRmYS5qc1wiLFxuICAgICAgICBcImpzL3BsdWdpbnMvbWFwc19nb29nbGUvanF1ZXJ5LXVpLW1hcC9hZGRvbnMvaW5mb2JveF9wYWNrZWQuanNcIixcbiAgICAgICAgXCJqcy9wbHVnaW5zL21hcHNfZ29vZ2xlL2pxdWVyeS11aS1tYXAvYWRkb25zL21hcmtlcmNsdXN0ZXJlci5taW4uanNcIlxuICAgIF07XG5cbiAgICAkLmVhY2goJHNjcmlwdHMsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIGlmICgkKCdbc3JjPVwiJyArIHYgKyAnXCJdJykubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIHNjcmlwdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHROb2RlLnNyYyA9IHY7XG4gICAgICAgICQoJ2hlYWQnKS5wcmVwZW5kKCQoc2NyaXB0Tm9kZSkpO1xuICAgIH0pO1xuXG4gICAgJC5leHRlbmQoJC51aS5nbWFwLnByb3RvdHlwZSwge1xuICAgICAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbiAocHJvcCwgbWFwRGF0YSkge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjbWFwLXBhZ2luYXRpb25cIikuaHRtbCgpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgICAgICB2YXIgJGVsID0gJCh0ZW1wbGF0ZSgpKTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBpID0gMDtcbiAgICAgICAgICAgIHByb3AgPSBwcm9wIHx8ICd0aXRsZSc7XG4gICAgICAgICAgICBzZWxmLnNldCgncGFnaW5hdGlvbicsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyBiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHNlbGYuZ2V0KCdtYXJrZXJzJylbIGkgXTtcbiAgICAgICAgICAgICAgICAgICAgbWFwRGF0YS5pdy5vcGVuKGksIG0uZ2V0KCdjb250ZW50JykpO1xuICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmRpc3BsYXknKS50ZXh0KG1bIHByb3AgXSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0KCdtYXAnKS5wYW5UbyhtLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5nZXQoJ3BhZ2luYXRpb24nKSh0cnVlLCAwKTtcbiAgICAgICAgICAgICRlbC5maW5kKCcuYmFjay1idG4nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLmdldCgncGFnaW5hdGlvbicpKChpID4gMCksIC0gMSwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRlbC5maW5kKCcuZndkLWJ0bicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuZ2V0KCdwYWdpbmF0aW9uJykoKGkgPCBzZWxmLmdldCgnbWFya2VycycpLmxlbmd0aCAtIDEpLCAxLCB0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5hZGRDb250cm9sKCRlbCwgZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uWyBtYXBEYXRhLm9wdGlvbnMucGFnaW5hdGlvblBvc2l0aW9uIF0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbnZhciBsaWJyYXJ5ID0gcmVxdWlyZSgnLi9fbGlicmFyeS5qcycpKCk7XG5cbi8vIEhvbGRzIGdvb2dsZSBtYXBzIHN0eWxlc1xudmFyIHN0eWxlcyA9IHtcbiAgICBcImxpZ2h0LWdyZXlcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2xpZ2h0LWdyZXkuanMnKSxcbiAgICBcImxpZ2h0LW1vbm9jaHJvbWVcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2xpZ2h0LW1vbm9jaHJvbWUuanMnKSxcbiAgICBcImNvb2wtZ3JleVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fY29vbC1ncmV5LmpzJyksXG4gICAgXCJibHVlLWdyYXlcIjogcmVxdWlyZSgnLi9zdHlsZXMvX2JsdWUtZ3JheS5qcycpLFxuICAgIFwicGFwZXJcIjogcmVxdWlyZSgnLi9zdHlsZXMvX3BhcGVyLmpzJyksXG4gICAgXCJhcHBsZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fYXBwbGUuanMnKSxcbiAgICBcImxpZ2h0LWdyZWVuXCI6IHJlcXVpcmUoJy4vc3R5bGVzL19saWdodC1ncmVlbi5qcycpLFxuICAgIFwibGVtb24tdHJlZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fbGVtb24tdHJlZS5qcycpLFxuICAgIFwiY2xlYW4tY3V0XCI6IHJlcXVpcmUoJy4vc3R5bGVzL19jbGVhbi1jdXQuanMnKSxcbiAgICBcIm5hdHVyZVwiOiByZXF1aXJlKCcuL3N0eWxlcy9fbmF0dXJlLmpzJylcbn07XG5cbi8vIFByb2Nlc3MgdGhlIGluZm9XaW5kb3cgY29udGVudCB2aWEgSGFuZGxlYmFycyB0ZW1wbGF0ZXNcbnZhciBpbmZvV2luZG93Q29udGVudCA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICB2YXIgc291cmNlID0gJChcIiNcIiArIG1hcmtlci50ZW1wbGF0ZSkuaHRtbCgpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgIHJldHVybiB0ZW1wbGF0ZShtYXJrZXIpO1xufTtcblxuLyoqXG4gKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAqL1xuJC5mbi50a0dvb2dsZU1hcCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICB2YXIgY29udGFpbmVyID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgZ29vZ2xlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci50a0dvb2dsZU1hcCgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgbWFwWm9vbVBvc2l0aW9uOiBjb250YWluZXIuZGF0YSgnem9vbVBvc2l0aW9uJykgfHwgXCJUT1BfTEVGVFwiLFxuICAgICAgICBtYXBab29tOiBjb250YWluZXIuZGF0YSgnem9vbScpIHx8IDE2LFxuICAgICAgICBtYXBTdHlsZTogY29udGFpbmVyLmRhdGEoJ3N0eWxlJykgfHwgXCJsaWdodC1ncmV5XCIsXG4gICAgICAgIG1hcFR5cGU6IGNvbnRhaW5lci5kYXRhKCd0eXBlJykgfHwgXCJST0FETUFQXCIsXG4gICAgICAgIGZpbGU6IGNvbnRhaW5lci5kYXRhKCdmaWxlJyksXG4gICAgICAgIGNlbnRlcjogY29udGFpbmVyLmRhdGEoJ2NlbnRlcicpID8gY29udGFpbmVyLmRhdGEoJ2NlbnRlcicpLnNwbGl0KFwiLFwiKSA6IGZhbHNlLFxuICAgICAgICBwYWdpbmF0aW9uOiBjb250YWluZXIuZGF0YSgncGFnaW5hdGlvbicpIHx8IGZhbHNlLFxuICAgICAgICBwYWdpbmF0aW9uUG9zaXRpb246IGNvbnRhaW5lci5kYXRhKCdwYWdpbmF0aW9uUG9zaXRpb24nKSB8fCAnVE9QX0xFRlQnXG4gICAgfTtcblxuICAgIHZhciBtYXBEYXRhO1xuXG4gICAgLy8gcHJvdmlkZSBhIGRlZmF1bHQgb2JqZWN0IGZvciBkYXRhIGNvbGxlY3RlZCBmcm9tIHRoZSBjdXJyZW50bHkgb3BlbmVkIGluZm9XaW5kb3dcbiAgICB2YXIgaW5mb1dpbmRvd0RhdGEgPSB7XG4gICAgICAgIGxhdDogZmFsc2UsXG4gICAgICAgIGxuZzogZmFsc2VcbiAgICB9O1xuXG4gICAgdmFyIGluZm9XaW5kb3dPcGVuID0gZnVuY3Rpb24gKGksIG1hcmtlcikge1xuXG4gICAgICAgIHZhciBtYXJrZXJJbnN0ID0gY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJylbIGkgXTtcblxuICAgICAgICBpbmZvV2luZG93LnNldENvbnRlbnQoaW5mb1dpbmRvd0NvbnRlbnQobWFya2VyKSk7XG4gICAgICAgIGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlckluc3QpO1xuICAgICAgICBpbmZvV2luZG93LmlzT3BlbiA9IGk7XG5cbiAgICAgICAgaW5mb1dpbmRvd0RhdGEgPSB7XG4gICAgICAgICAgICBsYXQ6IG1hcmtlci5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogbWFya2VyLmxvbmdpdHVkZVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgaW5mb1dpbmRvd0Nsb3NlID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93LmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvV2luZG93LmlzT3BlbiAhPSAndW5kZWZpbmVkJyAmJiBpbmZvV2luZG93LmlzT3BlbiA9PT0gaSkge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyogSW5mb0JveCAqL1xuICAgIHZhciBpbmZvV2luZG93ID0gbmV3IEluZm9Cb3goe1xuICAgICAgICBtYXhXaWR0aDogMjQwLFxuICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIGFkZE1hcmtlciA9IGZ1bmN0aW9uIChpLCBtYXJrZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGljb25CYXNlID0gJ2ltYWdlcy9tYXJrZXJzLyc7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHR5cGVvZiBtYXJrZXIubGF0TG5nICE9PSAndW5kZWZpbmVkJyA/IG1hcmtlci5sYXRMbmcgOiBmYWxzZTtcbiAgICAgICAgaWYgKCEgcG9zaXRpb24gJiYgdHlwZW9mIG1hcmtlci5sYXRpdHVkZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1hcmtlci5sb25naXR1ZGUgIT09ICd1bmRlZmluZWQnKSBwb3NpdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLmxhdGl0dWRlLCBtYXJrZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgaWYgKCEgcG9zaXRpb24pIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgbWFya2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiaWRcIjogaSxcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogcG9zaXRpb24sXG4gICAgICAgICAgICBcImRyYWdnYWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJpY29uXCI6IGljb25CYXNlICsgbWFya2VyLmljb24gKyBcIi5wbmdcIlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JykgbWFya2VyT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBtYXJrZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgb3BlbiA9IHR5cGVvZiBtYXJrZXIub3BlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbWFya2VyLm9wZW4gPT09IHRydWU7XG5cbiAgICAgICAgY29udGFpbmVyLmdtYXAoJ2FkZE1hcmtlcicsIG1hcmtlck9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBtYXJrZXJJbnN0ID0gY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXJrZXJzJylbIGkgXTtcblxuICAgICAgICBtYXJrZXJJbnN0LnNldFRpdGxlKG1hcmtlci50aXRsZSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VySW5zdCwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEgaW5mb1dpbmRvd0Nsb3NlKGkpKSB7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvd09wZW4oaSwgbWFya2VyKTtcbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmNlbnRlcldpbmRvdyhjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXJJbnN0LCAnZHJhZ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsYXQgPSBtYXJrZXJJbnN0LmdldFBvc2l0aW9uKCkubGF0KCk7XG4gICAgICAgICAgICB2YXIgbG5nID0gbWFya2VySW5zdC5nZXRQb3NpdGlvbigpLmxuZygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1wibGF0aXR1ZGVcIjogJyArIGxhdCArICcsIFwibG9uZ2l0dWRlXCI6ICcgKyBsbmcpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWFya2VyRGF0YSA9ICQuZXh0ZW5kKHt9LCBtYXJrZXIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogaSxcbiAgICAgICAgICAgIFwibGF0TG5nXCI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLmxhdGl0dWRlLCBtYXJrZXIubG9uZ2l0dWRlKVxuICAgICAgICB9KTtcblxuICAgICAgICBtYXJrZXJJbnN0LnNldCgnY29udGVudCcsIG1hcmtlckRhdGEpO1xuXG4gICAgICAgIGlmIChvcGVuKSBpbmZvV2luZG93T3BlbihpLCBtYXJrZXIpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXJJbnN0O1xuICAgIH07XG5cbiAgICBjb250YWluZXIuZ21hcChcbiAgICAgICAge1xuICAgICAgICAgICAgJ3pvb21Db250cm9sJzogdHJ1ZSxcbiAgICAgICAgICAgICd6b29tQ29udHJvbE9wdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgJ3N0eWxlJzogZ29vZ2xlLm1hcHMuWm9vbUNvbnRyb2xTdHlsZS5TTUFMTCxcbiAgICAgICAgICAgICAgICAncG9zaXRpb24nOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bIG9wdGlvbnMubWFwWm9vbVBvc2l0aW9uIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGFuQ29udHJvbCc6IGZhbHNlLFxuICAgICAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sJzogZmFsc2UsXG4gICAgICAgICAgICAnbWFwVHlwZUNvbnRyb2wnOiBmYWxzZSxcbiAgICAgICAgICAgICdvdmVydmlld01hcENvbnRyb2wnOiBmYWxzZSxcbiAgICAgICAgICAgICdzY3JvbGx3aGVlbCc6IGZhbHNlLFxuICAgICAgICAgICAgJ21hcFR5cGVJZCc6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZFsgb3B0aW9ucy5tYXBUeXBlIF0sXG4gICAgICAgICAgICAnem9vbSc6IG9wdGlvbnMubWFwWm9vbSxcbiAgICAgICAgICAgICdzdHlsZXMnOiBzdHlsZXNbIG9wdGlvbnMubWFwU3R5bGUgXVxuICAgICAgICB9KVxuICAgICAgICAuYmluZCgnaW5pdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbWFwRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIGFkZE1hcmtlcjogYWRkTWFya2VyLFxuICAgICAgICAgICAgICAgIGxpYnJhcnk6IGxpYnJhcnksXG4gICAgICAgICAgICAgICAgaXc6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1dpbmRvd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdzogaW5mb1dpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogaW5mb1dpbmRvd0NvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9wZW46IGluZm9XaW5kb3dPcGVuLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogaW5mb1dpbmRvd0Nsb3NlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgJC5nZXRKU09OKG9wdGlvbnMuZmlsZSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5tYXJrZXJzLCBmdW5jdGlvbiAoaSwgbWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHR5cGVvZiBtYXJrZXIub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgPyBtYXJrZXIub3B0aW9ucyA6IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWFya2VyKGksIG1hcmtlciwgbyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5LnJlc2l6ZShjb250YWluZXIsIG1hcCwgaW5mb1dpbmRvd0RhdGEsIG9wdGlvbnMuY2VudGVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nbWFwKCdwYWdpbmF0aW9uJywgJ3RpdGxlJywgbWFwRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpYnJhcnkuY2VudGVyTWFwKGNvbnRhaW5lciwgb3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ21hcC5pbml0JywgbWFwRGF0YSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihpbmZvV2luZG93LCAnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl3ID0gJCgnLmluZm9Cb3gnKTtcbiAgICAgICAgICAgICAgICBpbmZvV2luZG93LnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLSBNYXRoLmFicyhpdy53aWR0aCgpIC8gMiksIC0gNDUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgbWFwID0gY29udGFpbmVyLmdtYXAoJ2dldCcsICdtYXAnKTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbignZGVib3VuY2VkcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpYnJhcnkucmVzaXplKGNvbnRhaW5lciwgbWFwLCBpbmZvV2luZG93RGF0YSwgb3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH0pO1xuXG4gICAgLy8gaGFuZGxlIG1hcHMgaW4gY29sbGFwc2libGVzXG4gICAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCQoY29udGFpbmVyLCB0aGlzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpYnJhcnkucmVzaXplKGNvbnRhaW5lciwgbWFwLCBpbmZvV2luZG93RGF0YSwgb3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGluaXRTY3JpcHRzKCk7XG5cbiAgICAvKlxuICAgICAqIENsdXN0ZXJpbmdcbiAgICAgKi9cbiAgICBpZiAoJCgnI2dvb2dsZS1tYXAtY2x1c3RlcmluZycpLmxlbmd0aCkge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGJpbmQgdGhlIG1hcCB3aXRoIHRoZSBcImluaXRcIiBldmVudCBvdGhlcndpc2UgYm91bmRzIHdpbGwgYmUgbnVsbFxuICAgICAgICAkKCcjZ29vZ2xlLW1hcC1jbHVzdGVyaW5nJykuZ21hcCh7J3pvb20nOiAyLCAnZGlzYWJsZURlZmF1bHRVSSc6IHRydWV9KS5iaW5kKCdpbml0JywgZnVuY3Rpb24gKGV2dCwgbWFwKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgdmFyIHNvdXRoV2VzdCA9IGJvdW5kcy5nZXRTb3V0aFdlc3QoKTtcbiAgICAgICAgICAgIHZhciBub3J0aEVhc3QgPSBib3VuZHMuZ2V0Tm9ydGhFYXN0KCk7XG4gICAgICAgICAgICB2YXIgbG5nU3BhbiA9IG5vcnRoRWFzdC5sbmcoKSAtIHNvdXRoV2VzdC5sbmcoKTtcbiAgICAgICAgICAgIHZhciBsYXRTcGFuID0gbm9ydGhFYXN0LmxhdCgpIC0gc291dGhXZXN0LmxhdCgpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvcGVuSW5mb1dpbmRvdygpIHtcbiAgICAgICAgICAgICAgICAkKCcjZ29vZ2xlLW1hcC1jbHVzdGVyaW5nJykuZ21hcCgnb3BlbkluZm9XaW5kb3cnLCB7Y29udGVudDogJ0hlbGxvIHdvcmxkISd9LCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDAwOyBpICsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdCA9IHNvdXRoV2VzdC5sYXQoKSArIGxhdFNwYW4gKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgICAgIHZhciBsbmcgPSBzb3V0aFdlc3QubG5nKCkgKyBsbmdTcGFuICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICAkKCcjZ29vZ2xlLW1hcC1jbHVzdGVyaW5nJykuZ21hcCgnYWRkTWFya2VyJywge1xuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKVxuICAgICAgICAgICAgICAgIH0pLmNsaWNrKG9wZW5JbmZvV2luZG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI2dvb2dsZS1tYXAtY2x1c3RlcmluZycpLmdtYXAoJ3NldCcsICdNYXJrZXJDbHVzdGVyZXInLCBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgJCh0aGlzKS5nbWFwKCdnZXQnLCAnbWFya2VycycpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoZG9jdW1lbnQpLm9uKCdtYXAuaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgIHZhciBzdHlsZVRwbCA9ICQoJyNtYXAtc3R5bGUtc3dpdGNoJyksXG4gICAgICAgICAgICB0b2dnbGVTdHlsZVdyYXBwZXIgPSAkKCdbZGF0YS10b2dnbGU9XCJtYXAtc3R5bGUtc3dpdGNoXCJdJyk7XG5cbiAgICAgICAgaWYgKHN0eWxlVHBsLmxlbmd0aCAmJiB0b2dnbGVTdHlsZVdyYXBwZXIubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRvZ2dsZVN0eWxlV3JhcHBlci5kYXRhKCd0YXJnZXQnKSk7XG5cbiAgICAgICAgICAgIGlmICghIHRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5jb250YWluZXIuaXModGFyZ2V0KSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBzdHlsZVRwbC5odG1sKCk7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBIYW5kbGViYXJzLmNvbXBpbGUocyk7XG5cbiAgICAgICAgICAgICAgICB0b2dnbGVTdHlsZVdyYXBwZXIuaHRtbCh0KHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBzdHlsZXNcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAkKCdzZWxlY3QnLCB0b2dnbGVTdHlsZVdyYXBwZXIpLnZhbChkYXRhLm9wdGlvbnMubWFwU3R5bGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdHBpY2tlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5zZWxlY3RwaWNrZXInLCB0b2dnbGVTdHlsZVdyYXBwZXIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3RwaWNrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAkKHRoaXMpLmRhdGEoJ3dpZHRoJykgfHwgJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xheW91dC9qcy9fc2tpbicpKCk7XG5cbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScsIHRvZ2dsZVN0eWxlV3JhcHBlcikubmljZVNjcm9sbCh7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoJ3NlbGVjdCcsIHRvZ2dsZVN0eWxlV3JhcHBlcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdHlwZW9mIHN0eWxlc1sgJCh0aGlzKS52YWwoKSBdID8gc3R5bGVzWyAkKHRoaXMpLnZhbCgpIF0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgc3R5bGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZ21hcCgnb3B0aW9uJywgJ3N0eWxlcycsIHN0eWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdmFyIGNvbnRhaW5lcnMgPSAkKCdbZGF0YS10b2dnbGU9XCJnb29nbGUtbWFwc1wiXScpO1xuXG4gICAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoKSB7XG5cbiAgICAgICAgY29udGFpbmVycy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCh0aGlzKS50a0dvb2dsZU1hcCgpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcblxucmVxdWlyZSgnLi9fZWRpdCcpO1xucmVxdWlyZSgnLi9fZmlsdGVycycpOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y3ZjFkZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZDBlM2I0XCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5idXNpbmVzc1wiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLm1lZGljYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmYmQzZGFcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIiwgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjYmRlNmFiXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZlMTVmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2VmZDE1MVwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiYmxhY2tcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LnN0YXRpb24uYWlycG9ydFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjY2ZiMmRiXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2EyZGFmMlwifSBdfSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJjb2xvclwiOiBcIiNiNWNiZTRcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIiwgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZWZlZmVmXCJ9IF19LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiIzgzYTViMFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNiZGNkZDNcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNlM2VlZDNcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wibGlnaHRuZXNzXCI6IDMzfSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJsaWdodG5lc3NcIjogMjB9IF1cbn0sIHt9LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIiwgXCJzdHlsZXJzXCI6IFsge1wibGlnaHRuZXNzXCI6IDIwfSBdfSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSwge1wiY29sb3JcIjogXCIjQzZFMkZGXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI0M1RTNCRlwifSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNEMUQxQjhcIn0gXVxufSBdOyIsIm1vZHVsZS5leHBvcnRzID0gWyB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLCBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLCBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1wic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiMwMGFhZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJnYW1tYVwiOiAyLjE1fSwge1wibGlnaHRuZXNzXCI6IDEyfSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0sIHtcImxpZ2h0bmVzc1wiOiAyNH0gXVxufSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLCBcInN0eWxlcnNcIjogWyB7XCJsaWdodG5lc3NcIjogNTd9IF19IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmZmZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNmZmZmZmZcIn0sIHtcInNhdHVyYXRpb25cIjogLSAxMDB9LCB7XCJsaWdodG5lc3NcIjogMTAwfSwge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZlOTRmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDEwMH0sIHtcImxpZ2h0bmVzc1wiOiA0fSwge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZTk0ZlwifSwge1wic2F0dXJhdGlvblwiOiAxMDB9LCB7XCJsaWdodG5lc3NcIjogNH0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzMzMzMzM1wifSwge1wic2F0dXJhdGlvblwiOiAtIDEwMH0sIHtcImxpZ2h0bmVzc1wiOiAtIDc0fSwge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjYmFmNGM0XCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDEwfSBdfSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2VmZmVmZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFsbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLCBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2U5ZTllOVwifSwge1wibGlnaHRuZXNzXCI6IDE3fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y1ZjVmNVwifSwge1wibGlnaHRuZXNzXCI6IDIwfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMTd9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDI5fSwge1wid2VpZ2h0XCI6IDAuMn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZmZmZmZmXCJ9LCB7XCJsaWdodG5lc3NcIjogMTh9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2ZmZmZmZlwifSwge1wibGlnaHRuZXNzXCI6IDE2fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2Y1ZjVmNVwifSwge1wibGlnaHRuZXNzXCI6IDIxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaS5wYXJrXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiY29sb3JcIjogXCIjZGVkZWRlXCJ9LCB7XCJsaWdodG5lc3NcIjogMjF9IF1cbn0sIHtcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9uXCJ9LCB7XCJjb2xvclwiOiBcIiNmZmZmZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAxNn0gXVxufSwge1xuICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wic2F0dXJhdGlvblwiOiAzNn0sIHtcImNvbG9yXCI6IFwiIzMzMzMzM1wifSwge1wibGlnaHRuZXNzXCI6IDQwfSBdXG59LCB7XCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImNvbG9yXCI6IFwiI2YyZjJmMlwifSwge1wibGlnaHRuZXNzXCI6IDE5fSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZWZlZmVcIn0sIHtcImxpZ2h0bmVzc1wiOiAyMH0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJjb2xvclwiOiBcIiNmZWZlZmVcIn0sIHtcImxpZ2h0bmVzc1wiOiAxN30sIHtcIndlaWdodFwiOiAxLjJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sb2NhbGl0eVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjMmMyZTMzXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDd9LCB7XCJsaWdodG5lc3NcIjogMTl9LCB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2ZmZmZmZlwifSwge1wic2F0dXJhdGlvblwiOiAtIDEwMH0sIHtcImxpZ2h0bmVzc1wiOiAxMDB9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjZmZmZmZmXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IC0gMTAwfSwge1wibGlnaHRuZXNzXCI6IDEwMH0sIHtcInZpc2liaWxpdHlcIjogXCJvZmZcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2JiYzBjNFwifSwge1wic2F0dXJhdGlvblwiOiAtIDkzfSwge1wibGlnaHRuZXNzXCI6IDMxfSwge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNiYmMwYzRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5M30sIHtcImxpZ2h0bmVzc1wiOiAzMX0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2JiYzBjNFwifSwge1wic2F0dXJhdGlvblwiOiAtIDkzfSwge1wibGlnaHRuZXNzXCI6IC0gMn0sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNlOWViZWRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA5MH0sIHtcImxpZ2h0bmVzc1wiOiAtIDh9LCB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI2U5ZWJlZFwifSwge1wic2F0dXJhdGlvblwiOiAxMH0sIHtcImxpZ2h0bmVzc1wiOiA2OX0sIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiNlOWViZWRcIn0sIHtcInNhdHVyYXRpb25cIjogLSA3OH0sIHtcImxpZ2h0bmVzc1wiOiA2N30sIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9IF1cbn0gXTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjRkZBODAwXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDB9LCB7XCJsaWdodG5lc3NcIjogMH0sIHtcImdhbW1hXCI6IDF9IF1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzUzRkYwMFwifSwge1wic2F0dXJhdGlvblwiOiAtIDczfSwge1wibGlnaHRuZXNzXCI6IDQwfSwge1wiZ2FtbWFcIjogMX0gXVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiI0ZCRkYwMFwifSwge1wic2F0dXJhdGlvblwiOiAwfSwge1wibGlnaHRuZXNzXCI6IDB9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJodWVcIjogXCIjMDBGRkZEXCJ9LCB7XCJzYXR1cmF0aW9uXCI6IDB9LCB7XCJsaWdodG5lc3NcIjogMzB9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1wiaHVlXCI6IFwiIzAwQkZGRlwifSwge1wic2F0dXJhdGlvblwiOiA2fSwge1wibGlnaHRuZXNzXCI6IDh9LCB7XCJnYW1tYVwiOiAxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcImh1ZVwiOiBcIiM2Nzk3MTRcIn0sIHtcInNhdHVyYXRpb25cIjogMzMuNH0sIHtcImxpZ2h0bmVzc1wiOiAtIDI1LjR9LCB7XCJnYW1tYVwiOiAxfSBdXG59IF07IiwibW9kdWxlLmV4cG9ydHMgPSBbIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSwge1wiaHVlXCI6IFwiIzAwNjZmZlwifSwge1wic2F0dXJhdGlvblwiOiA3NH0sIHtcImxpZ2h0bmVzc1wiOiAxMDB9IF1cbn0sIHtcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIiwgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJ9LCB7XCJ3ZWlnaHRcIjogMC42fSwge1wic2F0dXJhdGlvblwiOiAtIDg1fSwge1wibGlnaHRuZXNzXCI6IDYxfSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJvblwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcbiAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgXCJzdHlsZXJzXCI6IFsge1widmlzaWJpbGl0eVwiOiBcIm9mZlwifSBdXG59LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIiwgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLCBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn0gXX0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICBcInN0eWxlcnNcIjogWyB7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifSBdXG59LCB7XG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgIFwic3R5bGVyc1wiOiBbIHtcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9LCB7XCJjb2xvclwiOiBcIiM1Zjk0ZmZcIn0sIHtcImxpZ2h0bmVzc1wiOiAyNn0sIHtcImdhbW1hXCI6IDUuODZ9IF1cbn0gXTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciByZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcImh0bWxcIikuYWRkQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgICAgICAgJCgnLnNpZGViYXIuc2lkZWJhci12aXNpYmxlLWRlc2t0b3AnKS5ub3QoJzp2aXNpYmxlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzaWRlYmFyLm9wdGlvbnMoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5vcGVuKCQodGhpcykuYXR0cignaWQnKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyOnZpc2libGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCQodGhpcykuYXR0cignaWQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ3NjgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGlmICgkKCcuaGlkZS1zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQxMDI0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAoJCgnLmhpZGUtc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICByZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NDgwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBoaWRlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGhpZGUoKTtcbiAgICB9XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTaWRlYmFyQ29sbGFwc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdtb3VzZWVudGVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpLmRyb3Bkb3duID4gYScpLm9mZignbW91c2VlbnRlcicpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdjbGljaycpO1xuICAgICAgICBzaWRlYmFyLm9mZignbW91c2VsZWF2ZScpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5kcm9wZG93bicpLm9mZignbW91c2VvdmVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLmRyb3Bkb3duJykub2ZmKCdtb3VzZW91dCcpO1xuXG4gICAgICAgICQoJ2JvZHknKS5vZmYoJ21vdXNlb3V0JywgJyNkcm9wZG93bi10ZW1wIC5kcm9wZG93bicpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgndWwuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ2hpZGRlbi5icy5jb2xsYXBzZScpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKS5yZW1vdmUoKTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5oYXNTdWJtZW51JykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duJylcbiAgICAgICAgICAgIC5maW5kKCc+IHVsJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUgc3VibWVudS1oaWRlIHN1Ym1lbnUtc2hvdycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC5maW5kKCc+IGEnKS5hdHRyKCdkYXRhLXRvZ2dsZScsICdjb2xsYXBzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2lkZWJhci5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29sbGFwc2VcbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5vbignc2hvdy5icy5jb2xsYXBzZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKHRoaXMpLnBhcmVudHMoJ3VsOmZpcnN0JykuZmluZCgnPiBsaS5vcGVuIFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJyk7XG4gICAgICAgICAgICBpZiAocGFyZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oYXNTdWJtZW51JykuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5jb2xsYXBzZScpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmhhc1N1Ym1lbnUnKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJykuY29sbGFwc2UoeyB0b2dnbGU6IGZhbHNlIH0pO1xuXG4gICAgfTtcblxuICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImNvbGxhcHNlXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRrU2lkZWJhckNvbGxhcHNlKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2lkZWJhckRyb3Bkb3duID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNpZGViYXIgPSB0aGlzO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ3Nob3cuYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignaGlkZGVuLmJzLmNvbGxhcHNlJyk7XG5cbiAgICAgICAgdmFyIG5pY2UgPSBzaWRlYmFyLmZpbmQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpWyAwIF07XG5cbiAgICAgICAgbmljZS5zY3JvbGxzdGFydChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISBzaWRlYmFyLmlzKCdbZGF0YS10eXBlPVwiZHJvcGRvd25cIl0nKSkgcmV0dXJuO1xuICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnc2Nyb2xsaW5nJyk7XG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wID4gdWwgPiBsaScpLmVtcHR5KCk7XG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5pY2Uuc2Nyb2xsZW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghIHNpZGViYXIuaXMoJ1tkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpKSByZXR1cm47XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ2xhc3RTY3JvbGxUb3AnLCBuaWNlLmdldFNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ3Njcm9sbGluZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5oYXNTdWJtZW51JykuYWRkQ2xhc3MoJ2Ryb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAgICAgLmZpbmQoJz4gdWwnKS5hZGRDbGFzcygnZHJvcGRvd24tbWVudScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZSBpbicpLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLmZpbmQoJz4gYScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtdG9nZ2xlJyk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkuZHJvcGRvd24gPiBhJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBjID0gc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpO1xuXG4gICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIGMuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoISAkKHRoaXMpLnBhcmVudCgnLmRyb3Bkb3duJykuaXMoJy5vcGVuJykgJiYgISBzaWRlYmFyLmlzKCcuc2Nyb2xsaW5nJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9ICQodGhpcykucGFyZW50KCcuZHJvcGRvd24nKSxcbiAgICAgICAgICAgICAgICAgICAgdCA9IHAuZmluZCgnPiAuZHJvcGRvd24tbWVudScpLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ3N1Ym1lbnUtaGlkZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgYy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9ICQoJzxkaXYvPicpLmF0dHIoJ2lkJywgJ2Ryb3Bkb3duLXRlbXAnKS5hcHBlbmRUbyhzaWRlYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgYy5odG1sKCc8dWw+PGxpPjwvbGk+PC91bD4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjLnNob3coKTtcbiAgICAgICAgICAgICAgICBjLmZpbmQoJy5kcm9wZG93bi1tZW51JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgYyA9IGMuZmluZCgnPiB1bCA+IGxpJykuY3NzKHtvdmVyZmxvdzogJ3Zpc2libGUnfSkuYWRkQ2xhc3MoJ2Ryb3Bkb3duIG9wZW4nKTtcblxuICAgICAgICAgICAgICAgIHAuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICB0LmFwcGVuZFRvKGMpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogcC5vZmZzZXQoKS50b3AgLSBjLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzEwMCUnXG4gICAgICAgICAgICAgICAgfSkuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNpZGViYXIuaXMoJy5yaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHQuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCEgJCh0aGlzKS5wYXJlbnQoKS5pcygnLmRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQodGhpcykuY2xvc2VzdCgnLnNpZGViYXInKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5pcygnLmRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuZHJvcGRvd24nKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb3BlbicpLmNoaWxkcmVuKCd1bCcpLnJlbW92ZUNsYXNzKCdzdWJtZW51LWhpZGUnKS5hZGRDbGFzcygnc3VibWVudS1zaG93Jyk7XG4gICAgICAgIH0pLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJ3VsJykucmVtb3ZlQ2xhc3MoJy5zdWJtZW51LXNob3cnKS5hZGRDbGFzcygnc3VibWVudS1oaWRlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignbW91c2VvdXQnLCAnI2Ryb3Bkb3duLXRlbXAgLmRyb3Bkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLnNpZGViYXItbWVudSAub3BlbicsICQodGhpcykuY2xvc2VzdCgnLnNpZGViYXInKSkucmVtb3ZlQ2xhc3MoJy5vcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciB0cmFuc2Zvcm1fZGQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50a1NpZGViYXJEcm9wZG93bigpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB2YXIgdHJhbnNmb3JtX2NvbGxhcHNlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykudGtTaWRlYmFyQ29sbGFwc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgdHJhbnNmb3JtX2RkKCk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NDgwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpLmF0dHIoJ2RhdGEtdHlwZScsICdjb2xsYXBzZScpLmF0dHIoJ2RhdGEtdHJhbnNmb3JtZWQnLCB0cnVlKTtcbiAgICAgICAgdHJhbnNmb3JtX2NvbGxhcHNlKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtYWtlX2RkKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRyYW5zZm9ybWVkXScpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRyYW5zZm9ybWVkXScpLmF0dHIoJ2RhdGEtdHlwZScsICdkcm9wZG93bicpLmF0dHIoJ2RhdGEtdHJhbnNmb3JtZWQnLCB0cnVlKTtcbiAgICAgICAgdHJhbnNmb3JtX2RkKCk7XG4gICAgfVxuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDc2OCcsIG1ha2VfZGQpO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDEwMjQnLCBtYWtlX2RkKTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzaWRlYmFyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm0tYnV0dG9uXCI6IHNpZGViYXIuZGF0YSgndHJhbnNmb3JtQnV0dG9uJykgPT09IHRydWUsXG4gICAgICAgIFwidHJhbnNmb3JtLWJ1dHRvbi1pY29uXCI6IHNpZGViYXIuZGF0YSgndHJhbnNmb3JtQnV0dG9uSWNvbicpIHx8ICdmYS1lbGxpcHNpcy1oJ1xuICAgIH07XG59OyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNpZGViYXJzID0gJCgnLnNpZGViYXInKTtcblxuICAgIHNpZGViYXJzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzaWRlYmFyID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSByZXF1aXJlKCcuL19vcHRpb25zJykoc2lkZWJhcik7XG5cbiAgICAgICAgaWYgKG9wdGlvbnNbICd0cmFuc2Zvcm0tYnV0dG9uJyBdKSB7XG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+Jyk7XG5cbiAgICAgICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdzaWRlYmFyLXRyYW5zZm9ybScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdidG4gYnRuLWRlZmF1bHQnKVxuICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhICcgKyBvcHRpb25zWyAndHJhbnNmb3JtLWJ1dHRvbi1pY29uJyBdICsgJ1wiPjwvaT4nKTtcblxuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51JykuYXBwZW5kKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNzdWJuYXYnKS5jb2xsYXBzZSh7J3RvZ2dsZSc6IGZhbHNlfSk7XG5cbiAgICBmdW5jdGlvbiBtb2JpbGVjaGVjaygpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgaWYgKC8oYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGt8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWluby9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpXG4gICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH1cblxuICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGVmZmVjdDogJ3N0LWVmZmVjdC0xJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTUwLFxuICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvciA9ICcuc3QtY29udGFpbmVyJyxcblxuICAgICAgICAgICAgZXZlbnR0eXBlID0gbW9iaWxlY2hlY2soKSA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsXG5cbiAgICAgICAgICAgIGdldExheW91dENsYXNzZXMgPSBmdW5jdGlvbiAoc2lkZWJhciwgZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF5b3V0Q2xhc3NlcyA9IHNpZGViYXIuZGF0YSgnbGF5b3V0Q2xhc3NlcycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgbGF5b3V0Q2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlTGF5b3V0ID0gc2lkZWJhci5kYXRhKCd0b2dnbGVMYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2dnbGVMYXlvdXQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSB0b2dnbGVMYXlvdXQuc3BsaXQoXCIsXCIpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5kYXRhKCdsYXlvdXRDbGFzc2VzJywgbGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGF5b3V0Q2xhc3NlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IG5ldyBSZWdFeHAoJ3NpZGViYXItJyArIGRpcmVjdGlvbiArICcoXFxcXFMrKScsICdpZycpO1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gJCgnaHRtbCcpLmdldCgwKS5jbGFzc05hbWUubWF0Y2gobWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF5b3V0Q2xhc3NlcyAhPT0gbnVsbCAmJiBsYXlvdXRDbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IGxheW91dENsYXNzZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLmRhdGEoJ2xheW91dENsYXNzZXMnLCBsYXlvdXRDbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBsYXlvdXRDbGFzc2VzO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRTaWRlYmFyRGF0YU9wdGlvbnMgPSBmdW5jdGlvbihzaWRlYmFyKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdDogc2lkZWJhci5kYXRhKCdlZmZlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogc2lkZWJhci5kYXRhKCdvdmVybGF5JylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzZXQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0eXBlb2YgaWQgIT09ICd1bmRlZmluZWQnID8gJyMnICsgaWQgOiBjb250YWluZXIuZGF0YSgnc3RNZW51VGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIgPSAkKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIuaXMoJzp2aXNpYmxlJykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoc2lkZWJhci5oYXNDbGFzcygnc2lkZWJhci1jbG9zZWQnKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVmZmVjdCA9IHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLmVmZmVjdCA/IG9wdGlvbnMuZWZmZWN0IDogY29udGFpbmVyLmRhdGEoJ3N0TWVudUVmZmVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBzaWRlYmFyLmlzKCcubGVmdCcpID8gJ2wnIDogJ3InLFxuICAgICAgICAgICAgICAgICAgICBzaXplID0gc2lkZWJhci5nZXQoMCkuY2xhc3NOYW1lLm1hdGNoKC9zaWRlYmFyLXNpemUtKFxcUyspLykucG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGh0bWxDbGFzcyA9ICdzdC1lZmZlY3QtJyArIGRpcmVjdGlvbiArIHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUxheW91dCA9IHNpZGViYXIuZGF0YSgndG9nZ2xlTGF5b3V0JyksXG4gICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSBnZXRMYXlvdXRDbGFzc2VzKHNpZGViYXIsIGRpcmVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXI6IHNpZGViYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2lkZWJhci5oaWRlJywgZXZlbnREYXRhKTtcblxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXVtocmVmPVwiJyArIHRhcmdldCArICdcIl0nKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGVmZmVjdCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3N0LW1lbnUtb3BlbiBzdC1wdXNoZXItb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcyhodG1sQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlTGF5b3V0KSAkKCdodG1sJykucmVtb3ZlQ2xhc3MobGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdldCgwKS5jbGFzc05hbWUgPSAnc3QtY29udGFpbmVyJzsgLy8gY2xlYXJcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnc2lkZWJhci1jbG9zZWQnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuaGlkZGVuJywgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wZW4gPSBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gb24gbW9iaWxlLCBhbGxvdyBvbmx5IG9uZSBzaWRlYmFyIHRvIGJlIG9wZW4gYXQgdGhlIHNhbWUgdGltZVxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCAmJiBjb250YWluZXIuaGFzQ2xhc3MoJ3N0LW1lbnUtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXVtocmVmPVwiJyArIHRhcmdldCArICdcIl0nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWZmZWN0ID0gb3B0aW9ucy5lZmZlY3QsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXkgPSBvcHRpb25zLm92ZXJsYXk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gc2lkZWJhci5pcygnLmxlZnQnKSA/ICdsJyA6ICdyJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHNpZGViYXIuZ2V0KDApLmNsYXNzTmFtZS5tYXRjaCgvc2lkZWJhci1zaXplLShcXFMrKS8pLnBvcCgpLFxuICAgICAgICAgICAgICAgICAgICBodG1sQ2xhc3MgPSAnc3QtZWZmZWN0LScgKyBkaXJlY3Rpb24gKyBzaXplLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVMYXlvdXQgPSBzaWRlYmFyLmRhdGEoJ3RvZ2dsZUxheW91dCcpLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gZ2V0TGF5b3V0Q2xhc3NlcyhzaWRlYmFyLCBkaXJlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiBzaWRlYmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuc2hvdycsIGV2ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnNob3coKS5yZW1vdmVDbGFzcygnc2lkZWJhci1jbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzdE1lbnVFZmZlY3QnLCBlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzdE1lbnVUYXJnZXQnLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGlmIChvdmVybGF5KSBjb250YWluZXIuYWRkQ2xhc3MoJ3N0LXB1c2hlci1vdmVybGF5Jyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdzdC1tZW51LW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgICAgIH0sIDI1KTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlTGF5b3V0KSAkKCdodG1sJykuYWRkQ2xhc3MobGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuc2hvd24nLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBhbmltYXRpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoYSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGJ1dHRvbi5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhciA9ICQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRBY3RpdmVFbGVtZW50ID0gJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpLmNsb3Nlc3QoJ2xpJykubGVuZ3RoID8gJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpLmNsb3Nlc3QoJ2xpJykgOiAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nKS5ub3QodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmxlbmd0aCA/ICQodGhpcykuY2xvc2VzdCgnbGknKSA6ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJCgnaHRtbCcpLmhhc0NsYXNzKCdzaG93LXNpZGViYXInKSkgYWN0aXZlRWxlbWVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdzaG93LXNpZGViYXInKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlRWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpICQoJ2h0bWwnKS5hZGRDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSBnZXRTaWRlYmFyRGF0YU9wdGlvbnMoc2lkZWJhciksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk9wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChidXR0b24uZGF0YSgnZWZmZWN0JykpIGJ1dHRvbk9wdGlvbnMuZWZmZWN0ID0gYnV0dG9uLmRhdGEoJ2VmZmVjdCcpO1xuICAgICAgICAgICAgICAgIGlmIChidXR0b24uZGF0YSgnb3ZlcmxheScpKSBidXR0b25PcHRpb25zLm92ZXJsYXkgPSBidXR0b24uZGF0YSgnb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGRhdGFPcHRpb25zLCBidXR0b25PcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIuaGFzQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykgJiYgc2lkZWJhci5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNldChzaWRlYmFyLmF0dHIoJ2lkJyksIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3Blbih0YXJnZXQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICQoJ2JvZHknKS5vbihldmVudHR5cGUsICdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nLCB0b2dnbGUpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgbnVsbCwgJ2VzYycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmhhc0NsYXNzKCdzdC1tZW51LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgICAgICovXG4gICAgICAgICQuZm4udGtTaWRlYmFyVG9nZ2xlQmFyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8qIFNpZGViYXIgVG9nZ2xlIEJhciAqL1xuICAgICAgICAgICAgaWYgKHNpZGViYXIuZGF0YSgndG9nZ2xlQmFyJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFyID0gJCgnPGE+PC9hPicpO1xuICAgICAgICAgICAgICAgIGJhci5hdHRyKCdocmVmJywgJyMnICsgc2lkZWJhci5hdHRyKCdpZCcpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnc2lkZWJhci1tZW51JylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzaWRlYmFyLXRvZ2dsZS1iYXInKTtcblxuICAgICAgICAgICAgICAgIHNpZGViYXIuYXBwZW5kKGJhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkKCcuc2lkZWJhcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykudGtTaWRlYmFyVG9nZ2xlQmFyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5zaWRlYmFyID0ge1xuXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhID0gYW5pbWF0aW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wZW4oJyMnICsgaWQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNldChpZCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wdGlvbnM6IGdldFNpZGViYXJEYXRhT3B0aW9uc1xuXG4gICAgICAgIH07XG5cbiAgICB9KSgpO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzJyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLW1lbnUnKTtcbnJlcXVpcmUoJy4vX2NvbGxhcHNpYmxlJyk7XG5yZXF1aXJlKCcuL19kcm9wZG93bicpO1xucmVxdWlyZSgnLi9fc2lkZWJhci10b2dnbGUnKTtcblxuKGZ1bmN0aW9uKCQpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NpZGViYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgbWVudVR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9nZ2xlQmFyOiBmYWxzZVxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLm1lbnVUeXBlID09IFwiY29sbGFwc2VcIikge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJDb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLm1lbnVUeXBlID09IFwiZHJvcGRvd25cIikge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJEcm9wZG93bigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRvZ2dsZUJhciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJUb2dnbGVCYXIoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJy5zaGFyZSB0ZXh0YXJlYScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcIi5zaGFyZSBidXR0b25cIilbICQodGhpcykudmFsKCkgPT09ICcnID8gJ2hpZGUnIDogJ3Nob3cnIF0oKTtcbiAgICB9KTtcblxuICAgIGlmICghICQoXCIjc2Nyb2xsLXNweVwiKS5sZW5ndGgpIHJldHVybjtcblxuICAgIHZhciBvZmZzZXQgPSAkKFwiI3Njcm9sbC1zcHlcIikub2Zmc2V0KCkudG9wO1xuXG4gICAgJCgnYm9keScpLnNjcm9sbHNweSh7dGFyZ2V0OiAnI3Njcm9sbC1zcHknLCBvZmZzZXQ6IG9mZnNldH0pO1xuXG59KShqUXVlcnkpO1xuIiwicmVxdWlyZSgnLi9fdGltZWxpbmUnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtDYXJvdXNlbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwoKTtcblxuICAgICAgICB0aGlzLmZpbmQoJ1tkYXRhLXNsaWRlXScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtDb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmF0dHIoJ2hyZWYnKSB8fCB0aGlzLmF0dHIoJ3RhcmdldCcpO1xuICAgICAgICBpZiAoISB0YXJnZXQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHRhcmdldCkuY29sbGFwc2Uoe3RvZ2dsZTogZmFsc2V9KTtcblxuICAgIH07XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInN3aXRjaC1jaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQodGhpcykuYm9vdHN0cmFwU3dpdGNoKHtcbiAgICAgICAgICAgIG9mZkNvbG9yOiAnZGFuZ2VyJ1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0NoZWNrQWxsID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5maW5kKCc6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdGhpcy5jaGVja2VkKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgQWxsIENoZWNrYm94ZXNcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJjaGVjay1hbGxcIl0nKS50a0NoZWNrQWxsKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDb25zZXJ2ZSBhc3BlY3QgcmF0aW8gb2YgdGhlIG9yaWduYWwgcmVnaW9uLiBVc2VmdWwgd2hlbiBzaHJpbmtpbmcvZW5sYXJnaW5nXG4gICAgICogaW1hZ2VzIHRvIGZpdCBpbnRvIGEgY2VydGFpbiBhcmVhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNyY1dpZHRoIFNvdXJjZSBhcmVhIHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNyY0hlaWdodCBTb3VyY2UgYXJlYSBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4V2lkdGggRml0dGFibGUgYXJlYSBtYXhpbXVtIGF2YWlsYWJsZSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhIZWlnaHQgRml0dGFibGUgYXJlYSBtYXhpbXVtIGF2YWlsYWJsZSBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHsgd2lkdGgsIGhlaWd0aCB9XG4gICAgICovXG4gICAgdmFyIGFzcGVjdFJhdGlvRml0ID0gZnVuY3Rpb24gKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcblxuICAgICAgICB2YXIgd1JhdGlvID0gbWF4V2lkdGggLyBzcmNXaWR0aCxcbiAgICAgICAgICAgIGhSYXRpbyA9IG1heEhlaWdodCAvIHNyY0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoID0gc3JjV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQgPSBzcmNIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHNyY1dpZHRoIC8gbWF4V2lkdGggPCBzcmNIZWlnaHQgLyBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbWF4V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBzcmNIZWlnaHQgKiB3UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoICogaFJhdGlvO1xuICAgICAgICAgICAgaGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fTtcbiAgICB9O1xuXG4gICAgJC5mbi50a0NvdmVyID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyKCc6dmlzaWJsZScpLm5vdCgnW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGkgPSB0LmZpbmQoJ2ltZzpmaXJzdCcpO1xuXG4gICAgICAgICAgICB0LmhlaWdodChpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5LWZ1bGwnLCB0KS5pbm5lckhlaWdodChpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2RvbUNoYW5nZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIoJzp2aXNpYmxlJykuZmlsdGVyKCdbY2xhc3MqPVwiaGVpZ2h0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgaW1nID0gdC5maW5kKCdpbWcnKTtcblxuICAgICAgICAgICAgaW1nLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkKGkpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgJChpKS5jc3MoYXNwZWN0UmF0aW9GaXQoaS53aWR0aCgpLCBpLmhlaWdodCgpLCB0LndpZHRoKCksIHQuaGVpZ2h0KCkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoZWlnaHQoKSB7XG5cbiAgICAgICAgJCgnLmNvdmVyLm92ZXJsYXknKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRrQ292ZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShoZWlnaHQpO1xuICAgICQod2luZG93KS5vbignbG9hZCcsIGhlaWdodCk7XG5cbiAgICB2YXIgdDtcbiAgICAkKHdpbmRvdykub24oXCJkZWJvdW5jZWRyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGhlaWdodCwgMjAwKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0RhdGVQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZGF0ZXBpY2tlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLmRhdGVwaWNrZXInKS50a0RhdGVQaWNrZXIoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNyZXBvcnRyYW5nZScpLmRhdGVyYW5nZXBpY2tlcihcbiAgICAgICAge1xuICAgICAgICAgICAgcmFuZ2VzOiB7XG4gICAgICAgICAgICAgICAgJ1RvZGF5JzogW21vbWVudCgpLCBtb21lbnQoKV0sXG4gICAgICAgICAgICAgICAgJ1llc3RlcmRheSc6IFttb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpLCBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDEpXSxcbiAgICAgICAgICAgICAgICAnTGFzdCA3IERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCA2KSwgbW9tZW50KCldLFxuICAgICAgICAgICAgICAgICdMYXN0IDMwIERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksIG1vbWVudCgpXSxcbiAgICAgICAgICAgICAgICAnVGhpcyBNb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgICAgICAgICAgJ0xhc3QgTW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoJ21vbnRoJywgMSkuZW5kT2YoJ21vbnRoJyldXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgnZGF5cycsIDI5KSxcbiAgICAgICAgICAgIGVuZERhdGU6IG1vbWVudCgpXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgICQoJyNyZXBvcnRyYW5nZSBzcGFuJykuaHRtbChzdGFydC5mb3JtYXQoJ01NTU0gRCwgWVlZWScpICsgJyAtICcgKyBlbmQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgJCgnI3Jlc2VydmF0aW9udGltZScpLmRhdGVyYW5nZXBpY2tlcih7IHRpbWVQaWNrZXI6IHRydWUsIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IDMwLCBmb3JtYXQ6ICdNTS9ERC9ZWVlZIGg6bW0gQScgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKiBAdG9kbzogQW5ndWxhciBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgJC5mbi50a0V4cGFuZGFibGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmZpbmQoJy5leHBhbmRhYmxlLWNvbnRlbnQnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJleHBhbmRhYmxlLWluZGljYXRvclwiPjxpPjwvaT48L2Rpdj4nKTtcblxuICAgIH07XG5cbiAgICAkKCcuZXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrRXhwYW5kYWJsZSgpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS1pbmRpY2F0b3InLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5leHBhbmRhYmxlJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZXhwYW5kYWJsZS10cmlnZ2VyOm5vdCguZXhwYW5kYWJsZS1vcGVuKScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGFibGUtb3BlbicpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBpZiB3ZSdyZSBpbnNpZGUgYW4gaWZyYW1lLCByZWxvYWQgd2l0aG91dCBpZnJhbWVcbiAgICBpZiAod2luZG93LmxvY2F0aW9uICE9IHdpbmRvdy5wYXJlbnQubG9jYXRpb24pXG4gICAgICAgIHRvcC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtNaW5pQ29sb3JzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLm1pbmljb2xvcnMgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5taW5pY29sb3JzKHtcbiAgICAgICAgICAgICAgICBjb250cm9sOiB0aGlzLmF0dHIoJ2RhdGEtY29udHJvbCcpIHx8ICdodWUnLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5hdHRyKCdkYXRhLWRlZmF1bHRWYWx1ZScpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGlubGluZTogdGhpcy5hdHRyKCdkYXRhLWlubGluZScpID09PSAndHJ1ZScsXG4gICAgICAgICAgICAgICAgbGV0dGVyQ2FzZTogdGhpcy5hdHRyKCdkYXRhLWxldHRlckNhc2UnKSB8fCAnbG93ZXJjYXNlJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiB0aGlzLmF0dHIoJ2RhdGEtb3BhY2l0eScpLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmF0dHIoJ2RhdGEtcG9zaXRpb24nKSB8fCAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGhleCwgb3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISBoZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkpIGhleCArPSAnLCAnICsgb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXAnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLm1pbmljb2xvcnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLnRrTWluaUNvbG9ycygpO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKiBAdG9kbzogQW5ndWxhciBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgJC5mbi50a05lc3RhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLm5lc3RhYmxlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMubmVzdGFibGUoe1xuICAgICAgICAgICAgICAgIHJvb3RDbGFzczogJ25lc3RhYmxlJyxcbiAgICAgICAgICAgICAgICBsaXN0Tm9kZU5hbWU6ICd1bCcsXG4gICAgICAgICAgICAgICAgbGlzdENsYXNzOiAnbmVzdGFibGUtbGlzdCcsXG4gICAgICAgICAgICAgICAgaXRlbUNsYXNzOiAnbmVzdGFibGUtaXRlbScsXG4gICAgICAgICAgICAgICAgZHJhZ0NsYXNzOiAnbmVzdGFibGUtZHJhZycsXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2xhc3M6ICduZXN0YWJsZS1oYW5kbGUnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZENsYXNzOiAnbmVzdGFibGUtY29sbGFwc2VkJyxcbiAgICAgICAgICAgICAgICBwbGFjZUNsYXNzOiAnbmVzdGFibGUtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgICAgIGVtcHR5Q2xhc3M6ICduZXN0YWJsZS1lbXB0eSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCcubmVzdGFibGUnKS50a05lc3RhYmxlKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciByYW5kb21JZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiogQHJldHVybiBTdHJpbmcgKi9cbiAgICAgICAgdmFyIFM0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKCgoMStNYXRoLnJhbmRvbSgpKSoweDEwMDAwKXwwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFM0KCkrUzQoKStcIi1cIitTNCgpK1wiLVwiK1M0KCkrXCItXCIrUzQoKStcIi1cIitTNCgpK1M0KCkrUzQoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtQYW5lbENvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGJvZHkgPSAkKCcucGFuZWwtYm9keScsIHRoaXMpLFxuICAgICAgICAgICAgaWQgPSBib2R5LmF0dHIoJ2lkJykgfHwgcmFuZG9tSWQoKSxcbiAgICAgICAgICAgIGNvbGxhcHNlID0gJCgnPGRpdi8+Jyk7XG5cbiAgICAgICAgY29sbGFwc2VcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGlkKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZScgKyAodGhpcy5kYXRhKCdvcGVuJykgPyAnIGluJyA6ICcnKSlcbiAgICAgICAgICAgIC5hcHBlbmQoYm9keS5jbG9uZSgpKTtcblxuICAgICAgICBib2R5LnJlbW92ZSgpO1xuXG4gICAgICAgICQodGhpcykuYXBwZW5kKGNvbGxhcHNlKTtcblxuICAgICAgICAkKCcucGFuZWwtY29sbGFwc2UtdHJpZ2dlcicsIHRoaXMpXG4gICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnY29sbGFwc2UnIClcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRhcmdldCcsICcjJyArIGlkKVxuICAgICAgICAgICAgLmNvbGxhcHNlKHsgdHJpZ2dlcjogZmFsc2UgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwicGFuZWwtY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudGtQYW5lbENvbGxhcHNlKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIFByb2dyZXNzIEJhciBBbmltYXRpb25cbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykud2lkdGgoJCh0aGlzKS5hdHRyKCdhcmlhLXZhbHVlbm93JykgKyAnJScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdC5kYXRhKCdhbGxvd0NsZWFyJylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodC5pcygnYnV0dG9uJykpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHQuaXMoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0LmlzKCdbZGF0YS10b2dnbGU9XCJzZWxlY3QyLXRhZ3NcIl0nKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGFncyA9IHQuZGF0YSgndGFncycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHQuc2VsZWN0MihvcHRpb25zKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJFbmFibGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0MiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNlbGVjdDIoXCJlbmFibGVcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJEaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzLmRhdGEoJ3RhcmdldCcpKS5zZWxlY3QyKFwiZGlzYWJsZVwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2VsZWN0MkZsYWdzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgLy8gdGVtcGxhdGluZ1xuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghIHN0YXRlLmlkKSByZXR1cm4gc3RhdGUudGV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCI8aW1nIGNsYXNzPSdmbGFnJyBzcmM9J2h0dHA6Ly9zZWxlY3QyLmdpdGh1Yi5pby9zZWxlY3QyL2ltYWdlcy9mbGFncy9cIiArIHN0YXRlLmlkLnRvTG93ZXJDYXNlKCkgKyBcIi5wbmcnLz5cIiArIHN0YXRlLnRleHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdDIoe1xuICAgICAgICAgICAgICAgIGZvcm1hdFJlc3VsdDogZm9ybWF0LFxuICAgICAgICAgICAgICAgIGZvcm1hdFNlbGVjdGlvbjogZm9ybWF0LFxuICAgICAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJzZWxlY3QyXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAkKHRoaXMpLnRrU2VsZWN0MigpO1xuXG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzZWxlY3QyLWVuYWJsZVwiXScpLnRrU2VsZWN0MkVuYWJsZSgpO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1kaXNhYmxlXCJdJykudGtTZWxlY3QyRGlzYWJsZSgpO1xuXG4gICAgJChcIiNzZWxlY3QyXzdcIikudGtTZWxlY3QyRmxhZ3MoKTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdFBpY2tlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3RwaWNrZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RwaWNrZXIoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmRhdGEoJ3dpZHRoJykgfHwgJzEwMCUnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnLnNlbGVjdHBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAkKHRoaXMpLnRrU2VsZWN0UGlja2VyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBzaG93SG92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLXNob3ctaG92ZXJdJykuaGlkZSgpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHBhcmVudCA9ICQodGhpcykuZGF0YSgnc2hvd0hvdmVyJyk7XG5cbiAgICAgICAgICAgIHNlbGYuY2xvc2VzdChwYXJlbnQpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9KS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNob3dIb3ZlcigpO1xuXG4gICAgd2luZG93LnNob3dIb3ZlciA9IHNob3dIb3ZlcjtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBiYXJzID0gZnVuY3Rpb24oZWwpe1xuICAgICAgICAkKCcuc2xpZGVyLWhhbmRsZScsIGVsKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWJhcnMgZmEtcm90YXRlLTkwXCI+PC9pPicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWRlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLnNsaWRlcigpO1xuXG4gICAgICAgICAgICBiYXJzKHRoaXMpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU2xpZGVyRm9ybWF0dGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNsaWRlciAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLnNsaWRlcih7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50IHZhbHVlOiAnICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJhcnModGhpcyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTbGlkZXJVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMub24oXCJzbGlkZVwiLCBmdW5jdGlvbiAoc2xpZGVFdnQpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMuYXR0cignZGF0YS1vbi1zbGlkZScpKS50ZXh0KHNsaWRlRXZ0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBiYXJzKHRoaXMpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1zbGlkZXI9XCJkZWZhdWx0XCJdJykudGtTbGlkZXIoKTtcblxuICAgICQoJ1tkYXRhLXNsaWRlcj1cImZvcm1hdHRlclwiXScpLnRrU2xpZGVyRm9ybWF0dGVyKCk7XG5cbiAgICAkKCdbZGF0YS1vbi1zbGlkZV0nKS50a1NsaWRlclVwZGF0ZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0RhdGFUYWJsZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZGF0YVRhYmxlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVRhYmxlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImRhdGEtdGFibGVcIl0nKS50a0RhdGFUYWJsZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0YWJzID0gJCh0aGlzKS5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgb25lYXhpc21vdXNlbW9kZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3N1cGVyID0gdGFicy5nZXRDb250ZW50U2l6ZTtcbiAgICAgICAgdGFicy5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbCh0YWJzKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IHRhYnMud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcblxuICAgICQoJy50YWJiYWJsZSAubmF2LXRhYnMgYScpLm9uKCdzaG93bi5icy50YWInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHRhYiA9ICQodGhpcykuY2xvc2VzdCgnLnRhYmJhYmxlJyk7XG4gICAgICAgIHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICAgIHRhcmdldFBhbmUgPSB0YXJnZXQuYXR0cignaHJlZicpIHx8IHRhcmdldC5kYXRhKCd0YXJnZXQnKTtcblxuICAgICAgICAvLyByZWZyZXNoIHRhYnMgd2l0aCBob3Jpem9udGFsIHNjcm9sbFxuICAgICAgICB0YWIuZmluZCgnLm5hdi10YWJzJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgICAgIC8vIHJlZnJlc2ggW2RhdGEtc2Nyb2xsYWJsZV0gd2l0aGluIHRoZSBhY3RpdmF0ZWQgdGFiIHBhbmVcbiAgICAgICAgJCh0YXJnZXRQYW5lKS5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRvb2x0aXBcbiAgICAkKFwiYm9keVwiKS50b29sdGlwKHtzZWxlY3RvcjogJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nLCBjb250YWluZXI6IFwiYm9keVwifSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrVG91Y2hTcGluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLlRvdWNoU3BpbiAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLlRvdWNoU3BpbigpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b3VjaC1zcGluXCJdJykudGtUb3VjaFNwaW4oKTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciB0cmVlX2dseXBoX29wdGlvbnMgPSB7XG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgY2hlY2tib3g6IFwiZmEgZmEtc3F1YXJlLW9cIixcbiAgICAgICAgICAgIGNoZWNrYm94U2VsZWN0ZWQ6IFwiZmEgZmEtY2hlY2stc3F1YXJlXCIsXG4gICAgICAgICAgICBjaGVja2JveFVua25vd246IFwiZmEgZmEtY2hlY2stc3F1YXJlIGZhLW11dGVkXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiLFxuICAgICAgICAgICAgZXhwYW5kZXJDbG9zZWQ6IFwiZmEgZmEtY2FyZXQtcmlnaHRcIixcbiAgICAgICAgICAgIGV4cGFuZGVyTGF6eTogXCJmYSBmYS1hbmdsZS1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJPcGVuOiBcImZhIGZhLWNhcmV0LWRvd25cIixcbiAgICAgICAgICAgIGRvYzogXCJmYSBmYS1maWxlLW9cIixcbiAgICAgICAgICAgIG5vRXhwYW5kZXI6IFwiXCIsXG4gICAgICAgICAgICBkb2NPcGVuOiBcImZhIGZhLWZpbGVcIixcbiAgICAgICAgICAgIGxvYWRpbmc6IFwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXCIsXG4gICAgICAgICAgICBmb2xkZXI6IFwiZmEgZmEtZm9sZGVyXCIsXG4gICAgICAgICAgICBmb2xkZXJPcGVuOiBcImZhIGZhLWZvbGRlci1vcGVuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJlZV9kbmRfb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b0V4cGFuZE1TOiA0MDAsXG4gICAgICAgICAgICBmb2N1c09uQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICBwcmV2ZW50Vm9pZE1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzICdiZWZvcmUgc2VsZicsIGV0Yy5cbiAgICAgICAgICAgIHByZXZlbnRSZWN1cnNpdmVNb3ZlczogdHJ1ZSwgLy8gUHJldmVudCBkcm9wcGluZyBub2RlcyBvbiBvd24gZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcmFnZ2luZyBmb3IgdGhlIHRyZWUuXG4gICAgICAgICAgICAgKiAgUmV0dXJuIGZhbHNlIHRvIGNhbmNlbCBkcmFnZ2luZyBvZiBub2RlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0VudGVyOiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogZGF0YS5vdGhlck5vZGUgbWF5IGJlIG51bGwgZm9yIG5vbi1mYW5jeXRyZWUgZHJvcHBhYmxlcy5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gZGlzYWxsb3cgZHJvcHBpbmcgb24gbm9kZS4gSW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgKiAgZHJhZ092ZXIgYW5kIGRyYWdMZWF2ZSBhcmUgbm90IGNhbGxlZC5cbiAgICAgICAgICAgICAqICBSZXR1cm4gJ292ZXInLCAnYmVmb3JlLCBvciAnYWZ0ZXInIHRvIGZvcmNlIGEgaGl0TW9kZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gWydiZWZvcmUnLCAnYWZ0ZXInXSB0byByZXN0cmljdCBhdmFpbGFibGUgaGl0TW9kZXMuXG4gICAgICAgICAgICAgKiAgQW55IG90aGVyIHJldHVybiB2YWx1ZSB3aWxsIGNhbGMgdGhlIGhpdE1vZGUgZnJvbSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRyb3BwaW5nIGEgcGFyZW50IGJlbG93IGFub3RoZXIgcGFyZW50IChvbmx5IHNvcnRcbiAgICAgICAgICAgIC8vIG5vZGVzIHVuZGVyIHRoZSBzYW1lIHBhcmVudClcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZihub2RlLnBhcmVudCAhPT0gZGF0YS5vdGhlck5vZGUucGFyZW50KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBkcm9wcGluZyAqb3ZlciogYSBub2RlICh3b3VsZCBjcmVhdGUgYSBjaGlsZClcbiAgICAgICAgICAgIHJldHVybiBbXCJiZWZvcmVcIiwgXCJhZnRlclwiXTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ0Ryb3A6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBUaGlzIGZ1bmN0aW9uIE1VU1QgYmUgZGVmaW5lZCB0byBlbmFibGUgZHJvcHBpbmcgb2YgaXRlbXMgb25cbiAgICAgICAgICAgICAqICB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZGF0YS5vdGhlck5vZGUubW92ZVRvKG5vZGUsIGRhdGEuaGl0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0ZhbmN5VHJlZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uZmFuY3l0cmVlID09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGV4dGVuc2lvbnMgPSBbIFwiZ2x5cGhcIiBdO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXR0cignZGF0YS10cmVlLWRuZCcpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBleHRlbnNpb25zLnB1c2goIFwiZG5kXCIgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZhbmN5dHJlZSh7XG4gICAgICAgICAgICBleHRlbnNpb25zOiBleHRlbnNpb25zLFxuICAgICAgICAgICAgZ2x5cGg6IHRyZWVfZ2x5cGhfb3B0aW9ucyxcbiAgICAgICAgICAgIGRuZDogdHJlZV9kbmRfb3B0aW9ucyxcbiAgICAgICAgICAgIGNsaWNrRm9sZGVyTW9kZTogMyxcbiAgICAgICAgICAgIGNoZWNrYm94OiB0eXBlb2YgdGhpcy5hdHRyKCdkYXRhLXRyZWUtY2hlY2tib3gnKSAhPT0gXCJ1bmRlZmluZWRcIiB8fCBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdE1vZGU6IHR5cGVvZiB0aGlzLmF0dHIoJ2RhdGEtdHJlZS1zZWxlY3QnKSAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KHRoaXMuYXR0cignZGF0YS10cmVlLXNlbGVjdCcpKSA6IDJcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgLy8gdXNpbmcgZGVmYXVsdCBvcHRpb25zXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidHJlZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrRmFuY3lUcmVlKCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwicmVxdWlyZSgnLi9fdGFicycpO1xucmVxdWlyZSgnLi9fdHJlZScpO1xucmVxdWlyZSgnLi9fc2hvdy1ob3ZlcicpO1xucmVxdWlyZSgnLi9fZGF0ZXJhbmdlcGlja2VyJyk7XG5yZXF1aXJlKCcuL19leHBhbmRhYmxlJyk7XG5yZXF1aXJlKCcuL19uZXN0YWJsZScpO1xucmVxdWlyZSgnLi9fY292ZXInKTtcbnJlcXVpcmUoJy4vX3Rvb2x0aXAnKTtcbnJlcXVpcmUoJy4vX3RhYmxlcycpO1xucmVxdWlyZSgnLi9fY2hlY2stYWxsJyk7XG5yZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19pZnJhbWUnKTtcbnJlcXVpcmUoJy4vX2Jvb3RzdHJhcC1jb2xsYXBzZScpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLWNhcm91c2VsJyk7XG5yZXF1aXJlKCcuL19wYW5lbC1jb2xsYXBzZScpO1xuXG4vLyBGb3Jtc1xucmVxdWlyZSgnLi9fdG91Y2hzcGluJyk7XG5yZXF1aXJlKCcuL19zZWxlY3QyJyk7XG5yZXF1aXJlKCcuL19zbGlkZXInKTtcbnJlcXVpcmUoJy4vX3NlbGVjdHBpY2tlcicpO1xucmVxdWlyZSgnLi9fZGF0ZXBpY2tlcicpO1xucmVxdWlyZSgnLi9fbWluaWNvbG9ycycpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLXN3aXRjaCcpOyJdfQ==
