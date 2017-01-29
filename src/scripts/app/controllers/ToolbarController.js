'use strict';

var mCtrls = require('./_mCtrls');

mCtrls.controller('ToolbarController', ToolbarController);

ToolbarController.$inject = ['$mdSidenav'];

function ToolbarController($mdSidenav){
	var toolbar = this;
	toolbar.toggleSidenav = toggleSidenav;

	function toggleSidenav(sidenavId)
	{
		$mdSidenav(sidenavId).toggle();
	}
}