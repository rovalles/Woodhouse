(function(){
    "use strict";
	angular.module('woodhouse').service('gmap', [function () {
        this.initMap = function (ele, options) {
            var settings = angular.extend({
                zoom: 12
            }, options);

            return new google.maps.Map(ele, settings);
        };

        this.getLatLng = function (lat, lng) {
            return new google.maps.LatLng(lat, lng);
        };

        this.updateCenter = function (map, center) {
            map.panTo({
                'lat': center.lat,
                'lng': center.lng
            });
        };

        this.addMarker = function (map, location) {
            var obj = {
                position: this.getLatLng(location.lat, location.lng),
                map: map
            };
            return new google.maps.Marker(obj);
        };
    }]);
}());