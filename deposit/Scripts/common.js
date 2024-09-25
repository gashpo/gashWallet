var Common = {

    RecordEvent: function (category, action) {
        try {
            var pageTracker = _gat._createTracker(account);
            pageTracker._trackEvent(category, action);
        } catch (err) { }
    },

    ClearMobileText: function (t) {
        if (t.value.search("碼") > 0 || t.value == "輸入手機號碼") t.value = "";
    },

    SetMobileText: function (t) {
        var previousElementSibling = Common.GetPreviousElementSibling(t);
        if (t.value == "") {
            var strRegion = Common.ChooseCountryCode(previousElementSibling);
            var result = Common.RegionSettings(strRegion);
            t.value = result;
        }
    },

    ClearText: function (t) {
        if (t.value == t.defaultValue) t.value = "";
    },

    SetText: function (t) {
        if (t.value == "") t.value = t.defaultValue;
    },

    ClearPassword: function (t, obj) {
        if (t.value == t.defaultValue) {
            obj.removeClass("changeToPassword");
            obj.focus();
            $("#" + t.id).addClass("changeToPassword");
        }
    },

    SetPassword: function (t, obj) {
        if (t.value == '') {
            $("#" + t.id).addClass("changeToPassword");
            obj.removeClass("changeToPassword");
        }
    },

    ResetPasswordInput: function (t) {
        if (t.type === 'password') {
            $("#" + t.id).addClass("changeToPassword");
            $("#fake" + t.id).removeClass("changeToPassword");
            t.value = '';
        }
    },

    HasDefalutValue: function (obj) {
        if (obj.value === obj.defaultValue || obj.value === "") {
            return true;
        }
        return false;
    },

    CheckPhoneNumber: function (mobile) {
        if (mobile.value !== mobile.defaultValue) {
            var strRegion = mobile.previousElementSibling.value;
            if (ObjRegex.IsPhoneNumber(strRegion, mobile.value)) {
                $(mobile).parent().removeClass("imgHidden");
                $(mobile).parent().addClass("errorHidden");
            }
            else {
                $(mobile).parent().addClass("imgHidden");
                $(mobile).parent().removeClass("errorHidden").find(".RED").text("手機號碼有誤");
            }
        }
        else {
            $(mobile).parent().addClass("imgHidden");
            $(mobile).parent().addClass("errorHidden");
        }
    },

    CheckEmail: function (obj) {
        if (obj.value !== obj.defaultValue) {
            if (ObjRegex.IsEmail(obj.value)) {
                $(obj).parent().removeClass("imgHidden");
                $(obj).parent().addClass("errorHidden");
            }
            else {
                $(obj).parent().addClass("imgHidden");
                $(obj).parent().removeClass("errorHidden").find(".RED").text("Email格式不正確");
            }
        }
        else {
            $(obj).parent().addClass("imgHidden");
            $(obj).parent().addClass("errorHidden");
        }
    },

    CheckEmailAgain: function (obj) {
        if ($("#newEmailAgain").val() !== obj.defaultValue && $("#newEmailAgain").val() !== $("#newEmail").val()) {
            $(obj).parent().addClass("imgHidden");
            $(obj).parent().removeClass("errorHidden").find(".RED").text("與新Email不符");
        }
    },

    CheckPassword: function (obj) {
        var target = ($(obj).parent().attr("title") == undefined) ? $(obj).parent() : $(obj).parent().parent();
        if (obj.value === obj.defaultValue) {
            target.addClass("imgHidden");
            target.addClass("errorHidden");
        }
        else if (ObjRegex.IsPassword(obj.value)) {
            target.removeClass("imgHidden");
            target.addClass("errorHidden");
        }
        else {
            target.addClass("imgHidden");
            target.removeClass("errorHidden").find(".RED").text("密碼設定有誤");
        }
    },

    CheckPasswordAgain: function (obj) {
        if (obj.value === obj.defaultValue) {
            target.addClass("imgHidden");
            target.addClass("errorHidden");
        }
        else if ($("#password").val() !== $("#passwordAgain").val()) {
            $(obj).parent().addClass("imgHidden");
            $(obj).parent().removeClass("errorHidden").find(".RED").text("輸入錯誤");
        }
        else {
            $(obj).parent().removeClass("imgHidden");
            $(obj).parent().addClass("errorHidden");
        }
    },

    CheckSecurityCode: function (obj) {
        debugger;
        var target = ($(obj).parent().attr("title") == undefined) ? $(obj).parent() : $(obj).parent().parent();
        if (obj.value === obj.defaultValue) {
            target.addClass("imgHidden");
            target.addClass("errorHidden");
        }
        else if (ObjRegex.IsSecurityCode(obj.value)) {
            target.removeClass("imgHidden");
            target.addClass("errorHidden");
        }
        else {
            target.addClass("imgHidden");
            target.removeClass("errorHidden").find(".RED").text("安全鎖設定有誤");
        }
    },

    CheckSecurityCodeAgain: function (obj) {
        if ($("#newSecurityCode").val() !== $("#newSecurityCode2").val()) {
            $(obj).parent().addClass("imgHidden");
            $(obj).parent().removeClass("errorHidden").find(".RED").text("輸入錯誤");
        }
        else if ($("#newSecurityCode2").val() === obj.defaultValue) {
        }
        else {
            $(obj).parent().removeClass("imgHidden");
            $(obj).parent().addClass("errorHidden");
        }
    },

    CheckSecurityCode_pop: function (obj) {
        var target = ($(obj).parent().attr("title") == undefined) ? $(obj).parent() : $(obj).parent().parent();
        if (obj.value === obj.defaultValue) {
            target.addClass("imgHidden");
            target.addClass("errorHidden");
        }
        else if (ObjRegex.IsSecurityCode(obj.value)) {
            target.removeClass("imgHidden");
            target.addClass("errorHidden");
            $("#securityBoxMessage").html("&nbsp;");
        }
        else {
            target.addClass("imgHidden");
            target.removeClass("errorHidden");
            $("#securityBoxMessage").css("display", "block");
            $("#securityBoxMessage").text("安全鎖設定有誤");
        }
    },

    ValiadPhoneOTP: function (strPhoneOTP) {
        return ObjRegex.IsPhoneOTP(strPhoneOTP);
    },

    ResendOTP: function (strRegion, strMobile, strVerifyType) {
        var result = "0";
        if (ObjRegex.IsPhoneNumber(strRegion, strMobile)) {
            $.ajax({
                type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
                url: "/Account/ResendOTP",
                data: { "Region": strRegion, "Mobile": strMobile, "VerifyType": strVerifyType },
                success: function (data) {
                    result = data;
                },
                error: function (e) {
                    //alert('error');
                }
            });
        }
        else {
            result = "2";
        }
        return result;
    },

    VerifyPhoneOTP: function (strVerifyCode, strRegion, strMobile, strType, strAppRegion) {
        var result = "0";
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Account/VerifyPhoneNumber",
            data: { "VerifyCode": strVerifyCode, "Region": strRegion, "Mobile": strMobile, "Type": strType, "AppRegion": strAppRegion },
            success: function (data) {
                result = data;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return result;
    },

    GetCatalog: function (strID) {
        var result;
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Help/GetCatalog",
            data: { "ID": strID },
            success: function (data) {
                result = data;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return result;
    },

    ConvertDate: function (jsonDate) {
        var value = new Date(parseInt(jsonDate.substr(6)));
        var min = value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
        var sec = value.getSeconds() < 10 ? "0" + value.getSeconds() : value.getSeconds();
        return value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + value.getDate() + " " + value.getHours() + ":" + min + ":" + sec;
    },

    ConvertDateToMilli: function (jsonDate) {
        var value = new Date(parseInt(jsonDate.substr(6)));
        var min = value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
        var sec = value.getSeconds() < 10 ? "0" + value.getSeconds() : value.getSeconds();
        var milli = value.getMilliseconds() < 10 ? "00" + value.getMilliseconds() : value.getMilliseconds();
        milli = value.getMilliseconds() < 100 ? "0" + value.getMilliseconds() : value.getMilliseconds();
        return value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + value.getDate() + " " + value.getHours() + ":" + min + ":" + sec + "." + milli;
    },

    GetTrans: function (strWalletID, strClassifyType, strFetchTime, blIsNewer) {
        var result = "";
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json", contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            url: "/Card/Trans",
            data: { "WalletID": strWalletID, "ClassifyType": strClassifyType, "FetchTime": strFetchTime, "IsNewer": blIsNewer },
            success: function (obj) {
                if (obj === 0)
                    result = "[]";
                else
                    result = obj;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return result;
    },

    GetDeduct: function (strWid) {
        var objDetail;
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Card/GetDeduct",
            data: { "Wid": strWid },
            success: function (result) {
                objDetail = result;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return objDetail;
    },

    GetDeposit: function (strWid) {
        var objDetail;
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Card/GetDeposit",
            data: { "Wid": strWid },
            success: function (result) {
                objDetail = result;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return objDetail;
    },

    GetUsedDepositInfo: function (strWid) {
        var objDetail;
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Card/GetUsedDepositInfo",
            data: { "Wid": strWid },
            success: function (result) {
                objDetail = result;
            },
            error: function (e) {
                //alert('error');
            }
        });
        return objDetail;
    },

    CheckCaptcha: function (captchaObj, userInput) {
        var checkResult;
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Home/CheckCaptcha",
            data: { "CaptchaID": captchaObj.Id, "UserInput": userInput, "InstanceID": captchaObj.InstanceId },
            success: function (result) {
                checkResult = result;
                if (!result)
                    captchaObj.ReloadImage();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                checkResult = false;
            }
        });
        return checkResult;
    }

}