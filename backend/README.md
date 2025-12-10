# Backend - Calculadora de Tributação

Backend Node.js + Express com autenticação JWT, PostgreSQL e envio de e-mail para NAF.

## Pré-requisitos

- Node.js 16+
- Docker e Docker Compose
- Git

## Setup Inicial

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com seus valores:

```bash
cp .env.example .env
```

**Edite `.env` com:**
- `DB_PASSWORD`: Senha do PostgreSQL (deve corresponder ao docker-compose.yml)
- `JWT_SECRET`: Chave secreta para JWT (gere uma aleatória)
- `EMAIL_USER` e `EMAIL_PASSWORD`: Credenciais do seu serviço de e-mail (ex: Gmail)
- `FRONTEND_URL`: URL do seu frontend (ex: http://localhost:5173)

### 3. Iniciar PostgreSQL com Docker

```bash
docker-compose up -d
```

Para verificar se o container está rodando:
```bash
docker-compose ps
```

### 4. Inicializar o banco de dados

```bash
npm run db:init
```

Este comando criará as tabelas `users` e `comparisons`.

### 5. Iniciar o servidor

**Modo desenvolvimento (com hot-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

## Endpoints

### Autenticação

#### Registrar novo usuário
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": { "id": 1, "email": "usuario@email.com" },
  "token": "eyJhbGc..."
}
```

#### Fazer login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": { "id": 1, "email": "usuario@email.com" },
  "token": "eyJhbGc..."
}
```

#### Obter perfil (requer autenticação)
```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGc...
```

**Resposta (200):**
```json
{
  "user": { "id": 1, "email": "usuario@email.com", "created_at": "2024-12-07T..." }
}
```

### Email / NAF

#### Enviar resultado para NAF (requer autenticação)
```bash
POST /api/email/send-to-naf
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "nafEmail": "naf@email.com",
  "userEmail": "usuario@email.com",
  "comparisonData": {
    "input": {
      "rendaMensal": 5000,
      "custosMensais": 500,
      "profissao": "Psicólogo(a)"
    },
    "PF": {
      "base": 4500,
      "imposto": 450,
      "liquido": 4550,
      "effectiveRate": 0.09
    },
    "PJ": {
      "impostoMensal": 300,
      "prolabore": 1400,
      "inss": 154,
      "irProlabore": { "imposto": 0 },
      "totalImpostos": 454,
      "liquido": 4546,
      "effectiveRate": 0.0908
    }
  }
}
```

**Resposta (200):**
```json
{
  "message": "Email enviado com sucesso para o NAF",
  "messageId": "unique_message_id"
}
```

## Configurar Email com Gmail

1. Ative a autenticação de dois fatores na sua conta Google
2. Crie uma senha de aplicativo em: https://myaccount.google.com/apppasswords
3. Use o email como `EMAIL_USER` e a senha gerada como `EMAIL_PASSWORD` no `.env`

Exemplo `.env`:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_de_aplicativo
```

## Docker - Comandos úteis

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs do PostgreSQL
docker-compose logs postgres

# Entrar no shell do PostgreSQL
docker exec -it calculadora_tributacao_db psql -U postgres -d calculadora_tributacao

# Remover volume (CUIDADO: deleta dados)
docker-compose down -v
```

## Estrutura de pastas

```
backend/
├── src/
│   ├── config/          # Configurações (DB, Email)
│   ├── controllers/     # Lógica de negócio
│   ├── middleware/      # Middlewares (autenticação)
│   ├── models/          # Modelos de dados
│   ├── routes/          # Rotas
│   ├── utils/           # Funções utilitárias
│   └── server.js        # Arquivo principal
├── migrations/          # Scripts de inicialização
├── docker-compose.yml   # Configuração Docker
├── package.json
├── .env.example
└── .gitignore
```

## Segurança

- ⚠️ Altere `JWT_SECRET` em produção
- ⚠️ Use variáveis de ambiente para credentials
- ⚠️ Use HTTPS em produção
- ⚠️ Valide e sanitize entrada de dados
- ⚠️ Use senhas fortes no banco de dados

## Troubleshooting

**Erro: "connect ECONNREFUSED" ao iniciar servidor**
- Certifique-se de que o PostgreSQL está rodando: `docker-compose ps`
- Verifique variáveis de ambiente em `.env`

**Erro: "SMTP Error" ao enviar email**
- Verifique credenciais de email em `.env`
- Se usar Gmail, confirme que usou a senha de aplicativo (não a senha regular)
- Verifique se a porta SMTP (587) está acessível

**Banco de dados não inicializa**
- Delete o volume: `docker-compose down -v`
- Reinicie: `docker-compose up -d`
- Execute: `npm run db:init`

## Próximos passos

- [ ] Adicionar validação mais robusta
- [ ] Implementar rate limiting
- [ ] Adicionar refresh tokens
- [ ] Implementar logs estruturados
- [ ] Adicionar testes automatizados
- [ ] Deploy em produção (Render, Railway, Heroku)
