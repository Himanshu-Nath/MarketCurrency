angular.module('myApp')

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('dashboard', {
          url : '/dashboard',
          templateUrl: 'app/components/dashboard/dashboard.view.html'
        });

        $urlRouterProvider.otherwise('/dashboard');
  }
])

.run(function ($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  });
});
