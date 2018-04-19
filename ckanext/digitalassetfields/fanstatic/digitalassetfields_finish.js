"use strict";


ckan.module('digitalassetfields_finish', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);

      console.log("this");
      console.log(this);
      console.log("this.options");
      console.log(this.options);

      $('#finish-cancel-btn').on('mouseenter', function(e) {
	 console.log("Finish cancel btn hover!");
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("cancel"));
	 $('#emoji-finish-modal').addClass('animated infinite shake');

      }).on('mouseleave', function(e) {
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("src"));
	 $('#emoji-finish-modal').removeClass('animated infinite shake');
      });

      $('#finish-register-btn').on('mouseenter', function(e) {
	 console.log("Finish register btn hover!");
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("register"));
	 $('#emoji-finish-modal').addClass('animated infinite bounce');

      }).on('mouseleave', function(e) {
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("src"));
	 $('#emoji-finish-modal').removeClass('animated infinite bounce');
      });

      $('#finish-register-btn').on('click', function(e) {
         $('form#resource-edit').submit();
      });


     }
   }
});
