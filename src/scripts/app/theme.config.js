'use strict';

angular.module('mApp')
.config(ConfigTheme);

ConfigTheme.$inject= ['$mdThemingProvider'];

function ConfigTheme($mdThemingProvider) {
		$mdThemingProvider.definePalette('amazingPaletteName', {
		'50': '0090bf',
		'100': '0090bf',
		'200': '0090bf',
		'300': '0090bf',
		'400': '0090bf',
		'500': '0090bf',
		'600': '0090bf',
		'700': '0090bf',
		'800': '0090bf',
		'900': '0090bf',
		'A100': '0090bf',
		'A200': '0090bf',
		'A400': '0090bf',
		'A700': '0090bf',
		'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                    // on this palette should be dark or light

		'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		 '200', '300', '400', 'A100'],
		'contrastLightColors': undefined    // could also specify this if default was 'dark'
	});

	$mdThemingProvider.theme('default')
	.primaryPalette('amazingPaletteName')
}