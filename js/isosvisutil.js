function LabelIndex(labels, searchValue)
{
    if ( labels ) {
        for (var i=0; i<labels.length; ++i)
        {
            var l = labels[i];

            // Highcharts automatically stringifies values of data points for a categorical axis,
            // but our labels could be numeric.  So try a direct and string-based comparison.
            if ((l == searchValue) || String(l) == String(searchValue))
            {
                return i;
            }
        }
    }

    return -1;
}

function IsosVisAxisLabelKVFormatter(raw, format, labels, captions)
{
    // use the full value of the field (which is in the captions array) for the lookup
    var idx = LabelIndex(labels, raw);
    if (idx != -1)
    {
        raw = captions[idx];
    }

    for (var key in format)
    {
        if(key == raw)
        {
            return format[key];
        }
    }
    return raw;
}

function IsosVisAxisLabelFormatter(raw, format, labels, captions)
{
    // For dummy labels to fix categorized axes, just return an empty string
    // so that nothing shows.
    if ( raw === "" )
    {
        return "";
    }

    if(typeof format == "object")
    {
        return IsosVisAxisLabelKVFormatter(raw, format, labels, captions);
    }

    var formatted = "undefined";

	switch(format)
	{
		case('epochday'):
			{
				var epochDay = parseInt(raw);
				var epochTime = (epochDay) * 1000 * 24 * 60 * 60;
                formatted = Highcharts.dateFormat("%b %e", epochTime);
			}
			break;

		case('epochtime'):
            {
                formatted = Highcharts.dateFormat("%b %e", parseInt(raw));
            }
        break;

		case('use-caption'):
			{
				// find this value in the labels and return the associated caption...
                var idx = LabelIndex(labels, raw);
                if (idx != -1)
                {
                    formatted = captions[idx];
                    if ( formatted === null ) {
                        formatted = 'unspecified';
                    }
                }
			}
			break;

		case('use-index'):
			{
				//find this value in the labels and return the index...
				formatted = LabelIndex(labels, raw);
			}
			break;

		case ('none'):
		    {
		    }
		    break;

		case('use-label'):
            /* falls through */
	    default:
			{
                var maxStringLength = 12;
                // I wanted to just check against null, but somehow highcharts is turning null as a label into " " PMF
                if ( raw === null || raw === " ") {
                    formatted = 'unspecified';
                }
                else if ( raw.length > maxStringLength ) {
                    formatted = raw.substr(0, maxStringLength) + "...";
                }
                else {
                    formatted = raw;
                }
			}
			break;
	}

    return String(formatted);
}

function IsosVisDataPointLabelFormatter(x, y, xAxisFormat, labels, captions, numberStyle, seriesName, seriesFormat, ypct)
{
    //start with the same xaxis label that we would have used...
    var xLabel = IsosVisAxisLabelFormatter(x, xAxisFormat, labels, captions);

    //format the ylabel as number with 2 decimal places by default...
    var numDecimalPlaces = 2;
    //if ( numberStyle == 'int' )
    //{
        // ... unless the data is integer data
    //    numDecimalPlaces = 0;
    //} else {
        if ( y % 1 === 0 ) {
            numDecimalPlaces = 0;
        } else if ( y < 0.0001 ) {
            numDecimalPlaces = 5;
        } else if ( y < 0.001 ){
            numDecimalPlaces = 4;
        } else if ( y < 0.01 ){
            numDecimalPlaces = 3;
        }
    //}

    var yLabel = Highcharts.numberFormat(y, numDecimalPlaces);

    //add a suffix or prefix based on the numberStyle specified...
    if (numberStyle && 0 === numberStyle.indexOf('cur|'))
    {
        // We're dealing with a currency
        var parts = numberStyle.split('|');
        yLabel = new CurrencyService().format(y, parts[1], numDecimalPlaces);
    }
    else if (numberStyle == "pct")
    {
        yLabel = yLabel + '%';
    }

    var seriesNameDisplay = '';
    if (seriesName && !_.contains(['?column?','values'], seriesName))
    {
        if ((seriesFormat !== undefined) && (seriesName in seriesFormat))
        {
            seriesNameDisplay = '<br>('+seriesFormat[seriesName]+')';
        }
        else
        {
            seriesNameDisplay = '<br>('+seriesName+')';
        }
    }

	//take action based on the xAxisFormat as well...
    var ttlabel = "";
	switch(xAxisFormat)
	{
		case('use-index'):
			{
				//find this value in the labels and return the associated caption instead of the x label...
				for(var i=0; i<labels.length; ++i) {if(labels[i] == x) break;}
				ttlabel =  "<b>" + captions[i] + ": </b>" + yLabel + seriesNameDisplay;
			}
            break;

		default:
			ttlabel = "<b>" + xLabel + ": </b>" + yLabel + seriesNameDisplay;
            break;
	}

    if(ypct !== undefined) {
        ttlabel += " (" + ypct.toFixed(2) + "%)";
    }

    return ttlabel;
}