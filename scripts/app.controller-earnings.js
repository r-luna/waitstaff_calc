
app.controller('EarningsController', function($scope, CONSTANTS){
    $scope.f = CONSTANTS.form;
    $scope.m = CONSTANTS.meals;
    $scope.c = CONSTANTS.charges;
    $scope.e = CONSTANTS.earnings;
    
    
    $scope.doReset = function(){
        var f = $scope.f;
        var c = $scope.c;
        var e = $scope.e;
        for (p in f){
            f.hasOwnProperty(p) && (f[p] = null);
        }
        for (p in c){
            c.hasOwnProperty(p) && (c[p] = null);
        }
        for (p in e){
            e.hasOwnProperty(p) && (e[p] = null);
        }
        $scope.m.length = 0;
    };
});