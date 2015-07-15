describe("isosvisutil", function() {
	var format = {'cap1':'goats'};
	var labels = ['label1', 'label2', '45', 'label3', 'label4'];
	var captions = ['cap1', 'cap2', 'cap3', 'cap4', null];
	var epochDay = 16100;
	var epochDayString = 'Jan 30';

	describe("LabelIndex", function(){
		it('should find the index of a given label', function(){
			expect(LabelIndex(labels, 'label2')).toEqual(1);
		});

		it('should not find the index of a label that does not exist', function(){
			expect(LabelIndex(labels, 'notthere')).toEqual(-1);
		});

		it('should find the index of a given label if the label is numeric', function(){
			expect(LabelIndex(labels, 45)).toEqual(2);
		});
	});

	describe("IsosVisAxisLabelKVFormatter", function(){
		it('it should return the captions associated with the label', function(){
			expect(IsosVisAxisLabelKVFormatter('label2', undefined, labels, captions)).toEqual('cap2');
		});

		it('it should return a value from the format object if it exists', function(){
			expect(IsosVisAxisLabelKVFormatter('label1', format, labels, captions)).toEqual('goats');
		});

		it('it should return the raw label if no caption is found', function(){
			expect(IsosVisAxisLabelKVFormatter('notthere', undefined, labels, captions)).toEqual('notthere');
			expect(IsosVisAxisLabelKVFormatter('notthere', format, labels, captions)).toEqual('notthere');
		});
	});

	describe("IsosVisAxisLabelFormatter", function(){
		it('should return empty string is no raw is passed', function() {
			expect(IsosVisAxisLabelFormatter("", format, labels, captions)).toEqual("");
		});

		it('should defer to IsosVisAxisLabelKVFormatter if format in an object', function() {
			spyOn(window, 'IsosVisAxisLabelKVFormatter').andCallThrough();
			expect(IsosVisAxisLabelFormatter('label1', format, labels, captions)).toEqual("goats");
			expect(IsosVisAxisLabelKVFormatter).toHaveBeenCalled();
		});

		describe("epochday", function(){
			it('should handle a string or integer', function(){
				spyOn(Highcharts, "dateFormat").andCallThrough();

				var formatted = IsosVisAxisLabelFormatter(String(epochDay), 'epochday');
				expect(formatted).toEqual(epochDayString);
				expect(Highcharts.dateFormat).toHaveBeenCalledWith("%b %e",epochDay*1000*24*60*60);
				
				formatted = IsosVisAxisLabelFormatter(epochDay, 'epochday');
				expect(formatted).toEqual(epochDayString);
				expect(Highcharts.dateFormat).toHaveBeenCalledWith("%b %e",epochDay*1000*24*60*60);
			});
		});

		describe("epochtime", function(){	
			it('should handle a string or integer', function(){
				spyOn(Highcharts, "dateFormat").andCallThrough();

				var formatted = IsosVisAxisLabelFormatter(String(epochDay*1000*24*60*60), 'epochtime');
				expect(formatted).toEqual(epochDayString);
				expect(Highcharts.dateFormat).toHaveBeenCalledWith("%b %e",epochDay*1000*24*60*60);

				formatted = IsosVisAxisLabelFormatter(epochDay*1000*24*60*60, 'epochtime');
				expect(formatted).toEqual(epochDayString);
				expect(Highcharts.dateFormat).toHaveBeenCalledWith("%b %e",epochDay*1000*24*60*60);
			});
		});

		describe("use-caption", function(){
			it('should handle when a label index is found', function(){
				expect(IsosVisAxisLabelFormatter('label1', 'use-caption', labels, captions)).toEqual('cap1');
			});

			it('should return the string "undefined" when a label index is not found', function(){
				expect(IsosVisAxisLabelFormatter('notthere', 'use-caption', labels, captions)).toEqual('undefined');
			});

			it('should return the string "unspecified" when a caption is null', function() {
				expect(IsosVisAxisLabelFormatter('label4', 'use-caption', labels, captions)).toEqual('unspecified');
			});
		});

		describe("use-index", function(){
			it('should return the index of a label as a string', function(){
				expect(IsosVisAxisLabelFormatter('label1', 'use-index', labels, captions)).toEqual('0');
				expect(IsosVisAxisLabelFormatter('notthere', 'use-index', labels, captions)).toEqual('-1');
			});
		});

		describe("none", function(){
			it('should return the string "undefined"', function(){
				expect(IsosVisAxisLabelFormatter('label1', 'none', labels, captions)).toEqual('undefined');
			});
		});

		describe("use-label and default", function(){
			it('should return the string "unspecified" if null or single-space string is provided', function(){
				expect(IsosVisAxisLabelFormatter(null, 'use-label')).toEqual('unspecified');
				expect(IsosVisAxisLabelFormatter(" ", 'use-label')).toEqual('unspecified');
			});

			it('should truncate long strings', function(){
				expect(IsosVisAxisLabelFormatter("A string longer than 12 characters", 'use-label')).toEqual('A string lon...');
			});

			it('otherwise it should just return the label as a string', function(){
				expect(IsosVisAxisLabelFormatter("label1", 'use-label')).toEqual('label1');
				expect(IsosVisAxisLabelFormatter(5, 'use-label')).toEqual('5');
			});
		});
	});

	describe('IsosVisDataPointLabelFormatter', function(){
		it('should handle pie charts correctly', function(){
			var x = 'ios';
			var y = 169107;
			var ttformat = "use-caption";
			var labels = ['ios','kindle','android'];
			var captions = labels;
			var yformat = undefined;
			var seriesName = "values";
			var legendFormat = undefined;
			var pct = 40.567253456732;

			expect(IsosVisDataPointLabelFormatter(x,y,ttformat,labels,captions,yformat,seriesName,legendFormat, pct)).toEqual("<b>ios: </b>169,107 (40.57%)");
		});
	});
});











