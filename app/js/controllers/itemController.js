App.controller('itemController', function ($scope, $http) {
    $http({
        method: "GET",
        url: "json/test.json"
    }).then(function mySuccess(response) {
        $scope.person = response.data.person;
        $scope.equipment = response.data.equipment;
        var bg = angular.element(document.getElementsByClassName(('persone-picture')));
        $scope.change = function () {
            bg.css('background-image', 'url(' + $scope.person["alt-img"] + ')');

        };
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

});

