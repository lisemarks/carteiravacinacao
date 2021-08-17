var request = require('request')
var pacienteRep = require('../repository/paciente.repository')()

module.exports = () => {

    const controller = {}  
    
    controller.listartodos = (req, res, callback) => {
        pacienteRep.listar((pacientes, err) => {    
            if (err) {
                return callback(err)
            }
            if (pacientes.length == 0)
                res.status(404).json(pacientes)        
            else
                res.status(200).json(pacientes)     
        })
    }

    controller.listar = (req, res) => {
        const id = req.params.id 

        pacienteRep.buscar(id, (pacientes, err) => {    
            if (err) {
                return callback(err)
            }
            if (pacientes.length == 0)
                res.status(404).json(pacientes)        
            else
                res.status(200).json(pacientes)     
        })
    }

    controller.listarvacinastomadas = (req, res) => {
        const id = req.params.id 

        pacienteRep.buscarvacinastomadas(id, (pacientes, err) => {    
            if (err) {
                return callback(err)
            }
            if (pacientes.length == 0)
                res.status(404).json(pacientes)        
            else
                res.status(200).json(pacientes)     
        })
    }

    controller.listarvacinasnaotomadas = (req, res) => {
        const id = req.params.id 

        pacienteRep.buscarvacinasnaotomadas(id, (pacientes, err) => {    
            if (err) {
                return callback(err)
            }
            if (pacientes.length == 0)
                res.status(404).json(pacientes)        
            else
                res.status(200).json(pacientes)     
        })
    }

    controller.listarvacinasavencerquinzedias = (req, res) => {
        const id = req.params.id 

        pacienteRep.buscarvacinasavencerquinzedias(id, (pacientes, err) => {    
            if (err) {
                return callback(err)
            }
            if (pacientes.length == 0)
                res.status(404).json(pacientes)        
            else
                res.status(200).json(pacientes)     
        })
    }

    controller.salvar = (req, res, callback) => {
        const pacientes = req.body;   

        if (!pacientes.Nome) {            
            throw {httpStatusCode: 400, code: 'ERRO3', message: 'O nome é obrigatório'};
        }

        pacienteRep.salvar(pacientes, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (pacientes.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.alterar = (req, res, callback) => {
        const paciente = req.body;   

        if (!paciente.id) {            
            throw {httpStatusCode: 400, code: 'ERRO4', message: 'O id é obrigatório'};
        }

        pacienteRep.alterar(paciente.id, paciente, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (paciente.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.excluir = (req, res) => {
        const id = req.params.id
        
        pacienteRep.excluir(id, (callback, err) => {      
            if (err) {
                return callback(err)
            }   
            
            res.status(200).json(callback)
        });

    }

    controller.unidade = (req, res) => {

        let bairro = req.bairro
        
        axios.get('https://rest-demas.saude.gov.br/api/estabelecimento')
        .then(function (response) {

            console.log(response.data)

            bairros = response.data.estabelecimentos.filter(function(o){
                return o.bairro.toLowerCase().includes(bairro);
            });
        })
        .catch(function (error) {
            console.error(error);
        });

    }

    return controller
}