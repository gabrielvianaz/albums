# Desafio Simples Dental - Álbums

## 📑 Descrição

Projeto desenvolvido como desafio técnico do processo seletivo para Desenvolvedor Fullstack Pleno na [Simples Dental](simplesdental.com). Consiste em um front-end que permite visualizar as fotos disponibilizada pela API de álbums do JSONPlaceHolder.

## 🔧 Tecnologias utilizadas

- Angular 17
- NPM
- TypeScript

## ⚙️ Execução

Para executar a aplicação, devem ser executados os comandos:

```
npm install
```

```
ng serve
```

Após a execução, a aplicação estará disponível em `http://localhost:4200`.

Para o serviço de autenticação foi utilizado o serviço DummyJSON, o qual disponibiliza uma API de autenticação. Dessa maneira, deve ser utilizado algum usuário e senha que conste no endereço `dummyjson.com/users`, tal como:

```
"username": "atuny0",
"password": "9uQFF1Lh"
```

## 🔨 Funcionalidades

- Autenticação
- Listagem de todos os álbums
- Visualização das 10 primeiras imagens de um álbum
- Navegação entre as imagens do álbum ao clicar em alguma imagem

Para implementar a funcionalidade de navegação entre as imagens, não utilizei nenhuma biblioteca externa além da Material Angular.
