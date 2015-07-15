function Series(ssfType) {
    this.error = ssfType.errorCode;
    if ( ssfType.data !== null && ssfType.data !== undefined ) {
        this.labels = ssfType.data.labels;
        this.captions = ssfType.data.captions;
        this.series = ssfType.data.series;
        this.transpose = ssfType.data.transpose;
    }
}

Series.prototype.getFirstSeries = function() {
    for(var i in this.series) {
        return this.series[i];
    }
};

Series.prototype.getElementsWithIndices = function(arr, indices) {
    return _.map(indices, function(i) { return arr[i]; });
};

Series.prototype.getValuesColumn = function() {

    var transposeCol = this.series[this.transpose];
    var valueCol = null;

    // look for exactly one other series with the same length
    for (var s in this.series) {
        if (s == this.transpose) {
            continue;
        }

        var series = this.series[s];

        if (_.isArray(series) && series.length == transposeCol.length) {
            if (valueCol !== null) {
                // can't tell which column to use.
                throw new Error("Could not determine value column for transpose; multiple columns exist.");
            }

            valueCol = series;
        }
    }

    if (valueCol === null) {
        throw new Error("Could not find a value column for transpose.");
    }

    return valueCol;
};

Series.prototype.getUnique = function(arr) {
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (!_.contains(unique, arr[i])) {
            unique.push(arr[i]);
        }
    }

    return unique;
};

Series.prototype.getUniqueFirstIndices = function(arr) {
    var unique = [];
    var uniqueIndices = [];
    for (var i = 0; i < arr.length; i++) {
        if (!_.contains(unique, arr[i])) {
            uniqueIndices.push(i);
            unique.push(arr[i]);
        }
    }

    return uniqueIndices;
};

Series.prototype.applyTransforms = function() {

    // our only transform is transpose; if the data doesn't specify a
    // transpose of a known property, do nothing
    if (!this.transpose || !this.series.hasOwnProperty(this.transpose)) {
        return;
    }

    // find the array in the data that has the values to place in transposed columns
    var valuesColumn = this.getValuesColumn();

    var uniqueLabelIndices = this.getUniqueFirstIndices(this.labels);
    /* var transposedColumns = */ this.getUnique(this.series[this.transpose]);

    // build up the set of unique labels and captions in our new object.
    var newLabels   = this.getElementsWithIndices(this.labels,   uniqueLabelIndices);
    var newCaptions = this.getElementsWithIndices(this.captions, uniqueLabelIndices);
    var newSeries   = {};

    for (var i = 0; i < this.series[this.transpose].length; i++) {

        // get the label, transposed column, and transposed column value described
        // by this row of the original data
        var label        = this.labels[i];
        var xformColName = this.series[this.transpose][i];
        var xformColVal  = valuesColumn[i];

        // get the corresponding row we're writing into in the transposed data
        var xformRowIndex = newLabels.indexOf(label);

        // if this the first time we're touching this transposed column
        // row, then initialize it to all zeroes... because
        // the full cross product of { unique labels * transposedColumns } may
        // not appear in the data.
        if (!newSeries.hasOwnProperty(xformColName))
        {
            newSeries[xformColName] = [];
            for (var j = 0; j < newLabels.length; j++) {
                newSeries[xformColName][j] = 0;
            }
        }

        // Set the value described by this row in our transposed data.
        // Right now, we always do any aggregation by summing.
        newSeries[xformColName][xformRowIndex] += xformColVal;
    }

    // now that we're done, update the labels, captions, and series
    this.labels = newLabels;
    this.captions = newCaptions;
    this.series = newSeries;
    this.transpose = undefined; // already transposed.
};

/**
 * Sorts all of the data in the series with respect to an array of equal length as the series.
 *
 * @param {Array} sortArray - An array of equal length as the series, whose sort will be used to
 *                            sort the respective data in the series, as well.
 * @param {String} sortType - The type of sort to perform.  'naturalSort' is the only currently-supported
 *                            value.
 * @returns {Series} - A reference to the current Series object after sorting its contents.
 */
Series.prototype.tiedSort = function(sortArray, sortType) {
    var comparator = null;

    // The only sortType we support is 'naturalSort'.
    // Also make sure the array we're sorting by matches our series length.
    if ((sortType == 'naturalSort') && _.isArray(sortArray) && sortArray.length == this.labels.length) {
        comparator = strnatcmp;
    }
    else {
        return;
    }

    // Reorder the labels, captions, and all data series in seriesObj based
    // on a natural sort of the formatted labels.
    var sortedLabels = _.tiedSort([sortArray, this.labels],   comparator)[1];
    var sortedCaptions = _.tiedSort([sortArray, this.captions], comparator)[1];

    _.replaceArrayContents(this.labels, sortedLabels);
    _.replaceArrayContents(this.captions, sortedCaptions);

    for (var s in this.series) {
        var sortedSeries = _.tiedSort([sortArray, this.series[s]], comparator)[1];
        _.replaceArrayContents(this.series[s], sortedSeries);
    }

    return this;
};