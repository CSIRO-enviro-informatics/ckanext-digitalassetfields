"use strict";

ckan.module('digitalassetfields_tooltips', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      //find the label associated
      const cg = $(this.el).closest('div.control-group');
      console.log(cg);
      const cgLabel = cg.find('label.control-label');
      console.log(cgLabel);

      if(this.options.hasOwnProperty('tooltip')) {
         console.log('Tooltip: ' + this.options.tooltip);
      }

      cgLabel.popover({title: 'Info', html: true,
                       content: this._(this.options.tooltip), trigger: 'hover', placement: 'left'});

    }
  };
});
