module.controller('VotaUserDetailCtrl', function($scope, $controller, WebSocket, realm, user, clients, Zizzi, BruteForceUser, User,
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
        if (!block || block === null) {
            $scope.selectedBlock = null;
            return;
        } else {
            $scope.selectedBlock = block;
            $scope.user.attributes['block'] = $scope.selectedBlock.id.toString();
            $scope.changed = true;
        }
    };
    $scope.blockUrl = clients.filter(e => e.clientId === 'votingPapers')[0].rootUrl;

    $scope.selectedCircumscriptions = null;
    
    $scope.changeCircumscriptions = function(circumscriptions) {
        console.log("selected circumscriptions: ", circumscriptions);
        if (!circumscriptions || circumscriptions.id === null) {
            $scope.selectedCircumscriptions = null;
        } else {
            $scope.selectedCircumscriptions = circumscriptions;
            $scope.user.attributes['zones'] = '##' + '##' + '##' + $scope.selectedCircumscriptions.id.toString();
            $scope.changed = true;
        }
        $scope.selectedRegions = null;
        $scope.selectedProvinces = null;
        $scope.selectedCities = null;
    };

    $scope.selectedRegions = null;
    
    $scope.changeRegions = function(regions) {
        console.log("selected regions: ", regions);
        if (!regions || regions.id === null) {
            $scope.selectedRegions = null;
        } else {
            $scope.selectedRegions = regions;
            $scope.user.attributes['zones'] = '##' + '##' + $scope.selectedRegions.id.toString() + '##' + $scope.selectedCircumscriptions.id.toString();
            $scope.changed = true;
        }
        $scope.selectedProvinces = null;
        $scope.selectedCities = null;
    };

    $scope.selectedProvinces = null;
    
    $scope.changeProvinces = function(provinces) {
        console.log("selected provinces: ", provinces);
        if (!provinces || provinces.id === null) {
            $scope.selectedProvinces = null;
        } else {
            $scope.selectedProvinces = provinces;
            $scope.user.attributes['zones'] = '##' + $scope.selectedProvinces.id.toString() + '##' + $scope.selectedRegions.id.toString() + '##' + $scope.selectedCircumscriptions.id.toString();
            $scope.changed = true;
        }
        $scope.selectedCities = null;
    };

    $scope.selectedCities = null;
    
    $scope.changeCities = function(cities) {
        console.log("selected cities: ", cities);
        if (!cities || cities.id === null) {
            $scope.selectedCities = null;
        } else {
            $scope.selectedCities = cities;
            $scope.user.attributes['zones'] = $scope.selectedCities.id.toString() + '##' + $scope.selectedProvinces.id.toString() + '##' + $scope.selectedRegions.id.toString() + '##' + $scope.selectedCircumscriptions.id.toString();
            $scope.changed = true;
        }
    };
    $scope.citiesUrl = clients.filter(e => e.clientId === 'citiesGenerator')[0].rootUrl;

    selectBlock($scope, Zizzi);
    selectCircumscriptions($scope, Zizzi);
    selectRegions($scope, Zizzi);
    selectProvinces($scope, Zizzi);
    selectCities($scope, Zizzi);
    
    function convertAttributeValuesToLists() {
        var attrs = $scope.user.attributes;
        for (var attribute in attrs) {
            if (typeof attrs[attribute] === "string") {
                var attrVals = attrs[attribute].split("##");
                attrs[attribute] = attrVals;
            }
        }
    }

    function convertAttributeValuesToString(user) {
        var attrs = user.attributes;
        for (var attribute in attrs) {
            if (typeof attrs[attribute] === "object") {
                var attrVals = attrs[attribute].join("##");
                attrs[attribute] = attrVals;
            }
        }
    }

    $scope.save = function() {
        convertAttributeValuesToLists();

        if ($scope.create) {
            User.save({
                realm: realm.realm
            }, $scope.user, function (data, headers) {
                $scope.changed = false;
                convertAttributeValuesToString($scope.user);
                user = angular.copy($scope.user);
                var l = headers().location;

                console.debug("Location == " + l);

                var id = l.substring(l.lastIndexOf("/") + 1);


                $location.url("/realms/" + realm.realm + "/users/" + id);
                var data = {}
    			$.ajax({
        			url: $scope.blockUrl + '/votingPapers?all',
        			success: function (result) {
    					data = result;
        			},
       				async: false
    			});
				WebSocket.send('/topic/votingpaper', null, data);
                Notifications.success($translate.instant('user.create.success'));
            });
        } else {
            User.update({
                realm: realm.realm,
                userId: $scope.user.id
            }, $scope.user, function () {
                $scope.changed = false;
                convertAttributeValuesToString($scope.user);
                user = angular.copy($scope.user);
                var data = {}
    			$.ajax({
        			url: $scope.blockUrl + '/votingPapers?all',
        			success: function (result) {
    					data = result;
        			},
       				async: false
    			});
				WebSocket.send('/topic/votingpaper', null, data);
                Notifications.success($translate.instant('user.edit.success'));
            });
        }
    };
});