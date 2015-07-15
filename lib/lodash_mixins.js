// Mixins for LoDash. Can be used as any other function directly on LoDash (ex: _.deepGet)

_.mixin({
    /**
     *  Safely get a property value deep within an object without risking JS errors when an object in the path is undefined
     *
     *  Example: _.deepGet( {foo: {bar: ['a','b']}} , 'foo','bar',1) === 'b'
     *  Example: _.deepGet( {foo: {bar: ['a','b']}} , 'foo','bar','length') === 2
     *  Example: _.deepGet( {foo: {bar: ['a','b']}} , 'foo','NOPE','length') === undefined (no error)
     *  Example: _.deepGet( {} , 'foo','bar',1) === undefined (no error)
     *  Example: _.deepGet( null , 'foo','bar',1) === undefined (no error)
     *
     * @param First parameter: object or array (or null)
     * @param Rest of parameters: string or number (array index) of property to dig up
     * @return property value
     */
    deepGet: function(){
        var obj = arguments[0];
        var props = _.rest(arguments);
        return _.reduce(props, function(memo, prop){
            if(_.isObject(memo) && _.has(memo, prop)){ // non-null/undefined ({} and [] are both objects), and has property
                return _.result(memo, prop);
            }
            return undefined;
        }, obj);
    },

    /**
     * Determine whether an object has any properties.
     *
     * Duplicate of _.isEmpty ? - http://lodash.com/docs#isEmpty
     *
     * @param obj The object to check.
     * @returns {boolean} True if obj has one or more properties; otherwise, false.
     *
     * Taken from http://stackoverflow.com/a/2673229
     */
    isEmptyObject: function(obj){
        for(var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    },

    /**
     * Sorts the elements of two arrays in the same order.  The sort is performed
     * by applying the specified comparison function to the elements of the first
     * array.
     *
     * @param arrayPair: an array that contains two arrays of equal size.  The elements
     *                   of arrayPair[0] are used to perform the sort.
     *
     * @param compareFunction: the comparison method to use during the sort.  This method
     *                         is applied to the values of the elements of arrayPair[0]
     *
     * @return an array containing two arrays.
     * - The first array contains the elements of arrayPair[0] sorted with respect to compareFunction.
     * - The second array contains the elements of arrayPair[1] sorted with respect to arrayPair[0].
     *
     * Adapted from: http://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
     *
     */
    tiedSort: function(arrayPair, compareFunction){
        var array1 = arrayPair[0];
        var array2 = arrayPair[1];
        var all = [];

        for (var i = 0; i < array2.length; i++) {
            all.push({ 'A': array1[i], 'B': array2[i] });
        }

        if (!compareFunction) {
            compareFunction = function(a1, a2) { return a1 - a2; };
        }

        all.sort(function(a, b) {
            return compareFunction(a.A, b.A);
        });

        array1 = [];
        array2 = [];

        for (i = 0; i < all.length; i++) {
            array1.push(all[i].A);
            array2.push(all[i].B);
        }

        return [array1, array2];
    },

    /**
     * Updates the contents of an array while preserving its reference.
     *
     * @param {Array} arr - The array whose contents will be replaced
     * @param {Array} replacer - The array whose contents will be placed into arr.
     * @returns {Array} - A reference to arr.
     *
     * Inspired by http://www.untitleddesigns.com/2011/javascript-replace-array-contents/
     */
    replaceArrayContents: function(arr, replacer){
        arr.length = 0;
        Array.prototype.push.apply(arr, replacer);
        return arr;
    },

    isLoggedIn: function(){
        return !!$.cookie('ssf_auth');
    },

    /**
     * Should probably live in a service once this does more
     */
    getPropertyNameHint: function(name){
        var hints = {
            'duration': 'Seconds',
            'progress': 'Percentage'
        };
        var ret = _.deepGet(hints, name) || '';
        return ret;
    },

    /**
     * Should probably live in a service once this does more
     */
    getPropertyNameUnit: function(name){
        var units = {
            'duration': 's',
            'progress': '%'
        };
        var ret = _.deepGet(units, name) || '';
        return ret;
    }
});