function selectBlock($scope, Zizzi) {
	var data = {results: []};
    $.ajax($scope.blockUrl + '/votingPapers?all', {
    }).done(function(data) {
    	$scope.selectedBlock = getAllBlocks(data.votingPapers).filter(e => e.id == $scope.user.attributes['block'])[0];
    	$scope.selectedBlock.text = $scope.selectedBlock.name;
    });
    $scope.blockUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            Zizzi.query($scope.blockUrl + '/votingPapers?all', {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = getAllBlocks(response.votingPapers).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectCircumscriptions($scope, Zizzi) {
	var data = {results: []};
    $.ajax($scope.citiesUrl + '/cities', {
    }).done(function(data) {
    	$scope.selectedCircumscriptions = data.zones.filter(e => e.id == $scope.user.attributes['zones'].split('##')[3])[0];
    	$scope.selectedCircumscriptions.text = $scope.selectedCircumscriptions.name;
    });
    $scope.circumscriptionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
            Zizzi.query($scope.citiesUrl + '/cities', {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectRegions($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedCircumscriptions)
        url = url + '/' + $scope.selectedCircumscriptions.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedRegions = data.zones.flatMap(f => f.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[2])[0];
    	$scope.selectedRegions.text = $scope.selectedRegions.name;
    });
    $scope.regionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedCircumscriptions)
       			url = url + '/' + $scope.selectedCircumscriptions.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectProvinces($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedRegions)
        url = url + '/' + $scope.selectedRegions.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedProvinces = data.zones.flatMap(f => f.zones).flatMap(g => g.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[1])[0];
    	$scope.selectedProvinces.text = $scope.selectedProvinces.name;
    });
    $scope.provincesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedRegions)
       			url = url + '/' + $scope.selectedRegions.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function selectCities($scope, Zizzi) {
	var data = {results: []};
    let url = $scope.citiesUrl + '/cities';
    if ($scope.selectedProvinces)
        url = url + '/' + $scope.selectedProvinces.id;
    $.ajax(url, {
    }).done(function(data) {
    	$scope.selectedCities = data.zones.flatMap(f => f.zones).flatMap(g => g.zones).flatMap(h => h.zones).filter(e => e.id == $scope.user.attributes['zones'].split('##')[0])[0];
    	$scope.selectedCities.text = $scope.selectedCities.name;
    });
    $scope.citiesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        query: function (query) {
   			let url = $scope.citiesUrl + '/cities';
   			if ($scope.selectedProvinces)
       			url = url + '/' + $scope.selectedProvinces.id;
            Zizzi.query(url, {search: true, name: query.term.trim(), max: 20}, function(response) {
                data.results = response.zones.flatMap(f => f.zones).filter(e => e.name.toLowerCase().includes(query.term.trim().toLowerCase()));
                query.callback(data);
            });
        },
        formatResult: function(object, container, query) {
            object.text = object.name;
            return object.name;
        }
    };
}

function getAllBlocks(votingPapers) {
	let result = []
	if (votingPapers) {
 		votingPapers.forEach(e => {
			result.push(e)
			if (e.groups) {
				e.groups.forEach(f => {
 					f.name = '------ ' + f.name
					result.push(f)
					if (f.parties) {
						f.parties.forEach(h => {
 							h.name = '------------------------ ' + h.name
							result.push(h)
							if (h.candidates) {
								h.candidates.forEach(i => {
 									i.name = '------------------------------------ ' + i.name
									result.push(i)
								})
							}
						})
					}
				})
			}
			if (e.parties) {
				e.parties.forEach(g => {
 					g.name = '------ ' + g.name
					result.push(g)
					if (g.candidates) {
						g.candidates.forEach(l => {
 							l.name = '------------------------ ' + l.name
							result.push(l)
						})
					}
				})
			}
		})
	}
	return result
}

module.factory('Zizzi', function($resource) {
    return {
    	query: function(url, options, myFunction){
      		return $resource(url, options, 
      				{
        				query : {
          					method: 'GET',
          					isArray: false
        				},
        				update : {
            				method : 'PUT'
        				}
    			    }, myFunction).query(url, options, myFunction);
     	 }
    }
});