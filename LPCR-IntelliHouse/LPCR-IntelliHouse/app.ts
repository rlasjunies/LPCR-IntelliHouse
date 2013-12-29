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
    var el = document.getElementById('timer1');
    var t = new Timer(el);
    t.start();
};

$( "#page-write" ).on( "pageinit", function () {
    console.log( "before back!" );
    history.back( -1 );
    console.log( "back done!" );
});


//$(document).on( "swipeleft", ".ui-page", function ( event ) {
//    // Get the filename of the next page. We stored that in the data-next
//    // attribute in the original markup.
//    var next = $( this ).jqmData( "next" );
//    // Check if there is a next page and
//    // swipes may also happen when the user highlights text, so ignore those.
//    // We're only interested in swipes on the page.
//    if ( next && ( event.target === $( this )[0] ) ) {
//        navnext( next );
//    }
//});


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
function openDeviceViewWrite( language, machine_name, address, type ) {
    var url = "/goform/Controller?req=device_view_write_form&lang=" + language;
    url += "&machine_name=" + machine_name;
    url += "&address=" + address;
    url += "&type=" + type;
    url = encodeAGP( url );
    window.open( url, 'subwin', 'width=700,height=200,drectoriesion=no,menubar=no,scrollbars=no,status=no,resizable=no' );
}

//On Internet Explorer 6, the screen will close when logging off.
function closeConfirm() {
    if ( !confirm( "Log off?" ) ) {
        return false;
    } else {
        window.parent.close();
    }
}
