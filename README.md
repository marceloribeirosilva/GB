# Bem vindo ao projeto GB - Cashback!

Este projeto consiste em criar um sistema de Cashback, onde o valor será disponibilizado como crédito para a próxima compra da revendedora.

# Principais Tecnologias utilizadas
**[Typescript:](https://www.typescriptlang.org/)** É um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem.

**[TypeOrm:](https://typeorm.io/#/)** É um [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) que pode ser executado nas plataformas NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo e Electron e pode ser usado com TypeScript e JavaScript (ES5, ES6, ES7, ES8).

**[Tsyringe:](https://www.npmjs.com/package/tsyringe?activeTab=readme)** Um container de injeção de dependência para Typescript/Javascript.

**[Babel-plugin-module-resolver:](https://github.com/tleunen/babel-plugin-module-resolver)** Um plugin babel que nos ajuda a trabalhar com modules nos imports.

**[Jest:](https://jestjs.io/pt-BR/)** Framework de testes.

**[Express:](https://expressjs.com/pt-br/)** É um framework robusto que auxilia na criação da Api.

**[Axios:](https://axios-http.com/docs/intro)** Cliente Http.

**[Mysql:](https://www.mysql.com/)** Banco de dados relacional.

**[Docker-Compose:](https://docs.docker.com/compose/install/)** Foi adicionado um arquivo yaml subindo o serviço do Mysql já com o banco configurado.

**[Jwt:](https://jwt.io/)** Json Web Token para deixar as rotas mais seguras.

**[Bcryptjs:](https://www.npmjs.com/package/bcryptjs)** Utilizado para criar um hash da senha do usuário antes de guardar no banco de dados.

# Rotas

**/dealers/create** => Responsável por criar o registro dos revendedores no banco de dados MySql.

      curl --location --request POST 'http://localhost:3333/dealers/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Marcelo 1",
        "cpf": "646.547.280-58",
        "email": "marcelo1@email.com",
        "password": "123"
    }'

*Response*

    {
    "name": "Marcelo 1",
    "cpf": "64654728058",
    "email": "marcelo1@email.com",
    "id": 1,
    "created_at": "2021-07-20T01:39:01.000Z",
    "updated_at": "2021-07-20T01:39:01.000Z"
    }

**/dealers/sessions** => Responsável por logar o usuário e retornar um token JWT.

    curl --location --request POST 'http://localhost:3333/dealers/sessions' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "marcelo1@email.com",
        "password": "123"
    }'

*Response*

    {
    	"dealer": {
    	"id": 1,
    	"name": "Marcelo 1",
    	"cpf": "64654728058",
    	"email": "marcelo1@email.com",
    	"created_at": "2021-07-20T01:39:01.000Z",
    	"updated_at": "2021-07-20T01:39:01.000Z"
    	},
    	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY3MzQzNjEsImV4cCI6MTYyNjgyMDc2MX0.Z1qe-C96IvcDDPuBqyKko_EEFE2YFjIBtdkvBHNnrL0"
    }

**/orders** => Responsável por registrar uma venda da Revendedora. Assim que a compra que a Revendedora realizou é finalizada no sistema, o mesmo já dispara o serviço que realiza o cálculo do cashback e salva na tabela.

    curl --location --request POST 'http://localhost:3333/orders' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY3MzQzNjEsImV4cCI6MTYyNjgyMDc2MX0.Z1qe-C96IvcDDPuBqyKko_EEFE2YFjIBtdkvBHNnrL0' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "cpf": "646.547.280-58",
        "valor": 5680    
    }'

*Response*

    {
    	"order": {
    	"cpf": "64654728058",
    	"valor": 5680,
    	"status": "Em Validação",
    	"id": 15,
    	"created_at": "2021-07-20T05:06:35.000Z",
    	"updated_at": "2021-07-20T05:06:35.000Z"
    	},
    	"cashback": {
    	"valor": 1136,
    	"percentual": 20
    	}
    }

**/orders/1** => Utilizado com o verbo PUT, realiza a atualização do pedido, seguindo regras de negócio.

    curl --location --request PUT 'http://localhost:3333/orders/1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY2MzMwMTksImV4cCI6MTYyNjcxOTQxOX0.L4-gnhcV1nfQwbCoXQ-GHqeYeLmITEBeB6H7evwm_xw' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "valor": 810,
        "status": "Aprovado"
    }'

**/orders/1** => Utilizado com o verbo DELETE, realiza a exclusão do pedido, seguindo regras de negócio.

    curl --location --request DELETE 'http://localhost:3333/orders/1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY2MzMwMTksImV4cCI6MTYyNjcxOTQxOX0.L4-gnhcV1nfQwbCoXQ-GHqeYeLmITEBeB6H7evwm_xw'

**/reports/orders/{cpf}** => Responsável por buscar as vendas daquele cpf juntamente com os valores de cashback de cada compra.

    curl --location --request GET 'http://localhost:3333/reports/orders/64654728058' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY3MTM0NjksImV4cCI6MTYyNjc5OTg2OX0.AcLosZEMToAmEB7C9KmS0tdtxgSmDYNZlSb5W5ar-hw'

*Response*

    {
    	"statuscode": 200,
    	"body": [
    		{
    		"codigo": 14,
    		"data": "Mon Jul 19 2021 22:40:40 GMT-0300 (Brasilia Standard Time)",
    		"valor": "1150.00",
    		"%_cashback": 15,
    		"$_cashback": "172.50",
    		"status": "Em Validação"
    		},
    		{
    		"codigo": 15,
    		"data": "Tue Jul 20 2021 02:06:35 GMT-0300 (Brasilia Standard Time)",
    		"valor": "5680.00",
    		"%_cashback": 20,
    		"$_cashback": "1136.00",
    		"status": "Em Validação"
    		}
    	]
    }

**/reports/cashback/{cpf}** => Responsável por trazer o acumulado de cashback do período.

    curl --location --request GET 'http://localhost:3333/reports/cashback/64654728058' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY3MTM0NjksImV4cCI6MTYyNjc5OTg2OX0.AcLosZEMToAmEB7C9KmS0tdtxgSmDYNZlSb5W5ar-hw'

*Response*

    {
    	"statuscode": 200,
    	"body": {
    		"Total de Cashback": 1306
    	}
    }

# Testes Unitários

Até o presente momento este código está com 100% de cobertura de testes unitários.

![Coverage gerado pelo Jest](https://github.com/marceloribeirosilva/GB/blob/master/images/coverage.png)

### Para rodar o teste

    npm run test

# Passos para rodar localmente

 1. Clonar o repositório ou realizar o download do mesmo.
 2. No terminal, dentro da pasta do projeto, rodar o comando para baixar o node_modules: `npm i`
 3. No terminal, dentro da pasta do projeto, rodar o seguinte comando: `docker-compose up -d` 
	 (Esse comando irá subir o serviço do Mysql já configurando uma base de dados, com usuário e senha sendo os mesmos que estão configurados no TypeOrm)
 4. Rodar o seguinte comando: `npm run typeorm migration:run`
	(Esse comando irá rodar as migrations para criar as tabelas necessárias do projeto)
 5. Rodar o comando para inicializar o servidor: `npm run server`
 6. Através do Postman ou qualquer outro cliente, utilizar as rotas apresentadas.
