HighchartsWrapper.prototype = new isos_vis();
HighchartsWrapper.prototype.constructor=HighchartsWrapper;

function HighchartsWrapper(div, xAxisType, params) {
    this.tooltipFormatter = function() {
        var x,labels,captions,yformat,ypct;
        var y = this.y;
        var ttformat = this.series.chart.userOptions.tooltip.userFormat;
        var seriesName = this.series.name;
        var legendFormat = this.series.chart.userOptions.legend.userFormat;

        if(this.series.type == "pie") {
            x = this.key;
            labels = captions = _.pluck(this.series.userOptions.data,'name');
            yformat = undefined;
            ypct = this.percentage;
        } else {
            x = this.x;
            labels = this.series.xAxis.userOptions.userLabels;
            captions = this.series.xAxis.userOptions.userCaptions;
            yformat = this.series.yAxis.userOptions.userFormat;
            ypct = undefined;
        }

        return IsosVisDataPointLabelFormatter(x,y,ttformat,labels,captions,yformat,seriesName,legendFormat,ypct);
    };

    this.xAxisFormatter = function() {
        return IsosVisAxisLabelFormatter(this.value, this.axis.userOptions.userFormat, this.axis.userOptions.userLabels, this.axis.userOptions.userCaptions);
    };

    this.yAxisFormatter = function() {
        if(this.axis.userOptions.userFormat === 'pct') {
            return this.value+'%';
        } else {
            return Highcharts.Axis.prototype.defaultLabelFormatter.call(this);
        }
    };

    this.legendFormatter = function() {
        var chart = this.series ? this.series.chart : this.chart;
        if(chart.userOptions.legend.userFormat !== null) {
            return IsosVisAxisLabelFormatter(this.name, chart.userOptions.legend.userFormat, chart.get('xaxis').userOptions.userLabels, chart.get('xaxis').userOptions.userCaptions);
        } else {
            return this.name;
        }
    };

    this.computeYAxisMin = function(type) {
        if(type === "logarithmic") {
            return 1;
        } else {
            if(this.mChart && this.mChart.series.length > 0) {
                var seriesMin = _.min(_.pluck(this.mChart.series,'dataMin'));
                var visualMin = _.min([0, seriesMin]);
                return visualMin;
            } else {
                return 0;
            }
        }
    };

    this.mChart = new Highcharts.Chart(this.buildOptions(div, xAxisType, params));
};

HighchartsWrapper.prototype.changeBaseAggregateType = function(type, params) {
    var options = this.buildOptions(this.mChart.userOptions.chart.div, type, params);
    this.mChart.get('xaxis').update(options.xAxis, true);
};

HighchartsWrapper.prototype.format = function(params) {
    var redraw = false;
    if(params.mRenderType || params.mLegendVisible !== null) {
        var update = {};
        if(params.mRenderType) {update.type = params.mRenderType;}
        if(params.mLegendVisible !== null) {update.showInLegend = params.mLegendVisible;}

        for(var i=0; i<this.mChart.series.length; i++) {
            this.mChart.series[i].update(update, false);
        }

        if(params.mRenderType === 'pie') {
            this.mChart.get('yaxis').update({lineWidth:0});
            this.mChart.get('xaxis').update({lineWidth:0});
        } else {
            this.mChart.get('yaxis').update({lineWidth:Highcharts.theme.yAxis.lineWidth});
            this.mChart.get('xaxis').update({lineWidth:Highcharts.theme.xAxis.lineWidth});
        }

        this.mChart.userOptions.legend.userVisibility = params.mLegendVisible;
        redraw = true;
    }

    if(params.mYAxisType) {
        this.mChart.get('yaxis').update({type:params.mYAxisType,min:this.computeYAxisMin(params.mYAxisType)});
        redraw = true;
    }

    if(params.mYAxisFormat) {
        this.mChart.get('yaxis').update({userFormat:params.mYAxisFormat});
        redraw = true;
    }

    if(params.mXAxisFormat) {
        this.mChart.get('xaxis').update({userFormat:params.mXAxisFormat});
        redraw = true;
    }

    if(params.mCaptionFormat) {
        this.mChart.userOptions.tooltip.userFormat = params.mCaptionFormat;
        redraw = false;
    } else if(params.mXAxisFormat){
        this.mChart.userOptions.tooltip.userFormat = params.mXAxisFormat;
        redraw = false;
    }

    if(params.mLegendFormat) {
        this.mChart.userOptions.legend.userFormat = params.mLegendFormat;
        redraw = false;
    }

    if(redraw) {
        this.mChart.redraw();
    }
};

