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

!function() {
    function r(a, b) {
        var c;
        a || (a = {});
        for (c in b) a[c] = b[c];
        return a;
    }
    function w() {
        var a, c, b = arguments, d = {}, e = function(a, b) {
            var c, d;
            "object" != typeof a && (a = {});
            for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && "object" == typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" != typeof c.nodeType ? e(a[d] || {}, c) : b[d]);
            return a;
        };
        for (b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2)), c = b.length, 
        a = 0; c > a; a++) d = e(d, b[a]);
        return d;
    }
    function y(a, b) {
        return parseInt(a, b || 10);
    }
    function Ga(a) {
        return "string" == typeof a;
    }
    function da(a) {
        return a && "object" == typeof a;
    }
    function Ha(a) {
        return "[object Array]" === Object.prototype.toString.call(a);
    }
    function ja(a) {
        return "number" == typeof a;
    }
    function za(a) {
        return V.log(a) / V.LN10;
    }
    function ka(a) {
        return V.pow(10, a);
    }
    function la(a, b) {
        for (var c = a.length; c--; ) if (a[c] === b) {
            a.splice(c, 1);
            break;
        }
    }
    function s(a) {
        return a !== u && null !== a;
    }
    function F(a, b, c) {
        var d, e;
        if (Ga(b)) s(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (s(b) && da(b)) for (d in b) a.setAttribute(d, b[d]);
        return e;
    }
    function ra(a) {
        return Ha(a) ? a : [ a ];
    }
    function p() {
        var b, c, a = arguments, d = a.length;
        for (b = 0; d > b; b++) if (c = a[b], c !== u && null !== c) return c;
    }
    function B(a, b) {
        Aa && !ba && b && b.opacity !== u && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"), 
        r(a.style, b);
    }
    function $(a, b, c, d, e) {
        return a = x.createElement(a), b && r(a, b), e && B(a, {
            padding: 0,
            border: P,
            margin: 0
        }), c && B(a, c), d && d.appendChild(a), a;
    }
    function ma(a, b) {
        var c = function() {
            return u;
        };
        return c.prototype = new a(), r(c.prototype, b), c;
    }
    function Ba(a, b, c, d) {
        var e = K.numberFormat, f = E.lang, g = +a || 0, h = -1 === b ? (g.toString().split(".")[1] || "").length : isNaN(b = Q(b)) ? 2 : b, i = void 0 === c ? f.decimalPoint : c, f = void 0 === d ? f.thousandsSep : d, j = 0 > g ? "-" : "", k = String(y(g = Q(g).toFixed(h))), l = k.length > 3 ? k.length % 3 : 0;
        return e !== Ba ? e(a, b, c, d) : j + (l ? k.substr(0, l) + f : "") + k.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + f) + (h ? i + Q(g - k).toFixed(h).slice(2) : "");
    }
    function Ia(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a;
    }
    function Na(a, b, c) {
        var d = a[b];
        a[b] = function() {
            var a = Array.prototype.slice.call(arguments);
            return a.unshift(d), c.apply(this, a);
        };
    }
    function Ja(a, b) {
        for (var e, f, g, h, i, c = "{", d = !1, j = []; -1 !== (c = a.indexOf(c)); ) {
            if (e = a.slice(0, c), d) {
                for (f = e.split(":"), g = f.shift().split("."), i = g.length, e = b, h = 0; i > h; h++) e = e[g[h]];
                f.length && (f = f.join(":"), g = /\.([0-9])/, h = E.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, 
                null !== e && (e = Ba(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : ""))) : e = cb(f, e));
            }
            j.push(e), a = a.slice(c + 1), c = (d = !d) ? "}" : "{";
        }
        return j.push(a), j.join("");
    }
    function mb(a) {
        return V.pow(10, U(V.log(a) / V.LN10));
    }
    function nb(a, b, c, d) {
        var e, c = p(c, 1);
        for (e = a / c, b || (b = [ 1, 2, 2.5, 5, 10 ], d === !1 && (1 === c ? b = [ 1, 2, 5, 10 ] : .1 >= c && (b = [ 1 / c ]))), 
        d = 0; d < b.length && (a = b[d], !(e <= (b[d] + (b[d + 1] || b[d])) / 2)); d++) ;
        return a *= c;
    }
    function ob(a, b) {
        var d, e, c = a.length;
        for (e = 0; c > e; e++) a[e].ss_i = e;
        for (a.sort(function(a, c) {
            return d = b(a, c), 0 === d ? a.ss_i - c.ss_i : d;
        }), e = 0; c > e; e++) delete a[e].ss_i;
    }
    function Oa(a) {
        for (var b = a.length, c = a[0]; b--; ) a[b] < c && (c = a[b]);
        return c;
    }
    function Ca(a) {
        for (var b = a.length, c = a[0]; b--; ) a[b] > c && (c = a[b]);
        return c;
    }
    function Pa(a, b) {
        for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
    }
    function Qa(a) {
        db || (db = $(Ka)), a && db.appendChild(a), db.innerHTML = "";
    }
    function ea(a) {
        return parseFloat(a.toPrecision(14));
    }
    function Ra(a, b) {
        va = p(a, b.animation);
    }
    function Bb() {
        var a = E.global.useUTC, b = a ? "getUTC" : "get", c = a ? "setUTC" : "set";
        Da = E.global.Date || window.Date, Sa = 6e4 * (a && E.global.timezoneOffset || 0), 
        eb = a ? Da.UTC : function(a, b, c, g, h, i) {
            return new Da(a, b, p(c, 1), p(g, 0), p(h, 0), p(i, 0)).getTime();
        }, pb = b + "Minutes", qb = b + "Hours", rb = b + "Day", Xa = b + "Date", fb = b + "Month", 
        gb = b + "FullYear", Cb = c + "Minutes", Db = c + "Hours", sb = c + "Date", Eb = c + "Month", 
        Fb = c + "FullYear";
    }
    function S() {}
    function Ta(a, b, c, d) {
        this.axis = a, this.pos = b, this.type = c || "", this.isNew = !0, !c && !d && this.addLabel();
    }
    function na() {
        this.init.apply(this, arguments);
    }
    function Ya() {
        this.init.apply(this, arguments);
    }
    function Gb(a, b, c, d, e) {
        var f = a.chart.inverted;
        this.axis = a, this.isNegative = c, this.options = b, this.x = d, this.total = null, 
        this.points = {}, this.stack = e, this.alignOptions = {
            align: b.align || (f ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
            y: p(b.y, f ? 4 : c ? 14 : -6),
            x: p(b.x, f ? c ? -6 : 6 : 0)
        }, this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center");
    }
    var u, Za, $a, db, E, cb, va, vb, A, ha, Da, eb, Sa, pb, qb, rb, Xa, fb, gb, Cb, Db, sb, Eb, Fb, K, x = document, G = window, V = Math, v = V.round, U = V.floor, La = V.ceil, t = V.max, L = V.min, Q = V.abs, aa = V.cos, fa = V.sin, oa = V.PI, Ea = 2 * oa / 360, wa = navigator.userAgent, Hb = G.opera, Aa = /msie/i.test(wa) && !Hb, hb = 8 === x.documentMode, tb = /AppleWebKit/.test(wa), Ua = /Firefox/.test(wa), Ib = /(Mobile|Android|Windows Phone)/.test(wa), xa = "http://www.w3.org/2000/svg", ba = !!x.createElementNS && !!x.createElementNS(xa, "svg").createSVGRect, Ob = Ua && parseInt(wa.split("Firefox/")[1], 10) < 4, ga = !ba && !Aa && !!x.createElement("canvas").getContext, Jb = {}, ub = 0, sa = function() {
        return u;
    }, W = [], ab = 0, Ka = "div", P = "none", Pb = /^[0-9]+$/, Qb = "stroke-width", H = {};
    G.Highcharts ? ha(16, !0) : K = G.Highcharts = {}, cb = function(a, b, c) {
        if (!s(b) || isNaN(b)) return "Invalid date";
        var e, a = p(a, "%Y-%m-%d %H:%M:%S"), d = new Da(b - Sa), f = d[qb](), g = d[rb](), h = d[Xa](), i = d[fb](), j = d[gb](), k = E.lang, l = k.weekdays, d = r({
            a: l[g].substr(0, 3),
            A: l[g],
            d: Ia(h),
            e: h,
            b: k.shortMonths[i],
            B: k.months[i],
            m: Ia(i + 1),
            y: j.toString().substr(2, 2),
            Y: j,
            H: Ia(f),
            I: Ia(f % 12 || 12),
            l: f % 12 || 12,
            M: Ia(d[pb]()),
            p: 12 > f ? "AM" : "PM",
            P: 12 > f ? "am" : "pm",
            S: Ia(d.getSeconds()),
            L: Ia(v(b % 1e3), 3)
        }, K.dateFormats);
        for (e in d) for (;-1 !== a.indexOf("%" + e); ) a = a.replace("%" + e, "function" == typeof d[e] ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
    }, ha = function(a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b) throw c;
        G.console && console.log(c);
    }, A = {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 26784e5,
        year: 31556952e3
    }, vb = {
        init: function(a, b, c) {
            var g, h, i, b = b || "", d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 : 3, b = b.split(" "), c = [].concat(c), j = function(a) {
                for (g = a.length; g--; ) "M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
            };
            if (e && (j(b), j(c)), a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6)), 
            d <= c.length / f && b.length === c.length) for (;d--; ) c = [].concat(c).splice(0, f).concat(c);
            if (a.shift = 0, b.length) for (a = c.length; b.length < a; ) d = [].concat(b).splice(b.length - f, f), 
            e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            return h && (b = b.concat(h), c = c.concat(i)), [ b, c ];
        },
        step: function(a, b, c, d) {
            var e = [], f = a.length;
            if (1 === c) e = d; else if (f === b.length && 1 > c) for (;f--; ) d = parseFloat(a[f]), 
            e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b;
            return e;
        }
    }, function(a) {
        G.HighchartsAdapter = G.HighchartsAdapter || a && {
            init: function(b) {
                var c = a.fx;
                a.extend(a.easing, {
                    easeOutQuad: function(a, b, c, g, h) {
                        return -g * (b /= h) * (b - 2) + c;
                    }
                }), a.each([ "cur", "_default", "width", "height", "opacity" ], function(b, e) {
                    var g, f = c.step;
                    "cur" === e ? f = c.prototype : "_default" === e && a.Tween && (f = a.Tween.propHooks[e], 
                    e = "set"), (g = f[e]) && (f[e] = function(a) {
                        var c, a = b ? a : this;
                        return "align" !== a.prop ? (c = a.elem, c.attr ? c.attr(a.prop, "cur" === e ? u : a.now) : g.apply(this, arguments)) : void 0;
                    });
                }), Na(a.cssHooks.opacity, "get", function(a, b, c) {
                    return b.attr ? b.opacity || 0 : a.call(this, b, c);
                }), this.addAnimSetter("d", function(a) {
                    var f, c = a.elem;
                    a.started || (f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0), 
                    c.attr("d", b.step(a.start, a.end, a.pos, c.toD));
                }), this.each = Array.prototype.forEach ? function(a, b) {
                    return Array.prototype.forEach.call(a, b);
                } : function(a, b) {
                    var c, g = a.length;
                    for (c = 0; g > c; c++) if (b.call(a[c], a[c], c, a) === !1) return c;
                }, a.fn.highcharts = function() {
                    var c, g, a = "Chart", b = arguments;
                    return this[0] && (Ga(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), 
                    c = b[0], c !== u && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new K[a](c, b[1]), 
                    g = this), c === u && (g = W[F(this[0], "data-highcharts-chart")])), g;
                };
            },
            addAnimSetter: function(b, c) {
                a.Tween ? a.Tween.propHooks[b] = {
                    set: c
                } : a.fx.step[b] = c;
            },
            getScript: a.getScript,
            inArray: a.inArray,
            adapterRun: function(b, c) {
                return a(b)[c]();
            },
            grep: a.grep,
            map: function(a, c) {
                for (var d = [], e = 0, f = a.length; f > e; e++) d[e] = c.call(a[e], a[e], e, a);
                return d;
            },
            offset: function(b) {
                return a(b).offset();
            },
            addEvent: function(b, c, d) {
                a(b).bind(c, d);
            },
            removeEvent: function(b, c, d) {
                var e = x.removeEventListener ? "removeEventListener" : "detachEvent";
                x[e] && b && !b[e] && (b[e] = function() {}), a(b).unbind(c, d);
            },
            fireEvent: function(b, c, d, e) {
                var h, f = a.Event(c), g = "detached" + c;
                !Aa && d && (delete d.layerX, delete d.layerY, delete d.returnValue), r(f, d), b[c] && (b[g] = b[c], 
                b[c] = null), a.each([ "preventDefault", "stopPropagation" ], function(a, b) {
                    var c = f[b];
                    f[b] = function() {
                        try {
                            c.call(f);
                        } catch (a) {
                            "preventDefault" === b && (h = !0);
                        }
                    };
                }), a(b).trigger(f), b[g] && (b[c] = b[g], b[g] = null), e && !f.isDefaultPrevented() && !h && e(f);
            },
            washMouseEvent: function(a) {
                var c = a.originalEvent || a;
                return c.pageX === u && (c.pageX = a.pageX, c.pageY = a.pageY), c;
            },
            animate: function(b, c, d) {
                var e = a(b);
                b.style || (b.style = {}), c.d && (b.toD = c.d, c.d = 1), e.stop(), c.opacity !== u && b.attr && (c.opacity += "px"), 
                b.hasAnim = 1, e.animate(c, d);
            },
            stop: function(b) {
                b.hasAnim && a(b).stop();
            }
        };
    }(G.jQuery);
    var T = G.HighchartsAdapter, M = T || {};
    T && T.init.call(T, vb);
    var ib = M.adapterRun, Rb = M.getScript, Ma = M.inArray, q = M.each, wb = M.grep, Sb = M.offset, Va = M.map, N = M.addEvent, X = M.removeEvent, I = M.fireEvent, Tb = M.washMouseEvent, jb = M.animate, bb = M.stop, M = {
        enabled: !0,
        x: 0,
        y: 15,
        style: {
            color: "#606060",
            cursor: "default",
            fontSize: "11px"
        }
    };
    E = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: [ "circle", "diamond", "square", "triangle", "triangle-down" ],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/4.0.4/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/4.0.4/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [ 10, 10, 15, 10 ],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: w(M, {
                    align: "center",
                    enabled: !1,
                    formatter: function() {
                        return null === this.y ? "" : Ba(this.y, -1);
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name;
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: ba,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Ib ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var ca = E.plotOptions, T = ca.line;
    Bb();
    var Ub = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, Vb = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, Wb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, ya = function(a) {
        var c, d, b = [];
        return function(a) {
            a && a.stops ? d = Va(a.stops, function(a) {
                return ya(a[1]);
            }) : (c = Ub.exec(a)) ? b = [ y(c[1]), y(c[2]), y(c[3]), parseFloat(c[4], 10) ] : (c = Vb.exec(a)) ? b = [ y(c[1], 16), y(c[2], 16), y(c[3], 16), 1 ] : (c = Wb.exec(a)) && (b = [ y(c[1]), y(c[2]), y(c[3]), 1 ]);
        }(a), {
            get: function(c) {
                var f;
                return d ? (f = w(a), f.stops = [].concat(f.stops), q(d, function(a, b) {
                    f.stops[b] = [ f.stops[b][0], a.get(c) ];
                })) : f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : "a" === c ? b[3] : "rgba(" + b.join(",") + ")" : a, 
                f;
            },
            brighten: function(a) {
                if (d) q(d, function(b) {
                    b.brighten(a);
                }); else if (ja(a) && 0 !== a) {
                    var c;
                    for (c = 0; 3 > c; c++) b[c] += y(255 * a), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255);
                }
                return this;
            },
            rgba: b,
            setOpacity: function(a) {
                return b[3] = a, this;
            }
        };
    };
    S.prototype = {
        opacity: 1,
        textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
        init: function(a, b) {
            this.element = "span" === b ? $(b) : x.createElementNS(xa, b), this.renderer = a;
        },
        animate: function(a, b, c) {
            return b = p(b, va, !0), bb(this), b ? (b = w(b, {}), c && (b.complete = c), jb(this, a, b)) : (this.attr(a), 
            c && c()), this;
        },
        colorGradient: function(a, b, c) {
            var e, f, g, h, i, j, k, l, n, m, d = this.renderer, o = [];
            if (a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient"), 
            f) {
                g = a[f], h = d.gradients, j = a.stops, n = c.radialReference, Ha(g) && (a[f] = g = {
                    x1: g[0],
                    y1: g[1],
                    x2: g[2],
                    y2: g[3],
                    gradientUnits: "userSpaceOnUse"
                }), "radialGradient" === f && n && !s(g.gradientUnits) && (g = w(g, {
                    cx: n[0] - n[2] / 2 + g.cx * n[2],
                    cy: n[1] - n[2] / 2 + g.cy * n[2],
                    r: g.r * n[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (m in g) "id" !== m && o.push(m, g[m]);
                for (m in j) o.push(j[m]);
                o = o.join(","), h[o] ? a = h[o].attr("id") : (g.id = a = "highcharts-" + ub++, 
                h[o] = i = d.createElement(f).attr(g).add(d.defs), i.stops = [], q(j, function(a) {
                    0 === a[1].indexOf("rgba") ? (e = ya(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], 
                    l = 1), a = d.createElement("stop").attr({
                        offset: a[0],
                        "stop-color": k,
                        "stop-opacity": l
                    }).add(i), i.stops.push(a);
                })), c.setAttribute(b, "url(" + d.url + "#" + a + ")");
            }
        },
        attr: function(a, b) {
            var c, d, f, h, e = this.element, g = this;
            if ("string" == typeof a && b !== u && (c = a, a = {}, a[c] = b), "string" == typeof a) g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
                for (c in a) d = a[c], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (f || (this.symbolAttr(a), 
                f = !0), h = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), 
                h || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d);
                this.doTransform && (this.updateTransform(), this.doTransform = !1);
            }
            return g;
        },
        updateShadows: function(a, b) {
            for (var c = this.shadows, d = c.length; d--; ) c[d].setAttribute(a, "height" === a ? t(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b);
        },
        addClass: function(a) {
            var b = this.element, c = F(b, "class") || "";
            return -1 === c.indexOf(a) && F(b, "class", c + " " + a), this;
        },
        symbolAttr: function(a) {
            var b = this;
            q("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
                b[c] = p(a[c], b[c]);
            }), b.attr({
                d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
            });
        },
        clip: function(a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : P);
        },
        crisp: function(a) {
            var b, d, c = {}, e = a.strokeWidth || this.strokeWidth || 0;
            d = v(e) % 2 / 2, a.x = U(a.x || this.x || 0) + d, a.y = U(a.y || this.y || 0) + d, 
            a.width = U((a.width || this.width || 0) - 2 * d), a.height = U((a.height || this.height || 0) - 2 * d), 
            a.strokeWidth = e;
            for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c;
        },
        css: function(a) {
            var e, f, b = this.styles, c = {}, d = this.element, g = "";
            if (e = !b, a && a.color && (a.fill = a.color), b) for (f in a) a[f] !== b[f] && (c[f] = a[f], 
            e = !0);
            if (e) {
                if (e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() && y(a.width), 
                b && (a = r(b, c)), this.styles = a, e && (ga || !ba && this.renderer.forExport) && delete a.width, 
                Aa && !ba) B(this.element, a); else {
                    b = function(a, b) {
                        return "-" + b.toLowerCase();
                    };
                    for (f in a) g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    F(d, "style", g);
                }
                e && this.added && this.renderer.buildText(this);
            }
            return this;
        },
        on: function(a, b) {
            var c = this, d = c.element;
            return $a && "click" === a ? (d.ontouchstart = function(a) {
                c.touchEventFired = Da.now(), a.preventDefault(), b.call(d, a);
            }, d.onclick = function(a) {
                (-1 === wa.indexOf("Android") || Da.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a);
            }) : d["on" + a] = b, this;
        },
        setRadialReference: function(a) {
            return this.element.radialReference = a, this;
        },
        translate: function(a, b) {
            return this.attr({
                translateX: a,
                translateY: b
            });
        },
        invert: function() {
            return this.inverted = !0, this.updateTransform(), this;
        },
        updateTransform: function() {
            var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element;
            e && (a += this.attr("width"), b += this.attr("height")), a = [ "translate(" + a + "," + b + ")" ], 
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"), 
            (s(c) || s(d)) && a.push("scale(" + p(c, 1) + " " + p(d, 1) + ")"), a.length && g.setAttribute("transform", a.join(" "));
        },
        toFront: function() {
            var a = this.element;
            return a.parentNode.appendChild(a), this;
        },
        align: function(a, b, c) {
            var d, e, f, g, h = {};
            return e = this.renderer, f = e.alignedObjects, a ? (this.alignOptions = a, this.alignByTranslate = b, 
            (!c || Ga(c)) && (this.alignTo = d = c || "renderer", la(f, this), f.push(this), 
            c = null)) : (a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo), 
            c = p(c, e[d], e), d = a.align, e = a.verticalAlign, f = (c.x || 0) + (a.x || 0), 
            g = (c.y || 0) + (a.y || 0), ("right" === d || "center" === d) && (f += (c.width - (a.width || 0)) / {
                right: 1,
                center: 2
            }[d]), h[b ? "translateX" : "x"] = v(f), ("bottom" === e || "middle" === e) && (g += (c.height - (a.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[e] || 1)), h[b ? "translateY" : "y"] = v(g), this[this.placed ? "animate" : "attr"](h), 
            this.placed = !0, this.alignAttr = h, this;
        },
        getBBox: function() {
            var c, d, a = this.bBox, b = this.renderer, e = this.rotation;
            c = this.element;
            var f = this.styles, g = e * Ea;
            d = this.textStr;
            var h;
            if (("" === d || Pb.test(d)) && (h = "num." + d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily : "")), 
            h && (a = b.cache[h]), !a) {
                if (c.namespaceURI === xa || b.forExport) {
                    try {
                        a = c.getBBox ? r({}, c.getBBox()) : {
                            width: c.offsetWidth,
                            height: c.offsetHeight
                        };
                    } catch (i) {}
                    (!a || a.width < 0) && (a = {
                        width: 0,
                        height: 0
                    });
                } else a = this.htmlGetBBox();
                b.isSVG && (c = a.width, d = a.height, Aa && f && "11px" === f.fontSize && "16.9" === d.toPrecision(3) && (a.height = d = 14), 
                e && (a.width = Q(d * fa(g)) + Q(c * aa(g)), a.height = Q(d * aa(g)) + Q(c * fa(g)))), 
                this.bBox = a, h && (b.cache[h] = a);
            }
            return a;
        },
        show: function(a) {
            return a && this.element.namespaceURI === xa ? this.element.removeAttribute("visibility") : this.attr({
                visibility: a ? "inherit" : "visible"
            }), this;
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            });
        },
        fadeOut: function(a) {
            var b = this;
            b.animate({
                opacity: 0
            }, {
                duration: a || 150,
                complete: function() {
                    b.attr({
                        y: -9999
                    });
                }
            });
        },
        add: function(a) {
            var g, h, b = this.renderer, c = a || b, d = c.element || b.box, e = this.element, f = this.zIndex;
            if (a && (this.parentGroup = a), this.parentInverted = a && a.inverted, void 0 !== this.textStr && b.buildText(this), 
            f && (c.handleZ = !0, f = y(f)), c.handleZ) for (a = d.childNodes, g = 0; g < a.length; g++) if (b = a[g], 
            c = F(b, "zIndex"), b !== e && (y(c) > f || !s(f) && s(c))) {
                d.insertBefore(e, b), h = !0;
                break;
            }
            return h || d.appendChild(e), this.added = !0, this.onAdd && this.onAdd(), this;
        },
        safeRemoveChild: function(a) {
            var b = a.parentNode;
            b && b.removeChild(a);
        },
        destroy: function() {
            var e, f, a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup;
            if (b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null, bb(a), 
            a.clipPath && (a.clipPath = a.clipPath.destroy()), a.stops) {
                for (f = 0; f < a.stops.length; f++) a.stops[f] = a.stops[f].destroy();
                a.stops = null;
            }
            for (a.safeRemoveChild(b), c && q(c, function(b) {
                a.safeRemoveChild(b);
            }); d && d.div && 0 === d.div.childNodes.length; ) b = d.parentGroup, a.safeRemoveChild(d.div), 
            delete d.div, d = b;
            a.alignTo && la(a.renderer.alignedObjects, a);
            for (e in a) delete a[e];
            return null;
        },
        shadow: function(a, b, c) {
            var e, f, h, i, j, k, d = [], g = this.element;
            if (a) {
                for (i = p(a.width, 3), j = (a.opacity || .15) / i, k = this.parentInverted ? "(-1,-1)" : "(" + p(a.offsetX, 1) + ", " + p(a.offsetY, 1) + ")", 
                e = 1; i >= e; e++) f = g.cloneNode(0), h = 2 * i + 1 - 2 * e, F(f, {
                    isShadow: "true",
                    stroke: a.color || "black",
                    "stroke-opacity": j * e,
                    "stroke-width": h,
                    transform: "translate" + k,
                    fill: P
                }), c && (F(f, "height", t(F(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g), 
                d.push(f);
                this.shadows = d;
            }
            return this;
        },
        xGetter: function(a) {
            return "circle" === this.element.nodeName && (a = {
                x: "cx",
                y: "cy"
            }[a] || a), this._defaultGetter(a);
        },
        _defaultGetter: function(a) {
            return a = p(this[a], this.element ? this.element.getAttribute(a) : null, 0), /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)), 
            a;
        },
        dSetter: function(a, b, c) {
            a && a.join && (a = a.join(" ")), /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"), c.setAttribute(b, a), 
            this[b] = a;
        },
        dashstyleSetter: function(a) {
            var b;
            if (a = a && a.toLowerCase()) {
                for (a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), 
                b = a.length; b--; ) a[b] = y(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none"), this.element.setAttribute("stroke-dasharray", a);
            }
        },
        alignSetter: function(a) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[a]);
        },
        opacitySetter: function(a, b, c) {
            this[b] = a, c.setAttribute(b, a);
        },
        titleSetter: function(a) {
            var b = this.element.getElementsByTagName("title")[0];
            b || (b = x.createElementNS(xa, "title"), this.element.appendChild(b)), b.textContent = p(a, "").replace(/<[^>]*>/g, "");
        },
        textSetter: function(a) {
            a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
        },
        fillSetter: function(a, b, c) {
            "string" == typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c);
        },
        zIndexSetter: function(a, b, c) {
            c.setAttribute(b, a), this[b] = a;
        },
        _defaultSetter: function(a, b, c) {
            c.setAttribute(b, a);
        }
    }, S.prototype.yGetter = S.prototype.xGetter, S.prototype.translateXSetter = S.prototype.translateYSetter = S.prototype.rotationSetter = S.prototype.verticalAlignSetter = S.prototype.scaleXSetter = S.prototype.scaleYSetter = function(a, b) {
        this[b] = a, this.doTransform = !0;
    }, S.prototype["stroke-widthSetter"] = S.prototype.strokeSetter = function(a, b, c) {
        this[b] = a, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], 
        S.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), 
        this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), 
        this.hasStroke = !1);
    };
    var ta = function() {
        this.init.apply(this, arguments);
    };
    ta.prototype = {
        Element: S,
        init: function(a, b, c, d, e) {
            var g, f = location, d = this.createElement("svg").attr({
                version: "1.1"
            }).css(this.getStyle(d));
            g = d.element, a.appendChild(g), -1 === a.innerHTML.indexOf("xmlns") && F(g, "xmlns", xa), 
            this.isSVG = !0, this.box = g, this.boxWrapper = d, this.alignedObjects = [], this.url = (Ua || tb) && x.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", 
            this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highcharts 4.0.4")), 
            this.defs = this.createElement("defs").add(), this.forExport = e, this.gradients = {}, 
            this.cache = {}, this.setSize(b, c, !1);
            var h;
            Ua && a.getBoundingClientRect && (this.subPixelFix = b = function() {
                B(a, {
                    left: 0,
                    top: 0
                }), h = a.getBoundingClientRect(), B(a, {
                    left: La(h.left) - h.left + "px",
                    top: La(h.top) - h.top + "px"
                });
            }, b(), N(G, "resize", b));
        },
        getStyle: function(a) {
            return this.style = r({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a);
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width;
        },
        destroy: function() {
            var a = this.defs;
            return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), Pa(this.gradients || {}), 
            this.gradients = null, a && (this.defs = a.destroy()), this.subPixelFix && X(G, "resize", this.subPixelFix), 
            this.alignedObjects = null;
        },
        createElement: function(a) {
            var b = new this.Element();
            return b.init(this, a), b;
        },
        draw: function() {},
        buildText: function(a) {
            for (var h, i, b = a.element, c = this, d = c.forExport, e = p(a.textStr, "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, j = F(b, "x"), k = a.styles, l = a.textWidth, n = k && k.lineHeight, m = k && k.HcTextStroke, o = g.length, Y = function(a) {
                return n ? y(n) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : k && k.fontSize || c.style.fontSize || 12, a).h;
            }; o--; ) b.removeChild(g[o]);
            f || m || -1 !== e.indexOf(" ") ? (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, 
            l && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [ e ], 
            "" === e[e.length - 1] && e.pop(), q(e, function(e, f) {
                var g, n = 0, e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||"), q(g, function(e) {
                    if ("" !== e || 1 === g.length) {
                        var p, m = {}, o = x.createElementNS(xa, "tspan");
                        if (h.test(e) && (p = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), F(o, "style", p)), 
                        i.test(e) && !d && (F(o, "onclick", 'location.href="' + e.match(i)[1] + '"'), B(o, {
                            cursor: "pointer"
                        })), e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), 
                        " " !== e) {
                            if (o.appendChild(x.createTextNode(e)), n ? m.dx = 0 : f && null !== j && (m.x = j), 
                            F(o, m), b.appendChild(o), !n && f && (!ba && d && B(o, {
                                display: "block"
                            }), F(o, "dy", Y(o))), l) for (var q, D, e = e.replace(/([^\^])-/g, "$1- ").split(" "), m = g.length > 1 || e.length > 1 && "nowrap" !== k.whiteSpace, s = k.HcHeight, t = [], u = Y(o), Lb = 1; m && (e.length || t.length); ) delete a.bBox, 
                            q = a.getBBox(), D = q.width, !ba && c.forExport && (D = c.measureSpanWidth(o.firstChild.data, a.styles)), 
                            q = D > l, q && 1 !== e.length ? (o.removeChild(o.firstChild), t.unshift(e.pop())) : (e = t, 
                            t = [], e.length && (Lb++, s && Lb * u > s ? (e = [ "..." ], a.attr("title", a.textStr)) : (o = x.createElementNS(xa, "tspan"), 
                            F(o, {
                                dy: u,
                                x: j
                            }), p && F(o, "style", p), b.appendChild(o))), D > l && (l = D)), e.length && o.appendChild(x.createTextNode(e.join(" ").replace(/- /g, "-")));
                            n++;
                        }
                    }
                });
            })) : b.appendChild(x.createTextNode(e));
        },
        button: function(a, b, c, d, e, f, g, h, i) {
            var l, n, m, o, p, q, j = this.label(a, b, c, i, null, null, null, null, "button"), k = 0, a = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }, e = w({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {
                    linearGradient: a,
                    stops: [ [ 0, "#FEFEFE" ], [ 1, "#F6F6F6" ] ]
                },
                r: 2,
                padding: 5,
                style: {
                    color: "black"
                }
            }, e);
            return m = e.style, delete e.style, f = w(e, {
                stroke: "#68A",
                fill: {
                    linearGradient: a,
                    stops: [ [ 0, "#FFF" ], [ 1, "#ACF" ] ]
                }
            }, f), o = f.style, delete f.style, g = w(e, {
                stroke: "#68A",
                fill: {
                    linearGradient: a,
                    stops: [ [ 0, "#9BD" ], [ 1, "#CDF" ] ]
                }
            }, g), p = g.style, delete g.style, h = w(e, {
                style: {
                    color: "#CCC"
                }
            }, h), q = h.style, delete h.style, N(j.element, Aa ? "mouseover" : "mouseenter", function() {
                3 !== k && j.attr(f).css(o);
            }), N(j.element, Aa ? "mouseout" : "mouseleave", function() {
                3 !== k && (l = [ e, f, g ][k], n = [ m, o, p ][k], j.attr(l).css(n));
            }), j.setState = function(a) {
                (j.state = k = a) ? 2 === a ? j.attr(g).css(p) : 3 === a && j.attr(h).css(q) : j.attr(e).css(m);
            }, j.on("click", function() {
                3 !== k && d.call(j);
            }).attr(e).css(r({
                cursor: "default"
            }, m));
        },
        crispLine: function(a, b) {
            return a[1] === a[4] && (a[1] = a[4] = v(a[1]) - b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = v(a[2]) + b % 2 / 2), 
            a;
        },
        path: function(a) {
            var b = {
                fill: P
            };
            return Ha(a) ? b.d = a : da(a) && r(b, a), this.createElement("path").attr(b);
        },
        circle: function(a, b, c) {
            return a = da(a) ? a : {
                x: a,
                y: b,
                r: c
            }, b = this.createElement("circle"), b.xSetter = function(a) {
                this.element.setAttribute("cx", a);
            }, b.ySetter = function(a) {
                this.element.setAttribute("cy", a);
            }, b.attr(a);
        },
        arc: function(a, b, c, d, e, f) {
            return da(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x), 
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
                innerR: d || 0,
                start: e || 0,
                end: f || 0
            }), a.r = c, a;
        },
        rect: function(a, b, c, d, e, f) {
            var e = da(a) ? a.r : e, g = this.createElement("rect"), a = da(a) ? a : a === u ? {} : {
                x: a,
                y: b,
                width: t(c, 0),
                height: t(d, 0)
            };
            return f !== u && (a.strokeWidth = f, a = g.crisp(a)), e && (a.r = e), g.rSetter = function(a) {
                F(this.element, {
                    rx: a,
                    ry: a
                });
            }, g.attr(a);
        },
        setSize: function(a, b, c) {
            var d = this.alignedObjects, e = d.length;
            for (this.width = a, this.height = b, this.boxWrapper[p(c, !0) ? "animate" : "attr"]({
                width: a,
                height: b
            }); e--; ) d[e].align();
        },
        g: function(a) {
            var b = this.createElement("g");
            return s(a) ? b.attr({
                "class": "highcharts-" + a
            }) : b;
        },
        image: function(a, b, c, d, e) {
            var f = {
                preserveAspectRatio: P
            };
            return arguments.length > 1 && r(f, {
                x: b,
                y: c,
                width: d,
                height: e
            }), f = this.createElement("image").attr(f), f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a), 
            f;
        },
        symbol: function(a, b, c, d, e, f) {
            var g, j, k, h = this.symbols[a], h = h && h(v(b), v(c), d, e, f), i = /^url\((.*?)\)$/;
            return h ? (g = this.path(h), r(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && r(g, f)) : i.test(a) && (k = function(a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(v((d - b[0]) / 2), v((e - b[1]) / 2)));
            }, j = a.match(i)[1], a = Jb[j] || f && f.width && f.height && [ f.width, f.height ], 
            g = this.image(j).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? k(g, a) : (g.attr({
                width: 0,
                height: 0
            }), $("img", {
                onload: function() {
                    k(g, Jb[j] = [ this.width, this.height ]);
                },
                src: j
            }))), g;
        },
        symbols: {
            circle: function(a, b, c, d) {
                var e = .166 * c;
                return [ "M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z" ];
            },
            square: function(a, b, c, d) {
                return [ "M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z" ];
            },
            triangle: function(a, b, c, d) {
                return [ "M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z" ];
            },
            "triangle-down": function(a, b, c, d) {
                return [ "M", a, b, "L", a + c, b, a + c / 2, b + d, "Z" ];
            },
            diamond: function(a, b, c, d) {
                return [ "M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z" ];
            },
            arc: function(a, b, c, d, e) {
                var f = e.start, c = e.r || c || d, g = e.end - .001, d = e.innerR, h = e.open, i = aa(f), j = fa(f), k = aa(g), g = fa(g), e = e.end - f < oa ? 0 : 1;
                return [ "M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z" ];
            },
            callout: function(a, b, c, d, e) {
                var f = L(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX, i = e && e.anchorY, e = v(e.strokeWidth || 0) % 2 / 2;
                return a += e, b += e, e = [ "M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b ], 
                h && h > c && i > b + g && b + d - g > i ? e.splice(13, 3, "L", a + c, i - 6, a + c + 6, i, a + c, i + 6, a + c, b + d - f) : h && 0 > h && i > b + g && b + d - g > i ? e.splice(33, 3, "L", a, i + 6, a - 6, i, a, i - 6, a, b + f) : i && i > d && h > a + g && a + c - g > h ? e.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : i && 0 > i && h > a + g && a + c - g > h && e.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b), 
                e;
            }
        },
        clipRect: function(a, b, c, d) {
            var e = "highcharts-" + ub++, f = this.createElement("clipPath").attr({
                id: e
            }).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
            return a.id = e, a.clipPath = f, a;
        },
        text: function(a, b, c, d) {
            var e = ga || !ba && this.forExport, f = {};
            return d && !this.forExport ? this.html(a, b, c) : (f.x = Math.round(b || 0), c && (f.y = Math.round(c)), 
            (a || 0 === a) && (f.text = a), a = this.createElement("text").attr(f), e && a.css({
                position: "absolute"
            }), d || (a.xSetter = function(a, b, c) {
                var e, n, d = c.getElementsByTagName("tspan"), f = c.getAttribute(b);
                for (n = 0; n < d.length; n++) e = d[n], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b, a);
            }), a);
        },
        fontMetrics: function(a, b) {
            a = a || this.style.fontSize, b && G.getComputedStyle && (b = b.element || b, a = G.getComputedStyle(b, "").fontSize);
            var a = /px/.test(a) ? y(a) : /em/.test(a) ? 12 * parseFloat(a) : 12, c = 24 > a ? a + 4 : v(1.2 * a), d = v(.8 * c);
            return {
                h: c,
                b: d,
                f: a
            };
        },
        label: function(a, b, c, d, e, f, g, h, i) {
            function j() {
                var a, b;
                a = o.element.style, D = (void 0 === t || void 0 === xb || m.styles.textAlign) && o.textStr && o.getBBox(), 
                m.width = (t || D.width || 0) + 2 * C + kb, m.height = (xb || D.height || 0) + 2 * C, 
                R = C + n.fontMetrics(a && a.fontSize, o).b, y && (p || (a = v(-J * C), b = h ? -R : 0, 
                m.box = p = d ? n.symbol(d, a, b, m.width, m.height, z) : n.rect(a, b, m.width, m.height, 0, z[Qb]), 
                p.attr("fill", P).add(m)), p.isImg || p.attr(r({
                    width: v(m.width),
                    height: v(m.height)
                }, z)), z = null);
            }
            function k() {
                var c, a = m.styles, a = a && a.textAlign, b = kb + C * (1 - J);
                c = h ? 0 : R, s(t) && D && ("center" === a || "right" === a) && (b += {
                    center: .5,
                    right: 1
                }[a] * (t - D.width)), (b !== o.x || c !== o.y) && (o.attr("x", b), c !== u && o.attr("y", c)), 
                o.x = b, o.y = c;
            }
            function l(a, b) {
                p ? p.attr(a, b) : z[a] = b;
            }
            var p, D, t, xb, yb, x, R, y, n = this, m = n.g(i), o = n.text("", 0, 0, g).attr({
                zIndex: 1
            }), J = 0, C = 3, kb = 0, Kb = 0, z = {};
            m.onAdd = function() {
                o.add(m), m.attr({
                    text: a || 0 === a ? a : "",
                    x: b,
                    y: c
                }), p && s(e) && m.attr({
                    anchorX: e,
                    anchorY: f
                });
            }, m.widthSetter = function(a) {
                t = a;
            }, m.heightSetter = function(a) {
                xb = a;
            }, m.paddingSetter = function(a) {
                s(a) && a !== C && (C = a, k());
            }, m.paddingLeftSetter = function(a) {
                s(a) && a !== kb && (kb = a, k());
            }, m.alignSetter = function(a) {
                J = {
                    left: 0,
                    center: .5,
                    right: 1
                }[a];
            }, m.textSetter = function(a) {
                a !== u && o.textSetter(a), j(), k();
            }, m["stroke-widthSetter"] = function(a, b) {
                a && (y = !0), Kb = a % 2 / 2, l(b, a);
            }, m.strokeSetter = m.fillSetter = m.rSetter = function(a, b) {
                "fill" === b && a && (y = !0), l(b, a);
            }, m.anchorXSetter = function(a, b) {
                e = a, l(b, a + Kb - yb);
            }, m.anchorYSetter = function(a, b) {
                f = a, l(b, a - x);
            }, m.xSetter = function(a) {
                m.x = a, J && (a -= J * ((t || D.width) + C)), yb = v(a), m.attr("translateX", yb);
            }, m.ySetter = function(a) {
                x = m.y = v(a), m.attr("translateY", x);
            };
            var A = m.css;
            return r(m, {
                css: function(a) {
                    if (a) {
                        var b = {}, a = w(a);
                        q(m.textProps, function(c) {
                            a[c] !== u && (b[c] = a[c], delete a[c]);
                        }), o.css(b);
                    }
                    return A.call(m, a);
                },
                getBBox: function() {
                    return {
                        width: D.width + 2 * C,
                        height: D.height + 2 * C,
                        x: D.x - C,
                        y: D.y - C
                    };
                },
                shadow: function(a) {
                    return p && p.shadow(a), m;
                },
                destroy: function() {
                    X(m.element, "mouseenter"), X(m.element, "mouseleave"), o && (o = o.destroy()), 
                    p && (p = p.destroy()), S.prototype.destroy.call(m), m = n = j = k = l = null;
                }
            });
        }
    }, Za = ta, r(S.prototype, {
        htmlCss: function(a) {
            var b = this.element;
            return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width, this.textWidth = b, 
            this.updateTransform()), this.styles = r(this.styles, a), B(this.element, a), this;
        },
        htmlGetBBox: function() {
            var a = this.element, b = this.bBox;
            return b || ("text" === a.nodeName && (a.style.position = "absolute"), b = this.bBox = {
                x: a.offsetLeft,
                y: a.offsetTop,
                width: a.offsetWidth,
                height: a.offsetHeight
            }), b;
        },
        htmlUpdateTransform: function() {
            if (this.added) {
                var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = {
                    left: 0,
                    center: .5,
                    right: 1
                }[g], i = this.shadows;
                if (B(b, {
                    marginLeft: c,
                    marginTop: d
                }), i && q(i, function(a) {
                    B(a, {
                        marginLeft: c + 1,
                        marginTop: d + 1
                    });
                }), this.inverted && q(b.childNodes, function(c) {
                    a.invertChild(c, b);
                }), "SPAN" === b.tagName) {
                    var k, j = this.rotation, l = y(this.textWidth), n = [ j, g, b.innerHTML, this.textWidth ].join(",");
                    n !== this.cTT && (k = a.fontMetrics(b.style.fontSize).b, s(j) && this.setSpanRotation(j, h, k), 
                    i = p(this.elemWidth, b.offsetWidth), i > l && /[ \-]/.test(b.textContent || b.innerText) && (B(b, {
                        width: l + "px",
                        display: "block",
                        whiteSpace: "normal"
                    }), i = l), this.getSpanCorrection(i, k, h, j, g)), B(b, {
                        left: e + (this.xCorr || 0) + "px",
                        top: f + (this.yCorr || 0) + "px"
                    }), tb && (k = b.offsetHeight), this.cTT = n;
                }
            } else this.alignOnAdd = !0;
        },
        setSpanRotation: function(a, b, c) {
            var d = {}, e = Aa ? "-ms-transform" : tb ? "-webkit-transform" : Ua ? "MozTransform" : Hb ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)", d[e + (Ua ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px", 
            B(this.element, d);
        },
        getSpanCorrection: function(a, b, c) {
            this.xCorr = -a * c, this.yCorr = -b;
        }
    }), r(ta.prototype, {
        html: function(a, b, c) {
            var d = this.createElement("span"), e = d.element, f = d.renderer;
            return d.textSetter = function(a) {
                a !== e.innerHTML && delete this.bBox, e.innerHTML = this.textStr = a;
            }, d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
                "align" === b && (b = "textAlign"), d[b] = a, d.htmlUpdateTransform();
            }, d.attr({
                text: a,
                x: v(b),
                y: v(c)
            }).css({
                position: "absolute",
                whiteSpace: "nowrap",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            }), d.css = d.htmlCss, f.isSVG && (d.add = function(a) {
                var b, c = f.box.parentNode, j = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (;a; ) j.push(a), a = a.parentGroup;
                        q(j.reverse(), function(a) {
                            var d;
                            b = a.div = a.div || $(Ka, {
                                className: F(a.element, "class")
                            }, {
                                position: "absolute",
                                left: (a.translateX || 0) + "px",
                                top: (a.translateY || 0) + "px"
                            }, b || c), d = b.style, r(a, {
                                translateXSetter: function(b, c) {
                                    d.left = b + "px", a[c] = b, a.doTransform = !0;
                                },
                                translateYSetter: function(b, c) {
                                    d.top = b + "px", a[c] = b, a.doTransform = !0;
                                },
                                visibilitySetter: function(a, b) {
                                    d[b] = a;
                                }
                            });
                        });
                    }
                } else b = c;
                return b.appendChild(e), d.added = !0, d.alignOnAdd && d.htmlUpdateTransform(), 
                d;
            }), d;
        }
    });
    var Z;
    if (!ba && !ga) {
        Z = {
            init: function(a, b) {
                var c = [ "<", b, ' filled="f" stroked="f"' ], d = [ "position: ", "absolute", ";" ], e = b === Ka;
                ("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;"), d.push("visibility: ", e ? "hidden" : "visible"), 
                c.push(' style="', d.join(""), '"/>'), b && (c = e || "span" === b || "img" === b ? c.join("") : a.prepVML(c), 
                this.element = $(c)), this.renderer = a;
            },
            add: function(a) {
                var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a : d;
                return a && a.inverted && b.invertChild(c, d), d.appendChild(c), this.added = !0, 
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), 
                this;
            },
            updateTransform: S.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation, b = aa(a * Ea), c = fa(a * Ea);
                B(this.element, {
                    filter: a ? [ "progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')" ].join("") : P
                });
            },
            getSpanCorrection: function(a, b, c, d, e) {
                var i, f = d ? aa(d * Ea) : 1, g = d ? fa(d * Ea) : 0, h = p(this.elemHeight, this.element.offsetHeight);
                this.xCorr = 0 > f && -a, this.yCorr = 0 > g && -h, i = 0 > f * g, this.xCorr += g * b * (i ? 1 - c : c), 
                this.yCorr -= f * b * (d ? i ? c : 1 - c : 1), e && "left" !== e && (this.xCorr -= a * c * (0 > f ? -1 : 1), 
                d && (this.yCorr -= h * c * (0 > g ? -1 : 1)), B(this.element, {
                    textAlign: e
                }));
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--; ) ja(a[b]) ? c[b] = v(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], 
                !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), 
                c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x";
            },
            clip: function(a) {
                var c, b = this;
                return a ? (c = a.members, la(c, b), c.push(b), b.destroyClip = function() {
                    la(c, b);
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: hb ? "inherit" : "rect(auto)"
                }), b.css(a);
            },
            css: S.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && Qa(a);
            },
            destroy: function() {
                return this.destroyClip && this.destroyClip(), S.prototype.destroy.apply(this);
            },
            on: function(a, b) {
                return this.element["on" + a] = function() {
                    var a = G.event;
                    a.target = a.srcElement, b(a);
                }, this;
            },
            cutOffPath: function(a, b) {
                var c, a = a.split(/[ ,]/);
                return c = a.length, (9 === c || 11 === c) && (a[c - 4] = a[c - 2] = y(a[c - 2]) - 10 * b), 
                a.join(" ");
            },
            shadow: function(a, b, c) {
                var e, h, j, l, n, m, o, d = [], f = this.element, g = this.renderer, i = f.style, k = f.path;
                if (k && "string" != typeof k.value && (k = "x"), n = k, a) {
                    for (m = p(a.width, 3), o = (a.opacity || .15) / m, e = 1; 3 >= e; e++) l = 2 * m + 1 - 2 * e, 
                    c && (n = this.cutOffPath(k.value, l + .5)), j = [ '<shape isShadow="true" strokeweight="', l, '" filled="false" path="', n, '" coordsize="10 10" style="', f.style.cssText, '" />' ], 
                    h = $(g.prepVML(j), null, {
                        left: y(i.left) + p(a.offsetX, 1),
                        top: y(i.top) + p(a.offsetY, 1)
                    }), c && (h.cutOff = l + 1), j = [ '<stroke color="', a.color || "black", '" opacity="', o * e, '"/>' ], 
                    $(g.prepVML(j), null, null, h), b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f), 
                    d.push(h);
                    this.shadows = d;
                }
                return this;
            },
            updateShadows: sa,
            setAttr: function(a, b) {
                hb ? this.element[a] = b : this.element.setAttribute(a, b);
            },
            classSetter: function(a) {
                this.element.className = a;
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || $(this.renderer.prepVML([ "<stroke/>" ]), null, null, c))[b] = a || "solid", 
                this[b] = a;
            },
            dSetter: function(a, b, c) {
                var d = this.shadows, a = a || [];
                if (this.d = a.join && a.join(" "), c.path = a = this.pathToVML(a), d) for (c = d.length; c--; ) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
                this.setAttr(b, a);
            },
            fillSetter: function(a, b, c) {
                var d = c.nodeName;
                "SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = a !== P, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
            },
            opacitySetter: sa,
            rotationSetter: function(a, b, c) {
                c = c.style, this[b] = c[b] = a, c.left = -v(fa(a * Ea) + 1) + "px", c.top = v(aa(a * Ea)) + "px";
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b));
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a, this[b] = a, ja(a) && (a += "px"), this.setAttr("strokeweight", a);
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a);
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible"), this.shadows && q(this.shadows, function(c) {
                    c.style[b] = a;
                }), "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, hb || (c.style[b] = a ? "visible" : "hidden"), 
                b = "top"), c.style[b] = a;
            },
            xSetter: function(a, b, c) {
                this[b] = a, "x" === b ? b = "left" : "y" === b && (b = "top"), this.updateClipping ? (this[b] = a, 
                this.updateClipping()) : c.style[b] = a;
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a;
            }
        }, K.VMLElement = Z = ma(S, Z), Z.prototype.ySetter = Z.prototype.widthSetter = Z.prototype.heightSetter = Z.prototype.xSetter;
        var ia = {
            Element: Z,
            isIE8: wa.indexOf("MSIE 8.0") > -1,
            init: function(a, b, c, d) {
                var e;
                if (this.alignedObjects = [], d = this.createElement(Ka).css(r(this.getStyle(d), {
                    position: "relative"
                })), e = d.element, a.appendChild(d.element), this.isVML = !0, this.box = e, this.boxWrapper = d, 
                this.cache = {}, this.setSize(b, c, !1), !x.namespaces.hcv) {
                    x.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        x.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
                    } catch (f) {
                        x.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth;
            },
            clipRect: function(a, b, c, d) {
                var e = this.createElement(), f = da(a);
                return r(e, {
                    members: [],
                    left: (f ? a.x : a) + 1,
                    top: (f ? a.y : b) + 1,
                    width: (f ? a.width : c) - 1,
                    height: (f ? a.height : d) - 1,
                    getCSS: function(a) {
                        var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - ("shape" === c ? b.offsetTop : 0), e = this.left, b = e + this.width, f = d + this.height, d = {
                            clip: "rect(" + v(a ? e : d) + "px," + v(a ? f : b) + "px," + v(a ? b : f) + "px," + v(a ? d : e) + "px)"
                        };
                        return !a && hb && "DIV" === c && r(d, {
                            width: b + "px",
                            height: f + "px"
                        }), d;
                    },
                    updateClipping: function() {
                        q(e.members, function(a) {
                            a.element && a.css(e.getCSS(a));
                        });
                    }
                });
            },
            color: function(a, b, c, d) {
                var f, h, i, e = this, g = /^rgba/, j = P;
                if (a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern"), 
                i) {
                    var k, l, m, o, p, D, J, t, n = a.linearGradient || a.radialGradient, C = "", a = a.stops, s = [], u = function() {
                        h = [ '<fill colors="' + s.join(",") + '" opacity="', p, '" o:opacity2="', o, '" type="', i, '" ', C, 'focus="100%" method="any" />' ], 
                        $(e.prepVML(h), null, null, b);
                    };
                    if (m = a[0], t = a[a.length - 1], m[0] > 0 && a.unshift([ 0, m[1] ]), t[0] < 1 && a.push([ 1, t[1] ]), 
                    q(a, function(a, b) {
                        g.test(a[1]) ? (f = ya(a[1]), k = f.get("rgb"), l = f.get("a")) : (k = a[1], l = 1), 
                        s.push(100 * a[0] + "% " + k), b ? (p = l, D = k) : (o = l, J = k);
                    }), "fill" === c) if ("gradient" === i) c = n.x1 || n[0] || 0, a = n.y1 || n[1] || 0, 
                    m = n.x2 || n[2] || 0, n = n.y2 || n[3] || 0, C = 'angle="' + (90 - 180 * V.atan((n - a) / (m - c)) / oa) + '"', 
                    u(); else {
                        var w, j = n.r, r = 2 * j, v = 2 * j, x = n.cx, z = n.cy, R = b.radialReference, j = function() {
                            R && (w = d.getBBox(), x += (R[0] - w.x) / w.width - .5, z += (R[1] - w.y) / w.height - .5, 
                            r *= R[2] / w.width, v *= R[2] / w.height), C = 'src="' + E.global.VMLRadialGradientURL + '" size="' + r + "," + v + '" origin="0.5,0.5" position="' + x + "," + z + '" color2="' + J + '" ', 
                            u();
                        };
                        d.added ? j() : d.onAdd = j, j = D;
                    } else j = k;
                } else g.test(a) && "IMG" !== b.tagName ? (f = ya(a), h = [ "<", c, ' opacity="', f.get("a"), '"/>' ], 
                $(this.prepVML(h), null, null, b), j = f.get("rgb")) : (j = b.getElementsByTagName(c), 
                j.length && (j[0].opacity = 1, j[0].type = "solid"), j = a);
                return j;
            },
            prepVML: function(a) {
                var b = this.isIE8, a = a.join("");
                return b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"), 
                a;
            },
            text: ta.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                return Ha(a) ? b.d = a : da(a) && r(b, a), this.createElement("shape").attr(b);
            },
            circle: function(a, b, c) {
                var d = this.symbol("circle");
                return da(a) && (c = a.r, b = a.y, a = a.x), d.isCircle = !0, d.r = c, d.attr({
                    x: a,
                    y: b
                });
            },
            g: function(a) {
                var b;
                return a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                }), this.createElement(Ka).attr(b);
            },
            image: function(a, b, c, d, e) {
                var f = this.createElement("img").attr({
                    src: a
                });
                return arguments.length > 1 && f.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }), f;
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : ta.prototype.createElement.call(this, a);
            },
            invertChild: function(a, b) {
                var c = this, d = b.style, e = "IMG" === a.tagName && a.style;
                B(a, {
                    flip: "x",
                    left: y(d.width) - (e ? y(e.top) : 1),
                    top: y(d.height) - (e ? y(e.left) : 1),
                    rotation: -90
                }), q(a.childNodes, function(b) {
                    c.invertChild(b, a);
                });
            },
            symbols: {
                arc: function(a, b, c, d, e) {
                    var f = e.start, g = e.end, h = e.r || c || d, c = e.innerR, d = aa(f), i = fa(f), j = aa(g), k = fa(g);
                    return g - f === 0 ? [ "x" ] : (f = [ "wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k ], 
                    e.open && !c && f.push("e", "M", a, b), f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"), 
                    f.isArc = !0, f);
                },
                circle: function(a, b, c, d, e) {
                    return e && (c = d = 2 * e.r), e && e.isCircle && (a -= c / 2, b -= d / 2), [ "wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e" ];
                },
                rect: function(a, b, c, d, e) {
                    return ta.prototype.symbols[s(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e);
                }
            }
        };
        K.VMLRenderer = Z = function() {
            this.init.apply(this, arguments);
        }, Z.prototype = w(ta.prototype, ia), Za = Z;
    }
    ta.prototype.measureSpanWidth = function(a, b) {
        var d, c = x.createElement("span");
        return d = x.createTextNode(a), c.appendChild(d), B(c, b), this.box.appendChild(c), 
        d = c.offsetWidth, Qa(c), d;
    };
    var Mb;
    ga && (K.CanVGRenderer = Z = function() {
        xa = "http://www.w3.org/1999/xhtml";
    }, Z.prototype.symbols = {}, Mb = function() {
        function a() {
            var d, a = b.length;
            for (d = 0; a > d; d++) b[d]();
            b = [];
        }
        var b = [];
        return {
            push: function(c, d) {
                0 === b.length && Rb(d, a), b.push(c);
            }
        };
    }(), Za = Z), Ta.prototype = {
        addLabel: function() {
            var n, a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.names, g = this.pos, h = b.labels, i = h.rotation, j = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / j.length || !d && (c.margin[3] || .33 * c.chartWidth), k = g === j[0], l = g === j[j.length - 1], f = e ? p(e[g], f[g], g) : g, e = this.label, m = j.info;
            a.isDatetimeAxis && m && (n = b.dateTimeLabelFormats[m.higherRanks[g] || m.unitName]), 
            this.isFirst = k, this.isLast = l, b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: k,
                isLast: l,
                dateTimeLabelFormat: n,
                value: a.isLog ? ea(ka(f)) : f
            }), g = d && {
                width: t(1, v(d - 2 * (h.padding || 10))) + "px"
            }, s(e) ? e && e.attr({
                text: b
            }).css(g) : (n = {
                align: a.labelAlign
            }, ja(i) && (n.rotation = i), d && h.ellipsis && (g.HcHeight = a.len / j.length), 
            this.label = e = s(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(n).css(r(g, h.style)).add(a.labelGroup) : null, 
            a.tickBaseline = c.renderer.fontMetrics(h.style.fontSize, e).b, i && 2 === a.side && (a.tickBaseline *= aa(i * Ea))), 
            this.yOffset = e ? p(h.y, a.tickBaseline + (2 === a.side ? 8 : -(e.getBBox().height / 2))) : 0;
        },
        getLabelSize: function() {
            var a = this.label, b = this.axis;
            return a ? a.getBBox()[b.horiz ? "height" : "width"] : 0;
        },
        getLabelSides: function() {
            var a = this.label.getBBox(), b = this.axis, c = b.horiz, d = b.options.labels, a = c ? a.width : a.height, b = c ? d.x - a * {
                left: 0,
                center: .5,
                right: 1
            }[b.labelAlign] : 0;
            return [ b, c ? a + b : a ];
        },
        handleOverflow: function(a, b) {
            var l, n, m, c = !0, d = this.axis, e = this.isFirst, f = this.isLast, g = d.horiz ? b.x : b.y, h = d.reversed, i = d.tickPositions, j = this.getLabelSides(), k = j[0], j = j[1], o = this.label.line;
            if (l = o || 0, n = d.labelEdge, m = d.justifyLabels && (e || f), n[l] === u || g + k > n[l] ? n[l] = g + j : m || (c = !1), 
            m) {
                l = (n = d.justifyToPlot) ? d.pos : 0, n = n ? l + d.len : d.chart.chartWidth;
                do a += e ? 1 : -1, m = d.ticks[i[a]]; while (i[a] && (!m || !m.label || m.label.line !== o));
                d = m && m.label.xy && m.label.xy.x + m.getLabelSides()[e ? 0 : 1], e && !h || f && h ? l > g + k && (g = l - k, 
                m && g + j > d && (c = !1)) : g + j > n && (g = n - j, m && d > g + k && (c = !1)), 
                b.x = g;
            }
            return c;
        },
        getPosition: function(a, b, c, d) {
            var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
            };
        },
        getLabelPosition: function(a, b, c, d, e, f, g, h) {
            var i = this.axis, j = i.transA, k = i.reversed, l = i.staggerLines, a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0), b = b + this.yOffset - (f && !d ? f * j * (k ? 1 : -1) : 0);
            return l && (c.line = g / (h || 1) % l, b += c.line * (i.labelOffset / l)), {
                x: a,
                y: b
            };
        },
        getMarkPath: function(a, b, c, d, e, f) {
            return f.crispLine([ "M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0) ], d);
        },
        render: function(a, b, c) {
            var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, l = this.gridLine, n = h ? h + "Grid" : "grid", m = h ? h + "Tick" : "tick", o = e[n + "LineWidth"], q = e[n + "LineColor"], D = e[n + "LineDashStyle"], J = e[m + "Length"], n = e[m + "Width"] || 0, C = e[m + "Color"], t = e[m + "Position"], m = this.mark, s = k.step, r = !0, v = d.tickmarkOffset, w = this.getPosition(g, j, v, b), x = w.x, w = w.y, z = g && x === d.pos + d.len || !g && w === d.pos ? -1 : 1, c = p(c, 1);
            this.isActive = !0, o && (j = d.getPlotLinePath(j + v, o * z, b, !0), l === u && (l = {
                stroke: q,
                "stroke-width": o
            }, D && (l.dashstyle = D), h || (l.zIndex = 1), b && (l.opacity = 0), this.gridLine = l = o ? f.path(j).attr(l).add(d.gridGroup) : null), 
            !b && l && j && l[this.isNew ? "attr" : "animate"]({
                d: j,
                opacity: c
            })), n && J && ("inside" === t && (J = -J), d.opposite && (J = -J), h = this.getMarkPath(x, w, J, n * z, g, f), 
            m ? m.animate({
                d: h,
                opacity: c
            }) : this.mark = f.path(h).attr({
                stroke: C,
                "stroke-width": n,
                opacity: c
            }).add(d.axisGroup)), i && !isNaN(x) && (i.xy = w = this.getLabelPosition(x, w, i, g, k, v, a, s), 
            this.isFirst && !this.isLast && !p(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(e.showLastLabel, 1) ? r = !1 : !d.isRadial && !k.step && !k.rotation && !b && 0 !== c && (r = this.handleOverflow(a, w)), 
            s && a % s && (r = !1), r && !isNaN(w.y) ? (w.opacity = c, i[this.isNew ? "attr" : "animate"](w), 
            this.isNew = !1) : i.attr("y", -9999));
        },
        destroy: function() {
            Pa(this, this.axis);
        }
    }, K.PlotLineOrBand = function(a, b) {
        this.axis = a, b && (this.options = b, this.id = b.id);
    }, K.PlotLineOrBand.prototype = {
        render: function() {
            var p, a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = s(j) && s(i), l = e.value, n = e.dashStyle, m = a.svgElem, o = [], q = e.color, J = e.zIndex, C = e.events, r = {}, u = b.chart.renderer;
            if (b.isLog && (j = za(j), i = za(i), l = za(l)), h) o = b.getPlotLinePath(l, h), 
            r = {
                stroke: q,
                "stroke-width": h
            }, n && (r.dashstyle = n); else {
                if (!k) return;
                j = t(j, b.min - d), i = L(i, b.max + d), o = b.getPlotBandPath(j, i, e), q && (r.fill = q), 
                e.borderWidth && (r.stroke = e.borderColor, r["stroke-width"] = e.borderWidth);
            }
            if (s(J) && (r.zIndex = J), m) o ? m.animate({
                d: o
            }, null, m.onGetPath) : (m.hide(), m.onGetPath = function() {
                m.show();
            }, g && (a.label = g = g.destroy())); else if (o && o.length && (a.svgElem = m = u.path(o).attr(r).add(), 
            C)) for (p in d = function(b) {
                m.on(b, function(c) {
                    C[b].apply(a, [ c ]);
                });
            }, C) d(p);
            return f && s(f.text) && o && o.length && b.width > 0 && b.height > 0 ? (f = w({
                align: c && k && "center",
                x: c ? !k && 4 : 10,
                verticalAlign: !c && k && "middle",
                y: c ? k ? 16 : 10 : k ? 6 : -4,
                rotation: c && !k && 90
            }, f), g || (r = {
                align: f.textAlign || f.align,
                rotation: f.rotation
            }, s(J) && (r.zIndex = J), a.label = g = u.text(f.text, 0, 0, f.useHTML).attr(r).css(f.style).add()), 
            b = [ o[1], o[4], k ? o[6] : o[1] ], k = [ o[2], o[5], k ? o[7] : o[2] ], o = Oa(b), 
            c = Oa(k), g.align(f, !1, {
                x: o,
                y: c,
                width: Ca(b) - o,
                height: Ca(k) - c
            }), g.show()) : g && g.hide(), a;
        },
        destroy: function() {
            la(this.axis.plotLinesAndBands, this), delete this.axis, Pa(this);
        }
    }, na.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: M,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            tickWidth: 0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return Ba(this.total, -1);
                },
                style: M.style
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                x: 0,
                y: null
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(a, b) {
            var c = b.isX;
            this.horiz = a.inverted ? !c : c, this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis", 
            this.opposite = b.opposite, this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), 
            this.setOptions(b);
            var d = this.options, e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter, this.userOptions = b, 
            this.minPixelPadding = 0, this.chart = a, this.reversed = d.reversed, this.zoomEnabled = d.zoomEnabled !== !1, 
            this.categories = d.categories || "category" === e, this.names = [], this.isLog = "logarithmic" === e, 
            this.isDatetimeAxis = "datetime" === e, this.isLinked = s(d.linkedTo), this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement && 1 === p(d.tickInterval, 1) ? .5 : 0, 
            this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], 
            this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = d.minRange || d.maxZoom, 
            this.range = d.range, this.offset = d.offset || 0, this.stacks = {}, this.oldStacks = {}, 
            this.min = this.max = null, this.crosshair = p(d.crosshair, ra(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
            var f, d = this.options.events;
            -1 === Ma(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), 
            a[this.coll].push(this)), this.series = this.series || [], a.inverted && c && this.reversed === u && (this.reversed = !0), 
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d) N(this, f, d[f]);
            this.isLog && (this.val2lin = za, this.lin2val = ka);
        },
        setOptions: function(a) {
            this.options = w(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [ this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions ][this.side], w(E[this.coll], a));
        },
        defaultLabelFormatter: function() {
            var g, a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = E.lang.numericSymbols, f = e && e.length, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
            if (h) g = Ja(h, this); else if (c) g = b; else if (d) g = cb(d, b); else if (f && a >= 1e3) for (;f-- && g === u; ) c = Math.pow(1e3, f + 1), 
            a >= c && null !== e[f] && (g = Ba(b / c, -1) + e[f]);
            return g === u && (g = Q(b) >= 1e4 ? Ba(b, 0) : Ba(b, -1, u, "")), g;
        },
        getSeriesExtremes: function() {
            var a = this, b = a.chart;
            a.hasVisibleSeries = !1, a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null, 
            a.buildStacks && a.buildStacks(), q(a.series, function(c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d;
                    d = c.options.threshold;
                    var e;
                    a.hasVisibleSeries = !0, a.isLog && 0 >= d && (d = null), a.isXAxis ? (d = c.xData, 
                    d.length && (a.dataMin = L(p(a.dataMin, d[0]), Oa(d)), a.dataMax = t(p(a.dataMax, d[0]), Ca(d)))) : (c.getExtremes(), 
                    e = c.dataMax, c = c.dataMin, s(c) && s(e) && (a.dataMin = L(p(a.dataMin, c), c), 
                    a.dataMax = t(p(a.dataMax, e), e)), s(d) && (a.dataMin >= d ? (a.dataMin = d, a.ignoreMinPadding = !0) : a.dataMax < d && (a.dataMax = d, 
                    a.ignoreMaxPadding = !0)));
                }
            });
        },
        translate: function(a, b, c, d, e, f) {
            var g = 1, h = 0, i = d ? this.oldTransA : this.transA, d = d ? this.oldMin : this.min, j = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
            return i || (i = this.transA), c && (g *= -1, h = this.len), this.reversed && (g *= -1, 
            h -= g * (this.sector || this.len)), b ? (a = a * g + h, a -= j, a = a / i + d, 
            e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), "between" === f && (f = .5), 
            a = g * (a - d) * i + h + g * j + (ja(f) ? i * f * this.pointRange : 0)), a;
        },
        toPixels: function(a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
        },
        toValue: function(a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
        },
        getPlotLinePath: function(a, b, c, d, e) {
            var i, j, n, f = this.chart, g = this.left, h = this.top, k = c && f.oldChartHeight || f.chartHeight, l = c && f.oldChartWidth || f.chartWidth;
            return i = this.transB, e = p(e, this.translate(a, null, null, c)), a = c = v(e + i), 
            i = j = v(k - e - i), isNaN(e) ? n = !0 : this.horiz ? (i = h, j = k - this.bottom, 
            (g > a || a > g + this.width) && (n = !0)) : (a = g, c = l - this.right, (h > i || i > h + this.height) && (n = !0)), 
            n && !d ? null : f.renderer.crispLine([ "M", a, i, "L", c, j ], b || 1);
        },
        getLinearTickPositions: function(a, b, c) {
            var d, e = ea(U(b / a) * a), f = ea(La(c / a) * a), g = [];
            if (b === c && ja(b)) return [ b ];
            for (b = e; f >= b && (g.push(b), b = ea(b + a), b !== d); ) d = b;
            return g;
        },
        getMinorTickPositions: function() {
            var e, a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [];
            if (this.isLog) for (e = b.length, a = 1; e > a; a++) d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), 
            d[0] < this.min && d.shift(); else for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b);
            return d;
        },
        adjustForMinRange: function() {
            var d, f, g, h, i, j, a = this.options, b = this.min, c = this.max, e = this.dataMax - this.dataMin >= this.minRange;
            if (this.isXAxis && this.minRange === u && !this.isLog && (s(a.min) || s(a.max) ? this.minRange = null : (q(this.series, function(a) {
                for (i = a.xData, g = j = a.xIncrement ? 1 : i.length - 1; g > 0; g--) h = i[g] - i[g - 1], 
                (f === u || f > h) && (f = h);
            }), this.minRange = L(5 * f, this.dataMax - this.dataMin))), c - b < this.minRange) {
                var k = this.minRange;
                d = (k - c + b) / 2, d = [ b - d, p(a.min, b - d) ], e && (d[2] = this.dataMin), 
                b = Ca(d), c = [ b + k, p(a.max, b + k) ], e && (c[2] = this.dataMax), c = Oa(c), 
                k > c - b && (d[0] = c - k, d[1] = p(a.min, c - k), b = Ca(d));
            }
            this.min = b, this.max = c;
        },
        setAxisTranslation: function(a) {
            var e, b = this, c = b.max - b.min, d = b.axisPointRange || 0, f = 0, g = 0, h = b.linkedParent, i = !!b.categories, j = b.transA;
            (b.isXAxis || i || d) && (h ? (f = h.minPointOffset, g = h.pointRangePadding) : q(b.series, function(a) {
                var h = i ? 1 : b.isXAxis ? a.pointRange : b.axisPointRange || 0, j = a.options.pointPlacement, m = a.closestPointRange;
                h > c && (h = 0), d = t(d, h), f = t(f, Ga(j) ? 0 : h / 2), g = t(g, "on" === j ? 0 : h), 
                !a.noSharedTooltip && s(m) && (e = s(e) ? L(e, m) : m);
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, 
            b.pointRangePadding = g *= h, b.pointRange = L(d, c), b.closestPointRange = e), 
            a && (b.oldTransA = j), b.translationSlope = b.transA = j = b.len / (c + g || 1), 
            b.transB = b.horiz ? b.left : b.bottom, b.minPixelPadding = j * f;
        },
        setTickPositions: function(a) {
            var D, b = this, c = b.chart, d = b.options, e = d.startOnTick, f = d.endOnTick, g = b.isLog, h = b.isDatetimeAxis, i = b.isXAxis, j = b.isLinked, k = b.options.tickPositioner, l = d.maxPadding, n = d.minPadding, m = d.tickInterval, o = d.minTickInterval, Y = d.tickPixelInterval, J = b.categories;
            j ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = p(c.min, c.dataMin), 
            b.max = p(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ha(11, 1)) : (b.min = p(b.userMin, d.min, b.dataMin), 
            b.max = p(b.userMax, d.max, b.dataMax)), g && (!a && L(b.min, p(b.dataMin, b.min)) <= 0 && ha(10, 1), 
            b.min = ea(za(b.min)), b.max = ea(za(b.max))), b.range && s(b.max) && (b.userMin = b.min = t(b.min, b.max - b.range), 
            b.userMax = b.max, b.range = null), b.beforePadding && b.beforePadding(), b.adjustForMinRange(), 
            J || b.axisPointRange || b.usePercentage || j || !s(b.min) || !s(b.max) || !(c = b.max - b.min) || (s(d.min) || s(b.userMin) || !n || !(b.dataMin < 0) && b.ignoreMinPadding || (b.min -= c * n), 
            s(d.max) || s(b.userMax) || !l || !(b.dataMax > 0) && b.ignoreMaxPadding || (b.max += c * l)), 
            ja(d.floor) && (b.min = t(b.min, d.floor)), ja(d.ceiling) && (b.max = L(b.max, d.ceiling)), 
            b.min === b.max || void 0 === b.min || void 0 === b.max ? b.tickInterval = 1 : j && !m && Y === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval : (b.tickInterval = p(m, J ? 1 : (b.max - b.min) * Y / t(b.len, Y)), 
            !s(m) && b.len < Y && !this.isRadial && !this.isLog && !J && e && f && (D = !0, 
            b.tickInterval /= 4)), i && !a && q(b.series, function(a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
            }), b.setAxisTranslation(!0), b.beforeSetTickPositions && b.beforeSetTickPositions(), 
            b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval)), 
            b.pointRange && (b.tickInterval = t(b.pointRange, b.tickInterval)), !m && b.tickInterval < o && (b.tickInterval = o), 
            h || g || m || (b.tickInterval = nb(b.tickInterval, null, mb(b.tickInterval), p(d.allowDecimals, !(b.tickInterval > 1 && b.tickInterval < 5 && b.max > 1e3 && b.max < 9999)))), 
            b.minorTickInterval = "auto" === d.minorTickInterval && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval, 
            b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) : k && k.apply(b, [ b.min, b.max ]), 
            a || (!b.ordinalPositions && (b.max - b.min) / b.tickInterval > t(2 * b.len, 200) && ha(19, !0), 
            a = h ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : g ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), 
            D && a.splice(1, a.length - 2), b.tickPositions = a), j || (d = a[0], g = a[a.length - 1], 
            h = b.minPointOffset || 0, e ? b.min = d : b.min - h > d && a.shift(), f ? b.max = g : b.max + h < g && a.pop(), 
            0 === a.length && s(d) && a.push((g + d) / 2), 1 === a.length && (e = Q(b.max) > 1e13 ? 1 : .001, 
            b.min -= e, b.max += e));
        },
        setMaxTicks: function() {
            var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [ this.coll, this.pos, this.len ].join("-");
            !this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1 && (b[d] = c.length), 
            a.maxTicks = b;
        },
        adjustTickAmount: function() {
            var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
            if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== u) {
                var d = this.tickAmount, e = b.length;
                if (this.tickAmount = a = c[a], a > e) {
                    for (;b.length < a; ) b.push(ea(b[b.length - 1] + this.tickInterval));
                    this.transA *= (e - 1) / (a - 1), this.max = b[b.length - 1];
                }
                s(d) && a !== d && (this.isDirty = !0);
            }
        },
        setScale: function() {
            var b, c, d, e, a = this.stacks;
            if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, 
            this.setAxisSize(), e = this.len !== this.oldAxisLength, q(this.series, function(a) {
                (a.isDirtyData || a.isDirty || a.xAxis.isDirty) && (d = !0);
            }), e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis) for (b in a) for (c in a[b]) a[b][c].total = null, a[b][c].cum = 0;
                this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, 
                this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax);
            } else if (!this.isXAxis) {
                this.oldStacks && (a = this.stacks = this.oldStacks);
                for (b in a) for (c in a[b]) a[b][c].cum = a[b][c].total;
            }
            this.setMaxTicks();
        },
        setExtremes: function(a, b, c, d, e) {
            var f = this, g = f.chart, c = p(c, !0), e = r(e, {
                min: a,
                max: b
            });
            I(f, "setExtremes", e, function() {
                f.userMin = a, f.userMax = b, f.eventArgs = e, f.isDirtyExtremes = !0, c && g.redraw(d);
            });
        },
        zoom: function(a, b) {
            var c = this.dataMin, d = this.dataMax, e = this.options;
            return this.allowZoomOutside || (s(c) && a <= L(c, p(e.min, c)) && (a = u), s(d) && b >= t(d, p(e.max, d)) && (b = u)), 
            this.displayBtn = a !== u || b !== u, this.setExtremes(a, b, !1, u, {
                trigger: "zoom"
            }), !0;
        },
        setAxisSize: function() {
            var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = p(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = p(b.height, a.plotHeight), g = p(b.top, a.plotTop), b = p(b.left, a.plotLeft + c), c = /%$/;
            c.test(f) && (f = parseInt(f, 10) / 100 * a.plotHeight), c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop), 
            this.left = b, this.top = g, this.width = e, this.height = f, this.bottom = a.chartHeight - f - g, 
            this.right = a.chartWidth - e - b, this.len = t(d ? e : f, 0), this.pos = d ? b : g;
        },
        getExtremes: function() {
            var a = this.isLog;
            return {
                min: a ? ea(ka(this.min)) : this.min,
                max: a ? ea(ka(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            };
        },
        getThreshold: function(a) {
            var b = this.isLog, c = b ? ka(this.min) : this.min, b = b ? ka(this.max) : this.max;
            return c > a || null === a ? a = c : a > b && (a = b), this.translate(a, 0, 1, 0, 1);
        },
        autoLabelAlign: function(a) {
            return a = (p(a, 0) - 90 * this.side + 720) % 360, a > 15 && 165 > a ? "right" : a > 195 && 345 > a ? "left" : "center";
        },
        getOffset: function() {
            var j, k, n, r, x, y, A, z, R, a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [ 1, 0, 3, 2 ][h] : h, l = 0, m = 0, o = d.title, Y = d.labels, D = 0, J = b.axisOffset, b = b.clipOffset, C = [ -1, 1, 1, -1 ][h], v = 1, w = p(Y.maxStaggerLines, 5);
            if (a.hasData = j = a.hasVisibleSeries || s(a.min) && s(a.max) && !!e, a.showAxis = k = j || p(d.showEmpty, !0), 
            a.staggerLines = a.horiz && Y.staggerLines, a.axisGroup || (a.gridGroup = c.g("grid").attr({
                zIndex: d.gridZIndex || 1
            }).add(), a.axisGroup = c.g("axis").attr({
                zIndex: d.zIndex || 2
            }).add(), a.labelGroup = c.g("axis-labels").attr({
                zIndex: Y.zIndex || 7
            }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add()), j || a.isLinked) {
                if (a.labelAlign = p(Y.align || a.autoLabelAlign(Y.rotation)), q(e, function(b) {
                    f[b] ? f[b].addLabel() : f[b] = new Ta(a, b);
                }), a.horiz && !a.staggerLines && w && !Y.rotation) {
                    for (j = a.reversed ? [].concat(e).reverse() : e; w > v; ) {
                        for (x = [], y = !1, r = 0; r < j.length; r++) A = j[r], z = (z = f[A].label && f[A].label.getBBox()) ? z.width : 0, 
                        R = r % v, z && (A = a.translate(A), x[R] !== u && A < x[R] && (y = !0), x[R] = A + z);
                        if (!y) break;
                        v++;
                    }
                    v > 1 && (a.staggerLines = v);
                }
                q(e, function(b) {
                    (0 === h || 2 === h || {
                        1: "left",
                        3: "right"
                    }[h] === a.labelAlign) && (D = t(f[b].getLabelSize(), D));
                }), a.staggerLines && (D *= a.staggerLines, a.labelOffset = D);
            } else for (r in f) f[r].destroy(), delete f[r];
            o && o.text && o.enabled !== !1 && (a.axisTitle || (a.axisTitle = c.text(o.text, 0, 0, o.useHTML).attr({
                zIndex: 7,
                rotation: o.rotation || 0,
                align: o.textAlign || {
                    low: "left",
                    middle: "center",
                    high: "right"
                }[o.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(o.style).add(a.axisGroup), 
            a.axisTitle.isNew = !0), k && (l = a.axisTitle.getBBox()[g ? "height" : "width"], 
            n = o.offset, m = s(n) ? 0 : p(o.margin, g ? 5 : 10)), a.axisTitle[k ? "show" : "hide"]()), 
            a.offset = C * p(d.offset, J[h]), c = 2 === h ? a.tickBaseline : 0, g = D + m + (D && C * (g ? p(Y.y, a.tickBaseline + 8) : Y.x) - c), 
            a.axisTitleMargin = p(n, g), J[h] = t(J[h], a.axisTitleMargin + l + C * a.offset, g), 
            b[i] = t(b[i], 2 * U(d.lineWidth / 2));
        },
        getLinePath: function(a) {
            var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            return c && (a *= -1), b.renderer.crispLine([ "M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom ], a);
        },
        getTitlePosition: function() {
            var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, i = y(e.style.fontSize || 12), d = {
                low: f + (a ? 0 : d),
                middle: f + d / 2,
                high: f + (a ? d : 0)
            }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? i : 0);
            return {
                x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0),
                y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0)
            };
        },
        render: function() {
            var j, v, A, a = this, b = a.horiz, c = a.reversed, d = a.chart, e = d.renderer, f = a.options, g = a.isLog, h = a.isLinked, i = a.tickPositions, k = a.axisTitle, l = a.ticks, n = a.minorTicks, m = a.alternateBands, o = f.stackLabels, p = f.alternateGridColor, D = a.tickmarkOffset, J = f.lineWidth, C = d.hasRendered && s(a.oldMin) && !isNaN(a.oldMin), r = a.hasData, t = a.showAxis, w = f.labels.overflow, x = a.justifyLabels = b && w !== !1;
            a.labelEdge.length = 0, a.justifyToPlot = "justify" === w, q([ l, n, m ], function(a) {
                for (var b in a) a[b].isActive = !1;
            }), (r || h) && (a.minorTickInterval && !a.categories && q(a.getMinorTickPositions(), function(b) {
                n[b] || (n[b] = new Ta(a, b, "minor")), C && n[b].isNew && n[b].render(null, !0), 
                n[b].render(null, !1, 1);
            }), i.length && (j = i.slice(), (b && c || !b && !c) && j.reverse(), x && (j = j.slice(1).concat([ j[0] ])), 
            q(j, function(b, c) {
                x && (c = c === j.length - 1 ? 0 : c + 1), (!h || b >= a.min && b <= a.max) && (l[b] || (l[b] = new Ta(a, b)), 
                C && l[b].isNew && l[b].render(c, !0, .1), l[b].render(c));
            }), D && 0 === a.min && (l[-1] || (l[-1] = new Ta(a, -1, null, !0)), l[-1].render(-1))), 
            p && q(i, function(b, c) {
                c % 2 === 0 && b < a.max && (m[b] || (m[b] = new K.PlotLineOrBand(a)), v = b + D, 
                A = i[c + 1] !== u ? i[c + 1] + D : a.max, m[b].options = {
                    from: g ? ka(v) : v,
                    to: g ? ka(A) : A,
                    color: p
                }, m[b].render(), m[b].isActive = !0);
            }), a._addedPlotLB || (q((f.plotLines || []).concat(f.plotBands || []), function(b) {
                a.addPlotBandOrLine(b);
            }), a._addedPlotLB = !0)), q([ l, n, m ], function(a) {
                var b, c, e = [], f = va ? va.duration || 500 : 0, g = function() {
                    for (c = e.length; c--; ) a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]]);
                };
                for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b));
                a !== m && d.hasRendered && f ? f && setTimeout(g, f) : g();
            }), J && (b = a.getLinePath(J), a.axisLine ? a.axisLine.animate({
                d: b
            }) : a.axisLine = e.path(b).attr({
                stroke: f.lineColor,
                "stroke-width": J,
                zIndex: 7
            }).add(a.axisGroup), a.axisLine[t ? "show" : "hide"]()), k && t && (k[k.isNew ? "attr" : "animate"](a.getTitlePosition()), 
            k.isNew = !1), o && o.enabled && a.renderStackTotals(), a.isDirty = !1;
        },
        redraw: function() {
            this.render(), q(this.plotLinesAndBands, function(a) {
                a.render();
            }), q(this.series, function(a) {
                a.isDirty = !0;
            });
        },
        destroy: function(a) {
            var d, b = this, c = b.stacks, e = b.plotLinesAndBands;
            a || X(b);
            for (d in c) Pa(c[d]), c[d] = null;
            for (q([ b.ticks, b.minorTicks, b.alternateBands ], function(a) {
                Pa(a);
            }), a = e.length; a--; ) e[a].destroy();
            q("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
                b[a] && (b[a] = b[a].destroy());
            }), this.cross && this.cross.destroy();
        },
        drawCrosshair: function(a, b) {
            if (this.crosshair) if ((s(b) || !p(this.crosshair.snap, !0)) === !1) this.hideCrosshair(); else {
                var c, d = this.crosshair, e = d.animation;
                p(d.snap, !0) ? s(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, 
                c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : p(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c), 
                null === c ? this.hideCrosshair() : this.cross ? this.cross.attr({
                    visibility: "visible"
                })[e ? "animate" : "attr"]({
                    d: c
                }, e) : (e = {
                    "stroke-width": d.width || 1,
                    stroke: d.color || "#C0C0C0",
                    zIndex: d.zIndex || 2
                }, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add());
            }
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide();
        }
    }, r(na.prototype, {
        getPlotBandPath: function(a, b) {
            var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
            return d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null, d;
        },
        addPlotBand: function(a) {
            return this.addPlotBandOrLine(a, "plotBands");
        },
        addPlotLine: function(a) {
            return this.addPlotBandOrLine(a, "plotLines");
        },
        addPlotBandOrLine: function(a, b) {
            var c = new K.PlotLineOrBand(this, a).render(), d = this.userOptions;
            return c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)), 
            c;
        },
        removePlotBandOrLine: function(a) {
            for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--; ) b[e].id === a && b[e].destroy();
            q([ c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || [] ], function(b) {
                for (e = b.length; e--; ) b[e].id === a && la(b, b[e]);
            });
        }
    }), na.prototype.getTimeTicks = function(a, b, c, d) {
        var h, e = [], f = {}, g = E.global.useUTC, i = new Da(b - Sa), j = a.unitRange, k = a.count;
        if (s(b)) {
            j >= A.second && (i.setMilliseconds(0), i.setSeconds(j >= A.minute ? 0 : k * U(i.getSeconds() / k))), 
            j >= A.minute && i[Cb](j >= A.hour ? 0 : k * U(i[pb]() / k)), j >= A.hour && i[Db](j >= A.day ? 0 : k * U(i[qb]() / k)), 
            j >= A.day && i[sb](j >= A.month ? 1 : k * U(i[Xa]() / k)), j >= A.month && (i[Eb](j >= A.year ? 0 : k * U(i[fb]() / k)), 
            h = i[gb]()), j >= A.year && (h -= h % k, i[Fb](h)), j === A.week && i[sb](i[Xa]() - i[rb]() + p(d, 1)), 
            b = 1, Sa && (i = new Da(i.getTime() + Sa)), h = i[gb]();
            for (var d = i.getTime(), l = i[fb](), n = i[Xa](), m = (A.day + (g ? Sa : 6e4 * i.getTimezoneOffset())) % A.day; c > d; ) e.push(d), 
            j === A.year ? d = eb(h + b * k, 0) : j === A.month ? d = eb(h, l + b * k) : g || j !== A.day && j !== A.week ? d += j * k : d = eb(h, l, n + b * k * (j === A.day ? 1 : 7)), 
            b++;
            e.push(d), q(wb(e, function(a) {
                return j <= A.hour && a % A.day === m;
            }), function(a) {
                f[a] = "day";
            });
        }
        return e.info = r(a, {
            higherRanks: f,
            totalRange: j * k
        }), e;
    }, na.prototype.normalizeTimeTickInterval = function(a, b) {
        var g, c = b || [ [ "millisecond", [ 1, 2, 5, 10, 20, 25, 50, 100, 200, 500 ] ], [ "second", [ 1, 2, 5, 10, 15, 30 ] ], [ "minute", [ 1, 2, 5, 10, 15, 30 ] ], [ "hour", [ 1, 2, 3, 4, 6, 8, 12 ] ], [ "day", [ 1, 2 ] ], [ "week", [ 1, 2 ] ], [ "month", [ 1, 2, 3, 4, 6 ] ], [ "year", null ] ], d = c[c.length - 1], e = A[d[0]], f = d[1];
        for (g = 0; g < c.length && (d = c[g], e = A[d[0]], f = d[1], !(c[g + 1] && a <= (e * f[f.length - 1] + A[c[g + 1][0]]) / 2)); g++) ;
        return e === A.year && 5 * e > a && (f = [ 1, 2, 5 ]), c = nb(a / e, f, "year" === d[0] ? t(mb(a / e), 1) : 1), 
        {
            unitRange: e,
            count: c,
            unitName: d[0]
        };
    }, na.prototype.getLogTickPositions = function(a, b, c, d) {
        var e = this.options, f = this.len, g = [];
        if (d || (this._minorAutoInterval = null), a >= .5) a = v(a), g = this.getLinearTickPositions(a, b, c); else if (a >= .08) for (var h, i, j, k, l, f = U(b), e = a > .3 ? [ 1, 2, 4 ] : a > .15 ? [ 1, 2, 4, 6, 8 ] : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]; c + 1 > f && !l; f++) for (i = e.length, 
        h = 0; i > h && !l; h++) j = za(ka(f) * e[h]), j > b && (!d || c >= k) && k !== u && g.push(k), 
        k > c && (l = !0), k = j; else b = ka(b), c = ka(c), a = e[d ? "minorTickInterval" : "tickInterval"], 
        a = p("auto" === a ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), 
        a = nb(a, null, mb(a)), g = Va(this.getLinearTickPositions(a, b, c), za), d || (this._minorAutoInterval = a / 5);
        return d || (this.tickInterval = a), g;
    };
    var Nb = K.Tooltip = function() {
        this.init.apply(this, arguments);
    };
    Nb.prototype = {
        init: function(a, b) {
            var c = b.borderWidth, d = b.style, e = y(d.padding);
            this.chart = a, this.options = b, this.crosshairs = [], this.now = {
                x: 0,
                y: 0
            }, this.isHidden = !0, this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({
                padding: 0
            }).add().attr({
                y: -9999
            }), ga || this.label.shadow(b.shadow), this.shared = b.shared;
        },
        destroy: function() {
            this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), 
            clearTimeout(this.tooltipTimeout);
        },
        move: function(a, b, c, d) {
            var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden && (Q(a - f.x) > 1 || Q(b - f.y) > 1), h = e.followPointer || e.len > 1;
            r(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: h ? u : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: h ? u : g ? (f.anchorY + d) / 2 : d
            }), e.label.attr(f), g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                e && e.move(a, b, c, d);
            }, 32));
        },
        hide: function(a) {
            var c, b = this;
            clearTimeout(this.hideTimer), this.isHidden || (c = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                b.label.fadeOut(), b.isHidden = !0;
            }, p(a, this.options.hideDelay, 500)), c && q(c, function(a) {
                a.setState();
            }), this.chart.hoverPoints = null);
        },
        getAnchor: function(a, b) {
            var c, i, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, a = ra(a);
            return c = a[0].tooltipPos, this.followPointer && b && (b.chartX === u && (b = d.pointer.normalize(b)), 
            c = [ b.chartX - d.plotLeft, b.chartY - f ]), c || (q(a, function(a) {
                i = a.series.yAxis, g += a.plotX, h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0);
            }), g /= a.length, h /= a.length, c = [ e ? d.plotWidth - h : g, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h ]), 
            Va(c, v);
        },
        getPosition: function(a, b, c) {
            var g, d = this.chart, e = this.distance, f = {}, h = [ "y", d.chartHeight, b, c.plotY + d.plotTop ], i = [ "x", d.chartWidth, a, c.plotX + d.plotLeft ], j = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative, k = function(a, b, c, d) {
                var g = d - e > c, b = b > d + e + c, c = d - e - c;
                if (d += e, j && b) f[a] = d; else if (!j && g) f[a] = c; else if (g) f[a] = c; else {
                    if (!b) return !1;
                    f[a] = d;
                }
            }, l = function(a, b, c, d) {
                return e > d || d > b - e ? !1 : void (f[a] = c / 2 > d ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2);
            }, n = function(a) {
                var b = h;
                h = i, i = b, g = a;
            }, m = function() {
                k.apply(0, h) !== !1 ? l.apply(0, i) === !1 && !g && (n(!0), m()) : g ? f.x = f.y = 0 : (n(!0), 
                m());
            };
            return (d.inverted || this.len > 1) && n(), m(), f;
        },
        defaultFormatter: function(a) {
            var d, b = this.points || ra(this), c = b[0].series;
            return d = [ a.tooltipHeaderFormatter(b[0]) ], q(b, function(a) {
                c = a.series, d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat));
            }), d.push(a.options.footerFormat || ""), d.join("");
        },
        refresh: function(a, b) {
            var f, g, i, c = this.chart, d = this.label, e = this.options, h = {}, j = [];
            i = e.formatter || this.defaultFormatter;
            var k, h = c.hoverPoints, l = this.shared;
            clearTimeout(this.hideTimer), this.followPointer = ra(a)[0].series.tooltipOptions.followPointer, 
            g = this.getAnchor(a, b), f = g[0], g = g[1], !l || a.series && a.series.noSharedTooltip ? h = a.getLabelConfig() : (c.hoverPoints = a, 
            h && q(h, function(a) {
                a.setState();
            }), q(a, function(a) {
                a.setState("hover"), j.push(a.getLabelConfig());
            }), h = {
                x: a[0].category,
                y: a[0].y
            }, h.points = j, this.len = j.length, a = a[0]), i = i.call(h, this), h = a.series, 
            this.distance = p(h.tooltipOptions.distance, 16), i === !1 ? this.hide() : (this.isHidden && (bb(d), 
            d.attr("opacity", 1).show()), d.attr({
                text: i
            }), k = e.borderColor || a.color || h.color || "#606060", d.attr({
                stroke: k
            }), this.updatePosition({
                plotX: f,
                plotY: g,
                negative: a.negative,
                ttBelow: a.ttBelow
            }), this.isHidden = !1), I(c, "tooltipRefresh", {
                text: i,
                x: f + c.plotLeft,
                y: g + c.plotTop,
                borderColor: k
            });
        },
        updatePosition: function(a) {
            var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(v(c.x), v(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop);
        },
        tooltipHeaderFormatter: function(a) {
            var h, b = a.series, c = b.tooltipOptions, d = c.dateTimeLabelFormats, e = c.xDateFormat, f = b.xAxis, g = f && "datetime" === f.options.type && ja(a.key), c = c.headerFormat, f = f && f.closestPointRange;
            if (g && !e) {
                if (f) {
                    for (h in A) if (A[h] >= f || A[h] <= A.day && a.key % A[h] > 0) {
                        e = d[h];
                        break;
                    }
                } else e = d.day;
                e = e || d.year;
            }
            return g && e && (c = c.replace("{point.key}", "{point.key:" + e + "}")), Ja(c, {
                point: a,
                series: b
            });
        }
    };
    var pa;
    $a = x.documentElement.ontouchstart !== u;
    var Wa = K.Pointer = function(a, b) {
        this.init(a, b);
    };
    if (Wa.prototype = {
        init: function(a, b) {
            var f, c = b.chart, d = c.events, e = ga ? "" : c.zoomType, c = a.inverted;
            this.options = b, this.chart = a, this.zoomX = f = /x/.test(e), this.zoomY = e = /y/.test(e), 
            this.zoomHor = f && !c || e && c, this.zoomVert = e && !c || f && c, this.hasZoom = f || e, 
            this.runChartClick = d && !!d.click, this.pinchDown = [], this.lastValidTouch = {}, 
            K.Tooltip && b.tooltip.enabled && (a.tooltip = new Nb(a, b.tooltip), this.followTouchMove = b.tooltip.followTouchMove), 
            this.setDOMEvents();
        },
        normalize: function(a, b) {
            var c, d, a = a || window.event, a = Tb(a);
            return a.target || (a.target = a.srcElement), d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a, 
            b || (this.chartPosition = b = Sb(this.chart.container)), d.pageX === u ? (c = t(a.x, a.clientX - b.left), 
            d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top), r(a, {
                chartX: v(c),
                chartY: v(d)
            });
        },
        getCoordinates: function(a) {
            var b = {
                xAxis: [],
                yAxis: []
            };
            return q(this.chart.axes, function(c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({
                    axis: c,
                    value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                });
            }), b;
        },
        getIndex: function(a) {
            var b = this.chart;
            return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft;
        },
        runPointActions: function(a) {
            var e, f, i, j, b = this.chart, c = b.series, d = b.tooltip, g = b.hoverPoint, h = b.hoverSeries, k = b.chartWidth, l = this.getIndex(a);
            if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                for (f = [], i = c.length, j = 0; i > j; j++) c[j].visible && c[j].options.enableMouseTracking !== !1 && !c[j].noSharedTooltip && c[j].singularTooltips !== !0 && c[j].tooltipPoints.length && (e = c[j].tooltipPoints[l]) && e.series && (e._dist = Q(l - e.clientX), 
                k = L(k, e._dist), f.push(e));
                for (i = f.length; i--; ) f[i]._dist > k && f.splice(i, 1);
                f.length && f[0].clientX !== this.hoverX && (d.refresh(f, a), this.hoverX = f[0].clientX);
            }
            c = h && h.tooltipOptions.followPointer, h && h.tracker && !c ? (e = h.tooltipPoints[l]) && e !== g && e.onMouseOver(a) : d && c && !d.isHidden && (h = d.getAnchor([ {} ], a), 
            d.updatePosition({
                plotX: h[0],
                plotY: h[1]
            })), d && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(a) {
                W[pa] && W[pa].pointer.onDocumentMouseMove(a);
            }, N(x, "mousemove", this._onDocumentMouseMove)), q(b.axes, function(b) {
                b.drawCrosshair(a, p(e, g));
            });
        },
        reset: function(a, b) {
            var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.tooltip, g = f && f.shared ? c.hoverPoints : e;
            (a = a && f && g) && ra(g)[0].plotX === u && (a = !1), a ? (f.refresh(g), e && e.setState(e.state, !0)) : (e && e.onMouseOut(), 
            d && d.onMouseOut(), f && f.hide(b), this._onDocumentMouseMove && (X(x, "mousemove", this._onDocumentMouseMove), 
            this._onDocumentMouseMove = null), q(c.axes, function(a) {
                a.hideCrosshair();
            }), this.hoverX = null);
        },
        scaleGroups: function(a, b) {
            var d, c = this.chart;
            q(c.series, function(e) {
                d = a || e.getPlotBox(), e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), 
                e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
            }), c.clipRect.attr(b || c.clipBox);
        },
        dragStart: function(a) {
            var b = this.chart;
            b.mouseIsDown = a.type, b.cancelClick = !1, b.mouseDownX = this.mouseDownX = a.chartX, 
            b.mouseDownY = this.mouseDownY = a.chartY;
        },
        drag: function(a) {
            var l, b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, h = b.plotLeft, i = b.plotTop, j = b.plotWidth, k = b.plotHeight, n = this.mouseDownX, m = this.mouseDownY, o = c.panKey && a[c.panKey + "Key"];
            h > d ? d = h : d > h + j && (d = h + j), i > e ? e = i : e > i + k && (e = i + k), 
            this.hasDragged = Math.sqrt(Math.pow(n - d, 2) + Math.pow(m - e, 2)), this.hasDragged > 10 && (l = b.isInsidePlot(n - h, m - i), 
            b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !o && !this.selectionMarker && (this.selectionMarker = b.renderer.rect(h, i, f ? 1 : j, g ? 1 : k, 0).attr({
                fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
            }).add()), this.selectionMarker && f && (d -= n, this.selectionMarker.attr({
                width: Q(d),
                x: (d > 0 ? 0 : d) + n
            })), this.selectionMarker && g && (d = e - m, this.selectionMarker.attr({
                height: Q(d),
                y: (d > 0 ? 0 : d) + m
            })), l && !this.selectionMarker && c.panning && b.pan(a, c.panning));
        },
        drop: function(a) {
            var b = this.chart, c = this.hasPinched;
            if (this.selectionMarker) {
                var j, d = {
                    xAxis: [],
                    yAxis: [],
                    originalEvent: a.originalEvent || a
                }, e = this.selectionMarker, f = e.attr ? e.attr("x") : e.x, g = e.attr ? e.attr("y") : e.y, h = e.attr ? e.attr("width") : e.width, i = e.attr ? e.attr("height") : e.height;
                (this.hasDragged || c) && (q(b.axes, function(b) {
                    if (b.zoomEnabled) {
                        var c = b.horiz, e = "touchend" === a.type ? b.minPixelPadding : 0, m = b.toValue((c ? f : g) + e), c = b.toValue((c ? f + h : g + i) - e);
                        !isNaN(m) && !isNaN(c) && (d[b.coll].push({
                            axis: b,
                            min: L(m, c),
                            max: t(m, c)
                        }), j = !0);
                    }
                }), j && I(b, "selection", d, function(a) {
                    b.zoom(r(a, c ? {
                        animation: !1
                    } : null));
                })), this.selectionMarker = this.selectionMarker.destroy(), c && this.scaleGroups();
            }
            b && (B(b.container, {
                cursor: b._cursor
            }), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, 
            this.pinchDown = []);
        },
        onContainerMouseDown: function(a) {
            a = this.normalize(a), a.preventDefault && a.preventDefault(), this.dragStart(a);
        },
        onDocumentMouseUp: function(a) {
            W[pa] && W[pa].pointer.drop(a);
        },
        onDocumentMouseMove: function(a) {
            var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = this.normalize(a, c);
            c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset();
        },
        onContainerMouseLeave: function() {
            var a = W[pa];
            a && (a.pointer.reset(), a.pointer.chartPosition = null);
        },
        onContainerMouseMove: function(a) {
            var b = this.chart;
            pa = b.index, a = this.normalize(a), a.returnValue = !1, "mousedown" === b.mouseIsDown && this.drag(a), 
            (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a);
        },
        inClass: function(a, b) {
            for (var c; a; ) {
                if (c = F(a, "class")) {
                    if (-1 !== c.indexOf(b)) return !0;
                    if (-1 !== c.indexOf("highcharts-container")) return !1;
                }
                a = a.parentNode;
            }
        },
        onTrackerMouseOut: function(a) {
            var b = this.chart.hoverSeries, c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
            !b || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || c === b || b.onMouseOut();
        },
        onContainerClick: function(a) {
            var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, a = this.normalize(a);
            a.cancelBubble = !0, b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (I(c.series, "click", r(a, {
                point: c
            })), b.hoverPoint && c.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), 
            b.isInsidePlot(a.chartX - d, a.chartY - e) && I(b, "click", a)));
        },
        setDOMEvents: function() {
            var a = this, b = a.chart.container;
            b.onmousedown = function(b) {
                a.onContainerMouseDown(b);
            }, b.onmousemove = function(b) {
                a.onContainerMouseMove(b);
            }, b.onclick = function(b) {
                a.onContainerClick(b);
            }, N(b, "mouseleave", a.onContainerMouseLeave), 1 === ab && N(x, "mouseup", a.onDocumentMouseUp), 
            $a && (b.ontouchstart = function(b) {
                a.onContainerTouchStart(b);
            }, b.ontouchmove = function(b) {
                a.onContainerTouchMove(b);
            }, 1 === ab && N(x, "touchend", a.onDocumentTouchEnd));
        },
        destroy: function() {
            var a;
            X(this.chart.container, "mouseleave", this.onContainerMouseLeave), ab || (X(x, "mouseup", this.onDocumentMouseUp), 
            X(x, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
            for (a in this) this[a] = null;
        }
    }, r(K.Pointer.prototype, {
        pinchTranslate: function(a, b, c, d, e, f) {
            (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f), 
            (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f);
        },
        pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
            var o, p, x, i = this.chart, j = a ? "x" : "y", k = a ? "X" : "Y", l = "chart" + k, n = a ? "width" : "height", m = i["plot" + (a ? "Left" : "Top")], q = h || 1, r = i.inverted, C = i.bounds[a ? "h" : "v"], t = 1 === b.length, s = b[0][l], v = c[0][l], u = !t && b[1][l], w = !t && c[1][l], c = function() {
                !t && Q(s - u) > 20 && (q = h || Q(v - w) / Q(s - u)), p = (m - v) / q + s, o = i["plot" + (a ? "Width" : "Height")] / q;
            };
            c(), b = p, b < C.min ? (b = C.min, x = !0) : b + o > C.max && (b = C.max - o, x = !0), 
            x ? (v -= .8 * (v - g[j][0]), t || (w -= .8 * (w - g[j][1])), c()) : g[j] = [ v, w ], 
            r || (f[j] = p - m, f[n] = o), f = r ? 1 / q : q, e[n] = o, e[j] = b, d[r ? a ? "scaleY" : "scaleX" : "scale" + k] = q, 
            d["translate" + k] = f * m + (v - f * s);
        },
        pinch: function(a) {
            var b = this, c = b.chart, d = b.pinchDown, e = b.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.hasZoom, j = b.selectionMarker, k = {}, l = 1 === g && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick), n = {};
            (i || e) && !l && a.preventDefault(), Va(f, function(a) {
                return b.normalize(a);
            }), "touchstart" === a.type ? (q(f, function(a, b) {
                d[b] = {
                    chartX: a.chartX,
                    chartY: a.chartY
                };
            }), h.x = [ d[0].chartX, d[1] && d[1].chartX ], h.y = [ d[0].chartY, d[1] && d[1].chartY ], 
            q(c.axes, function(a) {
                if (a.zoomEnabled) {
                    var b = c.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, e = a.toPixels(p(a.options.min, a.dataMin)), f = a.toPixels(p(a.options.max, a.dataMax)), g = L(e, f), e = t(e, f);
                    b.min = L(a.pos, g - d), b.max = t(a.pos + a.len, e + d);
                }
            }), b.res = !0) : d.length && (j || (b.selectionMarker = j = r({
                destroy: sa
            }, c.plotBox)), b.pinchTranslate(d, f, k, j, n, h), b.hasPinched = i, b.scaleGroups(k, n), 
            !i && e && 1 === g ? this.runPointActions(b.normalize(a)) : b.res && (b.res = !1, 
            this.reset(!1, 0)));
        },
        onContainerTouchStart: function(a) {
            var b = this.chart;
            pa = b.index, 1 === a.touches.length ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), 
            this.pinch(a)) : this.reset()) : 2 === a.touches.length && this.pinch(a);
        },
        onContainerTouchMove: function(a) {
            (1 === a.touches.length || 2 === a.touches.length) && this.pinch(a);
        },
        onDocumentTouchEnd: function(a) {
            W[pa] && W[pa].pointer.drop(a);
        }
    }), G.PointerEvent || G.MSPointerEvent) {
        var ua = {}, zb = !!G.PointerEvent, Xb = function() {
            var a, b = [];
            b.item = function(a) {
                return this[a];
            };
            for (a in ua) ua.hasOwnProperty(a) && b.push({
                pageX: ua[a].pageX,
                pageY: ua[a].pageY,
                target: ua[a].target
            });
            return b;
        }, Ab = function(a, b, c, d) {
            a = a.originalEvent || a, "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !W[pa] || (d(a), 
            d = W[pa].pointer, d[b]({
                type: c,
                target: a.currentTarget,
                preventDefault: sa,
                touches: Xb()
            }));
        };
        r(Wa.prototype, {
            onContainerPointerDown: function(a) {
                Ab(a, "onContainerTouchStart", "touchstart", function(a) {
                    ua[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY,
                        target: a.currentTarget
                    };
                });
            },
            onContainerPointerMove: function(a) {
                Ab(a, "onContainerTouchMove", "touchmove", function(a) {
                    ua[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    }, ua[a.pointerId].target || (ua[a.pointerId].target = a.currentTarget);
                });
            },
            onDocumentPointerUp: function(a) {
                Ab(a, "onContainerTouchEnd", "touchend", function(a) {
                    delete ua[a.pointerId];
                });
            },
            batchMSEvents: function(a) {
                a(this.chart.container, zb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), 
                a(this.chart.container, zb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), 
                a(x, zb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
            }
        }), Na(Wa.prototype, "init", function(a, b, c) {
            a.call(this, b, c), (this.hasZoom || this.followTouchMove) && B(b.container, {
                "-ms-touch-action": P,
                "touch-action": P
            });
        }), Na(Wa.prototype, "setDOMEvents", function(a) {
            a.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(N);
        }), Na(Wa.prototype, "destroy", function(a) {
            this.batchMSEvents(X), a.call(this);
        });
    }
    var lb = K.Legend = function(a, b) {
        this.init(a, b);
    };
    lb.prototype = {
        init: function(a, b) {
            var c = this, d = b.itemStyle, e = p(b.padding, 8), f = b.itemMarginTop || 0;
            this.options = b, b.enabled && (c.itemStyle = d, c.itemHiddenStyle = w(d, b.itemHiddenStyle), 
            c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, 
            c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = p(b.symbolWidth, 16), 
            c.pages = [], c.render(), N(c.chart, "endResize", function() {
                c.positionCheckboxes();
            }));
        },
        colorizeItem: function(a, b) {
            var j, c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.legendColor || a.color || "#CCC" : g, g = a.options && a.options.marker, i = {
                fill: h
            };
            if (d && d.css({
                fill: c,
                color: c
            }), e && e.attr({
                stroke: h
            }), f) {
                if (g && f.isMarker) for (j in i.stroke = h, g = a.convertAttribs(g)) d = g[j], 
                d !== u && (i[j] = d);
                f.attr(i);
            }
        },
        positionItem: function(a) {
            var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
            a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d), 
            f && (f.x = e, f.y = d);
        },
        destroyItem: function(a) {
            var b = a.checkbox;
            q([ "legendItem", "legendLine", "legendSymbol", "legendGroup" ], function(b) {
                a[b] && (a[b] = a[b].destroy());
            }), b && Qa(a.checkbox);
        },
        destroy: function() {
            var a = this.group, b = this.box;
            b && (this.box = b.destroy()), a && (this.group = a.destroy());
        },
        positionCheckboxes: function(a) {
            var c, b = this.group.alignAttr, d = this.clipHeight || this.legendHeight;
            b && (c = b.translateY, q(this.allItems, function(e) {
                var g, f = e.checkbox;
                f && (g = c + f.y + (a || 0) + 3, B(f, {
                    left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && c + d - 6 > g ? "" : P
                }));
            }));
        },
        renderTitle: function() {
            var a = this.padding, b = this.options.title, c = 0;
            b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, 
            this.contentGroup.attr({
                translateY: c
            })), this.titleHeight = c;
        },
        renderItem: function(a) {
            var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding, h = this.itemStyle, i = this.itemHiddenStyle, j = this.padding, k = e ? p(d.itemDistance, 20) : 0, l = !d.rtl, n = d.width, m = d.itemMarginBottom || 0, o = this.itemMarginTop, q = this.initialItemX, r = a.legendItem, s = a.series && a.series.drawLegendSymbol ? a.series : a, C = s.options, C = this.createCheckboxForItem && C && C.showCheckbox, u = d.useHTML;
            r || (a.legendGroup = c.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup), a.legendItem = r = c.text(d.labelFormat ? Ja(d.labelFormat, a) : d.labelFormatter.call(a), l ? f + g : -g, this.baseline || 0, u).css(w(a.visible ? h : i)).attr({
                align: l ? "left" : "right",
                zIndex: 2
            }).add(a.legendGroup), this.baseline || (this.baseline = c.fontMetrics(h.fontSize, r).f + 3 + o, 
            r.attr("y", this.baseline)), s.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, r, u, h, i), 
            this.colorizeItem(a, a.visible), C && this.createCheckboxForItem(a)), c = r.getBBox(), 
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + k + (C ? 20 : 0), 
            this.itemHeight = g = v(a.legendItemHeight || c.height), e && this.itemX - q + f > (n || b.chartWidth - 2 * j - q - d.x) && (this.itemX = q, 
            this.itemY += o + this.lastLineHeight + m, this.lastLineHeight = 0), this.maxItemWidth = t(this.maxItemWidth, f), 
            this.lastItemY = o + this.itemY + m, this.lastLineHeight = t(g, this.lastLineHeight), 
            a._legendItemPos = [ this.itemX, this.itemY ], e ? this.itemX += f : (this.itemY += o + g + m, 
            this.lastLineHeight = g), this.offsetWidth = n || t((e ? this.itemX - q - k : f) + j, this.offsetWidth);
        },
        getAllItems: function() {
            var a = [];
            return q(this.chart.series, function(b) {
                var c = b.options;
                p(c.showInLegend, s(c.linkedTo) ? !1 : u, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)));
            }), a;
        },
        render: function() {
            var e, f, g, h, a = this, b = a.chart, c = b.renderer, d = a.group, i = a.box, j = a.options, k = a.padding, l = j.borderWidth, n = j.backgroundColor;
            a.itemX = a.initialItemX, a.itemY = a.initialItemY, a.offsetWidth = 0, a.lastItemY = 0, 
            d || (a.group = d = c.g("legend").attr({
                zIndex: 7
            }).add(), a.contentGroup = c.g().attr({
                zIndex: 1
            }).add(d), a.scrollGroup = c.g().add(a.contentGroup)), a.renderTitle(), e = a.getAllItems(), 
            ob(e, function(a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
            }), j.reversed && e.reverse(), a.allItems = e, a.display = f = !!e.length, q(e, function(b) {
                a.renderItem(b);
            }), g = j.width || a.offsetWidth, h = a.lastItemY + a.lastLineHeight + a.titleHeight, 
            h = a.handleOverflow(h), (l || n) && (g += k, h += k, i ? g > 0 && h > 0 && (i[i.isNew ? "attr" : "animate"](i.crisp({
                width: g,
                height: h
            })), i.isNew = !1) : (a.box = i = c.rect(0, 0, g, h, j.borderRadius, l || 0).attr({
                stroke: j.borderColor,
                "stroke-width": l || 0,
                fill: n || P
            }).add(d).shadow(j.shadow), i.isNew = !0), i[f ? "show" : "hide"]()), a.legendWidth = g, 
            a.legendHeight = h, q(e, function(b) {
                a.positionItem(b);
            }), f && d.align(r({
                width: g,
                height: h
            }, j), !0, "spacingBox"), b.isResizing || this.positionCheckboxes();
        },
        handleOverflow: function(a) {
            var h, o, b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f : f) - this.padding, g = e.maxHeight, i = this.clipRect, j = e.navigation, k = p(j.animation, !0), l = j.arrowSize || 12, n = this.nav, m = this.pages, r = this.allItems;
            return "horizontal" === e.layout && (f /= 2), g && (f = L(f, g)), m.length = 0, 
            a > f && !e.useHTML ? (this.clipHeight = h = t(f - 20 - this.titleHeight - this.padding, 0), 
            this.currentPage = p(this.currentPage, 1), this.fullHeight = a, q(r, function(a, b) {
                var c = a._legendItemPos[1], d = v(a.legendItem.getBBox().height), e = m.length;
                (!e || c - m[e - 1] > h && (o || c) !== m[e - 1]) && (m.push(o || c), e++), b === r.length - 1 && c + d - m[e - 1] > h && m.push(c), 
                c !== o && (o = c);
            }), i || (i = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(i)), 
            i.attr({
                height: h
            }), n || (this.nav = n = d.g().attr({
                zIndex: 1
            }).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function() {
                b.scroll(-1, k);
            }).add(n), this.pager = d.text("", 15, 10).css(j.style).add(n), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function() {
                b.scroll(1, k);
            }).add(n)), b.scroll(0), a = f) : n && (i.attr({
                height: c.chartHeight
            }), n.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0), a;
        },
        scroll: function(a, b) {
            var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, i = this.pager, j = this.padding;
            e > d && (e = d), e > 0 && (b !== u && Ra(b, this.chart), this.nav.attr({
                translateX: j,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({
                fill: 1 === e ? g : h
            }).css({
                cursor: 1 === e ? "default" : "pointer"
            }), i.attr({
                text: e + "/" + d
            }), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : h
            }).css({
                cursor: e === d ? "default" : "pointer"
            }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
                translateY: c
            }), this.currentPage = e, this.positionCheckboxes(c));
        }
    }, M = K.LegendSymbolMixin = {
        drawRectangle: function(a, b) {
            var c = a.options.symbolHeight || 12;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(b.legendGroup);
        },
        drawLineMarker: function(a) {
            var d, b = this.options, c = b.marker;
            d = a.symbolWidth;
            var g, e = this.chart.renderer, f = this.legendGroup, a = a.baseline - v(.3 * e.fontMetrics(a.options.itemStyle.fontSize, this.legendItem).b);
            b.lineWidth && (g = {
                "stroke-width": b.lineWidth
            }, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path([ "M", 0, a, "L", d, a ]).attr(g).add(f)), 
            c && c.enabled !== !1 && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), 
            d.isMarker = !0);
        }
    }, (/Trident\/7\.0/.test(wa) || Ua) && Na(lb.prototype, "positionItem", function(a, b) {
        var c = this, d = function() {
            b._legendItemPos && a.call(c, b);
        };
        d(), setTimeout(d);
    }), Ya.prototype = {
        init: function(a, b) {
            var c, d = a.series;
            a.series = null, c = w(E, a), c.series = a.series = d, this.userOptions = a, d = c.chart, 
            this.margin = this.splashArray("margin", d), this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {
                h: {},
                v: {}
            }, this.callback = b, this.isResizing = 0, this.options = c, this.axes = [], this.series = [], 
            this.hasCartesianSeries = d.showAxes;
            var g, f = this;
            if (f.index = W.length, W.push(f), ab++, d.reflow !== !1 && N(f, "load", function() {
                f.initReflow();
            }), e) for (g in e) N(f, g, e[g]);
            f.xAxis = [], f.yAxis = [], f.animation = ga ? !1 : p(d.animation, !0), f.pointCount = f.colorCounter = f.symbolCounter = 0, 
            f.firstRender();
        },
        initSeries: function(a) {
            var b = this.options.chart;
            return (b = H[a.type || b.type || b.defaultSeriesType]) || ha(17, !0), b = new b(), 
            b.init(this, a), b;
        },
        isInsidePlot: function(a, b, c) {
            var d = c ? b : a, a = c ? a : b;
            return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight;
        },
        adjustTickAmounts: function() {
            this.options.chart.alignTicks !== !1 && q(this.axes, function(a) {
                a.adjustTickAmount();
            }), this.maxTicks = null;
        },
        redraw: function(a) {
            var g, h, b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, i = this.hasCartesianSeries, j = this.isDirtyBox, k = c.length, l = k, n = this.renderer, m = n.isHidden(), o = [];
            for (Ra(a, this), m && this.cloneRenderTo(), this.layOutTitles(); l--; ) if (a = c[l], 
            a.options.stacking && (g = !0, a.isDirty)) {
                h = !0;
                break;
            }
            if (h) for (l = k; l--; ) a = c[l], a.options.stacking && (a.isDirty = !0);
            q(c, function(a) {
                a.isDirty && "point" === a.options.legendType && (f = !0);
            }), f && e.options.enabled && (e.render(), this.isDirtyLegend = !1), g && this.getStacks(), 
            i && (this.isResizing || (this.maxTicks = null, q(b, function(a) {
                a.setScale();
            })), this.adjustTickAmounts()), this.getMargins(), i && (q(b, function(a) {
                a.isDirty && (j = !0);
            }), q(b, function(a) {
                a.isDirtyExtremes && (a.isDirtyExtremes = !1, o.push(function() {
                    I(a, "afterSetExtremes", r(a.eventArgs, a.getExtremes())), delete a.eventArgs;
                })), (j || g) && a.redraw();
            })), j && this.drawChartBox(), q(c, function(a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
            }), d && d.reset(!0), n.draw(), I(this, "redraw"), m && this.cloneRenderTo(!0), 
            q(o, function(a) {
                a.call();
            });
        },
        get: function(a) {
            var d, e, b = this.axes, c = this.series;
            for (d = 0; d < b.length; d++) if (b[d].options.id === a) return b[d];
            for (d = 0; d < c.length; d++) if (c[d].options.id === a) return c[d];
            for (d = 0; d < c.length; d++) for (e = c[d].points || [], b = 0; b < e.length; b++) if (e[b].id === a) return e[b];
            return null;
        },
        getAxes: function() {
            var a = this, b = this.options, c = b.xAxis = ra(b.xAxis || {}), b = b.yAxis = ra(b.yAxis || {});
            q(c, function(a, b) {
                a.index = b, a.isX = !0;
            }), q(b, function(a, b) {
                a.index = b;
            }), c = c.concat(b), q(c, function(b) {
                new na(a, b);
            }), a.adjustTickAmounts();
        },
        getSelectedPoints: function() {
            var a = [];
            return q(this.series, function(b) {
                a = a.concat(wb(b.points || [], function(a) {
                    return a.selected;
                }));
            }), a;
        },
        getSelectedSeries: function() {
            return wb(this.series, function(a) {
                return a.selected;
            });
        },
        getStacks: function() {
            var a = this;
            q(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
            }), q(a.series, function(b) {
                !b.options.stacking || b.visible !== !0 && a.options.chart.ignoreHiddenSeries !== !1 || (b.stackKey = b.type + p(b.options.stack, ""));
            });
        },
        setTitle: function(a, b, c) {
            var g, f, d = this, e = d.options;
            f = e.title = w(e.title, a), g = e.subtitle = w(e.subtitle, b), e = g, q([ [ "title", a, f ], [ "subtitle", b, e ] ], function(a) {
                var b = a[0], c = d[b], e = a[1], a = a[2];
                c && e && (d[b] = c = c.destroy()), a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add());
            }), d.layOutTitles(c);
        },
        layOutTitles: function(a) {
            var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.renderer, h = this.spacingBox.width - 44;
            !c || (c.css({
                width: (f.width || h) + "px"
            }).align(r({
                y: g.fontMetrics(f.style.fontSize, c).b - 3
            }, f), !1, "spacingBox"), f.floating || f.verticalAlign) || (b = c.getBBox().height), 
            d && (d.css({
                width: (e.width || h) + "px"
            }).align(r({
                y: b + (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b
            }, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = La(b + d.getBBox().height))), 
            c = this.titleOffset !== b, this.titleOffset = b, !this.isDirtyBox && c && (this.isDirtyBox = c, 
            this.hasRendered && p(a, !0) && this.isDirtyBox && this.redraw());
        },
        getChartSize: function() {
            var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
            s(b) || (this.containerWidth = ib(c, "width")), s(a) || (this.containerHeight = ib(c, "height")), 
            this.chartWidth = t(0, b || this.containerWidth || 600), this.chartHeight = t(0, p(a, this.containerHeight > 19 ? this.containerHeight : 400));
        },
        cloneRenderTo: function(a) {
            var b = this.renderToClone, c = this.container;
            a ? b && (this.renderTo.appendChild(c), Qa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), 
            this.renderToClone = b = this.renderTo.cloneNode(0), B(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), 
            x.body.appendChild(b), c && b.appendChild(c));
        },
        getContainer: function() {
            var a, c, d, e, b = this.options.chart;
            this.renderTo = a = b.renderTo, e = "highcharts-" + ub++, Ga(a) && (this.renderTo = a = x.getElementById(a)), 
            a || ha(13, !0), c = y(F(a, "data-highcharts-chart")), !isNaN(c) && W[c] && W[c].hasRendered && W[c].destroy(), 
            F(a, "data-highcharts-chart", this.index), a.innerHTML = "", !b.skipClone && !a.offsetWidth && this.cloneRenderTo(), 
            this.getChartSize(), c = this.chartWidth, d = this.chartHeight, this.container = a = $(Ka, {
                className: "highcharts-container" + (b.className ? " " + b.className : ""),
                id: e
            }, r({
                position: "relative",
                overflow: "hidden",
                width: c + "px",
                height: d + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, b.style), this.renderToClone || a), this._cursor = a.style.cursor, this.renderer = b.forExport ? new ta(a, c, d, b.style, !0) : new Za(a, c, d, b.style), 
            ga && this.renderer.create(this, a, c, d);
        },
        getMargins: function() {
            var b, a = this.spacing, c = this.legend, d = this.margin, e = this.options.legend, f = p(e.margin, 20), g = e.x, h = e.y, i = e.align, j = e.verticalAlign, k = this.titleOffset;
            this.resetMargins(), b = this.axisOffset, k && !s(d[0]) && (this.plotTop = t(this.plotTop, k + this.options.title.margin + a[0])), 
            c.display && !e.floating && ("right" === i ? s(d[1]) || (this.marginRight = t(this.marginRight, c.legendWidth - g + f + a[1])) : "left" === i ? s(d[3]) || (this.plotLeft = t(this.plotLeft, c.legendWidth + g + f + a[3])) : "top" === j ? s(d[0]) || (this.plotTop = t(this.plotTop, c.legendHeight + h + f + a[0])) : "bottom" !== j || s(d[2]) || (this.marginBottom = t(this.marginBottom, c.legendHeight - h + f + a[2]))), 
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), 
            this.hasCartesianSeries && q(this.axes, function(a) {
                a.getOffset();
            }), s(d[3]) || (this.plotLeft += b[3]), s(d[0]) || (this.plotTop += b[0]), s(d[2]) || (this.marginBottom += b[2]), 
            s(d[1]) || (this.marginRight += b[1]), this.setChartSize();
        },
        reflow: function(a) {
            var b = this, c = b.options.chart, d = b.renderTo, e = c.width || ib(d, "width"), f = c.height || ib(d, "height"), c = a ? a.target : G, d = function() {
                b.container && (b.setSize(e, f, !1), b.hasUserSize = null);
            };
            b.hasUserSize || !e || !f || c !== G && c !== x || ((e !== b.containerWidth || f !== b.containerHeight) && (clearTimeout(b.reflowTimeout), 
            a ? b.reflowTimeout = setTimeout(d, 100) : d()), b.containerWidth = e, b.containerHeight = f);
        },
        initReflow: function() {
            var a = this, b = function(b) {
                a.reflow(b);
            };
            N(G, "resize", b), N(a, "destroy", function() {
                X(G, "resize", b);
            });
        },
        setSize: function(a, b, c) {
            var e, f, g, d = this;
            d.isResizing += 1, g = function() {
                d && I(d, "endResize", null, function() {
                    d.isResizing -= 1;
                });
            }, Ra(c, d), d.oldChartHeight = d.chartHeight, d.oldChartWidth = d.chartWidth, s(a) && (d.chartWidth = e = t(0, v(a)), 
            d.hasUserSize = !!e), s(b) && (d.chartHeight = f = t(0, v(b))), (va ? jb : B)(d.container, {
                width: e + "px",
                height: f + "px"
            }, va), d.setChartSize(!0), d.renderer.setSize(e, f, c), d.maxTicks = null, q(d.axes, function(a) {
                a.isDirty = !0, a.setScale();
            }), q(d.series, function(a) {
                a.isDirty = !0;
            }), d.isDirtyLegend = !0, d.isDirtyBox = !0, d.layOutTitles(), d.getMargins(), d.redraw(c), 
            d.oldChartHeight = null, I(d, "resize"), va === !1 ? g() : setTimeout(g, va && va.duration || 500);
        },
        setChartSize: function(a) {
            var i, j, k, l, b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset;
            this.plotLeft = i = v(this.plotLeft), this.plotTop = j = v(this.plotTop), this.plotWidth = k = t(0, v(d - i - this.marginRight)), 
            this.plotHeight = l = t(0, v(e - j - this.marginBottom)), this.plotSizeX = b ? l : k, 
            this.plotSizeY = b ? k : l, this.plotBorderWidth = f.plotBorderWidth || 0, this.spacingBox = c.spacingBox = {
                x: g[3],
                y: g[0],
                width: d - g[3] - g[1],
                height: e - g[0] - g[2]
            }, this.plotBox = c.plotBox = {
                x: i,
                y: j,
                width: k,
                height: l
            }, d = 2 * U(this.plotBorderWidth / 2), b = La(t(d, h[3]) / 2), c = La(t(d, h[0]) / 2), 
            this.clipBox = {
                x: b,
                y: c,
                width: U(this.plotSizeX - t(d, h[1]) / 2 - b),
                height: t(0, U(this.plotSizeY - t(d, h[2]) / 2 - c))
            }, a || q(this.axes, function(a) {
                a.setAxisSize(), a.setAxisTranslation();
            });
        },
        resetMargins: function() {
            var a = this.spacing, b = this.margin;
            this.plotTop = p(b[0], a[0]), this.marginRight = p(b[1], a[1]), this.marginBottom = p(b[2], a[2]), 
            this.plotLeft = p(b[3], a[3]), this.axisOffset = [ 0, 0, 0, 0 ], this.clipOffset = [ 0, 0, 0, 0 ];
        },
        drawChartBox: function() {
            var m, a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, l = a.plotBackgroundImage, n = a.plotBorderWidth || 0, o = this.plotLeft, p = this.plotTop, q = this.plotWidth, r = this.plotHeight, t = this.plotBox, s = this.clipRect, v = this.clipBox;
            m = i + (a.shadow ? 8 : 0), (i || j) && (e ? e.animate(e.crisp({
                width: c - m,
                height: d - m
            })) : (e = {
                fill: j || P
            }, i && (e.stroke = a.borderColor, e["stroke-width"] = i), this.chartBackground = b.rect(m / 2, m / 2, c - m, d - m, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow))), 
            k && (f ? f.animate(t) : this.plotBackground = b.rect(o, p, q, r, 0).attr({
                fill: k
            }).add().shadow(a.plotShadow)), l && (h ? h.animate(t) : this.plotBGImage = b.image(l, o, p, q, r).add()), 
            s ? s.animate({
                width: v.width,
                height: v.height
            }) : this.clipRect = b.clipRect(v), n && (g ? g.animate(g.crisp({
                x: o,
                y: p,
                width: q,
                height: r,
                strokeWidth: -n
            })) : this.plotBorder = b.rect(o, p, q, r, 0, -n).attr({
                stroke: a.plotBorderColor,
                "stroke-width": n,
                fill: P,
                zIndex: 1
            }).add()), this.isDirtyBox = !1;
        },
        propFromSeries: function() {
            var c, e, f, a = this, b = a.options.chart, d = a.options.series;
            q([ "inverted", "angular", "polar" ], function(g) {
                for (c = H[b.type || b.defaultSeriesType], f = a[g] || b[g] || c && c.prototype[g], 
                e = d && d.length; !f && e--; ) (c = H[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f;
            });
        },
        linkSeries: function() {
            var a = this, b = a.series;
            q(b, function(a) {
                a.linkedSeries.length = 0;
            }), q(b, function(b) {
                var d = b.options.linkedTo;
                Ga(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b), 
                b.linkedParent = d);
            });
        },
        renderSeries: function() {
            q(this.series, function(a) {
                a.translate(), a.setTooltipPoints && a.setTooltipPoints(), a.render();
            });
        },
        renderLabels: function() {
            var a = this, b = a.options.labels;
            b.items && q(b.items, function(c) {
                var d = r(b.style, c.style), e = y(d.left) + a.plotLeft, f = y(d.top) + a.plotTop + 12;
                delete d.left, delete d.top, a.renderer.text(c.html, e, f).attr({
                    zIndex: 2
                }).css(d).add();
            });
        },
        render: function() {
            var a = this.axes, b = this.renderer, c = this.options;
            this.setTitle(), this.legend = new lb(this, c.legend), this.getStacks(), q(a, function(a) {
                a.setScale();
            }), this.getMargins(), this.maxTicks = null, q(a, function(a) {
                a.setTickPositions(!0), a.setMaxTicks();
            }), this.adjustTickAmounts(), this.getMargins(), this.drawChartBox(), this.hasCartesianSeries && q(a, function(a) {
                a.render();
            }), this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                zIndex: 3
            }).add()), this.renderSeries(), this.renderLabels(), this.showCredits(c.credits), 
            this.hasRendered = !0;
        },
        showCredits: function(a) {
            a.enabled && !this.credits && (this.credits = this.renderer.text(a.text, 0, 0).on("click", function() {
                a.href && (location.href = a.href);
            }).attr({
                align: a.position.align,
                zIndex: 8
            }).css(a.style).add().align(a.position));
        },
        destroy: function() {
            var e, a = this, b = a.axes, c = a.series, d = a.container, f = d && d.parentNode;
            for (I(a, "destroy"), W[a.index] = u, ab--, a.renderTo.removeAttribute("data-highcharts-chart"), 
            X(a), e = b.length; e--; ) b[e] = b[e].destroy();
            for (e = c.length; e--; ) c[e] = c[e].destroy();
            q("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
                var c = a[b];
                c && c.destroy && (a[b] = c.destroy());
            }), d && (d.innerHTML = "", X(d), f && Qa(d));
            for (e in a) delete a[e];
        },
        isReadyToRender: function() {
            var a = this;
            return !ba && G == G.top && "complete" !== x.readyState || ga && !G.canvg ? (ga ? Mb.push(function() {
                a.firstRender();
            }, a.options.global.canvasToolsURL) : x.attachEvent("onreadystatechange", function() {
                x.detachEvent("onreadystatechange", a.firstRender), "complete" === x.readyState && a.firstRender();
            }), !1) : !0;
        },
        firstRender: function() {
            var a = this, b = a.options, c = a.callback;
            a.isReadyToRender() && (a.getContainer(), I(a, "init"), a.resetMargins(), a.setChartSize(), 
            a.propFromSeries(), a.getAxes(), q(b.series || [], function(b) {
                a.initSeries(b);
            }), a.linkSeries(), I(a, "beforeRender"), K.Pointer && (a.pointer = new Wa(a, b)), 
            a.render(), a.renderer.draw(), c && c.apply(a, [ a ]), q(a.callbacks, function(b) {
                b.apply(a, [ a ]);
            }), a.cloneRenderTo(!0), I(a, "load"));
        },
        splashArray: function(a, b) {
            var c = b[a], c = da(c) ? c : [ c, c, c, c ];
            return [ p(b[a + "Top"], c[0]), p(b[a + "Right"], c[1]), p(b[a + "Bottom"], c[2]), p(b[a + "Left"], c[3]) ];
        }
    }, Ya.prototype.callbacks = [], Z = K.CenteredSeriesMixin = {
        getCenter: function() {
            var d, h, a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [ p(b[0], "50%"), p(b[1], "50%"), a.size || "100%", a.innerSize || 0 ], g = L(e, f);
            return Va(a, function(a, b) {
                return h = /%$/.test(a), d = 2 > b || 2 === b && h, (h ? [ e, f, g, g ][b] * y(a) / 100 : a) + (d ? c : 0);
            });
        }
    };
    var Fa = function() {};
    Fa.prototype = {
        init: function(a, b, c) {
            return this.series = a, this.applyOptions(b, c), this.pointAttr = {}, a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, 
            this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length) && (a.colorCounter = 0), 
            a.chart.pointCount++, this;
        },
        applyOptions: function(a, b) {
            var c = this.series, d = c.options.pointValKey || c.pointValKey, a = Fa.prototype.optionsToObject.call(this, a);
            return r(this, a), this.options = this.options ? r(this.options, a) : a, d && (this.y = this[d]), 
            this.x === u && c && (this.x = b === u ? c.autoIncrement() : b), this;
        },
        optionsToObject: function(a) {
            var b = {}, c = this.series, d = c.pointArrayMap || [ "y" ], e = d.length, f = 0, g = 0;
            if ("number" == typeof a || null === a) b[d[0]] = a; else if (Ha(a)) for (a.length > e && (c = typeof a[0], 
            "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), f++); e > g; ) b[d[g++]] = a[f++]; else "object" == typeof a && (b = a, 
            a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
            return b;
        },
        destroy: function() {
            var c, a = this.series.chart, b = a.hoverPoints;
            a.pointCount--, b && (this.setState(), la(b, this), !b.length) && (a.hoverPoints = null), 
            this === a.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (X(this), 
            this.destroyElements()), this.legendItem && a.legend.destroyItem(this);
            for (c in this) this[c] = null;
        },
        destroyElements: function() {
            for (var b, a = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), c = 6; c--; ) b = a[c], 
            this[b] && (this[b] = this[b].destroy());
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            };
        },
        tooltipFormatter: function(a) {
            var b = this.series, c = b.tooltipOptions, d = p(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
            return q(b.pointArrayMap || [ "y" ], function(b) {
                b = "{point." + b, (e || f) && (a = a.replace(b + "}", e + b + "}" + f)), a = a.replace(b + "}", b + ":,." + d + "f}");
            }), Ja(a, {
                point: this,
                series: this.series
            });
        },
        firePointEvent: function(a, b, c) {
            var d = this, e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), 
            "click" === a && e.allowPointSelect && (c = function(a) {
                d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
            }), I(this, a, b, c);
        }
    };
    var O = function() {};
    O.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: Fa,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: [ "xAxis", "yAxis" ],
        colorCounter: 0,
        parallelArrays: [ "x", "y" ],
        init: function(a, b) {
            var d, e, c = this, f = a.series, g = function(a, b) {
                return p(a.options.index, a._i) - p(b.options.index, b._i);
            };
            c.chart = a, c.options = b = c.setOptions(b), c.linkedSeries = [], c.bindAxes(), 
            r(c, {
                name: b.name,
                state: "",
                pointAttr: {},
                visible: b.visible !== !1,
                selected: b.selected === !0
            }), ga && (b.animation = !1), e = b.events;
            for (d in e) N(c, d, e[d]);
            (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) && (a.runTrackerClick = !0), 
            c.getColor(), c.getSymbol(), q(c.parallelArrays, function(a) {
                c[a + "Data"] = [];
            }), c.setData(b.data, !1), c.isCartesian && (a.hasCartesianSeries = !0), f.push(c), 
            c._i = f.length - 1, ob(f, g), this.yAxis && ob(this.yAxis.series, g), q(f, function(a, b) {
                a.index = b, a.name = a.name || "Series " + (b + 1);
            });
        },
        bindAxes: function() {
            var d, a = this, b = a.options, c = a.chart;
            q(a.axisTypes || [], function(e) {
                q(c[e], function(c) {
                    d = c.options, (b[e] === d.index || b[e] !== u && b[e] === d.id || b[e] === u && 0 === d.index) && (c.series.push(a), 
                    a[e] = c, c.isDirty = !0);
                }), !a[e] && a.optionalAxis !== e && ha(18, !0);
            });
        },
        updateParallelArrays: function(a, b) {
            var c = a.series, d = arguments;
            q(c.parallelArrays, "number" == typeof b ? function(d) {
                var f = "y" === d && c.toYData ? c.toYData(a) : a[d];
                c[d + "Data"][b] = f;
            } : function(a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
            });
        },
        autoIncrement: function() {
            var a = this.options, b = this.xIncrement, b = p(b, a.pointStart, 0);
            return this.pointInterval = p(this.pointInterval, a.pointInterval, 1), this.xIncrement = b + this.pointInterval, 
            b;
        },
        getSegments: function() {
            var c, a = -1, b = [], d = this.points, e = d.length;
            if (e) if (this.options.connectNulls) {
                for (c = e; c--; ) null === d[c].y && d.splice(c, 1);
                d.length && (b = [ d ]);
            } else q(d, function(c, g) {
                null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1));
            });
            this.segments = b;
        },
        setOptions: function(a) {
            var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            return this.userOptions = a, c = w(e, c.series, a), this.tooltipOptions = w(E.tooltip, E.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip), 
            null === e.marker && delete c.marker, c;
        },
        getCyclic: function(a, b, c) {
            var d = this.userOptions, e = "_" + a + "Index", f = a + "Counter";
            b || (s(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), 
            b = c[b]), this[a] = b;
        },
        getColor: function() {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || ca[this.type].color, this.chart.options.colors);
        },
        getSymbol: function() {
            var a = this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (a.radius = 0);
        },
        drawLegendSymbol: M.drawLineMarker,
        setData: function(a, b, c, d) {
            var h, e = this, f = e.points, g = f && f.length || 0, i = e.options, j = e.chart, k = null, l = e.xAxis, n = l && !!l.categories, m = e.tooltipPoints, o = i.turboThreshold, r = this.xData, t = this.yData, s = (h = e.pointArrayMap) && h.length, a = a || [];
            if (h = a.length, b = p(b, !0), d === !1 || !h || g !== h || e.cropped || e.hasGroupedData) {
                if (e.xIncrement = null, e.pointRange = n ? 1 : i.pointRange, e.colorCounter = 0, 
                q(this.parallelArrays, function(a) {
                    e[a + "Data"].length = 0;
                }), o && h > o) {
                    for (c = 0; null === k && h > c; ) k = a[c], c++;
                    if (ja(k)) {
                        for (n = p(i.pointStart, 0), i = p(i.pointInterval, 1), c = 0; h > c; c++) r[c] = n, 
                        t[c] = a[c], n += i;
                        e.xIncrement = n;
                    } else if (Ha(k)) if (s) for (c = 0; h > c; c++) i = a[c], r[c] = i[0], t[c] = i.slice(1, s + 1); else for (c = 0; h > c; c++) i = a[c], 
                    r[c] = i[0], t[c] = i[1]; else ha(12);
                } else for (c = 0; h > c; c++) a[c] !== u && (i = {
                    series: e
                }, e.pointClass.prototype.applyOptions.apply(i, [ a[c] ]), e.updateParallelArrays(i, c), 
                n && i.name) && (l.names[i.x] = i.name);
                for (Ga(t[0]) && ha(14, !0), e.data = [], e.options.data = a, c = g; c--; ) f[c] && f[c].destroy && f[c].destroy();
                m && (m.length = 0), l && (l.minRange = l.userMinRange), e.isDirty = e.isDirtyData = j.isDirtyBox = !0, 
                c = !1;
            } else q(a, function(a, b) {
                f[b].update(a, !1, null, !1);
            });
            b && j.redraw(c);
        },
        processData: function(a) {
            var e, b = this.xData, c = this.yData, d = b.length;
            e = 0;
            var f, g, i, h = this.xAxis, j = this.options;
            i = j.cropThreshold;
            var n, m, k = 0, l = this.isCartesian;
            if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) return !1;
            for (h && (n = h.getExtremes(), m = n.min, n = n.max), l && this.sorted && (!i || d > i || this.forceCrop) && (b[d - 1] < m || b[0] > n ? (b = [], 
            c = []) : (b[0] < m || b[d - 1] > n) && (e = this.cropData(this.xData, this.yData, m, n), 
            b = e.xData, c = e.yData, e = e.start, f = !0, k = b.length)), i = b.length - 1; i >= 0; i--) d = b[i] - b[i - 1], 
            !f && b[i] > m && b[i] < n && k++, d > 0 && (g === u || g > d) ? g = d : 0 > d && this.requireSorting && ha(15);
            this.cropped = f, this.cropStart = e, this.processedXData = b, this.processedYData = c, 
            this.activePointCount = k, null === j.pointRange && (this.pointRange = g || 1), 
            this.closestPointRange = g;
        },
        cropData: function(a, b, c, d) {
            var i, e = a.length, f = 0, g = e, h = p(this.cropShoulder, 1);
            for (i = 0; e > i; i++) if (a[i] >= c) {
                f = t(0, i - h);
                break;
            }
            for (;e > i; i++) if (a[i] > d) {
                g = i + h;
                break;
            }
            return {
                xData: a.slice(f, g),
                yData: b.slice(f, g),
                start: f,
                end: g
            };
        },
        generatePoints: function() {
            var c, i, k, n, a = this.options.data, b = this.data, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, j = this.hasGroupedData, l = [];
            for (b || j || (b = [], b.length = a.length, b = this.data = b), n = 0; g > n; n++) i = h + n, 
            j ? l[n] = new f().init(this, [ d[n] ].concat(ra(e[n]))) : (b[i] ? k = b[i] : a[i] !== u && (b[i] = k = new f().init(this, a[i], d[n])), 
            l[n] = k), l[n].index = i;
            if (b && (g !== (c = b.length) || j)) for (n = 0; c > n; n++) n === h && !j && (n += g), 
            b[n] && (b[n].destroyElements(), b[n].plotX = u);
            this.data = b, this.points = l;
        },
        getExtremes: function(a) {
            var d, b = this.yAxis, c = this.processedXData, e = [], f = 0;
            d = this.xAxis.getExtremes();
            var i, j, k, l, g = d.min, h = d.max, a = a || this.stackedYData || this.processedYData;
            for (d = a.length, l = 0; d > l; l++) if (j = c[l], k = a[l], i = null !== k && k !== u && (!b.isLog || k.length || k > 0), 
            j = this.getExtremesFromAll || this.cropped || (c[l + 1] || j) >= g && (c[l - 1] || j) <= h, 
            i && j) if (i = k.length) for (;i--; ) null !== k[i] && (e[f++] = k[i]); else e[f++] = k;
            this.dataMin = p(void 0, Oa(e)), this.dataMax = p(void 0, Ca(e));
        },
        translate: function() {
            this.processedXData || this.processData(), this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i = a.pointPlacement, j = "between" === i || ja(i), k = a.threshold, a = 0; g > a; a++) {
                var l = f[a], n = l.x, m = l.y, o = l.low, q = b && e.stacks[(this.negStacks && k > m ? "-" : "") + this.stackKey];
                e.isLog && 0 >= m && (l.y = m = null, ha(10)), l.plotX = c.translate(n, 0, 0, 0, 1, i, "flags" === this.type), 
                b && this.visible && q && q[n] && (q = q[n], m = q.points[this.index + "," + a], 
                o = m[0], m = m[1], 0 === o && (o = p(k, e.min)), e.isLog && 0 >= o && (o = null), 
                l.total = l.stackTotal = q.total, l.percentage = q.total && l.y / q.total * 100, 
                l.stackY = m, q.setOffset(this.pointXOffset || 0, this.barW || 0)), l.yBottom = s(o) ? e.translate(o, 0, 1, 0, 1) : null, 
                h && (m = this.modifyValue(m, l)), l.plotY = "number" == typeof m && m !== 1 / 0 ? e.translate(m, 0, 1, 0, 1) : u, 
                l.clientX = j ? c.translate(n, 0, 0, 0, 1) : l.plotX, l.negative = l.y < (k || 0), 
                l.category = d && d[l.x] !== u ? d[l.x] : l.x;
            }
            this.getSegments();
        },
        animate: function(a) {
            var d, b = this.chart, c = b.renderer;
            d = this.options.animation;
            var g, e = this.clipBox || b.clipBox, f = b.inverted;
            d && !da(d) && (d = ca[this.type].animation), g = [ "_sharedClip", d.duration, d.easing, e.height ].join(","), 
            a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(r(e, {
                width: 0
            })), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), 
            this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) : ((a = b[g]) && a.animate({
                width: b.plotSizeX
            }, d), b[g + "m"] && b[g + "m"].animate({
                width: b.plotSizeX + 99
            }, d), this.animate = null);
        },
        afterAnimate: function() {
            var a = this.chart, b = this.sharedClipKey, c = this.group, d = this.clipBox;
            c && this.options.clip !== !1 && (b && d || c.clip(d ? a.renderer.clipRect(d) : a.clipRect), 
            this.markerGroup.clip()), I(this, "afterAnimate"), setTimeout(function() {
                b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy()));
            }, 100);
        },
        drawPoints: function() {
            var a, d, e, f, g, h, i, j, k, m, o, q, b = this.points, c = this.chart, l = this.options.marker, n = this.pointAttr[""], t = this.markerGroup, s = p(l.enabled, !this.requireSorting || this.activePointCount < .5 * this.xAxis.len / l.radius);
            if (l.enabled !== !1 || this._hasPointMarkers) for (f = b.length; f--; ) g = b[f], 
            d = U(g.plotX), e = g.plotY, k = g.graphic, m = g.marker || {}, o = !!g.marker, 
            a = s && m.enabled === u || m.enabled, q = c.isInsidePlot(v(d), e, c.inverted), 
            a && e !== u && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" : ""] || n, 
            h = a.r, i = p(m.symbol, this.symbol), j = 0 === i.indexOf("url"), k ? k[q ? "show" : "hide"](!0).animate(r({
                x: d - h,
                y: e - h
            }, k.symbolName ? {
                width: 2 * h,
                height: 2 * h
            } : {})) : q && (h > 0 || j) && (g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, o ? m : l).attr(a).add(t))) : k && (g.graphic = k.destroy());
        },
        convertAttribs: function(a, b, c, d) {
            var f, g, e = this.pointAttrToOptions, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
            for (f in e) g = e[f], h[f] = p(a[g], b[f], c[f], d[f]);
            return h;
        },
        getAttribs: function() {
            var f, a = this, b = a.options, c = ca[a.type].marker ? b.marker : b, d = c.states, e = d.hover, g = a.color;
            f = {
                stroke: g,
                fill: g
            };
            var i, k, h = a.points || [], j = [], l = a.pointAttrToOptions;
            k = a.hasPointSpecificOptions;
            var n = b.negativeColor, m = c.lineColor, o = c.fillColor;
            i = b.turboThreshold;
            var p;
            if (b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : e.color = e.color || ya(e.color || g).brighten(e.brightness).get(), 
            j[""] = a.convertAttribs(c, f), q([ "hover", "select" ], function(b) {
                j[b] = a.convertAttribs(d[b], j[""]);
            }), a.pointAttr = j, g = h.length, !i || i > g || k) for (;g--; ) {
                if (i = h[g], (c = i.options && i.options.marker || i.options) && c.enabled === !1 && (c.radius = 0), 
                i.negative && n && (i.color = i.fillColor = n), k = b.colorByPoint || i.color, i.options) for (p in l) s(c[l[p]]) && (k = !0);
                k ? (c = c || {}, k = [], d = c.states || {}, f = d.hover = d.hover || {}, b.marker || (f.color = f.color || !i.options.color && e.color || ya(i.color).brighten(f.brightness || e.brightness).get()), 
                f = {
                    color: i.color
                }, o || (f.fillColor = i.color), m || (f.lineColor = i.color), k[""] = a.convertAttribs(r(f, c), j[""]), 
                k.hover = a.convertAttribs(d.hover, j.hover, k[""]), k.select = a.convertAttribs(d.select, j.select, k[""])) : k = j, 
                i.pointAttr = k;
            }
        },
        destroy: function() {
            var d, e, g, h, i, a = this, b = a.chart, c = /AppleWebKit\/533/.test(wa), f = a.data || [];
            for (I(a, "destroy"), X(a), q(a.axisTypes || [], function(b) {
                (i = a[b]) && (la(i.series, a), i.isDirty = i.forceRedraw = !0);
            }), a.legendItem && a.chart.legend.destroyItem(a), e = f.length; e--; ) (g = f[e]) && g.destroy && g.destroy();
            a.points = null, clearTimeout(a.animationTimeout), q("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(b) {
                a[b] && (d = c && "group" === b ? "hide" : "destroy", a[b][d]());
            }), b.hoverSeries === a && (b.hoverSeries = null), la(b.series, a);
            for (h in a) delete a[h];
        },
        getSegmentPath: function(a) {
            var b = this, c = [], d = b.options.step;
            return q(a, function(e, f) {
                var i, g = e.plotX, h = e.plotY;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), 
                d && f && (i = a[f - 1], "right" === d ? c.push(i.plotX, h) : "center" === d ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), 
                c.push(e.plotX, e.plotY));
            }), c;
        },
        getGraphPath: function() {
            var c, a = this, b = [], d = [];
            return q(a.segments, function(e) {
                c = a.getSegmentPath(e), e.length > 1 ? b = b.concat(c) : d.push(e[0]);
            }), a.singlePoints = d, a.graphPath = b;
        },
        drawGraph: function() {
            var a = this, b = this.options, c = [ [ "graph", b.lineColor || this.color ] ], d = b.lineWidth, e = b.dashStyle, f = "square" !== b.linecap, g = this.getGraphPath(), h = b.negativeColor;
            h && c.push([ "graphNeg", h ]), q(c, function(c, h) {
                var k = c[0], l = a[k];
                l ? (bb(l), l.animate({
                    d: g
                })) : d && g.length && (l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: P,
                    zIndex: 1
                }, e ? l.dashstyle = e : f && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), 
                a[k] = a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h && b.shadow));
            });
        },
        clipNeg: function() {
            var e, a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor || a.negativeFillColor, f = this.graph, g = this.area, h = this.posClip, i = this.negClip;
            e = b.chartWidth;
            var j = b.chartHeight, k = t(e, j), l = this.yAxis;
            d && (f || g) && (d = v(l.toPixels(a.threshold || 0, !0)), 0 > d && (k -= d), a = {
                x: 0,
                y: 0,
                width: k,
                height: d
            }, k = {
                x: 0,
                y: d,
                width: k,
                height: k
            }, b.inverted && (a.height = k.y = b.plotWidth - d, c.isVML && (a = {
                x: b.plotWidth - d - b.plotLeft,
                y: 0,
                width: e,
                height: j
            }, k = {
                x: d + b.plotLeft - e,
                y: 0,
                width: b.plotLeft + d,
                height: e
            })), l.reversed ? (b = k, e = a) : (b = a, e = k), h ? (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), 
            this.negClip = i = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(i)), 
            g && (g.clip(h), this.areaNeg.clip(i))));
        },
        invertGroups: function() {
            function a() {
                var a = {
                    width: b.yAxis.len,
                    height: b.xAxis.len
                };
                q([ "group", "markerGroup" ], function(c) {
                    b[c] && b[c].attr(a).invert();
                });
            }
            var b = this, c = b.chart;
            b.xAxis && (N(c, "resize", a), N(b, "destroy", function() {
                X(c, "resize", a);
            }), a(), b.invertGroups = a);
        },
        plotGroup: function(a, b, c, d, e) {
            var f = this[a], g = !f;
            return g && (this[a] = f = this.chart.renderer.g(b).attr({
                visibility: c,
                zIndex: d || .1
            }).add(e)), f[g ? "attr" : "animate"](this.getPlotBox()), f;
        },
        getPlotBox: function() {
            var a = this.chart, b = this.xAxis, c = this.yAxis;
            return a.inverted && (b = c, c = this.xAxis), {
                translateX: b ? b.left : a.plotLeft,
                translateY: c ? c.top : a.plotTop,
                scaleX: 1,
                scaleY: 1
            };
        },
        render: function() {
            var c, a = this, b = a.chart, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && p(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, h = a.hasRendered, i = b.seriesGroup;
            c = a.plotGroup("group", "series", f, g, i), a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, i), 
            e && a.animate(!0), a.getAttribs(), c.inverted = a.isCartesian ? b.inverted : !1, 
            a.drawGraph && (a.drawGraph(), a.clipNeg()), q(a.points, function(a) {
                a.redraw && a.redraw();
            }), a.drawDataLabels && a.drawDataLabels(), a.visible && a.drawPoints(), a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker(), 
            b.inverted && a.invertGroups(), d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect), 
            e && a.animate(), h || (e ? a.animationTimeout = setTimeout(function() {
                a.afterAnimate();
            }, e) : a.afterAnimate()), a.isDirty = a.isDirtyData = !1, a.hasRendered = !0;
        },
        redraw: function() {
            var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
            c && (a.inverted && c.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), c.animate({
                translateX: p(d && d.left, a.plotLeft),
                translateY: p(e && e.top, a.plotTop)
            })), this.translate(), this.setTooltipPoints && this.setTooltipPoints(!0), this.render(), 
            b && I(this, "updatedData");
        }
    }, Gb.prototype = {
        destroy: function() {
            Pa(this, this.axis);
        },
        render: function(a) {
            var b = this.options, c = b.format, c = c ? Ja(c, this) : b.formatter.call(this);
            this.label ? this.label.attr({
                text: c,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
                align: this.textAlign,
                rotation: b.rotation,
                visibility: "hidden"
            }).add(a);
        },
        setOffset: function(a, b) {
            var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = Q(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight, f = {
                x: e ? f ? g : g - c : h,
                y: e ? i - h - b : f ? i - g - c : i - g,
                width: e ? c : b,
                height: e ? b : c
            };
            (e = this.label) && (e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0));
        }
    }, na.prototype.buildStacks = function() {
        var a = this.series, b = p(this.options.reversedStacks, !0), c = a.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; c--; ) a[b ? c : a.length - c - 1].setStackedPoints();
            if (this.usePercentage) for (c = 0; c < a.length; c++) a[c].setPercentStacks();
        }
    }, na.prototype.renderStackTotals = function() {
        var d, e, a = this.chart, b = a.renderer, c = this.stacks, f = this.stackTotalGroup;
        f || (this.stackTotalGroup = f = b.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add()), f.translate(a.plotLeft, a.plotTop);
        for (d in c) for (e in a = c[d]) a[e].render(f);
    }, O.prototype.setStackedPoints = function() {
        if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
            var m, o, p, q, r, s, a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.stack, e = e.stacking, h = this.stackKey, i = "-" + h, j = this.negStacks, k = this.yAxis, l = k.stacks, n = k.oldStacks;
            for (q = 0; d > q; q++) r = a[q], s = b[q], p = this.index + "," + q, o = (m = j && f > s) ? i : h, 
            l[o] || (l[o] = {}), l[o][r] || (n[o] && n[o][r] ? (l[o][r] = n[o][r], l[o][r].total = null) : l[o][r] = new Gb(k, k.options.stackLabels, m, r, g)), 
            o = l[o][r], o.points[p] = [ o.cum || 0 ], "percent" === e ? (m = m ? h : i, j && l[m] && l[m][r] ? (m = l[m][r], 
            o.total = m.total = t(m.total, o.total) + Q(s) || 0) : o.total = ea(o.total + (Q(s) || 0))) : o.total = ea(o.total + (s || 0)), 
            o.cum = (o.cum || 0) + (s || 0), o.points[p].push(o.cum), c[q] = o.cum;
            "percent" === e && (k.usePercentage = !0), this.stackedYData = c, k.oldStacks = {};
        }
    }, O.prototype.setPercentStacks = function() {
        var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData;
        q([ b, "-" + b ], function(b) {
            for (var e, g, h, f = d.length; f--; ) g = d[f], e = (h = c[b] && c[b][g]) && h.points[a.index + "," + f], 
            (g = e) && (h = h.total ? 100 / h.total : 0, g[0] = ea(g[0] * h), g[1] = ea(g[1] * h), 
            a.stackedYData[f] = g[1]);
        });
    }, r(Ya.prototype, {
        addSeries: function(a, b, c) {
            var d, e = this;
            return a && (b = p(b, !0), I(e, "addSeries", {
                options: a
            }, function() {
                d = e.initSeries(a), e.isDirtyLegend = !0, e.linkSeries(), b && e.redraw(c);
            })), d;
        },
        addAxis: function(a, b, c, d) {
            var e = b ? "xAxis" : "yAxis", f = this.options;
            new na(this, w(a, {
                index: this[e].length,
                isX: b
            })), f[e] = ra(f[e] || {}), f[e].push(a), p(c, !0) && this.redraw(d);
        },
        showLoading: function(a) {
            var b = this, c = b.options, d = b.loadingDiv, e = c.loading, f = function() {
                d && B(d, {
                    left: b.plotLeft + "px",
                    top: b.plotTop + "px",
                    width: b.plotWidth + "px",
                    height: b.plotHeight + "px"
                });
            };
            d || (b.loadingDiv = d = $(Ka, {
                className: "highcharts-loading"
            }, r(e.style, {
                zIndex: 10,
                display: P
            }), b.container), b.loadingSpan = $("span", null, e.labelStyle, d), N(b, "redraw", f)), 
            b.loadingSpan.innerHTML = a || c.lang.loading, b.loadingShown || (B(d, {
                opacity: 0,
                display: ""
            }), jb(d, {
                opacity: e.style.opacity
            }, {
                duration: e.showDuration || 0
            }), b.loadingShown = !0), f();
        },
        hideLoading: function() {
            var a = this.options, b = this.loadingDiv;
            b && jb(b, {
                opacity: 0
            }, {
                duration: a.loading.hideDuration || 100,
                complete: function() {
                    B(b, {
                        display: P
                    });
                }
            }), this.loadingShown = !1;
        }
    }), r(Fa.prototype, {
        update: function(a, b, c, d) {
            function e() {
                f.applyOptions(a), da(a) && !Ha(a) && (f.redraw = function() {
                    h && (a && a.marker && a.marker.symbol ? f.graphic = h.destroy() : h.attr(f.pointAttr[f.state || ""])), 
                    a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.redraw = null;
                }), i = f.index, g.updateParallelArrays(f, i), k.data[i] = f.options, g.isDirty = g.isDirtyData = !0, 
                !g.fixedBox && g.hasCartesianSeries && (j.isDirtyBox = !0), "point" === k.legendType && j.legend.destroyItem(f), 
                b && j.redraw(c);
            }
            var i, f = this, g = f.series, h = f.graphic, j = g.chart, k = g.options, b = p(b, !0);
            d === !1 ? e() : f.firePointEvent("update", {
                options: a
            }, e);
        },
        remove: function(a, b) {
            var g, c = this, d = c.series, e = d.points, f = d.chart, h = d.data;
            Ra(b, f), a = p(a, !0), c.firePointEvent("remove", null, function() {
                g = Ma(c, h), h.length === e.length && e.splice(g, 1), h.splice(g, 1), d.options.data.splice(g, 1), 
                d.updateParallelArrays(c, "splice", g, 1), c.destroy(), d.isDirty = !0, d.isDirtyData = !0, 
                a && f.redraw();
            });
        }
    }), r(O.prototype, {
        addPoint: function(a, b, c, d) {
            var n, e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xAxis && this.xAxis.names, k = g && g.shift || 0, l = e.data, m = this.xData;
            if (Ra(d, i), c && q([ g, h, this.graphNeg, this.areaNeg ], function(a) {
                a && (a.shift = k + 1);
            }), h && (h.isArea = !0), b = p(b, !0), d = {
                series: this
            }, this.pointClass.prototype.applyOptions.apply(d, [ a ]), g = d.x, h = m.length, 
            this.requireSorting && g < m[h - 1]) for (n = !0; h && m[h - 1] > g; ) h--;
            this.updateParallelArrays(d, "splice", h, 0, 0), this.updateParallelArrays(d, h), 
            j && d.name && (j[g] = d.name), l.splice(h, 0, a), n && (this.data.splice(h, 0, null), 
            this.processData()), "point" === e.legendType && this.generatePoints(), c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), 
            this.updateParallelArrays(d, "shift"), l.shift())), this.isDirtyData = this.isDirty = !0, 
            b && (this.getAttribs(), i.redraw());
        },
        remove: function(a, b) {
            var c = this, d = c.chart, a = p(a, !0);
            c.isRemoving || (c.isRemoving = !0, I(c, "remove", null, function() {
                c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, d.linkSeries(), a && d.redraw(b);
            })), c.isRemoving = !1;
        },
        update: function(a, b) {
            var i, c = this, d = this.chart, e = this.userOptions, f = this.type, g = H[f].prototype, h = [ "group", "markerGroup", "dataLabelsGroup" ];
            q(h, function(a) {
                h[a] = c[a], delete c[a];
            }), a = w(e, {
                animation: !1,
                index: this.index,
                pointStart: this.xData[0]
            }, {
                data: this.options.data
            }, a), this.remove(!1);
            for (i in g) g.hasOwnProperty(i) && (this[i] = u);
            r(this, H[a.type || f].prototype), q(h, function(a) {
                c[a] = h[a];
            }), this.init(d, a), d.linkSeries(), p(b, !0) && d.redraw(!1);
        }
    }), r(na.prototype, {
        update: function(a, b) {
            var c = this.chart, a = c.options[this.coll][this.options.index] = w(this.userOptions, a);
            this.destroy(!0), this._addedPlotLB = u, this.init(c, r(a, {
                events: u
            })), c.isDirtyBox = !0, p(b, !0) && c.redraw();
        },
        remove: function(a) {
            for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--; ) d[e] && d[e].remove(!1);
            la(b.axes, this), la(b[c], this), b.options[c].splice(this.options.index, 1), q(b[c], function(a, b) {
                a.options.index = b;
            }), this.destroy(), b.isDirtyBox = !0, p(a, !0) && b.redraw();
        },
        setTitle: function(a, b) {
            this.update({
                title: a
            }, b);
        },
        setCategories: function(a, b) {
            this.update({
                categories: a
            }, b);
        }
    }), ia = ma(O), H.line = ia, ca.area = w(T, {
        threshold: 0
    });
    var qa = ma(O, {
        type: "area",
        getSegments: function() {
            var i, j, n, m, a = this, b = [], c = [], d = [], e = this.xAxis, f = this.yAxis, g = f.stacks[this.stackKey], h = {}, k = this.points, l = this.options.connectNulls;
            if (this.options.stacking && !this.cropped) {
                for (n = 0; n < k.length; n++) h[k[n].x] = k[n];
                for (m in g) null !== g[m].total && d.push(+m);
                d.sort(function(a, b) {
                    return a - b;
                }), q(d, function(b) {
                    var k, d = 0;
                    if (!l || h[b] && null !== h[b].y) if (h[b]) c.push(h[b]); else {
                        for (n = a.index; n <= f.series.length; n++) if (k = g[b].points[n + "," + b]) {
                            d = k[1];
                            break;
                        }
                        i = e.translate(b), j = f.toPixels(d, !0), c.push({
                            y: null,
                            plotX: i,
                            clientX: i,
                            plotY: j,
                            yBottom: j,
                            onMouseOver: sa
                        });
                    }
                }), c.length && b.push(c);
            } else O.prototype.getSegments.call(this), b = this.segments;
            this.segments = b;
        },
        getSegmentPath: function(a) {
            var d, b = O.prototype.getSegmentPath.call(this, a), c = [].concat(b), e = this.options;
            d = b.length;
            var g, f = this.yAxis.getThreshold(e.threshold);
            if (3 === d && c.push("L", b[1], b[2]), e.stacking && !this.closedStacks) for (d = a.length - 1; d >= 0; d--) g = p(a[d].yBottom, f), 
            d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g); else this.closeSegment(c, a, f);
            return this.areaPath = this.areaPath.concat(c), b;
        },
        closeSegment: function(a, b, c) {
            a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c);
        },
        drawGraph: function() {
            this.areaPath = [], O.prototype.drawGraph.apply(this);
            var a = this, b = this.areaPath, c = this.options, d = c.negativeColor, e = c.negativeFillColor, f = [ [ "area", this.color, c.fillColor ] ];
            (d || e) && f.push([ "areaNeg", d, e ]), q(f, function(d) {
                var e = d[0], f = a[e];
                f ? f.animate({
                    d: b
                }) : a[e] = a.chart.renderer.path(b).attr({
                    fill: p(d[2], ya(d[1]).setOpacity(p(c.fillOpacity, .75)).get()),
                    zIndex: 0
                }).add(a.group);
            });
        },
        drawLegendSymbol: M.drawRectangle
    });
    H.area = qa, ca.spline = w(T), ia = ma(O, {
        type: "spline",
        getPointSpline: function(a, b, c) {
            var h, i, j, k, d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1];
            if (f && g) {
                a = f.plotY, j = g.plotX;
                var l, g = g.plotY;
                h = (1.5 * d + f.plotX) / 2.5, i = (1.5 * e + a) / 2.5, j = (1.5 * d + j) / 2.5, 
                k = (1.5 * e + g) / 2.5, l = (k - i) * (j - d) / (j - h) + e - k, i += l, k += l, 
                i > a && i > e ? (i = t(a, e), k = 2 * e - i) : a > i && e > i && (i = L(a, e), 
                k = 2 * e - i), k > g && k > e ? (k = t(g, e), i = 2 * e - k) : g > k && e > k && (k = L(g, e), 
                i = 2 * e - k), b.rightContX = j, b.rightContY = k;
            }
            return c ? (b = [ "C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e ], 
            f.rightContX = f.rightContY = null) : b = [ "M", d, e ], b;
        }
    }), H.spline = ia, ca.areaspline = w(ca.area), qa = qa.prototype, ia = ma(ia, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: qa.getSegmentPath,
        closeSegment: qa.closeSegment,
        drawGraph: qa.drawGraph,
        drawLegendSymbol: M.drawRectangle
    }), H.areaspline = ia, ca.column = w(T, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: .1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    }), ia = ma(O, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: [ "group", "dataLabelsGroup" ],
        negStacks: !0,
        init: function() {
            O.prototype.init.apply(this, arguments);
            var a = this, b = a.chart;
            b.hasRendered && q(b.series, function(b) {
                b.type === a.type && (b.isDirty = !0);
            });
        },
        getColumnMetrics: function() {
            var f, h, a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, g = {}, i = 0;
            b.grouping === !1 ? i = 1 : q(a.chart.series, function(b) {
                var c = b.options, e = b.yAxis;
                b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos && (c.stacking ? (f = b.stackKey, 
                g[f] === u && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h);
            });
            var c = L(Q(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), j = c * b.groupPadding, k = (c - 2 * j) / i, l = b.pointWidth, b = s(l) ? (k - l) / 2 : k * b.pointPadding, l = p(l, k - 2 * b);
            return a.columnMetrics = {
                width: l,
                offset: b + (j + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * k - c / 2) * (e ? -1 : 1)
            };
        },
        translate: function() {
            var a = this, b = a.chart, c = a.options, d = a.borderWidth = p(c.borderWidth, a.activePointCount > .5 * a.xAxis.len ? 0 : 1), e = a.yAxis, f = a.translatedThreshold = e.getThreshold(c.threshold), g = p(c.minPointLength, 5), h = a.getColumnMetrics(), i = h.width, j = a.barW = t(i, 1 + 2 * d), k = a.pointXOffset = h.offset, l = -(d % 2 ? .5 : 0), n = d % 2 ? .5 : 1;
            b.renderer.isVML && b.inverted && (n += 1), c.pointPadding && (j = La(j)), O.prototype.translate.apply(a), 
            q(a.points, function(c) {
                var u, d = p(c.yBottom, f), h = L(t(-999 - d, c.plotY), e.len + 999 + d), q = c.plotX + k, r = j, s = L(h, d);
                u = t(h, d) - s, Q(u) < g && g && (u = g, s = v(Q(s - f) > g ? d - g : f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g : 0))), 
                c.barX = q, c.pointWidth = i, c.tooltipPos = b.inverted ? [ e.len - h, a.xAxis.len - q - r / 2 ] : [ q + r / 2, h + e.pos - b.plotTop ], 
                r = v(q + r) + l, q = v(q) + l, r -= q, d = Q(s) < .5, u = v(s + u) + n, s = v(s) + n, 
                u -= s, d && (s -= 1, u += 1), c.shapeType = "rect", c.shapeArgs = {
                    x: q,
                    y: s,
                    width: r,
                    height: u
                };
            });
        },
        getSymbol: sa,
        drawLegendSymbol: M.drawRectangle,
        drawGraph: sa,
        drawPoints: function() {
            var f, g, a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250;
            q(a.points, function(h) {
                var i = h.plotY, j = h.graphic;
                i === u || isNaN(i) || null === h.y ? j && (h.graphic = j.destroy()) : (f = h.shapeArgs, 
                i = s(a.borderWidth) ? {
                    "stroke-width": a.borderWidth
                } : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], j ? (bb(j), 
                j.attr(i)[b.pointCount < e ? "animate" : "attr"](w(f))) : h.graphic = d[h.shapeType](f).attr(g).attr(i).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius));
            });
        },
        animate: function(a) {
            var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
            ba && (a ? (e.scaleY = .001, a = L(b.pos + b.len, t(b.pos, b.toPixels(c.threshold))), 
            d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, 
            e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), 
            this.animate = null));
        },
        remove: function() {
            var a = this, b = a.chart;
            b.hasRendered && q(b.series, function(b) {
                b.type === a.type && (b.isDirty = !0);
            }), O.prototype.remove.apply(a, arguments);
        }
    }), H.column = ia, ca.bar = w(ca.column), qa = ma(ia, {
        type: "bar",
        inverted: !0
    }), H.bar = qa, ca.scatter = w(T, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        },
        stickyTracking: !1
    }), qa = ma(O, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: [ "markerGroup", "dataLabelsGroup" ],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function() {
            this.options.lineWidth && O.prototype.drawGraph.call(this);
        }
    }), H.scatter = qa, ca.pie = w(T, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [ null, null ],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function() {
                return this.point.name;
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: .1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    }), T = {
        type: "pie",
        isCartesian: !1,
        pointClass: ma(Fa, {
            init: function() {
                Fa.prototype.init.apply(this, arguments);
                var b, a = this;
                return a.y < 0 && (a.y = null), r(a, {
                    visible: a.visible !== !1,
                    name: p(a.name, "Slice")
                }), b = function(b) {
                    a.slice("select" === b.type);
                }, N(a, "select", b), N(a, "unselect", b), a;
            },
            setVisible: function(a) {
                var b = this, c = b.series, d = c.chart;
                b.visible = b.options.visible = a = a === u ? !b.visible : a, c.options.data[Ma(b, c.data)] = b.options, 
                q([ "graphic", "dataLabel", "connector", "shadowGroup" ], function(c) {
                    b[c] && b[c][a ? "show" : "hide"](!0);
                }), b.legendItem && d.legend.colorizeItem(b, a), !c.isDirty && c.options.ignoreHiddenPoint && (c.isDirty = !0, 
                d.redraw());
            },
            slice: function(a, b, c) {
                var d = this.series;
                Ra(c, d.chart), p(b, !0), this.sliced = this.options.sliced = a = s(a) ? a : !this.sliced, 
                d.options.data[Ma(this, d.data)] = this.options, a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, this.graphic.animate(a), this.shadowGroup && this.shadowGroup.animate(a);
            },
            haloPath: function(a) {
                var b = this.shapeArgs, c = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r,
                    start: b.start,
                    end: b.end
                });
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: [ "group", "dataLabelsGroup" ],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        singularTooltips: !0,
        getColor: sa,
        animate: function(a) {
            var b = this, c = b.points, d = b.startAngleRad;
            a || (q(c, function(a) {
                var c = a.graphic, a = a.shapeArgs;
                c && (c.attr({
                    r: b.center[3] / 2,
                    start: d,
                    end: d
                }), c.animate({
                    r: a.r,
                    start: a.start,
                    end: a.end
                }, b.options.animation));
            }), b.animate = null);
        },
        setData: function(a, b, c, d) {
            O.prototype.setData.call(this, a, !1, c, d), this.processData(), this.generatePoints(), 
            p(b, !0) && this.chart.redraw(c);
        },
        generatePoints: function() {
            var a, c, d, e, b = 0, f = this.options.ignoreHiddenPoint;
            for (O.prototype.generatePoints.call(this), c = this.points, d = c.length, a = 0; d > a; a++) e = c[a], 
            b += f && !e.visible ? 0 : e.y;
            for (this.total = b, a = 0; d > a; a++) e = c[a], e.percentage = b > 0 ? e.y / b * 100 : 0, 
            e.total = b;
        },
        translate: function(a) {
            this.generatePoints();
            var f, g, h, n, o, b = 0, c = this.options, d = c.slicedOffset, e = d + c.borderWidth, i = c.startAngle || 0, j = this.startAngleRad = oa / 180 * (i - 90), i = (this.endAngleRad = oa / 180 * (p(c.endAngle, i + 360) - 90)) - j, k = this.points, l = c.dataLabels.distance, c = c.ignoreHiddenPoint, m = k.length;
            for (a || (this.center = a = this.getCenter()), this.getX = function(b, c) {
                return h = V.asin(L((b - a[1]) / (a[2] / 2 + l), 1)), a[0] + (c ? -1 : 1) * aa(h) * (a[2] / 2 + l);
            }, n = 0; m > n; n++) o = k[n], f = j + b * i, (!c || o.visible) && (b += o.percentage / 100), 
            g = j + b * i, o.shapeType = "arc", o.shapeArgs = {
                x: a[0],
                y: a[1],
                r: a[2] / 2,
                innerR: a[3] / 2,
                start: v(1e3 * f) / 1e3,
                end: v(1e3 * g) / 1e3
            }, h = (g + f) / 2, h > 1.5 * oa ? h -= 2 * oa : -oa / 2 > h && (h += 2 * oa), o.slicedTranslation = {
                translateX: v(aa(h) * d),
                translateY: v(fa(h) * d)
            }, f = aa(h) * a[2] / 2, g = fa(h) * a[2] / 2, o.tooltipPos = [ a[0] + .7 * f, a[1] + .7 * g ], 
            o.half = -oa / 2 > h || h > oa / 2 ? 1 : 0, o.angle = h, e = L(e, l / 2), o.labelPos = [ a[0] + f + aa(h) * l, a[1] + g + fa(h) * l, a[0] + f + aa(h) * e, a[1] + g + fa(h) * e, a[0] + f, a[1] + g, 0 > l ? "center" : o.half ? "right" : "left", h ];
        },
        drawGraph: null,
        drawPoints: function() {
            var c, d, f, g, a = this, b = a.chart.renderer, e = a.options.shadow;
            e && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group)), q(a.points, function(h) {
                d = h.graphic, g = h.shapeArgs, f = h.shadowGroup, e && !f && (f = h.shadowGroup = b.g("shadow").add(a.shadowGroup)), 
                c = h.sliced ? h.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, f && f.attr(c), d ? d.animate(r(g, c)) : h.graphic = d = b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" : ""]).attr({
                    "stroke-linejoin": "round"
                }).attr(c).add(a.group).shadow(e, f), void 0 !== h.visible && h.setVisible(h.visible);
            });
        },
        sortByAngle: function(a, b) {
            a.sort(function(a, d) {
                return void 0 !== a.angle && (d.angle - a.angle) * b;
            });
        },
        drawLegendSymbol: M.drawRectangle,
        getCenter: Z.getCenter,
        getSymbol: sa
    }, T = ma(O, T), H.pie = T, O.prototype.drawDataLabels = function() {
        var f, g, i, j, a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points, h = a.hasRendered || 0;
        (d.enabled || a._hasPointLabels) && (a.dlProcessOptions && a.dlProcessOptions(d), 
        j = a.plotGroup("dataLabelsGroup", "data-labels", d.defer ? "hidden" : "visible", d.zIndex || 6), 
        p(d.defer, !0) && (j.attr({
            opacity: +h
        }), h || N(a, "afterAnimate", function() {
            a.visible && j.show(), j[b.animation ? "animate" : "attr"]({
                opacity: 1
            }, {
                duration: 200
            });
        })), g = d, q(e, function(b) {
            var e, m, o, h = b.dataLabel, q = b.connector, t = !0;
            if (f = b.options && b.options.dataLabels, e = p(f && f.enabled, g.enabled), h && !e) b.dataLabel = h.destroy(); else if (e) {
                if (d = w(g, f), e = d.rotation, m = b.getLabelConfig(), i = d.format ? Ja(d.format, m) : d.formatter.call(m, d), 
                d.style.color = p(d.color, d.style.color, a.color, "black"), h) s(i) ? (h.attr({
                    text: i
                }), t = !1) : (b.dataLabel = h = h.destroy(), q && (b.connector = q.destroy())); else if (s(i)) {
                    h = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: e,
                        padding: d.padding,
                        zIndex: 1
                    };
                    for (o in h) h[o] === u && delete h[o];
                    h = b.dataLabel = a.chart.renderer[e ? "text" : "label"](i, 0, -999, null, null, null, d.useHTML).attr(h).css(r(d.style, c && {
                        cursor: c
                    })).add(j).shadow(d.shadow);
                }
                h && a.alignDataLabel(b, h, d, null, t);
            }
        }));
    }, O.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart, g = f.inverted, h = p(a.plotX, -999), i = p(a.plotY, -999), j = b.getBBox();
        (a = this.visible && (a.series.forceDL || f.isInsidePlot(h, v(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g))) && (d = r({
            x: g ? f.plotWidth - i : h,
            y: v(g ? f.plotHeight - h : i),
            width: 0,
            height: 0
        }, d), r(c, {
            width: j.width,
            height: j.height
        }), c.rotation ? b[e ? "attr" : "animate"]({
            x: d.x + c.x + d.width / 2,
            y: d.y + c.y + d.height / 2
        }).attr({
            align: c.align
        }) : (b.align(c, null, d), g = b.alignAttr, "justify" === p(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, j, d, e) : p(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)))), 
        a || (b.attr({
            y: -999
        }), b.placed = !1);
    }, O.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
        var j, k, g = this.chart, h = b.align, i = b.verticalAlign;
        j = c.x, 0 > j && ("right" === h ? b.align = "left" : b.x = -j, k = !0), j = c.x + d.width, 
        j > g.plotWidth && ("left" === h ? b.align = "right" : b.x = g.plotWidth - j, k = !0), 
        j = c.y, 0 > j && ("bottom" === i ? b.verticalAlign = "top" : b.y = -j, k = !0), 
        j = c.y + d.height, j > g.plotHeight && ("top" === i ? b.verticalAlign = "bottom" : b.y = g.plotHeight - j, 
        k = !0), k && (a.placed = !f, a.align(b, null, e));
    }, H.pie && (H.pie.prototype.drawDataLabels = function() {
        var c, j, k, u, w, x, y, B, I, H, z, a = this, b = a.data, d = a.chart, e = a.options.dataLabels, f = p(e.connectorPadding, 10), g = p(e.connectorWidth, 1), h = d.plotWidth, i = d.plotHeight, l = p(e.softConnector, !0), n = e.distance, m = a.center, o = m[2] / 2, r = m[1], s = n > 0, A = [ [], [] ], R = [ 0, 0, 0, 0 ], N = function(a, b) {
            return b.y - a.y;
        };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
            for (O.prototype.drawDataLabels.apply(a), q(b, function(a) {
                a.dataLabel && a.visible && A[a.half].push(a);
            }), H = 2; H--; ) {
                var E, G = [], M = [], F = A[H], K = F.length;
                if (K) {
                    for (a.sortByAngle(F, H - .5), z = b = 0; !b && F[z]; ) b = F[z] && F[z].dataLabel && (F[z].dataLabel.getBBox().height || 21), 
                    z++;
                    if (n > 0) {
                        for (w = L(r + o + n, d.plotHeight), z = t(0, r - o - n); w >= z; z += b) G.push(z);
                        if (w = G.length, K > w) {
                            for (c = [].concat(F), c.sort(N), z = K; z--; ) c[z].rank = z;
                            for (z = K; z--; ) F[z].rank >= w && F.splice(z, 1);
                            K = F.length;
                        }
                        for (z = 0; K > z; z++) {
                            c = F[z], x = c.labelPos, c = 9999;
                            var S, P;
                            for (P = 0; w > P; P++) S = Q(G[P] - x[1]), c > S && (c = S, E = P);
                            if (z > E && null !== G[z]) E = z; else for (K - z + E > w && null !== G[z] && (E = w - K + z); null === G[E]; ) E++;
                            M.push({
                                i: E,
                                y: G[E]
                            }), G[E] = null;
                        }
                        M.sort(N);
                    }
                    for (z = 0; K > z; z++) c = F[z], x = c.labelPos, u = c.dataLabel, I = c.visible === !1 ? "hidden" : "visible", 
                    c = x[1], n > 0 ? (w = M.pop(), E = w.i, B = w.y, (c > B && null !== G[E + 1] || B > c && null !== G[E - 1]) && (B = L(t(0, c), d.plotHeight))) : B = c, 
                    y = e.justify ? m[0] + (H ? -1 : 1) * (o + n) : a.getX(B === r - o - n || B === r + o + n ? c : B, H), 
                    u._attr = {
                        visibility: I,
                        align: x[6]
                    }, u._pos = {
                        x: y + e.x + ({
                            left: f,
                            right: -f
                        }[x[6]] || 0),
                        y: B + e.y - 10
                    }, u.connX = y, u.connY = B, null === this.options.size && (w = u.width, f > y - w ? R[3] = t(v(w - y + f), R[3]) : y + w > h - f && (R[1] = t(v(y + w - h + f), R[1])), 
                    0 > B - b / 2 ? R[0] = t(v(-B + b / 2), R[0]) : B + b / 2 > i && (R[2] = t(v(B + b / 2 - i), R[2])));
                }
            }
            (0 === Ca(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), s && g && q(this.points, function(b) {
                j = b.connector, x = b.labelPos, (u = b.dataLabel) && u._pos ? (I = u._attr.visibility, 
                y = u.connX, B = u.connY, k = l ? [ "M", y + ("left" === x[6] ? 5 : -5), B, "C", y, B, 2 * x[2] - x[4], 2 * x[3] - x[5], x[2], x[3], "L", x[4], x[5] ] : [ "M", y + ("left" === x[6] ? 5 : -5), B, "L", x[2], x[3], "L", x[4], x[5] ], 
                j ? (j.animate({
                    d: k
                }), j.attr("visibility", I)) : b.connector = j = a.chart.renderer.path(k).attr({
                    "stroke-width": g,
                    stroke: e.connectorColor || b.color || "#606060",
                    visibility: I
                }).add(a.dataLabelsGroup)) : j && (b.connector = j.destroy());
            }));
        }
    }, H.pie.prototype.placeDataLabels = function() {
        q(this.points, function(a) {
            var b, a = a.dataLabel;
            a && ((b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({
                y: -999
            }));
        });
    }, H.pie.prototype.alignDataLabel = sa, H.pie.prototype.verifyDataLabelOverflow = function(a) {
        var f, b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80;
        return null !== d[0] ? e = t(b[2] - t(a[1], a[3]), c) : (e = t(b[2] - a[1] - a[3], c), 
        b[0] += (a[3] - a[1]) / 2), null !== d[1] ? e = t(L(e, b[2] - t(a[0], a[2])), c) : (e = t(L(e, b[2] - a[0] - a[2]), c), 
        b[1] += (a[0] - a[2]) / 2), e < b[2] ? (b[2] = e, this.translate(b), q(this.points, function(a) {
            a.dataLabel && (a.dataLabel._pos = null);
        }), this.drawDataLabels && this.drawDataLabels()) : f = !0, f;
    }), H.column && (H.column.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > p(this.translatedThreshold, f.plotSizeY), j = p(c.inside, !!this.options.stacking);
        h && (d = w(h), g && (d = {
            x: f.plotWidth - d.y - d.height,
            y: f.plotHeight - d.x - d.width,
            width: d.height,
            height: d.width
        }), !j) && (g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, 
        d.height = 0)), c.align = p(c.align, !g || j ? "center" : i ? "right" : "left"), 
        c.verticalAlign = p(c.verticalAlign, g || j ? "middle" : i ? "top" : "bottom"), 
        O.prototype.alignDataLabel.call(this, a, b, c, d, e);
    }), T = K.TrackerMixin = {
        drawTrackerPoint: function() {
            var a = this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {
                cursor: d
            }, f = function(c) {
                var e, d = c.target;
                for (b.hoverSeries !== a && a.onMouseOver(); d && !e; ) e = d.point, d = d.parentNode;
                e !== u && e !== b.hoverPoint && e.onMouseOver(c);
            };
            q(a.points, function(a) {
                a.graphic && (a.graphic.element.point = a), a.dataLabel && (a.dataLabel.element.point = a);
            }), a._hasTracking || (q(a.trackerGroups, function(b) {
                a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
                    c.onTrackerMouseOut(a);
                }).css(e), $a) && a[b].on("touchstart", f);
            }), a._hasTracking = !0);
        },
        drawTrackerGraph: function() {
            var n, a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, l = k && {
                cursor: k
            }, k = a.singlePoints, m = function() {
                f.hoverSeries !== a && a.onMouseOver();
            }, o = "rgba(192,192,192," + (ba ? 1e-4 : .002) + ")";
            if (e && !c) for (n = e + 1; n--; ) "M" === d[n] && d.splice(n + 1, 0, d[n + 1] - i, d[n + 2], "L"), 
            (n && "M" === d[n] || n === e) && d.splice(n, 0, "L", d[n - 2] + i, d[n - 1]);
            for (n = 0; n < k.length; n++) e = k[n], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
            j ? j.attr({
                d: d
            }) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: o,
                fill: c ? o : P,
                "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
                zIndex: 2
            }).add(a.group), q([ a.tracker, a.markerGroup ], function(a) {
                a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
                    g.onTrackerMouseOut(a);
                }).css(l), $a && a.on("touchstart", m);
            }));
        }
    }, H.column && (ia.prototype.drawTracker = T.drawTrackerPoint), H.pie && (H.pie.prototype.drawTracker = T.drawTrackerPoint), 
    H.scatter && (qa.prototype.drawTracker = T.drawTrackerPoint), r(lb.prototype, {
        setItemEvents: function(a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function() {
                a.setState("hover"), b.css(f.options.itemHoverStyle);
            }).on("mouseout", function() {
                b.css(a.visible ? d : e), a.setState();
            }).on("click", function(b) {
                var c = function() {
                    a.setVisible();
                }, b = {
                    browserEvent: b
                };
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : I(a, "legendItemClick", b, c);
            });
        },
        createCheckboxForItem: function(a) {
            a.checkbox = $("input", {
                type: "checkbox",
                checked: a.selected,
                defaultChecked: a.selected
            }, this.options.itemCheckboxStyle, this.chart.container), N(a.checkbox, "click", function(b) {
                I(a, "checkboxClick", {
                    checked: b.target.checked
                }, function() {
                    a.select();
                });
            });
        }
    }), E.legend.itemStyle.cursor = "pointer", r(Ya.prototype, {
        showResetZoom: function() {
            var a = this, b = E.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                a.zoomOut();
            }, d, e && e.hover).attr({
                align: c.position.align,
                title: b.resetZoomTitle
            }).add().align(c.position, !1, f);
        },
        zoomOut: function() {
            var a = this;
            I(a, "selection", {
                resetSelection: !0
            }, function() {
                a.zoom();
            });
        },
        zoom: function(a) {
            var b, e, c = this.pointer, d = !1;
            !a || a.resetSelection ? q(this.axes, function(a) {
                b = a.zoom();
            }) : q(a.xAxis.concat(a.yAxis), function(a) {
                var e = a.axis, h = e.isXAxis;
                (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"]) && (b = e.zoom(a.min, a.max), 
                e.displayBtn && (d = !0));
            }), e = this.resetZoomButton, d && !e ? this.showResetZoom() : !d && da(e) && (this.resetZoomButton = e.destroy()), 
            b && this.redraw(p(this.options.chart.animation, a && a.animation, this.pointCount < 100));
        },
        pan: function(a, b) {
            var e, c = this, d = c.hoverPoints;
            d && q(d, function(a) {
                a.setState();
            }), q("xy" === b ? [ 1, 0 ] : [ 1 ], function(b) {
                var d = a[b ? "chartX" : "chartY"], h = c[b ? "xAxis" : "yAxis"][0], i = c[b ? "mouseDownX" : "mouseDownY"], j = (h.pointRange || 0) / 2, k = h.getExtremes(), l = h.toValue(i - d, !0) + j, i = h.toValue(i + c[b ? "plotWidth" : "plotHeight"] - d, !0) - j;
                h.series.length && l > L(k.dataMin, k.min) && i < t(k.dataMax, k.max) && (h.setExtremes(l, i, !1, !1, {
                    trigger: "pan"
                }), e = !0), c[b ? "mouseDownX" : "mouseDownY"] = d;
            }), e && c.redraw(!1), B(c.container, {
                cursor: "move"
            });
        }
    }), r(Fa.prototype, {
        select: function(a, b) {
            var c = this, d = c.series, e = d.chart, a = p(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {
                accumulate: b
            }, function() {
                c.selected = c.options.selected = a, d.options.data[Ma(c, d.data)] = c.options, 
                c.setState(a && "select"), b || q(e.getSelectedPoints(), function(a) {
                    a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Ma(a, d.data)] = a.options, 
                    a.setState(""), a.firePointEvent("unselect"));
                });
            });
        },
        onMouseOver: function(a) {
            var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
            e && e !== this && e.onMouseOut(), this.firePointEvent("mouseOver"), d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a), 
            this.setState("hover"), c.hoverPoint = this;
        },
        onMouseOut: function() {
            var a = this.series.chart, b = a.hoverPoints;
            this.firePointEvent("mouseOut"), b && -1 !== Ma(this, b) || (this.setState(), a.hoverPoint = null);
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var b, a = w(this.series.options.point, this.options).events;
                this.events = a;
                for (b in a) N(this, b, a[b]);
                this.hasImportedEvents = !0;
            }
        },
        setState: function(a, b) {
            var o, c = this.plotX, d = this.plotY, e = this.series, f = e.options.states, g = ca[e.type].marker && e.options.marker, h = g && !g.enabled, i = g && g.states[a], j = i && i.enabled === !1, k = e.stateMarkerGraphic, l = this.marker || {}, n = e.chart, m = e.halo, a = a || "";
            o = this.pointAttr[a] || e.pointAttr[a], a === this.state && !b || this.selected && "select" !== a || f[a] && f[a].enabled === !1 || a && (j || h && i.enabled === !1) || a && l.states && l.states[a] && l.states[a].enabled === !1 || (this.graphic ? (g = g && this.graphic.symbolName && o.r, 
            this.graphic.attr(w(o, g ? {
                x: c - g,
                y: d - g,
                width: 2 * g,
                height: 2 * g
            } : {})), k && k.hide()) : (a && i && (g = i.radius, l = l.symbol || e.symbol, k && k.currentSymbol !== l && (k = k.destroy()), 
            k ? k[b ? "animate" : "attr"]({
                x: c - g,
                y: d - g
            }) : l && (e.stateMarkerGraphic = k = n.renderer.symbol(l, c - g, d - g, 2 * g, 2 * g).attr(o).add(e.markerGroup), 
            k.currentSymbol = l)), k && k[a && n.isInsidePlot(c, d, n.inverted) ? "show" : "hide"]()), 
            (c = f[a] && f[a].halo) && c.size ? (m || (e.halo = m = n.renderer.path().add(e.seriesGroup)), 
            m.attr(r({
                fill: ya(this.color || e.color).setOpacity(c.opacity).get()
            }, c.attributes))[b ? "animate" : "attr"]({
                d: this.haloPath(c.size)
            })) : m && m.attr({
                d: []
            }), this.state = a);
        },
        haloPath: function(a) {
            var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a);
        }
    }), r(O.prototype, {
        onMouseOver: function() {
            var a = this.chart, b = a.hoverSeries;
            b && b !== this && b.onMouseOut(), this.options.events.mouseOver && I(this, "mouseOver"), 
            this.setState("hover"), a.hoverSeries = this;
        },
        onMouseOut: function() {
            var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
            d && d.onMouseOut(), this && a.events.mouseOut && I(this, "mouseOut"), c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide(), 
            this.setState(), b.hoverSeries = null;
        },
        setState: function(a) {
            var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth, a = a || "";
            this.state !== a && (this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + (e[a].lineWidthPlus || 0)), 
            c && !c.dashstyle && (a = {
                "stroke-width": b
            }, c.attr(a), d && d.attr(a))));
        },
        setVisible: function(a, b) {
            var f, c = this, d = c.chart, e = c.legendItem, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === u ? !h : a) ? "show" : "hide", 
            q([ "group", "dataLabelsGroup", "markerGroup", "tracker" ], function(a) {
                c[a] && c[a][f]();
            }), d.hoverSeries === c && c.onMouseOut(), e && d.legend.colorizeItem(c, a), c.isDirty = !0, 
            c.options.stacking && q(d.series, function(a) {
                a.options.stacking && a.visible && (a.isDirty = !0);
            }), q(c.linkedSeries, function(b) {
                b.setVisible(a, !1);
            }), g && (d.isDirtyBox = !0), b !== !1 && d.redraw(), I(c, f);
        },
        setTooltipPoints: function(a) {
            var c, d, h, i, b = [], e = this.xAxis, f = e && e.getExtremes(), g = e ? e.tooltipLen || e.len : this.chart.plotSizeX, j = [];
            if (this.options.enableMouseTracking !== !1 && !this.singularTooltips) {
                for (a && (this.tooltipPoints = null), q(this.segments || this.points, function(a) {
                    b = b.concat(a);
                }), e && e.reversed && (b = b.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(b), 
                a = b.length, i = 0; a > i; i++) if (e = b[i], c = e.x, c >= f.min && c <= f.max) for (h = b[i + 1], 
                c = d === u ? 0 : d + 1, d = b[i + 1] ? L(t(0, U((e.clientX + (h ? h.wrappedClientX || h.clientX : g)) / 2)), g) : g; c >= 0 && d >= c; ) j[c++] = e;
                this.tooltipPoints = j;
            }
        },
        show: function() {
            this.setVisible(!0);
        },
        hide: function() {
            this.setVisible(!1);
        },
        select: function(a) {
            this.selected = a = a === u ? !this.selected : a, this.checkbox && (this.checkbox.checked = a), 
            I(this, a ? "select" : "unselect");
        },
        drawTracker: T.drawTrackerGraph
    }), r(K, {
        Axis: na,
        Chart: Ya,
        Color: ya,
        Point: Fa,
        Tick: Ta,
        Renderer: Za,
        Series: O,
        SVGElement: S,
        SVGRenderer: ta,
        arrayMin: Oa,
        arrayMax: Ca,
        charts: W,
        dateFormat: cb,
        format: Ja,
        pathAnim: vb,
        getOptions: function() {
            return E;
        },
        hasBidiBug: Ob,
        isTouchDevice: Ib,
        numberFormat: Ba,
        seriesTypes: H,
        setOptions: function(a) {
            return E = w(!0, E, a), Bb(), E;
        },
        addEvent: N,
        removeEvent: X,
        createElement: $,
        discardElement: Qa,
        css: B,
        each: q,
        extend: r,
        map: Va,
        merge: w,
        pick: p,
        splat: ra,
        extendClass: ma,
        pInt: y,
        wrap: Na,
        svg: ba,
        canvas: ga,
        vml: !ba && !ga,
        product: "Highcharts",
        version: "4.0.4"
    });
}(), function() {
    function n(n, t, e) {
        e = (e || 0) - 1;
        for (var r = n ? n.length : 0; ++e < r; ) if (n[e] === t) return e;
        return -1;
    }
    function t(n) {
        return n.charCodeAt(0);
    }
    function e() {
        return R.pop() || [];
    }
    function r(n) {
        return "function" != typeof n.toString && "string" == typeof (n + "");
    }
    function o(n) {
        n.length = 0, R.length < $ && R.push(n);
    }
    function u(n, t, e) {
        t || (t = 0), "undefined" == typeof e && (e = n ? n.length : 0);
        var r = -1;
        e = e - t || 0;
        for (var o = Array(0 > e ? 0 : e); ++r < e; ) o[r] = n[t + r];
        return o;
    }
    function i(n) {
        return n && "object" == typeof n && !Pt(n) && _t.call(n, "__wrapped__") ? n : new a(n);
    }
    function a(n, t) {
        this.__chain__ = !!t, this.__wrapped__ = n;
    }
    function c(n) {
        function t() {
            if (r) {
                var n = u(r);
                dt.apply(n, arguments);
            }
            if (this instanceof t) {
                var i = l(e.prototype), n = e.apply(i, n || arguments);
                return x(n) ? n : i;
            }
            return e.apply(o, n || arguments);
        }
        var e = n[0], r = n[2], o = n[4];
        return kt(t, n), t;
    }
    function f(n, t, i, a, c) {
        if (i) {
            var l = i(n);
            if ("undefined" != typeof l) return l;
        }
        if (!x(n)) return n;
        var p = st.call(n);
        if (!Z[p] || !St.nodeClass && r(n)) return n;
        var s = At[p];
        switch (p) {
          case H:
          case V:
            return new s(+n);

          case Q:
          case Y:
            return new s(n);

          case X:
            return l = s(n.source, T.exec(n)), l.lastIndex = n.lastIndex, l;
        }
        if (p = Pt(n), t) {
            var y = !a;
            a || (a = e()), c || (c = e());
            for (var h = a.length; h--; ) if (a[h] == n) return c[h];
            l = p ? s(n.length) : {};
        } else l = p ? u(n) : Lt({}, n);
        return p && (_t.call(n, "index") && (l.index = n.index), _t.call(n, "input") && (l.input = n.input)), 
        t ? (a.push(n), c.push(l), (p ? Bt : Rt)(n, function(n, e) {
            l[e] = f(n, t, i, a, c);
        }), y && (o(a), o(c)), l) : l;
    }
    function l(n) {
        return x(n) ? jt(n) : {};
    }
    function p(n, t, e) {
        if ("function" != typeof n) return F;
        if ("undefined" == typeof t || !("prototype" in n)) return n;
        var r = n.__bindData__;
        if ("undefined" == typeof r && (St.funcNames && (r = !n.name), r = r || !St.funcDecomp, 
        !r)) {
            var o = gt.call(n);
            St.funcNames || (r = !K.test(o)), r || (r = G.test(o), kt(n, r));
        }
        if (!1 === r || !0 !== r && 1 & r[1]) return n;
        switch (e) {
          case 1:
            return function(e) {
                return n.call(t, e);
            };

          case 2:
            return function(e, r) {
                return n.call(t, e, r);
            };

          case 3:
            return function(e, r, o) {
                return n.call(t, e, r, o);
            };

          case 4:
            return function(e, r, o, u) {
                return n.call(t, e, r, o, u);
            };
        }
        return D(n, t);
    }
    function s(n) {
        function t() {
            var n = f ? a : this;
            if (o) {
                var v = u(o);
                dt.apply(v, arguments);
            }
            return (i || y) && (v || (v = u(arguments)), i && dt.apply(v, i), y && v.length < c) ? (r |= 16, 
            s([ e, h ? r : -4 & r, v, null, a, c ])) : (v || (v = arguments), p && (e = n[g]), 
            this instanceof t ? (n = l(e.prototype), v = e.apply(n, v), x(v) ? v : n) : e.apply(n, v));
        }
        var e = n[0], r = n[1], o = n[2], i = n[3], a = n[4], c = n[5], f = 1 & r, p = 2 & r, y = 4 & r, h = 8 & r, g = e;
        return kt(t, n), t;
    }
    function y(n, t, u, i, a, c) {
        if (u) {
            var f = u(n, t);
            if ("undefined" != typeof f) return !!f;
        }
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (n === n && !(n && et[typeof n] || t && et[typeof t])) return !1;
        if (null == n || null == t) return n === t;
        var l = st.call(n), p = st.call(t);
        if (l == M && (l = U), p == M && (p = U), l != p) return !1;
        switch (l) {
          case H:
          case V:
            return +n == +t;

          case Q:
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

          case X:
          case Y:
            return n == t + "";
        }
        if (p = l == q, !p) {
            var s = _t.call(n, "__wrapped__"), h = _t.call(t, "__wrapped__");
            if (s || h) return y(s ? n.__wrapped__ : n, h ? t.__wrapped__ : t, u, i, a, c);
            if (l != U || !St.nodeClass && (r(n) || r(t))) return !1;
            if (l = !St.argsObject && m(n) ? Object : n.constructor, s = !St.argsObject && m(t) ? Object : t.constructor, 
            l != s && !(j(l) && l instanceof l && j(s) && s instanceof s) && "constructor" in n && "constructor" in t) return !1;
        }
        for (l = !a, a || (a = e()), c || (c = e()), s = a.length; s--; ) if (a[s] == n) return c[s] == t;
        var g = 0, f = !0;
        if (a.push(n), c.push(t), p) {
            if (s = n.length, g = t.length, (f = g == s) || i) for (;g--; ) if (p = s, h = t[g], 
            i) for (;p-- && !(f = y(n[p], h, u, i, a, c)); ) ; else if (!(f = y(n[g], h, u, i, a, c))) break;
        } else Nt(t, function(t, e, r) {
            return _t.call(r, e) ? (g++, f = _t.call(n, e) && y(n[e], t, u, i, a, c)) : void 0;
        }), f && !i && Nt(n, function(n, t, e) {
            return _t.call(e, t) ? f = -1 < --g : void 0;
        });
        return a.pop(), c.pop(), l && (o(a), o(c)), f;
    }
    function h(n, t, e, r, o) {
        (Pt(t) ? A : Rt)(t, function(t, u) {
            var i, a, c = t, f = n[u];
            if (t && ((a = Pt(t)) || zt(t))) {
                for (c = r.length; c--; ) if (i = r[c] == t) {
                    f = o[c];
                    break;
                }
                if (!i) {
                    var l;
                    e && (c = e(f, t), l = "undefined" != typeof c) && (f = c), l || (f = a ? Pt(f) ? f : [] : zt(f) ? f : {}), 
                    r.push(t), o.push(f), l || h(f, t, e, r, o);
                }
            } else e && (c = e(f, t), "undefined" == typeof c && (c = t)), "undefined" != typeof c && (f = c);
            n[u] = f;
        });
    }
    function g(n, t, e, r, o, i) {
        var a = 1 & t, f = 4 & t, l = 16 & t, p = 32 & t;
        if (!(2 & t || j(n))) throw new TypeError();
        l && !e.length && (t &= -17, l = e = !1), p && !r.length && (t &= -33, p = r = !1);
        var y = n && n.__bindData__;
        return y && !0 !== y ? (y = u(y), y[2] && (y[2] = u(y[2])), y[3] && (y[3] = u(y[3])), 
        !a || 1 & y[1] || (y[4] = o), !a && 1 & y[1] && (t |= 8), !f || 4 & y[1] || (y[5] = i), 
        l && dt.apply(y[2] || (y[2] = []), e), p && mt.apply(y[3] || (y[3] = []), r), y[1] |= t, 
        g.apply(null, y)) : (1 == t || 17 === t ? c : s)([ n, t, e, r, o, i ]);
    }
    function v() {
        tt.h = J, tt.b = tt.c = tt.g = tt.i = "", tt.e = "t", tt.j = !0;
        for (var n, t = 0; n = arguments[t]; t++) for (var e in n) tt[e] = n[e];
        t = tt.a, tt.d = /^[^,]+/.exec(t)[0], n = Function, t = "return function(" + t + "){", 
        e = tt;
        var r = "var n,t=" + e.d + ",E=" + e.e + ";if(!t)return E;" + e.i + ";";
        e.b ? (r += "var u=t.length;n=-1;if(" + e.b + "){", St.unindexedChars && (r += "if(s(t)){t=t.split('')}"), 
        r += "while(++n<u){" + e.g + ";}}else{") : St.nonEnumArgs && (r += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + e.g + ";}}else{"), 
        St.enumPrototypes && (r += "var G=typeof t=='function';"), St.enumErrorProps && (r += "var F=t===k||t instanceof Error;");
        var o = [];
        if (St.enumPrototypes && o.push('!(G&&n=="prototype")'), St.enumErrorProps && o.push('!(F&&(n=="message"||n=="name"))'), 
        e.j && e.f) r += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];", 
        o.length && (r += "if(" + o.join("&&") + "){"), r += e.g + ";", o.length && (r += "}"), 
        r += "}"; else if (r += "for(n in t){", e.j && o.push("m.call(t, n)"), o.length && (r += "if(" + o.join("&&") + "){"), 
        r += e.g + ";", o.length && (r += "}"), r += "}", St.nonEnumShadows) {
            for (r += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];", 
            k = 0; 7 > k; k++) r += "n='" + e.h[k] + "';if((!(r&&x[n])&&m.call(t,n))", e.j || (r += "||(!x[n]&&t[n]!==A[n])"), 
            r += "){" + e.g + "}";
            r += "}";
        }
        return (e.b || St.nonEnumArgs) && (r += "}"), r += e.c + ";return E", n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", t + r + "}")(p, W, ft, _t, z, m, Pt, O, tt.f, lt, et, Ct, Y, pt, st);
    }
    function _() {
        var t = (t = i.indexOf) === S ? n : t;
        return t;
    }
    function d(n) {
        return "function" == typeof n && yt.test(n);
    }
    function b(n) {
        var t, e;
        return !n || st.call(n) != U || (t = n.constructor, j(t) && !(t instanceof t)) || !St.argsClass && m(n) || !St.nodeClass && r(n) ? !1 : St.ownLast ? (Nt(n, function(n, t, r) {
            return e = _t.call(r, t), !1;
        }), !1 !== e) : (Nt(n, function(n, t) {
            e = t;
        }), "undefined" == typeof e || _t.call(n, e));
    }
    function m(n) {
        return n && "object" == typeof n && "number" == typeof n.length && st.call(n) == M || !1;
    }
    function w(n) {
        var t = [];
        return Nt(n, function(n, e) {
            j(n) && t.push(e);
        }), t.sort();
    }
    function j(n) {
        return "function" == typeof n;
    }
    function x(n) {
        return !(!n || !et[typeof n]);
    }
    function O(n) {
        return "string" == typeof n || n && "object" == typeof n && st.call(n) == Y || !1;
    }
    function E(n, t, e) {
        var r = -1, o = _(), u = n ? n.length : 0, i = !1;
        return e = (0 > e ? Et(0, u + e) : e) || 0, Pt(n) ? i = -1 < o(n, t, e) : "number" == typeof u ? i = -1 < (O(n) ? n.indexOf(t, e) : o(n, t, e)) : Bt(n, function(n) {
            return ++r < e ? void 0 : !(i = n === t);
        }), i;
    }
    function A(n, t, e) {
        if (t && "undefined" == typeof e && Pt(n)) {
            e = -1;
            for (var r = n.length; ++e < r && !1 !== t(n[e], e, n); ) ;
        } else Bt(n, t, e);
        return n;
    }
    function C(n, t, e) {
        var r = -1, o = n ? n.length : 0, u = Array("number" == typeof o ? o : 0);
        if (t = i.createCallback(t, e, 3), Pt(n)) for (;++r < o; ) u[r] = t(n[r], r, n); else Bt(n, function(n, e, o) {
            u[++r] = t(n, e, o);
        });
        return u;
    }
    function S(t, e, r) {
        if ("number" == typeof r) {
            var o = t ? t.length : 0;
            r = 0 > r ? Et(0, o + r) : r || 0;
        } else if (r) return r = P(t, e), t[r] === e ? r : -1;
        return n(t, e, r);
    }
    function P(n, t, e, r) {
        var o = 0, u = n ? n.length : o;
        for (e = e ? i.createCallback(e, r, 1) : F, t = e(t); u > o; ) r = o + u >>> 1, 
        e(n[r]) < t ? o = r + 1 : u = r;
        return o;
    }
    function D(n, t) {
        return 2 < arguments.length ? g(n, 17, u(arguments, 2), null, t) : g(n, 1, null, null, t);
    }
    function F(n) {
        return n;
    }
    function I(n, t, e) {
        var r = !0, o = t && w(t);
        t && (e || o.length) || (null == e && (e = t), u = a, t = n, n = i, o = w(t)), !1 === e ? r = !1 : x(e) && "chain" in e && (r = e.chain);
        var u = n, c = j(u);
        A(o, function(e) {
            var o = n[e] = t[e];
            c && (u.prototype[e] = function() {
                var t = this.__chain__, e = this.__wrapped__, i = [ e ];
                if (dt.apply(i, arguments), i = o.apply(n, i), r || t) {
                    if (e === i && x(i)) return this;
                    i = new u(i), i.__chain__ = t;
                }
                return i;
            });
        });
    }
    function B() {}
    function L(n) {
        return function(t) {
            return t[n];
        };
    }
    function N() {
        return this.__wrapped__;
    }
    var R = [], z = {}, $ = 40, T = /\w*$/, K = /^\s*function[ \n\r\t]+\w/, G = /\bthis\b/, J = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), M = "[object Arguments]", q = "[object Array]", H = "[object Boolean]", V = "[object Date]", W = "[object Error]", Q = "[object Number]", U = "[object Object]", X = "[object RegExp]", Y = "[object String]", Z = {
        "[object Function]": !1
    };
    Z[M] = Z[q] = Z[H] = Z[V] = Z[Q] = Z[U] = Z[X] = Z[Y] = !0;
    var nt = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    }, tt = {
        a: "",
        b: null,
        c: "",
        d: "",
        e: "",
        v: null,
        g: "",
        h: null,
        support: null,
        i: "",
        j: !1
    }, et = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    }, rt = et[typeof window] && window || this, ot = et[typeof exports] && exports && !exports.nodeType && exports, ut = et[typeof module] && module && !module.nodeType && module, it = ut && ut.exports === ot && ot, at = et[typeof global] && global;
    !at || at.global !== at && at.window !== at || (rt = at);
    var ct = [], ft = Error.prototype, lt = Object.prototype, pt = String.prototype, st = lt.toString, yt = RegExp("^" + (st + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), ht = Math.ceil, gt = Function.prototype.toString, vt = d(vt = Object.getPrototypeOf) && vt, _t = lt.hasOwnProperty, dt = ct.push, bt = lt.propertyIsEnumerable, mt = ct.unshift, wt = function() {
        try {
            var n = {}, t = d(t = Object.defineProperty) && t, e = t(n, n, n) && t;
        } catch (r) {}
        return e;
    }(), jt = d(jt = Object.create) && jt, xt = d(xt = Array.isArray) && xt, Ot = d(Ot = Object.keys) && Ot, Et = Math.max, At = {};
    At[q] = Array, At[H] = Boolean, At[V] = Date, At["[object Function]"] = Function, 
    At[U] = Object, At[Q] = Number, At[X] = RegExp, At[Y] = String;
    var Ct = {};
    Ct[q] = Ct[V] = Ct[Q] = {
        constructor: !0,
        toLocaleString: !0,
        toString: !0,
        valueOf: !0
    }, Ct[H] = Ct[Y] = {
        constructor: !0,
        toString: !0,
        valueOf: !0
    }, Ct[W] = Ct["[object Function]"] = Ct[X] = {
        constructor: !0,
        toString: !0
    }, Ct[U] = {
        constructor: !0
    }, function() {
        for (var n = J.length; n--; ) {
            var t, e = J[n];
            for (t in Ct) _t.call(Ct, t) && !_t.call(Ct[t], e) && (Ct[t][e] = !1);
        }
    }(), a.prototype = i.prototype;
    var St = i.support = {};
    !function() {
        function n() {
            this.x = 1;
        }
        var t = {
            0: 1,
            length: 1
        }, e = [];
        n.prototype = {
            valueOf: 1,
            y: 1
        };
        for (var r in new n()) e.push(r);
        for (r in arguments) ;
        St.argsClass = st.call(arguments) == M, St.argsObject = arguments.constructor == Object && !(arguments instanceof Array), 
        St.enumErrorProps = bt.call(ft, "message") || bt.call(ft, "name"), St.enumPrototypes = bt.call(n, "prototype"), 
        St.funcDecomp = !d(rt.k) && G.test(function() {
            return this;
        }), St.funcNames = "string" == typeof Function.name, St.nonEnumArgs = 0 != r, St.nonEnumShadows = !/valueOf/.test(e), 
        St.ownLast = "x" != e[0], St.spliceObjects = (ct.splice.call(t, 0, 1), !t[0]), St.unindexedChars = "xx" != "x"[0] + Object("x")[0];
        try {
            St.nodeClass = !(st.call(document) == U && !({
                toString: 0
            } + ""));
        } catch (o) {
            St.nodeClass = !0;
        }
    }(1), jt || (l = function() {
        function n() {}
        return function(t) {
            if (x(t)) {
                n.prototype = t;
                var e = new n();
                n.prototype = null;
            }
            return e || rt.Object();
        };
    }());
    var kt = wt ? function(n, t) {
        nt.value = t, wt(n, "__bindData__", nt);
    } : B;
    St.argsClass || (m = function(n) {
        return n && "object" == typeof n && "number" == typeof n.length && _t.call(n, "callee") && !bt.call(n, "callee") || !1;
    });
    var Pt = xt || function(n) {
        return n && "object" == typeof n && "number" == typeof n.length && st.call(n) == q || !1;
    }, Dt = v({
        a: "z",
        e: "[]",
        i: "if(!(B[typeof z]))return E",
        g: "E.push(n)"
    }), Ft = Ot ? function(n) {
        return x(n) ? St.enumPrototypes && "function" == typeof n || St.nonEnumArgs && n.length && m(n) ? Dt(n) : Ot(n) : [];
    } : Dt, at = {
        a: "g,e,K",
        i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
        b: "typeof u=='number'",
        v: Ft,
        g: "if(e(t[n],n,g)===false)return E"
    }, xt = {
        a: "z,H,l",
        i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
        v: Ft,
        g: "if(typeof E[n]=='undefined')E[n]=t[n]",
        c: "}}"
    }, It = {
        i: "if(!B[typeof t])return E;" + at.i,
        b: !1
    }, Bt = v(at), Lt = v(xt, {
        i: xt.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
        g: "E[n]=e?e(E[n],t[n]):t[n]"
    }), Nt = v(at, It, {
        j: !1
    }), Rt = v(at, It);
    j(/x/) && (j = function(n) {
        return "function" == typeof n && "[object Function]" == st.call(n);
    });
    var zt = vt ? function(n) {
        if (!n || st.call(n) != U || !St.argsClass && m(n)) return !1;
        var t = n.valueOf, e = d(t) && (e = vt(t)) && vt(e);
        return e ? n == e || vt(n) == e : b(n);
    } : b;
    i.assign = Lt, i.bind = D, i.chain = function(n) {
        return n = new a(n), n.__chain__ = !0, n;
    }, i.createCallback = function(n, t, e) {
        var r = typeof n;
        if (null == n || "function" == r) return p(n, t, e);
        if ("object" != r) return L(n);
        var o = Ft(n), u = o[0], i = n[u];
        return 1 != o.length || i !== i || x(i) ? function(t) {
            for (var e = o.length, r = !1; e-- && (r = y(t[o[e]], n[o[e]], null, !0)); ) ;
            return r;
        } : function(n) {
            return n = n[u], i === n && (0 !== i || 1 / i == 1 / n);
        };
    }, i.forEach = A, i.forIn = Nt, i.forOwn = Rt, i.functions = w, i.invoke = function(n, t) {
        var e = u(arguments, 2), r = -1, o = "function" == typeof t, i = n ? n.length : 0, a = Array("number" == typeof i ? i : 0);
        return A(n, function(n) {
            a[++r] = (o ? t : n[t]).apply(n, e);
        }), a;
    }, i.keys = Ft, i.map = C, i.merge = function(n) {
        var t = arguments, r = 2;
        if (!x(n)) return n;
        if ("number" != typeof t[2] && (r = t.length), r > 3 && "function" == typeof t[r - 2]) var i = p(t[--r - 1], t[r--], 2); else r > 2 && "function" == typeof t[r - 1] && (i = t[--r]);
        for (var t = u(arguments, 1, r), a = -1, c = e(), f = e(); ++a < r; ) h(n, t[a], i, c, f);
        return o(c), o(f), n;
    }, i.min = function(n, e, r) {
        var o = 1 / 0, u = o;
        if ("function" != typeof e && r && r[e] === n && (e = null), null == e && Pt(n)) {
            r = -1;
            for (var a = n.length; ++r < a; ) {
                var c = n[r];
                u > c && (u = c);
            }
        } else e = null == e && O(n) ? t : i.createCallback(e, r, 3), Bt(n, function(n, t, r) {
            t = e(n, t, r), o > t && (o = t, u = n);
        });
        return u;
    }, i.pluck = C, i.property = L, i.range = function(n, t, e) {
        n = +n || 0, e = "number" == typeof e ? e : +e || 1, null == t && (t = n, n = 0);
        var r = -1;
        t = Et(0, ht((t - n) / (e || 1)));
        for (var o = Array(t); ++r < t; ) o[r] = n, n += e;
        return o;
    }, i.collect = C, i.each = A, i.extend = Lt, i.methods = w, I(i), i.cloneDeep = function(n, t, e) {
        return f(n, !0, "function" == typeof t && p(t, e, 1));
    }, i.contains = E, i.identity = F, i.indexOf = S, i.isArguments = m, i.isArray = Pt, 
    i.isFunction = j, i.isObject = x, i.isPlainObject = zt, i.isString = O, i.mixin = I, 
    i.noop = B, i.size = function(n) {
        var t = n ? n.length : 0;
        return "number" == typeof t ? t : Ft(n).length;
    }, i.sortedIndex = P, i.include = E, I(function() {
        var n = {};
        return Rt(i, function(t, e) {
            i.prototype[e] || (n[e] = t);
        }), n;
    }(), !1), Rt(i, function(n, t) {
        var e = "sample" !== t;
        i.prototype[t] || (i.prototype[t] = function(t, r) {
            var o = this.__chain__, u = n(this.__wrapped__, t, r);
            return o || null != t && (!r || e && "function" == typeof t) ? new a(u, o) : u;
        });
    }), i.VERSION = "2.4.1", i.prototype.chain = function() {
        return this.__chain__ = !0, this;
    }, i.prototype.toString = function() {
        return this.__wrapped__ + "";
    }, i.prototype.value = N, i.prototype.valueOf = N, Bt([ "join", "pop", "shift" ], function(n) {
        var t = ct[n];
        i.prototype[n] = function() {
            var n = this.__chain__, e = t.apply(this.__wrapped__, arguments);
            return n ? new a(e, n) : e;
        };
    }), Bt([ "push", "reverse", "sort", "unshift" ], function(n) {
        var t = ct[n];
        i.prototype[n] = function() {
            return t.apply(this.__wrapped__, arguments), this;
        };
    }), Bt([ "concat", "slice", "splice" ], function(n) {
        var t = ct[n];
        i.prototype[n] = function() {
            return new a(t.apply(this.__wrapped__, arguments), this.__chain__);
        };
    }), St.spliceObjects || Bt([ "pop", "shift", "splice" ], function(n) {
        var t = ct[n], e = "splice" == n;
        i.prototype[n] = function() {
            var n = this.__chain__, r = this.__wrapped__, o = t.apply(r, arguments);
            return 0 === r.length && delete r[0], n || e ? new a(o, n) : o;
        };
    }), "function" == typeof define && "object" == typeof define.amd && define.amd ? (rt._ = i, 
    define(function() {
        return i;
    })) : ot && ut ? it ? (ut.exports = i)._ = i : ot._ = i : rt._ = i;
}.call(this), _.mixin({
    deepGet: function() {
        var obj = arguments[0], props = _.rest(arguments);
        return _.reduce(props, function(memo, prop) {
            return _.isObject(memo) && _.has(memo, prop) ? _.result(memo, prop) : void 0;
        }, obj);
    },
    isEmptyObject: function(obj) {
        for (var prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) return !1;
        return !0;
    },
    tiedSort: function(arrayPair, compareFunction) {
        for (var array1 = arrayPair[0], array2 = arrayPair[1], all = [], i = 0; i < array2.length; i++) all.push({
            A: array1[i],
            B: array2[i]
        });
        for (compareFunction || (compareFunction = function(a1, a2) {
            return a1 - a2;
        }), all.sort(function(a, b) {
            return compareFunction(a.A, b.A);
        }), array1 = [], array2 = [], i = 0; i < all.length; i++) array1.push(all[i].A), 
        array2.push(all[i].B);
        return [ array1, array2 ];
    },
    replaceArrayContents: function(arr, replacer) {
        return arr.length = 0, Array.prototype.push.apply(arr, replacer), arr;
    },
    isLoggedIn: function() {
        return !!$.cookie("ssf_auth");
    },
    getPropertyNameHint: function(name) {
        var hints = {
            duration: "Seconds",
            progress: "Percentage"
        }, ret = _.deepGet(hints, name) || "";
        return ret;
    },
    getPropertyNameUnit: function(name) {
        var units = {
            duration: "s",
            progress: "%"
        }, ret = _.deepGet(units, name) || "";
        return ret;
    }
});

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