"use strict";

ckan.module('digitalassetfields_tooltips', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      //find the label associated
      const currEl = $(this.el);
      const cg = $(this.el).closest('div.control-group');
      console.log(cg);
      const cgLabel = cg.find('label.control-label');
      console.log(cgLabel);

      console.log("this");
      console.log(this);
      console.log("this.options");
      console.log(this.options);

      if(this.options.hasOwnProperty('tooltip')) {
         console.log('Tooltip: ' + this.options.tooltip);
      }


      if(this.options.hasOwnProperty('add_help_icon')) {
         console.log('Add help icon: ' + this.options.add_help_icon);
 
      }


      const helpIcon = $('<i class="fa fa-question-circle"></i>')
      const title = cgLabel.text();
      const content = "<p>" + cgLabel.text() + "</p>";
      helpIcon.popover({title: title, html: true,
                       content: this._(this.options.tooltip), trigger: 'click', delay: {"hide": 500}, placement: 'left'});

      cgLabel.append(" ", helpIcon);
      //cgLabel.popover({title: 'Info', html: true,
      //                 content: this._(this.options.tooltip), trigger: 'focus click hover', placement: 'left'});

    }
  };
});
