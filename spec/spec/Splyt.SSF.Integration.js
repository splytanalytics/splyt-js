xdescribe("Splyt.SSF.Integration", function() {
    var cid = "a-customer-prod";
    var uid = 600;
    var newid = "newid";
    var did = "400";
    var props = {'prop1':456, 'prop2':'prop'};
    var category = "category";
    var timeout = 86400;

    beforeEach(function(){
        spyOn(Splyt, 'xhr').andCallFake(function(xhr) {
            var success = function(ssfType) {
                expect(ssfType.error).toEqual(0);
                expect(ssfType.description).toEqual("");

                if(/.*application_init*/.test(xhr.url)) {
                    expect(ssfType.data.deviceid).toEqual(did);
                    expect(ssfType.data.devicetuning).not.toBeUndefined();
                    expect(ssfType.data.userid).toEqual(newid);
                    expect(ssfType.data.usertuning).not.toBeUndefined();
                }
                else if(/.*application_updateuser*/.test(xhr.url)) {
                    expect(ssfType.data.deviceid).toEqual(did);
                    expect(ssfType.data.devicenew).not.toBeUndefined();
                    expect(ssfType.data.devicetuning).not.toBeUndefined();
                    expect(ssfType.data.userid).toEqual(uid);
                    expect(ssfType.data.usernew).not.toBeUndefined();
                    expect(ssfType.data.usertuning).not.toBeUndefined();   
                }
                else if(/.*datacollector_updateUserState*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_updateUserState.data).toBeNull();
                    expect(ssfType.data.datacollector_updateUserState.error).toEqual(0);
                    expect(ssfType.data.datacollector_updateUserState.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_updateDeviceState*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_updateDeviceState.data).toBeNull();
                    expect(ssfType.data.datacollector_updateDeviceState.error).toEqual(0);
                    expect(ssfType.data.datacollector_updateDeviceState.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_beginTransaction*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_beginTransaction.data).toBeNull();
                    expect(ssfType.data.datacollector_beginTransaction.error).toEqual(0);
                    expect(ssfType.data.datacollector_beginTransaction.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_beginTransaction*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_beginTransaction.data).toBeNull();
                    expect(ssfType.data.datacollector_beginTransaction.error).toEqual(0);
                    expect(ssfType.data.datacollector_beginTransaction.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_updateTransaction*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_updateTransaction.data).toBeNull();
                    expect(ssfType.data.datacollector_updateTransaction.error).toEqual(0);
                    expect(ssfType.data.datacollector_updateTransaction.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_endTransaction*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_endTransaction.data).toBeNull();
                    expect(ssfType.data.datacollector_endTransaction.error).toEqual(0);
                    expect(ssfType.data.datacollector_endTransaction.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*datacollector_updateCollection*/.test(xhr.url)) {
                    expect(ssfType.data.datacollector_updateCollection.data).toBeNull();
                    expect(ssfType.data.datacollector_updateCollection.error).toEqual(0);
                    expect(ssfType.data.datacollector_updateCollection.description).toEqual("(Success)");
                    expect(ssfType.data.gdb.data).toBeNull();
                    expect(ssfType.data.gdb.error).toEqual(0);
                    expect(ssfType.data.gdb.description).toEqual("(Success)");
                }
                else if(/.*tuner_recordUsed*/.test(xhr.url)) {
                    expect(ssfType.data).toBeNull();
                    expect(ssfType.data).toEqual(0);
                    expect(ssfType.data).toEqual("(Success)");
                } else if(/.*tuner_refresh*/.test(xhr.url)) {
                    expect(ssfType.error).toEqual(0);
                    expect(ssfType.description).toEqual("");
                    expect(ssfType.data.deviceTuning.error).toEqual(0);
                    expect(ssfType.data.deviceTuning.description).toEqual("");
                    expect(ssfType.data.deviceTuning.data.status).toEqual("OK");
                    expect(ssfType.data.deviceTuning.data.type).toEqual("DEVICE");
                    //expect(ssfType.data.deviceTuning.data.value).toEqual(???);
                    expect(ssfType.data.userTuning.error).toEqual(0);
                    expect(ssfType.data.userTuning.description).toEqual("");
                    expect(ssfType.data.userTuning.data.status).toEqual("OK");
                    expect(ssfType.data.userTuning.data.type).toEqual("USER");
                    expect(ssfType.data.userTuning.data.value[uid]).not.toBeUndefined();
                }
            };
            var error = function(ssfType) {
                expect("this should not be called").toBeUndefined();
            };

            xhr.success = success;
            xhr.error = error;

            spyOn(xhr, 'success').andCallThrough();
            spyOn(xhr, 'error').andCallThrough();

            $.ajax(xhr);
        });

        Splyt.params.host = "http://localhost";
        localStorage.removeItem(Splyt.LOCAL_STORAGE_KEY);
    });

    it("run integration tests", function(){
        Splyt.init({'customerId':cid, 'user':uid, 'device':did});
        Splyt.Instrumentation.updateUserState(props);
        Splyt.Instrumentation.updateDeviceState(props);
        Splyt.Instrumentation.beginTransaction(category, timeout, props);
        Splyt.Instrumentation.updateTransaction();
        Splyt.Instrumentation.endTransaction();
        Splyt.Instrumentation.updateCollection();
        Splyt.Instrumentation.beginAndEnd();
        Splyt.Tuning.getVar('var1', "string");
        Splyt.Tuning.refresh();

        Splyt.registerUser(newid);
    });
});