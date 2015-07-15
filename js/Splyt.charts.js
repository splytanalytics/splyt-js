/* Copyright Row Sham Bow, Inc. 2014 */

/**
 * <code>Splyt.Charts</code> provides functions that allows you to render a chart on your web page.
 * <p>
 * The render function is accessible as follows:
 * <p>
 * <code>&nbsp;&nbsp;&nbsp;Splyt.Charts.render();</code>
 *
 * @namespace
 * @alias Splyt.Charts
 */
var Splyt_Charts = {
    /**
     * @desc
     * <p> Render a chart to a <code>div</code> on your web page.  In order to use this function you must include
     * <code>Splyt.all.js</code> or <code>Splyt.all.min.js</code> .
     *
     * @param {String} div
     * <p>The id of the div to render the chart in</p>
     * @param {String} id
     * <p> The id of the chart to render.  This is available from splyt.com </p>
     * @param {String|Integer} from
     * <p> The unix timestamp (in seconds) of the earliest moment in time you want the visualization to span </p>
     * @param {String|Integer} to
     * <p> The unix timestamp (in seconds) of the latest moment in time you want the visualization to span </p>
     * @param {Object} options
     * <p>A key value object. Reserved for future use.</p>
     * <!--
     * <table>
     *   <tr><th>Field</th><th>Type</th><th>Description</th></tr>
     * </table>
     * -->
     */
    render : function(div, id, from, to, options) {
        if(Visualization) {
            var v = new Visualization();

            //build the initial char in a loading state...
            var chart = v.create("highchart", div, {});
            chart.showLoading();

            //create the request object...
            var obj = Splyt.xhrObj('xvault', Splyt.TOOLS, undefined, [id, from, to]);

            //on success...
            obj.success = function(ssf) {
               
                // Build an info object from the response
                
                var info = ssf.data.info;
                
                // make sure some default options are specifed...
                
                info.sort = info.plotconfig.params.sort;
                info.numberStyle = info.yformat || 'int';
                info.xaxis = info.xformat;
                info.caption = info.infoformat;

                //build the series object from response...
                var seriesObj = new Series(ssf.data.series);
                seriesObj.applyTransforms();

                //re create the chart with the retrieved information...
                chart.destroy();
                chart = v.create("highchart", div, info);
                
                //add the series...
                chart.addSeries(seriesObj, info.type);
                
                /*
                var pwrdby = chart.mChart.renderer.image("../img/powered_by_splyt.png", 0, 0, 56, 16);
                pwrdby.on('click', function() {location.href = 'http://www.splyt.com';});
                pwrdby.attr({zIndex: 8});
                pwrdby.css({cursor: 'pointer'});
                pwrdby.add().align({align: 'right', x: -58, verticalAlign: 'top',y: 2});
                */
            };
            
            Splyt.xhr(obj);
        }
    }
};
Splyt.Charts = Splyt_Charts;