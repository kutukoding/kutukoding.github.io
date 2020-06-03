/**
 * @class custom class
 */

var custom = function () {
  var datatable = function () {
    $('.js-datatable').DataTable();
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