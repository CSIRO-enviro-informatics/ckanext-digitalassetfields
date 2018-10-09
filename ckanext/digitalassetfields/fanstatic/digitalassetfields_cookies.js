
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    var encodedString = ( window.btoa(value) || "") ;
    document.cookie = name + "=" + encodedString  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
            var cookie_value = c.substring(nameEQ.length, c.length);
            var decodedString = window.atob(cookie_value);
            return decodedString;
        }
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;expires=Thu, 01-Jan-1970 00:00:01 GMT; ';
}


