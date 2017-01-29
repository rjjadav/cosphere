'use strict';

var mCtrls = require('./_mCtrls');

mCtrls.controller('RootController', RootController);

RootController.$inject = ['$rootScope','$mdSidenav','$mdDialog','facebook','GooglePlus'];

function RootController($rootScope, $mdSidenav, $mdDialog, facebook, GooglePlus){
	var vm = this;
	vm.logout = logout;
	vm.showLoginDialog = showLoginDialog;

	function logout(){
		if($rootScope.thirdParty == 'fb'){
			facebook.logout()
			.then(function(response){
				$rootScope.isLoggedin = false;
				$rootScope.thirdParty = undefined;
				$rootScope.userName = undefined;
				$rootScope.profilePic = undefined;
				closeSidenavIfOpened();
			})
			.catch();
		}

		if($rootScope.thirdParty == 'gplus'){
			GooglePlus.logout()
			.then(function(response){
				$rootScope.isLoggedin = false;
				$rootScope.thirdParty = undefined;
				$rootScope.userName = undefined;
				$rootScope.profilePic = undefined;
				closeSidenavIfOpened();
			});
		}

	}

	function showLoginDialog(event){
		$mdDialog.show({
			controller: LoginDialogController,
			controllerAs: 'login',
			templateUrl: 'tpls/partials/login/login.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose:true,
		});

		function LoginDialogController($rootScope,$mdDialog,$mdSidenav){
			var login = this;
			login.fbLogin = fbLogin;
			login.gplusLogin = gplusLogin;

			login.dialog = 'main';
			

			function fbLogin(){
				facebook.login()
				.then(function(response){
					facebook.me()
					.then(function(response){
						console.log(response);
						$rootScope.thirdParty = 'fb';
						$rootScope.isLoggedin = true;
						$rootScope.userName = response.name;
						$rootScope.profilePic = response.picture.data.url;
						closeSidenavIfOpened();
						$mdDialog.hide();
					})
					.catch(function(error){
						console.log(error);
					});	
				})
				.catch();				
			}

			function gplusLogin(){
				GooglePlus.login().then(function (authResult) {
					GooglePlus.getUser().then(function (response) {
						$rootScope.thirdParty = 'gplus';
						$rootScope.isLoggedin = true;
						$rootScope.userName = response.displayName;
						$rootScope.profilePic = response.image.url;
						closeSidenavIfOpened();
						$mdDialog.hide();
					});
				}, function (err) {
					console.log(err);
				});
			}
		}


		
	}
	function closeSidenavIfOpened(){
		if($mdSidenav('quick-panel').isOpen()){
			$mdSidenav('quick-panel').toggle();
		}
	}
}