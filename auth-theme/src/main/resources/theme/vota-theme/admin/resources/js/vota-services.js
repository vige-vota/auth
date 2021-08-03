function clientSelectBlock($scope, realm, Block) {
    $scope.clientsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Block.query({realm: realm, search: true, clientId: query.term.trim(), max: 20}, function(response) {
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

function clientSelectCities($scope, realm, Cities) {
    $scope.clientsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Cities.query({realm: realm, search: true, clientId: query.term.trim(), max: 20}, function(response) {
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
    return $resource(authUrl + '/admin/realms/:realm/clients/:client', {
        realm : '@realm',
        client : '@client'
    },  {
        update : {
            method : 'PUT'
        }
    });
});