"use strict";

var digitalassetfields_restricted_render_restricted = function(d) {
         console.log(' digitalassetfields_restricted_render_restricted called ');
         console.log(d);
         console.log($('#access-icon'));
         console.log($('#access-text'));

         const data = JSON.parse(d);
         if(data['level'] == 'only_allowed_users') {
            $("#access-icon").removeClass();
            $("#access-icon").addClass('fa fa-users');
            $("#access-text").text('Allowed users: ' + data['allowed_users']);
         }
         else if(data['level'] == 'public') {
            $("#access-icon").removeClass();
            $("#access-icon").addClass('fa fa-unlock');
            $("#access-text").text('General access');
         }
         else if(data['level'] == 'registered') {
            $("#access-icon").removeClass();
            $("#access-icon").addClass('fa fa-lock');
            $("#access-text").text('Registered users');
         }
         else if(data['level'] == 'same_organization') {
            $("#access-icon").removeClass();
            $("#access-icon").addClass('fa fa-home');
            $("#access-text").text('Same organizational unit');
            console.log("Changing text to org unit");
         }
         else {
            $("#access-icon").removeClass();
            $("#access-icon").addClass('fa fa-unlock');
            $("#access-text").text('General access');
            console.log("Changing text to genereal access");
         }
         console.log("set access-icon and access-text");
};

var digitalassetfields_restricted_check_radio = function(d) {
         const data = JSON.parse(d);
         var $radios = $('input:radio[name=optradio]');

         console.log(data.level);
 
         $radios.filter('[value=' + data.level + ']').prop('checked', true);

};

ckan.module('digitalassetfields_restricted', function ($) {
  return {
    initialize: function () {
      console.log("digitalassetfields_restricted :: I've been initialized for element: ", this.el);

      const currEl = $(this.el);

      console.log("this");
      console.log(this);
      console.log("this.options");
      console.log(this.options);


      //init if data is there
      const curr_restricted_data = $('input[name=restricted]').val();
      if(curr_restricted_data) {
         var rdata = JSON.parse(curr_restricted_data);
         console.log(curr_restricted_data);
         $(function() {
            digitalassetfields_restricted_render_restricted(curr_restricted_data);
            digitalassetfields_restricted_check_radio(curr_restricted_data);
         });

         
      }


      
      

      $('input[name=optradio]').on('click', function(e) {
        console.log(this);

        console.log($('input[name=optradio]:checked').val())
        const selected_access = $('input[name=optradio]:checked').val();
        if(selected_access == "only_allowed_users") {
           $('div#restricted_allowed_users').removeClass("hidden");
        }
        else {
           $('div#restricted_allowed_users').addClass("hidden");
        }

        return true;
      });

      //if completed
      $('button#restricted_save').on('click', function(e) {

         console.log("Access restrictions saved!");
         const selected_access = $('input[name=optradio]:checked').val();

         var a_users = '';
         if(selected_access == "only_allowed_users") {
            var d = $('#field-allowed_users')
            console.log(d);
            console.log(d[0].value);
            a_users = d[0].value;
         }
         var data = { 'level': selected_access , 'allowed_users': a_users }

         console.log(data);

         console.log($('input[name=restricted]').val());
         const datastr = JSON.stringify(data);
         $('input[name=restricted]').val(datastr)
         console.log($('input[name=restricted]').val());

         digitalassetfields_restricted_render_restricted(datastr);


   
         return true;
      });

    }
  };
});
