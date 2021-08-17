var request = require('request')
var carteiravacinacaoRep = require('../repository/carteiravacinacao.repository')()

module.exports = () => {

    const controller = {}  
    
    controller.inserir = (req, res, callback) => {
        const carteiravacinacao = req.body;   

        carteiravacinacaoRep.inserir(carteiravacinacao, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            if (carteiravacinacao.length == 0)
                res.status(404).json(callback)        
            else
                res.status(200).json(callback)  
        });
       
    }

    controller.alterarvencimento = (req, res, callback) => {
        const carteiravacinacao = req.body;   

        carteiravacinacaoRep.alterarvencimento(carteiravacinacao, (callback, err) => {      
            if (err) {
                return callback(err)
            }         
            res.status(200).json(callback)  
        });
       
    }

    return controller
}