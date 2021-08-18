<h1 align="center"> Controlar a carteirinha de vacinação de um paciente </h1>

### API utilizada (Infelizmente a mesma se encontra fora do ar)
[Unidades Básicas de Saúde (UBS)](https://rest-demas.saude.gov.br/api/estabelecimento)

### Features
- [x] CRUD Paciente
- [x] CRUD vacina
- [x] CRUD Unidade de saúde
- [x] Criar carteirinha com todas as vacinas
- [x] Marcar o vencimento de cada vacina para um determinado paciente
- [ ] Atribuir unidade de saúde a um paciente
- [ ] Marcar que o paciente já tomou uma determinada vacina
### Pré-requisitos

Para testar a aplicação tenha instalado na sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código e um aplicativo para testes (No meu caso utilizo o postman).

### Instalações se necessárias
npm install axios --save 

npm install express --save 

npm install mysql --save 

npm install request --save 

npm install nodemon --save

### Rodando a aplicação

# Clone o repositório
$ git clone <https://github.com/lisemarks/carteiravacinacao.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ node index.js

# Requisições postman
Listar todos os pacientes
Get: http://localhost:3333/api/paciente/listartodos

Buscar paciente por id
Get: http://localhost:3333/api/paciente/6

Inserir paciente
Post: http://localhost:3333/api/paciente
{
    "Nome": "Lisemar",
    "Latitude": "11",
    "Longitude": "12",
    "idUnidadesaude": null
}

Alterar paciente
Put: http://localhost:3333/api/paciente
{
    "id": 1,
    "Nome": "Lisemar alterado",
    "Latitude": "11",
    "Longitude": "12",
    "idUnidadesaude": null
}

Deletar paciente
Delete: http://localhost:3333/api/paciente/1

Listar todas as unidades de saude
Get: http://localhost:3333/api/unidadesaude/todas

Inserir unidade de saude
Post: http://localhost:3333/api/unidadesaude
{
    "Nome": "Weissópolis",
    "Logradouro": "Rua rio dos testes",
    "Numero": "235",
    "Bairro": "Weissópolis",
    "Cidade": "Pinhais",
    "Estado": "PR",
    "Latitude": "1",
    "Longitude": "2",
    "id": 1
}

Alterar unidade de saúde
Put: http://localhost:3333/api/unidadesaude
{
    "id": 1,
   "Nome": "Weissópolis 1",
   "Logradouro": "Rua rio dos testes",
   "Numero": "235",
   "Bairro": "Weissópolis",
   "Cidade": "Pinhais",
   "Estado": "PR",
   "Latitude": "1",
   "Longitude": "2"
}

Deletar unidade de saúde
Delete: http://localhost:3333/api/unidadesaude/1

Listar todas as vacinas
Get: http://localhost:3333/api/vacinas/todas

Inserir uma nova vacinas
Post: http://localhost:3333/api/vacinas
{
   "Nome": "Sarampo"
}

Alterar vacinas
Put: http://localhost:3333/api/vacinas
{
   "id": 1,
   "Nome": "Sarampoa"
}

Excluir vacinas
Delete: http://localhost:3333/api/vacinas/1

Inserir a carteira de vacinação
Post: http://localhost:3333/api/carteiravacinacao
{
    "idPaciente": 9
}

Alterar vencimento de uma vacina para um determinado paciente
Post: http://localhost:3333/api/carteiravacinacao/alterarvencimento
{
    "idPaciente": 9,
    "Vencimento": "2021-08-19",
    "idVacina": 2
}

Listar as vacinas já tomadas
Get: http://localhost:3333/api/paciente/listarvacinastomadas/5

Listar as vacinas não tomadas
Get: http://localhost:3333/api/paciente/listarvacinasnaotomadas/5

Listar as vacinas que vão vencer nos próximos 15 dias
Get: http://localhost:3333/api/paciente/listarvacinasvencerquinze/5

# Quanto a estrutura de diretórios
Como não há uma maneira correta, optei por acrescentar os arquivos dentro da pasta /src.

# Scripts de banco de dados
CREATE DATABASE unidadebasicasaude;

use unidadebasicasaude;

CREATE TABLE `cadunidadesaude` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `Nome` varchar(100) NOT NULL,
   `Logradouro` varchar(500) NOT NULL,
   `Numero` varchar(45) DEFAULT NULL,
   `Bairro` varchar(200) DEFAULT NULL,
   `Cidade` varchar(200) DEFAULT NULL,
   `Estado` varchar(2) DEFAULT NULL,
   `Latitude` decimal(11,8) DEFAULT NULL,
   `Longitude` decimal(11,8) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `cadvacina` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `Nome` varchar(100) NOT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
CREATE TABLE `cadpaciente` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `Nome` varchar(100) NOT NULL,
   `Latitude` varchar(50) DEFAULT NULL,
   `Longitude` varchar(50) DEFAULT NULL,
   `idUnidadesaude` int unsigned DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `idx_cadpaciente_cadunidadesaude_id` (`idUnidadesaude`),
   CONSTRAINT `fk_cadpaciente_cadunidadesaude_id` FOREIGN KEY (`idUnidadesaude`) REFERENCES `cadunidadesaude` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
CREATE TABLE `cadcarteiravacinacao` (
   `id` int unsigned NOT NULL AUTO_INCREMENT,
   `idPaciente` int unsigned NOT NULL,
   `idVacina` int unsigned NOT NULL,
   `Tomou` bit(1) NOT NULL DEFAULT b'0',
   `DataVencimento` datetime DEFAULT NULL,
   `DataAplicacao` datetime DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `idx_cadcarteiravacinacao_vacina_id` (`idVacina`),
   KEY `idx_cadcarteiravacinacao_paciente_id` (`idPaciente`),
   KEY `idx_cadcarteiravacinacao_tomou` (`Tomou`) /*!80000 INVISIBLE */,
   KEY `idx_cadcarteiravacinacao_datavencimento` (`DataVencimento`),
   CONSTRAINT `fk_cadcarteiravacinacao_paciente_id` FOREIGN KEY (`idPaciente`) REFERENCES `cadpaciente` (`id`),
   CONSTRAINT `fk_cadcarteiravacinacao_vacina_id` FOREIGN KEY (`idVacina`) REFERENCES `cadvacina` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
# Aluno
Lisemar Kaleski Sampaio

