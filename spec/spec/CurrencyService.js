describe("CurrencyService", function(){
    var CS = new CurrencyService();

    describe("CurrencyService::getPrefix", function() {
        it('should return the correct symbol as a prefix (if applicable)', function() {
            // Test some valid currency codes
            if (CS.intlSupported)
            {
                // Test different currencies in different locales
                expect(CS.getPrefix("USD", "en-US")).toBe("$");
                expect(CS.getPrefix("USD", "en-CA")).toBe("US$");
                expect(CS.getPrefix("USD", "en-GB")).toBe("$");
                expect(CS.getPrefix("USD", "de-DE")).toBe("");
                expect(CS.getPrefix("USD", "ja-JP")).toBe("$");

                expect(CS.getPrefix("CAD", "en-US")).toBe("CA$");
                expect(CS.getPrefix("CAD", "en-CA")).toBe("$");
                expect(CS.getPrefix("CAD", "en-GB")).toBe("CA$");
                expect(CS.getPrefix("CAD", "de-DE")).toBe("");
                expect(CS.getPrefix("CAD", "ja-JP")).toBe("CA$");

                expect(CS.getPrefix("GBP", "en-US")).toBe("£");
                expect(CS.getPrefix("GBP", "en-CA")).toBe("£");
                expect(CS.getPrefix("GBP", "en-GB")).toBe("£");
                expect(CS.getPrefix("GBP", "de-DE")).toBe("");
                expect(CS.getPrefix("GBP", "ja-JP")).toBe("£");

                expect(CS.getPrefix("EUR", "en-US")).toBe("€");
                expect(CS.getPrefix("EUR", "en-CA")).toBe("€");
                expect(CS.getPrefix("EUR", "en-GB")).toBe("€");
                expect(CS.getPrefix("EUR", "de-DE")).toBe("");
                expect(CS.getPrefix("EUR", "ja-JP")).toBe("€");

                expect(CS.getPrefix("JPY", "en-US")).toBe("¥"); // U+00A5
                expect(CS.getPrefix("JPY", "en-CA")).toBe("¥"); // U+00A5
                expect(CS.getPrefix("JPY", "en-GB")).toBe("¥"); // U+00A5
                expect(CS.getPrefix("JPY", "de-DE")).toBe("");
                expect(CS.getPrefix("JPY", "ja-JP")).toBe("￥"); // U+FFE5
            }
            else
            {
                expect(CS.getPrefix("USD")).toBe("$");
                expect(CS.getPrefix("CAD")).toBe("$");
                expect(CS.getPrefix("GBP")).toBe("£");
                expect(CS.getPrefix("EUR")).toBe("€");
                expect(CS.getPrefix("JPY")).toBe("¥");
            }

            // Test a couple of different bogus currency codes which should return an empty string
            expect(CS.getPrefix("OMG")).toBe("");
            expect(CS.getPrefix("l8rZ")).toBe("");
        });
    });

    describe("CurrencyService::getSuffix", function() {
        it('should return the correct symbol as a suffix (if applicable)', function() {
            // Test some valid currency codes
            if (CS.intlSupported)
            {
                // Test different currencies in different locales
                expect(CS.getSuffix("USD", "en-US")).toBe("");
                expect(CS.getSuffix("USD", "en-CA")).toBe("");
                expect(CS.getSuffix("USD", "en-GB")).toBe("");
                expect(CS.getSuffix("USD", "de-DE")).toBe(" $"); // Contains U+00A0 (Non-breaking space)
                expect(CS.getSuffix("USD", "ja-JP")).toBe("");

                expect(CS.getSuffix("CAD", "en-US")).toBe("");
                expect(CS.getSuffix("CAD", "en-CA")).toBe("");
                expect(CS.getSuffix("CAD", "en-GB")).toBe("");
                expect(CS.getSuffix("CAD", "de-DE")).toBe(" CA$"); // Contains U+00A0 (Non-breaking space)
                expect(CS.getSuffix("CAD", "ja-JP")).toBe("");

                expect(CS.getSuffix("GBP", "en-US")).toBe("");
                expect(CS.getSuffix("GBP", "en-CA")).toBe("");
                expect(CS.getSuffix("GBP", "en-GB")).toBe("");
                expect(CS.getSuffix("GBP", "de-DE")).toBe(" £"); // Contains U+00A0 (Non-breaking space)
                expect(CS.getSuffix("GBP", "ja-JP")).toBe("");

                expect(CS.getSuffix("EUR", "en-US")).toBe("");
                expect(CS.getSuffix("EUR", "en-CA")).toBe("");
                expect(CS.getSuffix("EUR", "en-GB")).toBe("");
                expect(CS.getSuffix("EUR", "de-DE")).toBe(" €"); // Contains U+00A0 (Non-breaking space)
                expect(CS.getSuffix("EUR", "ja-JP")).toBe("");

                expect(CS.getSuffix("JPY", "en-US")).toBe("");
                expect(CS.getSuffix("JPY", "en-CA")).toBe("");
                expect(CS.getSuffix("JPY", "en-GB")).toBe("");
                expect(CS.getSuffix("JPY", "de-DE")).toBe(" ¥"); // Contains U+00A0 (Non-breaking space)
                expect(CS.getSuffix("JPY", "ja-JP")).toBe("");
            }
            else
            {
                expect(CS.getSuffix("USD")).toBe("");
                expect(CS.getSuffix("CAD")).toBe("");
                expect(CS.getSuffix("GBP")).toBe("");
                expect(CS.getSuffix("EUR")).toBe("");
                expect(CS.getSuffix("JPY")).toBe("");
            }

            // Test a couple of different bogus currency codes which should return an empty string
            expect(CS.getPrefix("OMG")).toBe("");
            expect(CS.getPrefix("l8rZ")).toBe("");
        });
    });

    describe("CurrencyService::format", function() {
        it('should return a (currency-symbol) formatted price given the price as a number and a valid ISO 4217 currency code', function() {
            // Since PhantomJS doesn't support the Internationalization API, we expect all symbols to be prefixes

            // Test some valid currency codes
            if (CS.intlSupported)
            {
                expect(CS.format(1.99, "USD", undefined, "en-US")).toBe("$1.99");
                expect(CS.format(1.99, "USD", undefined, "en-CA")).toBe("US$1.99");
                expect(CS.format(1.99, "USD", undefined, "en-GB")).toBe("$1.99");
                expect(CS.format(1.99, "USD", undefined, "de-DE")).toBe("1,99 $"); // Contains U+00A0 (Non-breaking space)
                expect(CS.format(1.99, "USD", undefined, "ja-JP")).toBe("$1.99");

                expect(CS.format(3.49, "CAD", undefined, "en-US")).toBe("CA$3.49");
                expect(CS.format(3.49, "CAD", undefined, "en-CA")).toBe("$3.49");
                expect(CS.format(3.49, "CAD", undefined, "en-GB")).toBe("CA$3.49");
                expect(CS.format(3.49, "CAD", undefined, "de-DE")).toBe("3,49 CA$"); // Contains U+00A0 (Non-breaking space)
                expect(CS.format(3.49, "CAD", undefined, "ja-JP")).toBe("CA$3.49");

                expect(CS.format(1.798, "GBP", 3, "en-US")).toBe("£1.798");
                expect(CS.format(1.798, "GBP", 3, "en-CA")).toBe("£1.798");
                expect(CS.format(1.798, "GBP", 3, "en-GB")).toBe("£1.798");
                expect(CS.format(1.798, "GBP", 3, "de-DE")).toBe("1,798 £"); // Contains U+00A0 (Non-breaking space)
                expect(CS.format(1.798, "GBP", 3, "ja-JP")).toBe("£1.798");

                expect(CS.format(1554.374, "EUR", undefined, "en-US")).toBe("€1,554.37");
                expect(CS.format(1554.374, "EUR", undefined, "en-CA")).toBe("€1,554.37");
                expect(CS.format(1554.374, "EUR", undefined, "en-GB")).toBe("€1,554.37");
                expect(CS.format(1554.374, "EUR", undefined, "de-DE")).toBe("1.554,37 €"); // Contains U+00A0 (Non-breaking space)
                expect(CS.format(1554.374, "EUR", undefined, "ja-JP")).toBe("€1,554.37");

                expect(CS.format(5307.70, "JPY", undefined, "en-US")).toBe("¥5,308");
                expect(CS.format(5307.70, "JPY", undefined, "en-CA")).toBe("¥5,308");
                expect(CS.format(5307.70, "JPY", undefined, "en-GB")).toBe("¥5,308");
                expect(CS.format(5307.70, "JPY", undefined, "de-DE")).toBe("5.308 ¥"); // Contains U+00A0 (Non-breaking space)
                expect(CS.format(5307.70, "JPY", undefined, "ja-JP")).toBe("￥5,308"); // U+FFE5
            }
            else
            {
                expect(CS.format(1.99, "USD")).toBe("$1.99");
                expect(CS.format(3.49, "CAD")).toBe("$3.49");
                expect(CS.format(1.798, "GBP", 3)).toBe("£1.798");
                expect(CS.format(5.374, "EUR")).toBe("€5.37");
                expect(CS.format(307.70, "JPY")).toBe("¥307.70");
            }

            // Test a couple of different bogus currency codes which should just return the price
            expect(CS.format(10.68, "OMG")).toBe("10.68");
            expect(CS.format(10.68, "l8rZ")).toBe("10.68");
        });
    });
});