HighchartsWrapper.prototype.buildOptions = function(div, xAxisType, params) {
    var height = params.mHeight;
    var enablezoom = params.getLegacyParam('enablezoom');
    var linecolor = params.getLegacyParam('linecolor');
    var linewidth = params.getLegacyParam('linewidth');
    var markerson = params.getLegacyParam('markerson');
    var xaxison = params.getLegacyParam('xaxison');
    var yaxison = params.getLegacyParam('yaxison');

    var formatParams = params.mFormatParams;

    var options = {};
    options.chart = {};
    options.chart.renderTo = div;
    options.chart.height = height;
    options.chart.events = {};
    options.chart.ignoreHiddenSeries = (xAxisType === 'datetime');
    if(params.mHideBorder) {options.chart.borderWidth = 0;}
    if(enablezoom && enablezoom === 'false') {options.chart.zoomType = '';}
    options.chart.type = formatParams.mRenderType;

    options.xAxis = {};
    options.xAxis.userFormat = formatParams.mXAxisFormat;
    options.xAxis.id = 'xaxis';
    options.xAxis.labels = {};
    options.xAxis.labels.formatter = this.xAxisFormatter;
    options.xAxis.type = xAxisType;
    options.xAxis.minRange = (xAxisType === 'datetime' && 86400000) || undefined;
    options.xAxis.minTickInterval = (xAxisType === 'datetime' && 86400000) || undefined;

    options.yAxis = {};
    options.yAxis.userFormat = formatParams.mYAxisFormat;
    options.yAxis.type = formatParams.mYAxisType || "linear";
    options.yAxis.min = this.computeYAxisMin(options.yAxis.type);
    options.yAxis.id = 'yaxis';
    options.yAxis.labels = {};
    options.yAxis.labels.formatter = this.yAxisFormatter;

    options.title = {};
    options.title.text = params.mTitle || undefined;

    options.subtitle = {};
    options.subtitle.text = params.mSubTitle || undefined;

    options.legend = {};
    options.legend.enabled = true; /* always enable initially because otherwise you can never get one */
    options.legend.labelFormatter = this.legendFormatter;
    options.legend.userFormat = params.mFormatParams.mLegendFormat;
    if(params.mLegendPosition) {
        if(params.mLegendPosition === 'left' || params.mLegendPosition === 'right') {
            options.legend.verticalAlign = 'middle';
            options.legend.layout = 'vertical';
            options.legend.align = params.mLegendPosition;
        } else if(params.mLegendPosition === 'vertical') {
            options.legend.layout = 'vertical';
        }
    }
    options.legend.userVisibility = formatParams.mLegendVisible;

    options.tooltip = {};
    options.tooltip.userFormat = formatParams.mCaptionFormat || formatParams.mXAxisFormat;
    options.tooltip.formatter = this.tooltipFormatter;

    options.plotOptions = {};
    options.plotOptions.column = {};
    options.plotOptions.line = {};
    options.plotOptions.spline = {};
    options.plotOptions.spline.marker = {};
    options.plotOptions.spline.marker.enabled = false;
    options.plotOptions.series = {};
    options.plotOptions.series.color = linecolor;
    if(linewidth) {options.plotOptions.series.lineWidth = parseInt(linewidth);}
    options.plotOptions.series.marker = {};
    options.plotOptions.series.marker.symbol = params.mMarkerSymbol || undefined;
    if(markerson) {
        if(markerson === 'false') {
            options.plotOptions.series.marker.enabled = false;
        } else if(markerson === 'true') {
            options.plotOptions.series.marker.enabled = true;
        }
    }

    if(xaxison !== undefined) {
        if(xaxison === 'false') {
            options.xAxis.lineWidth = 0;
            options.xAxis.minorGridLineWidth = 0;
            options.xAxis.lineColor = 'transparent';
            options.xAxis.minorTickLength = 0;
            options.xAxis.tickLength = 0;
        }
        if(xaxison === 'false' || xaxison === 'nolabels') {
            options.xAxis.labels.enabled = false;
        }
    }

    if(yaxison !== undefined) {
        if(yaxison === 'false') {
            options.yAxis.lineWidth = 0;
            options.yAxis.minorGridLineWidth = 0;
            options.yAxis.lineColor = 'transparent';
            options.yAxis.minorTickLength = 0;
            options.yAxis.tickLength = 0;
        }
        if(yaxison === 'false' || yaxison === 'nolabels') {
            options.yAxis.labels.enabled = false;
        }
    }

    options.wrapper = this;

    return options;
};

