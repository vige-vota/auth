module.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/realms/:realm/users/:user/user-attributes', {
            templateUrl : resourceUrl + '/partials/user-attributes.html',
            resolve : {
                realm : function(RealmLoader) {
                    return RealmLoader();
                },
                user : function(UserLoader) {
                    return UserLoader();
                }
            },
            controller : 'VotaUserDetailCtrl'
        })
        .otherwise({
            templateUrl : resourceUrl + '/partials/pagenotfound.html'
        });
} ]);