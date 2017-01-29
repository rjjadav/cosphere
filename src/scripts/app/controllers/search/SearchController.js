'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('SearchController', SearchController);

SearchController.$inject = ['$state','$mdDialog','NgMap','HomepageData','api', 'config'];

function SearchController($state, $mdDialog, NgMap, HomepageData, api, config){


	var search = this;
	

	search.clearFilters = clearFilters;
	search.searchVenues = searchVenues;
	search.getSpaceId = getSpaceId;
	search.showSpaces = showSpaces;
	search.changeFilter = changeFilter;


	search.params = $state.params;
	search.spaces = HomepageData.spaceType;
	search.center = [parseFloat(search.params.lat), parseFloat(search.params.long)];
	// search.searchedVenues = HomepageData.homePageVenues;
	search.venues = [
		{name: 'Coworking'},
		{name: 'Business Centre'},
		{name: 'Corporate Office'},
		{name: 'Hotel & Cafe'}
	];
	search.amenities = [
		{name: "Open 24/7"},
		{name: "Printer / Scanner / Fax"},
		{name: "Car Parking"},
		{name: "Visitor Lounge"},
		{name: "Projector / AV Equipment"},
		{name: "Events"},
		{name: "Games / Library"},
		{name: "Partitioned / Noise Proof"},
		{name: 'Document Storage'},
		{name: 'Onsited Cafeteria'},
	];

	search.map = undefined;
	search.resultSpaces = undefined;
	search.filteredResult = undefined;
	search.venueMap = undefined;
	search.selectedSpaceId = undefined;
	search.selectedSpaces = undefined;
	search.selectedVenues = undefined;
	search.selectedAmenities = undefined;
	search.spaceInfo = undefined;

	
	search.searchVenues(search.params.city, search.params.space, search.params.lat, search.params.long);

	function clearFilters(){
		search.selectedSpaces = undefined;
		search.selectedVenues = undefined;
		search.selectedAmenities = undefined;	
		search.filteredResult = search.resultSpaces;	
	}

	function searchVenues(city, spaceType, lat,long){
		var dataToSend = {
			city : city,
			spaceType : spaceType,
			lat : lat,
			longi : long
		}
		api.post(config.search, dataToSend)
		.then(function(response){
			search.resultSpaces = response.data.spaces;
			search.filteredResult = search.resultSpaces;
			search.venueMap = response.data.venueMap;
		});
	}

	function getSpaceId(spaceId){
		search.selectedSpaceId = spaceId;
	}

	function showSpaces(event, venueId){
		search.spaceInfo = getSpacesByVenueId(venueId);
		search.map.showInfoWindow('external', this);
	}

	function getSpacesByVenueId(venueId){
		var venues = [];
		for(var i=0; i < search.filteredResult.length; i++){
			if(search.filteredResult[i].venueId == venueId){
				venues.push(search.filteredResult[i]);
			}
		}
		return venues;
	}

	var filteredSpaces = [];
	var filteredVenues = [];
	var filteredAmenities = [];
	function changeFilter(type){
		// console.log(type);
		
		var filteredArray =  [];
		switch(type){
			case 'space':
				filteredSpaces = filterSpaces();
				console.log(filteredSpaces);
				console.log('space');
				break
			case 'venue':
				filteredVenues = filterVenues();
				break;
			case 'amenities':
				filteredAmenities =filterAmenities();
				console.log('amenities');
				break;
		}

		if(search.selectedSpaces && search.selectedSpaces.length > 0)
			filteredArray.push(filteredSpaces);
		if(search.selectedVenues && search.selectedVenues.length > 0)
			filteredArray.push(filteredVenues);
		if(search.selectedAmenities && search.selectedAmenities.length > 0)
			filteredArray.push(filteredAmenities);
		
		if(filteredArray.length > 0){
			search.filteredResult = filteredArray.shift().filter(function(v) {
				return filteredArray.every(function(a) {
					return a.indexOf(v) !== -1;
				});
			});	
		}else{
			search.filteredResult = search.resultSpaces;
		}
		


		function filterSpaces(){
			var spaces = [];
			console.log(search.selectedSpaces);
			angular.forEach(search.resultSpaces,function(obj,i){
				if(search.selectedSpaces.indexOf(obj.spaceType) !== -1){
					console.log(i);
					spaces.push(obj)
				}
			})
			return spaces;
		}
		function filterVenues(){
			var venues = [];
			console.log(search.selectedVenues);
			angular.forEach(search.resultSpaces,function(obj,i){
				if(search.selectedVenues.indexOf(search.venueMap[obj.venueId].venue_category) !== -1){
					console.log(i);
					venues.push(obj)
				}
			})
			return venues;
		}
		function filterAmenities(){
			var amenities = [];
			angular.forEach(search.resultSpaces,function(obj,i){
				var containsVal = false;
				if(obj.freeamenities){
					containsVal = search.selectedAmenities.some(function(a){
						return obj.freeamenities.indexOf(a) > -1;
					})
					if(containsVal == true){
						amenities.push(obj);
					}
				}
				else if(obj.paidamenities){
					containsVal = search.selectedAmenities.some(function(a){
						return obj.paidamenities.indexOf(a) > -1;
					})
					if(containsVal == true){
						amenities.push(obj);
					}
				}
			});
			return amenities;
		}
	}

	NgMap.getMap().then(function(map) {
		search.map = map;
	});
}