HighchartsWrapper.prototype.addSeries = function(seriesObj, seriesType) {
    var i = 0;
    var labels = seriesObj.labels;
    var data = seriesObj.series;
    var error = seriesObj.error;
    var xaxis = this.mChart.get('xaxis');
    var yaxis = this.mChart.get('yaxis');
    xaxis.update({userLabels:seriesObj.labels, userCaptions:seriesObj.captions}, false);
    var xaxistype = xaxis.userOptions.type;
    var yaxistype = yaxis.userOptions.type;

    var seriesToAdd = [];

    if(this.mChart.userOptions.chart.type == 'boxplot') {
        var boxplotData = [];
        for (i = 0; i < labels.length; i++) {
            boxplotData[i] = [];
            boxplotData[i].push(data.group_min[i]);
            boxplotData[i].push(data.group_q1[i]);
            boxplotData[i].push(data.group_median[i]);
            boxplotData[i].push(data.group_q3[i]);
            boxplotData[i].push(data.group_max[i]);
        }
        this.mChart.get('xaxis').setCategories(labels, false);
        seriesToAdd.push({data:boxplotData});
    } else {
        for(var series in data) {
            var theSeries = [];

            for(i=0; i<data[series].length; i++) {
                var x = labels[i];
                var y = data[series][i];

                if(xaxistype === "datetime") {
                    x *= 1000;
                }
                if(yaxis.userOptions.userFormat == 'pct' && y !== null) {
                    y *= 100;
                }
                if(yaxistype === "logarithmic" && y === 0 && y !== null) {
                    y = 0.00001; //maybe should just not add this point?
                }

                var name = null;
                if(xaxistype === "datetime") {
                    name = x;
                } else {
                    name = labels[i];
                    if(name === "" || name === null) {
                        name = " ";
                    } else {
                        name = name.toString();
                    }
                }

                if(_.isNumber(y)) {
                    var pointObj = {name:name,y:y};
                    if(xaxistype !== 'category') {
                        pointObj.x = x;
                    }
                    theSeries.push(pointObj);
                }
            }

            seriesToAdd.push({
                name: series,
                type: seriesType,
                data: theSeries,
            });
        }
        if(xaxistype === 'category') {
            this.mChart.get('xaxis').setCategories(labels, false);
        }
    }

    for(var s=0; s<seriesToAdd.length; s++) {
        this.mChart.addSeries(seriesToAdd[s], false);
    }

    var sil = (this.mChart.series.length == 1) ? false : this.mChart.userOptions.legend.userVisibility;
    for(var es=0; es<this.mChart.series.length; es++) {
        this.mChart.series[es].update({showInLegend:sil}, false);
    }

    this.mChart.get('yaxis').update({min:this.computeYAxisMin(yaxistype)});

    this.handleError(error);
    this.mChart.redraw();
};

