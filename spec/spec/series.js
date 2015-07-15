describe('series', function(){
	var labels = ['label1','label2','label3', 'label4', 'label5'];
	var captions = ['cap1','cap2','cap3', 'cap4', 'cap5'];
	var series = {'series1':[0,1,2,3,4],'series2':[5,6,7,8,9]};
	var transpose = 'series1';

	var seriesObj = new Series({
		errorCode:0, 
		data:{labels:labels,captions:captions,series:series,transpose:transpose}
	});

	it('should contruct correctly', function(){
		expect(seriesObj.error).toEqual(0);
		expect(seriesObj.labels).toEqual(labels);
		expect(seriesObj.captions).toEqual(captions);
		expect(seriesObj.series).toEqual(series);
		expect(seriesObj.transpose).toEqual(transpose);
	});

	describe("series::getFirstSeries()", function(){
		it("should return the first series", function(){
			expect(seriesObj.getFirstSeries()).toEqual(series['series1']);
		});
	});

	describe("series::getElementsWithIndices", function(){
		it("should return values as specified by the given indicies", function(){
			var elements = seriesObj.getElementsWithIndices(["zero","one","two"], [1,1,2]);
			expect(elements).toEqual(["one","one","two"]);
		});
	});

	describe("series::getValuesColumn()", function(){
		it("should retrieve the values column correctly by choosing the first non transpose column", function(){
			expect(seriesObj.getValuesColumn()).toEqual([5,6,7,8,9]);

			seriesObj.transpose = 'series2';
			expect(seriesObj.getValuesColumn()).toEqual([0,1,2,3,4]);
		});
	});

	describe("series::getUnique()", function(){
		it("should get unique values", function() {
			var uniq = seriesObj.getUnique([0,0,1,1,2,2,3,3]);
			expect(uniq).toEqual([0,1,2,3]);
		});
	});

	describe("series::getUniqueFirstIndices()", function(){
		var uniq = seriesObj.getUniqueFirstIndices(['one', 'one', 'two', 'three', 'three']);
		expect(uniq).toEqual([0,2,3]);
	});

	describe("series::applyTransforms()", function(){
		it("~should have tests~", function(){

		});
	});

	describe("series::tiedSort()", function(){
		it("should perform a natural sort", function(){
			var obj = seriesObj.tiedSort(['label5','label3','label2', 'label1', 'label4'], "naturalSort");

			expect(obj).toBe(seriesObj);

			expect(obj.labels).toEqual(['label4','label3','label2', 'label5', 'label1']);
			expect(obj.captions).toEqual(['cap4','cap3','cap2', 'cap5', 'cap1']);
			expect(obj.series).toEqual({'series1':[3,2,1,4,0],'series2':[8,7,6,9,5]});
		});
	});
});