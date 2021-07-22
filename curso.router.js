angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/Cadastro/:idCliente?', {
            templateUrl: 'cadastro/cadastro.html',
            controller: 'cadastroController as vm'
        })
        .otherwise({
            templateUrl: 'home/home.html',
            controller: 'homeController as vm'
        })
})