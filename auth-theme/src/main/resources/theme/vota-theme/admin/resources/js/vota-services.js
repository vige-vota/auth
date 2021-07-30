function clientSelectBlock($scope, realm, Client) {
    $scope.clientsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            var data = {results: []};
            Client.query({realm: realm, search: true, clientId: query.term.trim(), max: 20}, function(response) {
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