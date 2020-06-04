/**
 * @class custom class
 */

var custom = function () {
  var datatable = function () {
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

  return {
    init: function() {
      datatable();
    }
  }
}();

$(document).ready(function () {
  custom.init();
})