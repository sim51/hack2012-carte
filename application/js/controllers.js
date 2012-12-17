'use strict';

function IndexCtrl($scope, $rootScope, $routeParams, $location, $elastic) {
	$rootScope.query = '';
	$rootScope.theme = 'all';
	$rootScope.type = 'all';
	$rootScope.geo = '0.3';
    navigator.geolocation.getCurrentPosition(function(position) {
      $rootScope.lat = position.coords.latitude;
      $rootScope.lng  = position.coords.longitude;
      document.location.href='#/search/' + $rootScope.lat + '/' + $rootScope.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo;
    });
    document.location.href='#/search/47.21510832641283/-1.556239128112793/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo;
}

function SearchCtrl($scope, $rootScope, $routeParams, $location, $elastic) {
	$rootScope.query = $routeParams.query || '';
	$rootScope.type = $routeParams.type || 'all';
	$rootScope.theme = $routeParams.theme || 'all';
	$rootScope.geo = $routeParams.geo || '0.3';
	$rootScope.lat = $routeParams.lat || $rootScope.lat;
	$rootScope.lng = $routeParams.lng || $rootScope.lng;
	$('#loading').show();
	// initialize the map on the "map" div
    var map = new L.Map('map');
    var markerLocation = new L.LatLng($rootScope.lat,$rootScope.lng);
	var myLoc = new L.Marker(markerLocation, {draggable:true});	
	myLoc.on('dragend', function(e){
		document.location.href='#/search/' + e.target._latlng.lat + '/' + e.target._latlng.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo;
	});
	myLoc.addTo(map);

    // create a CloudMade tile layer with style #997 (or use other provider of your choice)
    var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 17
    });
    var zoom = 10;
    switch ($rootScope.geo) {
     case '0.3':
	 	zoom = 17;
	 	break;
     case '1':
	 	zoom = 15;
	 	break;
     case '5':
	 	zoom = 14;
	 	break;
	 case '10':
	 	zoom = 13;
	 	break;
	 case '20':
	 	zoom = 12;
	 	break;
	 case '50':
	 	zoom = 11;
	 	break;
	 case '100':
	 	zoom = 10;
		break;
	}
    // add the layer to the map, set the view to a given place and zoom
    map.addLayer(cloudmade).setView(new L.LatLng($rootScope.lat, $rootScope.lng), zoom);

	$elastic.search($rootScope.lat, $rootScope.lng, $rootScope.query,  $rootScope.theme, $rootScope.type, $rootScope.geo).then(function(response){
		$rootScope.facets = response.facets;
		$scope.hits = response.hits.hits;
		for (var i=0; i< $scope.hits.length; i++) {
			var markerLocation = new L.LatLng($scope.hits[i]._source.pin.lat,$scope.hits[i]._source.pin.lon);
	        var marker = new L.Marker(markerLocation);
	        switch ($scope.hits[i]._source.type) {
			 	case 'Monument':
			 		marker.setIcon(musee);	
			 		break;
				case 'Hotel':
			 		marker.setIcon(hotel);	
			 		break;
			 	case 'Restaurant':
			 		marker.setIcon(restaurant);	
			 		break;
			 	case 'Cave':
			 		marker.setIcon(cave);	
			 		break;
			 	case 'Spectacle':
			 		marker.setIcon(spectacle);	
			 		break;
			 	case 'Bicloo':
			 		marker.setIcon(bicloo);	
			 		break;
			 	case 'Parking':
			 		marker.setIcon(parking);	
			 		break;
			 	case 'Marguerite':
			 		marker.setIcon(marguerite);	
			 		break;
			 	case 'Aéroport':
			 		marker.setIcon(aeroport);	
			 		break;
			 	case 'Port':
			 		marker.setIcon(port);	
			 		break;
			 	case 'Gare':
			 		marker.setIcon(gare);	
			 		break;
			 	case 'Gare routière':
			 		marker.setIcon(car);	
			 		break;
			 	case 'Covoiturage':
			 		marker.setIcon(covoiturage);	
			 		break;
			}
	        marker.bindPopup("<div class=\"popin\">" +
	        	"<h3>" + $scope.hits[i]._source.name + "</h3>" +
	        	"<h4>Contact</h4>" +
	        	"<p><b>Tel : </b>" + $scope.hits[i]._source.tel + "</p>" +
	        	"<p><b>Mail : </b><a href=\"mailto:" + $scope.hits[i]._source.mail + "\">"+ $scope.hits[i]._source.mail + "</a></p>" +
	        	"<h4>Adresse</h4>" +
	        	"<p>" + $scope.hits[i]._source.adress + "<br/>" +
	        	"" + $scope.hits[i]._source.cp + ", " +  $scope.hits[i]._source.city+ "</p>" +
	        	"<h4>Information</h4>" +
	        	"<p><b>Site web : </b><a href=\"http://" + $scope.hits[i]._source.site + "\">" + $scope.hits[i]._source.site + "</a></p>" +
	        	"<p><b>Complément :</b>" +
	        	"<p>" + $scope.hits[i]._source.description + "</p>" +
	        	"</div>"
	        );
	        marker.addTo(map);
	        map.fitBounds(map.getBounds());
	        map.setZoom(zoom);
		}
		$('#loading').hide();
    });
	$('#loading').hide();
}

/*
 *  Error.
 */
function ErrorCtrl() {
}