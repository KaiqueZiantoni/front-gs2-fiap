# Tomei, Doutor · Front-end

> Entre no clima da consulta.

Aplicação web do **Tomei, Doutor**, entrega da disciplina **Front-End Design Engineering** da Global Solution FIAP 2026/2 (tema CitizenTech).

## Objetivo

O Tomei, Doutor acompanha o tratamento entre uma consulta e outra. Ele lembra a dose na hora, registra o que aconteceu, chama o cuidador quando a dose fica sem registro e leva para o médico um relatório curto, só com o que fugiu do normal. O público são pessoas idosas e pacientes crônicos que leem com dificuldade.

Este site apresenta a solução e permite cadastrar pacientes e remédios, montar a rotina de cada paciente, registrar as doses com o botão "Tomei" e ver o resumo para a consulta. Todos os dados são lidos e gravados na API Java do grupo.

O sistema nunca sugere dose, troca ou suspensão de remédio.

## Tecnologias

- React + Vite + TypeScript (SPA)
- Tailwind CSS
- React Router DOM
- Fetch API para as chamadas HTTP (sem Axios)
- ZXing (`@zxing/browser`) para ler código de barras pela câmera

## Links

- **GitHub:** https://github.com/KaiqueZiantoni/front-gs2-fiap
- **Vercel:** https://front-gs2-fiap.vercel.app
- **API Java (Render):** https://tomei-doutor-api.onrender.com
- **Vídeo (YouTube):** [PREENCHER: link do vídeo]

## Integrantes

| RM | Nome completo | Turma |
|---|---|---|
| 570294 | Kaique Ziantoni Guedes Rosa | 1TDSPV |
| 571506 | Silas Angare Pedroso de Oliveira | 1TDSPV |

## Contato

- Kaique Ziantoni: [GitHub](https://github.com/KaiqueZiantoni) · [LinkedIn](https://www.linkedin.com/in/kaiqueziantoni/)
- Silas Angare: [GitHub](https://github.com/SilasAngare1) · [LinkedIn](https://www.linkedin.com/in/silas-angare-pedroso-de-oliveira-55004430a/)

## Estrutura de pastas

```
src
├── components   peças reutilizáveis (Cabecalho, Rodape, Botao, Campo, Mensagem, Titulo...)
├── pages        uma página por rota
├── services     chamadas à API com fetch (api.ts e um arquivo por recurso)
├── types        interfaces TypeScript dos dados da API
├── assets       fotos dos integrantes
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
| `/pacientes/:id` | Paciente: resumo para a consulta, rotina de remédios, doses e botão "Tomei" (rota com parâmetro) |
| `/prototipo` | Protótipo: as telas do aplicativo, com código de barras, botão "Tomei", relatório e cuidador |
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

## Protótipo

A aba **Protótipo** mostra as telas do aplicativo dentro de uma moldura de celular. Primeiro se escolhe um paciente; depois o aplicativo tem quatro abas:

| Aba | O que mostra | Dados |
|---|---|---|
| Hoje | Dose da vez com o botão "Tomei", e o cadastro de remédio pelo código de barras | API |
| Clima | Aviso de calor | exemplo fixo: a API Java não tem rota de alerta |
| Vou ao médico | Relatório com a adesão e o que fugiu do normal | API |
| Cuidador | Doses sem registro, com o botão "Tomou, confirmei" | API |

- Para testar a busca, use um código do catálogo, por exemplo `2000000000015` (Losartana 50 mg) ou `2000000000060` (Metformina 850 mg).
- O botão "Abrir a câmera" lê o código de barras da caixa com a biblioteca ZXing. Se a câmera não abrir, o código pode ser digitado.
- Abaixo do aplicativo há três códigos de barras do catálogo, para apontar a câmera de outro aparelho.

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
