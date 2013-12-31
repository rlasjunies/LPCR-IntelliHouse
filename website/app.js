/// <reference path="Scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
var Automate = (function () {
    function Automate() {
        this.machine = "<35>INTERNAL";
        this.urlpost = "/goform/Controller?req=device_view_write&lang=en";
        this.urlget = "/goform/Controller?req=device_view_monitor&lang=en";
    }
    Automate.prototype.post = function (address, value, type) {
        //console.log( "automate.post - begin" );
        if (!type) {
            type = "bit";
        }

        var posting = $.post(this.urlpost, {
            machine_name: this.machine,
            address: address,
            type: type,
            data: value
        });

        posting.done(function (data) {
            //console.log( "posting.done:" + JSON.stringify( data ) );
            if ($(data).find("p .error").length != 0) {
                //console.log( "errour found:" + JSON.stringify( $( data ).find( "p .error" ).text()));
                popupError($(data).find("p .error").text());
            }
        });
        //console.log( "automate.post - end" );
    };

    Automate.prototype.get = function (address, callback) {
        //console.log( "automate.get - begin" );
        var url = this.urlget;
        url += "&machine_name=" + this.machine;
        url += "&point=1";
        url += "&update=300";
        url += "&address=" + address;
        url += "&type=bit";
        url = encodeAGP(url);
        console.log("automate.get - url:" + url);

        $.get(url, function (data) {
            //console.log ( "Automate.get - data :" + JSON.stringify( data ));
            var val = $(data).find(".device-monitor-value");
            if (val.length != 0) {
                console.log("device value found:" + val.text());
                callback(val.text());
            } else {
                console.log("device value NOT found!!");
            }
        });
        //console.log( "automate.get - end" );
    };
    return Automate;
})();

function popupError(data) {
    alert("error communicating with the automate:\n\r" + data);
}
function autoPost(address, value) {
    var automate = new Automate();
    automate.post(address, value);
}
function autoGet(address, callback) {
    var automate = new Automate();
    automate.get(address, callback);
}

// GoAhead is not processing properly even though it is encoded using JavaScript
// Implement an encoding function for the text
// An encoding method:
// "<" + text to be encoded in ASCII (decimal) + ">"
function encodeAGP(data) {
    var ret = data;
    ret = data.replace(/#/g, "<35>");
    return ret;
}

//On Internet Explorer 6, the screen will close when logging off.
function closeConfirm() {
    if (!confirm("Log off?")) {
        return false;
    } else {
        window.parent.close();
    }
}

$("#page-lumiere").on("pagebeforeshow", function () {
    //console.log( "page-lumiere.pagebeforeshow" );
    $("#light1").flipswitch("disable").flipswitch("refresh");
    $("#light2").flipswitch("disable").flipswitch("refresh");
    autoGet("USR0000001", function (data) {
        console.log("autoget.Light1:" + data);
        if (data == 0) {
            $("#light1").val("off").flipswitch("refresh");
        } else {
            $("#light1").val("on").flipswitch("refresh");
        }
        $("#light1").flipswitch("enable").flipswitch("refresh");
    });

    autoGet("USR0000002", function (data) {
        console.log("autoget.Light2:" + data);
        if (data == 0) {
            $("#light2").val("off").flipswitch("refresh");
        } else {
            $("#light2").val("on").flipswitch("refresh");
        }
        $("#light2").flipswitch("enable").flipswitch("refresh");
    });
});
$("#light1").change(function () {
    var state = $("#light1").val();
    if (state == "on") {
        autoPost("USR0000001", 1);
    } else {
        autoPost("USR0000001", 0);
    }
});
$("#light2").change(function () {
    var state = $("#light2").val();
    if (state == "on") {
        autoPost("USR0000002", 1);
    } else {
        autoPost("USR0000002", 0);
    }
});
//# sourceMappingURL=app.js.map
