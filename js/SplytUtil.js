/**
 * SplytUtil
 * @private
 * @class
 * @classdesc
 *
 * <p>
 * An internal utility class used in the core library for Splyt.
 * It provides implementations of some built-in functions available in PHP for dealing with types, as well
 * as a jQuery-compatible .ajax() implementation.
 * </p>
 *
 * Copyright 2015 Knetik, Inc.
 *
 * Includes modified portions of code from:
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
 * Underscore.js 1.6.0, Zepto.js 1.1.3, and php.js are all licensed under the MIT license.
 * Please note that the MIT license is ONLY applicable to these three libraries; it does not
 * apply to other software included in the SPLYT SDK for Javascript except where explicitly
 * stated otherwise.
 *
 * The MIT license for Underscore.js 1.6.0, Zepto.js 1.1.3, and php.js appears below:
 *
 *     Permission is hereby granted, free of charge, to any person obtaining
 *     a copy of this software and associated documentation files (the
 *     "Software"), to deal in the Software without restriction, including
 *     without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to
 *     permit persons to whom the Software is furnished to do so, subject to
 *     the following conditions:
 *
 *     The above copyright notice and this permission notice shall be
 *     included in all copies or substantial portions of the Software.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *     LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *     OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var SplytUtil = (function() {

  // --------------------------------------------------
  // adapted from Underscore.js 1.6.0
  // --------------------------------------------------
  var $ = {};
  var ArrayProto = Array.prototype;
  var slice = ArrayProto.slice;
  var nativeForEach = ArrayProto.forEach;

  if (window.JSON) $.parseJSON = JSON.parse;

  var each = $.each = $.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  $.extend = function(obj) {
      each(slice.call(arguments, 1), function(source) {
        if (source) {
          for (var prop in source) {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    };

  // --------------------------------------------------
  // adapted from Zepto.js 1.1.3, "zepto" module
  // --------------------------------------------------
  var class2type = {};
  var toString = class2type.toString;
  var isArray = Array.isArray || function(object){ return object instanceof Array; };

    // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(name, i) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
  });


  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object";
  }

  function isWindow(obj)     { return obj != null && obj == obj.window; };
  function isObject(obj)     { return type(obj) == "object"; };
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  $.type = type;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  return $;
})();

// --------------------------------------------------
// adapted from Zepto.js 1.1.3, "ajax" module
// --------------------------------------------------
(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/;

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data);
  }

  // Number of active Ajax requests
  $.active = 0;

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop');
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false;

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success';
    settings.success.call(context, data, status, xhr);
    if (deferred) deferred.resolveWith(context, [data, status, xhr]);
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings);
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    if (deferred) deferred.rejectWith(context, [xhr, type, error]);
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
    ajaxComplete(type, xhr, settings);
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
    ajaxStop(settings);
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options);

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort');
      },
      xhr = { abort: abort }, abortTimeout;

    if (deferred) deferred.promise(xhr);

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout);
      $(script).off().remove();

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred);
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred);
      }

      window[callbackName] = originalCallback;
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0]);

      originalCallback = responseData = undefined;
    });

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort');
      return xhr;
    }

    window[callbackName] = function(){
      responseData = arguments;
    };

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
    document.head.appendChild(script);

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout');
    }, options.timeout);

    return xhr;
  };

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest();
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  };

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0];
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text';
  }

  function appendQuery(url, query) {
    if (query == '') return url;
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional);
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined;
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred();
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];

    ajaxStart(settings);

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host;

    if (!settings.url) settings.url = window.location.toString();
    serializeData(settings);
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now());

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?');
      return $.ajaxJSONP(settings, deferred);
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value]; },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout;

    if (deferred) deferred.promise(xhr);

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
    setHeader('Accept', mime || '*/*');
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
    xhr.setRequestHeader = setHeader;

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout);
        var result, error = false;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          result = xhr.responseText;

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result);
            else if (dataType == 'xml')  result = xhr.responseXML;
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
          } catch (e) { error = e; }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);
          else ajaxSuccess(result, xhr, settings, deferred);
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
        }
      }
    };

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort();
      ajaxError(null, 'abort', xhr, settings, deferred);
      return xhr;
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];

    var async = 'async' in settings ? settings.async : true;
    xhr.open(settings.type, settings.url, async, settings.username, settings.password);

    for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty;
        xhr.abort();
        ajaxError(null, 'timeout', xhr, settings, deferred);
      }, settings.timeout);

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null);
    return xhr;
  };

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined;
    if (!$.isFunction(success)) dataType = success, success = undefined;
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    };
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments));
  };

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return $.ajax(options);
  };

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return $.ajax(options);
  };

  var escape = encodeURIComponent;

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
    $.each(obj, function(key, value) {
      type = $.type(value);
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value);
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key);
      else params.add(key, value);
    });
  }

  $.param = function(obj, traditional){
    var params = [];
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)); };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  };
})(SplytUtil);

