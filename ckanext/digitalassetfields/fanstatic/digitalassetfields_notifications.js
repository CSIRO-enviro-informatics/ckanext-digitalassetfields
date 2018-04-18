"use strict";


ckan.module('digitalassetfields_notifications', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);

      console.log("this");
      console.log(this);
      console.log("this.options");
      console.log(this.options);

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
