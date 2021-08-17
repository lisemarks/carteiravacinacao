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

            connection.query('SELECT * FROM cadvacina', function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })
    }

    repository.salvar = (vacina, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }
            connection.query('INSERT INTO cadvacina SET ?', vacina, function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir a vacina"
                    error.httpStatusCode = 500
                    error.code = 'ERRO2'
                    return callback(null, error)
                }

                vacina.id = res.insertId

                connection.end();
                return callback(vacina, null)
            })
        })
    }

    repository.alterar = (id, vacina, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('UPDATE cadvacina SET ? WHERE id = ?', [vacina, id], function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao alterar a vacina"
                    error.httpStatusCode = 500
                    error.code = 'ERRO4'
                    return callback(null, error)
                }
              
                connection.end();
                return callback(vacina, null)
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

            connection.query('DELETE FROM cadvacina WHERE id = ?', [id] , function (err, rows) {
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