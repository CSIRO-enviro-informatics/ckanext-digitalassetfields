"use strict";

//requires digitalassetfields_cookies.js


ckan.module('digitalassetfields_finish', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);

      console.log("this");
      console.log(this);
      console.log("this.options");
      console.log(this.options);

      window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

      if($('#_digitalassetfields_pre-update').length > 0) {
	 const data = {state: 'submitted', id: ''}
	 setCookie('digitalasset-update', JSON.stringify(data));
      }

      $('#finish-cancel-btn').on('mouseenter', function(e) {
	 console.log("Finish cancel btn hover!");
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("cancel"));
	 //$('#emoji-finish-modal').addClass('animated infinite shake');

      }).on('mouseleave', function(e) {
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("src"));
	 //$('#emoji-finish-modal').removeClass('animated infinite shake');
      });

      $('#finish-register-btn').on('mouseenter', function(e) {
	 console.log("Finish register btn hover!");
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("register"));
	 $('#emoji-finish-modal').addClass('animated infinite bounce');

      }).on('mouseleave', function(e) {
	 $('#emoji-finish-img').attr('src', $('#emoji-finish-img').data("src"));
	 $('#emoji-finish-modal').removeClass('animated infinite bounce');
      });
     $('#finish-register-btn').off("click");
      $('#finish-register-btn').on('click', function(e) {
        console.log("Submit Clicked")
	 const data = {state: 'submitted', id: ''}
	 setCookie('digitalasset-register', JSON.stringify(data));
	       var target_group_url = window.location.protocol + "//" + window.location.host + "/";
         var path_parts = window.location.pathname.split('/');
         var dataset_name = path_parts.pop() || path_parts.pop();
	       target_group_url = target_group_url + "dataset/groups/" + dataset_name;
	       console.log("target group url " + target_group_url);
        var target = document.getElementById('_digitalassetfields_pre-update');
        $('#emoji-finish-modal').addClass('animated infinite flash');
	      $('#finish-register-btn').hide();
        $('#finish-cancel-btn').hide();
        $.post(target_group_url, { group_added: "6d9337de-8140-4911-9a3f-8c02cdc166fa" },
          function(returnedData){
            console.log("registered with local group");
          $('#emoji-finish-modal').removeClass('animated infinite flash');
          }).fail(function(){
          console.log("error adding dataset to group");
          $('#emoji-finish-modal').removeClass('animated infinite flash');
        });
         $('form#resource-edit').submit();
      });


     }
   }
});
