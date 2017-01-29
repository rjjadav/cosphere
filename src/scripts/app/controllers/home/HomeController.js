'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('HomeController', HomeController);

HomeController.$inject = ['$mdSidenav','NgMap','$state','constants','HomepageData'];

function HomeController($mdSidenav, NgMap, $state, constants,HomepageData){
	
	var home = this;
	home.searchSpaces = searchSpaces;

	home.map = undefined;
	home.spaces = [];
	home.locations = [];
	home.testimonials =[];
	
	

	home.locations = HomepageData.cities;
	home.spaces = HomepageData.spaceType;
	home.venues = HomepageData.homePageVenues;
	home.testimonials = [
		{
			name: 'Shiwali Malik',
			designation: 'Founder',
			company: 'Stylpal',
			comment:'As a start-up, Cosphere was easily able to address our prime concerns - high speed internet, a space conducive for client meetings and privacy. Since we had a small team, we had initial apprehensions pertaining to getting the right office space, but Cosphere made it look rather easy',
			imageSrc: 'assets/images/testimonial.png'
		},
		{
			name: 'Siddhartha Lakhera',
			designation: 'Founder',
			company: 'Clairvoyant Mobile Solutions',
			comment:'Cosphere got us the right environment for our 20 member team. With unique listings and customized offerings, Cosphere helped us get our private office at a prime location, easily accessible from the Metro as well. Certainly it has an edge over other players operating on a similar platform',
			imageSrc: 'assets/images/testimonial.png'
		}
	];

	function searchSpaces(city, location, locationDetails, selectedSpace){
		console.log(city);
		console.log(location);
		console.log(locationDetails.geometry.location);
		console.log(selectedSpace);

		$state.go('app.search',
				{
					city: city,space:
					selectedSpace, 
					lat: locationDetails.geometry.location.lat(),
					long: locationDetails.geometry.location.lng(),
					location: location
				});
	}

	NgMap.getMap().then(function(map) {
		home.map = map;
	});
}
