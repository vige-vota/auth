module.factory('VotaLoader', function(Loader, Vota, $route, $q) {
    return Loader.get(Vota, function() {
        return {
            realm : $route.current.params.realm,
            votaId : $route.current.params.vota
        }
    });
});
