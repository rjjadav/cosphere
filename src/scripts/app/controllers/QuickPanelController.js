'use strict';

var mCtrls = require('./_mCtrls');

mCtrls.controller('QuickPanelController', QuickPanelController);

QuickPanelController.$inject = ['$rootScope','$mdSidenav'];

function QuickPanelController($rootScope, $mdSidenav){
	var qp = this;
	
	qp.toggleSidenav = toggleSidenav;

	qp.qpMenuOptions = [
		// {
		// 	name: 'LOGIN/REGISTER',
		// 	sref: null, 
		// 	click: null
		// },
		{
			name: 'ABOUT US',
			sref: 'aboutUs',
			click : null
		},
		{
			name: 'CONTACT US',
			sref: 'contactUs',
			click : null
		},
		{
			name: 'TERMS & CONDITIONS',
			sref: 'tandc',
			click : null
		},
		{
			name: 'PRIVACY POLICY',
			sref: 'privacyPolicy',
			click : null
		},
		{
			name: 'CAREERS',
			sref: 'careers',
			click : null
		}
	];

	// console.log($rootScope.isLoggedin);
	// if($rootScope.isLoggedin){
	// 	qp.qpMenuOptions.unshift({
	// 		name: 'LOGOUT',
	// 		sref: null, 
	// 		click: null
	// 	})
	// }else{
	// 	qp.qpMenuOptions.unshift({
	// 		name: 'LOGIN/REGISTER',
	// 		sref: null, 
	// 		click: null
	// 	})
	// }

	function toggleSidenav(sidenavId){
		$mdSidenav(sidenavId).toggle();
	}
}

