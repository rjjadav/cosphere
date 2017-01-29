'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('SpaceController', SpaceController);

SpaceController.$inject = ['$state','$mdDialog','NgMap','constants','api', 'config'];

function SpaceController($state, $mdDialog, NgMap, constants, api, config){
	var space = this;

	space.initDatepicker = initDatepicker;
	space.getProductDetails = getProductDetails;
	space.showVisitDialogBox = showVisitDialogBox;
	space.incrementCounter = incrementCounter;
	space.decrementCounter = decrementCounter;
	space.addDuration = addDuration;


	space.productId = $state.params.productId;
	space.amenities = constants.AMENITIES;
	space.minDate = new Date();
	space.counter = "1";

	space.spaceDetails = undefined;
	space.venueDetailsBean = undefined;
	space.reservationTime = undefined;
	space.selectedPlan = undefined;

	
	space.getProductDetails(space.productId);
	space.initDatepicker();

	function getProductDetails(productId){
		api.get(config.getSpaceDetail,{id:productId},true)
		.then(function(response){
			space.spaceDetails = response.spaceDetails;
			space.venueDetailsBean = response.venueDetailsBean;
			if(space.spaceDetails.spacePlanTerm == 'Day,Monthly'){
				space.selectedPlan = 'daily'
			}else if(space.spaceDetails.spacePlanTerm == 'hourly,Day'){
				space.selectedPlan = 'hourly'
			}else if(space.spaceDetails.spacePlanTerm == 'Monthly'){
				space.selectedPlan = 'monthly'
			}

		});
	}

	function showVisitDialogBox(event){
		$mdDialog.show({
			controller: VisitDialogController,
			controllerAs: 'visit',
			templateUrl: 'tpls/views/space/visit.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose:false,
		});

		function VisitDialogController($mdDialog){
			var visit = this;
			visit.hide = hide;

			visit.testVar = "test Var";

			function hide(){
				$mdDialog.hide();
			}
		}
	}
	function initDatepicker(){
		angular.element(".md-datepicker-button").each(function(){
			var el = this;
			var ip = angular.element(el).parent().find("input").bind('click', function(e){
				angular.element(el).click();
			});
			angular.element(this).css('display', 'none');
		});
	}


	function incrementCounter(selectedPlan){
		space.counter++;
		space.addDuration(space.counter,selectedPlan);
	}

	function decrementCounter(selectedPlan){
		if(space.counter > 0){
			space.counter--;
			space.addDuration(space.counter,selectedPlan);
		}
	}

	function addDuration(counter, selectedPlan){
		switch(selectedPlan){
			case 'hourly': 
				space.reservationTime = counter + (counter > 1 ? ' Hours' : ' Hour');
				break;
			case 'daily':
				space.reservationTime = counter + (counter > 1 ? ' Days' : ' Day');
				break;
			case 'monthly':
				space.reservationTime = counter + (counter > 1 ? ' Months' : ' Month');
				break;
		}
	}
	
}
