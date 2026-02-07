'use strict';
const taCurlId = "curl-output";
const taCurlEl = document.getElementById(taCurlId);

// helper for select and copy
function executeCopy() {
    document.execCommand("copy");
}

function copyCurlString() {
    taCurlEl.select();
    executeCopy()
}

var curlBuilder = angular.module('curlBuilder', []);
curlBuilder.controller('curlFormController', ['$scope', function($scope) {

    $scope.methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    $scope.selected = {
        "url": "",
        "method" : $scope.methods[0],
        "headers": [{
            "key": "Content-Type",
            "value": "application/json"
        }],
        "body": '{"a":1, "b":true, "c":null}'
    };

    $scope.addHeader = function () {
        $scope.selected.headers.push({
            key: "",
            value: ""
        });
    };

    $scope.removeHeader = function (idx) {
        $scope.selected.headers.splice(idx,1);
    };

    function getURL() {
        if($scope.selected.url.length) {
            return "'" + $scope.selected.url + "'";
        }
        return "";
    }

    function getHeaders() {
        let toReturn = "";
        if ($scope.selected.headers.length) {
            $scope.selected.headers.forEach(h => toReturn += " -H '" + h.key + ": " + h.value + "'");
        }
        return toReturn;
    }

    function getBody() {

        if($scope.selected.body.length) {
            return "-d '" + $scope.selected.body + "'";
        }
        return "";
    }


    $scope.generateOutput = function() {
        $scope.output = "curl -X " + $scope.selected.method + " " +  getURL() + getHeaders() + " " + getBody();
    };

    $scope.generateOutput();

    $scope.$watch('selected', function() {
        $scope.generateOutput();
    }, true);

}]);