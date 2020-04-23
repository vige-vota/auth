'use strict';

var module = angular.module('vota.services', [ 'ngResource', 'ngRoute' ]);

module.service('VotaSearchState', function() {
    this.isFirstSearch = true;
    this.query = {
        max : 20,
        first : 0
    };
});

module.factory('Vota', function($resource) {
    return $resource(authUrl + '/realms/:realm/rooms/votas/:votaId', {
        realm : '@realm',
        votaId : '@votaId'
    }, {
        update : {
            method : 'PUT'
        }
    });
});