import { Link } from 'react-router-dom'
import BotaoOuvir from '../components/BotaoOuvir'
import Figura from '../components/Figura'
import type { NomeFigura } from '../components/Figura'

const passos: { titulo: string; texto: string; figura: NomeFigura }[] = [
  {
    figura: 'caixa',
    titulo: '1. Lembra na hora',
    texto: 'O aviso chega no horário da dose, com um botão grande: "Tomei".',
  },
  {
    figura: 'pessoa',
    titulo: '2. Insiste e chama ajuda',
    texto: 'Sem registro, o app lembra de novo em 30 minutos. Em 90 minutos, avisa o cuidador.',
  },
  {
    figura: 'termometro',
    titulo: '3. Olha o clima',
    texto: 'Em dias de calor, frio ou chuva forte, o paciente recebe um aviso de atenção.',
  },
  {
    figura: 'medico',
    titulo: '4. Leva para a consulta',
    texto: 'O médico recebe um relatório curto, só com o que fugiu do normal.',
  },
]

const acessibilidade: string[] = [
  'Frases curtas, sem palavra difícil.',
  'Botões grandes, fáceis de tocar no celular.',
  'Botão "Ouvir" que lê o texto em voz alta.',
]


function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border-2 border-green-700 bg-green-50 px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-green-700 sm:text-5xl">Tomei, Doutor</h1>
        <p className="mt-3 text-2xl font-bold">Entre no clima da consulta.</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          O app que acompanha o tratamento entre uma consulta e outra. Ele lembra a dose, registra o que aconteceu e
          leva esse histórico para o médico.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/prototipo"
            className="flex min-h-14 items-center justify-center rounded-2xl bg-green-700 px-6 text-xl font-bold text-white hover:bg-green-800"
          >
            Testar o protótipo
          </Link>
          <Link
            to="/sobre"
            className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-slate-400 bg-white px-6 text-xl font-bold hover:bg-slate-100"
          >
            Conhecer o projeto
          </Link>
        </div>
        <div className="mt-6">
          <BotaoOuvir texto="Tomei, Doutor. Entre no clima da consulta. O app que acompanha o tratamento entre uma consulta e outra. Ele lembra a dose, registra o que aconteceu e leva esse histórico para o médico." />
        </div>
      </section>

      <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">O problema</h2>
        <p className="mt-2 text-lg">
          Na consulta, é comum o paciente dizer "tomei tudo certinho, doutor". Sem um registro, o médico decide o
          tratamento sem saber quais doses ficaram para trás.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Como funciona</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {passos.map((passo) => (
            <article key={passo.titulo} className="flex items-center gap-4 rounded-2xl border-2 border-slate-300 bg-white p-6">
              <div className="shrink-0">
                <Figura nome={passo.figura} tamanho={80} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{passo.titulo}</h3>
                <p className="mt-2 text-slate-600">{passo.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-green-700 bg-green-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-green-700">O que chega ao médico</h2>
        <p className="mt-3 text-lg">
          O lembrete é só o começo. O principal é o relatório da consulta: a adesão do período e as exceções. Doses
          sem registro, horários que mais falham e avisos de clima.
        </p>
        <p className="mt-3 text-lg">
          Abra um paciente para ver esse resumo montado com os dados reais da API.
        </p>
      </section>

      <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Feito para quem lê com dificuldade</h2>
          <div>
            <BotaoOuvir texto={'Feito para quem lê com dificuldade. ' + acessibilidade.join(' ')} />
          </div>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {acessibilidade.map((item) => (
            <li key={item} className="rounded-2xl bg-green-50 p-4 text-lg font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </section>


      <section className="rounded-2xl border-2 border-amber-600 bg-amber-50 p-6">
        <h2 className="text-xl font-bold">Importante</h2>
        <p className="mt-2">
          O Tomei, Doutor não receita, não sugere dose e não manda parar nenhum remédio. Quem decide o tratamento é o
          médico, com a orientação do farmacêutico.
        </p>
      </section>
    </div>
  )
}

export default Home