// --------------------------------------------------
// adapted from php.js
// --------------------------------------------------
(function($){
  /**
   * @desc
   * <p>See {@link http://phpjs.org/functions/is_float/}</p>
   * <p>NOTE: This version is unmodified</p>
   */
  $.is_float = function (mixed_var) {
      "use strict";
      // http://kevin.vanzonneveld.net
      // +   original by: Paulo Freitas
      // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
      // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
      // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
      // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
      // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
      // *     example 1: is_float(186.31);
      // *     returns 1: true
      return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
  },
  /**
   * @desc
   * <p>See {@link http://phpjs.org/functions/gettype/}</p>
   * <p>NOTE: This version is unmodified</p>
   */
  $.gettype = function (mixed_var) {
      "use strict";
      // http://kevin.vanzonneveld.net
      // +   original by: Paulo Freitas
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Douglas Crockford (http://javascript.crockford.com)
      // +   input by: KELAN
      // +   improved by: Brett Zamir (http://brett-zamir.me)
      // -    depends on: is_float
      // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
      // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
      // *     example 1: gettype(1);
      // *     returns 1: 'integer'
      // *     example 2: gettype(undefined);
      // *     returns 2: 'undefined'
      // *     example 3: gettype({0: 'Kevin van Zonneveld'});
      // *     returns 3: 'array'
      // *     example 4: gettype('foo');
      // *     returns 4: 'string'
      // *     example 5: gettype({0: function () {return false;}});
      // *     returns 5: 'array'
      var s = typeof mixed_var,
        name;
      var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
          return '(Anonymous)';
        }
        return name[1];
      };
      if (s === 'object') {
        if (mixed_var !== null) { // From: http://javascript.crockford.com/remedial.html
          if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var.splice === 'function') {
            s = 'array';
          } else if (mixed_var.constructor && getFuncName(mixed_var.constructor)) {
            name = getFuncName(mixed_var.constructor);
            if (name === 'Date') {
              s = 'date'; // not in PHP
            } else if (name === 'RegExp') {
              s = 'regexp'; // not in PHP
            } else if (name === 'PHPJS_Resource') { // Check against our own resource constructor
              s = 'resource';
            }
          }
        } else {
          s = 'null';
        }
      } else if (s === 'number') {
        s = this.is_float(mixed_var) ? 'double' : 'integer';
      }
      return s;
  },
  /**
   * @desc
   * <p>See {@link http://phpjs.org/functions/settype/}</p>
   * <p>NOTE: This version is modified with some minor bug fixes</p>
   */
  $.settype = function (vr, type) {
      "use strict";
      // http://kevin.vanzonneveld.net
      // +   original by: Waldo Malqui Silva
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +    revised by: Brett Zamir (http://brett-zamir.me)
      // %        note 1: Credits to Crockford also
      // %        note 2: only works on global variables, and "vr" must be passed in as a string
      // *     example 1: foo = '5bar';
      // *     example 1: settype('foo', 'integer');
      // *     results 1: foo === 5
      // *     returns 1: true
      // *     example 2: foo = true;
      // *     example 2: settype('foo', 'string');
      // *     results 2: foo === '1'
      // *     returns 2: true
      var is_array = function (arr) {
        return typeof arr === 'object' && typeof arr.length === 'number' && !(arr.propertyIsEnumerable('length')) && typeof arr.splice === 'function';
      };
      var v, mtch, i, obj;
      v = this[vr] ? this[vr] : vr;
      var retVal = true;
      try {
        switch (type) {
        case 'boolean':
          if (is_array(v) && v.length === 0) {
            this[vr] = false;
          } else if (v === '0') {
            this[vr] = false;
          } else if (typeof v === 'object' && !is_array(v)) {
            var lgth = false;
            for (i in v) {
              lgth = true;
            }
            this[vr] = lgth;
          } else {
            this[vr] = !! v;
          }
          break;
        case 'integer':
          if (typeof v === 'number') {
            this[vr] = parseInt(v, 10);
          } else if (typeof v === 'string') {
            mtch = v.match(/^([+\-]?)(\d+)/);
            if (!mtch) {
              this[vr] = 0;
            } else {
              this[vr] = parseInt(v, 10);
            }
          } else if (v === true) {
            this[vr] = 1;
          } else if (v === false || v === null) {
            this[vr] = 0;
          } else if (is_array(v) && v.length === 0) {
            this[vr] = 0;
          } else if (typeof v === 'object') {
            this[vr] = 1;
          }
          break;
        case 'double':
        case 'float':
          if (typeof v === 'string') {
            mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
            if (!mtch) {
              this[vr] = 0;
            } else {
              this[vr] = parseFloat(v, 10);
            }
          } else if (v === true) {
            this[vr] = 1;
          } else if (v === false || v === null) {
            this[vr] = 0;
          } else if (is_array(v) && v.length === 0) {
            this[vr] = 0;
          } else if (typeof v === 'object') {
            this[vr] = 1;
          }
          break;
        case 'string':
          if (v === null || v === false) {
            this[vr] = '';
          } else if (is_array(v)) {
            this[vr] = 'Array';
          } else if (typeof v === 'object') {
            this[vr] = 'Object';
          } else if (v === true) {
            this[vr] = '1';
          } else {
            this[vr] += '';
          } // numbers (and functions?)
          break;
        case 'array':
          if (v === null) {
            this[vr] = [];
          } else if (typeof v !== 'object') {
            this[vr] = [v];
          } else {
              retVal = false;
          } // What to do with an object?  For now, just make it a non-valid conversion
          break;
        case 'object':
          if (v === null) {
            this[vr] = {};
          } else if (is_array(v)) {
            for (i = 0, obj = {}; i < v.length; i++) {
              obj[i] = v;
            }
            this[vr] = obj;
          } else if (typeof v !== 'object') {
            this[vr] = {
              scalar: v
            };
          }
          break;
        case 'null':
          delete this[vr];
          break;
        default: // Unknown type
          retVal = false;
          break;
        }
      } catch (e) {
          retVal = false;
      }
      return retVal;
  };
})(SplytUtil);
