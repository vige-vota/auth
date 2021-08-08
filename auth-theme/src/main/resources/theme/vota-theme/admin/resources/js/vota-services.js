function selectBlock($scope, realm, Block) {
    $scope.blockUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Block.query($scope.blockUrl, {realm: realm, search: true, clientId: query.term.trim(), max: 20}, function(response) {
                data.results = response;
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.clientId;
            return object.clientId;
        }
    };
}

function selectCities($scope, Cities) {
    $scope.citiesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Cities.query($scope.citiesUrl, {search: true, clientId: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones;
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

module.factory('Block', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client', {
        realm : '@realm',
        client : '@client'
    },  {
        update : {
            method : 'PUT'
        }
    });
});

module.factory('Cities', function($resource) {
    return {
    	query: function(url, options, myFunction){
      		return $resource(url + '/cities', options, 
      				{
        				query : {
          					method: 'GET',
          					isArray: false
        				},
        				update : {
            				method : 'PUT'
        				}
    			    }, myFunction).query(url + '/cities', options, myFunction);
     	 }
    }
});