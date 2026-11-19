# Tomei, Doutor · Front-end

> Entre no clima da consulta.

Aplicação web do **Tomei, Doutor**, entrega da disciplina **Front-End Design Engineering** da Global Solution FIAP 2026/2 (tema CitizenTech).

## Objetivo

O Tomei, Doutor é um lembrete de remédio para pessoas idosas e pacientes crônicos que leem pouco. Este site mostra a solução e permite cadastrar pacientes e remédios, montar a rotina de cada paciente e registrar as doses com o botão "Tomei". Todos os dados são lidos e gravados na API Java do grupo.

O sistema nunca sugere dose, troca ou suspensão de remédio.

## Tecnologias

- React + Vite + TypeScript (SPA)
- Tailwind CSS
- React Router DOM
- Fetch API para as chamadas HTTP (sem Axios)

## Links

- **GitHub:** https://github.com/KaiqueZiantoni/front-gs2-fiap
- **Vercel:** [PREENCHER: link do site publicado]
- **API Java (Render):** https://tomei-doutor-api.onrender.com
- **Vídeo (YouTube):** [PREENCHER: link do vídeo]

## Integrantes

| RM | Nome completo | Turma |
|---|---|---|
| 570294 | Kaique Ziantoni Guedes Rosa | 1TDSPV |
| 571506 | Silas Angare Pedroso de Oliveira | 1TDSPV |

## Contato

[PREENCHER: e-mail ou outro contato do grupo]

## Estrutura de pastas

```
src
├── components   peças reutilizáveis (Cabecalho, Rodape, Botao, Campo, Mensagem, Titulo...)
├── pages        uma página por rota
├── services     chamadas à API com fetch (api.ts e um arquivo por recurso)
├── types        interfaces TypeScript dos dados da API
├── data         textos fixos (integrantes e perguntas frequentes)
├── utils        funções de apoio (formatação de datas)
├── App.tsx      rotas da aplicação
└── main.tsx     ponto de entrada
```

## Páginas e rotas

| Rota | Página |
|---|---|
| `/` | Início |
| `/sobre` | Sobre o projeto |
| `/integrantes` | Integrantes |
| `/faq` | Dúvidas frequentes |
| `/contato` | Contato (formulário com validação) |
| `/pacientes` | Pacientes: lista, cadastro e remoção |
| `/pacientes/:id` | Rotina do paciente: remédios, doses e botão "Tomei" (rota com parâmetro) |
| `/medicamentos` | Remédios: lista e cadastro |

## Integração com a API Java

| Ação na tela | Chamada |
|---|---|
| Listar pacientes | `GET /pacientes` |
| Cadastrar paciente | `POST /pacientes` |
| Remover paciente | `DELETE /pacientes/{id}` |
| Abrir paciente | `GET /pacientes/{id}` e `GET /pacientes/{id}/posologias` |
| Adicionar remédio à rotina | `POST /pacientes/{id}/posologias` |
| Listar e criar doses | `GET` e `POST /posologias/{id}/registros` |
| Botão "Tomei" | `PATCH /registros/{id}/confirmar` |
| Listar e cadastrar remédios | `GET` e `POST /medicamentos` |

As telas mostram carregamento, erro da requisição e lista vazia. A mensagem de erro exibida é a que a API devolve.

A API fica em um plano gratuito, que dorme após 15 minutos sem uso. A primeira chamada pode levar até um minuto.

## Acessibilidade

- Letra grande e alto contraste.
- Botões grandes, fáceis de tocar no celular.
- Botão "Ouvir", que lê o título da página em voz alta (fala do próprio navegador).
- Campos com rótulo e mensagens de erro em texto.

## Como executar

Requisito: Node.js 20.19 ou mais recente.

```bash
npm install
```

```bash
npm run dev
```

Abra `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

## Uso de IA generativa

O grupo usou o Claude (Anthropic) como apoio na escrita do código e da documentação. O grupo definiu o escopo e as regras de negócio, revisou o código, e é responsável pela entrega.
