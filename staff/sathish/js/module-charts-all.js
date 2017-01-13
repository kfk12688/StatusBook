(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/charts/js/main.js":[function(require,module,exports){
require('./morris/main');
require('./sparkline/main');
require('./flot/main');
require('./easy-pie/main');

},{"./easy-pie/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/easy-pie/main.js","./flot/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/main.js","./morris/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/main.js","./sparkline/main":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/sparkline/main.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/easy-pie/_easy-pie.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkEasyPie = function () {

        if (! this.length) return;

        if (!$.fn.easyPieChart) return;

        var color = config.skins[ skin ][ 'primary-color' ];
        if (this.is('.info')) color = colors[ 'info-color' ];
        if (this.is('.danger')) color = colors[ 'danger-color' ];
        if (this.is('.success')) color = colors[ 'success-color' ];
        if (this.is('.warning')) color = colors[ 'warning-color' ];
        if (this.is('.inverse')) color = colors[ 'inverse-color' ];

        this.easyPieChart({
            barColor: color,
            animate: ($('html').is('.ie') ? false : 3000),
            lineWidth: 4,
            size: 50
        });

    };

    $.each($('.easy-pie'), function (k, v) {
        $(this).tkEasyPie();
    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/easy-pie/main.js":[function(require,module,exports){
require('./_easy-pie');
},{"./_easy-pie":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/easy-pie/_easy-pie.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_autoupdate.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_live =
    {
        // chart data
        data: [],
        totalPoints: 300,
        updateInterval: 200,

        // we use an inline data source in the example, usually data would
        // be fetched from a server
        getRandomData: function () {
            if (this.data.length > 0)
                this.data = this.data.slice(1);

            // do a random walk
            while (this.data.length < this.totalPoints) {
                var prev = this.data.length > 0 ? this.data[ this.data.length - 1 ] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                this.data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < this.data.length; ++ i)
                res.push([ i, this.data[ i ] ]);
            return res;
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                grow: {active: false},
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                }
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "Value is : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: '#efefef'
            },
            xaxis: {
                show: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, [ this.getRandomData() ], this.options);
            setTimeout(this.update, charts.chart_live.updateInterval);
        },

        // update
        update: function () {
            charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
            charts.chart_live.plot.draw();

            setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLive = function () {

        if (! this.length) return;

        charts.chart_live.init(this);

    };

    $('[data-toggle="flot-chart-live"]').tkFlotChartLive();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_bars-ordered.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_ordered_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            bars: {
                show: true,
                barWidth: 0.2,
                fill: 1
            },
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: false,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false}
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            //some data
            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 30) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 30) ]);

            var ds = [];

            ds.push({
                label: "Data One",
                data: d1,
                bars: {order: 1}
            });
            ds.push({
                label: "Data Two",
                data: d2,
                bars: {order: 2}
            });
            ds.push({
                label: "Data Three",
                data: d3,
                bars: {order: 3}
            });

            this.data = ds;

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartOrderedBars = function () {

        if (! this.length) return;

        charts.chart_ordered_bars.init(this);

    };

    $('[data-toggle="flot-chart-ordered-bars"]').tkFlotChartOrderedBars();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_bars-stacked.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_stacked_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-light-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                autoHighlight: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {active: false},
                stack: 0,
                lines: {show: false, fill: true, steps: false},
                bars: {show: true, barWidth: 0.5, fill: 1}
            },
            yaxis: {
                ticks: 3,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            legend: {
                position: "ne",
                backgroundColor: null,
                backgroundOpacity: 0,
                noColumns: 3
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
                d1.push([ i, parseInt(Math.random() * 30) ]);

            var d2 = [];
            for (var j = 0; j <= 10; j += 1)
                d2.push([ j, parseInt(Math.random() * 20) ]);

            var d3 = [];
            for (var k = 0; k <= 10; k += 1)
                d3.push([ k, parseInt(Math.random() * 20) ]);

            this.data = [];

            this.data.push({
                label: "Data One",
                data: d1
            });
            this.data.push({
                label: "Data Two",
                data: d2
            });
            this.data.push({
                label: "Data Tree",
                data: d3
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartStackedBars = function () {

        if (! this.length) return;

        charts.chart_stacked_bars.init(this);

    };

    $('[data-toggle="flot-chart-stacked-bars"]').tkFlotChartStackedBars();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_donut.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_donut =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.4,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 8
                    },
                    startAngle: 2,
                    combine: {
                        color: '#EEE',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            colors: [],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartDonut = function () {

        if (! this.length) return;

        charts.chart_donut.init(this);

    };

    $('[data-toggle="flot-chart-donut"]').tkFlotChartDonut();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js":[function(require,module,exports){
var skin = require('../lib/_skin')();

var charts =
{
    // utility class
    utility: {
        chartColors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ], colors[ 'danger-color' ], colors[ 'success-color' ], colors[ 'warning-color' ] ],
        chartBackgroundColors: [ "rgba(255,255,255,0)", "rgba(255,255,255,0)" ],

        applyStyle: function (that) {
            that.options.colors = charts.utility.chartColors;
            that.options.grid.backgroundColor = { colors: charts.utility.chartBackgroundColors };
            that.options.grid.borderColor = charts.utility.chartColors[ 0 ];
            that.options.grid.color = charts.utility.chartColors[ 0 ];
        },

        // generate random number for charts
        randNum: function () {
            return (Math.floor(Math.random() * (1 + 40 - 20)) ) + 20;
        }
    }

};

module.exports = charts;
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_horizontal.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_horizontal_bars =
    {
        // chart data
        data: null,

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                bars: {
                    show: true,
                    horizontal: true,
                    barWidth: 0.2,
                    fill: 1
                }
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickColor: 'transparent',
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0
            },
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // apply styling
            // charts.utility.applyStyle(this);

            var d1 = [];
            for (var i = 1; i <= 5; i += 1)
                d1.push([ parseInt(Math.random() * 30), i ]);

            this.data = [];

            this.data.push({
                label: "Sales Volume",
                data: d1,
                bars: {
                    horizontal: true,
                    show: true,
                    barWidth: 0.5
                }
            });

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartHorizontalBars = function () {

        if (! this.length) return;

        charts.chart_horizontal_bars.init(this);

    };

    $('[data-toggle="flot-chart-horizontal-bars"]').tkFlotChartHorizontalBars();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_3 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [  colors[ 'success-color' ]],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (!wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines3 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_3.init(this);

    };

    $('[data-toggle="flot-chart-lines-3"]').tkFlotChartLines3();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line_fill_nopoints.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints =
    {
        // chart data
        data: {
            d1: [],
            d2: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            grid: {
                show: true,
                aboveData: false,
                color: colors[ 'default-color' ],
                labelMargin: 5,
                axisMargin: 0,
                borderWidth: 0,
                borderColor: null,
                minBorderMargin: 5,
                clickable: true,
                hoverable: true,
                mouseActiveRadius: 20,
                backgroundColor: {}
            },
            series: {
                grow: {
                    active: false
                },
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 2,
                    steps: false
                },
                points: {
                    show: false
                }
            },
            legend: {
                position: "nw",
                noColumns: 2
            },
            yaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: '#efefef'
            },
            xaxis: {
                ticks: 11,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            colors: [],
            shadowSize: 1,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 9 + charts.utility.randNum() ], [ 4, 12 + charts.utility.randNum() ], [ 5, 15 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 21 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 21 + charts.utility.randNum() ], [ 11, 24 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 27 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 45 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 38 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 60 + charts.utility.randNum() ] ];
            this.data.d2 = [ [ 1, charts.utility.randNum() - 5 ], [ 2, charts.utility.randNum() - 4 ], [ 3, charts.utility.randNum() - 4 ], [ 4, charts.utility.randNum() ], [ 5, 4 + charts.utility.randNum() ], [ 6, 4 + charts.utility.randNum() ], [ 7, 5 + charts.utility.randNum() ], [ 8, 5 + charts.utility.randNum() ], [ 9, 6 + charts.utility.randNum() ], [ 10, 6 + charts.utility.randNum() ], [ 11, 6 + charts.utility.randNum() ], [ 12, 2 + charts.utility.randNum() ], [ 13, 3 + charts.utility.randNum() ], [ 14, 4 + charts.utility.randNum() ], [ 15, 4 + charts.utility.randNum() ], [ 16, 4 + charts.utility.randNum() ], [ 17, 5 + charts.utility.randNum() ], [ 18, 5 + charts.utility.randNum() ], [ 19, 2 + charts.utility.randNum() ], [ 20, 2 + charts.utility.randNum() ], [ 21, 3 + charts.utility.randNum() ], [ 22, 3 + charts.utility.randNum() ], [ 23, 3 + charts.utility.randNum() ], [ 24, 2 + charts.utility.randNum() ], [ 25, 4 + charts.utility.randNum() ], [ 26, 4 + charts.utility.randNum() ], [ 27, 5 + charts.utility.randNum() ], [ 28, 2 + charts.utility.randNum() ], [ 29, 2 + charts.utility.randNum() ], [ 30, 3 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Visits",
                    data: this.data.d1
                },
                {
                    label: "Unique Visits",
                    data: this.data.d2
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines1 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints.init(this);

    };

    $('[data-toggle="flot-chart-lines-1"]').tkFlotChartLines1();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line_fill_nopoints_2.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_lines_fill_nopoints_2 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 5,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {
                ticks: 4,
                tickDecimals: 0,
                tickColor: 'transparent'
            },
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ], [ 14, 33 + charts.utility.randNum() ], [ 15, 24 + charts.utility.randNum() ], [ 16, 80 + charts.utility.randNum() ], [ 17, 30 + charts.utility.randNum() ], [ 18, 33 + charts.utility.randNum() ], [ 19, 36 + charts.utility.randNum() ], [ 20, 39 + charts.utility.randNum() ], [ 21, 42 + charts.utility.randNum() ], [ 22, 70 + charts.utility.randNum() ], [ 23, 36 + charts.utility.randNum() ], [ 24, 39 + charts.utility.randNum() ], [ 25, 42 + charts.utility.randNum() ], [ 26, 45 + charts.utility.randNum() ], [ 27, 60 + charts.utility.randNum() ], [ 28, 51 + charts.utility.randNum() ], [ 29, 55 + charts.utility.randNum() ], [ 30, 100 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartLines2 = function () {

        if (! this.length) return;

        charts.chart_lines_fill_nopoints_2.init(this);

    };

    $('[data-toggle="flot-chart-lines-2"]').tkFlotChartLines2();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_mixed.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_mixed_1 =
    {
        // chart data
        data: {
            d1: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ "#dedede", config.skins[ skin ][ 'primary-color' ] ],
            grid: {
                color: "#dedede",
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 2,
                    steps: false,
                    color: config.skins[ skin ][ 'primary-color' ]
                },
                points: {show: false}
            },
            legend: {position: "nw", backgroundColor: null, backgroundOpacity: 0},
            yaxis: {
                ticks: 3,
                tickSize: 40,
                tickFormatter: function (val, axis) {
                    return val + "k";
                }
            },
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            shadowSize: 0,
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.0",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // generate some data
            this.data.d1 = [ [ 1, 3 + charts.utility.randNum() ], [ 2, 6 + charts.utility.randNum() ], [ 3, 30 + charts.utility.randNum() ], [ 4, 110 + charts.utility.randNum() ], [ 5, 80 + charts.utility.randNum() ], [ 6, 18 + charts.utility.randNum() ], [ 7, 50 + charts.utility.randNum() ], [ 8, 15 + charts.utility.randNum() ], [ 9, 18 + charts.utility.randNum() ], [ 10, 60 + charts.utility.randNum() ], [ 11, 110 + charts.utility.randNum() ], [ 12, 27 + charts.utility.randNum() ], [ 13, 30 + charts.utility.randNum() ] ];

            // make chart
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Net Revenue",
                    data: this.data.d1,
                    bars: {show: true, fill: 1, barWidth: 0.75, align: "center"}
                },
                {
                    data: this.data.d1,
                    lines: {show: true, fill: false},
                    points: {
                        show: true,
                        radius: 5,
                        symbol: "circle",
                        fill: true,
                        fillColor: config.skins[ skin ][ 'primary-color' ],
                        borderColor: "#fff"
                    }
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartMixed = function () {

        if (! this.length) return;

        charts.chart_mixed_1.init(this);

    };

    $('[data-toggle="flot-chart-mixed"]').tkFlotChartMixed();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_pie.js":[function(require,module,exports){
(function ($) {

    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_pie =
    {
        // chart data
        data: [
            {label: "USA", data: 38},
            {label: "Brazil", data: 23},
            {label: "India", data: 15},
            {label: "Turkey", data: 9},
            {label: "France", data: 7},
            {label: "China", data: 5},
            {label: "Germany", data: 3}
        ],

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            series: {
                pie: {
                    show: true,
                    highlight: {
                        opacity: 0.1
                    },
                    radius: 1,
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2,
                    combine: {
                        color: '#353535',
                        threshold: 0.05
                    },
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function (label, series) {
                            return '<div class="label label-default">' + label + '&nbsp;' + Math.round(series.percent) + '%</div>';
                        }
                    }
                },
                grow: {active: false}
            },
            colors: [],
            legend: {show: false},
            grid: {
                hoverable: true,
                clickable: true,
                backgroundColor: {}
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y.1" + "%",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            // apply styling
            charts.utility.applyStyle(this);

            this.plot = $.plot(wrapper, this.data, this.options);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartPie = function () {

        if (! this.length) return;

        charts.chart_pie.init(this);

    };

    $('[data-toggle="flot-chart-pie"]').tkFlotChartPie();

})(jQuery);
},{"./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_simple.js":[function(require,module,exports){
(function ($) {

    var skin = require('../lib/_skin')();
    var charts = require('./_helper');

    if (typeof charts == 'undefined')
        return;

    charts.chart_simple =
    {
        // data
        data: {
            sin: [],
            cos: []
        },

        // will hold the chart object
        plot: null,

        // chart options
        options: {
            colors: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-color' ] ],
            grid: {
                color: colors[ 'default-light-color' ],
                borderWidth: 1,
                borderColor: "transparent",
                clickable: true,
                hoverable: true
            },
            series: {
                grow: {active: false},
                lines: {
                    show: true,
                    fill: false,
                    lineWidth: 4,
                    steps: false
                },
                points: {
                    show: true,
                    radius: 5,
                    symbol: "circle",
                    fill: true,
                    borderColor: "#fff"
                }
            },
            legend: {position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 2},
            shadowSize: 0,
            yaxis: {ticks: 3},
            xaxis: {ticks: 4, tickDecimals: 0, tickColor: 'transparent'},
            tooltip: true, //activate tooltip
            tooltipOpts: {
                content: "%s : %y.3",
                shifts: {
                    x: - 30,
                    y: - 50
                },
                defaultTheme: false
            }
        },

        // initialize
        init: function (wrapper) {

            if (! wrapper.length) return;

            if (this.plot === null) {
                for (var i = 0; i < 14; i += 0.5) {
                    this.data.sin.push([ i, Math.sin(i) ]);
                    this.data.cos.push([ i, Math.cos(i) ]);
                }
            }
            this.plot = $.plot(
                wrapper,
                [ {
                    label: "Sin",
                    data: this.data.sin,
                    lines: {fillColor: colors[ 'default-color' ]},
                    points: {fillColor: "#fff"}
                },
                {
                    label: "Cos",
                    data: this.data.cos,
                    lines: {fillColor: "#444"},
                    points: {fillColor: "#fff"}
                } ],
                this.options
            );
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFlotChartSimple = function () {

        if (! this.length) return;

        charts.chart_simple.init(this);

    };

    $('[data-toggle="flot-chart-simple"]').tkFlotChartSimple();

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js","./_helper":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_helper.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/main.js":[function(require,module,exports){
require('./_simple');
require('./_mixed');
require('./_line');
require('./_horizontal');
require('./_line_fill_nopoints');
require('./_line_fill_nopoints_2');
require('./_bars-ordered');
require('./_donut');
require('./_bars-stacked');
require('./_pie');
require('./_autoupdate');
},{"./_autoupdate":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_autoupdate.js","./_bars-ordered":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_bars-ordered.js","./_bars-stacked":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_bars-stacked.js","./_donut":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_donut.js","./_horizontal":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_horizontal.js","./_line":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line.js","./_line_fill_nopoints":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line_fill_nopoints.js","./_line_fill_nopoints_2":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_line_fill_nopoints_2.js","./_mixed":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_mixed.js","./_pie":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_pie.js","./_simple":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/flot/_simple.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js":[function(require,module,exports){
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
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/main.js":[function(require,module,exports){
require('./_area');
require('./_bar');
require('./_donut');
require('./_line');
},{"./_area":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_area.js","./_bar":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_bar.js","./_donut":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_donut.js","./_line":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/morris/_line.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/sparkline/_sparkline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('../lib/_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSparkLine = function () {

        if (! this.length) return;

        this.sparkline(
            this.data('data') || "html", {
                type: 'line',
                height: '24',
                width: '100%',
                spotRadius: '3.2',
                spotColor: config.skins[ skin ][ 'primary-color' ],
                minSpotColor: config.skins[ skin ][ 'primary-color' ],
                maxSpotColor: config.skins[ skin ][ 'primary-color' ],
                highlightSpotColor: colors[ 'danger-color' ],
                lineWidth: '2',
                lineColor: config.skins[ skin ][ 'primary-color' ],
                fillColor: colors[ 'body-bg' ]
            }
        );

    };

    $.fn.tkSparkBar = function () {

        if (! this.length) return;

        this.text(this.find('span').text());

        this.sparkline(
            this.data('data') || "html", {
                type: 'bar',
                height: '70',
                barWidth: 10,
                barSpacing: 8,
                zeroAxis: false,
                stackedBarColor: [ config.skins[ skin ][ 'primary-color' ], colors[ 'default-light-color' ] ],
                colorMap: this.data('colors') ? [ config.skins[ skin ][ 'primary-color' ], colors[ 'success-color' ], colors[ 'danger-color' ], colors[ 'default-light-color' ] ] : [],
                enableTagOptions: true
            }
        );

    };

    $(".sparkline-bar").each(function () {
        $(this).tkSparkBar();
    });

    $(".sparkline-line").each(function () {
        $(this).tkSparkLine();
    });

})(jQuery);
},{"../lib/_skin":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/lib/_skin.js"}],"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/sparkline/main.js":[function(require,module,exports){
require('./_sparkline');

},{"./_sparkline":"/persistent/var/www/html/themekit-3.6.2/dev/app/vendor/charts/js/sparkline/_sparkline.js"}]},{},["./app/vendor/charts/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZWFzeS1waWUvX2Vhc3ktcGllLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZWFzeS1waWUvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2F1dG91cGRhdGUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19iYXJzLW9yZGVyZWQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19iYXJzLXN0YWNrZWQuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2hlbHBlci5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX2hvcml6b250YWwuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19saW5lLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbGluZV9maWxsX25vcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvZmxvdC9fbGluZV9maWxsX25vcG9pbnRzXzIuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9mbG90L19taXhlZC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX3BpZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvX3NpbXBsZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2Zsb3QvbWFpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL2xpYi9fc2tpbi5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYXJlYS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fYmFyLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvbW9ycmlzL19kb251dC5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9fbGluZS5qcyIsImFwcC92ZW5kb3IvY2hhcnRzL2pzL21vcnJpcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9jaGFydHMvanMvc3BhcmtsaW5lL19zcGFya2xpbmUuanMiLCJhcHAvdmVuZG9yL2NoYXJ0cy9qcy9zcGFya2xpbmUvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL21vcnJpcy9tYWluJyk7XG5yZXF1aXJlKCcuL3NwYXJrbGluZS9tYWluJyk7XG5yZXF1aXJlKCcuL2Zsb3QvbWFpbicpO1xucmVxdWlyZSgnLi9lYXN5LXBpZS9tYWluJyk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtFYXN5UGllID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCEkLmZuLmVhc3lQaWVDaGFydCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXTtcbiAgICAgICAgaWYgKHRoaXMuaXMoJy5pbmZvJykpIGNvbG9yID0gY29sb3JzWyAnaW5mby1jb2xvcicgXTtcbiAgICAgICAgaWYgKHRoaXMuaXMoJy5kYW5nZXInKSkgY29sb3IgPSBjb2xvcnNbICdkYW5nZXItY29sb3InIF07XG4gICAgICAgIGlmICh0aGlzLmlzKCcuc3VjY2VzcycpKSBjb2xvciA9IGNvbG9yc1sgJ3N1Y2Nlc3MtY29sb3InIF07XG4gICAgICAgIGlmICh0aGlzLmlzKCcud2FybmluZycpKSBjb2xvciA9IGNvbG9yc1sgJ3dhcm5pbmctY29sb3InIF07XG4gICAgICAgIGlmICh0aGlzLmlzKCcuaW52ZXJzZScpKSBjb2xvciA9IGNvbG9yc1sgJ2ludmVyc2UtY29sb3InIF07XG5cbiAgICAgICAgdGhpcy5lYXN5UGllQ2hhcnQoe1xuICAgICAgICAgICAgYmFyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgYW5pbWF0ZTogKCQoJ2h0bWwnKS5pcygnLmllJykgPyBmYWxzZSA6IDMwMDApLFxuICAgICAgICAgICAgbGluZVdpZHRoOiA0LFxuICAgICAgICAgICAgc2l6ZTogNTBcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJC5lYWNoKCQoJy5lYXN5LXBpZScpLCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICAkKHRoaXMpLnRrRWFzeVBpZSgpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2Vhc3ktcGllJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpdmUgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgdG90YWxQb2ludHM6IDMwMCxcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWw6IDIwMCxcblxuICAgICAgICAvLyB3ZSB1c2UgYW4gaW5saW5lIGRhdGEgc291cmNlIGluIHRoZSBleGFtcGxlLCB1c3VhbGx5IGRhdGEgd291bGRcbiAgICAgICAgLy8gYmUgZmV0Y2hlZCBmcm9tIGEgc2VydmVyXG4gICAgICAgIGdldFJhbmRvbURhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoMSk7XG5cbiAgICAgICAgICAgIC8vIGRvIGEgcmFuZG9tIHdhbGtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmRhdGEubGVuZ3RoIDwgdGhpcy50b3RhbFBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmRhdGFbIHRoaXMuZGF0YS5sZW5ndGggLSAxIF0gOiA1MDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHByZXYgKyBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICAgICAgICAgICAgICAgIGlmICh5IDwgMClcbiAgICAgICAgICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHkgPiAxMDApXG4gICAgICAgICAgICAgICAgICAgIHkgPSAxMDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHppcCB0aGUgZ2VuZXJhdGVkIHkgdmFsdWVzIHdpdGggdGhlIHggdmFsdWVzXG4gICAgICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7ICsrIGkpXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goWyBpLCB0aGlzLmRhdGFbIGkgXSBdKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFib3ZlRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0sXG4gICAgICAgICAgICAgICAgbGFiZWxNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgYXhpc01hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5Cb3JkZXJNYXJnaW46IDUsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvSGlnaGxpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb3VzZUFjdGl2ZVJhZGl1czogMjAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogW10sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlZhbHVlIGlzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VmZWZlZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod3JhcHBlcikge1xuXG4gICAgICAgICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCh3cmFwcGVyLCBbIHRoaXMuZ2V0UmFuZG9tRGF0YSgpIF0sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlLCBjaGFydHMuY2hhcnRfbGl2ZS51cGRhdGVJbnRlcnZhbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gdXBkYXRlXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhcnRzLmNoYXJ0X2xpdmUucGxvdC5zZXREYXRhKFsgY2hhcnRzLmNoYXJ0X2xpdmUuZ2V0UmFuZG9tRGF0YSgpIF0pO1xuICAgICAgICAgICAgY2hhcnRzLmNoYXJ0X2xpdmUucGxvdC5kcmF3KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2hhcnRzLmNoYXJ0X2xpdmUudXBkYXRlLCBjaGFydHMuY2hhcnRfbGl2ZS51cGRhdGVJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Zsb3RDaGFydExpdmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjaGFydHMuY2hhcnRfbGl2ZS5pbml0KHRoaXMpO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImZsb3QtY2hhcnQtbGl2ZVwiXScpLnRrRmxvdENoYXJ0TGl2ZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9vcmRlcmVkX2JhcnMgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiBudWxsLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYXJXaWR0aDogMC4yLFxuICAgICAgICAgICAgICAgIGZpbGw6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhYm92ZURhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGxhYmVsTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGF4aXNNYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgbWluQm9yZGVyTWFyZ2luOiA1LFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXV0b0hpZ2hsaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJuZVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICBub0NvbHVtbnM6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZmVmZWYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogNCxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3cmFwcGVyKSB7XG5cbiAgICAgICAgICAgIGlmICghIHdyYXBwZXIubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxpbmdcbiAgICAgICAgICAgIGNoYXJ0cy51dGlsaXR5LmFwcGx5U3R5bGUodGhpcyk7XG5cbiAgICAgICAgICAgIC8vc29tZSBkYXRhXG4gICAgICAgICAgICB2YXIgZDEgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDEwOyBpICs9IDEpXG4gICAgICAgICAgICAgICAgZDEucHVzaChbIGksIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkMiA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gMTA7IGogKz0gMSlcbiAgICAgICAgICAgICAgICBkMi5wdXNoKFsgaiwgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDMwKSBdKTtcblxuICAgICAgICAgICAgdmFyIGQzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8PSAxMDsgayArPSAxKVxuICAgICAgICAgICAgICAgIGQzLnB1c2goWyBrLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApIF0pO1xuXG4gICAgICAgICAgICB2YXIgZHMgPSBbXTtcblxuICAgICAgICAgICAgZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0YSBPbmVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkMSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7b3JkZXI6IDF9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGEgVHdvXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDIsXG4gICAgICAgICAgICAgICAgYmFyczoge29yZGVyOiAyfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFRocmVlXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDMsXG4gICAgICAgICAgICAgICAgYmFyczoge29yZGVyOiAzfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRzO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3Qod3JhcHBlciwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGbG90Q2hhcnRPcmRlcmVkQmFycyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGNoYXJ0cy5jaGFydF9vcmRlcmVkX2JhcnMuaW5pdCh0aGlzKTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJmbG90LWNoYXJ0LW9yZGVyZWQtYmFyc1wiXScpLnRrRmxvdENoYXJ0T3JkZXJlZEJhcnMoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfc3RhY2tlZF9iYXJzID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogbnVsbCxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgYWJvdmVEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1saWdodC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBsYWJlbE1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBheGlzTWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIG1pbkJvcmRlck1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGF1dG9IaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2VBY3RpdmVSYWRpdXM6IDIwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgc3RhY2s6IDAsXG4gICAgICAgICAgICAgICAgbGluZXM6IHtzaG93OiBmYWxzZSwgZmlsbDogdHJ1ZSwgc3RlcHM6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7c2hvdzogdHJ1ZSwgYmFyV2lkdGg6IDAuNSwgZmlsbDogMX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZmVmZWYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMTEsXG4gICAgICAgICAgICAgICAgdGlja0RlY2ltYWxzOiAwLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIm5lXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIG5vQ29sdW1uczogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogW10sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAxLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdyYXBwZXIpIHtcblxuICAgICAgICAgICAgaWYgKCEgd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGQxID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAxMDsgaSArPSAxKVxuICAgICAgICAgICAgICAgIGQxLnB1c2goWyBpLCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMzApIF0pO1xuXG4gICAgICAgICAgICB2YXIgZDIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IDEwOyBqICs9IDEpXG4gICAgICAgICAgICAgICAgZDIucHVzaChbIGosIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAyMCkgXSk7XG5cbiAgICAgICAgICAgIHZhciBkMyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPD0gMTA7IGsgKz0gMSlcbiAgICAgICAgICAgICAgICBkMy5wdXNoKFsgaywgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIwKSBdKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIE9uZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFR3b1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGQyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRhIFRyZWVcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkM1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCh3cmFwcGVyLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Zsb3RDaGFydFN0YWNrZWRCYXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgY2hhcnRzLmNoYXJ0X3N0YWNrZWRfYmFycy5pbml0KHRoaXMpO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImZsb3QtY2hhcnQtc3RhY2tlZC1iYXJzXCJdJykudGtGbG90Q2hhcnRTdGFja2VkQmFycygpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9kb251dCA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtsYWJlbDogXCJVU0FcIiwgZGF0YTogMzh9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkJyYXppbFwiLCBkYXRhOiAyM30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiSW5kaWFcIiwgZGF0YTogMTV9LFxuICAgICAgICAgICAge2xhYmVsOiBcIlR1cmtleVwiLCBkYXRhOiA5fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJGcmFuY2VcIiwgZGF0YTogN30sXG4gICAgICAgICAgICB7bGFiZWw6IFwiQ2hpbmFcIiwgZGF0YTogNX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiR2VybWFueVwiLCBkYXRhOiAzfVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBwaWU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSYWRpdXM6IDAuNCxcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogOFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGFydEFuZ2xlOiAyLFxuICAgICAgICAgICAgICAgICAgICBjb21iaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNFRUUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiAwLjA1XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAobGFiZWwsIHNlcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHRcIj4nICsgbGFiZWwgKyAnJm5ic3A7JyArIE1hdGgucm91bmQoc2VyaWVzLnBlcmNlbnQpICsgJyU8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtzaG93OiBmYWxzZX0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4xXCIgKyBcIiVcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdyYXBwZXIpIHtcblxuICAgICAgICAgICAgaWYgKCEgd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KHdyYXBwZXIsIHRoaXMuZGF0YSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrRmxvdENoYXJ0RG9udXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjaGFydHMuY2hhcnRfZG9udXQuaW5pdCh0aGlzKTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJmbG90LWNoYXJ0LWRvbnV0XCJdJykudGtGbG90Q2hhcnREb251dCgpO1xuXG59KShqUXVlcnkpOyIsInZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcblxudmFyIGNoYXJ0cyA9XG57XG4gICAgLy8gdXRpbGl0eSBjbGFzc1xuICAgIHV0aWxpdHk6IHtcbiAgICAgICAgY2hhcnRDb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0sIGNvbG9yc1sgJ3N1Y2Nlc3MtY29sb3InIF0sIGNvbG9yc1sgJ3dhcm5pbmctY29sb3InIF0gXSxcbiAgICAgICAgY2hhcnRCYWNrZ3JvdW5kQ29sb3JzOiBbIFwicmdiYSgyNTUsMjU1LDI1NSwwKVwiLCBcInJnYmEoMjU1LDI1NSwyNTUsMClcIiBdLFxuXG4gICAgICAgIGFwcGx5U3R5bGU6IGZ1bmN0aW9uICh0aGF0KSB7XG4gICAgICAgICAgICB0aGF0Lm9wdGlvbnMuY29sb3JzID0gY2hhcnRzLnV0aWxpdHkuY2hhcnRDb2xvcnM7XG4gICAgICAgICAgICB0aGF0Lm9wdGlvbnMuZ3JpZC5iYWNrZ3JvdW5kQ29sb3IgPSB7IGNvbG9yczogY2hhcnRzLnV0aWxpdHkuY2hhcnRCYWNrZ3JvdW5kQ29sb3JzIH07XG4gICAgICAgICAgICB0aGF0Lm9wdGlvbnMuZ3JpZC5ib3JkZXJDb2xvciA9IGNoYXJ0cy51dGlsaXR5LmNoYXJ0Q29sb3JzWyAwIF07XG4gICAgICAgICAgICB0aGF0Lm9wdGlvbnMuZ3JpZC5jb2xvciA9IGNoYXJ0cy51dGlsaXR5LmNoYXJ0Q29sb3JzWyAwIF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgcmFuZG9tIG51bWJlciBmb3IgY2hhcnRzXG4gICAgICAgIHJhbmROdW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyA0MCAtIDIwKSkgKSArIDIwO1xuICAgICAgICB9XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJ0czsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2hvcml6b250YWxfYmFycyA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IG51bGwsXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjZGVkZWRlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYmFyV2lkdGg6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJud1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiA0LFxuICAgICAgICAgICAgICAgIHRpY2tEZWNpbWFsczogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0gXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3cmFwcGVyKSB7XG5cbiAgICAgICAgICAgIGlmICghd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGluZ1xuICAgICAgICAgICAgLy8gY2hhcnRzLnV0aWxpdHkuYXBwbHlTdHlsZSh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGQxID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA1OyBpICs9IDEpXG4gICAgICAgICAgICAgICAgZDEucHVzaChbIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAzMCksIGkgXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiU2FsZXMgVm9sdW1lXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZDEsXG4gICAgICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiYXJXaWR0aDogMC41XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdCh3cmFwcGVyLCB0aGlzLmRhdGEsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Zsb3RDaGFydEhvcml6b250YWxCYXJzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgY2hhcnRzLmNoYXJ0X2hvcml6b250YWxfYmFycy5pbml0KHRoaXMpO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImZsb3QtY2hhcnQtaG9yaXpvbnRhbC1iYXJzXCJdJykudGtGbG90Q2hhcnRIb3Jpem9udGFsQmFycygpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18zID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZDE6IFtdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yczogWyAgY29sb3JzWyAnc3VjY2Vzcy1jb2xvcicgXV0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtbGlnaHQtY29sb3InIF0sXG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge2FjdGl2ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9pbnRzOiB7c2hvdzogZmFsc2V9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7cG9zaXRpb246IFwibndcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBiYWNrZ3JvdW5kT3BhY2l0eTogMH0sXG4gICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAzLFxuICAgICAgICAgICAgICAgIHRpY2tTaXplOiA0MCxcbiAgICAgICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsLCBheGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgKyBcImtcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGF4aXM6IHt0aWNrczogNCwgdGlja0RlY2ltYWxzOiAwLCB0aWNrQ29sb3I6ICd0cmFuc3BhcmVudCd9LFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwT3B0czoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiJXMgOiAleS4wXCIsXG4gICAgICAgICAgICAgICAgc2hpZnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0gMzAsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0gNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUaGVtZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBpbml0aWFsaXplXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3cmFwcGVyKSB7XG5cbiAgICAgICAgICAgIGlmICghd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc29tZSBkYXRhXG4gICAgICAgICAgICB0aGlzLmRhdGEuZDEgPSBbIFsgMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDQsIDExMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCA1MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTQsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTUsIDI0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTYsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTcsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTgsIDMzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTksIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjAsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjEsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjIsIDcwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjMsIDM2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjQsIDM5ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjUsIDQyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjYsIDQ1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjcsIDYwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjgsIDUxICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjksIDU1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMzAsIDEwMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdIF07XG5cbiAgICAgICAgICAgIC8vIG1ha2UgY2hhcnRcbiAgICAgICAgICAgIHRoaXMucGxvdCA9ICQucGxvdChcbiAgICAgICAgICAgICAgICB3cmFwcGVyLFxuICAgICAgICAgICAgICAgIFsge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXQgUmV2ZW51ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDFcbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGbG90Q2hhcnRMaW5lczMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50c18zLmluaXQodGhpcyk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZmxvdC1jaGFydC1saW5lcy0zXCJdJykudGtGbG90Q2hhcnRMaW5lczMoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBza2luID0gcmVxdWlyZSgnLi4vbGliL19za2luJykoKTtcbiAgICB2YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9faGVscGVyJyk7XG5cbiAgICBpZiAodHlwZW9mIGNoYXJ0cyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY2hhcnRzLmNoYXJ0X2xpbmVzX2ZpbGxfbm9wb2ludHMgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW10sXG4gICAgICAgICAgICBkMjogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgYWJvdmVEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBsYWJlbE1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBheGlzTWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIG1pbkJvcmRlck1hcmdpbjogNSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlQWN0aXZlUmFkaXVzOiAyMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgZ3Jvdzoge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIm53XCIsXG4gICAgICAgICAgICAgICAgbm9Db2x1bW5zOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogNCxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VmZWZlZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgIHRpY2tzOiAxMSxcbiAgICAgICAgICAgICAgICB0aWNrRGVjaW1hbHM6IDAsXG4gICAgICAgICAgICAgICAgdGlja0NvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JzOiBbXSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDEsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod3JhcHBlcikge1xuXG4gICAgICAgICAgICBpZiAoISB3cmFwcGVyLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSBzb21lIGRhdGFcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMSA9IFsgWyAxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMiwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMsIDkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA0LCAxMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCAyMSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgMjEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgMjQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNSwgMjQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOSwgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMiwgNDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMywgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNiwgNDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNywgMzggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOCwgNTEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOSwgNTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzMCwgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSBdO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmQyID0gWyBbIDEsIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSAtIDUgXSwgWyAyLCBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgLSA0IF0sIFsgMywgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIC0gNCBdLCBbIDQsIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNywgNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCA2ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTAsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEyLCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNCwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE1LCA0ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTYsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNywgNSArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDE4LCA1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTksIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMCwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjIsIDMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMywgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI0LCAyICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjUsIDQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNiwgNCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDI3LCA1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMjgsIDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOSwgMiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMwLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcblxuICAgICAgICAgICAgLy8gbWFrZSBjaGFydFxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZpc2l0c1wiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVW5pcXVlIFZpc2l0c1wiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEuZDJcbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGbG90Q2hhcnRMaW5lczEgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjaGFydHMuY2hhcnRfbGluZXNfZmlsbF9ub3BvaW50cy5pbml0KHRoaXMpO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImZsb3QtY2hhcnQtbGluZXMtMVwiXScpLnRrRmxvdENoYXJ0TGluZXMxKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG4gICAgdmFyIGNoYXJ0cyA9IHJlcXVpcmUoJy4vX2hlbHBlcicpO1xuXG4gICAgaWYgKHR5cGVvZiBjaGFydHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIgPVxuICAgIHtcbiAgICAgICAgLy8gY2hhcnQgZGF0YVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkMTogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiA1LFxuICAgICAgICAgICAgICAgICAgICBzdGVwczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge3Nob3c6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcIm53XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDB9LFxuICAgICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgICAgICB0aWNrczogMyxcbiAgICAgICAgICAgICAgICB0aWNrU2l6ZTogNDAsXG4gICAgICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHZhbCwgYXhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICsgXCJrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDQsXG4gICAgICAgICAgICAgICAgdGlja0RlY2ltYWxzOiAwLFxuICAgICAgICAgICAgICAgIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcE9wdHM6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIiVzIDogJXkuMFwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod3JhcHBlcikge1xuXG4gICAgICAgICAgICBpZiAoISB3cmFwcGVyLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBnZW5lcmF0ZSBzb21lIGRhdGFcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kMSA9IFsgWyAxLCAzICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMiwgNiArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNCwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNSwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA2LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDcsIDUwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOCwgMTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA5LCAxOCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDEwLCA2MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDExLCAxMTAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMiwgMjcgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNSwgMjQgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNiwgODAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxNywgMzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOCwgMzMgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxOSwgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMiwgNzAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyMywgMzYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNCwgMzkgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNSwgNDIgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNiwgNDUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyNywgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOCwgNTEgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAyOSwgNTUgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzMCwgMTAwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcblxuICAgICAgICAgICAgLy8gbWFrZSBjaGFydFxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5ldCBSZXZlbnVlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMVxuICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Zsb3RDaGFydExpbmVzMiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGNoYXJ0cy5jaGFydF9saW5lc19maWxsX25vcG9pbnRzXzIuaW5pdCh0aGlzKTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJmbG90LWNoYXJ0LWxpbmVzLTJcIl0nKS50a0Zsb3RDaGFydExpbmVzMigpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfbWl4ZWRfMSA9XG4gICAge1xuICAgICAgICAvLyBjaGFydCBkYXRhXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGQxOiBbXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgY2hhcnQgb2JqZWN0XG4gICAgICAgIHBsb3Q6IG51bGwsXG5cbiAgICAgICAgLy8gY2hhcnQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcnM6IFsgXCIjZGVkZWRlXCIsIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNkZWRlZGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICBncm93OiB7YWN0aXZlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtzaG93OiBmYWxzZX1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtwb3NpdGlvbjogXCJud1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJhY2tncm91bmRPcGFjaXR5OiAwfSxcbiAgICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICAgICAgdGlja3M6IDMsXG4gICAgICAgICAgICAgICAgdGlja1NpemU6IDQwLFxuICAgICAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWwsIGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCArIFwia1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4YXhpczoge3RpY2tzOiA0LCB0aWNrRGVjaW1hbHM6IDAsIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J30sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjBcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdyYXBwZXIpIHtcblxuICAgICAgICAgICAgaWYgKCEgd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc29tZSBkYXRhXG4gICAgICAgICAgICB0aGlzLmRhdGEuZDEgPSBbIFsgMSwgMyArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDIsIDYgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAzLCAzMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDQsIDExMCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDUsIDgwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgNiwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyA3LCA1MCArIGNoYXJ0cy51dGlsaXR5LnJhbmROdW0oKSBdLCBbIDgsIDE1ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgOSwgMTggKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMCwgNjAgKyBjaGFydHMudXRpbGl0eS5yYW5kTnVtKCkgXSwgWyAxMSwgMTEwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTIsIDI3ICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0sIFsgMTMsIDMwICsgY2hhcnRzLnV0aWxpdHkucmFuZE51bSgpIF0gXTtcblxuICAgICAgICAgICAgLy8gbWFrZSBjaGFydFxuICAgICAgICAgICAgdGhpcy5wbG90ID0gJC5wbG90KFxuICAgICAgICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgICAgICAgICAgWyB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5ldCBSZXZlbnVlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5kMSxcbiAgICAgICAgICAgICAgICAgICAgYmFyczoge3Nob3c6IHRydWUsIGZpbGw6IDEsIGJhcldpZHRoOiAwLjc1LCBhbGlnbjogXCJjZW50ZXJcIn1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmQxLFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge3Nob3c6IHRydWUsIGZpbGw6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBcImNpcmNsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwiI2ZmZlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGbG90Q2hhcnRNaXhlZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGNoYXJ0cy5jaGFydF9taXhlZF8xLmluaXQodGhpcyk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZmxvdC1jaGFydC1taXhlZFwiXScpLnRrRmxvdENoYXJ0TWl4ZWQoKTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfcGllID1cbiAgICB7XG4gICAgICAgIC8vIGNoYXJ0IGRhdGFcbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAge2xhYmVsOiBcIlVTQVwiLCBkYXRhOiAzOH0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiQnJhemlsXCIsIGRhdGE6IDIzfSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJJbmRpYVwiLCBkYXRhOiAxNX0sXG4gICAgICAgICAgICB7bGFiZWw6IFwiVHVya2V5XCIsIGRhdGE6IDl9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkZyYW5jZVwiLCBkYXRhOiA3fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJDaGluYVwiLCBkYXRhOiA1fSxcbiAgICAgICAgICAgIHtsYWJlbDogXCJHZXJtYW55XCIsIGRhdGE6IDN9XG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gd2lsbCBob2xkIHRoZSBjaGFydCBvYmplY3RcbiAgICAgICAgcGxvdDogbnVsbCxcblxuICAgICAgICAvLyBjaGFydCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIHBpZToge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDEsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0QW5nbGU6IDIsXG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzM1MzUzNScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDAuMDVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIChsYWJlbCwgc2VyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwibGFiZWwgbGFiZWwtZGVmYXVsdFwiPicgKyBsYWJlbCArICcmbmJzcDsnICsgTWF0aC5yb3VuZChzZXJpZXMucGVyY2VudCkgKyAnJTwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yczogW10sXG4gICAgICAgICAgICBsZWdlbmQ6IHtzaG93OiBmYWxzZX0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjFcIiArIFwiJVwiLFxuICAgICAgICAgICAgICAgIHNoaWZ0czoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtIDMwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtIDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGhlbWU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod3JhcHBlcikge1xuXG4gICAgICAgICAgICBpZiAoISB3cmFwcGVyLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsaW5nXG4gICAgICAgICAgICBjaGFydHMudXRpbGl0eS5hcHBseVN0eWxlKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3Qod3JhcHBlciwgdGhpcy5kYXRhLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtGbG90Q2hhcnRQaWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjaGFydHMuY2hhcnRfcGllLmluaXQodGhpcyk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZmxvdC1jaGFydC1waWVcIl0nKS50a0Zsb3RDaGFydFBpZSgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuICAgIHZhciBjaGFydHMgPSByZXF1aXJlKCcuL19oZWxwZXInKTtcblxuICAgIGlmICh0eXBlb2YgY2hhcnRzID09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjaGFydHMuY2hhcnRfc2ltcGxlID1cbiAgICB7XG4gICAgICAgIC8vIGRhdGFcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2luOiBbXSxcbiAgICAgICAgICAgIGNvczogW11cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB3aWxsIGhvbGQgdGhlIGNoYXJ0IG9iamVjdFxuICAgICAgICBwbG90OiBudWxsLFxuXG4gICAgICAgIC8vIGNoYXJ0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSBdLFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczoge1xuICAgICAgICAgICAgICAgIGdyb3c6IHthY3RpdmU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICBzdGVwczogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDUsXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogXCJjaXJjbGVcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwiI2ZmZlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge3Bvc2l0aW9uOiBcInNlXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYmFja2dyb3VuZE9wYWNpdHk6IDAsIG5vQ29sdW1uczogMn0sXG4gICAgICAgICAgICBzaGFkb3dTaXplOiAwLFxuICAgICAgICAgICAgeWF4aXM6IHt0aWNrczogM30sXG4gICAgICAgICAgICB4YXhpczoge3RpY2tzOiA0LCB0aWNrRGVjaW1hbHM6IDAsIHRpY2tDb2xvcjogJ3RyYW5zcGFyZW50J30sXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLCAvL2FjdGl2YXRlIHRvb2x0aXBcbiAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCIlcyA6ICV5LjNcIixcbiAgICAgICAgICAgICAgICBzaGlmdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLSAzMCxcbiAgICAgICAgICAgICAgICAgICAgeTogLSA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRoZW1lOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdyYXBwZXIpIHtcblxuICAgICAgICAgICAgaWYgKCEgd3JhcHBlci5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGxvdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTQ7IGkgKz0gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zaW4ucHVzaChbIGksIE1hdGguc2luKGkpIF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuY29zLnB1c2goWyBpLCBNYXRoLmNvcyhpKSBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsb3QgPSAkLnBsb3QoXG4gICAgICAgICAgICAgICAgd3JhcHBlcixcbiAgICAgICAgICAgICAgICBbIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2luXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5zaW4sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7ZmlsbENvbG9yOiBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdfSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7ZmlsbENvbG9yOiBcIiNmZmZcIn1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ29zXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5jb3MsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7ZmlsbENvbG9yOiBcIiM0NDRcIn0sXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge2ZpbGxDb2xvcjogXCIjZmZmXCJ9XG4gICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrRmxvdENoYXJ0U2ltcGxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgY2hhcnRzLmNoYXJ0X3NpbXBsZS5pbml0KHRoaXMpO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImZsb3QtY2hhcnQtc2ltcGxlXCJdJykudGtGbG90Q2hhcnRTaW1wbGUoKTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19zaW1wbGUnKTtcbnJlcXVpcmUoJy4vX21peGVkJyk7XG5yZXF1aXJlKCcuL19saW5lJyk7XG5yZXF1aXJlKCcuL19ob3Jpem9udGFsJyk7XG5yZXF1aXJlKCcuL19saW5lX2ZpbGxfbm9wb2ludHMnKTtcbnJlcXVpcmUoJy4vX2xpbmVfZmlsbF9ub3BvaW50c18yJyk7XG5yZXF1aXJlKCcuL19iYXJzLW9yZGVyZWQnKTtcbnJlcXVpcmUoJy4vX2RvbnV0Jyk7XG5yZXF1aXJlKCcuL19iYXJzLXN0YWNrZWQnKTtcbnJlcXVpcmUoJy4vX3BpZScpO1xucmVxdWlyZSgnLi9fYXV0b3VwZGF0ZScpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2tpbiA9ICQuY29va2llKCdza2luJyk7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2tpbiA9ICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIHNraW47XG59KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtNb3JyaXNDaGFydEFyZWEgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoISB0aGlzLmF0dHIoJ2lkJykpIHJldHVybjtcblxuICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG5cbiAgICAgICAgdGhpcy5lbXB0eSgpO1xuXG4gICAgICAgIG5ldyBNb3JyaXMuQXJlYSh7XG4gICAgICAgICAgICBsaW5lQ29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdIF0sXG4gICAgICAgICAgICBwb2ludEZpbGxDb2xvcnM6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAnMC4zJyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuYXR0cignaWQnKSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICB7eTogJzEuMS4nLCBhOiAzMCwgYjogOTB9LFxuICAgICAgICAgICAgICAgIHt5OiAnMi4xLicsIGE6IDM1LCBiOiA2NX0sXG4gICAgICAgICAgICAgICAge3k6ICczLjEuJywgYTogNTAsIGI6IDQwfSxcbiAgICAgICAgICAgICAgICB7eTogJzQuMS4nLCBhOiA3NSwgYjogNjV9LFxuICAgICAgICAgICAgICAgIHt5OiAnNS4xLicsIGE6IDUwLCBiOiA0MH0sXG4gICAgICAgICAgICAgICAge3k6ICc2LjEuJywgYTogNzUsIGI6IDY1fSxcbiAgICAgICAgICAgICAgICB7eTogJzcuMS4nLCBhOiA2MCwgYjogOTB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgeGtleTogJ3knLFxuICAgICAgICAgICAgeWtleXM6IFsgJ2EnIF0sXG4gICAgICAgICAgICBsYWJlbHM6IFsgJ1NlcmllcyBBJyBdLFxuICAgICAgICAgICAgZ3JpZFRleHRDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgICAgIGdyaWRUZXh0V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICByZXNpemU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWFyZWFcIl0nKS50a01vcnJpc0NoYXJ0QXJlYSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWFyZWFcIl0nKS50a01vcnJpc0NoYXJ0QXJlYSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJC5mbi50a01vcnJpc0NoYXJ0QmFyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCEgdGhpcy5hdHRyKCdpZCcpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG4gICAgICAgIHRoaXMuZW1wdHkoKTtcblxuICAgICAgICBuZXcgTW9ycmlzLkJhcih7XG4gICAgICAgICAgICBiYXJDb2xvcnM6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdLCBjb2xvcnNbICdkYW5nZXItY29sb3InIF0gXSxcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuYXR0cignaWQnKSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICB7eTogJzIwMDYnLCBhOiAxMDAsIGI6IDkwLCBjOiA0MH0sXG4gICAgICAgICAgICAgICAge3k6ICcyMDA3JywgYTogNzUsIGI6IDY1LCBjOiAxMDB9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAwOCcsIGE6IDUwLCBiOiA0MCwgYzogMzB9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAwOScsIGE6IDc1LCBiOiA2NSwgYzogODV9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAxMCcsIGE6IDUwLCBiOiA0MCwgYzogNDV9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAxMScsIGE6IDc1LCBiOiA2NSwgYzogOTB9LFxuICAgICAgICAgICAgICAgIHt5OiAnMjAxMicsIGE6IDEwMCwgYjogOTAsIGM6IDgwfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGdyaWRUZXh0Q29sb3I6IGNvbG9yc1sgJ2RlZmF1bHQtY29sb3InIF0sXG4gICAgICAgICAgICBncmlkVGV4dFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgeGtleTogJ3knLFxuICAgICAgICAgICAgeWtleXM6IFsgJ2EnLCAnYicsICdjJyBdLFxuICAgICAgICAgICAgbGFiZWxzOiBbICdTZXJpZXMgQScsICdTZXJpZXMgQicsICdTZXJpZXMgQycgXVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwibW9ycmlzLWNoYXJ0LWJhclwiXScpLnRrTW9ycmlzQ2hhcnRCYXIoKTtcblxuICAgICAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm1vcnJpcy1jaGFydC1iYXJcIl0nKS50a01vcnJpc0NoYXJ0QmFyKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJC5mbi50a01vcnJpc0NoYXJ0RG9udXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoISB0aGlzLmF0dHIoJ2lkJykpIHJldHVybjtcblxuICAgICAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG5cbiAgICAgICAgdGhpcy5lbXB0eSgpO1xuXG4gICAgICAgIG5ldyBNb3JyaXMuRG9udXQoe1xuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5hdHRyKCdpZCcpLFxuICAgICAgICAgICAgY29sb3JzOiBbIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSwgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWNvbG9yJyBdIF0sXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAge2xhYmVsOiBcIkRvd25sb2FkIFNhbGVzXCIsIHZhbHVlOiAxMn0sXG4gICAgICAgICAgICAgICAge2xhYmVsOiBcIkluLVN0b3JlIFNhbGVzXCIsIHZhbHVlOiAzMH0sXG4gICAgICAgICAgICAgICAge2xhYmVsOiBcIk1haWwtT3JkZXIgU2FsZXNcIiwgdmFsdWU6IDIwfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJtb3JyaXMtY2hhcnQtZG9udXRcIl0nKS50a01vcnJpc0NoYXJ0RG9udXQoKTtcblxuICAgICAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm1vcnJpcy1jaGFydC1kb251dFwiXScpLnRrTW9ycmlzQ2hhcnREb251dCgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmZuLnRrTW9ycmlzQ2hhcnRMaW5lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCEgdGhpcy5hdHRyKCdpZCcpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNraW4gPSByZXF1aXJlKCcuLi9saWIvX3NraW4nKSgpO1xuXG4gICAgICAgIHRoaXMuZW1wdHkoKTtcblxuICAgICAgICBuZXcgTW9ycmlzLkxpbmUoe1xuICAgICAgICAgICAgbGluZUNvbG9yczogWyBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sIGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSBdLFxuICAgICAgICAgICAgcG9pbnRGaWxsQ29sb3JzOiBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdIF0sXG4gICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yczogWyAnI2ZmZmZmZicsICcjZmZmZmZmJyBdLFxuICAgICAgICAgICAgZ3JpZFRleHRDb2xvcjogY29sb3JzWyAnZGVmYXVsdC1jb2xvcicgXSxcbiAgICAgICAgICAgIGdyaWRUZXh0V2VpZ2h0OiAnYm9sZCcsXG5cbiAgICAgICAgICAgIC8vIElEIG9mIHRoZSBlbGVtZW50IGluIHdoaWNoIHRvIGRyYXcgdGhlIGNoYXJ0LlxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5hdHRyKCdpZCcpLFxuICAgICAgICAgICAgLy8gQ2hhcnQgZGF0YSByZWNvcmRzIC0tIGVhY2ggZW50cnkgaW4gdGhpcyBhcnJheSBjb3JyZXNwb25kcyB0byBhIHBvaW50IG9uXG4gICAgICAgICAgICAvLyB0aGUgY2hhcnQuXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTAyJywgYTogMjAwMCwgYjogMjQwMH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTAzJywgYTogMTIwMCwgYjogMjUwMH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA0JywgYTogMzIwMCwgYjogMjAwMH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA1JywgYTogMTYwMCwgYjogMTQ0MH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA2JywgYTogMTI5MCwgYjogMjgzMH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA3JywgYTogMTkzMCwgYjogMTIwMH0sXG4gICAgICAgICAgICAgICAge2RhdGU6ICcyMDE0LTA4JywgYTogMjEyMCwgYjogMzAwMH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZGF0YSByZWNvcmQgYXR0cmlidXRlIHRoYXQgY29udGFpbnMgeC12YWx1ZXMuXG4gICAgICAgICAgICB4a2V5OiAnZGF0ZScsXG4gICAgICAgICAgICAvLyBBIGxpc3Qgb2YgbmFtZXMgb2YgZGF0YSByZWNvcmQgYXR0cmlidXRlcyB0aGF0IGNvbnRhaW4geS12YWx1ZXMuXG4gICAgICAgICAgICB5a2V5czogWyAnYScsICdiJyBdLFxuICAgICAgICAgICAgLy8gTGFiZWxzIGZvciB0aGUgeWtleXMgLS0gd2lsbCBiZSBkaXNwbGF5ZWQgd2hlbiB5b3UgaG92ZXIgb3ZlciB0aGVcbiAgICAgICAgICAgIC8vIGNoYXJ0LlxuICAgICAgICAgICAgbGFiZWxzOiBbICdTZXJpZXMgQScsICdTZXJpZXMgQicgXSxcbiAgICAgICAgICAgIHJlc2l6ZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJtb3JyaXMtY2hhcnQtbGluZVwiXScpLnRrTW9ycmlzQ2hhcnRMaW5lKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJtb3JyaXMtY2hhcnQtbGluZVwiXScpLnRrTW9ycmlzQ2hhcnRMaW5lKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19hcmVhJyk7XG5yZXF1aXJlKCcuL19iYXInKTtcbnJlcXVpcmUoJy4vX2RvbnV0Jyk7XG5yZXF1aXJlKCcuL19saW5lJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4uL2xpYi9fc2tpbicpKCk7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU3BhcmtMaW5lID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zcGFya2xpbmUoXG4gICAgICAgICAgICB0aGlzLmRhdGEoJ2RhdGEnKSB8fCBcImh0bWxcIiwge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyNCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBzcG90UmFkaXVzOiAnMy4yJyxcbiAgICAgICAgICAgICAgICBzcG90Q29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBtaW5TcG90Q29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBtYXhTcG90Q29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRTcG90Q29sb3I6IGNvbG9yc1sgJ2Rhbmdlci1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6ICcyJyxcbiAgICAgICAgICAgICAgICBsaW5lQ29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yc1sgJ2JvZHktYmcnIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH07XG5cbiAgICAkLmZuLnRrU3BhcmtCYXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRleHQodGhpcy5maW5kKCdzcGFuJykudGV4dCgpKTtcblxuICAgICAgICB0aGlzLnNwYXJrbGluZShcbiAgICAgICAgICAgIHRoaXMuZGF0YSgnZGF0YScpIHx8IFwiaHRtbFwiLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnNzAnLFxuICAgICAgICAgICAgICAgIGJhcldpZHRoOiAxMCxcbiAgICAgICAgICAgICAgICBiYXJTcGFjaW5nOiA4LFxuICAgICAgICAgICAgICAgIHplcm9BeGlzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFja2VkQmFyQ29sb3I6IFsgY29uZmlnLnNraW5zWyBza2luIF1bICdwcmltYXJ5LWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdIF0sXG4gICAgICAgICAgICAgICAgY29sb3JNYXA6IHRoaXMuZGF0YSgnY29sb3JzJykgPyBbIGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSwgY29sb3JzWyAnc3VjY2Vzcy1jb2xvcicgXSwgY29sb3JzWyAnZGFuZ2VyLWNvbG9yJyBdLCBjb2xvcnNbICdkZWZhdWx0LWxpZ2h0LWNvbG9yJyBdIF0gOiBbXSxcbiAgICAgICAgICAgICAgICBlbmFibGVUYWdPcHRpb25zOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9O1xuXG4gICAgJChcIi5zcGFya2xpbmUtYmFyXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrU3BhcmtCYXIoKTtcbiAgICB9KTtcblxuICAgICQoXCIuc3BhcmtsaW5lLWxpbmVcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtTcGFya0xpbmUoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19zcGFya2xpbmUnKTtcbiJdfQ==
