function selectBlock($scope, Zizzi) {
    $scope.blockUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Zizzi.query($scope.blockUrl + '/votingPapers?all', {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.votingPapers.filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectCircumscriptions($scope, Zizzi) {
	var data = {results: []};
    $.ajax($scope.citiesUrl + '/cities', {
    }).done(function(data) {
    	$scope.selectedCircumscriptions = data.zones.filter(e => e.id == $scope.user.attributes['zones'].split('##')[3])[0];
    	$scope.selectedCircumscriptions.text = $scope.selectedCircumscriptions.name;
    });
    $scope.circumscriptionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            Zizzi.query($scope.citiesUrl + '/cities', {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectRegions($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedCircumscriptions)
        url = url + '/' + $scope.selectedCircumscriptions.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedRegions = data.zones.flatMap(f => f.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[2])[0];
    	$scope.selectedRegions.text = $scope.selectedRegions.name;
    });
    $scope.regionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedCircumscriptions)
       			url = url + '/' + $scope.selectedCircumscriptions.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectProvinces($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedRegions)
        url = url + '/' + $scope.selectedRegions.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedProvinces = data.zones.flatMap(f => f.zones).flatMap(g => g.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[1])[0];
    	$scope.selectedProvinces.text = $scope.selectedProvinces.name;
    });
    $scope.provincesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedRegions)
       			url = url + '/' + $scope.selectedRegions.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectCities($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedProvinces)
        url = url + '/' + $scope.selectedProvinces.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedCities = data.zones.flatMap(f => f.zones).flatMap(g => g.zones).flatMap(h => h.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[0])[0];
    	$scope.selectedCities.text = $scope.selectedCities.name;
    });
    $scope.citiesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedProvinces)
       			url = url + '/' + $scope.selectedProvinces.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

module.factory('Zizzi', function($resource) {
    return {
    	query: function(url, options, myFunction){
      		return $resource(url, options, 
      				{
        				query : {
          					method: 'GET',
          					isArray: false
        				},
        				update : {
            				method : 'PUT'
        				}
    			    }, myFunction).query(url, options, myFunction);
     	 }
    }
});