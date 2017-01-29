'use strict';

var mDirectives = require('./_mDirectives');

mDirectives.directive('dateTimePickerInput', function($modal, $filter) {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, element, attrs, ngModelCtrl) {
					console.log("link");
					if (element[0].tagName.toLowerCase() !== 'input'
							|| attrs['type'].toLowerCase() !== 'text') {
								throw new Error('date-time-picker-input directive must be instantiated as an attribute of a input with type="text"');
					}

					var _openModal;
					element.on('focus', function(){

						if (_openModal) return;

						ngModelCtrl.$setTouched();
						_openModal = $modal({
							templateUrl: 'tpls/partials/dateTimeDialog.html',
							scope: scope.$new(),
							controller: [
								'$scope', function ($scope) {
									// See https://github.com/SimeonC/sc-date-time#options for details
									var passthroughAttrs = ['displayMode', 'defaultDate', 'defaultMode', 'mindate', 'maxdate']
									angular.forEach(passthroughAttrs, function (key) {
										$scope[key] = attrs[key];
									});
									if(angular.isDate(ngModelCtrl.$modelValue)) $scope.model = new Date(ngModelCtrl.$modelValue);
									$scope.onCancel = function () {
										_openModal.hide();
										element[0].focus();
										element[0].blur();
										_openModal = null;
									};
									$scope.onSave = function () {
										ngModelCtrl.$setViewValue($scope.model);
										ngModelCtrl.$setDirty();
										element.val(formatDate($scope.model));
										_openModal.hide();
										element[0].focus();
										element[0].blur();
										_openModal = null;
									};
								}
							],
							show: true
						});
					});

					if(attrs['ngMin']) {
						ngModelCtrl.$validators['min'] = function (dateValue) {
							return new Date(dateValue) >= new Date(attrs['ngMin']);
						};
					}

					if(attrs['ngMax']) {
						ngModelCtrl.$validators['max'] = function (dateValue) {
							return new Date(dateValue) <= new Date(attrs['ngMax']);
						};
					}

					ngModelCtrl.$formatters.push(formatDate);
					function formatDate(value){
						return $filter('date')(value, attrs['displayFormat'] || 'EEEE d MMMM yyyy, h:mm a');
					};
				}
			};
		}
	);