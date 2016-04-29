/**
 * Copyright 2015 Knetik, Inc.
 * Includes portions of code from the following libraries. See the uncompressed, development
 * libraries included in the SPLYT SDK for Javascript for additional license information.
 *
 * 1. Underscore.js 1.6.0
 *    http://underscorejs.org
 *    Copyright (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 *
 * 2. Zepto.js 1.1.3
 *    http://zeptojs.com/
 *    Copyright (c) 2010-2014 Thomas Fuchs
 *
 * 3. php.js
 *    http://phpjs.org
 *    Copyright (c) 2013 Kevin van Zonneveld (http://kvz.io) and Contributors (http://phpjs.org/authors)
 *
 * 4. Highcharts JS
 *    http://www.highcharts.com/
 *    Copyright (c) 2009-2014 Torstein Honsi
 */
function strcmp(str1, str2) {
    return str1 == str2 ? 0 : str1 > str2 ? 1 : -1;
}

function strnatcmp(f_string1, f_string2, f_version) {
    var i = 0;
    void 0 == f_version && (f_version = !1);
    var __strnatcmp_split = function(f_string) {
        var result = [], buffer = "", chr = "", i = 0, f_stringl = 0, text = !0;
        for (f_stringl = f_string.length, i = 0; f_stringl > i; i++) chr = f_string.substring(i, i + 1), 
        chr.match(/\d/) ? (text && (buffer.length > 0 && (result[result.length] = buffer, 
        buffer = ""), text = !1), buffer += chr) : 0 == text && "." === chr && i < f_string.length - 1 && f_string.substring(i + 1, i + 2).match(/\d/) ? (result[result.length] = buffer, 
        buffer = "") : (0 == text && (buffer.length > 0 && (result[result.length] = parseInt(buffer, 10), 
        buffer = ""), text = !0), buffer += chr);
        return buffer.length > 0 && (text ? result[result.length] = buffer : result[result.length] = parseInt(buffer, 10)), 
        result;
    }, array1 = __strnatcmp_split(f_string1 + ""), array2 = __strnatcmp_split(f_string2 + ""), len = array1.length, text = !0, result = -1, r = 0;
    for (len > array2.length && (len = array2.length, result = 1), i = 0; len > i; i++) if (isNaN(array1[i])) {
        if (!isNaN(array2[i])) return text ? 1 : -1;
        if (text = !0, 0 != (r = this.strcmp(array1[i], array2[i]))) return r;
    } else {
        if (isNaN(array2[i])) return text ? -1 : 1;
        if (text || f_version) {
            if (0 != (r = array1[i] - array2[i])) return r;
        } else if (0 != (r = this.strcmp(array1[i].toString(), array2[i].toString()))) return r;
        text = !1;
    }
    return result;
}

function CurrencyService() {
    "use strict";
    var currencyMap = {
        ALL: "Lek",
        AFN: "؋",
        ARS: "$",
        AWG: "ƒ",
        AUD: "$",
        AZN: "ман",
        BSD: "$",
        BBD: "$",
        BYR: "p.",
        BZD: "BZ$",
        BMD: "$",
        BOB: "$b",
        BAM: "KM",
        BWP: "P",
        BGN: "лв",
        BRL: "R$",
        BND: "$",
        KHR: "៛",
        CAD: "$",
        KYD: "$",
        CLP: "$",
        CNY: "¥",
        COP: "$",
        CRC: "₡",
        HRK: "kn",
        CUP: "₱",
        CZK: "Kč",
        DKK: "kr",
        DOP: "RD$",
        XCD: "$",
        EGP: "£",
        SVC: "$",
        EEK: "kr",
        EUR: "€",
        FKP: "£",
        FJD: "$",
        GHC: "¢",
        GIP: "£",
        GTQ: "Q",
        GGP: "£",
        GYD: "$",
        HNL: "L",
        HKD: "$",
        HUF: "Ft",
        ISK: "kr",
        INR: "",
        IDR: "Rp",
        IRR: "﷼",
        IMP: "£",
        ILS: "₪",
        JMD: "J$",
        JPY: "¥",
        JEP: "£",
        KZT: "лв",
        KPW: "₩",
        KRW: "₩",
        KGS: "лв",
        LAK: "₭",
        LVL: "Ls",
        LBP: "£",
        LRD: "$",
        LTL: "Lt",
        MKD: "ден",
        MYR: "RM",
        MUR: "₨",
        MXN: "$",
        MNT: "₮",
        MZN: "MT",
        NAD: "$",
        NPR: "₨",
        ANG: "ƒ",
        NZD: "$",
        NIO: "C$",
        NGN: "₦",
        NOK: "kr",
        OMR: "﷼",
        PKR: "₨",
        PAB: "B/.",
        PYG: "Gs",
        PEN: "S/.",
        PHP: "₱",
        PLN: "zł",
        QAR: "﷼",
        RON: "lei",
        RUB: "руб",
        SHP: "£",
        SAR: "﷼",
        RSD: "Дин.",
        SCR: "₨",
        SGD: "$",
        SBD: "$",
        SOS: "S",
        ZAR: "R",
        LKR: "₨",
        SEK: "kr",
        CHF: "Fr.",
        SRD: "$",
        SYP: "£",
        TWD: "NT$",
        THB: "฿",
        TTD: "TT$",
        TRY: "",
        TRL: "₤",
        TVD: "$",
        UAH: "₴",
        GBP: "£",
        USD: "$",
        UYU: "$U",
        UZS: "лв",
        VEF: "Bs",
        VND: "₫",
        YER: "﷼",
        ZWD: "Z$"
    };
    this.intlSupported = "object" == typeof window.Intl, this.getPrefix = function(currencyCode, locale) {
        if (currencyCode) if (this.intlSupported) try {
            var priceFormatted = Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode
            }).format(0);
            if (0 !== priceFormatted.indexOf(currencyCode)) {
                var index = priceFormatted.search(/\d/);
                if (index > 0) {
                    var retVal = priceFormatted.substring(0, index);
                    if (currencyCode !== retVal) return retVal;
                }
            }
        } catch (e) {} else if (currencyMap.hasOwnProperty(currencyCode)) return currencyMap[currencyCode];
        return "";
    }, this.getSuffix = function(currencyCode, locale) {
        if (currencyCode && this.intlSupported) try {
            var priceFormatted = Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode
            }).format(0), index = priceFormatted.search(/[^\d\.,]/);
            if (index > 0) return priceFormatted.substring(index);
        } catch (e) {}
        return "";
    }, this.format = function(price, currencyCode, numDecimalPlaces, locale) {
        var priceFormatted = Number(price).toFixed("undefined" == typeof numDecimalPlaces ? 2 : numDecimalPlaces).toString();
        if (currencyCode) if (this.intlSupported) try {
            var formatted = Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode,
                minimumFractionDigits: numDecimalPlaces,
                maximumFractionDigits: numDecimalPlaces
            }).format(price);
            0 !== formatted.indexOf(currencyCode) && (priceFormatted = formatted);
        } catch (e) {} else currencyMap.hasOwnProperty(currencyCode) && (priceFormatted = currencyMap[currencyCode] + priceFormatted);
        return priceFormatted;
    };
}

function VisualizationFormatParams() {
    "use strict";
    this.mRenderType = null, this.mCaptionFormat = null, this.mYAxisType = null, this.mYAxisFormat = null, 
    this.mXAxisFormat = null, this.mLegendVisible = null, this.mLegendFormat = null;
}

function VisualizationParams() {
    "use strict";
    this.mLegacyParams = {}, this.mTitle = null, this.mSubTitle = null, this.mHeight = 229, 
    this.mHideBorder = !1, this.mLegendPosition = null, this.mMarkerSymbol = null, this.mFormatParams = new VisualizationFormatParams(), 
    this.mFormatParams.mRenderType = "line", this.mFormatParams.mCaptionFormat = "int", 
    this.mFormatParams.mYAxisType = "linear", this.mFormatParams.mYAxisFormat = "int", 
    this.mFormatParams.mXAxisFormat = "int", this.mFormatParams.mLegendVisible = !1, 
    this.mFormatParams.mLegendFormat = null;
}

function Visualization() {
    "use strict";
}

function LabelIndex(labels, searchValue) {
    if (labels) for (var i = 0; i < labels.length; ++i) {
        var l = labels[i];
        if (l == searchValue || String(l) == String(searchValue)) return i;
    }
    return -1;
}

function IsosVisAxisLabelKVFormatter(raw, format, labels, captions) {
    var idx = LabelIndex(labels, raw);
    -1 != idx && (raw = captions[idx]);
    for (var key in format) if (key == raw) return format[key];
    return raw;
}

function IsosVisAxisLabelFormatter(raw, format, labels, captions) {
    if ("" === raw) return "";
    if ("object" == typeof format) return IsosVisAxisLabelKVFormatter(raw, format, labels, captions);
    var formatted = "undefined";
    switch (format) {
      case "epochday":
        var epochDay = parseInt(raw), epochTime = 1e3 * epochDay * 24 * 60 * 60;
        formatted = Highcharts.dateFormat("%b %e", epochTime);
        break;

      case "epochtime":
        formatted = Highcharts.dateFormat("%b %e", parseInt(raw));
        break;

      case "use-caption":
        var idx = LabelIndex(labels, raw);
        -1 != idx && (formatted = captions[idx], null === formatted && (formatted = "unspecified"));
        break;

      case "use-index":
        formatted = LabelIndex(labels, raw);
        break;

      case "none":
        break;

      case "use-label":
      default:
        var maxStringLength = 12;
        formatted = null === raw || " " === raw ? "unspecified" : raw.length > maxStringLength ? raw.substr(0, maxStringLength) + "..." : raw;
    }
    return String(formatted);
}

function IsosVisDataPointLabelFormatter(x, y, xAxisFormat, labels, captions, numberStyle, seriesName, seriesFormat, ypct) {
    var xLabel = IsosVisAxisLabelFormatter(x, xAxisFormat, labels, captions), numDecimalPlaces = 2;
    y % 1 === 0 ? numDecimalPlaces = 0 : 1e-4 > y ? numDecimalPlaces = 5 : .001 > y ? numDecimalPlaces = 4 : .01 > y && (numDecimalPlaces = 3);
    var yLabel = Highcharts.numberFormat(y, numDecimalPlaces);
    if (numberStyle && 0 === numberStyle.indexOf("cur|")) {
        var parts = numberStyle.split("|");
        yLabel = new CurrencyService().format(y, parts[1], numDecimalPlaces);
    } else "pct" == numberStyle && (yLabel += "%");
    var seriesNameDisplay = "";
    seriesName && !_.contains([ "?column?", "values" ], seriesName) && (seriesNameDisplay = void 0 !== seriesFormat && seriesName in seriesFormat ? "<br>(" + seriesFormat[seriesName] + ")" : "<br>(" + seriesName + ")");
    var ttlabel = "";
    switch (xAxisFormat) {
      case "use-index":
        for (var i = 0; i < labels.length && labels[i] != x; ++i) ;
        ttlabel = "<b>" + captions[i] + ": </b>" + yLabel + seriesNameDisplay;
        break;

      default:
        ttlabel = "<b>" + xLabel + ": </b>" + yLabel + seriesNameDisplay;
    }
    return void 0 !== ypct && (ttlabel += " (" + ypct.toFixed(2) + "%)"), ttlabel;
}

