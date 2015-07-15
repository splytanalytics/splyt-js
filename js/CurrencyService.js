///////////////////////////////////////////////////////////////////////////////
// CurrencyService deals with currency-related formatting
function CurrencyService() {
    'use strict';

    // See http://www.xe.com/symbols.php
    var currencyMap =
    { ALL: "Lek",
      AFN: "؋",
      ARS: "$",
      AWG: "ƒ",
      AUD: "$",
      AZN: "ман",
      BSD: "$",
      BBD: "$",
      BYR: "p.",
      BZD: "BZ$",
      BMD: "$",
      BOB: "$b",
      BAM: "KM",
      BWP: "P",
      BGN: "лв",
      BRL: "R$",
      BND: "$",
      KHR: "៛",
      CAD: "$",
      KYD: "$",
      CLP: "$",
      CNY: "¥",
      COP: "$",
      CRC: "₡",
      HRK: "kn",
      CUP: "₱",
      CZK: "Kč",
      DKK: "kr",
      DOP: "RD$",
      XCD: "$",
      EGP: "£",
      SVC: "$",
      EEK: "kr",
      EUR: "€",
      FKP: "£",
      FJD: "$",
      GHC: "¢",
      GIP: "£",
      GTQ: "Q",
      GGP: "£",
      GYD: "$",
      HNL: "L",
      HKD: "$",
      HUF: "Ft",
      ISK: "kr",
      INR: "",
      IDR: "Rp",
      IRR: "﷼",
      IMP: "£",
      ILS: "₪",
      JMD: "J$",
      JPY: "¥",
      JEP: "£",
      KZT: "лв",
      KPW: "₩",
      KRW: "₩",
      KGS: "лв",
      LAK: "₭",
      LVL: "Ls",
      LBP: "£",
      LRD: "$",
      LTL: "Lt",
      MKD: "ден",
      MYR: "RM",
      MUR: "₨",
      MXN: "$",
      MNT: "₮",
      MZN: "MT",
      NAD: "$",
      NPR: "₨",
      ANG: "ƒ",
      NZD: "$",
      NIO: "C$",
      NGN: "₦",
      NOK: "kr",
      OMR: "﷼",
      PKR: "₨",
      PAB: "B/.",
      PYG: "Gs",
      PEN: "S/.",
      PHP: "₱",
      PLN: "zł",
      QAR: "﷼",
      RON: "lei",
      RUB: "руб",
      SHP: "£",
      SAR: "﷼",
      RSD: "Дин.",
      SCR: "₨",
      SGD: "$",
      SBD: "$",
      SOS: "S",
      ZAR: "R",
      LKR: "₨",
      SEK: "kr",
      CHF: "Fr.",
      SRD: "$",
      SYP: "£",
      TWD: "NT$",
      THB: "฿",
      TTD: "TT$",
      TRY: "",
      TRL: "₤",
      TVD: "$",
      UAH: "₴",
      GBP: "£",
      USD: "$",
      UYU: "$U",
      UZS: "лв",
      VEF: "Bs",
      VND: "₫",
      YER: "﷼",
      ZWD: "Z$"
    };

    this.intlSupported = ("object" === typeof window.Intl);

    this.getPrefix = function(currencyCode, locale) {
        if (currencyCode) {
            if (this.intlSupported) {
                // This browser supports the Internationalization API
                // Check if the currency symbol corresponding to this currency code is a prefix
                try {
                    var priceFormatted = Intl.NumberFormat(locale, {style: "currency", currency: currencyCode}).format(0);

                    // Check if this returned a price string that starts with the currency code passed in.
                    // This can occur if the currency code passes the IsWellFormedCurrencyCode() test but is still not a valid currency code.
                    // In this case, we want to just return an empty string
                    if (0 !== priceFormatted.indexOf(currencyCode)) {
                        var index = priceFormatted.search(/\d/);
                        if (index > 0)
                        {
                            var retVal = priceFormatted.substring(0, index);
                            if (currencyCode !== retVal) {
                                return retVal;
                            }
                        }
                    }
                } catch (e) {
                    // A RangeError can occur if the currency code passed in doesn't pass the IsWellFormedCurrencyCode() test.
                    // So, let's trap exceptions and we'll just return an empty string back to the caller
                }
            }
            else {
                // This browser doesn't yet support the Internationalization API, so let's fallback onto the hard-coded currency map
                // and return the symbol as a prefix
                if (currencyMap.hasOwnProperty(currencyCode)) {
                    return currencyMap[currencyCode];
                }
            }
        }

        return "";
    };

    this.getSuffix = function(currencyCode, locale) {
        if (currencyCode) {
            // NOTE: In the case where the browser doesn't support the Internationalization API, we always return the symbol as a prefix and an empty string as the suffix
            if (this.intlSupported) {
                // This browser does support the Internationalization API
                // Check if the currency symbol corresponding to this currency code is a suffix
                try {
                    var priceFormatted = Intl.NumberFormat(locale, {style: "currency", currency: currencyCode}).format(0);
                    var index = priceFormatted.search(/[^\d\.,]/);
                    if (index > 0)
                    {
                        return priceFormatted.substring(index);
                    }
                } catch (e) {
                    // A RangeError can occur if the currency code passed in doesn't pass the IsWellFormedCurrencyCode() test.
                    // So, let's trap exceptions and we'll just return an empty string back to the caller
                }
            }
        }

        return "";
    };

    this.format = function(price, currencyCode, numDecimalPlaces, locale) {
        // Default to 2 decimal places unless the number is specified
        var priceFormatted = Number(price).toFixed("undefined" === typeof numDecimalPlaces ? 2 : numDecimalPlaces).toString();

        if (currencyCode) {
            if (this.intlSupported) {
                try {
                    var formatted = Intl.NumberFormat(locale, {style: "currency", currency: currencyCode, minimumFractionDigits: numDecimalPlaces, maximumFractionDigits: numDecimalPlaces}).format(price);
                    // Check if this returned a price string that starts with the currency code passed in.
                    // This can occur if the currency code passes the IsWellFormedCurrencyCode() test but is still not a valid currency code.
                    // In this case, we want to just return the price as a string
                    if (0 !== formatted.indexOf(currencyCode)) {
                        priceFormatted = formatted;
                    }
                } catch (e) {
                    // A RangeError can occur if the currency code passed in doesn't pass the IsWellFormedCurrencyCode() test.
                    // So, let's trap exceptions and we'll just return the price as a string
                }
            }
            else {
                // This browser doesn't yet support the Internationalization API, so let's fallback onto the hard-coded currency map
                // and lookup the currency symbol and prepend it
                if (currencyMap.hasOwnProperty(currencyCode)) {
                    priceFormatted = currencyMap[currencyCode] + priceFormatted;
                }
            }
        }

        return priceFormatted;
    };
}

