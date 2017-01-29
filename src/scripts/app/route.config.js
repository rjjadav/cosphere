angular.module('mApp')
.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
	'ngInject';

	$stateProvider
		.state('app',{
			abstract: true,
			views : {
				'main' : {
					templateUrl: 'tpls/views/main.html',
					controller: 'MainController',
					controllerAs: 'main'
				},
				'toolbar@app': {
					templateUrl: 'tpls/partials/toolbar.html',
					controller: 'ToolbarController',
					controllerAs: 'toolbar' 
				},
				'quickPanel@app':{
					templateUrl: 'tpls/partials/quickPanel.html',
					controller: 'QuickPanelController',
					controllerAs: 'qp'		
				}
			}
		})
		.state('app.home', {
			url: '/',
			views: {
				'content@app':{
					templateUrl: 'tpls/views/home/home.html',
					controller: 'HomeController',
					controllerAs : 'home',

				}
			},
			resolve:{
				HomepageData : function(api,config){
					return api.get(config.getHomePageData, null, true);
				}
			},
			toolbarClass : 'nobg'
		})
		.state('app.search',{
			url: '/search/:city/:space/:lat/:long',
			views:{
				'content@app':{
					templateUrl: 'tpls/views/search/search.html',
					controller: 'SearchController',
					controllerAs: 'search',
				}
			},
			resolve:{
				HomepageData : function(api,config){
					return api.get(config.getHomePageData, null, true);
				}
			},
			params:{
				location : null,
			}
		})
		.state('app.space',{
			url: '/space/:productId',
			views:{
				'content@app':{
					templateUrl: 'tpls/views/space/space.html',
					controller: 'SpaceController',
					controllerAs: 'space'
				}
			},
			params:{
				location: null,
			}
		})
		.state('app.list',{
			abstract: true,
			views: {
				'main@' : {
					templateUrl: 'tpls/views/main-content-only.html',
					controller: 'MainController',
					controllerAs: 'main'
				},
			}
		})
		.state('app.list.space',{
			url: '/list',
			views: {
				'content@app.list':{
					templateUrl: 'tpls/views/list/list.html',
					controller: 'ListController',
					controllerAs: 'list'
				}
			},
			noHeight: 'true'
		});
		
	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(false);
});