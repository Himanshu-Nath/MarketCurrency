angular.module('myApp')

.controller('MainController', [ '$state', '$rootScope', function( $state, $rootScope ) {
	var vm = this;
	vm.$state = $state;
	
	/*$rootScope.$on('$stateChangeSuccess', function() {
		alert(vm.$state.current.name);
	});*/
	
	return vm;
}
]);