function isos_vis(div, xAxisType, params) {}

function HighchartsWrapper(div, xAxisType, params) {
    this.tooltipFormatter = function() {
        var x, labels, captions, yformat, ypct, y = this.y, ttformat = this.series.chart.userOptions.tooltip.userFormat, seriesName = this.series.name, legendFormat = this.series.chart.userOptions.legend.userFormat;
        return "pie" == this.series.type ? (x = this.key, labels = captions = _.pluck(this.series.userOptions.data, "name"), 
        yformat = void 0, ypct = this.percentage) : (x = this.x, labels = this.series.xAxis.userOptions.userLabels, 
        captions = this.series.xAxis.userOptions.userCaptions, yformat = this.series.yAxis.userOptions.userFormat, 
        ypct = void 0), IsosVisDataPointLabelFormatter(x, y, ttformat, labels, captions, yformat, seriesName, legendFormat, ypct);
    }, this.xAxisFormatter = function() {
        return IsosVisAxisLabelFormatter(this.value, this.axis.userOptions.userFormat, this.axis.userOptions.userLabels, this.axis.userOptions.userCaptions);
    }, this.yAxisFormatter = function() {
        return "pct" === this.axis.userOptions.userFormat ? this.value + "%" : Highcharts.Axis.prototype.defaultLabelFormatter.call(this);
    }, this.legendFormatter = function() {
        var chart = this.series ? this.series.chart : this.chart;
        return null !== chart.userOptions.legend.userFormat ? IsosVisAxisLabelFormatter(this.name, chart.userOptions.legend.userFormat, chart.get("xaxis").userOptions.userLabels, chart.get("xaxis").userOptions.userCaptions) : this.name;
    }, this.computeYAxisMin = function(type) {
        if ("logarithmic" === type) return 1;
        if (this.mChart && this.mChart.series.length > 0) {
            var seriesMin = _.min(_.pluck(this.mChart.series, "dataMin")), visualMin = _.min([ 0, seriesMin ]);
            return visualMin;
        }
        return 0;
    }, this.mChart = new Highcharts.Chart(this.buildOptions(div, xAxisType, params));
}

function Series(ssfType) {
    this.error = ssfType.errorCode, null !== ssfType.data && void 0 !== ssfType.data && (this.labels = ssfType.data.labels, 
    this.captions = ssfType.data.captions, this.series = ssfType.data.series, this.transpose = ssfType.data.transpose);
}

var chartDarkColor = "#f5f5f5", chartLineColor = "#7f818d", chartAxisColor = "#7f818d", chartTitleColor = "#444859", chartSubtitleColor = "#8b8d97";

