Splyt.Web = (function () {
    /**
     * <p>
     * Provides support for tracking common web metrics.
     * <p>
     * When you use {@linkcode Splyt.Web.startTracking} to track common web metrics, sessions will
     * be managed for you in a manner similar to many traditional web analytics services.  That is, the
     * session continues as long as the user is actively browsing to new pages.  After an amount of
     * time expires with no browsing activity, the session is ended.
     * </p>
     * <p>
     * This requires you to call {@linkcode Splyt.Web.startTracking} each time the user navigates
     * to a new page.  When you do this, you should <em>not</em> use the methods of {@linkcode Splyt.Session},
     * as the session will be managed for you.
     * </p>
     * <p>
     * You should call {@linkcode Splyt.Web.startTracking} after {@linkcode Splyt.init} has completed.
     * See the documentation for {@linkcode Splyt.Web.startTracking} for an example.
     *
     * @namespace
     * @alias Splyt.Web
     */
    var pub = {};

    // Private Members:
    // --------------------

    // Reporting

    /**
     * Determines whether a page view is in progress, and if so, reports its end to SPLYT.
     * @access private
     */
    var endPageViewIfInProgress = function() {
        // If we're coming from some previous page view and the session it was part of is not expired,
        // end it now.
        if (!splytCache.session.isExpiredOrInvalid() && splytCache.session.pageViewId && splytCache.session.pageViewInProgress) {
            Splyt.Instrumentation.endTransaction("pageView", Splyt.TXN_SUCCESS, null, null, splytCache.session.pageViewId);
            splytCache.session.pageViewInProgress = false;
            updateSplytCache();
        }
    };

    /**
     * Performs automated web session / page view reporting to SPLYT.
     * @access private
     * */
    var track = function() {
        "use strict";
        initSplytCache();
        started = true;
        if (opts.automaticPageViews) {
            pub.beginPageView();
        }
    };

    /**
     * Reports an update describing the current state of the web session to SPLYT. If there is no
     * current web session, or if it has reached its end (due to timeout/expiration or
     * implementation limits in SPLYT), then the beginning of a new session will be reported.
     *
     * @access private
     */
    var updateSession = function() {
        "use strict";
        var beginNewSession = false;

        if (splytCache.session.isExpiredOrInvalid()) {
            createSplytSession(splytCache);
        }

        if (!splytCache.session.isNew) {
            splytCache.session.sessionProgress += 1;

            if (splytCache.session.sessionProgress < 100) {
                splytCache.session.sessionPageViewCount += 1;
                Splyt.Instrumentation.updateTransaction("session", splytCache.session.sessionProgress, { "pageViewCount" : splytCache.session.sessionPageViewCount }, null, splytCache.session.sessionId);
            }
            else {
                Splyt.Instrumentation.endTransaction("session", Splyt.TXN_SUCCESS, null, null, splytCache.session.sessionId);
                createSplytSession(splytCache);
                beginNewSession = true;
            }
        }
        else {
            beginNewSession = true;
        }

        if (beginNewSession) {
            Splyt.Instrumentation.beginTransaction("session", opts.sessionTimeoutMinutes, { "pageViewCount" : splytCache.session.sessionPageViewCount }, null, splytCache.session.sessionId);

            if (opts.updateDeviceState) {
                // If no device ID is set, there will be no cached entity state. So check first.
                var cachedDeviceState = getCachedStateForCurrentEntity("device");
                if (cachedDeviceState) {
                    Splyt.Instrumentation.updateDeviceState({ "sessionCount" : cachedDeviceState.sessionCount });
                }
            }
            if (opts.updateUserState) {
                // If no device ID is set, there will be no cached entity state. So check first.
                var cachedUserState = getCachedStateForCurrentEntity("user");
                if (cachedUserState) {
                    Splyt.Instrumentation.updateUserState({ "sessionCount" : cachedUserState.sessionCount });
                }
            }
        }

        updateSplytCache();
    };

    // Session state management

    /**
     * Sets local state representing a new web session in SPLYT.
     * @access private
     */
    var createSplytSession = function() {
        "use strict";
        // Set the cache state that gets reset based on a new session
        incrementSessionCount("device");
        incrementSessionCount("user");

        // Set the device and user ID associated with this session. We check to make sure they don't change.
        // If they do, that automatically triggers a different session associated with the new device/user ID pair.
        splytCache.session.deviceid = getId("device");
        splytCache.session.userid = getId("user");

        splytCache.session.expiryTimeMs = getFutureExpiryEpoch(opts.sessionTimeoutMinutes / (24 * 60));
        // isNew gets set back to false next time the cache is saved via updateSplytCache()
        splytCache.session.isNew = true;
        splytCache.session.pageViewInProgress = false;
        splytCache.session.pageViewId = getNewTransactionId(splytCache.session.pageViewId);
        splytCache.session.pageViewProgress = 0;
        splytCache.session.sessionId = getNewTransactionId(splytCache.session.sessionId);
        splytCache.session.sessionProgress = 0;
        // New sessions always get reported as part of a pageview begin/update, so
        // start the session page view count at 1 rather than 0.
        splytCache.session.sessionPageViewCount = 1;
    };

    /**
     * Initializes {@linkcode splytCache}.
     * @access private
     */
    var initSplytCache = function() {
        "use strict";
        splytCache = null;
        var objStr = getCookie('splyt-webcache');

        // Get the previous SPLYT session, if any.
        if (objStr) {
            try {
                splytCache = JSON.parse(objStr);
            }
            catch (err) {
                // no-op
            }
        }

        // If we don't have information about the entity and their most recent session information in
        // local storage, then set up a new object.
        if (!splytCache) {
            // Only initialize those properties that are static across sessions.
            splytCache = {
                device : {},
                user : {},
                session : {}
            };
        }

        // Set the non-serializable cache object state (i.e., set up its functions).
        splytCache.session.isExpiredOrInvalid = isExpiredOrInvalid;

        if (splytCache.session.isExpiredOrInvalid()) {
            createSplytSession(splytCache);
        }

        // Doesn't call updateSplytCache because we're setting splytCache up for first use here.
    };

    /**
     * Determines whether we still have a valid, non-expired SPLYT session.
     * @access private
     * @returns {boolean} True if we have a valid, non-expired session; false otherwise.
     */
    var isExpiredOrInvalid = function() {
        "use strict";
        var expiredOrInvalid = false;

        // If the device or user ID has changed, the current session is no longer valid.
        if (this.deviceid !== getId("device")) {
            return true;
        }
        if (this.userid !== getId("user")) {
            return true;
        }

        // Will we expire in the next 5 seconds?
        //
        // Why look for at least 5 seconds from expiration?  We usually perform some operations
        // after checking expiration.  This gives us time to get that work done before the
        // true expiration hits.
        var expiryTimeMs = this.expiryTimeMs;
        return !expiryTimeMs || ( (expiryTimeMs - new Date().getTime()) < 5000 );
    };

    /**
     * Saves current state about the web session to local storage.
     * @access private
     */
    var updateSplytCache = function() {
        "use strict";
        splytCache.session.expiryTimeMs = getFutureExpiryEpoch(opts.sessionTimeoutMinutes/(24*60));
        splytCache.session.isNew = false;
        setCookie('splyt-webcache', JSON.stringify(splytCache));
    };

    // Entity state management

    /**
     * Gets the current device or user ID.
     * @access private
     * @param entityType {string} - "device" or "user".
     * @returns The current ID for the specified entity type.  If no ID is set, returns <code>null</code>.
     */
    var getId = function(entityType) {
        "use strict";

        var entityId = null;
        try { entityId = Splyt.params[entityType].id; } catch(e) { }
        return entityId;
    };

    /**
     * Gets cached state for the current device or user.
     * @access private
     * @param {string} entityType - "device" or "user".
     * @returns {object} The cached entity state for the current device or user.  If no ID is set for the specified entity type, returns <code>null</code>.
     */
    var getCachedStateForCurrentEntity = function(entityType) {
        "use strict";

        // If there's no ID set for the specified entity type, return null.
        var id = getId(entityType);
        if (!id) {
            return null;
        }

        // If no cached entity state has been established for the current ID, set initial state up now.
        if (!splytCache[entityType].hasOwnProperty(id) || !splytCache[entityType][id]) {
            splytCache[entityType][id] = { sessionCount : 0 };
        }

        // Return what we found or created.
        return splytCache[entityType][id];
    };

    /*
     * Increment the lifetime session count.
     * @access private
     * @param {string} entityType      - "device" or "user"
     * @param {number} newSessionCount - The new lifetime session count.
     */
    var incrementSessionCount = function(entityType, newSessionCount) {
        "use strict";

        // Make sure we have an ID for the entityType specified.
        // If not, there's no entity state to update, so return now.
        var entityId = getId(entityType);
        if (!entityId) {
            return;
        }

        var entityState = getCachedStateForCurrentEntity(entityType);

        // Make sure we have valid entity state and that entityState.sessionCount is a number.
        // This should always be true, but just in case..
        if (!entityState || isNaN(parseFloat(entityState.sessionCount))) {
            entityState = { sessionCount : 0 };
        }

        entityState.sessionCount = entityState.sessionCount + 1;

        // Make sure the cache tracks the update to this entity's state.
        splytCache[entityType][entityId] = entityState;
    };

    // Utility functions

    /**
     * Gets a new transaction ID
     * @access private
     * @param [currentTrxId] - The ID for the current transaction of the same category as the one for which we're
     *                         getting a new one.  This argument is optional.  If specified, the function guarantees
     *                         that the ID returned is different from the current ID.
     * @returns {string} The new transaction ID.
     */
    var getNewTransactionId = function(currentTrxId) {
        var newTrxId = new Date().getTime();
        if (newTrxId.toString() === currentTrxId) {
            newTrxId++;
        }
        return newTrxId.toString();
    };

    /**
     * Gets the unix timestamp corresponding to an offset from the current time.
     * @access private
     * @param {number} daysFromNow - An offset from the current time, expressed in days. For example,
     *                               0.1 would refer to 0.1 days from now
     *                               (i.e., 2.4 hours, or 8640 seconds).
     * @returns {number} The unix timestamp corresponding to <code>daysFromNow</code> days in the future.
     */
    var getFutureExpiryEpoch = function (daysFromNow) {
        "use strict";
        return new Date().getTime()+(daysFromNow*24*60*60*1000);
    };

    /**
     * Gets the path of the current URL.
     * @access private
     * @returns {string} The current URL path.
     */
    var getPathName = function() {
        "use strict";
        var pathname = window.location.pathname;
        // Some versions of IE may have a bug that omits the leading "/"
        return (pathname.charAt(0) == "/") ? pathname : "/" + pathname;
    };

    /**
     * Calls a function once the page reaches a ready state.  If already in a ready state,
     * the function is called immediately.
     * @access private
     * @param {function} fn - The function to call.
     */
    var ready = function(fn) {
        "use strict";
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            fn();
        }
        else {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState === 'interactive') {
                        fn();
                    }
                });
            }
        }
    };

    // Variables

    /**
     * Default options when calling {@linkcode Splyt.Web.startTracking}
     * @access private
     */
    var opts = {
        automaticPageViews : true,
        sessionTimeoutMinutes : 30,
        updateDeviceState : true,
        updateUserState : false
    };

    /** <p>
     *  Holds current state of the web session.
     *  <p>
     *  By convention, any method that mutates
     *  this object should call updateSplytCache immediately before it returns, to make
     *  sure this state is preserved across pages/browser lifetimes.
     *
     * @access private
     */
    var splytCache;

    /**
     * Has web tracking been started?
     * @access private
     * */
    var started = false;

    // Public Members:
    // --------------------

    /**
     * @desc
     * <p>Start tracking standard web navigation events with SPLYT.  You should always call this method before
     * calling any other methods of {@linkcode Splyt.Web}.
     * {@linkcode Splyt.init} must have completed successfully before calling this method.</p>
     *
     * @param [options] {Object}
     * <p>A key-value object that specifies options for web tracking. Supported properties of <code>options</code>
     * are listed below. For any of these properties that are not specified by <code>options</code>, a default value
     * will be used.  If <code>options</code> itself is <code>null</code> or <code>unspecified</code>, then
     * all of the defaults listed below will be used.
     * </p>
     * <table>
     *   <tr><th>Field</th><th>Type</th><th>Description</th><th>Default Value</th></tr>
     *   <tr>
     *       <td>automaticPageViews</td>
     *       <td>Boolean</td>
     *       <td>
     *       If <code>true</code>, a page view will automatically be reported when you call <code>startTracking</code>.
     *       Set to <code>false</code> if you want to report page views manually using {@linkcode beginPageView}.
     *       </td>
     *       <td><code>true</code></td>
     *   </tr>
     *   <tr>
     *       <td>sessionTimeoutMinutes</td>
     *       <td>Number</td>
     *       <td>
     *       The session timeout, in minutes.  If this amount of time passes without any browsing activity, the
     *       session is assumed to have timed out and ended at that point.
     *       </td>
     *       <td><code>30</code></td>
     *   </tr>
     *   <tr>
     *       <td>updateDeviceState</td>
     *       <td>Boolean</td>
     *       <td>
     *       If <code>true</code>, a <code>sessionCount</code> property with the lifetime session count will be added to device state.
     *       </td>
     *       <td><code>true</code></td>
     *   </tr>
     *   <tr>
     *       <td>updateUserState</td>
     *       <td>Boolean</td>
     *       <td>
     *       If <code>true</code>, a <code>sessionCount</code> property with the lifetime session count will be added to user state.
     *       </td>
     *       <td><code>false</code></td>
     *   </tr>
     * </table>
     *
     * @example
     *     Splyt.init({
     *       "customerId": "mycompany-myproduct-test",
     *       "user": {
     *         id: userId,
     *         properties:{
     *           gender:'male',
     *           referral:'facebook',
     *         }
     *       },
     *     }, function() {
     *       Splyt.Web.startTracking({
     *          updateDeviceState: false
     *          updateUserState: true
     *       });
     *     });
     */
    pub.startTracking = function(options) {
        "use strict";

        if (options !== undefined) {
            if (options.automaticPageViews !== undefined)    { opts.automaticPageViews    = options.automaticPageViews; }
            if (options.sessionTimeoutMinutes !== undefined) { opts.sessionTimeoutMinutes = options.sessionTimeoutMinutes; }
            if (options.updateDeviceState !== undefined)     { opts.updateDeviceState     = options.updateDeviceState; }
            if (options.updateUserState !== undefined)       { opts.updateUserState       = options.updateUserState; }
        }

        ready(track);
    };

    /** Indicates whether web tracking has been started.
     * @returns {boolean} True if web tracking has been started; otherwise, returns false.
     */
    pub.hasStarted = function() {
        return started;
    };

    /**
     * @desc
     * <p>
     * Reports the beginning of a new page view to SPLYT.  If there was a previous page view
     * in progress in the current window, its end is implicitly reported to SPLYT, as well.
     * A new or updated session is also implicitly reported to SPLYT, since SPLYT automatically
     * tracks the number of page views that occur as part of a web session.
     * <p>
     * Normally, page views will be reported to SPLYT automatically. This method is provided
     * for use with web applications where you may want to report page views manually (e.g.,
     * single-page applications).
     *
     * @param {object} [properties] - An optional key-value object that defines properties (and
     *                                their values) that describe the page view. This object is
     *                                allowed to be nested.
     */
    pub.beginPageView = function(properties) {
        "use strict";

        if (!pub.hasStarted()) {
            // Web tracking must have been started via Splyt.Web.startTracking() before calling this method.
            return;
        }

        if (!properties) {
            properties = {};
        }
        if (!properties.hasOwnProperty("path")) {
            properties.path = getPathName();
        }

        // If we previously began a page view in this window, end it before starting the next.
        endPageViewIfInProgress();

        // Update the session that the new page view is part of.
        // This extends the session's expiration and updates its page view count.
        updateSession();

        // Set up the state of a new page view
        splytCache.session.pageViewId = getNewTransactionId(splytCache.session.pageViewId);
        splytCache.session.pageViewProgress = 0;

        Splyt.Instrumentation.beginTransaction("pageView", opts.sessionTimeoutMinutes, properties, null, splytCache.session.pageViewId);
        splytCache.session.pageViewInProgress = true;

        updateSplytCache();
    };

    /**
     * Reports an update regarding the current page view to SPLYT.
     *
     * @param {object} [properties] - An optional key-value object that defines properties (and
     *                                their values) that describe the page view. This object is
     *                                allowed to be nested.
     */
    pub.updatePageView = function(properties) {
        "use strict";

        if (!pub.hasStarted()) {
            // Web tracking must have been started via Splyt.Web.startTracking() before calling this method.
            return;
        }

        // We can only update pageviews if the session is non-expired and the pageview's progress is <99%.
        if (!splytCache.session.isExpiredOrInvalid() && splytCache.session.pageViewProgress < 99) {
            // We can only update progress up to 99%
            splytCache.session.pageViewProgress += 1;
            Splyt.Instrumentation.updateTransaction("pageView", splytCache.session.pageViewProgress, properties, null, splytCache.session.pageViewId);
        }
        // Otherwise, begin a new pageview. Note that this will automatically take care of ending the
        // previous pageview or session as needed.
        else {
            pub.beginPageView(properties);
        }

        updateSplytCache();
    };

    return pub;
})();