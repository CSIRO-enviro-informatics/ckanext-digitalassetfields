"use strict";


ckan.module('digitalassetfields_manual_tooltip', function ($) {
  return {
    initialize: function () {
      console.log('in digitalassetfields_manual_tooltip');
      console.log(this);
      console.log(this.options);
      console.log(this.el);
      var helpIcon = $(this.el);
      helpIcon.popover({title: '', html: true, container: 'body',
                       content: this._(this.options.tooltip), trigger: 'click', delay: {"hide": 500}, placement: 'left'});
      $('body').on('click', function (e) {
         $('[data-toggle=popover]').each(function () {
           // hide any open popovers when the anywhere else in the body is clicked
           if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
              $(this).popover('hide');
           }
       });
     });
    }
  };
});

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
      helpIcon.popover({title: title, html: true, container: 'body',
                       content: this._(this.options.tooltip), trigger: 'click', delay: {"hide": 500}, placement: 'left'});

      helpIcon.on('click', function(e) {
           e.preventDefault();
              //new Noty({
              // theme: 'relax',
              // type: 'success',
              // timeout: 2000,
              // layout: 'topRight',
              // text: 'Some notification text'
              //})
              //.on('afterShow', function() {
              //   console.log("noty");
              // })
             // .show();

           return true;});
      cgLabel.append(" ", helpIcon);
      //cgLabel.popover({title: 'Info', html: true,
      //                 content: this._(this.options.tooltip), trigger: 'focus click hover', placement: 'left'});

      $('body').on('click', function (e) {
         $('[data-toggle=popover]').each(function () {
           // hide any open popovers when the anywhere else in the body is clicked
           if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
              $(this).popover('hide');
           }
       });
     });

    }
  };
});
