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

    // enableHighAccuracy to get high accuracy location (working on mobile device)
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // navigator for get current position
    navigator.geolocation.getCurrentPosition(function (location) {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

      // set view current position
      var map = L.map('map').setView(latlng, 15)

      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
      }).addTo(map);

      var geocodeService = L.esri.Geocoding.geocodeService();
      var searchControl = L.esri.Geocoding.geosearch().addTo(map);

      // set data map in textbox
      document.getElementById('latitude').value = latlng.lat;
      document.getElementById('longitude').value = latlng.lng;
      document.getElementById('addressInput').value = latlng.address;

      // set marker on current location
      var marker = L.marker(latlng).addTo(map);

      // create new layer group for save search result
      var results = new L.LayerGroup().addTo(map);
      
      // event click for get data on map
      map.on('click', function (e) {
        // geocodeService.reverse() => to get data location as address latitude and longtitude
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
          if (error) {
            return;
          }

          // clear marker on map before create marker
          if (marker) {
            results.clearLayers();
            map.removeLayer(marker);
          }

          // to add marker and popup result address
          marker = L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();

          document.getElementById('latitude').value = result.latlng.lat;
          document.getElementById('longitude').value = result.latlng.lng;
          document.getElementById('addressInput').value = result.address.Match_addr;
        });
      });

      // event get result from search
      searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
          document.getElementById('latitude').value = data.results[i].latlng.lat;
          document.getElementById('longitude').value = data.results[i].latlng.lng;
          document.getElementById('addressInput').value = data.results[i].properties.Match_addr;
        }
      });

    }, error, options);
  }

  var leaflet_map_only_suggestion = function () {

    // enableHighAccuracy to get high accuracy location (working on mobile device)
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // navigator for get current position
    navigator.geolocation.getCurrentPosition(function (location) {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

      // set view current position
      var map = L.map('map').setView(latlng, 15)

      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
      }).addTo(map);

      var geocodeService = L.esri.Geocoding.geocodeService();
      var searchControl = L.esri.Geocoding.geosearch().addTo(map);

      // set data map in textbox
      document.getElementById('latitude').value = latlng.lat;
      document.getElementById('longitude').value = latlng.lng;
      document.getElementById('addressInput').value = latlng.address;

      // set marker on current location
      var marker = L.marker(latlng).addTo(map);

      // create new layer group for save search result
      var results = new L.LayerGroup().addTo(map);
      
      // event click for get data on map
      map.on('click', function (e) {
        // geocodeService.reverse() => to get data location as address latitude and longtitude
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
          if (error) {
            return;
          }

          // clear marker on map before create marker
          if (marker) {
            results.clearLayers();
            map.removeLayer(marker);
          }

          // to add marker and popup result address
          marker = L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();

          document.getElementById('latitude').value = result.latlng.lat;
          document.getElementById('longitude').value = result.latlng.lng;
          document.getElementById('addressInput').value = result.address.Match_addr;
        });
      });

      // event get result from search
      searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
          document.getElementById('latitude').value = data.results[i].latlng.lat;
          document.getElementById('longitude').value = data.results[i].latlng.lng;
          document.getElementById('addressInput').value = data.results[i].properties.Match_addr;
        }
      });

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