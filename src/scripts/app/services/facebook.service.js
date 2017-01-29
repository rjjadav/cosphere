'use strict';

var mServices = require('./_mServices');

mServices.factory('facebook', facebookService);

facebookService.$inject = ['$facebook'];

function facebookService($facebook){
	var fbObj = {
		name 		: undefined,
		profilePic 	: undefined, 
	};

	var data = {
		login 		: login,
		logout 		: logout,
		me 			: me,
		loginStatus : getLoginStatus,

		getName		: getName,
		setName		: setName,
		getProfilePic : getProfilePic,
		setProfilePic : setProfilePic,
	}

	return data;


	function login(){
		return $facebook.login();
	}

	function logout(){
		return $facebook.logout();
	}

	function me(){
		return $facebook.api('/me',{
					fields: "name,gender,birthday,picture,email,id"
				});
	}

	function getLoginStatus(){
		return $facebook.getLoginStatus();
	}

	function getName(){
		return fbObj.name;
	}

	function setName(name){
		fbObj.name = name;
	}

	function getProfilePic(){
		return fbObj.profilePic;
	}

	function setProfilePic(profilePic){
		fbObj.profilePic = profilePic;
	}
}