Highcharts.theme = {
    chart: {
        zoomType: "xy",
        backgroundColor: chartDarkColor,
        borderColor: "#e3e3e3",
        borderWidth: 1,
        borderRadius: 5,
        plotBackgroundColor: null,
        plotShadow: !1,
        plotBorderWidth: 0
    },
    credits: {
        enabled: !1
    },
    xAxis: {
        lineColor: chartLineColor,
        tickColor: chartLineColor,
        lineWidth: 1,
        labels: {
            style: {
                color: chartAxisColor
            },
            rotation: -45,
            align: "right"
        },
        id: "xaxis"
    },
    yAxis: {
        lineColor: chartLineColor,
        tickColor: chartLineColor,
        title: {
            text: ""
        },
        lineWidth: 1,
        gridLineWidth: 0,
        min: 0,
        id: "yaxis",
        labels: {
            style: {
                color: chartAxisColor
            }
        }
    },
    plotOptions: {
        series: {
            pointPadding: .05,
            groupPadding: .05,
            borderWidth: 0,
            shadow: !1
        }
    },
    loading: {
        hideDuration: 1e3,
        showDuration: 100,
        labelStyle: {
            color: chartTitleColor,
            top: "35%"
        },
        style: {
            backgroundColor: chartDarkColor
        }
    },
    title: {
        align: "center",
        style: {
            color: chartTitleColor,
            fontSize: "14px",
            fontfamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: "600"
        }
    },
    subtitle: {
        align: "center",
        style: {
            color: chartSubtitleColor,
            fontfamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        }
    },
    colors: [ "#ffbf40", "#395ea3", "#4f9566", "#9c1d1d", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a" ],
    plotline: {
        color: "#a6a6a6",
        dashStyle: "ShortDashDot",
        width: 3,
        label: {
            rotation: 270,
            verticalAlign: "bottom",
            textAlign: "left",
            y: -5,
            x: 12,
            style: {
                color: chartTitleColor
            }
        },
        zIndex: 99
    },
    goalLine: {
        color: "#a6a6a6",
        dashStyle: "shortdash",
        label: {
            style: {
                color: chartTitleColor
            }
        },
        width: 2,
        zIndex: 99
    }
}, Highcharts.setOptions(Highcharts.theme), VisualizationParams.prototype.setLegacyParam = function(_key, _value) {
    "use strict";
    this.mLegacyParams[_key] = _value;
}, VisualizationParams.prototype.getLegacyParam = function(_key) {
    "use strict";
    return this.mLegacyParams[_key] || void 0;
}, Visualization.prototype.destroy = function() {
    "use strict";
}, Visualization.prototype.create = function(visualizationType, div, xAxisType, params) {
    "use strict";
    if ("highchart" !== visualizationType) throw "Only Highcharts is currently supported!";
    return new HighchartsWrapper(div, xAxisType, params);
}, isos_vis.prototype.format = function(params) {}, isos_vis.prototype.showLoading = function() {}, 
isos_vis.prototype.hideLoading = function() {}, isos_vis.prototype.addSeries = function(series, renderType) {}, 
isos_vis.prototype.clear = function() {}, isos_vis.prototype.addAnnotations = function(annotations, onClick) {}, 
isos_vis.prototype.removeAnnotations = function() {}, isos_vis.prototype.setHeight = function(height) {}, 
isos_vis.prototype.setTitle = function(title, subtitle) {}, isos_vis.prototype.addGoals = function(data) {}, 
isos_vis.prototype.removeGoals = function(data) {}, isos_vis.prototype.changeBaseAggregateType = function(type, params) {}, 
HighchartsWrapper.prototype = new isos_vis(), HighchartsWrapper.prototype.constructor = HighchartsWrapper, 
HighchartsWrapper.prototype.changeBaseAggregateType = function(type, params) {
    var options = this.buildOptions(this.mChart.userOptions.chart.div, type, params);
    this.mChart.get("xaxis").update(options.xAxis, !0);
}, HighchartsWrapper.prototype.format = function(params) {
    var redraw = !1;
    if (params.mRenderType || null !== params.mLegendVisible) {
        var update = {};
        params.mRenderType && (update.type = params.mRenderType), null !== params.mLegendVisible && (update.showInLegend = params.mLegendVisible);
        for (var i = 0; i < this.mChart.series.length; i++) this.mChart.series[i].update(update, !1);
        "pie" === params.mRenderType ? (this.mChart.get("yaxis").update({
            lineWidth: 0
        }), this.mChart.get("xaxis").update({
            lineWidth: 0
        })) : (this.mChart.get("yaxis").update({
            lineWidth: Highcharts.theme.yAxis.lineWidth
        }), this.mChart.get("xaxis").update({
            lineWidth: Highcharts.theme.xAxis.lineWidth
        })), this.mChart.userOptions.legend.userVisibility = params.mLegendVisible, redraw = !0;
    }
    params.mYAxisType && (this.mChart.get("yaxis").update({
        type: params.mYAxisType,
        min: this.computeYAxisMin(params.mYAxisType)
    }), redraw = !0), params.mYAxisFormat && (this.mChart.get("yaxis").update({
        userFormat: params.mYAxisFormat
    }), redraw = !0), params.mXAxisFormat && (this.mChart.get("xaxis").update({
        userFormat: params.mXAxisFormat
    }), redraw = !0), params.mCaptionFormat ? (this.mChart.userOptions.tooltip.userFormat = params.mCaptionFormat, 
    redraw = !1) : params.mXAxisFormat && (this.mChart.userOptions.tooltip.userFormat = params.mXAxisFormat, 
    redraw = !1), params.mLegendFormat && (this.mChart.userOptions.legend.userFormat = params.mLegendFormat, 
    redraw = !1), redraw && this.mChart.redraw();
}, HighchartsWrapper.prototype.buildOptions = function(div, xAxisType, params) {
    var height = params.mHeight, enablezoom = params.getLegacyParam("enablezoom"), linecolor = params.getLegacyParam("linecolor"), linewidth = params.getLegacyParam("linewidth"), markerson = params.getLegacyParam("markerson"), xaxison = params.getLegacyParam("xaxison"), yaxison = params.getLegacyParam("yaxison"), formatParams = params.mFormatParams, options = {};
    return options.chart = {}, options.chart.renderTo = div, options.chart.height = height, 
    options.chart.events = {}, options.chart.ignoreHiddenSeries = "datetime" === xAxisType, 
    params.mHideBorder && (options.chart.borderWidth = 0), enablezoom && "false" === enablezoom && (options.chart.zoomType = ""), 
    options.chart.type = formatParams.mRenderType, options.xAxis = {}, options.xAxis.userFormat = formatParams.mXAxisFormat, 
    options.xAxis.id = "xaxis", options.xAxis.labels = {}, options.xAxis.labels.formatter = this.xAxisFormatter, 
    options.xAxis.type = xAxisType, options.xAxis.minRange = "datetime" === xAxisType && 864e5 || void 0, 
    options.xAxis.minTickInterval = "datetime" === xAxisType && 864e5 || void 0, options.yAxis = {}, 
    options.yAxis.userFormat = formatParams.mYAxisFormat, options.yAxis.type = formatParams.mYAxisType || "linear", 
    options.yAxis.min = this.computeYAxisMin(options.yAxis.type), options.yAxis.id = "yaxis", 
    options.yAxis.labels = {}, options.yAxis.labels.formatter = this.yAxisFormatter, 
    options.title = {}, options.title.text = params.mTitle || void 0, options.subtitle = {}, 
    options.subtitle.text = params.mSubTitle || void 0, options.legend = {}, options.legend.enabled = !0, 
    options.legend.labelFormatter = this.legendFormatter, options.legend.userFormat = params.mFormatParams.mLegendFormat, 
    params.mLegendPosition && ("left" === params.mLegendPosition || "right" === params.mLegendPosition ? (options.legend.verticalAlign = "middle", 
    options.legend.layout = "vertical", options.legend.align = params.mLegendPosition) : "vertical" === params.mLegendPosition && (options.legend.layout = "vertical")), 
    options.legend.userVisibility = formatParams.mLegendVisible, options.tooltip = {}, 
    options.tooltip.userFormat = formatParams.mCaptionFormat || formatParams.mXAxisFormat, 
    options.tooltip.formatter = this.tooltipFormatter, options.plotOptions = {}, options.plotOptions.column = {}, 
    options.plotOptions.line = {}, options.plotOptions.spline = {}, options.plotOptions.spline.marker = {}, 
    options.plotOptions.spline.marker.enabled = !1, options.plotOptions.series = {}, 
    options.plotOptions.series.color = linecolor, linewidth && (options.plotOptions.series.lineWidth = parseInt(linewidth)), 
    options.plotOptions.series.marker = {}, options.plotOptions.series.marker.symbol = params.mMarkerSymbol || void 0, 
    markerson && ("false" === markerson ? options.plotOptions.series.marker.enabled = !1 : "true" === markerson && (options.plotOptions.series.marker.enabled = !0)), 
    void 0 !== xaxison && ("false" === xaxison && (options.xAxis.lineWidth = 0, options.xAxis.minorGridLineWidth = 0, 
    options.xAxis.lineColor = "transparent", options.xAxis.minorTickLength = 0, options.xAxis.tickLength = 0), 
    ("false" === xaxison || "nolabels" === xaxison) && (options.xAxis.labels.enabled = !1)), 
    void 0 !== yaxison && ("false" === yaxison && (options.yAxis.lineWidth = 0, options.yAxis.minorGridLineWidth = 0, 
    options.yAxis.lineColor = "transparent", options.yAxis.minorTickLength = 0, options.yAxis.tickLength = 0), 
    ("false" === yaxison || "nolabels" === yaxison) && (options.yAxis.labels.enabled = !1)), 
    options.wrapper = this, options;
}, HighchartsWrapper.prototype.addSeries = function(seriesObj, seriesType) {
    var i = 0, labels = seriesObj.labels, data = seriesObj.series, error = seriesObj.error, xaxis = this.mChart.get("xaxis"), yaxis = this.mChart.get("yaxis");
    xaxis.update({
        userLabels: seriesObj.labels,
        userCaptions: seriesObj.captions
    }, !1);
    var xaxistype = xaxis.userOptions.type, yaxistype = yaxis.userOptions.type, seriesToAdd = [];
    if ("boxplot" == this.mChart.userOptions.chart.type) {
        var boxplotData = [];
        for (i = 0; i < labels.length; i++) boxplotData[i] = [], boxplotData[i].push(data.group_min[i]), 
        boxplotData[i].push(data.group_q1[i]), boxplotData[i].push(data.group_median[i]), 
        boxplotData[i].push(data.group_q3[i]), boxplotData[i].push(data.group_max[i]);
        this.mChart.get("xaxis").setCategories(labels, !1), seriesToAdd.push({
            data: boxplotData
        });
    } else {
        for (var series in data) {
            var theSeries = [];
            for (i = 0; i < data[series].length; i++) {
                var x = labels[i], y = data[series][i];
                "datetime" === xaxistype && (x *= 1e3), "pct" == yaxis.userOptions.userFormat && null !== y && (y *= 100), 
                "logarithmic" === yaxistype && 0 === y && null !== y && (y = 1e-5);
                var name = null;
                if ("datetime" === xaxistype ? name = x : (name = labels[i], name = "" === name || null === name ? " " : name.toString()), 
                _.isNumber(y)) {
                    var pointObj = {
                        name: name,
                        y: y
                    };
                    "category" !== xaxistype && (pointObj.x = x), theSeries.push(pointObj);
                }
            }
            seriesToAdd.push({
                name: series,
                type: seriesType,
                data: theSeries
            });
        }
        "category" === xaxistype && this.mChart.get("xaxis").setCategories(labels, !1);
    }
    for (var s = 0; s < seriesToAdd.length; s++) this.mChart.addSeries(seriesToAdd[s], !1);
    for (var sil = 1 == this.mChart.series.length ? !1 : this.mChart.userOptions.legend.userVisibility, es = 0; es < this.mChart.series.length; es++) this.mChart.series[es].update({
        showInLegend: sil
    }, !1);
    this.mChart.get("yaxis").update({
        min: this.computeYAxisMin(yaxistype)
    }), this.handleError(error), this.mChart.redraw();
}, HighchartsWrapper.prototype.handleError = function(error) {
    switch (error) {
      case 0:
        break;

      case -5:
        this.mChart.setTitle(null, {
            text: "There is no data for this graph yet.",
            style: {
                color: "#FF0000"
            }
        });
        break;

      default:
        this.mChart.setTitle(null, {
            text: "An error occurred loading " + this.mChart.userOptions.title.text + ". Please refresh.",
            style: {
                color: "#FF0000"
            }
        });
    }
}, HighchartsWrapper.prototype.setTitle = function(title, subtitle) {
    this.mChart.setTitle(title, subtitle);
}, HighchartsWrapper.prototype.setHeight = function(height) {
    this.mChart.setSize(this.mChart.chartWidth, height);
}, HighchartsWrapper.prototype.clear = function() {
    for (;this.mChart.series.length > 0; ) this.mChart.series[0].remove(!1);
    this.mChart.colorCounter = 0, this.mChart.symbolCounter = 0, this.mChart.redraw();
}, HighchartsWrapper.prototype.showLoading = function() {
    this.mChart && this.mChart.showLoading();
}, HighchartsWrapper.prototype.hideLoading = function() {
    this.mChart && this.mChart.hideLoading();
}, HighchartsWrapper.prototype.removeAnnotations = function() {
    var xaxis = this.mChart.get("xaxis"), numBands = xaxis.plotLinesAndBands.length, idListToRemove = [], i = 0;
    for (i = 0; numBands > i; i++) idListToRemove[i] = xaxis.plotLinesAndBands[i].id;
    for (i = 0; numBands > i; i++) xaxis.removePlotBand(idListToRemove[i]);
}, HighchartsWrapper.prototype.addAnnotations = function(annotations, onClick) {
    var xaxis = this.mChart.get("xaxis"), annotation_list = {};
    _.each(annotations, function(curAnnotationData) {
        var ts = 1e3 * dayifyTimestamp(parseInt(curAnnotationData.epoch));
        if (annotation_list[ts]) annotation_list[ts].count++, annotation_list[ts].plotline.label.text = "<i>" + annotation_list[ts].count + " events</i>"; else {
            var plotline = {
                id: ts,
                value: ts,
                events: {
                    click: function(e) {
                        onClick(curAnnotationData);
                    },
                    mouseover: function(e) {
                        document.body.style.cursor = "pointer";
                    },
                    mouseout: function(e) {
                        document.body.style.cursor = "default";
                    }
                },
                label: {
                    text: curAnnotationData.label
                }
            };
            annotation_list[ts] = {
                count: 1,
                plotline: Highcharts.merge(plotline, Highcharts.theme.plotline)
            };
        }
    }), _.each(annotation_list, function(annotation) {
        xaxis.addPlotLine(annotation.plotline);
    });
}, HighchartsWrapper.prototype.addGoals = function(data) {
    var yaxis = this.mChart.get("yaxis");
    _.each(data, function(goal) {
        yaxis.removePlotLine(goal.id), yaxis.addPlotLine(Highcharts.merge({
            id: goal.id,
            label: {
                text: ""
            },
            value: plotline.value
        }, Highcharts.theme.goalLine));
    });
}, HighchartsWrapper.prototype.removeGoals = function(data) {
    var yaxis = this.mChart.get("yaxis");
    _.each(data, function(goal) {
        yaxis.removePlotLine(goal.id);
    });
}, Series.prototype.getFirstSeries = function() {
    for (var i in this.series) return this.series[i];
}, Series.prototype.getElementsWithIndices = function(arr, indices) {
    return _.map(indices, function(i) {
        return arr[i];
    });
}, Series.prototype.getValuesColumn = function() {
    var transposeCol = this.series[this.transpose], valueCol = null;
    for (var s in this.series) if (s != this.transpose) {
        var series = this.series[s];
        if (_.isArray(series) && series.length == transposeCol.length) {
            if (null !== valueCol) throw new Error("Could not determine value column for transpose; multiple columns exist.");
            valueCol = series;
        }
    }
    if (null === valueCol) throw new Error("Could not find a value column for transpose.");
    return valueCol;
}, Series.prototype.getUnique = function(arr) {
    for (var unique = [], i = 0; i < arr.length; i++) _.contains(unique, arr[i]) || unique.push(arr[i]);
    return unique;
}, Series.prototype.getUniqueFirstIndices = function(arr) {
    for (var unique = [], uniqueIndices = [], i = 0; i < arr.length; i++) _.contains(unique, arr[i]) || (uniqueIndices.push(i), 
    unique.push(arr[i]));
    return uniqueIndices;
}, Series.prototype.applyTransforms = function() {
    if (this.transpose && this.series.hasOwnProperty(this.transpose)) {
        var valuesColumn = this.getValuesColumn(), uniqueLabelIndices = this.getUniqueFirstIndices(this.labels);
        this.getUnique(this.series[this.transpose]);
        for (var newLabels = this.getElementsWithIndices(this.labels, uniqueLabelIndices), newCaptions = this.getElementsWithIndices(this.captions, uniqueLabelIndices), newSeries = {}, i = 0; i < this.series[this.transpose].length; i++) {
            var label = this.labels[i], xformColName = this.series[this.transpose][i], xformColVal = valuesColumn[i], xformRowIndex = newLabels.indexOf(label);
            if (!newSeries.hasOwnProperty(xformColName)) {
                newSeries[xformColName] = [];
                for (var j = 0; j < newLabels.length; j++) newSeries[xformColName][j] = 0;
            }
            newSeries[xformColName][xformRowIndex] += xformColVal;
        }
        this.labels = newLabels, this.captions = newCaptions, this.series = newSeries, this.transpose = void 0;
    }
}, Series.prototype.tiedSort = function(sortArray, sortType) {
    var comparator = null;
    if ("naturalSort" == sortType && _.isArray(sortArray) && sortArray.length == this.labels.length) {
        comparator = strnatcmp;
        var sortedLabels = _.tiedSort([ sortArray, this.labels ], comparator)[1], sortedCaptions = _.tiedSort([ sortArray, this.captions ], comparator)[1];
        _.replaceArrayContents(this.labels, sortedLabels), _.replaceArrayContents(this.captions, sortedCaptions);
        for (var s in this.series) {
            var sortedSeries = _.tiedSort([ sortArray, this.series[s] ], comparator)[1];
            _.replaceArrayContents(this.series[s], sortedSeries);
        }
        return this;
    }
}, function() {
    "use strict";
    function capitalize(string) {
        return string = String(string), string.charAt(0).toUpperCase() + string.slice(1);
    }
    function each(object, callback) {
        var index = -1, length = object.length;
        if (length == length >>> 0) for (;++index < length; ) callback(object[index], index, object); else forOwn(object, callback);
    }
    function format(string) {
        return string = trim(string), /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
    }
    function forOwn(object, callback) {
        for (var key in object) hasKey(object, key) && callback(object[key], key, object);
    }
    function getClassOf(value) {
        return null == value ? capitalize(value) : toString.call(value).slice(8, -1);
    }
    function hasKey() {
        return hasKey = function(object, key) {
            var parent = null != object && (object.constructor || Object).prototype;
            return !!parent && key in Object(object) && !(key in parent && object[key] === parent[key]);
        }, "Function" == getClassOf(hasOwnProperty) ? hasKey = function(object, key) {
            return null != object && hasOwnProperty.call(object, key);
        } : {}.__proto__ == Object.prototype && (hasKey = function(object, key) {
            var result = !1;
            return null != object && (object = Object(object), object.__proto__ = [ object.__proto__, object.__proto__ = null, result = key in object ][0]), 
            result;
        }), hasKey.apply(this, arguments);
    }
    function isHostType(object, property) {
        var type = null != object ? typeof object[property] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(type) && ("object" == type ? !!object[property] : !0);
    }
    function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, "$1?");
    }
    function reduce(array, callback) {
        var accumulator = null;
        return each(array, function(value, index) {
            accumulator = callback(accumulator, value, index, array);
        }), accumulator;
    }
    function trim(string) {
        return String(string).replace(/^ +| +$/g, "");
    }
    function parse(ua) {
        function getLayout(guesses) {
            return reduce(guesses, function(result, guess) {
                return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
            });
        }
        function getManufacturer(guesses) {
            return reduce(guesses, function(result, value, key) {
                return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
            });
        }
        function getName(guesses) {
            return reduce(guesses, function(result, guess) {
                return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
            });
        }
        function getOS(guesses) {
            return reduce(guesses, function(result, guess) {
                var pattern = guess.pattern || qualify(guess);
                return !result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua)) && (data = {
                    "6.3": "8.1",
                    "6.2": "8",
                    "6.1": "Server 2008 R2 / 7",
                    "6.0": "Server 2008 / Vista",
                    "5.2": "Server 2003 / XP 64-bit",
                    "5.1": "XP",
                    "5.01": "2000 SP1",
                    "5.0": "2000",
                    "4.0": "NT",
                    "4.90": "ME"
                }, /^Win/i.test(result) && (data = data[/[\d.]+$/.exec(result)]) && (result = "Windows " + data), 
                result = format(String(result).replace(RegExp(pattern, "i"), guess.label || guess).replace(/ ce$/i, " CE").replace(/hpw/i, "web").replace(/Macintosh/, "Mac OS").replace(/_PowerPC/i, " OS").replace(/(OS X) [^ \d]+/i, "$1").replace(/Mac (OS X)/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/x86\.64/gi, "x86_64").split(" on ")[0])), 
                result;
            });
        }
        function getProduct(guesses) {
            return reduce(guesses, function(result, guess) {
                var pattern = guess.pattern || qualify(guess);
                return !result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua)) && ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0]) && (result[0] += " " + result[1]), 
                guess = guess.label || guess, result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"))), 
                result;
            });
        }
        function getVersion(patterns) {
            return reduce(patterns, function(result, pattern) {
                return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
            });
        }
        function toStringPlatform() {
            return this.description || "";
        }
        ua || (ua = userAgent);
        var data, arch = ua, description = [], prerelease = null, useFeatures = ua == userAgent, version = useFeatures && opera && "function" == typeof opera.version && opera.version(), layout = getLayout([ {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "Trident", "KHTML", "Gecko" ]), name = getName([ "Adobe AIR", "Arora", "Avant Browser", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", {
            label: "SRWare Iron",
            pattern: "Iron"
        }, "K-Meleon", "Konqueror", "Lunascape", "Maxthon", "Midori", "Nook Browser", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Sleipnir", "SlimBrowser", "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", "Opera", {
            label: "Opera",
            pattern: "OPR"
        }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
        }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
        }, {
            label: "IE",
            pattern: "MSIE"
        }, "Safari" ]), product = getProduct([ {
            label: "BlackBerry",
            pattern: "BB10"
        }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
        }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
        }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
        }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
        }, "Google TV", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Nook", "PlayBook", "PlayStation 4", "PlayStation 3", "PlayStation Vita", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
        }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
        }, "Xoom" ]), manufacturer = getManufacturer({
            Apple: {
                iPad: 1,
                iPhone: 1,
                iPod: 1
            },
            Amazon: {
                Kindle: 1,
                "Kindle Fire": 1
            },
            Asus: {
                Transformer: 1
            },
            "Barnes & Noble": {
                Nook: 1
            },
            BlackBerry: {
                PlayBook: 1
            },
            Google: {
                "Google TV": 1
            },
            HP: {
                TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
                Xbox: 1,
                "Xbox One": 1
            },
            Motorola: {
                Xoom: 1
            },
            Nintendo: {
                "Wii U": 1,
                Wii: 1
            },
            Nokia: {},
            Samsung: {
                "Galaxy S": 1,
                "Galaxy S2": 1,
                "Galaxy S3": 1,
                "Galaxy S4": 1
            },
            Sony: {
                "PlayStation 4": 1,
                "PlayStation 3": 1,
                "PlayStation Vita": 1
            }
        }), os = getOS([ "Android", "CentOS", "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows " ]);
        if (layout && (layout = [ layout ]), manufacturer && !product && (product = getProduct([ manufacturer ])), 
        (data = /Google TV/.exec(product)) && (product = data[0]), /\bSimulator\b/i.test(ua) && (product = (product ? product + " " : "") + "Simulator"), 
        /^iP/.test(product) ? (name || (name = "Safari"), os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "")) : "Konqueror" != name || /buntu/i.test(os) ? manufacturer && "Google" != manufacturer && (/Chrome/.test(name) && !/Mobile Safari/.test(ua) || /Vita/.test(product)) ? (name = "Android Browser", 
        os = /Android/.test(os) ? os : "Android") : (!name || (data = !/\bMinefield\b|\(Android;/i.test(ua) && /Firefox|Safari/.exec(name))) && (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8)) && (name = null), 
        (data = product || manufacturer || os) && (product || manufacturer || /Android|Symbian OS|Tablet OS|webOS/.test(os)) && (name = /[a-z]+(?: Hat)?/i.exec(/Android/.test(os) ? os : data) + " Browser")) : os = "Kubuntu", 
        (data = /\((Mobile|Tablet).*?Firefox/i.exec(ua)) && data[1] && (os = "Firefox OS", 
        product || (product = data[1])), version || (version = getVersion([ "(?:Cloud9|CriOS|CrMo|Iron|Opera ?Mini|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", qualify(name), "(?:Firefox|Minefield|NetFront)" ])), 
        "iCab" == layout && parseFloat(version) > 3 ? layout = [ "WebKit" ] : (data = /Opera/.test(name) && (/OPR/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && ("Mac OS" == os ? "Tasman" : "Trident")) ? layout = [ data ] : /PlayStation(?! Vita)/i.test(name) && "WebKit" == layout && (layout = [ "NetFront" ]), 
        name || "Trident" != layout || (name = "IE", version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]), 
        useFeatures) {
            if (isHostType(root, "global")) if (java && (data = java.lang.System, arch = data.getProperty("os.arch"), 
            os = os || data.getProperty("os.name") + " " + data.getProperty("os.version")), 
            freeExports) if (thisBinding == oldRoot && "object" == typeof system && (data = [ system ])[0]) {
                os || (os = data[0].os || null);
                try {
                    data[1] = (data[1] = require) && data[1]("ringo/engine").version, version = data[1].join("."), 
                    name = "RingoJS";
                } catch (e) {
                    data[0].global == freeGlobal && (name = "Narwhal");
                }
            } else "object" == typeof process && (data = process) ? (name = "Node.js", arch = data.arch, 
            os = data.platform, version = /[\d.]+/.exec(data.version)[0]) : rhino && (name = "Rhino"); else rhino && (name = "Rhino"); else "ScriptBridgingProxyObject" == getClassOf(data = root.runtime) ? (name = "Adobe AIR", 
            os = data.flash.system.Capabilities.os) : "RuntimeObject" == getClassOf(data = root.phantom) ? (name = "PhantomJS", 
            version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch) : "number" == typeof doc.documentMode && (data = /\bTrident\/(\d+)/i.exec(ua)) && (version = [ version, doc.documentMode ], 
            (data = +data[1] + 4) != version[1] && (description.push("IE " + version[1] + " mode"), 
            layout && (layout[1] = ""), version[1] = data), version = "IE" == name ? String(version[1].toFixed(1)) : version[0]);
            os = os && format(os);
        }
        return version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a") && (prerelease = /b/i.test(data) ? "beta" : "alpha", 
        version = version.replace(RegExp(data + "\\+?$"), "") + ("beta" == prerelease ? beta : alpha) + (/\d+\+?/.exec(data) || "")), 
        "Fennec" == name || "Firefox" == name && /Android|Firefox OS/.test(os) ? name = "Firefox Mobile" : "Maxthon" == name && version ? version = version.replace(/\.[\d.]+/, ".x") : "Silk" == name ? (/Mobi/i.test(ua) || (os = "Android", 
        description.unshift("desktop mode")), /Accelerated *= *true/i.test(ua) && description.unshift("accelerated")) : "IE" == name && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1]) ? (name += " Mobile", 
        os = "Windows Phone OS " + data + ".x", description.unshift("desktop mode")) : /Xbox/i.test(product) ? (os = null, 
        "Xbox 360" == product && /IEMobile/.test(ua) && description.unshift("mobile mode")) : "Chrome" != name && "IE" != name && (!name || product || /Browser|Mobi/.test(name)) || "Windows CE" != os && !/Mobi/i.test(ua) ? "IE" == name && useFeatures && "object" == typeof external && !external ? description.unshift("platform preview") : (/BlackBerry/.test(product) || /BB10/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version) ? (data = [ data, /BB10/.test(ua) ], 
        os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0], 
        version = null) : this != forOwn && "Wii" != product && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || "Firefox" == name && /OS X (?:\d+\.){2,}/.test(os) || "IE" == name && (os && !/^Win/.test(os) && version > 5.5 || /Windows XP/.test(os) && version > 8 || 8 == version && !/Trident/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name && (data = "ing as " + data.name + ((data = data.version) ? " " + data : ""), 
        reOpera.test(name) ? (/IE/.test(data) && "Mac OS" == os && (os = null), data = "identify" + data) : (data = "mask" + data, 
        name = operaClass ? format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", 
        /IE/.test(data) && (os = null), useFeatures || (version = null)), layout = [ "Presto" ], 
        description.push(data)) : name += " Mobile", (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) && (data = [ parseFloat(data.replace(/\.(\d)$/, ".0$1")), data ], 
        "Safari" == name && "+" == data[1].slice(-1) ? (name = "WebKit Nightly", prerelease = "alpha", 
        version = data[1].slice(0, -1)) : (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) && (version = null), 
        data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1], 537.36 == data[0] && 537.36 == data[2] && parseFloat(data[1]) >= 28 && (layout = [ "Blink" ]), 
        !useFeatures || /internal|\n/i.test(toString.toString()) && !data[1] ? (layout && (layout[1] = "like Safari"), 
        data = data[0], data = 400 > data ? 1 : 500 > data ? 2 : 526 > data ? 3 : 533 > data ? 4 : 534 > data ? "4+" : 535 > data ? 5 : 537 > data ? 6 : 538 > data ? 7 : "7") : (layout && (layout[1] = "like Chrome"), 
        data = data[1] || (data = data[0], 530 > data ? 1 : 532 > data ? 2 : 532.05 > data ? 3 : 533 > data ? 4 : 534.03 > data ? 5 : 534.07 > data ? 6 : 534.1 > data ? 7 : 534.13 > data ? 8 : 534.16 > data ? 9 : 534.24 > data ? 10 : 534.3 > data ? 11 : 535.01 > data ? 12 : 535.02 > data ? "13+" : 535.07 > data ? 15 : 535.11 > data ? 16 : 535.19 > data ? 17 : 536.05 > data ? 18 : 536.1 > data ? 19 : 537.01 > data ? 20 : 537.11 > data ? "21+" : 537.13 > data ? 23 : 537.18 > data ? 24 : 537.24 > data ? 25 : 537.36 > data ? 26 : "Blink" != layout ? "27" : "28")), 
        layout && (layout[1] += " " + (data += "number" == typeof data ? ".x" : /[.+]/.test(data) ? "" : "+")), 
        "Safari" == name && (!version || parseInt(version) > 45) && (version = data)), "Opera" == name && (data = /(?:zbov|zvav)$/.exec(os)) ? (name += " ", 
        description.unshift("desktop mode"), "zvav" == data ? (name += "Mini", version = null) : name += "Mobile") : "Safari" == name && /Chrome/.exec(layout && layout[1]) && (description.unshift("desktop mode"), 
        name = "Chrome Mobile", version = null, /OS X/.test(os) ? (manufacturer = "Apple", 
        os = "iOS 4.3+") : os = null), version && 0 == version.indexOf(data = /[\d.]+$/.exec(os)) && ua.indexOf("/" + data + "-") > -1 && (os = trim(os.replace(data, ""))), 
        layout && !/Avant|Nook/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || /^(?:Adobe|Arora|Midori|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1]) && (data = layout[layout.length - 1]) && description.push(data), 
        description.length && (description = [ "(" + description.join("; ") + ")" ]), manufacturer && product && product.indexOf(manufacturer) < 0 && description.push("on " + manufacturer), 
        product && description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product), 
        os && (data = / ([\d.+]+)$/.exec(os), os = {
            architecture: 32,
            family: data ? os.replace(data[0], "") : os,
            version: data ? data[1] : null,
            toString: function() {
                var version = this.version;
                return this.family + (version ? " " + version : "") + (64 == this.architecture ? " 64-bit" : "");
            }
        }), (data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch) && (os && (os.architecture = 64, 
        os.family = os.family.replace(RegExp(" *" + data), "")), name && (/WOW64/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform)) && description.unshift("32-bit")), 
        ua || (ua = null), {
            version: name && version && (description.unshift(version), version),
            name: name && (description.unshift(name), name),
            os: os ? (name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product)) && description.push(product ? "(" + os + ")" : "on " + os), 
            os) : {
                architecture: null,
                family: null,
                version: null,
                toString: function() {
                    return "null";
                }
            },
            description: description.length ? description.join(" ") : ua,
            layout: layout && layout[0],
            manufacturer: manufacturer,
            prerelease: prerelease,
            product: product,
            ua: ua,
            parse: parse,
            toString: toStringPlatform
        };
    }
    var objectTypes = {
        "function": !0,
        object: !0
    }, root = objectTypes[typeof window] && window || this, oldRoot = root, freeExports = objectTypes[typeof exports] && exports, freeModule = objectTypes[typeof module] && module && !module.nodeType && module, freeGlobal = freeExports && freeModule && "object" == typeof global && global;
    !freeGlobal || freeGlobal.global !== freeGlobal && freeGlobal.window !== freeGlobal && freeGlobal.self !== freeGlobal || (root = freeGlobal);
    var reOpera = /Opera/, toString = Object.prototype.toString, java = /Java/.test(getClassOf(root.java)) && root.java, rhino = java && "Environment" == getClassOf(root.environment), alpha = java ? "a" : "α", beta = java ? "b" : "β", doc = root.document || {}, hasOwnProperty = {}.hasOwnProperty, nav = root.navigator || {}, opera = root.operamini || root.opera, operaClass = reOpera.test(operaClass = getClassOf(opera)) ? operaClass : opera = null, thisBinding = this, userAgent = nav.userAgent || "";
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return parse();
    }) : freeExports && freeModule ? forOwn(parse(), function(value, key) {
        freeExports[key] = value;
    }) : root.platform = parse();
}.call(this);

