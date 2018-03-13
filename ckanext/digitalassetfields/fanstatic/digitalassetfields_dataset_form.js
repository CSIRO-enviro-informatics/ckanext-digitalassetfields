// Enable JavaScript's strict mode. Strict mode catches some common
// programming errors and throws exceptions, prevents some unsafe actions from
// being taken, and disables some confusing and bad JavaScript features.
"use strict";

ckan.module('digitalassetfields_project_select', function ($) {
  return {
    initialize: function () {
      console.log("digitalassetfields_project_select - I've been initialized for element: ", this.el);

      this.el.change(function() {
         console.log( "Handler for .change() called. ", $(this) );

         url = "http://network.csiro.au:9500/standalone/projects.json?namecontains=" + $(this).value
         $.get( url, function( data ) {
            console.log( 'Querying network.csiro.au');
            console.log( data);
         });
      });
    }
  };
});

