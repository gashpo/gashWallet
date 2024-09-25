var Helper = {
    HasWindowsClose: false,
    HasKeyClose: false,
    HasLogout: false,

    CheckLeave: function (evt) {
        var e = window.event ? window.event : (evt ? evt : null);
        if (e.clientY < -50 || Helper.HasKeyClose) {
            Helper.HasWindowsClose = true;
            Helper.HasKeyClose = false;
            return "您是否要登出？";
        }
        Helper.HasWindowsClose = false;
    },

    CheckKeyLeave: function (e) {
        e = e || window.event;
        if ((e.altKey) && (e.keyCode == 115)) {
            Helper.HasKeyClose = true;
            Helper.CheckLeave;
        }
        else {
            Helper.HasKeyClose = false;
        }
    },

    MemberLogout: function () {
        if (Helper.HasWindowsClose || Helper.HasLogout) {
            $.ajax({
                type: "GET", cache: false, timeout: 20000, async: false, dataType: "json",
                url: "/Home/Logout"
            });
        }
    },

    CheckTime: function (timeLimited, url) {
        $('#timer').timer({
            delay: 1000,
            repeat: 15,
            autostart: true,
            callback: function (index) {
                if (index === timeLimited) {
                    $('#timer').timer('stop');
                    Helper.HasLogout = true;
                    Helper.MemberLogout();
                    window.location.href = url;
                }
            }
        });
    },

    StringFormat: function (s, arguments) {
        if (s == null) return "";
        for (var i = 0; i < arguments.length; i++) {
            var reg = Helper.getStringFormatPlaceHolderRegEx(i);
            s = s.replace(reg, (arguments[i] == null ? "" : arguments[i]));
        }
        return s.replace(Helper.getStringFormatPlaceHolderRegEx("\\d+"), "");
    },

    getStringFormatPlaceHolderRegEx: function (placeHolderIndex) {
        return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
    }
}