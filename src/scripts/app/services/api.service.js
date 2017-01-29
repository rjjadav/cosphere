'use strict';

var mServices = require('./_mServices');

mServices.factory('api', apiService);

apiService.$inject= ['$http'];

function apiService($http){
	var data = {
		get : fnGet,
		getApi : fnGetApi,
		post : fnPost,
		delete : fnDelete,
		put : fnPut,
		upload : fnUploadFiles
	};

	return data;

	function fnGet(url, dataToSend, cache){
		dataToSend = dataToSend || {};
		cache = cache || false;

		return $http.get(url,{params : dataToSend}, {cache: cache})
			.then(function(response){
				return response.data;
			});
	}

	function fnGetApi(url, dataToSend, cache){
		dataToSend = dataToSend || {};
		cache = cache || false;

		return $http.get(url,{params : dataToSend}, {cache: cache});
	}	

	function fnPost(url, dataToSend, cache){
		dataToSend = dataToSend || {};
		cache = cache || false;
		return $http.post(url, dataToSend, cache);
	}

	function fnDelete(){}

	function fnPut(){}

	function fnUploadFiles(){}
}