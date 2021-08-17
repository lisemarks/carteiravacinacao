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

    repository.listar = (callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('SELECT * FROM cadunidadesaude', function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })
    }

    repository.salvar = (unidade, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }
            connection.query('INSERT INTO cadunidadesaude SET ?', unidade, function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir a unidade basica de saúde"
                    error.httpStatusCode = 500
                    error.code = 'ERRO2'
                    return callback(null, error)
                }

                unidade.id = res.insertId

                connection.end();
                return callback(unidade, null)
            })
        })
    }

    repository.alterar = (id, unidade, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('UPDATE cadunidadesaude SET ? WHERE id = ?', [unidade, id], function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao alterar a unidade de saúde"
                    error.httpStatusCode = 500
                    error.code = 'ERRO4'
                    return callback(null, error)
                }
              
                connection.end();
                return callback(unidade, null)
            })
        })
    }

    repository.excluir = (id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('DELETE FROM cadunidadesaude WHERE id = ?', [id] , function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })
    }

    return repository

}