var SplytUtil = function() {
    function type(obj) {
        return null == obj ? String(obj) : class2type[toString.call(obj)] || "object";
    }
    function isWindow(obj) {
        return null != obj && obj == obj.window;
    }
    function isObject(obj) {
        return "object" == type(obj);
    }
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    var $ = {}, ArrayProto = Array.prototype, slice = ArrayProto.slice, nativeForEach = ArrayProto.forEach;
    window.JSON && ($.parseJSON = JSON.parse);
    var each = $.each = $.forEach = function(obj, iterator, context) {
        if (null == obj) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; length > i; i++) if (iterator.call(context, obj[i], i, obj) === breaker) return;
        } else for (var keys = _.keys(obj), i = 0, length = keys.length; length > i; i++) if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
        return obj;
    };
    $.extend = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source) for (var prop in source) obj[prop] = source[prop];
        }), obj;
    };
    var class2type = {}, toString = class2type.toString, isArray = Array.isArray || function(object) {
        return object instanceof Array;
    };
    return $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(name, i) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }), $.type = type, $.isWindow = isWindow, $.isArray = isArray, $.isPlainObject = isPlainObject, 
    $;
}();

!function($) {
    function triggerAndReturn(context, eventName, data) {}
    function triggerGlobal(settings, context, eventName, data) {
        return settings.global ? triggerAndReturn(context || document, eventName, data) : void 0;
    }
    function ajaxStart(settings) {
        settings.global && 0 === $.active++ && triggerGlobal(settings, null, "ajaxStart");
    }
    function ajaxStop(settings) {
        settings.global && !--$.active && triggerGlobal(settings, null, "ajaxStop");
    }
    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        return settings.beforeSend.call(context, xhr, settings) === !1 || triggerGlobal(settings, context, "ajaxBeforeSend", [ xhr, settings ]) === !1 ? !1 : void triggerGlobal(settings, context, "ajaxSend", [ xhr, settings ]);
    }
    function ajaxSuccess(data, xhr, settings, deferred) {
        var context = settings.context, status = "success";
        settings.success.call(context, data, status, xhr), deferred && deferred.resolveWith(context, [ data, status, xhr ]), 
        triggerGlobal(settings, context, "ajaxSuccess", [ xhr, settings, data ]), ajaxComplete(status, xhr, settings);
    }
    function ajaxError(error, type, xhr, settings, deferred) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error), deferred && deferred.rejectWith(context, [ xhr, type, error ]), 
        triggerGlobal(settings, context, "ajaxError", [ xhr, settings, error || type ]), 
        ajaxComplete(type, xhr, settings);
    }
    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status), triggerGlobal(settings, context, "ajaxComplete", [ xhr, settings ]), 
        ajaxStop(settings);
    }
    function empty() {}
    function mimeToDataType(mime) {
        return mime && (mime = mime.split(";", 2)[0]), mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text";
    }
    function appendQuery(url, query) {
        return "" == query ? url : (url + "&" + query).replace(/[&?]{1,2}/, "?");
    }
    function serializeData(options) {
        options.processData && options.data && "string" != $.type(options.data) && (options.data = $.param(options.data, options.traditional)), 
        !options.data || options.type && "GET" != options.type.toUpperCase() || (options.url = appendQuery(options.url, options.data), 
        options.data = void 0);
    }
    function parseArguments(url, data, success, dataType) {
        return $.isFunction(data) && (dataType = success, success = data, data = void 0), 
        $.isFunction(success) || (dataType = success, success = void 0), {
            url: url,
            data: data,
            success: success,
            dataType: dataType
        };
    }
    function serialize(params, obj, traditional, scope) {
        var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
        $.each(obj, function(key, value) {
            type = $.type(value), scope && (key = traditional ? scope : scope + "[" + (hash || "object" == type || "array" == type ? key : "") + "]"), 
            !scope && array ? params.add(value.name, value.value) : "array" == type || !traditional && "object" == type ? serialize(params, value, traditional, key) : params.add(key, value);
        });
    }
    var key, name, jsonpID = 0, document = window.document, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
    $.active = 0, $.ajaxJSONP = function(options, deferred) {
        if (!("type" in options)) return $.ajax(options);
        var responseData, abortTimeout, _callbackName = options.jsonpCallback, callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || "jsonp" + ++jsonpID, script = document.createElement("script"), originalCallback = window[callbackName], abort = function(errorType) {
            $(script).triggerHandler("error", errorType || "abort");
        }, xhr = {
            abort: abort
        };
        return deferred && deferred.promise(xhr), $(script).on("load error", function(e, errorType) {
            clearTimeout(abortTimeout), $(script).off().remove(), "error" != e.type && responseData ? ajaxSuccess(responseData[0], xhr, options, deferred) : ajaxError(null, errorType || "error", xhr, options, deferred), 
            window[callbackName] = originalCallback, responseData && $.isFunction(originalCallback) && originalCallback(responseData[0]), 
            originalCallback = responseData = void 0;
        }), ajaxBeforeSend(xhr, options) === !1 ? (abort("abort"), xhr) : (window[callbackName] = function() {
            responseData = arguments;
        }, script.src = options.url.replace(/\?(.+)=\?/, "?$1=" + callbackName), document.head.appendChild(script), 
        options.timeout > 0 && (abortTimeout = setTimeout(function() {
            abort("timeout");
        }, options.timeout)), xhr);
    }, $.ajaxSettings = {
        type: "GET",
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest();
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, $.ajax = function(options) {
        var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred();
        for (key in $.ajaxSettings) void 0 === settings[key] && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), 
        settings.url || (settings.url = window.location.toString()), serializeData(settings), 
        settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
        var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
        if ("jsonp" == dataType || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), 
        $.ajaxJSONP(settings, deferred);
        var abortTimeout, mime = settings.accepts[dataType], headers = {}, setHeader = function(name, value) {
            headers[name.toLowerCase()] = [ name, value ];
        }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader;
        if (deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), 
        setHeader("Accept", mime || "*/*"), (mime = settings.mimeType || mime) && (mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), 
        xhr.overrideMimeType && xhr.overrideMimeType(mime)), (settings.contentType || settings.contentType !== !1 && settings.data && "GET" != settings.type.toUpperCase()) && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded"), 
        settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
        if (xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
            if (4 == xhr.readyState) {
                xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || 304 == xhr.status || 0 == xhr.status && "file:" == protocol) {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), 
                    result = xhr.responseText;
                    try {
                        "script" == dataType ? (1, eval)(result) : "xml" == dataType ? result = xhr.responseXML : "json" == dataType && (result = blankRE.test(result) ? null : $.parseJSON(result));
                    } catch (e) {
                        error = e;
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred);
                } else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred);
            }
        }, ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), 
        xhr;
        if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
        var async = "async" in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async, settings.username, settings.password);
        for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
        return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred);
        }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr;
    }, $.get = function() {
        return $.ajax(parseArguments.apply(null, arguments));
    }, $.post = function() {
        var options = parseArguments.apply(null, arguments);
        return options.type = "POST", $.ajax(options);
    }, $.getJSON = function() {
        var options = parseArguments.apply(null, arguments);
        return options.dataType = "json", $.ajax(options);
    };
    var escape = encodeURIComponent;
    $.param = function(obj, traditional) {
        var params = [];
        return params.add = function(k, v) {
            this.push(escape(k) + "=" + escape(v));
        }, serialize(params, obj, traditional), params.join("&").replace(/%20/g, "+");
    };
}(SplytUtil), function($) {
    $.is_float = function(mixed_var) {
        "use strict";
        return !(+mixed_var !== mixed_var || isFinite(mixed_var) && !(mixed_var % 1));
    }, $.gettype = function(mixed_var) {
        "use strict";
        var name, s = typeof mixed_var, getFuncName = function(fn) {
            var name = /\W*function\s+([\w\$]+)\s*\(/.exec(fn);
            return name ? name[1] : "(Anonymous)";
        };
        return "object" === s ? null !== mixed_var ? "number" != typeof mixed_var.length || mixed_var.propertyIsEnumerable("length") || "function" != typeof mixed_var.splice ? mixed_var.constructor && getFuncName(mixed_var.constructor) && (name = getFuncName(mixed_var.constructor), 
        "Date" === name ? s = "date" : "RegExp" === name ? s = "regexp" : "PHPJS_Resource" === name && (s = "resource")) : s = "array" : s = "null" : "number" === s && (s = this.is_float(mixed_var) ? "double" : "integer"), 
        s;
    }, $.settype = function(vr, type) {
        "use strict";
        var v, mtch, i, obj, is_array = function(arr) {
            return "object" == typeof arr && "number" == typeof arr.length && !arr.propertyIsEnumerable("length") && "function" == typeof arr.splice;
        };
        v = this[vr] ? this[vr] : vr;
        var retVal = !0;
        try {
            switch (type) {
              case "boolean":
                if (is_array(v) && 0 === v.length) this[vr] = !1; else if ("0" === v) this[vr] = !1; else if ("object" != typeof v || is_array(v)) this[vr] = !!v; else {
                    var lgth = !1;
                    for (i in v) lgth = !0;
                    this[vr] = lgth;
                }
                break;

              case "integer":
                "number" == typeof v ? this[vr] = parseInt(v, 10) : "string" == typeof v ? (mtch = v.match(/^([+\-]?)(\d+)/), 
                mtch ? this[vr] = parseInt(v, 10) : this[vr] = 0) : v === !0 ? this[vr] = 1 : v === !1 || null === v ? this[vr] = 0 : is_array(v) && 0 === v.length ? this[vr] = 0 : "object" == typeof v && (this[vr] = 1);
                break;

              case "double":
              case "float":
                "string" == typeof v ? (mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/), 
                mtch ? this[vr] = parseFloat(v, 10) : this[vr] = 0) : v === !0 ? this[vr] = 1 : v === !1 || null === v ? this[vr] = 0 : is_array(v) && 0 === v.length ? this[vr] = 0 : "object" == typeof v && (this[vr] = 1);
                break;

              case "string":
                null === v || v === !1 ? this[vr] = "" : is_array(v) ? this[vr] = "Array" : "object" == typeof v ? this[vr] = "Object" : v === !0 ? this[vr] = "1" : this[vr] += "";
                break;

              case "array":
                null === v ? this[vr] = [] : "object" != typeof v ? this[vr] = [ v ] : retVal = !1;
                break;

              case "object":
                if (null === v) this[vr] = {}; else if (is_array(v)) {
                    for (i = 0, obj = {}; i < v.length; i++) obj[i] = v;
                    this[vr] = obj;
                } else "object" != typeof v && (this[vr] = {
                    scalar: v
                });
                break;

              case "null":
                delete this[vr];
                break;

              default:
                retVal = !1;
            }
        } catch (e) {
            retVal = !1;
        }
        return retVal;
    };
}(SplytUtil);

