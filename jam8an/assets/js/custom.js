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

  var select2 = function () {
    $('.js-select2').select2();
  }

  var select2_assigne = function () {
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

  var leaflet_map = function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    // get current location event
    navigator.geolocation.getCurrentPosition(function(location) {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    
      var map = L.map('map').setView(latlng, 15)

      // set theme map 
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
      }).addTo(map);
      
      // set latitude and longtitude in textbox
      document.getElementById('latitude').value = latlng.lat;
      document.getElementById('longitude').value = latlng.lng;

      // set marker on current location
      var marker = L.marker(latlng).addTo(map);
      
      // function for change location marker after click in another location
      map.on('click', function (e) {
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
        document.getElementById('latitude').value = e.latlng.lat;
        document.getElementById('longitude').value = e.latlng.lng;
      })
    }, error, options);
  }

  return {
    init: function () {
      datatable();
      select2();
      select2_assigne();
      leaflet_map();
    }
  }
}();

$(document).ready(function () {
  custom.init();
})