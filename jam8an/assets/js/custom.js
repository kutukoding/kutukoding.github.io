/**
 * @class custom class
 */

var custom = function () {
  var datatable = function () {
    if ($('.js-datatable').length) {
      $('.js-datatable').DataTable({
        dom: '<"top">rt<"bottom"lip><"clear">',
        searching: false,
        responsive: true,
        language: {
          paginate: {
            previous: "Prev"
          },
          lengthMenu: "_MENU_",
          info: "Showing _START_ to _END_ of _TOTAL_"
        }
      });
    }
  }

  var select2 = function () {
    if ($('.js-select2').length) {
      $('.js-select2').select2();
    }
  }

  var select2_assigne = function () {
    if ($('.js-select2--asigne').length) {
      $('.js-select2--asigne').select2({
        templateSelection: function (data) {
          var r = data.text.split('|');
          var $result = $(
            `
          <div class="avatar-select2-selected">
            <div class="avatar-select2-selected__image">
              <img src="${r[0]}" alt="${r[1]}">
            </div>
            <span class="avatar-select2-selected__name">${r[1]}</span>
          </div>
          `
          );
          return $result;
        },
        templateResult: function (data) {
          var r = data.text.split('|');
          var $result = $(
            `
          <div class="row">
            <div class="col-md-1">
              <div class="avatar-select2">
                <img class="w-2r bdrs-50p" src="${r[0]}" alt="${r[1]}">
              </div>
            </div>
            <div class="col-md-11 d-flex align-items-center"> ${r[1]} </div>
          </div>
          `
          );
          return $result;
        }
      });
    }
  }

  var custom_mobile_device = function() {
    $(".sidebar-toggle").click(function() {
      if(!$(".overlay-device").length > 0) {
        $(".page-container").prepend("<div class='overlay-device'></div>");
        $(".overlay-device").click(function() {
          $(".overlay-device").remove();
          $("body").removeClass("is-collapsed")
        })
      }
    })
  }

  var upload_image = function() {
    $(".mobile-toggle").click(function() {
      $(".overlay-device").remove();
    })
    $("#imgUpload").change(function() {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          $('#imagePreview').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(this.files[0]); // convert to base64 string
      }
    });
    $("#imagePreview").click(function() {
      $("#imgUpload").trigger("click");
    })
  }

  return {
    init: function () {
      datatable();
      select2();
      select2_assigne();
      custom_mobile_device();
      upload_image();
    }
  }
}();

$(document).ready(function () {
  custom.init();
})