var splytDocCookies = {
    getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue) {
        var sExpires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
        return document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + "; " + sExpires + "; path=/;", 
        !0;
    },
    removeItem: function(sKey, sPath) {
        return sKey && this.hasItem(sKey) ? (document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT", 
        !0) : !1;
    },
    hasItem: function(sKey) {
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    }
}, Splyt = {
    TXN_SUCCESS: "success",
    TXN_ERROR: "error",
    ERROR_CID: "Missing or bad Customer ID",
    ERROR_ARGUMENT: "Bad Arguments",
    init: function(params, callback, context) {
        "use strict";
        if (Splyt.usedVars = {}, void 0 === params || "object" !== SplytUtil.gettype(params)) throw new Error(Splyt.ERROR_ARGUMENT);
        if (params.hasOwnProperty("host")) {
            if ("string" !== SplytUtil.gettype(params.host) || "" === params.host) throw new Error(Splyt.ERROR_ARGUMENT);
            Splyt.params.host = params.host;
        }
        if (!params.hasOwnProperty("customerId")) throw new Error(Splyt.ERROR_CID);
        if ("string" !== SplytUtil.gettype(params.customerId) || "" === params.customerId) throw new Error(Splyt.ERROR_CID);
        if (Splyt.params.customerId = params.customerId, params.hasOwnProperty("apikey") && "string" === SplytUtil.gettype(params.apikey) && "" !== params.apikey && (Splyt.params.apikey = params.apikey), 
        params.hasOwnProperty("user")) {
            var userT = SplytUtil.gettype(params.user);
            if ("object" === userT) {
                if (!params.user.hasOwnProperty("id")) throw new Error(Splyt.ERROR_ARGUMENT);
                if (Splyt.params.user = params.user, params.user.hasOwnProperty("properties")) {
                    if ("object" !== SplytUtil.gettype(params.user.properties)) throw new Error(Splyt.ERROR_ARGUMENT);
                } else Splyt.params.user.properties = {};
            } else {
                if ("string" !== userT && "integer" !== userT) throw new Error(Splyt.ERROR_ARGUMENT);
                Splyt.params.user = {
                    id: params.user,
                    properties: {}
                };
            }
        } else Splyt.params.user = {
            id: null,
            properties: {}
        };
        if (params.hasOwnProperty("device")) {
            var deviceT = SplytUtil.gettype(params.device);
            if ("object" === deviceT) {
                if (!params.device.hasOwnProperty("id")) throw new Error(Splyt.ERROR_ARGUMENT);
                if (Splyt.params.device = params.device, params.device.hasOwnProperty("properties")) {
                    if ("object" !== SplytUtil.gettype(params.device.properties)) throw new Error(Splyt.ERROR_ARGUMENT);
                } else Splyt.params.device.properties = {};
            } else {
                if ("string" !== deviceT && "integer" !== deviceT) throw new Error(Splyt.ERROR_ARGUMENT);
                Splyt.params.device = {
                    id: params.device,
                    properties: {}
                };
            }
        } else void 0 !== splytDocCookies.getItem(Splyt.LOCAL_STORAGE_KEY) ? Splyt.params.device = {
            id: JSON.parse(splytDocCookies.getItem(Splyt.LOCAL_STORAGE_KEY)),
            properties: {}
        } : Splyt.params.device = {
            id: null,
            properties: {}
        }, null !== Splyt.params.device.id && splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(Splyt.params.device.id));
        var platform = window.platform;
        if ((!params.hasOwnProperty("scrape") || params.scrape) && platform && (platform.name && (Splyt.params.device.properties.browser = platform.name), 
        platform.version && (Splyt.params.device.properties.browserversion = platform.version), 
        platform.os && (platform.os.family && (Splyt.params.device.properties.osname = platform.os.family), 
        platform.os.version && (Splyt.params.device.properties.osversion = platform.os.version)), 
        platform.description && (Splyt.params.device.properties.description = platform.description), 
        navigator && navigator.language && (Splyt.params.device.properties.language = navigator.language.toLowerCase())), 
        params.hasOwnProperty("chartOnly") && params.chartOnly) Splyt.params.chartOnly = !0; else {
            Splyt.params.chartOnly = !1;
            var cachedInitParams = Splyt.getCachedInitParams();
            params.hasOwnProperty("alwaysFetchTuning") && !params.alwaysFetchTuning || !Splyt.needFullInit(cachedInitParams) ? (Splyt.entityStateChanged("device", cachedInitParams) && Splyt.Instrumentation.updateDeviceState(Splyt.params.device.properties, context), 
            Splyt.entityStateChanged("user", cachedInitParams) && Splyt.Instrumentation.updateUserState(Splyt.params.user.properties, context), 
            callback && callback(null)) : Splyt.fullInit(callback, context);
        }
    },
    clearActiveUser: function() {
        "use strict";
        Splyt.params.user = {
            id: null,
            properties: {}
        };
    },
    registerUser: function(user, context, callback) {
        "use strict";
        if (!Splyt.params.chartOnly) {
            sessionStorage.removeItem(Splyt.SESSION_PREVIOUS_INIT_KEY);
            var userT = SplytUtil.gettype(user);
            if ("object" === userT) {
                if (!user.hasOwnProperty("id")) throw new Error(Splyt.ERROR_ARGUMENT);
                if (Splyt.params.user = user, user.hasOwnProperty("properties")) {
                    if ("object" !== SplytUtil.gettype(user.properties)) throw new Error(Splyt.ERROR_ARGUMENT);
                } else Splyt.params.user.properties = {};
            } else {
                if ("string" !== userT && "integer" !== userT) throw new Error(Splyt.ERROR_ARGUMENT);
                Splyt.params.user = {
                    id: user,
                    properties: {}
                };
            }
            var ts = Splyt.getTimeStamp(), obj = Splyt.xhrObj("application_updateuser", Splyt.PERSONALIZATION, context, [ ts, ts, Splyt.params.user.id, Splyt.params.device.id, Splyt.params.user.properties ]);
            obj.success = function(ssfType) {
                var data = ssfType.data;
                data && (data.hasOwnProperty("userid") && null !== data.userid && (Splyt.params.user.id = data.userid), 
                data.hasOwnProperty("usertuning") && null !== data.usertuning && "object" === SplytUtil.gettype(data.usertuning) && (Splyt.userVars = data.usertuning), 
                data.hasOwnProperty("deviceid") && null !== data.deviceid && (Splyt.params.device.id = data.deviceid, 
                splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(data.deviceid))), 
                data.hasOwnProperty("devicetuning") && null !== data.devicetuning && "object" === SplytUtil.gettype(data.devicetuning) && (Splyt.deviceVars = data.devicetuning), 
                callback && callback(data));
            }, obj.error = function() {
                callback && callback(null);
            }, Splyt.xhr(obj);
        }
    },
    sendDataPoint: function(hook, args, contextName) {
        "use strict";
        if (!Splyt.params.chartOnly) {
            var timestamp = Splyt.getTimeStamp(), completeArgs = [];
            if (completeArgs.push(timestamp), completeArgs.push(timestamp), completeArgs.push(Splyt.params.user.id), 
            completeArgs.push(Splyt.params.device.id), args) for (var argIdx = 0; argIdx < args.length; argIdx++) completeArgs.push(args[argIdx]);
            var obj = Splyt.xhrObj(hook, Splyt.PERSONALIZATION, contextName, completeArgs);
            Splyt.xhr(obj);
        }
    },
    fullInit: function(callback, context) {
        var ts = Splyt.getTimeStamp(), obj = Splyt.xhrObj("application_init_with_entitystate_telem", Splyt.PERSONALIZATION, context, [ ts, ts, Splyt.params.user.id, Splyt.params.device.id, Splyt.params.user.properties, Splyt.params.device.properties ]);
        obj.success = function(ssfType) {
            var data = ssfType.data;
            data && (data.hasOwnProperty("userid") && null !== data.userid && (Splyt.params.user.id = data.userid), 
            data.hasOwnProperty("usertuning") && null !== data.usertuning && "object" === SplytUtil.gettype(data.usertuning) && (Splyt.userVars = data.usertuning), 
            data.hasOwnProperty("deviceid") && null !== data.deviceid && (Splyt.params.device.id = data.deviceid, 
            splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(data.deviceid))), 
            data.hasOwnProperty("devicetuning") && null !== data.devicetuning && "object" === SplytUtil.gettype(data.devicetuning) && (Splyt.deviceVars = data.devicetuning), 
            sessionStorage.setItem(Splyt.SESSION_PREVIOUS_INIT_KEY, JSON.stringify(Splyt.params)), 
            callback && callback(data));
        }, obj.error = function() {
            callback && callback(null);
        }, Splyt.xhr(obj);
    },
    needFullInit: function(cachedInitParams) {
        return !cachedInitParams || cachedInitParams.apikey !== Splyt.params.apikey || cachedInitParams.customerId !== Splyt.params.customerId || cachedInitParams.host !== Splyt.params.host || Splyt.params.hasOwnProperty("user") && cachedInitParams.hasOwnProperty("user") && cachedInitParams.user.id !== Splyt.params.user.id || Splyt.params.hasOwnProperty("device") && cachedInitParams.hasOwnProperty("device") && cachedInitParams.device.id !== Splyt.params.device.id;
    },
    entityStateChanged: function(entityType, cachedInitParams) {
        var changed = !1;
        return Splyt.params.hasOwnProperty(entityType) && (changed = !cachedInitParams || !cachedInitParams.hasOwnProperty(entityType) || JSON.stringify(Splyt.params[entityType]) !== JSON.stringify(cachedInitParams[entityType])), 
        changed;
    },
    getCachedInitParams: function() {
        var cachedInitParams = null;
        try {
            cachedInitParams = JSON.parse(sessionStorage.getItem(Splyt.SESSION_PREVIOUS_INIT_KEY));
        } catch (err) {}
        return cachedInitParams;
    },
    updateCachedInitParamsProperties: function(entityType, properties) {
        var cachedInitParams = Splyt.getCachedInitParams();
        if (cachedInitParams) {
            if (cachedInitParams.hasOwnProperty(entityType) && "object" == typeof cachedInitParams[entityType].properties) for (var p in properties) cachedInitParams[entityType].properties.hasOwnProperty(p) && properties.hasOwnProperty(p) && (cachedInitParams[entityType].properties[p] = properties[p]);
            sessionStorage.setItem(Splyt.SESSION_PREVIOUS_INIT_KEY, JSON.stringify(cachedInitParams));
        }
    },
    params: {
        host: "https://data.splyt.com",
        vishost: "https://dashboard.splyt.com",
        customerId: null,
        user: {},
        device: {}
    },
    xhr: SplytUtil.ajax,
    userVars: {},
    deviceVars: {},
    usedVars: {},
    PERSONALIZATION: "isos-personalization",
    TOOLS: "isos-tools",
    TIME_RECORDAGAIN: 28800,
    SDK_VERSION: "4.0.6",
    WS_VERSION: "4",
    TOOLS_VERSION: "-1",
    LOCAL_STORAGE_KEY: "splyt.device.id",
    SESSION_PREVIOUS_INIT_KEY: "splyt.initParams",
    TIMEOUT_MODE_TRANSACTION: "TXN",
    TIMEOUT_MODE_ANY: "ANY",
    getQueryParms: function(service, contextName) {
        "use strict";
        if (null === Splyt.params.customerId) return "";
        var version = Splyt.WS_VERSION;
        service === Splyt.TOOLS && (version = Splyt.TOOLS_VERSION);
        var qs = "?ssf_ws_version=" + version + "&ssf_cust_id=" + Splyt.params.customerId + "&ssf_output=json&ssf_sdk=js&ssf_sdk_version=" + Splyt.SDK_VERSION;
        return service === Splyt.TOOLS && Splyt.params.apikey && Splyt.params.apikey.length > 0 && (qs += "&ssf_api_key=" + Splyt.params.apikey), 
        contextName && contextName.length > 0 && (qs += "&ssf_sdk_contextname=" + contextName), 
        qs;
    },
    buildURL: function(api, service, context) {
        "use strict";
        var URI = "/" + service + "/ws/interface/", url = Splyt.params.host;
        return service === Splyt.TOOLS && (url = Splyt.params.vishost), url = url.replace(/\/$/, ""), 
        url = url.replace(/^\//, ""), api = api.replace(/\/$/, ""), api = api.replace(/^\//, ""), 
        url + URI + api + Splyt.getQueryParms(service, context);
    },
    xhrObj: function(api, service, context, data, dataType) {
        "use strict";
        return dataType = dataType || "json", {
            type: "POST",
            url: Splyt.buildURL(api, service, context),
            data: JSON.stringify(data),
            dataType: dataType,
            processData: !1,
            headers: {
                "ssf-use-positional-post-params": "true",
                "ssf-contents-not-url-encoded": "true"
            }
        };
    },
    getTimeStamp: function() {
        "use strict";
        var date = new Date();
        return date.getTime() / 1e3;
    },
    Instrumentation: {
        updateUserState: function(properties, context) {
            "use strict";
            Splyt.sendDataPoint("datacollector_updateUserState", [ properties ], context), Splyt.updateCachedInitParamsProperties("user", properties);
        },
        updateDeviceState: function(properties, context) {
            "use strict";
            Splyt.sendDataPoint("datacollector_updateDeviceState", [ properties ], context), 
            Splyt.updateCachedInitParamsProperties("device", properties);
        },
        beginTransaction: function(category, timeout, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint("datacollector_beginTransaction", [ category, Splyt.TIMEOUT_MODE_TRANSACTION, timeout, transactionid, properties ], context);
        },
        updateTransaction: function(category, progress, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint("datacollector_updateTransaction", [ category, progress, transactionid, properties ], context);
        },
        endTransaction: function(category, result, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint("datacollector_endTransaction", [ category, result, transactionid, properties ], context);
        },
        updateCollection: function(name, balance, balanceModification, isCurrency, context) {
            "use strict";
            Splyt.sendDataPoint("datacollector_updateCollection", [ name, balance, balanceModification, isCurrency ], context);
        },
        beginAndEnd: function(category, result, properties, context) {
            "use strict";
            Splyt.sendDataPoint("datacollector_endTransaction", [ category, result, void 0, properties ], context);
        }
    },
    Tuning: {
        getVar: function(varName, defaultValue) {
            "use strict";
            var f = function(varName) {
                (!Splyt.usedVars[varName] || Splyt.getTimeStamp() > Splyt.usedVars[varName] + Splyt.TIME_RECORDAGAIN) && (Splyt.usedVars[varName] = Splyt.getTimeStamp(), 
                Splyt.sendDataPoint("tuner_recordUsed", [ varName, defaultValue ]));
            };
            f(varName);
            var result = defaultValue;
            return null !== Splyt.params.user.id ? Splyt.userVars.hasOwnProperty(varName) && (result = Splyt.userVars[varName]) : null !== Splyt.params.device.id && Splyt.deviceVars.hasOwnProperty(varName) && (result = Splyt.deviceVars[varName]), 
            SplytUtil.result = result, result = "undefined" == typeof result || !1 === SplytUtil.settype("result", SplytUtil.gettype(defaultValue)) ? defaultValue : SplytUtil.result, 
            delete SplytUtil.result, result;
        },
        refresh: function(context, callback) {
            "use strict";
            if (!Splyt.params.chartOnly) {
                var ts = Splyt.getTimeStamp(), obj = Splyt.xhrObj("tuner_refresh", Splyt.PERSONALIZATION, context, [ ts, ts, Splyt.params.device.id, [ Splyt.params.user.id ] ]);
                obj.success = function(ssfType) {
                    var data = ssfType.data;
                    data && (data.hasOwnProperty("deviceTuning") && data.deviceTuning.hasOwnProperty("data") && "object" === SplytUtil.gettype(data.deviceTuning.data) && data.deviceTuning.data.hasOwnProperty("value") && "object" === SplytUtil.gettype(data.deviceTuning.data.value) && (Splyt.deviceVars = data.deviceTuning.data.value), 
                    data.hasOwnProperty("userTuning") && data.userTuning.hasOwnProperty("data") && "object" === SplytUtil.gettype(data.userTuning.data) && data.userTuning.data.hasOwnProperty("value") && "object" === SplytUtil.gettype(data.userTuning.data.value) && data.userTuning.data.value.hasOwnProperty(Splyt.params.user.id) && "object" === SplytUtil.gettype(data.userTuning.data.value[Splyt.params.user.id]) && (Splyt.userVars = data.userTuning.data.value[Splyt.params.user.id])), 
                    callback && callback();
                }, obj.error = function() {
                    callback && callback();
                }, Splyt.xhr(obj);
            }
        }
    }
}, Splyt_Purchasing = {
    PURCHASE_CATEGORY: "purchase",
    purchase: function(item, offer, pos, currency, price, result, context) {
        "use strict";
        var data = {
            offerId: offer,
            itemName: item,
            pointOfSale: pos
        };
        data.price = {}, data.price[currency] = price, Splyt.Instrumentation.beginAndEnd(Splyt_Purchasing.PURCHASE_CATEGORY, result, data, context);
    }
};

