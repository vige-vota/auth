module.controller('VotaUserDetailCtrl', function($scope, $controller, $rootScope, realm, user, clients, Block, Cities, BruteForceUser, User,
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
        if (!circumscriptions || !circumscriptions.id) {
            $scope.selectedCircumscriptions = null;
            return;
        } else {
            $scope.selectedCircumscriptions = circumscriptions;
        }
        if ($scope.selectedCircumscriptions) {
            console.log('load available');
            $scope.clientComposite = CompositeClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientRoles = AvailableClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientMappings = ClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
        } else {
            $scope.clientRoles = null;
            $scope.clientMappings = null;
            $scope.clientComposite = null;
        }
        $scope.selectedClientRoles = [];
        $scope.selectedClientMappings = [];
    };

    $scope.selectedRegions = null;
    
    $scope.changeRegions = function(regions) {
        console.log("selected regions: ", regions);
        if (!regions || !regions.id) {
            $scope.selectedRegions = null;
            return;
        } else {
            $scope.selectedRegions = regions;
        }
        if ($scope.selectedRegions) {
            console.log('load available');
            $scope.clientComposite = CompositeClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientRoles = AvailableClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientMappings = ClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
        } else {
            $scope.clientRoles = null;
            $scope.clientMappings = null;
            $scope.clientComposite = null;
        }
        $scope.selectedClientRoles = [];
        $scope.selectedClientMappings = [];
    };

    $scope.selectedProvinces = null;
    
    $scope.changeProvinces = function(provinces) {
        console.log("selected provinces: ", provinces);
        if (!provinces || !provinces.id) {
            $scope.selectedProvinces = null;
            return;
        } else {
            $scope.selectedProvinces = provinces;
        }
        if ($scope.selectedProvinces) {
            console.log('load available');
            $scope.clientComposite = CompositeClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientRoles = AvailableClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientMappings = ClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
        } else {
            $scope.clientRoles = null;
            $scope.clientMappings = null;
            $scope.clientComposite = null;
        }
        $scope.selectedClientRoles = [];
        $scope.selectedClientMappings = [];
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
        if ($scope.selectedCities) {
            console.log('load available');
            $scope.clientComposite = CompositeClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientRoles = AvailableClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
            $scope.clientMappings = ClientRoleMapping.query({realm : realm.realm, userId : user.id, client : $scope.selectedClient.id});
        } else {
            $scope.clientRoles = null;
            $scope.clientMappings = null;
            $scope.clientComposite = null;
        }
    };
    $scope.citiesUrl = clients.filter(e => e.clientId === 'citiesGenerator')[0].rootUrl;

    selectBlock($scope, Block);
    selectCircumscriptions($scope, Cities);
    selectRegions($scope, Cities);
    selectProvinces($scope, Cities);
    selectCities($scope, Cities);
});