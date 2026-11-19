import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Carregando from '../components/Carregando'
import Mensagem from '../components/Mensagem'
import Titulo from '../components/Titulo'
import { cadastrarPaciente, listarPacientes, removerPaciente } from '../services/pacientes'
import type { NovoPaciente, Paciente } from '../types'
import { formatarData } from '../utils/datas'

function Pacientes() {
  // Lista
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erroLista, setErroLista] = useState('')

  // Formulario
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cep, setCep] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erros, setErros] = useState({ nome: '', dataNascimento: '', cep: '', telefone: '' })
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erroApi, setErroApi] = useState('')

  async function carregar() {
    setErroLista('')
    try {
      setPacientes(await listarPacientes())
    } catch (e) {
      setErroLista((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // Confere os campos antes de chamar a API. Devolve true quando esta tudo certo.
  function validar() {
    const novosErros = { nome: '', dataNascimento: '', cep: '', telefone: '' }
    const hoje = new Date().toISOString().substring(0, 10)

    if (nome.trim().length < 3) {
      novosErros.nome = 'Escreva o nome, com pelo menos 3 letras.'
    }
    if (dataNascimento === '') {
      novosErros.dataNascimento = 'Informe a data de nascimento.'
    } else if (dataNascimento >= hoje) {
      novosErros.dataNascimento = 'A data de nascimento deve estar no passado.'
    }
    if (cep !== '' && !/^\d{8}$/.test(cep)) {
      novosErros.cep = 'O CEP tem 8 números, sem traço.'
    }
    if (telefone !== '' && !/^\d{10,11}$/.test(telefone)) {
      novosErros.telefone = 'O telefone tem DDD e número, só com números.'
    }

    setErros(novosErros)
    return (
      novosErros.nome === '' && novosErros.dataNascimento === '' && novosErros.cep === '' && novosErros.telefone === ''
    )
  }

  async function cadastrar(evento: FormEvent) {
    evento.preventDefault()
    setSucesso('')
    setErroApi('')
    if (!validar()) {
      return
    }

    const novo: NovoPaciente = { nome: nome.trim(), dataNascimento }
    if (cep !== '') {
      novo.cep = cep
    }
    if (telefone !== '') {
      novo.telefone = telefone
    }

    setSalvando(true)
    try {
      const criado = await cadastrarPaciente(novo)
      setSucesso(criado.nome + ': cadastro feito.')
      setNome('')
      setDataNascimento('')
      setCep('')
      setTelefone('')
      await carregar()
    } catch (e) {
      setErroApi((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  async function remover(paciente: Paciente) {
    setSucesso('')
    setErroApi('')
    if (!window.confirm('Remover ' + paciente.nome + '?')) {
      return
    }
    try {
      await removerPaciente(paciente.id)
      setSucesso(paciente.nome + ': cadastro removido.')
      await carregar()
    } catch (e) {
      setErroApi((e as Error).message)
    }
  }

  return (
    <div>
      <Titulo texto="Pacientes" subtitulo="Dados lidos e gravados na API do Tomei, Doutor." />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl font-bold">Novo paciente</h2>
          <form onSubmit={cadastrar} noValidate className="space-y-4 rounded-2xl border-2 border-slate-300 bg-white p-6">
            <Campo id="nome" rotulo="Nome completo" valor={nome} aoMudar={setNome} erro={erros.nome} />
            <Campo
              id="dataNascimento"
              rotulo="Data de nascimento"
              tipo="date"
              valor={dataNascimento}
              aoMudar={setDataNascimento}
              erro={erros.dataNascimento}
            />
            <Campo id="cep" rotulo="CEP (opcional)" valor={cep} aoMudar={setCep} erro={erros.cep} dica="01310100" />
            <Campo
              id="telefone"
              rotulo="Telefone (opcional)"
              valor={telefone}
              aoMudar={setTelefone}
              erro={erros.telefone}
              dica="11987654321"
            />
            <Botao tipo="submit" desabilitado={salvando}>
              {salvando ? 'Salvando...' : 'Cadastrar'}
            </Botao>
          </form>

          <div className="mt-4 space-y-3">
            {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
            {erroApi && <Mensagem tipo="erro" texto={erroApi} />}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">Pacientes cadastrados</h2>
          <div className="space-y-3">
            {carregando && <Carregando />}
            {erroLista && <Mensagem tipo="erro" texto={erroLista} />}
            {!carregando && !erroLista && pacientes.length === 0 && (
              <Mensagem tipo="aviso" texto="Nenhum paciente cadastrado ainda." />
            )}

            <ul className="space-y-3">
              {pacientes.map((paciente) => (
                <li
                  key={paciente.id}
                  className="flex flex-col gap-3 rounded-2xl border-2 border-slate-300 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold">{paciente.nome}</p>
                    <p className="text-sm text-slate-600">Nascimento: {formatarData(paciente.dataNascimento)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={'/pacientes/' + paciente.id}
                      className="flex min-h-12 items-center rounded-2xl bg-green-700 px-5 py-2 text-lg font-bold text-white hover:bg-green-800"
                    >
                      Abrir
                    </Link>
                    <Botao cor="vermelho" aoClicar={() => remover(paciente)}>
                      Remover
                    </Botao>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Pacientes
