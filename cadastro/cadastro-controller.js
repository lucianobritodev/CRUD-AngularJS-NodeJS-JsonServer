angular.module('app').controller('cadastroController', cadastroController);
cadastroController.$inject = ['$location', 'cursoService', '$routeParams'];

function cadastroController($location, cursoService, $routeParams) {
    vm = this;
    vm.title = 'Cadastrar';
    vm.message = 'Prencha os campos para cadastrar um novo cliente.'
    vm.cliente = {}
    vm.idCliente = undefined;
    vm.textButton = 'Cadastrar';
       
    if($routeParams.idCliente) {
        vm.idCliente = $routeParams.idCliente
         buscarId(vm.idCliente)
         vm.textButton = 'Salvar'
         vm.title = 'Editar'
         vm.message = 'Após editar, confira os campos e pressione em \"Salvar\".'
    }

    vm.navegar = function(route) {
        $location.path(route)
    }

    vm.cadastrarClientes = function(nome) {
        if(vm.cliente.nome == null || vm.cliente.cpf == null || vm.cliente.rg == null || vm.cliente.tel == null || vm.cliente.email == null) {
            return Swal.fire('Campos vazios!', 'Por favor preencha os campos!', 'error')
        }
         if(vm.textButton == 'Cadastrar') {
            cursoService.exec_POST(vm.cliente).then(function(response) {
                if(response) {
                    vm.clientes = response;
                    Swal.fire('Ok', 'Cliente ' + nome + ' atualizado como sucesso!', 'success')
                } else {
                    Swal.fire('Ops! Algo deu errado!', 'Não foi possível aualizar o cadastro de ' + nome, 'error')
                }
            })
         } else if(vm.textButton == 'Salvar') {
            cursoService.exec_PUT(vm.cliente).then(function(response) {
                if(response) {
                    vm.clientes = response;
                }
            })
         }
         vm.navegar('/')
    }

    function buscarId(id) {
        cursoService.exec_GET_ID(id).then(function(response) {
            if(response) {
                vm.cliente = response;
            }
        })
    }
    
    vm.cancelarCadastro = function() {
        vm.limparCampos();
        vm.navegar('/');
    }

    vm.limparCampos = function() {
        vm.cliente = {}
    }
}