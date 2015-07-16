/* Copyright 2015 Knetik, Inc. */

 /**
 * <code>Splyt.Purchasing</code> provides functions that allows you to report purchases made within your site or app.
 * <p>
 * The purchase function is accessible as follows:
 * <p>
 * <code>&nbsp;&nbsp;&nbsp;Splyt.Purchasing.purchase(item, offer, pointOfSale, currency);</code>
 * <p>
 *
 * @namespace
 * @alias Splyt.Purchasing
 */
var Splyt_Purchasing = {
    /**
     * @constant
     */
    PURCHASE_CATEGORY: "purchase",
    /**
     * @desc
     * <p>Record a purchase and all details about it.</p>
     *
     * @param {String} item
     * <p>The name/id of the item being purchased.</p>
     * @param {String} offer
     * <p>The name/id of the offer being purchased.</p>
     * @param {String} pos
     * <p>The point of sale.</p>
     * @param {String} currency
     * <p>The name of the currency used.</p>
     * @param {Float} price
     * <p>The price paid.</p>
     * @param result {String}
     * <p>A string representing the result of the transaction.<p>
     * <p>You can use {@link Splyt.TXN_SUCCESS} to indicate a successfully ended purchase or {@link Splyt.TXN_ERROR} to indicate a
     * purchase that did not end properly.</p>
     * @param {String} context
     * <p>A single string to indicate where this hook was called from in your code.</p>
     */
    purchase: function(item, offer, pos, currency, price, result, context) {
        "use strict";
        var data = {
            'offerId':offer,
            'itemName':item,
            'pointOfSale':pos
        };
        data.price = {};
        data.price[currency] = price;

        Splyt.Instrumentation.beginAndEnd(Splyt_Purchasing.PURCHASE_CATEGORY, result, data, context);
    }
};
Splyt.Purchasing = Splyt_Purchasing;