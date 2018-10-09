"use strict";

//required digitalassetfields_cookies.js
var handleDigitalAssetEvent = function(eventName) {
    const cookie_name = eventName;
    const cookie = getCookie(cookie_name);
    const verb_lookup = {
        'digitalasset-register' : 'registered',
        'digitalasset-update' : 'updated'
    }
    if (cookie) {
        var c = JSON.parse(cookie);
        console.log(c);
        if(c.state == 'submitted') {
            //cleanup cookie
            c.state = 'notification-sent';

            setCookie(cookie_name, JSON.stringify(c));
            eraseCookie(cookie_name);
            const message = "You have successfully "  + verb_lookup[eventName] + " a digital asset."
            new Noty({
                theme: 'relax',
                type: 'success',
                layout: 'centerRight',
                timeout: 3000,
                text: message
            }).on('afterShow', function() {
                console.log("noty success");
            }).show();
        }
    }
};


ckan.module('digitalassetfields_notifications', function ($) {
    return {
        initialize: function () {
            console.log("I've been initialized for element: ", this.el);

            console.log("this");
            console.log(this);
            console.log("this.options");
            console.log(this.options);

            //handle events where notification is scheduled and info passed via cookies
            if( $('input#_digitalassetfields_notification').length )  {
                handleDigitalAssetEvent('digitalasset-register')
                handleDigitalAssetEvent('digitalasset-update')
            }


            if(this.options.action == 'new') {
                new Noty({
                    theme: 'relax',
                    type: 'info',
                    layout: 'centerLeft',
                    text: 'Thanks for taking the time to register a new digital asset. If you are new to this, the only required field in this stage is the title.',
                })
                    .on('afterShow', function() {
                        console.log("noty");
                    })
                    .show();
            }


        }
    };
});