Splyt.Purchasing = Splyt_Purchasing;

var Splyt_Session = {
    SESSION_CATEGORY: "session",
    begin: function(timeout, context) {
        "use strict";
        Splyt.sendDataPoint("datacollector_beginTransaction", [ Splyt_Session.SESSION_CATEGORY, Splyt.TIMEOUT_MODE_ANY, timeout, void 0, {} ], context);
    },
    end: function(result, context) {
        "use strict";
        Splyt.Instrumentation.endTransaction(Splyt_Session.SESSION_CATEGORY, result, {}, context);
    }
};

Splyt.Session = Splyt_Session, Splyt.Web = function() {
    var splytCache, pub = {}, endPageViewIfInProgress = function() {
        !splytCache.session.isExpiredOrInvalid() && splytCache.session.pageViewId && splytCache.session.pageViewInProgress && (Splyt.Instrumentation.endTransaction("pageView", Splyt.TXN_SUCCESS, null, null, splytCache.session.pageViewId), 
        splytCache.session.pageViewInProgress = !1, updateSplytCache());
    }, track = function() {
        "use strict";
        initSplytCache(), started = !0, opts.automaticPageViews && pub.beginPageView();
    }, updateSession = function() {
        "use strict";
        var beginNewSession = !1;
        if (splytCache.session.isExpiredOrInvalid() && createSplytSession(splytCache), splytCache.session.isNew ? beginNewSession = !0 : (splytCache.session.sessionProgress += 1, 
        splytCache.session.sessionProgress < 100 ? (splytCache.session.sessionPageViewCount += 1, 
        Splyt.Instrumentation.updateTransaction("session", splytCache.session.sessionProgress, {
            pageViewCount: splytCache.session.sessionPageViewCount
        }, null, splytCache.session.sessionId)) : (Splyt.Instrumentation.endTransaction("session", Splyt.TXN_SUCCESS, null, null, splytCache.session.sessionId), 
        createSplytSession(splytCache), beginNewSession = !0)), beginNewSession) {
            if (Splyt.Instrumentation.beginTransaction("session", opts.sessionTimeoutMinutes, {
                pageViewCount: splytCache.session.sessionPageViewCount
            }, null, splytCache.session.sessionId), opts.updateDeviceState) {
                var cachedDeviceState = getCachedStateForCurrentEntity("device");
                cachedDeviceState && Splyt.Instrumentation.updateDeviceState({
                    sessionCount: cachedDeviceState.sessionCount
                });
            }
            if (opts.updateUserState) {
                var cachedUserState = getCachedStateForCurrentEntity("user");
                cachedUserState && Splyt.Instrumentation.updateUserState({
                    sessionCount: cachedUserState.sessionCount
                });
            }
        }
        updateSplytCache();
    }, createSplytSession = function() {
        "use strict";
        incrementSessionCount("device"), incrementSessionCount("user"), splytCache.session.deviceid = getId("device"), 
        splytCache.session.userid = getId("user"), splytCache.session.expiryTimeMs = getFutureExpiryEpoch(opts.sessionTimeoutMinutes / 1440), 
        splytCache.session.isNew = !0, splytCache.session.pageViewInProgress = !1, splytCache.session.pageViewId = getNewTransactionId(splytCache.session.pageViewId), 
        splytCache.session.pageViewProgress = 0, splytCache.session.sessionId = getNewTransactionId(splytCache.session.sessionId), 
        splytCache.session.sessionProgress = 0, splytCache.session.sessionPageViewCount = 1;
    }, initSplytCache = function() {
        "use strict";
        splytCache = null;
        var objStr = splytDocCookies.getItem("splyt-webcache");
        if (objStr) try {
            splytCache = JSON.parse(objStr);
        } catch (err) {}
        splytCache || (splytCache = {
            device: {},
            user: {},
            session: {}
        }), splytCache.session.isExpiredOrInvalid = isExpiredOrInvalid, splytCache.session.isExpiredOrInvalid() && createSplytSession(splytCache);
    }, isExpiredOrInvalid = function() {
        "use strict";
        if (this.deviceid !== getId("device")) return !0;
        if (this.userid !== getId("user")) return !0;
        var expiryTimeMs = this.expiryTimeMs;
        return !expiryTimeMs || expiryTimeMs - new Date().getTime() < 5e3;
    }, updateSplytCache = function() {
        "use strict";
        splytCache.session.expiryTimeMs = getFutureExpiryEpoch(opts.sessionTimeoutMinutes / 1440), 
        splytCache.session.isNew = !1, splytDocCookies.setItem("splyt-webcache", JSON.stringify(splytCache));
    }, getId = function(entityType) {
        "use strict";
        var entityId = null;
        try {
            entityId = Splyt.params[entityType].id;
        } catch (e) {}
        return entityId;
    }, getCachedStateForCurrentEntity = function(entityType) {
        "use strict";
        var id = getId(entityType);
        return id ? (splytCache[entityType].hasOwnProperty(id) && splytCache[entityType][id] || (splytCache[entityType][id] = {
            sessionCount: 0
        }), splytCache[entityType][id]) : null;
    }, incrementSessionCount = function(entityType, newSessionCount) {
        "use strict";
        var entityId = getId(entityType);
        if (entityId) {
            var entityState = getCachedStateForCurrentEntity(entityType);
            (!entityState || isNaN(parseFloat(entityState.sessionCount))) && (entityState = {
                sessionCount: 0
            }), entityState.sessionCount = entityState.sessionCount + 1, splytCache[entityType][entityId] = entityState;
        }
    }, getNewTransactionId = function(currentTrxId) {
        var newTrxId = new Date().getTime();
        return newTrxId.toString() === currentTrxId && newTrxId++, newTrxId.toString();
    }, getFutureExpiryEpoch = function(daysFromNow) {
        "use strict";
        return new Date().getTime() + 24 * daysFromNow * 60 * 60 * 1e3;
    }, getPathName = function() {
        "use strict";
        var pathname = window.location.pathname;
        return "/" == pathname.charAt(0) ? pathname : "/" + pathname;
    }, ready = function(fn) {
        "use strict";
        "interactive" === document.readyState || "complete" === document.readyState ? fn() : document.addEventListener ? document.addEventListener("DOMContentLoaded", fn) : document.attachEvent("onreadystatechange", function() {
            "interactive" === document.readyState && fn();
        });
    }, opts = {
        automaticPageViews: !0,
        sessionTimeoutMinutes: 30,
        updateDeviceState: !0,
        updateUserState: !1
    }, started = !1;
    return pub.startTracking = function(options) {
        "use strict";
        void 0 !== options && (void 0 !== options.automaticPageViews && (opts.automaticPageViews = options.automaticPageViews), 
        void 0 !== options.sessionTimeoutMinutes && (opts.sessionTimeoutMinutes = options.sessionTimeoutMinutes), 
        void 0 !== options.updateDeviceState && (opts.updateDeviceState = options.updateDeviceState), 
        void 0 !== options.updateUserState && (opts.updateUserState = options.updateUserState)), 
        ready(track);
    }, pub.hasStarted = function() {
        return started;
    }, pub.beginPageView = function(properties) {
        "use strict";
        pub.hasStarted() && (properties || (properties = {}), properties.hasOwnProperty("path") || (properties.path = getPathName()), 
        endPageViewIfInProgress(), updateSession(), splytCache.session.pageViewId = getNewTransactionId(splytCache.session.pageViewId), 
        splytCache.session.pageViewProgress = 0, Splyt.Instrumentation.beginTransaction("pageView", opts.sessionTimeoutMinutes, properties, null, splytCache.session.pageViewId), 
        splytCache.session.pageViewInProgress = !0, updateSplytCache());
    }, pub.updatePageView = function(properties) {
        "use strict";
        pub.hasStarted() && (!splytCache.session.isExpiredOrInvalid() && splytCache.session.pageViewProgress < 99 ? (splytCache.session.pageViewProgress += 1, 
        Splyt.Instrumentation.updateTransaction("pageView", splytCache.session.pageViewProgress, properties, null, splytCache.session.pageViewId)) : pub.beginPageView(properties), 
        updateSplytCache());
    }, pub;
}();

var Splyt_Charts = {
    render: function(div, id, from, to, options) {
        if (Visualization) {
            var v = new Visualization(), chart = v.create("highchart", div, {});
            chart.showLoading();
            var obj = Splyt.xhrObj("xvault", Splyt.TOOLS, void 0, [ id, from, to ]);
            obj.success = function(ssf) {
                var info = ssf.data.info;
                info.sort = info.plotconfig.params.sort, info.numberStyle = info.yformat || "int", 
                info.xaxis = info.xformat, info.caption = info.infoformat;
                var seriesObj = new Series(ssf.data.series);
                seriesObj.applyTransforms(), chart.destroy(), chart = v.create("highchart", div, info), 
                chart.addSeries(seriesObj, info.type);
            }, Splyt.xhr(obj);
        }
    }
};

Splyt.Charts = Splyt_Charts;