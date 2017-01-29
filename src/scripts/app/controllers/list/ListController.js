'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('ListController', ListController);

ListController.$inject = [];

function ListController(){
	var list = this;

	list.venueCategory = [
		{name: 'Corporate Office'},
		{name: 'Coworking Space'},
		{name: 'Business Centre'},
		{name: 'Hotel & Cafe'},
	];

	list.venueCity = [
		{name: 'Delhi'},
		{name: 'Gurgaon'},
		{name: 'Noida'},
		{name: 'Chandigarh'},
		{name: 'Pune'},
		{name: 'Mumbai'},
		{name: 'Banglore'},
	];
}