/// <reference path="libs/d.ts/jquerymobile.d.ts" />
/// <reference path="libs/d.ts/jquery.d.ts" />

class Timer {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

window.onload = () => {
    //var el = document.getElementById('timer1');
    //var t = new Timer(el);
    //t.start();
};

class Automate {
    machine: string = "<35>INTERNAL"; //#INTERNAL
    urlpost: string = "/goform/Controller?req=device_view_write&lang=en";
    urlget: string = "/goform/Controller?req=device_view_monitor&lang=en";

    post( address: string, value: string, type?: string): void {
        //console.log( "automate.post - begin" );
        if ( !type ) { type = "bit" } //default value of type

        var posting = $.post(this.urlpost, {
		                machine_name: this.machine,
		                address: address,
		                type: type,
		                data: value
        });

        posting.done( function ( data ) {
            //console.log( "posting.done:" + JSON.stringify( data ) );
            if ( $(data).find("p .error").length != 0 ) {
                //console.log( "errour found:" + JSON.stringify( $( data ).find( "p .error" ).text()));
                popupError( $( data ).find( "p .error" ).text() );
            }
        });
        //console.log( "automate.post - end" );
    }
                      
    //var url = "/goform/Controller?req=device_view_monitor&lang=<#language#>";
    //url += "&machine_name=" + document.device_view_form.machine_name.value;
    //url += "&point=" + document.device_view_form.point.value;
    //url += "&update=" + document.device_view_form.update.value;
    //url += "&address=" + document.device_view_form.address.value;
    //url += "&type=" + document.device_view_form.type.value;
    //url = encodeAGP( url );
    //parent.monitor.location.href = url;
    get( address: string, callback: (data:string)=>void) :void {
        //console.log( "automate.get - begin" );
        var url: string = this.urlget;
        url += "&machine_name=" + this.machine;
        url += "&point=1";
        url += "&update=300";
        url += "&address=" + address;
        url += "&type=bit";
        url = encodeAGP( url );
        console.log( "automate.get - url:" + url );
        
        $.get( url, function ( data: any ) {
            //console.log ( "Automate.get - data :" + JSON.stringify( data ));
            var val = $( data ).find( ".device-monitor-value" );
            if ( val.length != 0 ) {
                console.log( "device value found:" + val.text()  );
                callback( val.text() );
            } else {
                console.log( "device value NOT found!!");
            }
        });
        //console.log( "automate.get - end" );
    }
}

function popupError( data: string ) {
    alert( "error communicating with the automate:\n\r" + data );
}
function autoPost( address: string, value: string ) {
    var automate: Automate = new Automate();
    automate.post( address, value );
}
function autoGet( address: string, callback:(data)=> void ) {
    var automate: Automate = new Automate();
    automate.get( address, callback);
}

// GoAhead is not processing properly even though it is encoded using JavaScript
// Implement an encoding function for the text
// An encoding method:
// "<" + text to be encoded in ASCII (decimal) + ">"
function encodeAGP( data ) {
    var ret = data;
    ret = data.replace( /#/g, "<35>" );
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
    if ( !confirm( "Log off?" ) ) {
        return false;
    } else {
        window.parent.close();
    }
}
