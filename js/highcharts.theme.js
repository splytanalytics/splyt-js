var chartDarkColor = '#f5f5f5';
var chartLineColor = '#7f818d';
var chartAxisColor = '#7f818d';
var chartTitleColor = '#444859';
var chartSubtitleColor = '#8b8d97';
Highcharts.theme = {
	chart: {
		zoomType: "xy",
		backgroundColor: chartDarkColor,
		/*backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
			stops: [
				[0, 'rgb(79, 81, 86)'],
				[.07, 'rgb(79, 81, 86)'],
				[.07, 'rgb(79, 81, 86)'],
				[.085, chartDarkColor],
				[.085, chartDarkColor],
				[1, chartDarkColor]
			]
		},*/
		borderColor: '#e3e3e3',
		borderWidth: 1,
		borderRadius: 5,//15,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth: 0

	},
	credits: {
		enabled: false
	},
	xAxis: {
		lineColor: chartLineColor,
		tickColor: chartLineColor,
		lineWidth: 1,
		labels: {
			style: {color: chartAxisColor},
			rotation: -45,
			align: 'right'
		},
		id: 'xaxis'
	},
	yAxis: {
		lineColor: chartLineColor,
		tickColor: chartLineColor,
		title:{text:""},
		lineWidth: 1,
		gridLineWidth: 0,
		min: 0,
		id: 'yaxis',
		labels: {
			style: {color: chartAxisColor}
		}
	},
	plotOptions: {
		series: {
			pointPadding: 0.05,
			groupPadding: 0.05,
			borderWidth:0,
			shadow:false
		}
	},
	loading: {
		hideDuration: 1000,
		showDuration: 100,
		labelStyle: {
			color: chartTitleColor,
			top: '35%'
		},
		style: {
			backgroundColor: chartDarkColor
		}
	},
	title: {
		align: 'center',
		style: {
			color: chartTitleColor,
			fontSize: '14px',
			fontfamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			fontWeight: '600'
		}
	},
	subtitle: {
		align: 'center',
		style: {
			color: chartSubtitleColor,
			fontfamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
		}
	},
	colors: [
		'#ffbf40', // orange
		'#395ea3', // blue
		'#4f9566', // green
		'#9c1d1d', // red
		'#8bbc21',
		'#910000',
		'#1aadce',
		'#492970',
		'#f28f43',
		'#77a1e5',
		'#c42525',
		'#a6c96a'
	],
	plotline: {
		color: "#a6a6a6",
		dashStyle: "ShortDashDot",
		width: 3,
		label: {
			rotation: 270,
			verticalAlign: 'bottom',
			textAlign: 'left',
			y: -5,
			x: 12,
			style: {color: chartTitleColor}
		},
		zIndex: 99
	},
	goalLine: {
		color: "#a6a6a6",
		dashStyle:'shortdash',
		label: {style: {color: chartTitleColor}},
		width: 2,
		zIndex: 99
	},
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);