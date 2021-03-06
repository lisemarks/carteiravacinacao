const routing = require('express').Router();
var pacienteController = require('../controller/paciente')()
var unidadesaudeController = require('../controller/unidadesaude')()
var vacinasController = require('../controller/vacina')()
var carteiravacinacaoController = require('../controller/carteiravacinacao')()

routing.get('/api/paciente/listarvacinastomadas/:id', pacienteController.listarvacinastomadas)
routing.get('/api/paciente/listarvacinasnaotomadas/:id', pacienteController.listarvacinasnaotomadas)
routing.get('/api/paciente/listarvacinasvencerquinze/:id', pacienteController.listarvacinasavencerquinzedias)

routing.get('/api/paciente/todos', pacienteController.listartodos)
routing.get('/api/paciente/ubsproxima', pacienteController.unidade)
routing.get('/api/paciente/:id', pacienteController.listar)
routing.post('/api/paciente', pacienteController.salvar)
routing.put('/api/paciente', pacienteController.alterar)
routing.delete('/api/paciente/:id', pacienteController.excluir)

routing.get('/api/unidadesaude/todas', unidadesaudeController.listartodas)
routing.post('/api/unidadesaude', unidadesaudeController.salvar)
routing.put('/api/unidadesaude', unidadesaudeController.alterar)
routing.delete('/api/unidadesaude/:id', unidadesaudeController.excluir)

routing.get('/api/vacinas/todas', vacinasController.listartodas)
routing.post('/api/vacinas', vacinasController.salvar)
routing.put('/api/vacinas', vacinasController.alterar)
routing.delete('/api/vacinas/:id', vacinasController.excluir)

routing.post('/api/carteiravacinacao/alterarvencimento', carteiravacinacaoController.alterarvencimento)
routing.post('/api/carteiravacinacao', carteiravacinacaoController.inserir)

module.exports = routing