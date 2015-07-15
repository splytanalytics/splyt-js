describe("VisualizationParams", function(){
	it('should initialize correctly', function(){
		var vp = new VisualizationParams();
		expect(vp.mFormatParams).toBeDefined();
		expect(vp.mFormatParams.mRenderType).toBe('line');
		expect(vp.mFormatParams.mCaptionFormat).toEqual('int');
		expect(vp.mFormatParams.mYAxisFormat).toEqual('int');
		expect(vp.mFormatParams.mXAxisFormat).toEqual('int');
		expect(vp.mFormatParams.mYAxisType).toEqual('linear');

		expect(vp.mLegacyParams).toEqual({});
		expect(vp.mTitle).toBeNull();
		expect(vp.mSubTitle).toBeNull();
		expect(vp.mHeight).toEqual(229);
		expect(vp.mHideBorder).toBeFalsy();
	});

	describe("VisualizationParams::get/setLegacyParam", function(){
		it('should return the param if it was supplied', function() {
			var pk = 'height';
			var pv = 400;
			var vp = new VisualizationParams();
			
			vp.setLegacyParam(pk, pv);
			expect(vp.mLegacyParams[pk]).toBeDefined();
			expect(vp.mLegacyParams[pk]).toEqual(pv);
			expect(vp.getLegacyParam(pk)).toEqual(pv);	
		});

		it('should return undefined if it was not', function() {
			var vp = new VisualizationParams();

			expect(vp.getLegacyParam('height')).not.toBeNull();
			expect(vp.getLegacyParam('height')).toBeUndefined();
		});
	});
});