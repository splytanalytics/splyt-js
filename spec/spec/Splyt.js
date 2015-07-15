describe("Splyt", function() {
    var cid = "a-customer-id";
    var uid = 600;
    var uprops = {'property':'value'};
    var did = "400";
    var dprops = {'prop':500};
    var props = {'prop':'erty', 'num':123};
    var category = 'category';
    var timeout = 100;
    var progress = 50;
    var transactionid = 'xxdd';
    var result = 'complete';

    beforeEach(function(){

        this.addMatchers({
            toHaveArrayElementMatching: function(matchFn) {
                // make it an array if it isn't one already
                var arr = [].concat(this.actual);

                for (var i = 0; i < arr.length; i++) {
                    if (matchFn(arr[i])) {
                        return true;
                    }
                }

                return false;
            }
        })

        Splyt.params.customerId = null;
        Splyt.params.user = {};
        Splyt.params.device = {};
        Splyt.params.host = "http://localhost";
        Splyt.params.vishost = "http://localhost";
        Splyt.userVars = {};
        Splyt.deviceVars = {};
        Splyt.usedVars = {};
        localStorage.clear();
        sessionStorage.clear();

        spyOn(Splyt, 'xhr');
    });

    it("should have invalid fields by default", function() {
        expect(Splyt.params.customerId).toEqual(null);
        expect(Splyt.params.user).toEqual({});
        expect(Splyt.params.device).toEqual({});
    });

    it("should have some default fields by default", function() {
        expect(Splyt.xhr).not.toBeNull();
        expect(Splyt.xhr).not.toBeUndefined();
        expect(Splyt.params.host).not.toBeNull();
        expect(Splyt.params.host).not.toBeUndefined();
        expect(Splyt.params.vishost).not.toBeNull();
        expect(Splyt.params.vishost).not.toBeUndefined();

        expect(Splyt.WS_VERSION).toEqual('4');
        expect(Splyt.SDK_VERSION).toEqual('4.0.6');
    });

    it("should test out html5 localStorage API", function(){
        localStorage.removeItem(Splyt.LOCAL_STORAGE_KEY);

        expect(window.localStorage).not.toBeNull();
        expect(window.localStorage).not.toBeUndefined();
        expect(localStorage[Splyt.LOCAL_STORAGE_KEY]).toBeUndefined();

        localStorage[Splyt.LOCAL_STORAGE_KEY] = did;
        expect(localStorage[Splyt.LOCAL_STORAGE_KEY]).toEqual(did);

        localStorage.removeItem(Splyt.LOCAL_STORAGE_KEY);
        expect(localStorage[Splyt.LOCAL_STORAGE_KEY]).toBeUndefined();
    });

    it("should ensure that 'undefined' serializes to null for optional txn ids", function(){
        var undefinedInJson = JSON.stringify([undefined]);
        expect(undefinedInJson).toEqual("[null]");
        var backToJSON = JSON.parse(undefinedInJson);
        expect(backToJSON).toEqual([null]);
        expect(backToJSON[0]).toBeNull();
    });

    describe("init()", function() {
        it("should throw an error if no params are passed to init()", function() {
            expect(function(){
                Splyt.init()
            }).toThrow(Splyt.ERROR_ARGUMENT);
        });

        it("should throw an error if a non-object is passed to init()", function() {
            expect(function(){
                Splyt.init("THIS IS NOT AN OBJECT")
            }).toThrow(Splyt.ERROR_ARGUMENT);
        });

        it("should throw an error if customer id is not supplied on init", function() {
            expect(function(){
                Splyt.init({})
            }).toThrow(Splyt.ERROR_CID);
        });

        it("should throw an error if an empty string is supplied as the customer id on init", function() {
            expect(function(){
                Splyt.init({'customerId':""});
            }).toThrow(Splyt.ERROR_CID);
        });

        it("should have the customer id set if it supplied", function() {
            Splyt.init({'customerId':cid});
            expect(Splyt.params.customerId).toEqual(cid);
        });

        it("should use a default user and device if one is not specified", function() {
            Splyt.init({'customerId':cid});
            expect(Splyt.params.user.id).toBeNull();
            expect(Splyt.params.user.properties).toEqual({});
            expect(Splyt.params.device.id).toBeNull();
        });

        it("should check local storage for a device id", function(){
            localStorage[Splyt.LOCAL_STORAGE_KEY] = did;
            Splyt.init({'customerId':cid});
            expect(Splyt.params.device.id).toEqual(did);
            localStorage.removeItem[Splyt.LOCAL_STORAGE_KEY];
        });

        it('should throw an error if an object is used for user and the object has no .id field', function(){
            expect(function(){
                Splyt.init({
                    'customerId':cid,
                    'user':{noidfield:"blarg"},
                });
            }).toThrow(Splyt.ERROR_ARGUMENT);
        });

        it('should throw an error if an object is used for device and the object has no .id field', function(){
            expect(function(){
                Splyt.init({
                    'customerId':cid,
                    'device':{noidfield:"blarg"},
                });
            }).toThrow(Splyt.ERROR_ARGUMENT);
        });

        it('should allow non-objects that represent user and device ids be used', function() {
            Splyt.init({
                'customerId':cid,
                'device':'stringDeviceId',
                'user':1234
            });
            expect(Splyt.params.device.id).toEqual("stringDeviceId");
            expect(Splyt.params.user.id).toEqual(1234);
            expect(Splyt.params.user.properties).toEqual({});
        });

        it('should use a default user and device if an object is not used', function(){
            Splyt.init({
                'customerId':cid,
                'device':"THIS IS NOT AN OBJECT",
                'user':"THIS IS NOT AN OBJECT"
            });
        });

        it("should copy the supplied user and device if one is supplied, and init correctly", function() {
            Splyt.init({
                'customerId':cid,
                'user':{
                    'id':uid,
                    'properties':uprops
                },
                'device':{
                    'id':did,
                    'properties':dprops
                }
            });
            expect(Splyt.params.customerId).toEqual(cid);
            expect(Splyt.params.user.id).toEqual(uid);
            expect(Splyt.params.user.properties).toEqual(uprops);
            expect(Splyt.params.device.id).toEqual(did);
            expect(Splyt.params.device.properties).toEqual(dprops);
        });

        it("should not throw an error if i use object notation to init entitties rowshambow/isos#797", function(){
            expect(function(){
                Splyt.init({
                    "customerId": cid,
                    "user": {
                        id:uid,
                    },
                    "device": {
                        id:did,
                    }
                });
            }).not.toThrow("Cannot set property 'browser' of undefined");
            expect(Splyt.params.customerId).toEqual(cid);
            expect(Splyt.params.user.id).toEqual(uid);
            expect(Splyt.params.user.properties).toEqual({});
            expect(Splyt.params.device.id).toEqual(did);
            expect(Splyt.params.device.properties).not.toBeUndefined();
            expect(Splyt.params.device.properties).not.toBeNull();
        });

        it("should throw an error if object notation is used for a user, properties are set, but it is not an object rowshambow/isos#797", function(){
            expect(function(){
                Splyt.init({
                    "customerId":cid,
                    "user": {
                        id:uid,
                        properties:"notanobject"
                    }
                });
            }).toThrow(Splyt.TXN_ARGUMENTS);
        });

        it("should throw an error if object notation is used for a device, properties are set, but it is not an object rowshambow/isos#797", function(){
            expect(function(){
                Splyt.init({
                    "customerId":cid,
                    "device": {
                        id:uid,
                        properties:"notanobject"
                    }
                });
            }).toThrow(Splyt.TXN_ARGUMENTS);
        });

        it('should save the api key if one if provided', function(){
            delete Splyt.params.apikey;
            Splyt.init({
                "customerId":cid,
                "apikey":"anapikey"
            });
            expect(Splyt.params.apikey).toEqual("anapikey");
        });

        it("should not save the api key if it is not a string or an empty string", function(){
            delete Splyt.params.apikey;
            Splyt.init({
                "customerId":cid,
                "apikey":""
            });
            expect(Splyt.params.apikey).toBeUndefined();

            Splyt.init({
                "customerId":cid,
                "apikey":500
            });
            expect(Splyt.params.apikey).toBeUndefined();
        });

        it("should scrape for device properties if they are available (platform.js)", function(){
            //when running under phantomjs, platform.js doesn't detect an os version on mac...
            if(!platform.os.version) {
                platform.os.version = 5;
            }

            Splyt.xhr.andCallFake(function(xhr){
                var data = JSON.parse(xhr.data);
                var deviceprops = data[5];

                expect(deviceprops['browser']).not.toBeUndefined();
                expect(deviceprops['browser']).toEqual(Splyt.params.device.properties['browser']);
                expect(deviceprops['browser']).toEqual(platform.name);

                expect(deviceprops['browserversion']).not.toBeUndefined();
                expect(deviceprops['browserversion']).toEqual(Splyt.params.device.properties['browserversion']);
                expect(deviceprops['browserversion']).toEqual(platform.version);

                expect(deviceprops['osname']).not.toBeUndefined();
                expect(deviceprops['osname']).toEqual(Splyt.params.device.properties['osname']);
                expect(deviceprops['osname']).toEqual(platform.os.family);

                expect(deviceprops['osversion']).not.toBeUndefined();
                expect(deviceprops['osversion']).toEqual(Splyt.params.device.properties['osversion']);
                expect(deviceprops['osversion']).toEqual(platform.os.version);

                expect(deviceprops['description']).not.toBeUndefined();
                expect(deviceprops['description']).toEqual(Splyt.params.device.properties['description']);
                expect(deviceprops['description']).toEqual(platform.description);

                expect(deviceprops['language']).not.toBeUndefined();
                expect(deviceprops['language']).toEqual(Splyt.params.device.properties['language']);
                expect(deviceprops['language']).toEqual(navigator.language.toLowerCase());
            });

            Splyt.init({'customerId':cid});

            expect(Splyt.params.device.properties['browser']).not.toBeUndefined();
            expect(Splyt.params.device.properties['browserversion']).not.toBeUndefined();
            expect(Splyt.params.device.properties['osname']).not.toBeUndefined();
            expect(Splyt.params.device.properties['osversion']).not.toBeUndefined();
            expect(Splyt.params.device.properties['description']).not.toBeUndefined();
            expect(Splyt.params.device.properties['language']).not.toBeUndefined();
        });

        it("should not scrape for device properties if they are not available", function(){
            //since the spec runner include the thing we need to simulate it not being
            //included...like this...
            var temp_platform = platform;
            platform = null;
            var temp_navigator = navigator;
            navigator = null;

            Splyt.xhr.andCallFake(function(xhr){
                var data = JSON.parse(xhr.data);
                var deviceprops = data[5];
                expect(deviceprops).toEqual({});
            });

            Splyt.init({'customerId':cid});
            expect(Splyt.params.device.properties).toEqual({});

            //now put everything back...
            platform = temp_platform;
            navigator = temp_navigator;
        });

        it("should not scrape for device properties if the 'scrape' parameter is false", function(){
            Splyt.xhr.andCallFake(function(xhr){
                var data = JSON.parse(xhr.data);
                var deviceprops = data[5];
                expect(deviceprops).toEqual({});
            });

            Splyt.init({'customerId':cid, 'scrape':false});
        });

        describe("the application init flow", function() {
            var callback = jasmine.createSpy("callback");

            beforeEach(function(){
                callback.reset();
            })

            it("should behave correctly when no ids are provided", function() {
                Splyt.xhr.andCallFake(function(xhr){
                    expect(xhr.type).toEqual("POST");
                    expect(xhr.url).toEqual(Splyt.buildURL('application_init_with_entitystate_telem', 'isos-personalization', 'tests'));

                    expect(xhr.data).not.toBeUndefined();
                    var data = JSON.parse(xhr.data);
                    expect(data.length).toEqual(6);
                    expect(data[0]).toEqual(data[1]);
                    expect(data[2]).toBeNull();
                    expect(data[3]).toBeNull();
                    expect(data[4]).toEqual({});

                    //simulate success and server response...
                    xhr.success({
                        data:{
                            deviceid:did,
                            devicenew:false,
                            devicetuning:Array(),
                            userid:null,
                            usernew:false,
                            usertuning:null,
                        }
                    });

                    expect(Splyt.params.device.id).toEqual(did);
                    expect(Splyt.params.user.id).toBeNull();

                    expect(callback).toHaveBeenCalled();
                    expect(callback.calls.length).toEqual(1);
                });

                Splyt.init({'customerId':cid}, callback, "tests");
                expect(Splyt.xhr).toHaveBeenCalled();
                expect(Splyt.xhr.calls.length).toEqual(1);
            });

            it("should behave correctly when both a user and device ids are specified", function(){
                Splyt.xhr.andCallFake(function(xhr){
                    expect(xhr.type).toEqual("POST");
                    expect(xhr.url).toEqual(Splyt.buildURL('application_init_with_entitystate_telem', 'isos-personalization', 'tests'));

                    expect(xhr.data).not.toBeUndefined();
                    var data = JSON.parse(xhr.data);
                    expect(data.length).toEqual(6);
                    expect(data[0]).toEqual(data[1]);
                    expect(data[2]).toEqual(uid);
                    expect(data[3]).toEqual(did);
                    expect(data[4]).toEqual(uprops);
                    expect(data[5]).toEqual(dprops);

                    //simulate success and server response...
                    xhr.success({
                        data:{
                            deviceid:did,
                            devicenew:false,
                            devicetuning:Array(),
                            userid:uid,
                            usernew:false,
                            usertuning:Array(),
                        }
                    });

                    expect(Splyt.params.device.id).toEqual(did);
                    expect(Splyt.params.user.id).toEqual(uid);

                    expect(callback).toHaveBeenCalled();
                    expect(callback.calls.length).toEqual(1);

                    expect(Splyt.params.chartOnly).toBeFalsy();
                });

                Splyt.init({
                    'customerId':cid,
                    'user':{
                        'id':uid,
                        'properties':uprops
                    },
                    'device':{
                        'id':did,
                        'properties':dprops
                    }
                }, callback, "tests");

                expect(Splyt.xhr).toHaveBeenCalled();
                expect(Splyt.xhr.calls.length).toEqual(1);
            });

            it("should behave correctly on malformed server data", function() {
                Splyt.xhr.andCallFake(function(xhr){
                    expect(xhr.type).toEqual("POST");
                    expect(xhr.url).toEqual(Splyt.buildURL('application_init_with_entitystate_telem', 'isos-personalization', 'tests'));

                    xhr.success({});

                    expect(Splyt.params.device.id).toBeNull();
                    expect(Splyt.params.user.id).toBeNull();

                    expect(callback).not.toHaveBeenCalled();
                });

                Splyt.init({'customerId':cid}, callback, "tests");
                expect(Splyt.xhr).toHaveBeenCalled();
                expect(Splyt.xhr.calls.length).toEqual(1);
            });

            it("should behave correctly on network error", function() {
                Splyt.xhr.andCallFake(function(xhr){
                    expect(xhr.type).toEqual("POST");
                    expect(xhr.url).toEqual(Splyt.buildURL('application_init_with_entitystate_telem', 'isos-personalization', 'tests'));

                    xhr.error();

                    expect(Splyt.params.device.id).toEqual(null);

                    expect(callback).toHaveBeenCalled();
                    expect(callback.calls.length).toEqual(1);
                });

                Splyt.init({'customerId':cid}, callback, "tests");
                expect(Splyt.xhr).toHaveBeenCalled();
                expect(Splyt.xhr.calls.length).toEqual(1);
            });

            it("should not init if chartOnly is true", function(){
                Splyt.xhr.andCallFake(function(xhr){
                    expect(false).toBeTruthy();
                });

                Splyt.init({'customerId':cid, 'chartOnly':true});
                expect(Splyt.xhr).not.toHaveBeenCalled();
                expect(Splyt.params.chartOnly).toBeTruthy();
            });
        });

        describe("optimizations", function() {

            var appInitCallMatcher = function(actual) {
                return typeof actual === 'object' && actual.hasOwnProperty("url") && actual.url.match(/application_init_with_entitystate_telem/);
            };

            beforeEach(function () {
                // Replace the xhr spy set up at an outer scope; perhaps the suggests we should
                // split this out into its own test suite.
                Splyt.xhr.isSpy = false;
                spyOn(Splyt, 'xhr');
                Splyt.xhr.andCallFake(function(xhr){
                    //simulate success and server response...
                    if (xhr && xhr.success) {
                        xhr.success({ data:{} });
                    }
                });
            });

            afterEach(function() {
                Splyt.xhr.isSpy = false;
            });

            it("should not call application_init*, updateUserState, or updateDeviceState if the params haven't changed", function() {
                var spyUpdateUser = spyOn(Splyt.Instrumentation, 'updateUserState');
                var spyUpdateDevice = spyOn(Splyt.Instrumentation, 'updateDeviceState');

                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                // First time:
                // * application_init_with_entitystate_telem called.
                // * update{User|Device}State NOT called, as this is handled by application_init_with_entitystate_telem.
                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).not.toHaveBeenCalled();
                expect(spyUpdateDevice).not.toHaveBeenCalled();

                Splyt.xhr.reset();
                spyUpdateUser.reset();
                spyUpdateDevice.reset();

                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                // Second time:
                // * application_init_with_entitystate_telem NOT called -- params to Splyt.Init are no different
                // * update{User|Device}State NOT called -- entity state passed to Splyt.Init is no different.
                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).not.toHaveBeenCalled();
                expect(spyUpdateDevice).not.toHaveBeenCalled();
            });

            it("should call updateUserState if the user properties passed to init have changed", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                var spyUpdateUser = spyOn(Splyt.Instrumentation, 'updateUserState');
                var spyUpdateDevice = spyOn(Splyt.Instrumentation, 'updateDeviceState');

                // Call again, with different user properties
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: { a : "different property!!!"} },
                    device: { id: did, properties: dprops }
                });

                // Second time:
                // * application_init_with_entitystate_telem NOT called -- params to Splyt.Init have not changed sufficiently
                // * updateUserState called       -- entity state passed to Splyt.Init has changed.
                // * updateDeviceState NOT called -- entity state passed to Splyt.Init is no different.
                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).toHaveBeenCalled();
                expect(spyUpdateDevice).not.toHaveBeenCalled();
            });

            it("should call updateDeviceState if the device properties passed to init have changed", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                var spyUpdateUser = spyOn(Splyt.Instrumentation, 'updateUserState');
                var spyUpdateDevice = spyOn(Splyt.Instrumentation, 'updateDeviceState');

                // Call again, with different device properties
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: { a : "different property!!!"} }
                });

                // * application_init_with_entitystate_telem NOT called -- params to Splyt.Init have not changed sufficiently
                // * updateUserState NOT called -- entity state passed to Splyt.Init is no different.
                // * updateDeviceState called   -- entity state passed to Splyt.Init has changed.
                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).not.toHaveBeenCalled();
                expect(spyUpdateDevice).toHaveBeenCalled();
            });

            it("should do a full init if the browser's session state has been cleared", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                // Clear session storage -- this would happen when the browser or current tab is closed.
                sessionStorage.clear();

                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
            });

            it("should do a full init if the customerId has changed", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                Splyt.init({
                    customerId: "neworg-newco-test",
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                // Expect full app init, since we have a new customer ID
                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
            });

            it("should do a full init if the user ID has changed", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                Splyt.init({
                    customerId: cid,
                    user: { id: "uid-changed", properties: uprops },
                    device: { id: did, properties: dprops }
                });

                // Expect full app init, since we have a new user ID
                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
            });

            it("should do a full init if the device ID has changed", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.xhr.reset();

                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: "did-changed", properties: dprops }
                });

                // Expect full app init, since we have a new device ID
                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
            });

            it("should do a full init if registerUser is called", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                Splyt.registerUser({ id: "a-new-user", properties: uprops });

                Splyt.xhr.reset();

                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                // Expect full app init, since we registered a different user ID between inits
                expect(Splyt.xhr.argsForCall[0]).toHaveArrayElementMatching(appInitCallMatcher);
            });

            it("should call updateUserState if user properties from first init changed before second init call", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: { prop1 : 'value1', prop2 : 'value2' } }
                });

                Splyt.xhr.reset();

                Splyt.Instrumentation.updateUserState({ prop1 : 'value1', prop2 : 'newValue' });

                var spyUpdateUser    = spyOn(Splyt.Instrumentation, 'updateUserState').andCallThrough();
                var spyUpdateDevice  = spyOn(Splyt.Instrumentation, 'updateDeviceState').andCallThrough();

                // Call again. Same properties as first init, BUT we updated one of those user properties in between.
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: { prop1 : 'value1', prop2 : 'value2' } },
                });

                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).toHaveBeenCalled();
                expect(spyUpdateDevice).not.toHaveBeenCalled();
            });

            it("should call updateDeviceState if device properties from first init changed before second init call", function() {
                Splyt.init({
                    customerId: cid,
                    device: { id: did, properties: { prop1 : 'value1', prop2 : 'value2' } }
                });

                Splyt.xhr.reset();

                Splyt.Instrumentation.updateDeviceState({ prop1 : 'value1', prop2 : 'newValue' });

                var spyUpdateUser    = spyOn(Splyt.Instrumentation, 'updateUserState').andCallThrough();
                var spyUpdateDevice  = spyOn(Splyt.Instrumentation, 'updateDeviceState').andCallThrough();

                // Call again. Same properties as first init, BUT we updated one of those device properties in between.
                Splyt.init({
                    customerId: cid,
                    device: { id: did, properties: { prop1 : 'value1', prop2 : 'value2' } },
                });

                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).not.toHaveBeenCalled();
                expect(spyUpdateDevice).toHaveBeenCalled();
            });

            it("should NOT call update{User|Device}State if entity state properties found in the first init did not change before second init call, even if other properties did change", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: { prop1 : 'value1', prop2 : 'value2' } },
                    device: { id: did, properties: { prop1 : 1, prop2 : 2 } }
                });

                Splyt.xhr.reset();

                Splyt.Instrumentation.updateUserState({ someOtherProperty: 'whatever' });
                Splyt.Instrumentation.updateDeviceState({ yetAnotherProperty: 'what-eva' });

                var spyUpdateUser    = spyOn(Splyt.Instrumentation, 'updateUserState').andCallThrough();
                var spyUpdateDevice  = spyOn(Splyt.Instrumentation, 'updateDeviceState').andCallThrough();

                // Call again. Same properties as first init.  We updated some properties in between... but none of these.
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: { prop1 : 'value1', prop2 : 'value2' } },
                    device: { id: did, properties: { prop1 : 1, prop2 : 2 } }
                });

                expect(Splyt.xhr.argsForCall[0]).not.toHaveArrayElementMatching(appInitCallMatcher);
                expect(spyUpdateUser).not.toHaveBeenCalled();
                expect(spyUpdateDevice).not.toHaveBeenCalled();
            });

            it("should invoke the init callback even if a full application_init* was not necessary", function() {
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                });

                var callback = jasmine.createSpy("callback");

                // Should not generate a full application_init, since we're in the same browser session and nothing's
                // changed since the previous init (this is verified in other tests).
                Splyt.init({
                    customerId: cid,
                    user: { id: uid, properties: uprops },
                    device: { id: did, properties: dprops }
                }, callback);

                // Even though there's no full application_init, the callback provided to Splyt.init should be called.
                expect(callback).toHaveBeenCalled();
            });
        });
    });

    describe("clearActiveUser", function(){
        it("should work as expected", function() {
            Splyt.init({'customerId':cid, 'user':uid});
            expect(Splyt.params.user.id).toEqual(uid);
            Splyt.clearActiveUser();
            expect(Splyt.params.user.id).toBeNull();
        });
    });

    describe("registerUser", function(){
        var newuser = "newuser";
        it("should register a new user and get the new tuners", function() {
            Splyt.init({'customerId':cid, 'user':uid, 'device':did});

            Splyt.xhr.andCallFake(function(xhr){
                expect(xhr.type).toEqual("POST");
                expect(xhr.url).toEqual(Splyt.buildURL('application_updateuser', 'isos-personalization', 'tests'));
                expect(xhr.data).not.toBeUndefined();
                var data = JSON.parse(xhr.data);
                expect(data.length).toEqual(5);
                expect(data[0]).toEqual(data[1]);
                expect(data[2]).toEqual(newuser);
                expect(data[3]).toEqual(did);
                expect(data[4]).toEqual({});

                //simulate success and server response...
                xhr.success({
                    data:{
                        deviceid:did,
                        devicetuning:Array(),
                        userid:newuser,
                        usertuning:Array(),
                    }
                });

                expect(Splyt.params.device.id).toEqual(did);
                expect(Splyt.params.user.id).toEqual(newuser);
            });

            Splyt.registerUser(newuser, "tests");
            expect(Splyt.xhr).toHaveBeenCalled();
        });

        it("should add an empty properties if object notation is used and properties are not specified rowshambow/isos#797", function(){
            Splyt.registerUser({id:uid});
            expect(Splyt.params.user.id).toEqual(uid);
            expect(Splyt.params.user.properties).toEqual({});
        });

        it("should throw an error if object notation is used, properties are set, but it is not an object rowshambow/isos#797", function(){
            expect(function(){
                Splyt.registerUser({id:uid, properties:"notanobject"});
            }).toThrow(Splyt.TXN_ARGUMENTS);
        });

        it("should do nothing if 'chartOnly' is set", function(){
            Splyt.init({'customerId':cid, 'chartOnly':true});

            Splyt.xhr.andCallFake(function(xhr){
                expect(true).toBeFalsy();
            });

            Splyt.registerUser(newuser, "tests");
            expect(Splyt.xhr).not.toHaveBeenCalled();
        });
    });

    describe("getQueryParms()", function() {
        it("should return empty string if called with no customer id set", function() {
            expect(Splyt.getQueryParms(Splyt.TOOLS)).toEqual("");
            expect(Splyt.getQueryParms(Splyt.PERSONALIZATION)).toEqual("");
        });

        it("should return a predictable string with no api key set", function() {
            Splyt.params.customerId = cid;

            var qs = Splyt.getQueryParms(Splyt.TOOLS);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.TOOLS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION);

            var qs = Splyt.getQueryParms(Splyt.PERSONALIZATION);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.WS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION);
        });

        it("should return a predictable string an api key set", function() {
            Splyt.params.customerId = cid;
            Splyt.params.apikey = "anapikey";

            var qs = Splyt.getQueryParms(Splyt.TOOLS);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.TOOLS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION+"&ssf_api_key=anapikey");

            var qs = Splyt.getQueryParms(Splyt.PERSONALIZATION);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.WS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION);
        });

        it("should append a context if one is supplied", function() {
            Splyt.params.customerId = cid;
            Splyt.params.apikey = "anapikey";

            var context = "anystring";
            var qs = Splyt.getQueryParms(Splyt.TOOLS, context);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.TOOLS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION+"&ssf_api_key=anapikey&ssf_sdk_contextname="+context);

            var qs = Splyt.getQueryParms(Splyt.PERSONALIZATION, context);
            expect(qs).toEqual("?ssf_ws_version="+Splyt.WS_VERSION+"&ssf_cust_id="+cid+"&ssf_output=json&ssf_sdk=js&ssf_sdk_version="+Splyt.SDK_VERSION+"&ssf_sdk_contextname="+context);
        });
    });

    describe("getTimeStamp()", function(){
        it("needs to be tested, can't mock Date", function(){
        });
    });

    describe("buildURL()", function(){
        it("should build the expected url", function(){
            var orig = Splyt.params.host;

            var targetURL = Splyt.params.host + "/isos-personalization/ws/interface/test" + Splyt.getQueryParms(Splyt.PERSONALIZATION, "context");

            expect(Splyt.buildURL("test", "isos-personalization", "context")).toEqual(targetURL);
            expect(Splyt.buildURL("test/", "isos-personalization", "context")).toEqual(targetURL);
            expect(Splyt.buildURL("/test", "isos-personalization", "context")).toEqual(targetURL);

            Splyt.params.host = "host";
            var targetURL = "host/isos-personalization/ws/interface/test" + Splyt.getQueryParms(Splyt.PERSONALIZATION, "context");
            expect(Splyt.buildURL("test", "isos-personalization", "context")).toEqual(targetURL);
            Splyt.params.host = "host/";
            expect(Splyt.buildURL("test", "isos-personalization", "context")).toEqual(targetURL);

            Splyt.params.host = orig;
        });
    });

    describe("xhrObj()", function(){
        it("should build te expected object", function(){
            var xhrobj = Splyt.xhrObj("api", "service", "context", {data:'field'}, "json");
            expect(xhrobj.type).toEqual("POST");
            expect(xhrobj.url).toEqual(Splyt.buildURL("api", "service", "context"));
            expect(xhrobj.data).toEqual(JSON.stringify({data:'field'}));
            expect(xhrobj.dataType).toEqual("json");
            expect(xhrobj.processData).toBeFalsy();
            expect(xhrobj.headers).toEqual({ 'ssf-use-positional-post-params':'true', 'ssf-contents-not-url-encoded':'true' });
        });

        it("shoudl respect the passed in data type", function(){
            var xhrobj = Splyt.xhrObj("api", "service", "context", {data:'field'}, "notjson");
            expect(xhrobj.dataType).toEqual("notjson");
        });
    });

    describe("sendDataPoint()", function(){
        var hook = "someHook";
        var args = [];

        beforeEach(function(){
            Splyt.init({'customerId':cid, 'user':uid, 'device':did});
            Splyt.xhr.reset();
        });

        it('should create the data point correctly', function(){
            Splyt.xhr.andCallFake(function(xhr){
                expect(xhr.type).toEqual("POST");
                expect(xhr.processData).toEqual(false);
                expect(xhr.headers).toEqual({
                    'ssf-use-positional-post-params':'true',
                    'ssf-contents-not-url-encoded':'true'
                });
                expect(xhr.url).toEqual(Splyt.buildURL(hook, "isos-personalization", "tests"));

                var data = JSON.parse(xhr.data);
                expect(data[0]).toEqual(data[1]); //timestamps, at least should be equal
                expect(data[2]).toEqual(uid);
                expect(data[3]).toEqual(did);
                for(var i=0; i<args.length; i++) {
                    expect(data[4+i]).toEqual(args[i]);
                }
            });

            Splyt.sendDataPoint(hook, [], "tests");
            expect(Splyt.xhr).toHaveBeenCalled();
            expect(Splyt.xhr.calls.length).toEqual(1);
        });

        it('should handle context and actual args', function() {
            var context = "Splyt.Spec";
            Splyt.xhr.andCallFake(function(xhr){
                expect(xhr.type).toEqual("POST");
                expect(xhr.processData).toEqual(false);
                expect(xhr.headers).toEqual({
                    'ssf-use-positional-post-params':'true',
                    'ssf-contents-not-url-encoded':'true'
                });
                expect(xhr.url).toEqual(Splyt.buildURL(hook, "isos-personalization", context));

                var data = JSON.parse(xhr.data);
                expect(data[0]).toEqual(data[1]);
                expect(data[2]).toEqual(uid);
                expect(data[3]).toEqual(did);
                for(var i=0; i<args.length; i++) {
                    expect(data[3+i]).toEqual(args[i]);
                }
            });

            Splyt.sendDataPoint(hook, ['arg1', 4564], context);
            expect(Splyt.xhr).toHaveBeenCalled();
            expect(Splyt.xhr.calls.length).toEqual(1);
        });

        it("should do nothing if 'chartOnly' is set", function(){
            var prev = Splyt.params.chartOnly;
            Splyt.params.chartOnly = true;
            {
                Splyt.xhr.andCallFake(function(xhr){
                    expect(true).toBeFalsy();
                });

                Splyt.sendDataPoint(hook, ['arg1', 4564]);
                expect(Splyt.xhr).not.toHaveBeenCalled();
            }
            Splyt.params.chartOnly = prev;
        });
    });

    describe("Splyt.Instrumentation", function() {
        beforeEach(function(){
            spyOn(Splyt, 'sendDataPoint');
            Splyt.init({'customerId':cid, 'user':uid, 'device':did});
        });

        it("should have the correct API", function() {
            expect(Splyt.Instrumentation.updateUserState).not.toBeUndefined();
            expect(Splyt.Instrumentation.updateDeviceState).not.toBeUndefined();
            expect(Splyt.Instrumentation.beginTransaction).not.toBeUndefined();
            expect(Splyt.Instrumentation.updateTransaction).not.toBeUndefined();
            expect(Splyt.Instrumentation.endTransaction).not.toBeUndefined();
            expect(Splyt.Instrumentation.updateCollection).not.toBeUndefined();
            expect(Splyt.Instrumentation.beginAndEnd).not.toBeUndefined();
        });

        describe("updateUserState()", function(){
            it("should call sendDataPoint as expected", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_updateUserState');
                    expect(args).toEqual([props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.updateUserState(props, "tests");
            });
        });

        describe("updateDeviceState()", function(){
            it("should call sendDataPoint as expected", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_updateDeviceState');
                    expect(args).toEqual([props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.updateDeviceState(props, "tests");
            });
        });

        describe("beginTransaction()", function(){
            it("should call sendDataPoint as expected with a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_beginTransaction');
                    expect(args).toEqual([category, Splyt.TIMEOUT_MODE_TRANSACTION, timeout, transactionid, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.beginTransaction(category, timeout, props, "tests", transactionid);
            });

            it("should call sendDataPoint as expected without a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_beginTransaction');
                    expect(args).toEqual([category, Splyt.TIMEOUT_MODE_TRANSACTION, timeout, undefined, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.beginTransaction(category, timeout, props, "tests");
            });
        });

        describe("updateTransaction()", function(){
            it("should call sendDataPoint as expected with a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_updateTransaction');
                    expect(args).toEqual([category, progress, transactionid, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.updateTransaction(category, progress, props, "tests", transactionid);
            });

            it("should call sendDataPoint as expected without a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_updateTransaction');
                    expect(args).toEqual([category, progress, undefined, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.updateTransaction(category, progress, props, "tests");
            });
        });

        describe("endTransaction()", function(){
            it("should call sendDataPoint as expected with a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_endTransaction');
                    expect(args).toEqual([category, result, transactionid, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.endTransaction(category, result, props, "tests", transactionid);
            });

            it("should call sendDataPoint as expected without a txn id", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('datacollector_endTransaction');
                    expect(args).toEqual([category, result, undefined, props]);
                    expect(context).toBe('tests');
                });

                Splyt.Instrumentation.endTransaction(category, result, props, "tests");
            });
        });

        describe("updateCollection()", function(){
            var name = 'collection';
            var balance = 500;
            var mod = 5;

            it("should call sendDataPoint as expected", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual("datacollector_updateCollection");
                    expect(args).toEqual([name, balance, mod, true]);
                    expect(context).toEqual("tests");
                });

                Splyt.Instrumentation.updateCollection(name, balance, mod, true, "tests");
            });
        });

        describe("beginAndEnd()", function(){
            it("should call sendDataPoint as expected", function() {
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual("datacollector_endTransaction");
                    expect(args).toEqual([category, result, undefined, props]);
                    expect(context).toEqual("tests");
                });

                Splyt.Instrumentation.beginAndEnd(category, result, props, "tests");
            });
        });
    });

    describe("Splyt.Tuning", function() {
        var tuning = {var1:10, var2:"string"};
        var defaults = {'var1':20, 'var2':"default"};

        beforeEach(function(){
            spyOn(Splyt, 'sendDataPoint');
        });

        it("shoud have the proper API", function(){
            expect(Splyt.Tuning.getVar).not.toBeUndefined();
            expect(Splyt.Tuning.refresh).not.toBeUndefined();
        });

        describe("the init flow", function(){
            it("should not have vars after a successful init if there are none", function() {
                Splyt.xhr.andCallFake(function(xhr){
                    xhr.success({data:{}});

                    //the success call shoudl set these vars...
                    expect(Splyt.userVars).toEqual({});
                    expect(Splyt.deviceVars).toEqual({});
                });

                Splyt.init({'customerId':cid, 'user':uid, 'device':did});
            });

            it("should have vars after a successful init if there are vars", function() {
                Splyt.xhr.andCallFake(function(xhr){
                    xhr.success({
                        data:{
                            devicetuning: tuning,
                            usertuning: tuning
                        }
                    });

                    //the success call should set these vars...
                    expect(Splyt.userVars).toEqual(tuning);
                    expect(Splyt.deviceVars).toEqual(tuning);
                });

                Splyt.init({'customerId':cid, 'user':uid, 'device':did});
            });
        });

        describe("getVar() and refresh()", function(){
            it("should return the var correctly when both a user id and device id are specified", function(){
                Splyt.sendDataPoint.andCallFake(function(hook, args, context){
                    expect(hook).toEqual('tuner_recordUsed');
                    expect(args.length).toEqual(2);
                    expect(tuning.hasOwnProperty(args[0])).toBeTruthy();
                    expect(args[1]).toEqual(defaults[args[0]]);
                });

                expect(Splyt.Tuning.getVar('var1', defaults.var1)).toEqual(defaults.var1);
                expect(Splyt.Tuning.getVar('var2', defaults.var2)).toEqual(defaults.var2);

                Splyt.xhr.andCallFake(function(xhr){
                    xhr.success({
                        data:{
                            devicetuning: tuning,
                            usertuning: tuning
                        }
                    });
                });

                Splyt.init({'customerId':cid, 'user':uid, 'device':did});

                expect(Splyt.Tuning.getVar('var1', defaults.var1)).toEqual(tuning.var1);
                expect(Splyt.Tuning.getVar('var2', defaults.var2)).toEqual(tuning.var2);

                var newVar1 = 1000;
                var newVar2 = "NEW-VAR2";
                Splyt.xhr.andCallFake(function(xhr){
                    expect(xhr.type).toEqual('POST');
                    expect(xhr.url).toEqual(Splyt.buildURL('tuner_refresh', "isos-personalization", 'tests'));
                    expect(xhr.processData).toBeFalsy();
                    var data = JSON.parse(xhr.data);
                    expect(data.length).toEqual(4);
                    expect(data[0]).toEqual(data[1]);
                    expect(data[2]).toEqual(did);
                    expect(data[3]).toEqual([uid]);

                    var successData = {
                        data: {
                            deviceTuning: {
                                data: {
                                    value: {
                                        'var1':newVar1,
                                        'var2':newVar2
                                    }
                                }
                            },
                            userTuning: {
                                data: {
                                    value:{}
                                }
                            }
                        }
                    }
                    successData.data.userTuning.data.value[uid] = {
                        'var1':newVar1,
                        'var2':newVar2
                    };

                    xhr.success(successData);
                });

                Splyt.Tuning.refresh("tests");
                expect(Splyt.Tuning.getVar('var1', defaults.var1)).toEqual(newVar1);
                expect(Splyt.Tuning.getVar('var2', defaults.var2)).toEqual(newVar2);
            });
        });
    });
});