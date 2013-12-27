
// GoAhead is not processing properly even though it is encoded using JavaScript
// Implement an encoding function for the text
// An encoding method:
// "<" + text to be encoded in ASCII (decimal) + ">"
function encodeAGP(data)
{
    var ret = data;
    ret = data.replace(/#/g, "<35>");

    return ret;
}

// Device View - Open write dialog box.
function openDeviceViewWrite(language, machine_name, address, type)
{
    var url = "/goform/Controller?req=device_view_write_form&lang=" + language;
    url += "&machine_name=" + machine_name;
    url += "&address=" + address;
    url += "&type=" + type;
    url = encodeAGP(url);
    window.open(url,'subwin','width=700,height=200,drectoriesion=no,menubar=no,scrollbars=no,status=no,resizable=no');
}

//On Internet Explorer 6, the screen will close when logging off.
function closeConfirm() {
    if(!confirm("Log off?")) {
        return false;
    } else {
        window.parent.close();
    }
}
