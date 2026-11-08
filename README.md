# Invento — Sistema de Gestão de Estoque e Inventário

<p align="center">
  <strong>Solução Full-Stack para gerenciamento de catálogo, controle de estoque e autenticação baseada em funções (RBAC).</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Spring%20Security-JWT-blue?style=for-the-badge&logo=springsecurity" alt="Spring Security JWT" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker" alt="Docker" />
</p>

---

## 📌 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Principais Funcionalidades](#-principais-funcionalidades)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Arquitetura e Estrutura de Pastas](#-arquitetura-e-estrutura-de-pastas)
5. [Segurança e Autenticação](#-segurança-e-autenticação)
6. [Endpoints da API REST](#-endpoints-da-api-rest)
7. [Pré-requisitos](#-pré-requisitos)
8. [Configuração de Ambiente](#-configuração-de-ambiente)
9. [Instalação e Execução](#-instalação-e-execução)
   - [Execução com Docker Compose](#1-execução-com-docker-compose-recomendado)
   - [Execução Local (Backend e Frontend separados)](#2-execução-local-manual)
10. [Testes](#-testes)
11. [Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Invento** é um sistema completo desenvolvido para suprir as demandas operacionais de controle de estoques e catálogo de produtos. A aplicação é dividida em uma API RESTful escalável construída em **Java 21** e **Spring Boot**, acompanhada por uma Single Page Application (SPA) reativa e responsiva construída em **React 18**, **TypeScript** e **Vite**.

O sistema oferece cálculo em tempo real do valor total do inventário em depósito, monitoramento automático de produtos com estoque baixo ou esgotado, controle por código único (SKU) e proteção de recursos por perfil de acesso (Role-Based Access Control - RBAC).

---

## ⚡ Principais Funcionalidades

- **Autenticação e Controle de Sessão:**
  - Cadastro de novos usuários com perfil padrão (`USER`).
  - Login com autenticação `stateless` via Token JWT (JSON Web Token).
  - Rotas protegidas no frontend e persistência de sessão via `localStorage`.
  - Controle de permissões granular por papéis (`ROLE_USER` e `ROLE_ADMIN`).
- **Dashboard Analítico:**
  - Contagem total de produtos cadastrados.
  - Indicador de atenção para itens com quantidade menor ou igual ao estoque mínimo.
  - Cálculo consolidado do valor financeiro total do estoque em depósito (custo $\times$ quantidade).
  - Cartão de acesso rápido para gerenciamento do inventário.
- **Gestão de Produtos:**
  - Cadastro de novos produtos com validação estrita (nome, SKU, descrição, preço de custo, preço de venda, quantidade, estoque mínimo e máximo).
  - Listagem completa de itens com tags dinâmicas de status: `Normal`, `Estoque Baixo` e `Esgotado`.
  - Filtro em tempo real por nome ou código SKU.
  - Exclusão com confirmação preventiva de segurança.
  - Consultas na API por ID, Nome, SKU ou Quantidade exata em estoque.
- **Gerenciamento de Usuários (Apenas `ADMIN`):**
  - Listagem, consulta por ID, atualização e exclusão de contas de usuários.
- **Interface Responsiva:**
  - Layout adaptável para smartphones (320px+), tablets, notebooks e monitores ultrawide.
  - Menu mobile dobrável com ícones de navegação.
  - Tabela com rolagem horizontal touch-friendly preservando a visibilidade de todas as 7 colunas em telas reduzidas.

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **Java** | 21 (LTS) | Linguagem de programação principal |
| **Spring Boot** | 4.1.1 | Framework base para construção da API |
| **Spring Data JPA / Hibernate** | Integrado | Mapeamento Objeto-Relacional (ORM) e persistência |
| **Spring Security** | Integrado | Gerenciamento de segurança, filtros e RBAC |
| **Spring Validation** | Integrado | Validação de dados (Jakarta Bean Validation) |
| **JJWT (Java JWT)** | 0.12.6 | Criação, assinatura (HMAC-SHA) e validação de tokens JWT |
| **PostgreSQL** | 16 | Banco de dados relacional primário para produção |
| **H2 Database** | Integrado | Banco relacional em memória para desenvolvimento/testes |
| **Lombok** | Integrado | Redução de código boilerplate (Getters, Setters, Construtores) |
| **Maven** | 3.9+ | Gerenciador de dependências e automação de build |

### Frontend
| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **React** | 18.3.1 | Biblioteca para construção da interface de usuário |
| **TypeScript** | 5.6.2 | Superset JavaScript com tipagem estática |
| **Vite** | 5.4.10 | Ferramenta de build e servidor de desenvolvimento ultrarrápido |
| **React Router DOM** | 7.18.5 | Gerenciamento de rotas e navegação client-side |
| **Axios** | 1.21.0 | Cliente HTTP com interceptors para injeção do cabeçalho JWT |
| **CSS3 Nativo** | - | Estilização pura com Flexbox, CSS Grid, clamp e media queries |

### Infraestrutura e Ferramental
- **Docker & Docker Compose:** Criação de contêineres para banco de dados PostgreSQL e aplicação Spring Boot.
- **Git:** Controle de versão distribuído.

---

## 📐 Arquitetura e Estrutura de Pastas

```text
Spring-Boot_Invento/
├── backend/
│   └── Invento/
│       ├── .mvn/wrapper/                  # Binários do Maven Wrapper
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/project/Invento/
│       │   │   │   ├── controllers/       # Controladores REST (Auth, Product, User)
│       │   │   │   ├── dtos/              # Data Transfer Objects (Records imutáveis)
│       │   │   │   ├── enums/             # Enums de domínio (Role: USER, ADMIN)
│       │   │   │   ├── exceptions/        # Exceções de negócio customizadas
│       │   │   │   ├── handlers/          # GlobalExceptionHandler e ErrorResponse
│       │   │   │   ├── models/            # Entidades JPA (Product, User)
│       │   │   │   ├── repositories/      # Interfaces Spring Data JPA
│       │   │   │   ├── security/          # SecurityConfig, SecurityFilter, TokenProvider
│       │   │   │   ├── services/          # Regras de negócio (ProductService, UserService)
│       │   │   │   └── InventoApplication.java # Ponto de entrada da aplicação Spring
│       │   │   └── resources/
│       │   │       └── application.yaml   # Configurações do Spring, Banco e JWT
│       │   └── test/                      # Testes automatizados (JUnit 5, Spring Boot Test)
│       ├── Dockerfile                     # Multi-stage build da imagem Java
│       ├── docker-compose.yaml            # Orquestração do app e Postgres
│       ├── pom.xml                        # Dependências e plugins Maven
│       └── .env                           # Definição de variáveis de ambiente locais
│
├── frontend/
│   ├── public/                            # Favicon e assets públicos
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts                  # Instância Axios com baseURL e interceptor JWT
│   │   ├── components/
│   │   │   ├── Navbar.tsx                 # Barra de navegação com menu mobile responsivo
│   │   │   ├── ProductModal.tsx           # Modal de cadastro de novos produtos
│   │   │   └── ProtectedRoute.tsx         # Guardião de rotas autenticadas
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx            # Contexto global de autenticação e sessão
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx              # Painel geral e métricas consolidadas
│   │   │   ├── Login.tsx                  # Formulário de entrada com tratamento de erros
│   │   │   ├── Products.tsx               # Tabela de inventário com busca e exclusão
│   │   │   └── Register.tsx               # Cadastro de novos usuários
│   │   ├── types/                         # Interfaces TypeScript (auth.ts, product.ts)
│   │   ├── App.css                        # Estilos responsivos do sistema
│   │   ├── App.tsx                        # Definição do roteador da aplicação
│   │   ├── index.css                      # Reset e normalização global
│   │   └── main.tsx                       # Bootstrap do React
│   ├── index.html                         # Ponto de montagem HTML5
│   ├── package.json                       # Scripts e dependências do Node.js
│   ├── tsconfig.json                      # Configurações do compilador TypeScript
│   └── vite.config.ts                     # Configuração do Vite
│
└── README.md                              # Documentação oficial do projeto
```

---

## 🔒 Segurança e Autenticação

A aplicação adota o padrão **Stateless** por meio do Spring Security:
1. **Login:** O cliente envia credenciais para `/v1/auth/login`. O `AuthenticationManager` valida o usuário via `DaoAuthenticationProvider` utilizando `BCryptPasswordEncoder`.
2. **Emissão do Token:** O `TokenProvider` gera um token assinado via algoritmo HMAC-SHA contendo subject (e-mail), claims adicionais (`role`) e tempo de expiração (`jwt.expiration`).
3. **Validação das Requisições:** O `SecurityFilter` intercepta cada requisição HTTP, extrai o cabeçalho `Authorization: Bearer <token>`, valida a assinatura e popula o `SecurityContextHolder` com as autoridades do usuário (`ROLE_USER` ou `ROLE_ADMIN`).
4. **Política de CORS:** O backend autoriza explicitamente requisições originadas em `http://localhost:5173` e `http://localhost:3000`, permitindo os métodos `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` e `HEAD`.

---

## 📡 Endpoints da API REST

A API responde por padrão na porta **8080**.

### 1. Autenticação (`/v1/auth`) — Público

| Método | Endpoint | Descrição | Papel Mínimo |
| :--- | :--- | :--- | :--- |
| `POST` | `/v1/auth/register` | Cadastra novo usuário no sistema | Público |
| `POST` | `/v1/auth/login` | Autentica usuário e retorna o Token JWT puro | Público |

#### Exemplo de Requisição — Registro (`POST /v1/auth/register`):
```json
{
  "name": "Administrador",
  "email": "admin@invento.com",
  "password": "senhaSegura123"
}
```

#### Exemplo de Requisição — Login (`POST /v1/auth/login`):
```json
{
  "email": "admin@invento.com",
  "password": "senhaSegura123"
}
```
*Resposta:* Retorna uma string em texto plano contendo o token JWT (`HTTP 202 Accepted`).

---

### 2. Produtos (`/v1/products`) — Protegido

Requer cabeçalho `Authorization: Bearer <TOKEN>`. Permissões: `USER` ou `ADMIN`.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/v1/products` | Cadastra um novo produto |
| `GET` | `/v1/products` | Lista todos os produtos cadastrados |
| `GET` | `/v1/products/{id}` | Busca produto pelo ID numérico |
| `PUT` | `/v1/products/{id}` | Atualiza todas as propriedades de um produto existente |
| `DELETE` | `/v1/products/{id}` | Exclui o produto especificado por ID |
| `GET` | `/v1/products/name/{name}` | Busca produto por nome exato |
| `GET` | `/v1/products/sku/{sku}` | Busca produto por código SKU |
| `GET` | `/v1/products/quantity/{quantity}` | Lista produtos com quantidade em estoque correspondente |

#### Exemplo de Payload para Cadastro/Edição de Produto:
```json
{
  "name": "Teclado Mecânico RGB",
  "sku": "TEC-MEC-001",
  "description": "Switch azul, layout ABNT2 com iluminação individual",
  "costPrice": 120.50,
  "salePrice": 229.90,
  "quantity": 15,
  "minimumStock": 5,
  "maximumStock": 50,
  "active": true
}
```

---

### 3. Usuários (`/v1/users`) — Protegido (`ADMIN`)

Requer cabeçalho `Authorization: Bearer <TOKEN>` com perfil `ROLE_ADMIN`.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/v1/users` | Lista todos os usuários cadastrados |
| `GET` | `/v1/users/{id}` | Busca um usuário por ID |
| `PUT` | `/v1/users/{id}` | Atualiza nome, e-mail ou senha do usuário |
| `DELETE` | `/v1/users/{id}` | Remove um usuário do sistema |

---

## 📋 Pré-requisitos

Para executar a aplicação, certifique-se de possuir instalado em seu ambiente:
- **Git**
- **Docker & Docker Compose** (para execução conteinerizada)

OU, para execução manual:
- **Java JDK 21**
- **Node.js 18+** e gerenciador **npm**
- **PostgreSQL 16** em execução

---

## ⚙️ Configuração de Ambiente

O backend necessita das seguintes variáveis de ambiente configuradas no arquivo `backend/Invento/.env`:

```env
# Configurações do Banco de Dados PostgreSQL
POSTGRES_URL=jdbc:postgresql://localhost:5432/invento
POSTGRES_USER=invento
DB_PASSWORD=suaSenhaSeguraDoPostgres

# Configurações do Token JWT
JWT_TOKEN=suaChaveSecretaHmacMinimo32Caracteres!
JWT_EXPIRATION=1800000
```

> **Nota de Segurança:** O valor de `JWT_TOKEN` deve ser uma string com entropia suficiente (mínimo de 256 bits/32 caracteres para HMAC-SHA). O valor de `JWT_EXPIRATION` é definido em milissegundos (ex: `1800000` = 30 minutos).

---

## 🚀 Instalação e Execução

### 1. Execução com Docker Compose (Recomendado)

O projeto possui orquestração completa pronta para uso no arquivo `backend/Invento/docker-compose.yaml`.

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Spring-Boot_Invento.git
cd Spring-Boot_Invento
```

2. Certifique-se de que o arquivo `.env` existe em `backend/Invento/`:
```bash
cd backend/Invento
docker compose up -d --build
```

O Docker iniciará:
- O banco **PostgreSQL 16** exposto na porta `5432`.
- O backend **Spring Boot** exposto na porta `8080`.

3. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm install
npm run dev
```

Acesse a interface no navegador: **`http://localhost:5173`**.

---

### 2. Execução Local Manual

#### Passo A: Inicializar o Banco de Dados
Certifique-se de que o PostgreSQL está em execução e crie uma base de dados chamada `invento`:
```sql
CREATE DATABASE invento;
```

#### Passo B: Executar o Backend
Abra o diretório do backend e execute a aplicação via Maven Wrapper:
```bash
cd backend/Invento
```

No Linux/macOS:
```bash
./mvnw spring-boot:run
```

No Windows (PowerShell/CMD):
```powershell
.\mvnw.cmd spring-boot:run
```

O servidor backend estará disponível em `http://localhost:8080`.

#### Passo C: Executar o Frontend
Em um novo terminal, entre na pasta do frontend:
```bash
cd frontend
npm install
npm run dev
```

A aplicação React estará acessível em `http://localhost:5173`.

---

## 🧪 Testes

### Executando Testes no Backend
Para executar a suite de testes unitários e de contexto no Spring Boot:
```bash
cd backend/Invento
./mvnw test        # Linux / macOS
.\mvnw.cmd test    # Windows
```

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração profissional. Consulte os arquivos do repositório para detalhes adicionais.
