angular.module('app').controller('homeController', homeController);
homeController.$inject = ['$location', 'cursoService'];

function homeController($location, cursoService) {
    vm = this;
    vm.title = 'Home';
    vm.clientes = '';

    vm.init = function() {
        vm.listarClientes();
    }
    
    vm.navegar = function(route, id) {
        $location.path(route + '/' + id);
    }

    vm.listarClientes = function() {
        cursoService.exec_GET().then(function(response) {
            if(response) {
                if(response == '') {
                    return Swal.fire('Ops!', 'Não existe clientes cadastrados!', 'warnning')
                }
                vm.clientes = response;
            } else {
                Swal.fire('Ops! Algo deu errado!', 'Existem falhas na comunição com o servidor, cheque sua conexão!', 'error')
            }
        })
    }

    vm.callbackExcluir = function(id, nome) {
        cursoService.exec_DELETE(id).then(function(response) {
            if(response) {
                vm.clientes = response;
                Swal.fire('Ok', 'Cliente: ' + nome + ' foi exluido com sucesso', 'success')
            }
        })
    }

    vm.excluir = function(id, nome) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Excluido!',
                nome + ' foi excluido do registro!',
                'success'
              )
              vm.callbackExcluir(id, nome);
         } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado!',
                'O dados de '+nome+' ainda permanecem no registro! :)',
                'error'
              )
            } 
        })
    }

    vm.editar = function(id) {
        vm.navegar('Cadastro', id)
    }

  
}