![Descrição banner](https://github.com/user-attachments/assets/eee53994-1651-4d35-9131-880c091791f8)

# 🚀 FoodBridge – RESTful API

---

## 📌 Introdução

A **FoodBridge API** é uma RESTful API criada para suportar o aplicativo móvel FoodBridge, uma plataforma focada na conexão entre doadores e receptores de alimentos. O objetivo central é promover uma prática de doação simples, gratuita e eficaz, com impacto social direto.

**Objetivos principais:**

- Gestão de usuários (registro, atualização e autenticação).
- Criação, atualização, listagem e exclusão de doações.
- Acompanhamento de doações realizadas por usuários específicos.

## 🛠️ Tecnologias utilizadas

- **Node.js + Express**: Escolhido pela simplicidade, robustez e eficiência na criação de APIs rápidas e escaláveis.
- **MongoDB (ou banco configurado)**: Para armazenamento eficiente e escalável dos dados da aplicação.
- **Nodemon**: Facilita o desenvolvimento com reinício automático do servidor durante alterações no código.
- **CORS**: Para garantir segurança no acesso externo, permitindo conexões específicas.
- **Middleware customizado**: Para validação e tratamento centralizado de erros.
- **Deploy via Fly.io**: Hospedagem leve, rápida e confiável.
- **Postman e Swagger**: Testes manuais e documentação automatizada para facilitar uso e integração.

## 📁 Estrutura do Projeto

```bash
FoodBridge-API/
├── src/
│   ├── config/           # Configuração geral (ex: conexão com DB)
│   ├── controllers/      # Lógica de negócio
│   ├── middlewares/      # Tratamento de erros e validação
│   ├── models/           # Esquemas para banco de dados
│   ├── routes/           # Definição das rotas da API
│   ├── utils/            # Funções auxiliares
│   └── validation/       # Validações de entrada
├── uploads/              # Armazena arquivos enviados
├── Dockerfile            # Containerização do app
├── fly.toml              # Configuração para deploy no Fly.io
├── package.json          # Dependências e scripts
├── swagger.yaml          # Documentação Swagger
└── README.md             # Documentação detalhada

```

**Destaques técnicos:**

- `controllers`: Principal lógica das rotas (ex.: donationController.js e userController.js).
- `middlewares`: Tratamento de erros (`errorHandler.js`) e validações (`validateBody.js`, `validateParams.js`).
- `routes`: Organiza endpoints por responsabilidade (userRoutes.js, donationRoutes.js).
- `config`: Gerenciamento da conexão com o banco (`db.js`).

## 📡 Endpoints Disponíveis

### 🔑 Autenticação

- **POST ****`/users/login`**: Autentica usuário com email e senha.

### 👥 Usuários

- **POST ****`/users`**: Cria usuário.
- **GET ****`/users/:id`**: Retorna usuário por ID.
- **PUT ****`/users/:id`**: Atualiza usuário.
- **DELETE ****`/users/:id`**: Remove usuário.
- **GET ****`/users/:id/completo`**: Ficha completa do usuário.

### 📦 Doações

- **POST ****`/donations`**: Cria nova doação.
- **GET ****`/donations`**: Lista todas as doações.
- **GET ****`/donations/:id`**: Retorna doação por ID.
- **PUT ****`/donations/:id`**: Atualiza doação.
- **DELETE ****`/donations/:id`**: Remove doação.
- **GET ****`/donations/:id/gallery`**: Galeria de imagens da doação.
- **GET ****`/donations/user/:id`**: Doações feitas por usuário específico.

## 🧪 Testando a API localmente

**Rodar localmente:**

```bash
git clone -b rest-api https://github.com/MacaulyV/FoodBridge-App.git
cd FoodBridge-App
npm install
npm start

```

### Ferramentas:

- **Postman/Insomnia**: Use esses clientes REST para fazer requisições locais.
- **Swagger**: Acesse em `http://localhost:3000/api-docs`.

## 🌐 Consumindo a API em Produção

**URL Pública:** [https://foodbridge-api.fly.dev](https://foodbridge-api.fly.dev/)

Envie requisições conforme especificado nos endpoints acima. Use corretamente os headers (ex: `Content-Type: application/json`).

## 🔐 Segurança e Tratamento de Erros

- ✅ **Validações:** Uso do Joi para validar entradas.
- 🛡️ **Middleware de erros:** Tratamento centralizado de erros com status HTTP claros.
- 🔒 **Dados sensíveis:** Gerenciados via `.env`.
- 📌 **CORS:** Limitado ao front-end autorizado.

## 🧠 Explicação Humanizada

Este projeto foi pensado para facilitar não só a vida de quem usa o app diretamente, mas também de quem desenvolve ou avalia o código. Tudo foi cuidadosamente organizado para ser intuitivo, claro e eficiente. Desde a divisão em rotas e controladores, até a documentação técnica detalhada, cada linha de código tem um propósito claro: tornar fácil e agradável tanto usar quanto contribuir com a API FoodBridge. 💪🌱