HighchartsWrapper.prototype.handleError = function(error) {
	switch(error) {
		case(0/*SSFErrors.Success*/):
			break;

		case(-5/*SSFErrors.ErrorDatabase*/):
		{
			this.mChart.setTitle(null, {
				text:"There is no data for this graph yet.",
				style:{color:'#FF0000'}
			});
		}
		break;

		default:
		{
			this.mChart.setTitle(null, {
				text: "An error occurred loading " + this.mChart.userOptions.title.text + ". Please refresh.",
				style:{color:'#FF0000'}
			});
		}
		break;
	}
};

HighchartsWrapper.prototype.setTitle = function(title, subtitle) {
    this.mChart.setTitle(title, subtitle);
};

HighchartsWrapper.prototype.setHeight = function(height) {
    this.mChart.setSize(this.mChart.chartWidth, height);
};

HighchartsWrapper.prototype.clear = function(){
    while(this.mChart.series.length > 0) {
        this.mChart.series[0].remove(false);
    }
    // http://stackoverflow.com/a/18491103
    this.mChart.colorCounter = 0;
    this.mChart.symbolCounter = 0;
    this.mChart.redraw();
};

HighchartsWrapper.prototype.showLoading = function () {
    if(this.mChart) {
        this.mChart.showLoading();
    }
};

HighchartsWrapper.prototype.hideLoading = function() {
    if(this.mChart) {
        this.mChart.hideLoading();
    }
};

HighchartsWrapper.prototype.removeAnnotations = function() {
    var xaxis = this.mChart.get("xaxis");
    var numBands = xaxis.plotLinesAndBands.length;
    var idListToRemove = [];

    var i = 0;
    // Iterate over the list so that we can find the list of plot band ids to remove
    for (i = 0; i < numBands; i++ ) {
        idListToRemove[i] = xaxis.plotLinesAndBands[i].id;
    }

    // Now can delete them...
    for (i = 0; i < numBands; i++ ) {
        xaxis.removePlotBand(idListToRemove[i]);
    }
};

HighchartsWrapper.prototype.addAnnotations = function(annotations, onClick) {
    var xaxis = this.mChart.get("xaxis");

    //build a list of annotations to show...
    var annotation_list = {};
    _.each(annotations, function(curAnnotationData){
        var ts = dayifyTimestamp(parseInt(curAnnotationData.epoch))*1000;

        //see if we already have one on this date, if we do
        //modify it to indicate there are multiple events...
        if(annotation_list[ts]) {
            annotation_list[ts].count++;
            annotation_list[ts].plotline.label.text = "<i>" + annotation_list[ts].count + " events</i>";
        } else {
            var plotline = {
                id: ts,
                value: ts,
                events: {
                    click: function(e){onClick(curAnnotationData);},
                    mouseover: function(e){
                        document.body.style.cursor="pointer";
                    },
                    mouseout: function(e){
                        document.body.style.cursor="default";
                    }
                },
                label: {
                    text: curAnnotationData.label
                }
            };

            annotation_list[ts] = {count: 1, plotline: Highcharts.merge( plotline, Highcharts.theme.plotline)  };
        }
    });

    //now, actually add them...
    _.each(annotation_list, function(annotation){
        xaxis.addPlotLine(annotation.plotline);
    });
};

HighchartsWrapper.prototype.addGoals = function(data){
    var yaxis = this.mChart.get("yaxis");
    _.each(data, function(goal){
        yaxis.removePlotLine(goal.id);
        yaxis.addPlotLine(Highcharts.merge({
            id:goal.id,
            label:{text:""},
            value:plotline.value
        }, Highcharts.theme.goalLine));
    });
};

HighchartsWrapper.prototype.removeGoals = function(data){
    var yaxis = this.mChart.get("yaxis");
    _.each(data, function(goal){
        yaxis.removePlotLine(goal.id);
    });
};



