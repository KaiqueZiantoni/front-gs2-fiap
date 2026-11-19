import { Link } from 'react-router-dom'
import BotaoOuvir from '../components/BotaoOuvir'

const passos = [
  { titulo: 'Lembra na hora', texto: 'O aviso chega no horário do remédio, com um botão grande: "Tomei".' },
  { titulo: 'Avisa o cuidador', texto: 'Se a dose fica sem registro, quem cuida do paciente fica sabendo.' },
  { titulo: 'Ajuda na consulta', texto: 'O histórico das doses vira um relatório para mostrar ao médico.' },
]

function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border-2 border-green-700 bg-green-50 px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-green-700 sm:text-5xl">Tomei, Doutor</h1>
        <p className="mt-3 text-2xl font-bold">Entre no clima da consulta.</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Um lembrete de remédio simples, para pessoas idosas e pacientes crônicos que tomam vários remédios por dia.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/pacientes" className="flex min-h-14 items-center justify-center rounded-2xl bg-green-700 px-6 text-xl font-bold text-white hover:bg-green-800">
            Ver pacientes
          </Link>
          <Link to="/sobre" className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-slate-400 bg-white px-6 text-xl font-bold hover:bg-slate-100">
            Conhecer o projeto
          </Link>
        </div>
        <div className="mt-6">
          <BotaoOuvir texto="Tomei, Doutor. Entre no clima da consulta. Um lembrete de remédio simples, para pessoas idosas e pacientes crônicos." />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Como funciona</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {passos.map((passo) => (
            <article key={passo.titulo} className="rounded-2xl border-2 border-slate-300 bg-white p-6">
              <h3 className="text-xl font-bold">{passo.titulo}</h3>
              <p className="mt-2 text-slate-600">{passo.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border-2 border-amber-600 bg-amber-50 p-6">
        <h2 className="text-xl font-bold">Importante</h2>
        <p className="mt-2">
          O Tomei, Doutor não receita, não sugere dose e não manda parar nenhum remédio. Quem decide o tratamento é o
          médico.
        </p>
      </section>
    </div>
  )
}

export default Home
