var ObjRegex = {
    regPhoneNumber: /\d{10}/,
    regHKPhoneNumber: /^\d{8}$/,
    regTWPhoneNumber: /^\d{10}$/,
    regPassword: /^(?=.*\d)(?=.*[a-zA-Z])(\W*).{8,20}$/,
    regEmail: /[\w\.-]{1,}@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]/,
    regNumber: /^[0-9]*$/,
    regPersonalID: /([A-Z]|[a-z])\d{9}/,
    regSecurityCode: /^(\d{6},)*\d{6}$/,
    regPhoneOTP: /^\d{6}$/,
    regUrlImgFileName: /\"|\'|\)/g,

    IsPhoneNumber: function (strPhone) {
        if (strPhone === null || strPhone === "") {
            return false;
        }

        var regPhone = ObjRegex.regPhoneNumber;
        if (regPhone.test(strPhone)) {
            return true;
        }
        return false;
    },

    IsEmail: function (strEmail) {
        if (strEmail === null) {
            return false;
        }

        var regEmail = ObjRegex.regEmail;
        if (regEmail.test(strEmail)) {
            return true;
        }
        return false;
    },

    IsSecurityCode: function (strSecurityCode) {
        if (strSecurityCode === null || strSecurityCode === "") {
            return false;
        }

        var regSecurityCode = ObjRegex.regSecurityCode;
        if (regSecurityCode.test(strSecurityCode)) {
            return true;
        }
        return false;
    },

    IsNumber: function (str) {
        if (str === null || str === "") {
            return false;
        }

        var regNumber = ObjRegex.regNumber;
        if (regNumber.test(str)) {
            return true;
        }
        return false;
    },

    IsPassword: function (strPassword) {
        if (strPassword === null || strPassword === "") {
            return false;
        }

        var regPassword = ObjRegex.regPassword;
        if (regPassword.test(strPassword)) {
            return true;
        }
        return false;
    }
}