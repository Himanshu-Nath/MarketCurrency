angular.module('myApp')

.controller('DashboardController', ['$state', '$rootScope', 'localStorageService', 'DashboardService', '$window',
  function($state, $rootScope, localStorageService, DashboardService, $window) {

    var vm = this;
    $rootScope.showSpinner = true;
    getMarketCurrencyList();

    vm.toggleRow = function () {
        vm.selected = !vm.selected;
      };
  
      vm.isSelected = function (i) {
        return vm.selected;
      };

    function getMarketCurrencyList() {        
        DashboardService.getCurrencyList()
        	.then(function(response) {
                if (response) {                    
                    vm.currencyList = response.marketList;
                } else {
                }
          },
        function(error) {});
    }
  }
]);