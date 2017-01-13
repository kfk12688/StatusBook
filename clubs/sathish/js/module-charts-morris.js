(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');
},{"./_area":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_area.js","./_bar":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_bar.js","./_donut":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_donut.js","./_line":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_line.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_area.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartArea = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Area({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: config.skins[ skin ][ 'primary-color' ],
            fillOpacity: '0.3',
            element: this.attr('id'),
            data: [
                {y: '1.1.', a: 30, b: 90},
                {y: '2.1.', a: 35, b: 65},
                {y: '3.1.', a: 50, b: 40},
                {y: '4.1.', a: 75, b: 65},
                {y: '5.1.', a: 50, b: 40},
                {y: '6.1.', a: 75, b: 65},
                {y: '7.1.', a: 60, b: 90}
            ],
            xkey: 'y',
            ykeys: [ 'a' ],
            labels: [ 'Series A' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();

        $('[data-skin]').on('click', function () {
            $('[data-toggle="morris-chart-area"]').tkMorrisChartArea();
        });

    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_bar.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartBar = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Bar({
            barColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ] ],
            element: this.attr('id'),
            data: [
                {y: '2006', a: 100, b: 90, c: 40},
                {y: '2007', a: 75, b: 65, c: 100},
                {y: '2008', a: 50, b: 40, c: 30},
                {y: '2009', a: 75, b: 65, c: 85},
                {y: '2010', a: 50, b: 40, c: 45},
                {y: '2011', a: 75, b: 65, c: 90},
                {y: '2012', a: 100, b: 90, c: 80}
            ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',
            resize: true,
            xkey: 'y',
            ykeys: [ 'a', 'b', 'c' ],
            labels: [ 'Series A', 'Series B', 'Series C' ]
        });
    };

    $(function () {

        $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-bar"]').tkMorrisChartBar();

        });

    });

})(jQuery);

},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_donut.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartDonut = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Donut({
            element: this.attr('id'),
            colors: [ colors[ 'danger-color' ], config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            data: [
                {label: "Download Sales", value: 12},
                {label: "In-Store Sales", value: 30},
                {label: "Mail-Order Sales", value: 20}
            ]
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-donut"]').tkMorrisChartDonut();

        });

    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_line.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkMorrisChartLine = function () {

        if (! this.length) return;

        if (! this.attr('id')) return;

        var skin = require('../lib/_skin')();

        this.empty();

        new Morris.Line({
            lineColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointFillColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'danger-color' ] ],
            pointStrokeColors: [ '#ffffff', '#ffffff' ],
            gridTextColor: colors[ 'default-color' ],
            gridTextWeight: 'bold',

            // ID of the element in which to draw the chart.
            element: this.attr('id'),
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                {date: '2014-02', a: 2000, b: 2400},
                {date: '2014-03', a: 1200, b: 2500},
                {date: '2014-04', a: 3200, b: 2000},
                {date: '2014-05', a: 1600, b: 1440},
                {date: '2014-06', a: 1290, b: 2830},
                {date: '2014-07', a: 1930, b: 1200},
                {date: '2014-08', a: 2120, b: 3000}
            ],
            // The name of the data record attribute that contains x-values.
            xkey: 'date',
            // A list of names of data record attributes that contain y-values.
            ykeys: [ 'a', 'b' ],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: [ 'Series A', 'Series B' ],
            resize: true
        });

    };

    $(function () {

        $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        $('[data-skin]').on('click', function(){

            $('[data-toggle="morris-chart-line"]').tkMorrisChartLine();

        });

    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}]},{},["./app/vendor/charts/js/morris/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tb3JyaXMvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2xpYi9fc2tpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYXJlYS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYmFyLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvbW9ycmlzL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fbGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vX2FyZWEnKTtcbnJlcXVpcmUoJy4vX2JhcicpO1xucmVxdWlyZSgnLi9fZG9udXQnKTtcbnJlcXVpcmUoJy4vX2xpbmUnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZSgnc2tpbicpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNraW4gPSAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBza2luO1xufSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmZuLnRrTW9ycmlzQ2hhcnRBcmVhID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCEgdGhpcy5hdHRyKCdpZCcpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG4gICAgICAgIHRoaXMuZW1wdHkoKTtcblxuICAgICAgICBuZXcgTW9ycmlzLkFyZWEoe1xuICAgICAgICAgICAgbGluZUNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSBdLFxuICAgICAgICAgICAgcG9pbnRGaWxsQ29sb3JzOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogJzAuMycsXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmF0dHIoJ2lkJyksXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAge3k6ICcxLjEuJywgYTogMzAsIGI6IDkwfSxcbiAgICAgICAgICAgICAgICB7eTogJzIuMS4nLCBhOiAzNSwgYjogNjV9LFxuICAgICAgICAgICAgICAgIHt5OiAnMy4xLicsIGE6IDUwLCBiOiA0MH0sXG4gICAgICAgICAgICAgICAge3k6ICc0LjEuJywgYTogNzUsIGI6IDY1fSxcbiAgICAgICAgICAgICAgICB7eTogJzUuMS4nLCBhOiA1MCwgYjogNDB9LFxuICAgICAgICAgICAgICAgIHt5OiAnNi4xLicsIGE6IDc1LCBiOiA2NX0sXG4gICAgICAgICAgICAgICAge3k6ICc3LjEuJywgYTogNjAsIGI6IDkwfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHhrZXk6ICd5JyxcbiAgICAgICAgICAgIHlrZXlzOiBbICdhJyBdLFxuICAgICAgICAgICAgbGFiZWxzOiBbICdTZXJpZXMgQScgXSxcbiAgICAgICAgICAgIGdyaWRUZXh0Q29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0sXG4gICAgICAgICAgICBncmlkVGV4dFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgcmVzaXplOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm1vcnJpcy1jaGFydC1hcmVhXCJdJykudGtNb3JyaXNDaGFydEFyZWEoKTtcblxuICAgICAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm1vcnJpcy1jaGFydC1hcmVhXCJdJykudGtNb3JyaXNDaGFydEFyZWEoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtNb3JyaXNDaGFydEJhciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghIHRoaXMuYXR0cignaWQnKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcblxuICAgICAgICB0aGlzLmVtcHR5KCk7XG5cbiAgICAgICAgbmV3IE1vcnJpcy5CYXIoe1xuICAgICAgICAgICAgYmFyQ29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdIF0sXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmF0dHIoJ2lkJyksXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAge3k6ICcyMDA2JywgYTogMTAwLCBiOiA5MCwgYzogNDB9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAwNycsIGE6IDc1LCBiOiA2NSwgYzogMTAwfSxcbiAgICAgICAgICAgICAgICB7eTogJzIwMDgnLCBhOiA1MCwgYjogNDAsIGM6IDMwfSxcbiAgICAgICAgICAgICAgICB7eTogJzIwMDknLCBhOiA3NSwgYjogNjUsIGM6IDg1fSxcbiAgICAgICAgICAgICAgICB7eTogJzIwMTAnLCBhOiA1MCwgYjogNDAsIGM6IDQ1fSxcbiAgICAgICAgICAgICAgICB7eTogJzIwMTEnLCBhOiA3NSwgYjogNjUsIGM6IDkwfSxcbiAgICAgICAgICAgICAgICB7eTogJzIwMTInLCBhOiAxMDAsIGI6IDkwLCBjOiA4MH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBncmlkVGV4dENvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLFxuICAgICAgICAgICAgZ3JpZFRleHRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgIHJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIHhrZXk6ICd5JyxcbiAgICAgICAgICAgIHlrZXlzOiBbICdhJywgJ2InLCAnYycgXSxcbiAgICAgICAgICAgIGxhYmVsczogWyAnU2VyaWVzIEEnLCAnU2VyaWVzIEInLCAnU2VyaWVzIEMnIF1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm1vcnJpcy1jaGFydC1iYXJcIl0nKS50a01vcnJpc0NoYXJ0QmFyKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJtb3JyaXMtY2hhcnQtYmFyXCJdJykudGtNb3JyaXNDaGFydEJhcigpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtNb3JyaXNDaGFydERvbnV0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCEgdGhpcy5hdHRyKCdpZCcpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG4gICAgICAgIHRoaXMuZW1wdHkoKTtcblxuICAgICAgICBuZXcgTW9ycmlzLkRvbnV0KHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuYXR0cignaWQnKSxcbiAgICAgICAgICAgIGNvbG9yczogWyBjb2xvcnNbICdkYW5nZXItY29sb3InIF0sIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJEb3dubG9hZCBTYWxlc1wiLCB2YWx1ZTogMTJ9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJJbi1TdG9yZSBTYWxlc1wiLCB2YWx1ZTogMzB9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogXCJNYWlsLU9yZGVyIFNhbGVzXCIsIHZhbHVlOiAyMH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWRvbnV0XCJdJykudGtNb3JyaXNDaGFydERvbnV0KCk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJtb3JyaXMtY2hhcnQtZG9udXRcIl0nKS50a01vcnJpc0NoYXJ0RG9udXQoKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJC5mbi50a01vcnJpc0NoYXJ0TGluZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghIHRoaXMuYXR0cignaWQnKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcblxuICAgICAgICB0aGlzLmVtcHR5KCk7XG5cbiAgICAgICAgbmV3IE1vcnJpcy5MaW5lKHtcbiAgICAgICAgICAgIGxpbmVDb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0gXSxcbiAgICAgICAgICAgIHBvaW50RmlsbENvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSBdLFxuICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcnM6IFsgJyNmZmZmZmYnLCAnI2ZmZmZmZicgXSxcbiAgICAgICAgICAgIGdyaWRUZXh0Q29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0sXG4gICAgICAgICAgICBncmlkVGV4dFdlaWdodDogJ2JvbGQnLFxuXG4gICAgICAgICAgICAvLyBJRCBvZiB0aGUgZWxlbWVudCBpbiB3aGljaCB0byBkcmF3IHRoZSBjaGFydC5cbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuYXR0cignaWQnKSxcbiAgICAgICAgICAgIC8vIENoYXJ0IGRhdGEgcmVjb3JkcyAtLSBlYWNoIGVudHJ5IGluIHRoaXMgYXJyYXkgY29ycmVzcG9uZHMgdG8gYSBwb2ludCBvblxuICAgICAgICAgICAgLy8gdGhlIGNoYXJ0LlxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wMicsIGE6IDIwMDAsIGI6IDI0MDB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wMycsIGE6IDEyMDAsIGI6IDI1MDB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNCcsIGE6IDMyMDAsIGI6IDIwMDB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNScsIGE6IDE2MDAsIGI6IDE0NDB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNicsIGE6IDEyOTAsIGI6IDI4MzB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wNycsIGE6IDE5MzAsIGI6IDEyMDB9LFxuICAgICAgICAgICAgICAgIHtkYXRlOiAnMjAxNC0wOCcsIGE6IDIxMjAsIGI6IDMwMDB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gVGhlIG5hbWUgb2YgdGhlIGRhdGEgcmVjb3JkIGF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIHgtdmFsdWVzLlxuICAgICAgICAgICAgeGtleTogJ2RhdGUnLFxuICAgICAgICAgICAgLy8gQSBsaXN0IG9mIG5hbWVzIG9mIGRhdGEgcmVjb3JkIGF0dHJpYnV0ZXMgdGhhdCBjb250YWluIHktdmFsdWVzLlxuICAgICAgICAgICAgeWtleXM6IFsgJ2EnLCAnYicgXSxcbiAgICAgICAgICAgIC8vIExhYmVscyBmb3IgdGhlIHlrZXlzIC0tIHdpbGwgYmUgZGlzcGxheWVkIHdoZW4geW91IGhvdmVyIG92ZXIgdGhlXG4gICAgICAgICAgICAvLyBjaGFydC5cbiAgICAgICAgICAgIGxhYmVsczogWyAnU2VyaWVzIEEnLCAnU2VyaWVzIEInIF0sXG4gICAgICAgICAgICByZXNpemU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWxpbmVcIl0nKS50a01vcnJpc0NoYXJ0TGluZSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWxpbmVcIl0nKS50a01vcnJpc0NoYXJ0TGluZSgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7Il19
