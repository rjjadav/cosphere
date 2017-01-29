'use strict';

angular.module('mApp')
.run(TokenConfig);

TokenConfig.$inject = ['$rootScope','$state','facebook','GooglePlus'];

function TokenConfig($rootScope, $state, facebook, GooglePlus 	){
	initFB();
	checkThirdPartyLogin();

	$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
	function stateChangeSuccess(event, toState, toParams, fromState, fromParams){
			$rootScope.noHeight = (toState.noHeight ? toState.noHeight : false);
		if(toState.name == 'app.home')
			$rootScope.toolbarClass = toState.toolbarClass;
		else
			$rootScope.toolbarClass = '';
	}


	function initFB(){
		if (document.getElementById('facebook-jssdk')) {return;}
		var firstScriptElement = document.getElementsByTagName('script')[0];
		var facebookJS = document.createElement('script'); 
		facebookJS.id = 'facebook-jssdk';
		facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
		firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
	}

	function checkThirdPartyLogin(){
		fbLogin();
	}

	function fbLogin(){
		facebook.loginStatus()
		.then(function(response){
			if(response.status == 'connected'){
				facebook.me()
				.then(function(response){
					$rootScope.thirdParty = 'fb';
					$rootScope.isLoggedin = true;
					$rootScope.userName = response.name;
					$rootScope.profilePic = response.picture.data.url;
					
				})
				.catch();
			}else{
				gplusLogin();
			}
		})
	}

	function gplusLogin(){
		GooglePlus.init()
		.then(function(response){
			if(response){
				GooglePlus.getUser()
				.then(function(response){
					$rootScope.thirdParty = 'gplus';
					$rootScope.isLoggedin = true;
					$rootScope.userName = response.displayName;
					$rootScope.profilePic = response.image.url;
				})
			}
		});
	}
}
