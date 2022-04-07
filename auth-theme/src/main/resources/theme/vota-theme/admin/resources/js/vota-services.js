function selectBlock($scope, Zizzi) {
	var data = {results: []};
    $.ajax({
        url: $scope.blockUrl + '/votingPapers?all&info',
        success: function (result) {
    		result.votingPapers = getAllBlocks(result.votingPapers)
    		$scope.selectedBlock = result.votingPapers.filter(e => e.id == $scope.user.attributes['block'])[0];
    		if ($scope.selectedBlock)
    			$scope.selectedBlock.text = $scope.selectedBlock.name;
        },
        async: false
    });
    $scope.blockUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        initSelection: function () {
        },
        query: function (query) {
            Zizzi.query($scope.blockUrl + '/votingPapers?all&info', {search: true, name: query.term.trim(), max: 20}, function(response) {
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
    $.ajax({
        url: $scope.citiesUrl + '/cities',
        success: function (result) {
    		$scope.selectedCircumscriptions = result.zones.filter(e => e.id == $scope.user.attributes['zones'].split('-')[0])[0];
    		$scope.selectedCircumscriptions.text = $scope.selectedCircumscriptions.name;
        },
        async: false
    });
    $scope.circumscriptionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        initSelection: function () {
        },
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
    $.ajax({
        url: url,
        success: function (result) {
        	let ids = $scope.user.attributes['zones'].split('-')
        	let id = ids[0] + '-' + ids[1]
    		$scope.selectedRegions = result.zones.flatMap(f => f.zones).filter(e => e.id == id)[0];
    		$scope.selectedRegions.text = $scope.selectedRegions.name;
        },
        async: false
    });
    $scope.regionsUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        initSelection: function () {
        },
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
    $.ajax({
        url: url,
        success: function (result) {
        	let ids = $scope.user.attributes['zones'].split('-')
        	let id = ids[0] + '-' + ids[1] + '-' + ids[2]
    		$scope.selectedProvinces = result.zones.flatMap(g => g.zones).filter(e => e.id == id)[0];
    		$scope.selectedProvinces.text = $scope.selectedProvinces.name;
        },
        async: false
    });
    $scope.provincesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        initSelection: function () {
        },
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
    $.ajax({
        url: url,
        success: function (result) {
        	let ids = $scope.user.attributes['zones'].split('-')
        	let id = ids[0] + '-' + ids[1] + '-' + ids[2] + '-' + ids[3]
    		$scope.selectedCities = result.zones.flatMap(h => h.zones).filter(e => e.id == id)[0];
    		$scope.selectedCities.text = $scope.selectedCities.name;
        },
        async: false
    });
    $scope.citiesUiSelect = {
        minimumInputLength: 0,
        delay: 500,
        allowClear: true,
        initSelection: function () {
        },
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

class ValueText {
  toString(){
    return 'Pity the Foo';
  }
}

function selectStamps($scope) {
	let stamps = $scope.user.attributes['stamps'] 
	$scope.selectedStamps = [];
	if (stamps)
		stamps.split('##').forEach((element, index) => {
			let valueText = new ValueText();
			valueText.value = element;
			$scope.selectedStamps.push({ key: index, value: element });
		});
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