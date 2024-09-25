(function ($, window) {
    const keyName = '_tab__key';
    var TabCache = {
        SetKey: function (key, callback) {
            if (key !== undefined && key !== '') {
                window.sessionStorage.setItem(keyName, key);
            }
            if (callback) callback();
        },
        GetKey: function () {
            return window.sessionStorage.getItem(keyName);
        },
        GetUrlWithKey: function (returnUrl) {
            var key = window.sessionStorage.getItem(keyName);
            var combineChar = '';
            if (returnUrl.indexOf('?') == -1) {
                combineChar = '?';
            }
            else {
                combineChar = '&';
            }

            returnUrl += combineChar + 'TabCacheKey=' + key;

            setTimeout(function () {
                location.href = returnUrl.replace('&amp;', '&');
            });
        },
        ClearKey: function (key) {
            window.sessionStorage.removeItem(keyName);
        }
    }
    window.TabCache = TabCache;
})($, window);