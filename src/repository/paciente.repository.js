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

            connection.query('SELECT * FROM cadpaciente', function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })
    }

    repository.buscar = (id, callback)  => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('SELECT * FROM cadpaciente WHERE id = ?', [id] , function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })
    }

    repository.salvar = (paciente, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }
           
            connection.query('INSERT INTO cadpaciente SET ?', paciente, function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir o paciente"
                    error.httpStatusCode = 500
                    error.code = 'ERRO2'
                    return callback(null, error)
                }

                paciente.id = res.insertId

                connection.end();
                return callback(paciente, null)
            })
        })
    }

    repository.alterar = (id, paciente, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERRO1'
                return callback(null, error)
            }

            connection.query('UPDATE cadpaciente SET ? WHERE id = ?', [paciente, id], function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao alterar o paciente"
                    error.httpStatusCode = 500
                    error.code = 'ERRO4'
                    return callback(null, error)
                }
              
                connection.end();
                return callback(paciente, null)
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

            connection.query('DELETE FROM cadpaciente WHERE id = ?', [id] , function (err, rows) {
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