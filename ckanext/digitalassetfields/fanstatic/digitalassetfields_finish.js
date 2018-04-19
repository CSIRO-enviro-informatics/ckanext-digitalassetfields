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

      $(this.el).on('click', function(e) {
	 console.log("Finish clicked!");
	 e.preventDefault();
	      /*
         new Noty({
               theme: 'relax',
               type: 'alert',
               layout: 'center',
               text: 'You are about to register an asset...!',
		buttons: [
			     Noty.button('Confirm registration', 'btn btn-success', function () {
				             console.log('button 1 clicked');
				         }, {id: 'button1', 'data-status': 'ok'}),

			     Noty.button('Cancel', 'btn btn-error', function () {
				             console.log('button 2 clicked');
				             n.close();
				         })
			   ]
              })
              .on('afterShow', function() {
                 console.log("noty");
               })
             .show();
	      */
        });
     }

    }
});
