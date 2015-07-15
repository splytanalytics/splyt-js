describe("Splyt.session", function() {
	var cid = "a-customer-id";
    var uid = 600;
    var did = "400";
    var progress = 50;
    var timeout = 86400;
    var result = "success";

    beforeEach(function(){
        Splyt.params.customerId = null;
        Splyt.params.user = {};
        Splyt.params.device = {};

		//prevent actual server calls and intercept calls to send data point...
        Splyt.params.host = "http://localhost";
        spyOn(Splyt, 'xhr');
        spyOn(Splyt.Instrumentation, 'beginTransaction').andCallThrough();
        spyOn(Splyt.Instrumentation, 'endTransaction').andCallThrough();
        spyOn(Splyt, 'sendDataPoint');

        Splyt.init({'customerId':cid, 'user':uid, 'device':did});
	});

	it("should have the correct API", function() {
		expect(Splyt_Session.begin).not.toBeUndefined();
		expect(Splyt_Session.end).not.toBeUndefined();
	});

	describe("begin()", function() {
		it("calls should chain correctly", function() {
			Splyt.sendDataPoint.andCallFake(function(hook, args, context){
				expect(hook).toEqual('datacollector_beginTransaction');
				expect(args).toEqual([Splyt_Session.SESSION_CATEGORY, Splyt.TIMEOUT_MODE_ANY, timeout, undefined, {}]);
				expect(context).toBe('tests');
			});

			Splyt_Session.begin(timeout, 'tests');
			expect(Splyt.Instrumentation.beginTransaction).not.toHaveBeenCalled();
		});
	});

	describe("end()", function() {
		it("calls shoudl chain correctly", function() {
			Splyt.sendDataPoint.andCallFake(function(hook, args, context){
				expect(hook).toEqual('datacollector_endTransaction');
				expect(args).toEqual([Splyt_Session.SESSION_CATEGORY, result, undefined, {}]);
				expect(context).toBe('tests');
			});

			Splyt_Session.end(result, 'tests');
			expect(Splyt.Instrumentation.endTransaction).toHaveBeenCalledWith(Splyt_Session.SESSION_CATEGORY, result, {}, "tests");
		});
	});
});