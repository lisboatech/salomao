# noah - Aplicação de Gerenciamento de Refeições

## 🍽️ Sobre o Projeto

noah é uma aplicação full-stack para gerenciamento de refeições diárias, desenvolvida com Next.js (App Router), MongoDB Atlas e implantada na Vercel. A aplicação permite aos usuários registrar, visualizar, editar e excluir refeições, além de fornecer visualizações estatísticas em 3D e uma interface futurista.

## 🚀 Link do Deploy

[Link da aplicação em produção](https://noah-meal-tracker.vercel.app) <!-- Substitua este link pelo seu link real após o deploy -->

## ✨ Funcionalidades

- CRUD completo de refeições (criar, visualizar, editar e excluir)
- Filtro por tipo de refeição (Café da manhã, Almoço, Lanche da tarde, Janta)
- Dashboard interativo com visualização de refeições
- Contador de calorias diárias
- Visualização estatística em 3D
- Cronologia alimentar
- Interface futurista e minimalista 

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TailwindCSS 4, Three.js
- **Backend**: API Routes do Next.js
- **Banco de Dados**: MongoDB Atlas
- **Deploy**: Vercel

## 🧰 Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env.local` com:
   ```
   MONGODB_URI=sua_string_de_conexao_mongodb
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

## 📱 Responsividade

A aplicação foi projetada para funcionar em dispositivos desktop, com foco em uma experiência premium e futurista.

## 📝 Licença

Este projeto está sob a licença MIT.
