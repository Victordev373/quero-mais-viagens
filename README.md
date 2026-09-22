# Quero+ Viagens

Landing page responsiva, estilo Linktree, desenvolvida para a agência de viagens Quero+ Viagens.

## 📌 Descrição

Página única (one-page) que centraliza os principais canais de contato e serviços da agência, com foco em conversão via WhatsApp.

🔗 **Demonstração:** [queromaisviagens.com.br](https://queromaisviagens.com.br)

## 🎯 Objetivo

Oferecer um ponto de contato único e rápido entre a agência e potenciais clientes.

## ✨ Funcionalidades

- Layout responsivo (mobile-first)
- Links diretos de contato via WhatsApp
- Galeria de fotos de clientes/depoimentos
- Domínio próprio publicado via GitHub Pages

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript

## ▶️ Como executar

```bash
git clone https://github.com/Victordev373/quero-mais-viagens.git
cd quero-mais-viagens
# abra o index.html no navegador, ou sirva com:
npx serve .
```

## 🔎 Pré-renderização (SEO)

O `index.html` já sai com o HTML da página dentro de `<div id="root">`, para que buscadores e visitantes sem JavaScript vejam o conteúdo. Quando o `main.js` carrega, o React monta por cima.

Sempre que alterar o `main.js`, gere o HTML de novo:

```bash
npm install
npm run prerender
```

## 📂 Estrutura do projeto

```
quero-mais-viagens/
├── brand/
├── fonts/          # Fraunces e Manrope em WOFF2 (hospedadas localmente)
├── images/
├── tools/          # script de pré-renderização
├── index.html
├── robots.txt
├── sitemap.xml
├── main.css
└── main.js
```

## 🔮 Melhorias futuras

- Adicionar formulário de contato direto na página
- Otimizar imagens para carregamento mais rápido

## 👤 Autor

João Victor — [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-victor-silva-b97821345/) · [GitHub](https://github.com/Victordev373)
