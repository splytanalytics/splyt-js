function Visualization () {
	'use strict';
}

Visualization.prototype.destroy = function(){
	'use strict';
};

Visualization.prototype.create = function(visualizationType, div, xAxisType, params) {
	'use strict';

	if(visualizationType !== 'highchart') {
		throw "Only Highcharts is currently supported!";
	}

	return new HighchartsWrapper(div, xAxisType, params);
};