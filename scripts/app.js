angular.module('app', ['ngMessages'])
.constant('CONSTANTS',{
    version: 0.1,
    meals: [], // {baseMealPrice:x,taxRate:x,tipPercentage:x}
    form: {
        baseMealPrice:null,
        taxRate:null,
        tipPercentage:null
    },
    charges: {
        subtotal: null,
        tip: null,
        total: null
    },
    earnings: {
        tipTotal: null,
        mealCount: null,
        avgTip: null
    }
})
.controller('controller', function(CONSTANTS, $scope){
    $scope.f = CONSTANTS.form;
    $scope.m = CONSTANTS.meals;
    $scope.c = CONSTANTS.charges;
    $scope.e = CONSTANTS.earnings;
    
    function _clearCharges(){
        $scope.c.subtotal = $scope.c.tip = $scope.c.total = null;   
    }
    
    function _doEarnings(){
        var m = $scope.m;
        var price, tax, tip, calculated;
        var tipTotal = 0;
        var tips = [];
        
        // collect tips
        for (var i=0;i<m.length;i++){
            price = m[i].baseMealPrice;
            tax = m[i].taxRate;
            tip = m[i].tipPercentage;
            calculated = _calculate(price,tax,tip);
            tips.push(calculated.tipamount);
        }
        
        // add up all the tips
        for (var i=0;i<tips.length;i++){
            tipTotal = tipTotal + tips[i];
        }
        
        // set tip total
        $scope.e.tipTotal = tipTotal;
        
        // set average tip
        $scope.e.avgTip = tipTotal / tips.length;
        
        // set meal count
        $scope.e.mealCount = m.length;
        
        // clear charges from UI
        _clearCharges();
    }
    
    function _calculate(price,tax,tip){
        var p = parseFloat(price);
        var tx = parseInt(tax) / 100 || 0;
        var tp = parseInt(tip) / 100 || 0;
        return {
            subtotal:   p + (p * tx),
            tipamount: (p + (p * tx)) * tp
        };
    }
    
    $scope.doCharges = function(){
        var price = $scope.f.baseMealPrice;
        var tax = $scope.f.taxRate;
        var tip = $scope.f.tipPercentage;
        var values = _calculate(price,tax,tip);
        
        $scope.c.subtotal = null;
        $scope.c.tip = null;
        $scope.c.total = null;
        
        if (price && !tax && !tip){
            $scope.c.subtotal = parseFloat($scope.f.baseMealPrice);
            
        } else if (price && tax && !tip){
            $scope.c.subtotal = values.subtotal;
            
        } else if (price && tax && tip){
            $scope.c.subtotal = values.subtotal;
            $scope.c.tip = values.tipamount;
            $scope.c.total = values.subtotal + values.tipamount;
        }
    };
    
    $scope.submitForm = function(){
        if ($scope.myForm.$valid){
            $scope.m.push(angular.copy($scope.f));
            _doEarnings();
            $scope.resetForm();
        }
    };
   
    $scope.resetForm = function(){
        var o = $scope.f;
        for (p in o){
            o.hasOwnProperty(p) && (o[p] = null);
        }
        $scope.myForm.$setPristine();

    };
    
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

