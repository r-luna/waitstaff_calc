var app = angular.module('app', ['ngRoute','ngMessages','ngAnimate'])
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
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'templates/home.html',
            controller : 'HomeController as home'
        }).when('/new_meal/', {
            templateUrl : 'templates/new_meal.html',
            controller : 'NewMealController as newmeal'
        }).when('/earnings/', {
            templateUrl : 'templates/my_earnings.html',
            controller : 'EarningsController as earnings'
        }).when('/error/', {
            templateUrl : 'templates/error.html'
        })
        .otherwise('/');
    }]);


