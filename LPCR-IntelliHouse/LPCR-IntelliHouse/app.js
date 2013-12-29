/// <reference path="libs/d.ts/jquerymobile.d.ts" />
/// <reference path="libs/d.ts/jquery.d.ts" />
var Timer = (function () {
    function Timer(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Timer.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Timer.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Timer;
})();

window.onload = function () {
    //var el = document.getElementById('timer1');
    //var t = new Timer(el);
    //t.start();
};

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

    //var url = "/goform/Controller?req=device_view_monitor&lang=<#language#>";
    //url += "&machine_name=" + document.device_view_form.machine_name.value;
    //url += "&point=" + document.device_view_form.point.value;
    //url += "&update=" + document.device_view_form.update.value;
    //url += "&address=" + document.device_view_form.address.value;
    //url += "&type=" + document.device_view_form.type.value;
    //url = encodeAGP( url );
    //parent.monitor.location.href = url;
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

// Device View - Open write dialog box.
//function openDeviceViewWrite( language, machine_name, address, type ) {
//    var url = "/goform/Controller?req=device_view_write_form&lang=" + language;
//    url += "&machine_name=" + machine_name;
//    url += "&address=" + address;
//    url += "&type=" + type;
//    url = encodeAGP( url );
//    window.open( url, 'subwin', 'width=700,height=200,drectoriesion=no,menubar=no,scrollbars=no,status=no,resizable=no' );
//}
//On Internet Explorer 6, the screen will close when logging off.
function closeConfirm() {
    if (!confirm("Log off?")) {
        return false;
    } else {
        window.parent.close();
    }
}
//# sourceMappingURL=app.js.map
