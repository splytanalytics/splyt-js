/* Copyright 2015 Knetik, Inc. */

/**
 * <p>
 * This is the core of SPLYT.  This namespace includes functions to initialize SPLYT and set the active user.
 * It also contains nested namespaces that expose the rest of SPLYT's functionality.
 *
 * @namespace
 */
var splytDocCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue) {
    var sExpires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + "; path=/;";
    return true;
  },
  removeItem: function (sKey, sPath) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
};

var Splyt = {
    /**************************************************************************************************
     * Default string constants.
     */
    /**
     * Can be used as an argument to {@linkcode Splyt.Instrumentation.endTransaction} or {@linkcode Splyt.Instrumentation.beginAndEnd}
     * to indicate the successful completion of activity.
     * @constant
     */
    TXN_SUCCESS: "success",
    /**
     * Can be used as an argument to {@linkcode Splyt.Instrumentation.endTransaction} or {@linkcode Splyt.Instrumentation.beginAndEnd}
     * to indicate the unsuccessful completion of activity.
     * @constant
     */
    TXN_ERROR: "error",
    /**
     * Error thrown when SPLYT is initialized without specifying a customer ID.
     * @constant
     */
    ERROR_CID: "Missing or bad Customer ID",
    /**
     * Error thrown when SPLYT is initialized when specifying a user or device, but without specifying a valid ID.
     * @constant
     */
    ERROR_ARGUMENT: "Bad Arguments",

    /**************************************************************************************************
     * Utility and initialization
     */

    /**
     * @desc
     * <p>Initializes SPLYT.</p>
     * <p>Notes:</p>
     * <ul>
     *  <li>If specifying an object for the user or device, that object must contain a field named 'id'</li>
     *  <li>If specifying an object for the user or device, you can also specify a field called properties which will take an object.</li>
     *  <li>You do not have to specify a user or device if you do not have one.  SPLYT will assign a device id for you and store it persistently.</li>
     *  <li>You can register a user later in the application by calling {@linkcode Splyt.registerUser}</li>
     * </ul>
     * @param {Object} params
     * <p>A key value object that defines the operating parameters of SPLYT.  The following table
     * describes the expected fields.</p>
     * <table>
     *   <tr><th>Field</th><th>Type</th><th>Description</th><th>Required</th></tr>
     *   <tr><td>customerId</td><td>String</td><td>The customer Id given to you by the Splyt team</td><td>Yes</td></tr>
     *   <tr><td>apikey</td><td>String</td><td>An API Key generated for your product in the SPLYT UI.  Used for {@link Splyt.Charts Charts support}.</td><td>No</td></tr>
     *   <tr><td>user</td><td>String|Integer|Object</td><td>An ID or object that can uniquely identify a user within your application.</td><td>(see notes)</td></tr>
     *   <tr><td>device</td><td>String|Integer|Object</td><td>An ID or object that can uniquely identify a device within your application.<td>(see notes)</td></tr>
     *   <tr><td>chartOnly</td><td>Boolean</td>True if the SDK is only going to be used for charting purposes and should not perform data collection.  Default is false.<td><td>false</td></tr>
     *   <tr><td>alwaysFetchTuning</td><td>Boolean</td><td>True (default) always tries to update SPLYT Tuning Variables on init. False requires a later call to refresh() to ensure tuning is updated. Default is true. </td><td>false</td></tr>
     *   <tr><td>scrape</td><td>Boolean</td>True if the SDK should scrape for properties about the browser automaticallt.  Default is true.<td><td>false</td></tr>
     *   <tr><td>host</td><td>String</td><td>overrides the SPLYT endpoint - for development or custom enviroments</td><td>false</td></tr>
     * </table>
     * @param {initCallback} callback
     * <p>A function to call once the SDK has been initialized successfully.</p>
     * @param {String} context
     * <p>A single string to indicate where this hook was called from in your code.</p>
     */
    init: function(params, callback, context) {
        "use strict";

        //clear out usedVars
        Splyt.usedVars = {};

        //validate the params object is an object...
        if(params === undefined || SplytUtil.gettype(params) !== 'object') {
            throw new Error(Splyt.ERROR_ARGUMENT);
        }

        //pull out the host override if it is okay...
        if(params.hasOwnProperty('host')) {
            if(SplytUtil.gettype(params.host) === 'string' && params.host !== '') {
                Splyt.params.host = params.host;
            } else {
                throw new Error(Splyt.ERROR_ARGUMENT);
            }
        }

        //pull out the customer id if it is okay...
        if(params.hasOwnProperty('customerId')) {
            if(SplytUtil.gettype(params.customerId) === 'string' && params.customerId !== '') {
                Splyt.params.customerId = params.customerId;
            } else {
                throw new Error(Splyt.ERROR_CID);
            }
        } else {
            throw new Error(Splyt.ERROR_CID);
        }

        //pull out the api key if there is one...
        if(params.hasOwnProperty('apikey')) {
            if(SplytUtil.gettype(params.apikey) === 'string' && params.apikey !== '') {
                Splyt.params.apikey = params.apikey;
            }
        }

        //set user and device objects as passed if they are valid...
        if(params.hasOwnProperty('user')) {
            var userT = SplytUtil.gettype(params.user);
            if(userT === 'object') {
                if(params.user.hasOwnProperty('id')) {
                    Splyt.params.user = params.user;
                    if(params.user.hasOwnProperty('properties')) {
                        if(SplytUtil.gettype(params.user.properties) !== 'object') {
                            throw new Error(Splyt.ERROR_ARGUMENT);
                        }
                    } else {
                        Splyt.params.user.properties = {};
                    }
                } else {
                    throw new Error(Splyt.ERROR_ARGUMENT);
                }
            } else if(userT === 'string' || userT === 'integer') {
                Splyt.params.user = {id:params.user,properties:{}};
            } else {
                throw new Error(Splyt.ERROR_ARGUMENT);
            }
        } else {
            Splyt.params.user = {id:null,properties:{}};
        }

        if(params.hasOwnProperty('device')) {
            var deviceT = SplytUtil.gettype(params.device);
            if(deviceT === 'object') {
                if(params.device.hasOwnProperty('id')) {
                    Splyt.params.device = params.device;
                    if(params.device.hasOwnProperty('properties')) {
                        if(SplytUtil.gettype(params.device.properties) !== 'object') {
                            throw new Error(Splyt.ERROR_ARGUMENT);
                        }
                    } else {
                        Splyt.params.device.properties = {};
                    }
                } else {
                    throw new Error(Splyt.ERROR_ARGUMENT);
                }
            } else if(deviceT === 'string' || deviceT === 'integer') {
                Splyt.params.device = {id:params.device,properties:{}};
            } else {
                throw new Error(Splyt.ERROR_ARGUMENT);
            }
        } else {
            if(splytDocCookies.getItem(Splyt.LOCAL_STORAGE_KEY) !== undefined) {
                Splyt.params.device = {id:JSON.parse(splytDocCookies.getItem(Splyt.LOCAL_STORAGE_KEY)),properties:{}};
            } else {
                Splyt.params.device = {id:null,properties:{}};
            }
            if(Splyt.params.device.id !== null) {
                splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(Splyt.params.device.id));
            }
        }

        var platform = window.platform;

        //scrape for some device properties...
        if(!params.hasOwnProperty('scrape') || params.scrape) {
            if(platform) {
                if(platform.name) {
                    Splyt.params.device.properties.browser = platform.name;
                }
                if(platform.version) {
                    Splyt.params.device.properties.browserversion = platform.version;
                }
                if(platform.os) {
                    if(platform.os.family) {
                        Splyt.params.device.properties.osname = platform.os.family;
                    }
                    if(platform.os.version) {
                        Splyt.params.device.properties.osversion = platform.os.version;
                    }
                }
                if(platform.description) {
                    Splyt.params.device.properties.description = platform.description;
                }
                if(navigator) {
                    if(navigator.language) {
                        Splyt.params.device.properties.language = navigator.language.toLowerCase();
                    }
                }
            }
        }

        if (!params.hasOwnProperty('chartOnly') || !params.chartOnly) {
            Splyt.params.chartOnly = false;

            // Look for params used on the last init call.  We'll use them to
            // determine whether we need to do a full init, update user/device state, or
            // nothing at all.
            var cachedInitParams = Splyt.getCachedInitParams();

            // fetch tuning?
            if ((!params.hasOwnProperty('alwaysFetchTuning') || params.alwaysFetchTuning) && Splyt.needFullInit(cachedInitParams)) {
                Splyt.fullInit(callback, context);
            }
            else {
                if (Splyt.entityStateChanged('device', cachedInitParams)) {
                    Splyt.Instrumentation.updateDeviceState(Splyt.params.device.properties, context);
                }
                if (Splyt.entityStateChanged('user', cachedInitParams)) {
                    Splyt.Instrumentation.updateUserState(Splyt.params.user.properties, context);
                }

                if (callback) {
                    callback(null);
                }
            }
        } else {
            Splyt.params.chartOnly = true;
        }
    },
    /**
     * @callback initCallback
     * @desc
     * <p>The init callback is provided to the {@linkcode Splyt.init} function.  It is invoked
     * once Splyt has successfully been initialized.</p>
     */

    /**
     * @desc
     * <p>Clears the active user registered by SPLYT.  This function if useful if a user logs out, but you still want to capture activity.</p>
     */
    clearActiveUser : function() {
        "use strict";
        Splyt.params.user = {id:null,properties:{}};
    },

    /**
     * @desc
     * <p>Registers a new user SPLYT.  This function is useful if a user logs in and you want to start capturing user-centric activity</p>
     * @param {String|Integer|Object} user
     * A user object or id.  Same as accepted by init().
     * @param {String} context
     * <p>A single string to indicate where this hook was called from in your code.</p>
     * @param {initCallback} callback
     * <p>A function to call once the SDK has been initialized successfully.</p>
     */
    registerUser : function(user, context, callback) {
        "use strict";

        if(Splyt.params.chartOnly) {
            return;
        }

        // If a user is explicitly being registered, just assume that the user is changing,
        // invalidating the stored params that we use to determine whether a full init
        // is necessary the next time the user calls Splyt.init.
        sessionStorage.removeItem(Splyt.SESSION_PREVIOUS_INIT_KEY);

        var userT = SplytUtil.gettype(user);
        if(userT === 'object') {
            if(user.hasOwnProperty('id')) {
                Splyt.params.user = user;
                if(user.hasOwnProperty('properties')) {
                    if(SplytUtil.gettype(user.properties) !== 'object') {
                        throw new Error(Splyt.ERROR_ARGUMENT);
                    }
                } else {
                    Splyt.params.user.properties = {};
                }
            } else {
                throw new Error(Splyt.ERROR_ARGUMENT);
            }
        } else if(userT === 'string' || userT === 'integer') {
            Splyt.params.user = {id:user,properties:{}};
        } else {
            throw new Error(Splyt.ERROR_ARGUMENT);
        }

        var ts = Splyt.getTimeStamp();

        var obj = Splyt.xhrObj('application_updateuser', Splyt.PERSONALIZATION, context, [ts, ts, Splyt.params.user.id, Splyt.params.device.id, Splyt.params.user.properties]);
        obj.success = function(ssfType) {
            var data = ssfType.data;
            if(data) {
                if(data.hasOwnProperty('userid') && data.userid !== null) {
                    Splyt.params.user.id = data.userid;
                }
                if(data.hasOwnProperty('usertuning') && data.usertuning !== null && SplytUtil.gettype(data.usertuning) === 'object') {
                    Splyt.userVars = data.usertuning;
                }
                if(data.hasOwnProperty('deviceid') && data.deviceid !== null) {
                    Splyt.params.device.id = data.deviceid;
                    splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(data.deviceid));
                }
                if(data.hasOwnProperty('devicetuning') && data.devicetuning !== null && SplytUtil.gettype(data.devicetuning) === 'object') {
                    Splyt.deviceVars = data.devicetuning;
                }

                if(callback) {callback(data);}
            }
        };
        obj.error = function() {
            if(callback) {callback(null);}
        };

        Splyt.xhr(obj);
    },

    /**************************************************************************************************
     * Consider Private
     */

    /*
     * @ignore
     * @private
     */
    sendDataPoint: function(hook, args, contextName) {
        "use strict";
        if(Splyt.params.chartOnly) {
            return;
        }

        var timestamp = Splyt.getTimeStamp();

        var completeArgs = [];
        completeArgs.push(timestamp);
        completeArgs.push(timestamp);
        completeArgs.push(Splyt.params.user.id);
        completeArgs.push(Splyt.params.device.id);
        if(args)
        {
            for(var argIdx = 0; argIdx < args.length; argIdx++)
            {
                completeArgs.push(args[argIdx]);
            }
        }

        var obj = Splyt.xhrObj(hook, Splyt.PERSONALIZATION, contextName, completeArgs);
        Splyt.xhr(obj);
    },

    /*
     * @ignore
     * @private
     */
    fullInit: function(callback, context) {
        //init the application
        var ts = Splyt.getTimeStamp();
        var obj = Splyt.xhrObj('application_init_with_entitystate_telem', Splyt.PERSONALIZATION, context, [ts, ts, Splyt.params.user.id, Splyt.params.device.id, Splyt.params.user.properties, Splyt.params.device.properties]);
        obj.success = function(ssfType) {
            var data = ssfType.data;
            if(data) {
                if(data.hasOwnProperty('userid') && data.userid !== null) {
                    Splyt.params.user.id = data.userid;
                }
                if(data.hasOwnProperty('usertuning') && data.usertuning !== null && SplytUtil.gettype(data.usertuning) === 'object') {
                    Splyt.userVars = data.usertuning;
                }
                if(data.hasOwnProperty('deviceid') && data.deviceid !== null) {
                    Splyt.params.device.id = data.deviceid;
                    splytDocCookies.setItem(Splyt.LOCAL_STORAGE_KEY, JSON.stringify(data.deviceid));
                }
                if(data.hasOwnProperty('devicetuning') && data.devicetuning !== null && SplytUtil.gettype(data.devicetuning) === 'object') {
                    Splyt.deviceVars = data.devicetuning;
                }

                // Remember our init params, so we can decide what level of init we need the next time around.
                // We wait until we get a successful response to do this, because we may end up updating
                // the user and/or device ID...as seen above.
                sessionStorage.setItem(Splyt.SESSION_PREVIOUS_INIT_KEY, JSON.stringify(Splyt.params));

                if(callback) {callback(data);}
            }
        };
        obj.error = function() {
            if(callback) {callback(null);}
        };

        Splyt.xhr(obj);
    },

    /*
     * @ignore
     * @private
     */
    needFullInit: function(cachedInitParams) {
        // If any of the following is true, we need to do a full init:
        //
        // 1) We have no record of a prior init during this browser session.
        // 2) The SPLYT host we're talking to has changed.
        // 3) The customer ID or API key we're using has changed.
        // 4) The user or device ID has changed (we'll want to make sure tuning refreshes in these cases).
        return !cachedInitParams ||
            (cachedInitParams.apikey !== Splyt.params.apikey) ||
            (cachedInitParams.customerId !== Splyt.params.customerId) ||
            (cachedInitParams.host !== Splyt.params.host) ||
            (Splyt.params.hasOwnProperty("user") && cachedInitParams.hasOwnProperty("user") && (cachedInitParams.user.id !== Splyt.params.user.id)) ||
            (Splyt.params.hasOwnProperty("device") && cachedInitParams.hasOwnProperty("device") && (cachedInitParams.device.id !== Splyt.params.device.id));
    },

    /*
     * @ignore
     * @private
     */
    entityStateChanged: function(entityType, cachedInitParams) {
        var changed = false;
        // If we have user state, and it looks different than the previous user state (or
        // if there is no previous user state), then consider it changed.
        if (Splyt.params.hasOwnProperty(entityType)) {
            changed = !cachedInitParams ||
                !cachedInitParams.hasOwnProperty(entityType) ||
                JSON.stringify(Splyt.params[entityType]) !== JSON.stringify(cachedInitParams[entityType]);
        }

        return changed;
    },

    /*
     * @ignore
     * @private
     */
    getCachedInitParams: function() {
        var cachedInitParams = null;
        try {
            cachedInitParams = JSON.parse(sessionStorage.getItem(Splyt.SESSION_PREVIOUS_INIT_KEY));
        }
        catch (err) {
            // no-op
        }

        return cachedInitParams;
    },

    /*
     * @ignore
     * @private
     */
    updateCachedInitParamsProperties: function(entityType, properties) {
        var cachedInitParams = Splyt.getCachedInitParams();

        if (!cachedInitParams) {
            return;
        }

        if (cachedInitParams.hasOwnProperty(entityType) && typeof cachedInitParams[entityType].properties === "object") {
            for (var p in properties) {
                if (cachedInitParams[entityType].properties.hasOwnProperty(p) && properties.hasOwnProperty(p)) {
                    cachedInitParams[entityType].properties[p] = properties[p];
                }
            }
        }

        sessionStorage.setItem(Splyt.SESSION_PREVIOUS_INIT_KEY, JSON.stringify(cachedInitParams));
    },

    /**************************************************************************************************
     * Member variables (Consider Private)
     */

    /*
     * @ignore
     * @private
     */
    params: {
        host: "https://data.splyt.com",           //the web point to send data to
        vishost: "https://dashboard.splyt.com",   //the web point to get data vis from
        customerId: null,                         //the customer id for the product
        user: {},                                 //an object representing the current user
        device: {}                                //an object representing the current device
    },
    /**
     * @ignore
     * @private
     */
    xhr: SplytUtil.ajax,
    /*
     * @ignore
     * @private
     */
    userVars: {},       //an array of cached tuning variables for users
    /*
     * @ignore
     * @private
     */
    deviceVars: {},      //an array of cached tuning variables for devices
    /*
     * @ignore
     * @private
     */
    usedVars: {},
    /*
     * @ignore
     * @private
     */
    PERSONALIZATION: 'isos-personalization',
    /*
     * @ignore
     * @private
     */
    TOOLS: 'isos-tools',
    /*
     * @ignore
     * @private
     */
    TIME_RECORDAGAIN: 8*60*60,
    /*
     * @ignore
     * @private
     */
    SDK_VERSION: '4.0.6',
    /*
     * @ignore
     * @private
     */
    WS_VERSION: '4',
    /*
     * @ignore
     * @private
     */
    TOOLS_VERSION: '-1',
    /**
     * @constant
     * @private
     */
    LOCAL_STORAGE_KEY: "splyt.device.id",
    /**
     * @constant
     * @private
     */
    SESSION_PREVIOUS_INIT_KEY: "splyt.initParams",
    /**
     * @constant
     * @private
     */
    TIMEOUT_MODE_TRANSACTION: "TXN",
    /**
     * @constant
     * @private
     */
    TIMEOUT_MODE_ANY: "ANY",
    /*
     * @ignore
     * @private
     */
    getQueryParms: function(service, contextName) {
        "use strict";

        if(Splyt.params.customerId === null) {
            return "";
        }

        var version = Splyt.WS_VERSION;
        if(service === Splyt.TOOLS) {
            version = Splyt.TOOLS_VERSION;
        }

        var qs = '?ssf_ws_version=' + version + '&ssf_cust_id=' + Splyt.params.customerId + '&ssf_output=json&ssf_sdk=js&ssf_sdk_version=' + Splyt.SDK_VERSION;
        if(service === Splyt.TOOLS && Splyt.params.apikey && Splyt.params.apikey.length > 0) {
            qs += '&ssf_api_key=' + Splyt.params.apikey;
        }
        if (contextName && contextName.length > 0) {
            qs += '&ssf_sdk_contextname=' + contextName;
        }

        return qs;
    },
    /*
     * @ignore
     * @private
     */
    buildURL: function(api, service, context) {
        "use strict";
        var URI = "/"+service+"/ws/interface/";

        var url = Splyt.params.host;
        if(service === Splyt.TOOLS) {
            url = Splyt.params.vishost;
        }

        url = url.replace(/\/$/, '');
        url = url.replace(/^\//, '');

        api = api.replace(/\/$/,'');
        api = api.replace(/^\//,'');

        return url + URI + api + Splyt.getQueryParms(service, context);
    },
    /*
     * @ignore
     * @private
     */
    xhrObj: function(api, service, context, data, dataType) {
        "use strict";
        dataType = dataType || "json";
        return {
            type: 'POST',
            url: Splyt.buildURL(api, service, context),
            data: JSON.stringify(data),
            dataType: dataType,
            processData: false,
            headers: { 'ssf-use-positional-post-params':'true', 'ssf-contents-not-url-encoded':'true' }
        };
    },
    /*
     * @ignore
     * @private
     */
    getTimeStamp: function() {
        "use strict";
        var date = new Date();
        return date.getTime() / 1000;
    },

    /**
     * <p>
     * <code>Splyt.Instrumentation</code> contains functions that allows you to
     * model any activity in the application. Functions in this namespace are accessible as follows:
     * <p>
     * <code>&nbsp;&nbsp;&nbsp;Splyt.Instrumentation.<em>function</em>();</code>
     *
     * @namespace
     * @alias Splyt.Instrumentation
    */
    Instrumentation: {
        /**
         * @desc
         * <p>Updates state information about the user.</p>
         *
         * @param {Object} properties
         * <p>A key value object that defines properties about a user and their values.
         * This property bag is allowed to be a nested object structure.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         */
        updateUserState: function(properties, context) {
            "use strict";
            Splyt.sendDataPoint('datacollector_updateUserState', [properties], context);
            Splyt.updateCachedInitParamsProperties('user', properties);
        },

        /**
         * @desc
         * <p>Updates state information about a device.</p>
         *
         * @param {Object} properties
         * <p>A key value object that defines properties about a device and their values.
         * This property bag is allowed to be a nested object structure.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         */
        updateDeviceState: function(properties, context) {
            "use strict";
            Splyt.sendDataPoint('datacollector_updateDeviceState', [properties], context);
            Splyt.updateCachedInitParamsProperties('device', properties);
        },

        /**
         * @desc
         * <p>Begin a transaction of a certain category, with a timeout and properties.</p>
         *
         * <p>If multiple transactions of this category are going to be active at the same time for a given user, or
         * device, a transaction id is required to be provided.</p>
         *
         * @param category {String}
         * <p>The category of the transaction</p>
         * @param timeout {Integer}
         * <p>The amount of time, in seconds, after which a transaction should be timed out if a corresponding end is not sent.</p>
         * @param properties {Object}
         * <p>A key value object that defines properties about the transaction and their values. This object is allowed to be nested.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         * @param transactionid {String}
         * <p>An ID that uniquely identifies this transaction within the category.</p>
         * <p>The transaction ID is only required if more than one transaction of a given category will be simultaneously
         * active for a given user or device.</p>
         */
        beginTransaction: function(category, timeout, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint('datacollector_beginTransaction', [category, Splyt.TIMEOUT_MODE_TRANSACTION, timeout, transactionid, properties], context);
        },

        /**
         * @desc
         * <p>Update a previously begun transaction of a given category to some progress.</p>
         *
         * @param category {String}
         * <p>The category of the transaction</p>
         * @param progress {Number}
         * <p>The current progress of the transaction.  Should be a number greater than 0 and less than 100.</p>
         * @param properties {Object}
         * <p>A key value object that defines properties about the transaction and their values.  Can be used to update or
         * augment any properties previously set in beginTransaction or other calls to updateTransaction. This object is allowed to be nested.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         * @param transactionid {String}
         * <p>An ID that uniquely identifies this transaction with the category.</p>
         * <p>The transaction ID is only required if more than one transaction of a given category will be simultaneously
         * active for a given user or device.</p>
         */
        updateTransaction: function(category, progress, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint('datacollector_updateTransaction', [category, progress, transactionid, properties], context);
        },

        /**
         * @desc
         * <p>End a transaction of a given category with some result.</p>
         * @param category {String}
         * <p>The category of the transaction</p>
         * @param result {String}
         * <p>A string representing the result of the transaction.<p>
         * <p>You can use {@linkcode Splyt.TXN_SUCCESS} to indicate a successfully ended transaction or {@linkcode Splyt.TXN_ERROR} to indicate a
         * transaction that did not end properly.</p>
         * @param properties {Object}
         * <p>A key value object that defines properties about the transaction and their values.  Can be used to update or
         * augment any properties previously set in beginTransaction or other calls to updateTransaction. This object is allowed to be nested.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         * @param transactionid {String}
         * <p>An ID that uniquely identifies this transaction with the category.</p>
         * <p>The transaction ID is only required if more than one transaction of a given category will be simultaneously
         * active for a given user or device.</p>
         */
        endTransaction: function(category, result, properties, context, transactionid) {
            "use strict";
            Splyt.sendDataPoint('datacollector_endTransaction', [category, result, transactionid, properties], context);
        },

        /**
         * @desc
         * <p>Update a collection balance for a user.</p>
         *
         * @param name {String}
         * <p>The name of the collection.</p>
         * @param balance {Number}
         * <p>The new balance of the collection.</p>
         * @param balanceModification {Number}
         * <p>The change in balance being recorded.  For decrements use negative numbers</p>
         * @param isCurrency {Boolean}
         * <p>Whether or not this collection represents a currency in the application.</p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         */
        updateCollection: function(name, balance, balanceModification, isCurrency, context) {
            "use strict";
            Splyt.sendDataPoint('datacollector_updateCollection', [name, balance, balanceModification, isCurrency], context);
        },

        /**
         * @desc
         * <p>Writes an event.</p>
         * @param name {String}
         * <p>The name of the event.</p>
         * @param result {String}
         * <p>A string representing the result of the transaction.<p>
         * <p>You can use {@linkcode Splyt.TXN_SUCCESS} to indicate a successful event or {@linkcode Splyt.TXN_ERROR} to indicate an
         * error.</p>
         * @param properties {Object}
         * <p>A key value object that defines properties (and their values) associated with the event.  This object is
         * allowed to be nested.<p>
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         */
        beginAndEnd: function(category, result, properties, context) {
            "use strict";
            Splyt.sendDataPoint('datacollector_endTransaction', [category, result, undefined, properties], context);
        }
    },

    /**
     * <code>Splyt.Tuning</code> contains functions to retrieve and refresh the set of tuning variables values available to a user. Functions in this namespace
     * are accessible as follows:
     * <p>
     * <code>Splyt.Tuning.<em>function()</em>;</code>
     * @namespace
     * @alias Splyt.Tuning
    */
    Tuning: {
        /**
         * @desc
         * <p>Get the value of a named variable from SPLYT.</p>
         * @param {String} varName
         * <p>The name of the variable to retrieve</p>
         * @param {mixed} defaultValue
         * <p>The default value of the variable.</p>
         * @returns The value of the variable (or the default value)
         * <p><b>Note:</b> The return value is guaranteed to match the type of the defaultValue passed in.</p>
         */
        getVar: function(varName, defaultValue) {
            "use strict";

            // tell the Splyt servers that this variable was actually referenced by the application, but used reasonable throttling
            var f = function(varName) {
                if(!Splyt.usedVars[varName] || Splyt.getTimeStamp() > Splyt.usedVars[varName] + Splyt.TIME_RECORDAGAIN) {
                    Splyt.usedVars[varName] = Splyt.getTimeStamp();
                    Splyt.sendDataPoint('tuner_recordUsed', [varName, defaultValue]);
                }
            };
            f(varName);

            var result = defaultValue;
            if(Splyt.params.user.id !== null) {
                if(Splyt.userVars.hasOwnProperty(varName)) {
                    result = Splyt.userVars[varName];
                }
            } else if(Splyt.params.device.id !== null) {
                if(Splyt.deviceVars.hasOwnProperty(varName)) {
                    result = Splyt.deviceVars[varName];
                }
            }

            // Now, attempt to return the variable cast as the type of the default value passed in
            // If we can't cast it, return the default value
            SplytUtil.result = result; // settype requires the variable we're setting to be a "global"
            if (('undefined' === typeof(result)) || (false === SplytUtil.settype('result', SplytUtil.gettype(defaultValue))))
            {
                result = defaultValue;
            }
            else
            {
                // We've successfully cast the result so stuff it back into the return variable
                result = SplytUtil.result;
            }

            // Clean up the "global"
            delete SplytUtil.result;

            return result;
        },

        /**
         * @desc
         * <p>Calls the SPLYT server and retrieves the values for all variables for the currently registered user and device.
         * @param {String} context
         * <p>A single string to indicate where this hook was called from in your code.</p>
         * @param {tuningCallback} callback
         * <p>A function to call once tuning variables have been retrieved from Splyt</p>
         */
        refresh: function(context, callback) {
            "use strict";
            if(Splyt.params.chartOnly) {
                return;
            }

            var ts = Splyt.getTimeStamp();

            var obj = Splyt.xhrObj('tuner_refresh', Splyt.PERSONALIZATION, context, [ts,ts, Splyt.params.device.id, [Splyt.params.user.id]]);
            obj.success = function(ssfType) {
                var data = ssfType.data;
                if(data) {
                    if(data.hasOwnProperty('deviceTuning')) {
                        if(data.deviceTuning.hasOwnProperty('data') && SplytUtil.gettype(data.deviceTuning.data) === 'object') {
                            if(data.deviceTuning.data.hasOwnProperty('value') && SplytUtil.gettype(data.deviceTuning.data.value) === 'object') {
                                Splyt.deviceVars = data.deviceTuning.data.value;
                            }
                        }
                    }
                    if(data.hasOwnProperty('userTuning')) {
                        if(data.userTuning.hasOwnProperty('data') && SplytUtil.gettype(data.userTuning.data) === 'object') {
                            if (data.userTuning.data.hasOwnProperty('value') && SplytUtil.gettype(data.userTuning.data.value) === 'object') {
                                if (data.userTuning.data.value.hasOwnProperty(Splyt.params.user.id) && SplytUtil.gettype(data.userTuning.data.value[Splyt.params.user.id]) === 'object') {
                                    Splyt.userVars = data.userTuning.data.value[Splyt.params.user.id];
                                }
                            }
                        }
                    }
                }
                if(callback) {callback();}
            };
            obj.error = function() {
                if(callback) {callback();}
            };

            Splyt.xhr(obj);
        }
        /**
         * @callback tuningCallback
         * @desc
         * <p>The tuning callback is provided to the {@linkcode Splyt.Tuning.refresh} function.  It is invoked
         * once the process of retrieving tuning variables has concluded.
         * <p>It takes no parameters and is not expected to return any value.</p>
         */
    }
};