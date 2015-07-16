/* Copyright 2015 Knetik, Inc. */

 /**
 * <code>Splyt.Session</code> contains functions used to mark the beginning and ending of
 * sessions.  Functions in this namespace are accessible as follows:
 * <p>
 * <code>&nbsp;&nbsp;&nbsp;Splyt.Session.<em>function()</em>;</code>
 * <p>
 *
 * @namespace
 * @alias Splyt.Session
 */
var Splyt_Session = {
    /**
     * @constant
     */
    SESSION_CATEGORY: "session",
    /**
     * @desc
     * <p>Marks the beginning of a new session of activity for a given user/device.
     * This should be called as early in the flow of the program as possible.</p>
     * @param {String} context
     * <p>A single string to indicate where this hook was called from in your code.</p>
     */
    begin: function(timeout, context) {
        "use strict";
        //use the lower-level API since we aren't ready to expose timeout mode, but we do want sessions to be MODE_ANY
        //Splyt.Instrumentation.beginTransaction(Splyt_Session.SESSION_CATEGORY, timeout, {});
        Splyt.sendDataPoint("datacollector_beginTransaction", [Splyt_Session.SESSION_CATEGORY, Splyt.TIMEOUT_MODE_ANY, timeout, undefined, {}], context);
    },

    /**
     * @desc
     * <p>Marks the end of a session of activity for a given user/device.  This
     * call is not explicitly required.</p>
     * @param {String} context
     * <p>A single string to indicate where this hook was called from in your code.</p>
     */
    end: function(result, context) {
        "use strict";
        Splyt.Instrumentation.endTransaction(Splyt_Session.SESSION_CATEGORY, result, {}, context);
    }
};
Splyt.Session = Splyt_Session;