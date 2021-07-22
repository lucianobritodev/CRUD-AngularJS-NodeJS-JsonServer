angular.module('app').factory('cursoService', cursoService);
cursoService.$inject = ["$http"];

const url = 'http://localhost'
const port = '3000'
const page = 'clientes'
const urlRestApi = url + ':' + port + '/' + page

function cursoService($http) {
    var service = {
        exec_GET: function() {
            return $http.get(urlRestApi).then(tratarResposta, tratarErro);
        },
        exec_GET_ID: function(id) {
            return $http.get(urlRestApi +  '/' + id).then(tratarResposta, tratarErro);
        },
        exec_POST: function(cliente) {
            return $http.post(urlRestApi, cliente).then(tratarResposta, tratarErro);
        },
        exec_PUT: function(cliente) {
            return $http.put(urlRestApi +  '/' + cliente.id, cliente).then(tratarResposta, tratarErro);
        },
        exec_DELETE: function(id) {
            return $http.delete(urlRestApi +  '/' + id).then(tratarResposta, tratarErro);
        },
    }
    
    function tratarResposta(response) {
        return response.data;
    }

    function tratarErro(error) {
        return error.data;
    }

    return service;
}