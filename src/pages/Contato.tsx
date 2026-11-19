import { useState } from 'react'
import type { FormEvent } from 'react'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Mensagem from '../components/Mensagem'
import Titulo from '../components/Titulo'
import { integrantes } from '../data/integrantes'

function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState({ nome: '', email: '', mensagem: '' })
  const [enviado, setEnviado] = useState(false)

  function enviar(evento: FormEvent) {
    evento.preventDefault()

    const novosErros = { nome: '', email: '', mensagem: '' }
    if (nome.trim().length < 3) {
      novosErros.nome = 'Escreva seu nome, com pelo menos 3 letras.'
    }
    if (!email.includes('@') || !email.includes('.')) {
      novosErros.email = 'Escreva um e-mail válido, como nome@exemplo.com.'
    }
    if (mensagem.trim().length < 10) {
      novosErros.mensagem = 'Escreva a mensagem, com pelo menos 10 letras.'
    }
    setErros(novosErros)

    const temErro = novosErros.nome !== '' || novosErros.email !== '' || novosErros.mensagem !== ''
    setEnviado(!temErro)
    if (!temErro) {
      setNome('')
      setEmail('')
      setMensagem('')
    }
  }

  return (
    <div>
      <Titulo texto="Contato" subtitulo="Fale com o grupo do Tomei, Doutor." />

      <form onSubmit={enviar} noValidate className="max-w-xl space-y-4 rounded-2xl border-2 border-slate-300 bg-white p-6">
        <Campo id="nome" rotulo="Seu nome" valor={nome} aoMudar={setNome} erro={erros.nome} />
        <Campo id="email" rotulo="Seu e-mail" tipo="email" valor={email} aoMudar={setEmail} erro={erros.email} />

        <div>
          <label htmlFor="mensagem" className="mb-1 block font-semibold">
            Mensagem
          </label>
          <textarea
            id="mensagem"
            rows={4}
            value={mensagem}
            onChange={(evento) => setMensagem(evento.target.value)}
            className={
              'w-full min-h-12 rounded-xl border-2 bg-white px-3 py-2 text-lg ' + (erros.mensagem ? 'border-red-600' : 'border-slate-400')
            }
          />
          {erros.mensagem && <p className="mt-1 text-sm text-red-700">{erros.mensagem}</p>}
        </div>

        <Botao tipo="submit">Enviar</Botao>

        {enviado && (
          <Mensagem
            tipo="sucesso"
            texto="Mensagem conferida, obrigado! Este formulário é uma demonstração: o texto não é enviado a um servidor."
          />
        )}
      </form>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-bold">Redes do grupo</h2>
        <ul className="space-y-3">
          {integrantes.map((integrante) => (
            <li key={integrante.rm} className="rounded-2xl border-2 border-slate-300 bg-white p-4">
              <p className="font-bold">{integrante.nome}</p>
              <p className="mt-1 flex gap-4">
                <a href={integrante.github} target="_blank" rel="noreferrer" className="font-semibold text-green-700 underline">
                  GitHub
                </a>
                <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-green-700 underline">
                  LinkedIn
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Contato
