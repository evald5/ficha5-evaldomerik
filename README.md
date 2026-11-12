# Coleção de cartas

Redes de Comunicação, Módulo 5. App React (pasta `client`) e server Express (`server.js`).

## Como pôr a app React a correr

```
cd client
npm install
npm run dev
```

Depois abre http://localhost:5173 no browser.

## Como pôr o server a correr

Na pasta do server (a raiz do repositório, onde está o `server.js`):

```
npm install
node --watch server.js
```

O server fica em http://localhost:3000. A app React corre em separado, como está explicado em cima (`cd client`, `npm install`, `npm run dev`).

## API

- **GET /**: devolve uma página HTML com o número de cartas. Responde 200.
- **GET /cartas**: devolve uma página HTML com a lista dos nomes das cartas. Responde 200.
- **GET /api/cartas**: devolve a lista de cartas em JSON, por exemplo `[{ "id": 1, "name": "Dragão de Cobalto", "type": "Criatura", "attack": 7, "defense": 5 }]`. Responde 200.
- **POST /api/cartas**: recebe um JSON com `name`, `type` e `attack` (o body tem de levar o header `Content-Type: application/json`). Se estiver tudo bem, o server dá um `id` à carta, grava-a no `cartas.json` e responde 201 com a carta nova em JSON. Se faltar o nome ou o tipo, não guarda nada e responde 400 com `{ "erro": "A carta precisa de nome e tipo" }`.
- **DELETE /api/cartas/:id**: apaga a carta com esse id (por exemplo `/api/cartas/3`) e grava o ficheiro. Responde 204, sem body. Se o id não existir, responde 404 com `{ "erro": "Carta não encontrada" }`.

## Pergunta 3: os dois requests para /api/cartas

O primeiro request é o OPTIONS, também chamado preflight. Quem o manda é o próprio browser, sozinho, antes do POST, porque o pedido vai da app (porta 5173) para o server (porta 3000), que é outra origem, e leva `Content-Type: application/json`. O browser pergunta ao server se aceita o pedido. Antes do pacote `cors`, o server não respondia ao OPTIONS com os headers certos (o `res.set` da aula 5 não chegava), por isso o browser bloqueava o pedido e nunca chegava a mandar o POST. Como o POST nunca chegava à rota, o `console.log` dela nunca aparecia no terminal.

## Pergunta 4: onde vivia a carta nova

Na versão só com `setCards`, a carta vivia só no estado do React, na memória do browser. O F5 na app apagava-a, porque a página recarrega e o estado volta ao início. Na versão com POST sem ficheiro, a carta vivia no array `cards` na memória do server. O F5 já não a apagava (a app pede a lista outra vez ao server), mas reiniciar o server apagava-a, porque o array volta ao que está no código. Na versão com `cartas.json`, a carta vive num ficheiro no disco. O F5 e reiniciar o server já não a apagam, e só desaparece se alguém apagar a carta ou editar o ficheiro.

## Extra: porque é que o botão desligado importa num POST e não num GET

Um GET só lê dados, por isso se for feito duas vezes dá o mesmo resultado. Um POST cria uma coisa nova, por isso se o utilizador clicar duas vezes enquanto o server ainda não respondeu, a carta fica duplicada. Com o botão desligado e a dizer "A enviar…" isso não acontece.
