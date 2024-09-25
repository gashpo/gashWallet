var Message = {
    Show: function (eleConform, txtButton, intWidth) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            modal: true,
            open: function (event, ui) {
                $('.ui-widget-overlay').click(function (event, ui) {
                    $(eleConform).dialog("close");
                });
            },
            buttons: [
                {
                    text: txtButton,
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
        var t = $(".conform p");
        t.html(t.text().replace(/\\n/, '<br />'));
        $(eleConform).dialog("open");
    },

    ShowAndRedirect: function (eleConform, txtButton, intWidth, Url) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            modal: true,
            open: function (event, ui) {
                $('.ui-widget-overlay').click(function (event, ui) {
                    $(eleConform).dialog("close");
                });
            },
            buttons: [
                {
                    text: txtButton,
                    click: function () {
                        window.location.href = Url;
                    }
                }
            ]
        });
        var t = $(".conform p");
        t.html(t.text().replace(/\\n/, '<br />'));
        $(eleConform).dialog("open");
    },

    EditData: function (eleConform, txtButton, intWidth, doThings) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            modal: true,
            buttons: [
                {
                    text: txtButton,
                    click: function () {
                        doThings();
                        $(this).dialog("close");
                    }
                }
            ]
        });
        $(eleConform).dialog("open");
    },

    EditDataAndShowMsg: function (eleConform, txtButton, intWidth, doThings) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            closeOnEscape: false,
            modal: true,
            buttons: [
                {
                    text: txtButton,
                    click: function () {
                        doThings();
                    }
                }
            ]
        });
        $(eleConform).dialog("open");
    },

    EditDataAndShowMsgExt: function (eleConform, txtButton, intWidth, doThings, extFun, obj) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            closeOnEscape: false,
            modal: true,
            buttons: [
                {
                    text: txtButton,
                    click: function () {
                        doThings(extFun, obj);
                    }
                }
            ]
        });
        $(eleConform).dialog("open");
    },

    ConformData: function (eleConform, intWidth, txtLeftButton, doLeftThings, txtRightButton, doRightThings) {
        $(eleConform).dialog({
            autoOpen: false,
            resizable: false,
            width: intWidth,
            modal: true,
            buttons: [
                {
                    text: txtLeftButton,
                    click: function () {
                        doLeftThings();
                        $(this).dialog("close");
                    }
                },
				{
				    text: txtRightButton,
				    click: function () {
				        if (doRightThings()) {
				            $(this).dialog("close");
				        }
				    }
				}
            ]
        });
        $(eleConform).dialog("open");
    },

    PreviewImage: function (eleConform, imgConform, uri) {
        $(imgConform).attr('src', uri);

        $(eleConform).dialog({
            modal: true,
            resizable: false,
            draggable: false,
            width: 'auto'
        });
        $(eleConform).dialog("open");
    }
};