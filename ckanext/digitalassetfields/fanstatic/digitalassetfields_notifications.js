"use strict";

//required digitalassetfields_cookies.js

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
         const cookie = getCookie('digitalasset-register');
         if (cookie) {
             var c = JSON.parse(cookie);
             console.log(c);
             if(c.state == 'submitted') {
		//cleanup cookie
		//setCookie('digitalasset-register', ''); 
		c.state = 'notification-sent';
		setCookie('digitalasset-register', JSON.stringify(c)); 
		eraseCookie('digitalasset-register');

                new Noty({
	              theme: 'relax',
	               type: 'success',
	               layout: 'centerRight',
	               timeout: 3000,
	               text: 'You have successfully registered a new digital asset.'
	              })
                   .on('afterShow', function() {
                    console.log("noty success");
                  })
                  .show();

             }
         }
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
