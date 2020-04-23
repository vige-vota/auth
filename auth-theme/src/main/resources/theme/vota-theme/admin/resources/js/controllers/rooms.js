module.controller('RoomListCtrl', function($scope, realm, Vota, VotaSearchState, Notifications, $route, Dialog) {
    
    $scope.init = function() {
        $scope.realm = realm;
        
        VotaSearchState.query.realm = realm.realm;
        $scope.query = VotaSearchState.query;
        $scope.query.briefRepresentation = 'true';
        
        if (!VotaSearchState.isFirstSearch) $scope.searchQuery();
    };


    $scope.firstPage = function() {
        $scope.query.first = 0;
        $scope.searchQuery();
    }

    $scope.previousPage = function() {
        $scope.query.first -= parseInt($scope.query.max);
        if ($scope.query.first < 0) {
            $scope.query.first = 0;
        }
        $scope.searchQuery();
    }

    $scope.nextPage = function() {
        $scope.query.first += parseInt($scope.query.max);
        $scope.searchQuery();
    }

    $scope.searchQuery = function() {
        console.log("query.search: " + $scope.query.search);
        $scope.searchLoaded = false;

        $scope.votas = Vota.query($scope.query, function() {
            $scope.searchLoaded = true;
            $scope.lastSearch = $scope.query.search;
            VotaSearchState.isFirstSearch = false;
        });
    };

    $scope.removeVota = function(vota) {
        Dialog.confirmDelete(vota.id, 'vota', function() {
        	vota.$remove({
                realm : realm.realm,
                votaId : vota.id
            }, function() {
                $route.reload();
                
                if ($scope.votas.length === 1 && $scope.query.first > 0) {
                    $scope.previousPage();
                } 
                
                Notifications.success("The vota has been deleted.");
            }, function() {
                Notifications.error("Vota couldn't be deleted");
            });
        });
    };
});


module.controller('VotaTabCtrl', function($scope, $location, Dialog, Notifications, Current) {
    $scope.removeVota = function() {
        Dialog.confirmDelete($scope.vota.id, 'vota', function() {
            $scope.vota.$remove({
                realm : Current.realm.realm,
                votaId : $scope.vota.id
            }, function() {
                $location.url("/realms/" + Current.realm.realm + "/rooms");
                Notifications.success("The vota has been deleted.");
            }, function() {
                Notifications.error("Vota couldn't be deleted");
            });
        });
    };
});

module.controller('VotaDetailCtrl', function($scope, realm, vota, Vota,
                                             Components,
                                             RequiredActions,
                                             $location, $http, Dialog, Notifications) {
    $scope.realm = realm;
    $scope.create = !vota.id;
    $scope.editName = $scope.create || $scope.realm.editUsernameAllowed;

    if ($scope.create) {
        $scope.vota = { rooms: {} }
    } else {
        if (!vota.rooms) {
        	vota.rooms = {}
        }
        convertAttributeValuesToString(vota);


        $scope.vota = angular.copy(vota);
        console.log('realm brute force? ' + realm.bruteForceProtected)
    }

    $scope.changed = false; // $scope.create;
    if (vota.requiredActions) {
        for (var i = 0; i < vota.requiredActions.length; i++) {
            console.log("vota require action: " + vota.requiredActions[i]);
        }
    }
    // ID - Name map for required actions. IDs are enum names.
    RequiredActions.query({realm: realm.realm}, function(data) {
        $scope.votaReqActionList = [];
        for (var i = 0; i < data.length; i++) {
            console.log("listed required action: " + data[i].name);
            var item = data[i];
            $scope.votaReqActionList.push(item);
        }
    console.log("---------------------");
    console.log("ng-model: vota.requiredActions=" + JSON.stringify($scope.vota.requiredActions));
    console.log("---------------------");
    console.log("ng-repeat: votaReqActionList=" + JSON.stringify($scope.votaReqActionList));
    console.log("---------------------");
    });
    $scope.$watch('vota', function() {
        if (!angular.equals($scope.vota, vota)) {
            $scope.changed = true;
        }
    }, true);

    $scope.save = function() {
        convertAttributeValuesToLists();

        if ($scope.create) {
            Vota.save({
                realm: realm.realm
            }, $scope.vota, function (data, headers) {
                $scope.changed = false;
                convertAttributeValuesToString($scope.vota);
                vota = angular.copy($scope.vota);
                var l = headers().location;

                console.debug("Location == " + l);

                var id = l.substring(l.lastIndexOf("/") + 1);


                $location.url("/realms/" + realm.realm + "/rooms/" + id);
                Notifications.success("The vota has been created.");
            });
        } else {
        	Vota.update({
                realm: realm.realm,
                votaId: $scope.vota.id
            }, $scope.vota, function () {
                $scope.changed = false;
                convertAttributeValuesToString($scope.vota);
                vota = angular.copy($scope.vota);
                Notifications.success("Your changes have been saved to the vota.");
            });
        }
    };

    function convertAttributeValuesToLists() {
        var attrs = $scope.vota.rooms;
        for (var attribute in attrs) {
            if (typeof attrs[attribute] === "string") {
                var attrVals = attrs[attribute].split("##");
                attrs[attribute] = attrVals;
            }
        }
    }

    function convertAttributeValuesToString(vota) {
        var attrs = vota.rooms;
        for (var attribute in attrs) {
            if (typeof attrs[attribute] === "object") {
                var attrVals = attrs[attribute].join("##");
                attrs[attribute] = attrVals;
            }
        }
    }

    $scope.reset = function() {
        $scope.vota = angular.copy(vota);
        $scope.changed = false;
    };

    $scope.cancel = function() {
        $location.url("/realms/" + realm.realm + "/rooms");
    };

    $scope.addAttribute = function() {
        $scope.vota.rooms[$scope.newAttribute.key] = $scope.newAttribute.value;
        delete $scope.newAttribute;
    }

    $scope.removeAttribute = function(key) {
        delete $scope.vota.rooms[key];
    }
});