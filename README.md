<h1 align="center"> Controlar a carteirinha de vacinação de um paciente </h1>

### API utilizada (Infelizmente a mesma se encontra fora do ar)
[Unidades Básicas de Saúde (UBS)](https://dados.gov.br/dataset/unidades-basicas-de-saude-ubs/resource/1684b8d1-f8fd-4870-9556-31154b2d75c9)

### Features
- [x] CRUD Paciente
- [x] CRUD vacina
- [x] CRUD Unidade de saúde

### Pré-requisitos

Para testar a aplicação tenha instalado na sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código.

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

# Quanto a estrutura de diretórios
Como não há uma maneira correta, optei por acrescentar os arquivos dentro da pasta /src.
# Aluno
Lisemar Kaleski Sampaio

