angular.module('app').controller('navigationController', navigationController);
navigationController.$inject = ['$location'];

function navigationController($location) {
    vm = this;
    vm.tabsNavigation = [
        {title: 'Home', class: 'nav-link active'},
        {title: 'Cadastro', class: 'nav-link'}
    ]
    
    vm.navegar = function(route, array) {
        angular.forEach(array, function(tab){
            if(tab.title == route) {
                tab.class = 'nav-link active'
            } else {
                tab.class = 'nav-link'
            }
        })
        $location.path(route)
    }
}