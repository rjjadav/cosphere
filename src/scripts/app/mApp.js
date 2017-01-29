'use strict';


require('jquery');
require('slick-carousel/slick/slick');
require('angular');
require('angular-touch');
require('angular-sanitize');
require('angular-animate');
require('angular-cookies');
require('angular-ui-router');
require('angular-material');
require('angular-messages');
require('angular-material-icons');
require('angular-ui-bootstrap').default;
require('angular-filter').default;
require('bootstrap-sass');
require('ng-facebook');
require('./directives/angular-google-plus');

require('angular-slick-carousel');
require('ng-autocomplete');
require('ngmap/build/scripts/ng-map');

require('./animations/_loader');
require('./controllers/_loader');
require('./directives/_loader');
require('./services/_loader');

/**
 * Register main angular app
 */
angular.module('mApp', 
	[
		'ngTouch',
		'ngSanitize',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ui.router',
		'mAnimations', 
		'mCtrls',
		'mDirectives',
		'mServices',
		'ngMaterial',
		'ui.bootstrap',
		'angular.filter',
		'slickCarousel',
		'ngAutocomplete',
		'ngMap',
		'ngMdIcons',
		'ngFacebook',
		'googleplus',
	]
	);
	
	
require('./theme.config.js');
require('./route.config.js');
require('./api.config.js');
require('./constants.config.js');
require('./fb.config.js');
require('./gplus.config.js');
require('./token.config.js');
require('./interceptor.config.js');