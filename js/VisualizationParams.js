function VisualizationFormatParams() {
	'use strict';
	this.mRenderType = null;
	this.mCaptionFormat = null;
	this.mYAxisType = null;
	this.mYAxisFormat = null;
	this.mXAxisFormat = null;
	this.mLegendVisible = null;
	this.mLegendFormat = null;
};

function VisualizationParams () {
	'use strict';
	this.mLegacyParams = {};
	this.mTitle = null;
	this.mSubTitle = null;
	this.mHeight = 229;
	this.mHideBorder = false;
	this.mLegendPosition = null;
	this.mMarkerSymbol = null;

	this.mFormatParams = new VisualizationFormatParams();
	this.mFormatParams.mRenderType = 'line';
	this.mFormatParams.mCaptionFormat = 'int';
	this.mFormatParams.mYAxisType = 'linear';
	this.mFormatParams.mYAxisFormat = 'int';
	this.mFormatParams.mXAxisFormat = 'int';
	this.mFormatParams.mLegendVisible = false;
	this.mFormatParams.mLegendFormat = null;
};

VisualizationParams.prototype.setLegacyParam = function(_key, _value) {
	'use strict';
	this.mLegacyParams[_key] = _value;
};

VisualizationParams.prototype.getLegacyParam = function(_key) {
	'use strict';
	return this.mLegacyParams[_key] || undefined;
};
