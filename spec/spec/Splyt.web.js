/*global jasmine, after, afterEach, before, beforeEach, describe, expect, it, spy, spyOn */
/*global Splyt, Splyt_Session */

describe("Splyt.web", function() {
    'use strict';
    var cid = "a-customer-id";
    var uid = 600;
    var did = "400";

    var clock;

    beforeEach(function(){
        Splyt.params.customerId = null;
        Splyt.params.user = {};
        Splyt.params.device = {};

        //prevent actual server calls and intercept calls to send data point...
        Splyt.params.host = "http://localhost";
        spyOn(Splyt, 'xhr');
        spyOn(Splyt, 'sendDataPoint');

        clock = sinon.useFakeTimers();

        Splyt.init({'customerId':cid, 'user':uid, 'device':did});

        // Erase Splyt.Web-related cache between tests.
        localStorage.removeItem("splytWebCacheState");
    });

    afterEach(function() {
       clock.restore();
    });

    it("should have the correct API", function() {
        expect(Splyt.Web.startTracking).not.toBeUndefined();
        expect(Splyt.Web.hasStarted).not.toBeUndefined();
        expect(Splyt.Web.beginPageView).not.toBeUndefined();
        expect(Splyt.Web.updatePageView).not.toBeUndefined();
    });

    describe("entity state management", function() {
        it("should not call updateDeviceState if there is no current device ID", function() {
            Splyt.params.device.id = null;

            var spyUpdateDeviceState = spyOn(Splyt.Instrumentation, 'updateDeviceState');
            Splyt.Web.startTracking({ updateDeviceState: true });
            expect(spyUpdateDeviceState).not.toHaveBeenCalled();
        });

        it("should not call updateUserState if there is no current user ID", function() {
            Splyt.params.user.id = null;

            var spyUpdateUserState = spyOn(Splyt.Instrumentation, 'updateUserState');
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateUserState).not.toHaveBeenCalled();
        });

        it("should start a new session if the device ID changes", function() {
            // Start web tracking as device_01.
            Splyt.params.device = { id : "device_01" };
            Splyt.Web.startTracking();

            var spyBegin = spyOn(Splyt.Instrumentation, 'beginTransaction');
            var spyEnd = spyOn(Splyt.Instrumentation, 'endTransaction');

            // Start web tracking again as device_01; this would be akin to startTracking() being called when a new page is opened.
            // Since not much time has passed and the device hasn't changed, we don't expect the session to change.
            Splyt.Web.startTracking();
            expect(spyEnd).not.toHaveBeenCalledWith("session", Splyt.TXN_SUCCESS, null, null, jasmine.any(String));
            expect(spyBegin).not.toHaveBeenCalledWith("session", jasmine.any(Number), jasmine.any(Object), null, jasmine.any(String));

            // Start web tracking as a different device, device_02.
            // Since activity is occurring under a new device, we expect a new session to be reported that is tied to that device.
            Splyt.params.device = { id : "device_02" };
            Splyt.Web.startTracking();
            expect(spyBegin).toHaveBeenCalledWith("session", jasmine.any(Number), jasmine.any(Object), null, jasmine.any(String));
        });

        it("should start a new session if the user ID changes", function() {
            // Start web tracking as user_01.
            Splyt.params.user = { id : "user_01" };
            Splyt.Web.startTracking();

            var spyBegin = spyOn(Splyt.Instrumentation, 'beginTransaction');
            var spyEnd = spyOn(Splyt.Instrumentation, 'endTransaction');

            // Start web tracking again as user_01; this would be akin to startTracking() being called when a new page is opened.
            // Since not much time has passed and the user hasn't changed, we don't expect the session to change.
            Splyt.Web.startTracking();
            expect(spyEnd).not.toHaveBeenCalledWith("session", Splyt.TXN_SUCCESS, null, null, jasmine.any(String));
            expect(spyBegin).not.toHaveBeenCalledWith("session", jasmine.any(Number), jasmine.any(Object), null, jasmine.any(String));

            // Start web tracking as a different user, user_02.
            // Since activity is occurring under a new user, we expect a new session to be reported that is tied to that user.
            Splyt.params.user = { id : "user_02" };
            Splyt.Web.startTracking();
            expect(spyBegin).toHaveBeenCalledWith("session", jasmine.any(Number), jasmine.any(Object), null, jasmine.any(String));
        });

        it("should remember entity state for devices", function() {
            var spyUpdateDevice = spyOn(Splyt.Instrumentation, 'updateDeviceState');

            Splyt.params.device = { id : "device_01" };
            Splyt.Web.startTracking();
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(1); // device_01's first session
            spyUpdateDevice.reset();

            Splyt.params.device = { id : "device_02" };
            Splyt.Web.startTracking();
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(1); // device_02's first session
            spyUpdateDevice.reset();

            Splyt.params.device = { id : "device_01" };
            Splyt.Web.startTracking();
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(2); // device_01's SECOND session
        });

        it("should remember entity state for users", function() {
            var spyUpdateUser = spyOn(Splyt.Instrumentation, 'updateUserState');

            Splyt.params.user = { id : "user_01" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(1); // user_01's first session
            spyUpdateUser.reset();

            Splyt.params.user = { id : "user_02" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(1); // user_02's first session
            spyUpdateUser.reset();

            Splyt.params.user = { id : "user_01" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(2); // user_01's SECOND session
        });

        it("should track lifetime session counts for users and devices independently", function() {
            var spyUpdateDevice = spyOn(Splyt.Instrumentation, 'updateDeviceState');
            var spyUpdateUser   = spyOn(Splyt.Instrumentation, 'updateUserState');

            Splyt.params.device = { id : "device_01" };
            Splyt.params.user   = { id : "user_01" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(1); // device01's first session
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(1);   // user_01's first session
            spyUpdateDevice.reset();
            spyUpdateUser.reset();

            Splyt.params.user   = { id : "user_02" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(2); // device01's SECOND session
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(1);   // user_02's first session
            spyUpdateDevice.reset();
            spyUpdateUser.reset();

            Splyt.params.user   = { id : "user_01" };
            Splyt.Web.startTracking({ updateUserState: true });
            expect(spyUpdateDevice.argsForCall[0][0].sessionCount).toEqual(3); // device01's THIRD session
            expect(spyUpdateUser.argsForCall[0][0].sessionCount).toEqual(2);   // user_01's SECOND session
            spyUpdateDevice.reset();
            spyUpdateUser.reset();
        });
    });

    describe("startTracking()", function(){
        it("should start a session with appropriate defaults", function() {

            Splyt.init({ customerId : "myorg-myproduct-test" });

            var spy = spyOn(Splyt.Instrumentation, 'beginTransaction');

            Splyt.Web.startTracking();

            // Was a session started with the appropriate defaults?
            expect(spy.argsForCall[0][0]).toEqual(Splyt_Session.SESSION_CATEGORY); // category
            expect(spy.argsForCall[0][1]).toEqual(30);                             // default session timeout
            expect(spy.argsForCall[0][2].pageViewCount).toEqual(1);                // tracking page views per session
            expect(spy.argsForCall[0][4]).not.toBeNull();                          // trx ID is set
        });

        it("should start a page view", function() {
            var spy = spyOn(Splyt.Instrumentation, 'beginTransaction');

            Splyt.Web.startTracking();

            // Was a pageView started?
            // Note that we're checking the 2nd beginTransaction call; the 1st would have been to begin a session.
            expect(spy.argsForCall[1][0]).toEqual("pageView");                          // category
            expect(spy.argsForCall[1][1]).toEqual(30);                                  // timeout should be the same as the session
            expect(spy.argsForCall[1][2].path).toMatch(/\/.*SpecRunner.*\.html/);       // there should be a URL property
            expect(spy.argsForCall[1][4]).not.toBeNull();                               // trx ID is set
        });

        it("should end a previous pageView that occurred in the same session", function() {
            // Set a previous page view ID.  This implies a different page was being viewed previously
            // as part of the same window/session.  That page view should automatically be ended
            // before the next one begins.
            Splyt.Web.startTracking();

            var pageViewId = JSON.parse(localStorage["splytWebCacheState"]).session.pageViewId;
            var spyEndPageView = spyOn(Splyt.Instrumentation, 'endTransaction');

            Splyt.Web.startTracking();

            expect(spyEndPageView).toHaveBeenCalledWith("pageView", Splyt.TXN_SUCCESS, null, null, pageViewId);
        });

        it("should update sessions in progress with an incremented pageViewCount", function() {
            Splyt.Web.startTracking();

            var spyBeginTransaction = spyOn(Splyt.Instrumentation, 'beginTransaction');
            var spyUpdateTransaction = spyOn(Splyt.Instrumentation, 'updateTransaction');

            Splyt.Web.startTracking();

            expect(spyBeginTransaction).not.toHaveBeenCalledWith(Splyt_Session.SESSION_CATEGORY, jasmine.any(Number), jasmine.any(Object), jasmine.any(String), jasmine.any(String));
            expect(spyUpdateTransaction).toHaveBeenCalledWith(Splyt_Session.SESSION_CATEGORY, 1, { pageViewCount : 2 }, null, jasmine.any(String));
        });

        it("should end sessions that reach a maximum pageViewCount", function() {
            // Get pageViewCount to reach 100. This should force us to end the current
            // session and begin a new one.
            for (var i = 1; i <= 100; i++)
            {
                Splyt.Web.startTracking();
            }

            var spyEndTrx = spyOn(Splyt.Instrumentation, 'endTransaction');

            Splyt.Web.startTracking();

            // Was the session ended?
            // Note that we're checking the 2nd endTransaction call; the 1st would have been to end a pageview.
            expect(spyEndTrx.argsForCall[1][0]).toEqual(Splyt_Session.SESSION_CATEGORY);
            expect(spyEndTrx.argsForCall[1][1]).toEqual(Splyt.TXN_SUCCESS);
            expect(spyEndTrx.argsForCall[1][2]).toBeNull();
            expect(spyEndTrx.argsForCall[1][3]).toBeNull();
            expect(spyEndTrx.argsForCall[1][4]).not.toBeNull(); // trx ID is set
        });

        it("should track lifetime session count as part of entity state", function() {
            var spy = spyOn(Splyt.Instrumentation, 'updateDeviceState');

            Splyt.params.device.id = "123";
            Splyt.Web.startTracking();

            expect(spy).toHaveBeenCalledWith({ 'sessionCount' : 1 });
        });

        it("should increment lifetime session count", function() {
            // Start a session
            Splyt.Web.startTracking();

            // Move the clock ahead to where the session will have timed out.
            clock.tick(3600000);

            var spy = spyOn(Splyt.Instrumentation, 'updateDeviceState');

            // Start tracking again.  The previous session should have timed out, and
            // a new session should automatically be created.
            Splyt.Web.startTracking();

            expect(spy).toHaveBeenCalledWith({ 'sessionCount' : 2 });

            // We're done with our fake timer.
            clock.restore();
        });

        it("should support overriding default options", function() {
            var spyStartTracking = spyOn(Splyt.Web, 'startTracking').andCallThrough();
            var spyUpdateUserState = spyOn(Splyt.Instrumentation, 'updateUserState');
            var spyUpdateDeviceState = spyOn(Splyt.Instrumentation, 'updateDeviceState');

            // Change all the defaults.
            Splyt.Web.startTracking({
                sessionTimeoutMinutes: 100,
                updateDeviceState: false,
                updateUserState: true
            });

            // Did the options passed to startTracking() take hold?
            expect(spyStartTracking.argsForCall[0][0].sessionTimeoutMinutes).toEqual(100);
            expect(spyUpdateDeviceState).not.toHaveBeenCalled();
            expect(spyUpdateUserState).toHaveBeenCalledWith({ 'sessionCount' : 1 });
        });

        it("should extend the session expiration time", function() {
           var twiddleTimeMin = 35;

           // Track, note the session time out
           Splyt.Web.startTracking({ sessionTimeoutMinutes : twiddleTimeMin + 10});
           var originalExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

           // Twiddle our thumbs for a while
           clock.tick(twiddleTimeMin * 60 * 1000);

           // Track some more. This should extend the session time out.
           Splyt.Web.startTracking();

           var newExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

           expect(newExpiry).not.toBeLessThan(originalExpiry + (twiddleTimeMin * 60 * 1000));
       });
    });

    describe("beginPageView()", function(){
         it("should be set up to timeout in the same length of time as the session it is part of", function() {
            var timeout = 29;
            var spy = spyOn(Splyt.Instrumentation, 'beginTransaction');

            Splyt.Web.startTracking({ sessionTimeoutMinutes : timeout });

            // Sessions should have the timeout specified
            expect(spy.argsForCall[0][0]).toEqual(Splyt_Session.SESSION_CATEGORY);
            expect(spy.argsForCall[0][1]).toEqual(timeout);

            Splyt.Instrumentation.beginTransaction.reset();

            Splyt.Web.beginPageView();

            // Page views should be set to expire with the same timeout as the session (Note that elsewhere in
            // this suite, we verify that session expiration gets extended when new/updated pageviews occur).
            expect(spy.argsForCall[0][0]).toEqual("pageView");
            expect(spy.argsForCall[0][1]).toEqual(timeout);
        });

         it("should end the previous page view in progress when part of the same session", function() {
            var spyBegin = spyOn(Splyt.Instrumentation, 'beginTransaction');
            var spyEnd   = spyOn(Splyt.Instrumentation, 'endTransaction');
            Splyt.Web.startTracking();

            // Starting tracking should implicitly start a page view.  Find the transaction ID associated with that page view.
            //
            // argsForCall[0] - beginTransaction("session", ...);
            // argsForCall[1] - beginTransaction("pageView", ...);
            //
            // Find the transaction ID for the pageview that was started
            expect(spyBegin.argsForCall[1][0]).toEqual("pageView");
            var firstPageViewId = spyBegin.argsForCall[1][4];

            spyBegin.reset();

            // Start another pageview.
            Splyt.Web.beginPageView();

            // Make sure the first pageview was ended before the second one started.
            expect(spyEnd).toHaveBeenCalledWith("pageView", "success", null, null, firstPageViewId);
            expect(spyBegin.argsForCall[0][4]).not.toBeNull();
            expect(spyBegin.argsForCall[0][4]).not.toBe(firstPageViewId);
        });

         it("should not end the previous session or page view if a previously started session has expired", function() {
            // endTransaction pageview not called
            // endTransaction session not called
            // beginTransaction pageview called

            var timeoutMinutes = 30;

            // Start a session.
            Splyt.Web.startTracking({ sessionTimeoutMinutes: timeoutMinutes });

            // Let it time out.
            clock.tick((timeoutMinutes + 1) * 60 * 1000)

            var spyEnd   = spyOn(Splyt.Instrumentation, 'endTransaction');

            // Start a new pageview.
            Splyt.Web.beginPageView();

            // Since the previous session has timed out by the time the
            expect(spyEnd).not.toHaveBeenCalled();
        });

         it("should extend the session expiration time", function() {
            var twiddleTimeMin = 36;

            // Track, note the session time out
            Splyt.Web.startTracking({ sessionTimeoutMinutes : twiddleTimeMin + 10});
            var originalExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

            // Twiddle our thumbs for a while
            clock.tick(twiddleTimeMin * 60 * 1000);

            // Track some more. This should extend the session time out.
            Splyt.Web.beginPageView();

            var newExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

            expect(newExpiry).not.toBeLessThan(originalExpiry + (twiddleTimeMin * 60 * 1000));
        });

        it("should automatically begin a new session if the current session has reached 100% progress", function() {
            Splyt.Web.startTracking();

            var spyUpdate = spyOn(Splyt.Instrumentation, 'updateTransaction');

            // Enough page views to make the session reach 99% progress
            for (var i = 1; i < 100; i++) {
                Splyt.Web.beginPageView();
                expect(spyUpdate).toHaveBeenCalledWith("session", i, jasmine.any(Object), null, jasmine.any(String));
            }
            spyUpdate.reset();

            // Next pageview should result in a session end/begin -- not a session update
            var spyBegin = spyOn(Splyt.Instrumentation, 'beginTransaction');
            var spyEnd = spyOn(Splyt.Instrumentation, 'endTransaction');

            Splyt.Web.beginPageView();

            // We hit the session update limit.  Make sure that it isn't updated again, but rather that the current session
            // is ended and a new one begun.
            for (i = 0; i < spyUpdate.callCount; i++) {
                expect(spyUpdate.argsForCall[i][0]).not.toEqual("session");
            }
            expect(spyEnd).toHaveBeenCalledWith("session", Splyt.TXN_SUCCESS, null, null, jasmine.any(String));
            expect(spyBegin).toHaveBeenCalledWith("session", jasmine.any(Number), jasmine.any(Object), null, jasmine.any(String));
        });
    });

    describe("updatePageView()", function(){
         it("should increment progress on the current page view", function() {
            Splyt.Web.startTracking();

            var spy = spyOn(Splyt.Instrumentation, 'updateTransaction');

            for (var i = 1; i < 100; i++) {
                Splyt.Web.updatePageView({ myAwesomeProperty : i});
                expect(spy).toHaveBeenCalledWith("pageView", i, { myAwesomeProperty : i }, null, jasmine.any(String));
            }
        });

        it("should be treated as a new page view if the current page view has reached 100% progress", function() {
            Splyt.Web.startTracking();

            var spyUpdate = spyOn(Splyt.Instrumentation, 'updateTransaction');

            // Update to 99% progress
            for (var i = 1; i < 100; i++) {
                Splyt.Web.updatePageView({ myAwesomeProperty : i});
                expect(spyUpdate).toHaveBeenCalledWith("pageView", i, { myAwesomeProperty : i }, null, jasmine.any(String));
            }
            spyUpdate.reset();

            // Next update should result in an end/begin -- not an update
            var spyEnd = spyOn(Splyt.Instrumentation, 'endTransaction');
            var spyBegin = spyOn(Splyt.Instrumentation, 'beginTransaction');

            Splyt.Web.updatePageView({ myAwesomeProperty : 100 });

            // We hit the page view update limit.  Make sure that it isn't updated again, but rather that the current pageview
            // is ended and a new one begun.
            for (i = 0; i < spyUpdate.callCount; i++) {
                expect(spyUpdate.argsForCall[i][0]).not.toEqual("pageView");
            }
            expect(spyEnd).toHaveBeenCalledWith("pageView", Splyt.TXN_SUCCESS, null, null, jasmine.any(String));
            expect(spyBegin).toHaveBeenCalledWith("pageView", jasmine.any(Number), { myAwesomeProperty : 100, path : jasmine.any(String) }, null, jasmine.any(String));
        });

         it("should extend the session expiration time", function() {
            var twiddleTimeMin = 35;

            // Track, note the session time out
            Splyt.Web.startTracking({ sessionTimeoutMinutes : twiddleTimeMin + 10});
            var originalExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

            // Twiddle our thumbs for a while
            clock.tick(twiddleTimeMin * 60 * 1000);

            // Track some more. This should extend the session time out.
            Splyt.Web.updatePageView({ myAwesomeProperty : "myEvenMoreAwesomeValue" });

            var newExpiry = JSON.parse(localStorage.splytWebCacheState).session.expiryTimeMs;

            expect(newExpiry).not.toBeLessThan(originalExpiry + (twiddleTimeMin * 60 * 1000));
        });
    });

});