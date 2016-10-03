var app = angular.module('myapp',['ngRoute','myservices']);

app.config(function($routeProvider)
{
  $routeProvider.when('/',
	{
	templateUrl:'view/PizzaView.html'
	
	}).
	when('/BillingPage',
	{
	templateUrl:'view/BillingPage.html',
	controller:'home'
	})
	.otherwise(
	{
	redirectTo: '/index.html'
	});
					
});

app.controller('home', function($rootScope,$scope, $http,$filter){

});


app.controller('myctrl', ['$rootScope','$scope','$location','getdetals', function($rootScope,$scope,$location,getdetals){


getdetals.details().then(function(res){
	$scope.country = res;
});

$scope.selectedtopings =[];
$scope.Addtopping = function(data , checked){
	if(checked === true){
	$scope.selectedtopings.push(data);
	}
	else{
		for(var i=0;i <$scope.selectedtopings.length;i++){
		if($scope.selectedtopings[i].TopingName === data.TopingName){
			$scope.selectedtopings.splice(i,1)
		}
	}	
		
	}
};
$scope.toppings=[];
$scope.cityChange= function(s){
	$scope.toppings = [];
	$scope.toppings = s.toppings;
};
$scope.orderNav = function(){
	var orderPizza ="You have ordered "+$scope.selectedtopings[0].toppingtype+" pizza with toppings : ";
	for(var i=0;i<$scope.selectedtopings.length;i++){
		orderPizza += $scope.selectedtopings[i].TopingName + ',';
	}
	alert(orderPizza)
	$scope.selectedtopings =[];
	$rootScope.orderedPizza= orderPizza;
	$location.path('/BillingPage');
	
};
$scope.Cheese = function(cheese){
	$scope.toppingChease =[];
	for(var i=0;i<$scope.toppings.length;i++ ){
		if($scope.toppings[i].toppingtype === cheese){
			$scope.toppingChease.push($scope.toppings[i]);
		}
	}
};
}])

angular.module('myservices', []).service('getdetals', function($http) {
	var getdetals = {
	    details: function() {
	        var promise = $http.get('js/jsondata.json').then(function(rep){
				return rep.data.records;
				})
				return promise;
			}
	    };
	   return getdetals;
	});