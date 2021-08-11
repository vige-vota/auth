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
    $scope.circumscriptionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
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
    $scope.regionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
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

function selectProvinces($scope, Zizzi) {
    $scope.provincesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
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

function selectCities($scope, Zizzi) {
    $scope.citiesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
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