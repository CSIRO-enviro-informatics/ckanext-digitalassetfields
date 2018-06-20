"use strict";

ckan.module('digitalassetfields_filebox', function ($) {
  return {
    initialize: function () {
      console.log("digitalassetfields_filebox :: I've been initialized for element: ", this.el);

      const $weblink_type_url_field_container = $('#weblink_type_url_field');
      const $fileshare_type_url_field_container = $('#fileshare_type_url_field');
      const $real_url_field = $('#field-image-url');
      const $fileshare_type_radio = $('input[type=radio][name=resource_location_type][value=file]');
      const $weblink_type_radio = $('input[type=radio][name=resource_location_type][value=http]');
      const $select_notification = $('#filebox_select_notification');
      const $filebox_fileshare_string_error = $('#filebox_fileshare_string_error');
      const $filebox_weblink_string_error = $('#filebox_weblink_string_error');

      $('#filebox_loading_notification').addClass('hidden');
      $select_notification.removeClass('hidden');

      if ($weblink_type_radio.prop('checked')) {
        $weblink_type_url_field_container.removeClass('hidden');
      } else if ($fileshare_type_radio.prop('checked')) {
        $fileshare_type_url_field_container.removeClass('hidden');
      }


      $('input[type=text]',$weblink_type_url_field_container).change(function(){
        let newval = $(this).val();
        if (newval.startsWith('https://') || newval.startsWith('http://')) {
          $filebox_weblink_string_error.addClass('hidden');
          $real_url_field.val(newval)
        } else {
          $filebox_weblink_string_error.removeClass('hidden');
        }

      });

      $('input[type=text]',$fileshare_type_url_field_container).change(function(){
        let newval = $(this).val();
        $filebox_fileshare_string_error.addClass('hidden');
        if (newval.startsWith('file://')) {
          newval = newval.replace('\\','/');
          $real_url_field.val(newval)
        } else if (newval.startsWith('\\\\')) {
          newval = newval.replace('\\\\',"file://").replace('\\','/');
          $real_url_field.val(newval);
        } else {
          $filebox_fileshare_string_error.removeClass('hidden');
        }
      });


      $('input[type=radio][name=resource_location_type]').change(function() {
        $select_notification.addClass('hidden');
        if (this.value == 'http') {
            $weblink_type_url_field_container.removeClass('hidden');
            $fileshare_type_url_field_container.addClass('hidden');

        }
        else if (this.value == 'file') {
            $weblink_type_url_field_container.addClass('hidden');
            $fileshare_type_url_field_container.removeClass('hidden');
        } else {
          $select_notification.removeClass('hidden');
        }
      });

      $('form#resource-edit').submit(function(ev){
        if (!($fileshare_type_url_field_container.hasClass('hidden')) && !($filebox_fileshare_string_error.hasClass('hidden'))) {
          ev.preventDefault();
          return false;
        }
        if (!($weblink_type_url_field_container.hasClass('hidden')) &&!($filebox_weblink_string_error.hasClass('hidden'))) {
          ev.preventDefault();
          return false;
        }
        return true;
      });

    }
  };
});
