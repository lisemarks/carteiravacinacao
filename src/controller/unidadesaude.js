var request = require('request')
var unidadeRep = require('../repository/unidade.repository')()

module.exports = () => {

    const controller = {}  
    
    controller.listartodas = (req, res, callback) => {
        unidadeRep.listar((unidades, err) => {    
            if (err) {
                return callback(err)
            }
            if (unidades.length == 0)
                res.status(404).json(unidades)
            else
                res.status(200).json(unidades)     
        })
    }

    controller.salvar = (req, res, callback) => {
        const unidade = req.body;   

        unidadeRep.salvar(unidade, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (unidade.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.alterar = (req, res, callback) => {
        const unidade = req.body;   

        if (!unidade.id) {            
            throw {httpStatusCode: 400, code: 'ERRO4', message: 'O id é obrigatório'};
        }

        unidadeRep.alterar(unidade.id, unidade, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (unidade.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.excluir = (req, res) => {
        const id = req.params.id
        
        unidadeRep.excluir(id, (callback, err) => {      
            if (err) {
                return callback(err)
            }   
            
            res.status(200).json(callback)
        });

    }

    return controller
}