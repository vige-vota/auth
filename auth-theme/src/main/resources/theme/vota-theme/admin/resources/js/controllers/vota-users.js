module.controller('VotaUserDetailCtrl', function($scope, $controller, $rootScope, realm, user, clients, Zizzi, BruteForceUser, User,
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
    $scope.blockUrl = clients.filter(e => e.clientId === 'votingPapers')[0].rootUrl;

    $scope.selectedCircumscriptions = null;
    
    $scope.changeCircumscriptions = function(circumscriptions) {
        console.log("selected circumscriptions: ", circumscriptions);
        if (!circumscriptions || circumscriptions.id === null) {
            $scope.selectedCircumscriptions = null;
            return;
        } else {
            $scope.selectedCircumscriptions = circumscriptions;
        }
        if (!$scope.selectedCircumscriptions) {
            $scope.selectedRegions = null;
            $scope.selectedProvinces = null;
            $scope.selectedCities = null;
        }
    };

    $scope.selectedRegions = null;
    
    $scope.changeRegions = function(regions) {
        console.log("selected regions: ", regions);
        if (!regions || regions.id === null) {
            $scope.selectedRegions = null;
            return;
        } else {
            $scope.selectedRegions = regions;
        }
        if (!$scope.selectedRegions) {
            $scope.selectedProvinces = null;
            $scope.selectedCities = null;
        }
    };

    $scope.selectedProvinces = null;
    
    $scope.changeProvinces = function(provinces) {
        console.log("selected provinces: ", provinces);
        if (!provinces || provinces.id === null) {
            $scope.selectedProvinces = null;
            return;
        } else {
            $scope.selectedProvinces = provinces;
        }
        if (!$scope.selectedProvinces) {
            $scope.selectedCities = null;
        }
    };

    $scope.selectedCities = null;
    
    $scope.changeCities = function(cities) {
        console.log("selected cities: ", cities);
        if (!cities || cities.id === null) {
            $scope.selectedCities = null;
            return;
        } else {
            $scope.selectedCities = cities;
        }
    };
    $scope.citiesUrl = clients.filter(e => e.clientId === 'citiesGenerator')[0].rootUrl;

    selectBlock($scope, Zizzi);
    selectCircumscriptions($scope, Zizzi);
    selectRegions($scope, Zizzi);
    selectProvinces($scope, Zizzi);
    selectCities($scope, Zizzi);
});