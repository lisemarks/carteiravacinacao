var mysql = require('mysql');

module.exports = () => {

    const repository = {}

    function conectar(callback) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ramesil',
            database: 'unidadebasicasaude'
        });

        connection.connect(function (err) {
            if (err) {
                return callback(connection, err)
            }

            return callback(connection, err);
        });
    }

    repository.inserir = (carteiravacinacao, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }
            connection.query('insert into cadcarteiravacinacao (idPaciente, idVacina) select ?, id from cadvacina;', [carteiravacinacao.idPaciente], function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir a carteira de vacinacao"
                    error.httpStatusCode = 500
                    error.code = 'ERRO2'
                    return callback(null, error)
                }

                connection.end();
                return callback(carteiravacinacao, null)
            })
        })
    }

    repository.alterarvencimento = (carteiravacinacao, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }
            connection.query('update cadcarteiravacinacao set DataVencimento = ? where idPaciente = ? and idVacina = ?', [carteiravacinacao.Vencimento, carteiravacinacao.idPaciente, carteiravacinacao.idVacina], function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao alterar a o vencimento da aplicação da vacina"
                    error.httpStatusCode = 500
                    error.code = 'ERRO2'
                    return callback(null, error)
                }

                connection.end();
                return callback(carteiravacinacao, null)
            })
        })
    }

    return repository
}