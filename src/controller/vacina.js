var request = require('request')
var vacinaRep = require('../repository/vacina.repository')()

module.exports = () => {

    const controller = {}  
    
    controller.listartodas = (req, res, callback) => {
        vacinaRep.listar((vacinas, err) => {    
            if (err) {
                return callback(err)
            }
            if (vacinas.length == 0)
                res.status(404).json(vacinas)
            else
                res.status(200).json(vacinas)     
        })
    }

    controller.salvar = (req, res, callback) => {
        const vacina = req.body;   

        vacinaRep.salvar(vacina, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (vacina.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.alterar = (req, res, callback) => {
        const vacina = req.body;   

        if (!vacina.id) {            
            throw {httpStatusCode: 400, code: 'ERRO4', message: 'O id é obrigatório'};
        }

        vacinaRep.alterar(vacina.id, vacina, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (vacina.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.excluir = (req, res) => {
        const id = req.params.id
        
        vacinaRep.excluir(id, (callback, err) => {      
            if (err) {
                return callback(err)
            }   
            
            res.status(200).json(callback)
        });

    }

    return controller
}