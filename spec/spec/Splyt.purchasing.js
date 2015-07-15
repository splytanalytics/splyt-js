describe("Splyt.purchasing", function() {
	var cid = "a-customer-id";
    var uid = 600;
    var did = "400";
    var result = 'complete';
    var currency = 'usd';
    var price = 0.99;
    var offer = 'anoffer';
    var item = 'item';
    var pos = 'ascreen';

    beforeEach(function(){
        Splyt.params.customerId = null;
        Splyt.params.user = {};
        Splyt.params.device = {};

		//prevent actual server calls and intercept calls to send data point...
        Splyt.params.host = "http://localhost";
        spyOn(Splyt, 'xhr');
        spyOn(Splyt.Instrumentation, 'beginAndEnd').andCallThrough();
        spyOn(Splyt, 'sendDataPoint');

        Splyt.init({'customerId':cid, 'user':uid, 'device':did});
	});

	it("should have the correct API", function() {
		expect(Splyt_Purchasing.purchase).not.toBeUndefined();
	});

	describe("purchase()", function(){
		it("calls should chain correctly", function() {
			Splyt.sendDataPoint.andCallFake(function(hook, args, context){
				expect(hook).toEqual('datacollector_endTransaction');
				expect(args[0]).toEqual(Splyt_Purchasing.PURCHASE_CATEGORY);
                expect(args[1]).toEqual(result);
                expect(args[2]).toEqual(undefined);
                var d = args[3];
                expect(d.itemName).toEqual(item);
                expect(d.pointOfSale).toEqual(pos);
                expect(d.offerId).toEqual(offer);
                expect(d.price.usd).toEqual(price);
				expect(context).toBe('tests');
			});

			Splyt_Purchasing.purchase(item, offer, pos, currency, price, result, "tests");
			expect(Splyt.Instrumentation.beginAndEnd).toHaveBeenCalledWith(Splyt_Purchasing.PURCHASE_CATEGORY, result, {
				'offerId':offer,
                'itemName':item,
                'pointOfSale':pos,
                'price':{
                    'usd':price
                },
			}, "tests");
		});
	});
});