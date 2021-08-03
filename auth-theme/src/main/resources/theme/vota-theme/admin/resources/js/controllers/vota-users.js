module.controller('VotaUserDetailCtrl', function($scope, $controller, realm, user, Block, Cities, BruteForceUser, User,
                                             Components,
                                             UserImpersonation, RequiredActions,
                                             UserStorageOperations,
                                             $location, $http, Dialog, Notifications, $translate) {
    angular.extend(this, $controller('UserDetailCtrl', {$scope: $scope, realm: realm, user: user, BruteForceUser: BruteForceUser, User: User,
                                             Components: Components,
                                             UserImpersonation: UserImpersonation, RequiredActions: RequiredActions,
                                             UserStorageOperations: UserStorageOperations,
                                             $location: $location, $http: $http, Dialog: Dialog, Notifications: Notifications, $translate: $translate}));

    $scope.selectedBlock = null;

    $scope.changeBlock = function(block) {
        console.log("selected block: ", block);
        if (!block || !block.id) {
            $scope.selectedBlock = null;
            return;
        } else {
            $scope.selectedBlock = block;
        }
    };

    $scope.selectedCities = null;
    
    $scope.changeCities = function(cities) {
        console.log("selected cities: ", cities);
        if (!cities || !cities.id) {
            $scope.selectedCities = null;
            return;
        } else {
            $scope.selectedCities = cities;
        }
    };

    clientSelectBlock($scope, realm.realm, Block);
    clientSelectCities($scope, realm.realm, Cities);
});