'use strict';

angular.module('mApp')
.constant('config',(appConfig)());

function appConfig(){
	var env = 'dev';

	var url = {
		dev : {
			backend : 'http://45.56.97.181:8080', ///cosphere/getHomePageData'
		},
		uat: {

		},
		prod: {

		}
	}


	var config = {

		getHomePageData	: url[env].backend + '/cosphere/getHomePageData',
		search			: url[env].backend + '/cosphere/search',
		getSpaceDetail	: url[env].backend + '/cosphere/getSpaceDetail',
	}

	return config;
}