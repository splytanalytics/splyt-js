The SPLYT SDK for Javascript
============================

Welcome! This SDK allows you to integrate websites and web-based applications with SPLYT, which provides analytics and insights about your app.
In addition, SPLYT empowers you with the ability to take actions that will improve your users' engagement.

Note that this SDK currently assumes that your Javascript code will be running in a browser.

***

Initialization
--------------

1. Source `Splyt.data.js` or `Splyt.data.min.js` in your document.

		<script src="Splyt.data.js"/>

2. As early as you can, initialize SPLYT with your unique customer ID.  You can find your customer ID in the [Products tool on splyt.com](https://www.splyt.com/admin/products), in the format of: org-product-env
   In order for sent data to be valid, you will need to have set a user ID, device ID, or both.  If you do not specify a device ID, one will be requested from SPLYT's servers or re-loaded from `localStorage`.

	<pre>
		Splyt.init({
			"customerId": "<em>[your SPLYT customer id goes here]</em>",
			"user": "<em>[user id goes here; if you have a device ID, this is optional]</em>",
			"device": "<em>[device id goes here; however, you can omit "device" and one will be set for you]</em>"
		});
	</pre>

3. Users and devices can be passed either as a single identifier, or as an object that contains a field named `id`.  When using the object approach, you can also specify a set of properties to associate with the user or device.

	<pre>
		Splyt.init({
			"customerId": "<em>[your customer id goes here]</em>",
			"user": {
				id: "<em>[user id goes here; if you have a device ID, this is optional]</em>",
				properties: {
					// specify any user properties here
					paidSubscriber: true,
					gender: "male"</em>,
					lifetimeSpend: 123.45
				}
			},
			"device": {
				id: "<em>[device id goes here; however, you can omit "device" and one will be set for you]</em>"
				properties: {
					// specify any device properties here
					height: window.screen.availHeight,
					width: window.screen.availWidth
				}
			},
		});
	</pre>

4. Begin a session. As early as possible, call {@linkcode Splyt.Session.begin} to mark the beginning of a period of activity.

		Splyt.Session.begin();

***

Instrumentation
---------------

Add instrumentation that describes your users and their interaction with your site or app.  The {@linkcode Splyt.Instrumentation} namespace provides APIs for this purpose.

APIs also exist to address some of the most common scenarios; for example, APIs in {@linkcode Splyt.Session} are useful for describing user sessions,
and {@linkcode Splyt.Purchasing} can be used to report purchases that users make from your site or app.  We encourage you to use use these APIs where
applicable, as they enable several predefined metrics and visualizations on the SPLYT web site.

Here are few best practices to keep in mind:

* Both a user ID and device ID are not required, but you must set at least one of them before you can start sending data.
* As soon as you learn of changes to the user's or device's state, you should report them to SPLYT (using APIs such as {@linkcode Splyt.Instrumentation.updateUserState}
  or {@linkcode Splyt.Instrumentation.updateDeviceState}, respectively). This is important because you will want to understand which of your users are more likely to
  perform some desired activity, such as a purchase. So, whenever possible, be sure to report updates to user and/or device state to SPLYT before beginning
  a new transaction that describes an activity they performed.


***

Tuning and Testing
------------------

1. If you are using the tuning system, variables will be cached for you after calling {@linkcode Splyt.init}.

2. Now you can retrieve a named tuning variable.

		var myVar = Splyt.Tuning.getVar("myVar", "myDefaultValue");

3. If needed, you can refresh the values of tuning variables at any point by calling the {@linkcode Splyt.Tuning.refresh refresh} method:

		Splyt.Tuning.refresh();

***

Charts
------

If you are using the charting portion of the SDK, take these additional steps:

1. Source `Splyt.all.js` or `Splyt.all.min.js` in your document, rather than `Splyt.data.js` or `Splyt.data.min.js`.

		<script src="Splyt.all.js"/>

2. When initializing the SDK, pass the API key that you created from the [Products tool on splyt.com](https://dashboard.splyt.com/admin/products).
   You can also set the SDK to only initialize for charts with the `chartOnly parameter`; see the {@linkcode Splyt.Charts} documentation for details.

	<pre>
		Splyt.init({
			"customerId": "<em>[your customer id goes here]</em>",
			"apikey": "<em>[your api key goes here]</em>",
		});
	</pre>

***

Sample Applications
-------------------

This SDK includes a sample app called BubblePop, a simple [shell game](http://en.wikipedia.org/wiki/Shell_game) that
demonstrates basic integration of data collection, tuning, and testing.  It also shows how to report purchases to SPLYT.

To run the sample, open `samples/BubblePop/index.html` in your web browser.  The sample has been tested to work
properly in recent versions of Chrome, Firefox, and Safari.

***

*Copyright 2015 Knetik, Inc.*