describe("Visualization", function(){
	var VIS = new Visualization();

	beforeEach(function(){
		HighchartsWrapper = jasmine.createSpy('HighchartsWrapper', []);
	});

	describe("Visualization::create()", function(){
		it('should create the correct type of chart', function(){
			
			var column = VIS.create('highchart', 'div', 'category', {'type':'column'});
			expect(column.constructor.identity).toEqual('HighchartsWrapper');
			expect(HighchartsWrapper).toHaveBeenCalled();
			expect(HighchartsWrapper.mostRecentCall.args[0]).toEqual('div');
			expect(HighchartsWrapper.mostRecentCall.args[1]).toEqual('category');
			expect(HighchartsWrapper.mostRecentCall.args[2]).toEqual({'type':'column'});
			HighchartsWrapper.reset();

			var box = VIS.create('highchart', 'div', 'category', {'type':'box_plot'});
			expect(box.constructor.identity).toEqual('HighchartsWrapper');
			expect(HighchartsWrapper).toHaveBeenCalled();
			expect(HighchartsWrapper.mostRecentCall.args[0]).toEqual('div');
			expect(HighchartsWrapper.mostRecentCall.args[1]).toEqual('category');
			expect(HighchartsWrapper.mostRecentCall.args[2]).toEqual({'type':'box_plot'});
			HighchartsWrapper.reset();

			var overtime = VIS.create('highchart', 'div', 'datetime', {});
			expect(overtime.constructor.identity).toEqual('HighchartsWrapper');
			expect(HighchartsWrapper).toHaveBeenCalled();
			expect(HighchartsWrapper.mostRecentCall.args[0]).toEqual('div');
			expect(HighchartsWrapper.mostRecentCall.args[1]).toEqual('datetime');
			expect(HighchartsWrapper.mostRecentCall.args[2]).toEqual({});
			HighchartsWrapper.reset();
		});

		it('should throw an exception if highcharts si not used', function() {
			expect( function(){ 
				VIS.create('d3.js', 'div', 'dendrogram', {});
			}).toThrow();
		});
	});
});