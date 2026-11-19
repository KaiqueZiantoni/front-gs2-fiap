import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Carregando from '../components/Carregando'
import Mensagem from '../components/Mensagem'
import Titulo from '../components/Titulo'
import { cadastrarMedicamento, listarMedicamentos } from '../services/medicamentos'
import type { FormaMedicamento, Medicamento } from '../types'

const nomesForma = { COMPRIMIDO: 'Comprimido', GOTA: 'Gota', ML: 'Mililitro (ml)', UNIDADE: 'Unidade' }

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erroLista, setErroLista] = useState('')

  const [nome, setNome] = useState('')
  const [principioAtivo, setPrincipioAtivo] = useState('')
  const [forma, setForma] = useState<FormaMedicamento>('COMPRIMIDO')
  const [erros, setErros] = useState({ nome: '', principioAtivo: '' })
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erroApi, setErroApi] = useState('')

  async function carregar() {
    setErroLista('')
    try {
      setMedicamentos(await listarMedicamentos())
    } catch (e) {
      setErroLista((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function cadastrar(evento: FormEvent) {
    evento.preventDefault()
    setSucesso('')
    setErroApi('')

    const novosErros = { nome: '', principioAtivo: '' }
    if (nome.trim() === '') {
      novosErros.nome = 'Escreva o nome do remédio, como está na caixa.'
    }
    if (principioAtivo.trim() === '') {
      novosErros.principioAtivo = 'Escreva o princípio ativo.'
    }
    setErros(novosErros)
    if (novosErros.nome !== '' || novosErros.principioAtivo !== '') {
      return
    }

    setSalvando(true)
    try {
      const criado = await cadastrarMedicamento({ nome: nome.trim(), principioAtivo: principioAtivo.trim(), forma })
      setSucesso(criado.nome + ': cadastro feito.')
      setNome('')
      setPrincipioAtivo('')
      await carregar()
    } catch (e) {
      setErroApi((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div>
      <Titulo texto="Remédios" subtitulo="Catálogo de remédios que podem entrar na rotina dos pacientes." />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl font-bold">Novo remédio</h2>
          <form onSubmit={cadastrar} noValidate className="space-y-4 rounded-2xl border-2 border-slate-300 bg-white p-6">
            <Campo
              id="nome"
              rotulo="Nome na caixa"
              valor={nome}
              aoMudar={setNome}
              erro={erros.nome}
              dica="Losartana 50 mg"
            />
            <Campo
              id="principioAtivo"
              rotulo="Princípio ativo"
              valor={principioAtivo}
              aoMudar={setPrincipioAtivo}
              erro={erros.principioAtivo}
              dica="Losartana potássica"
            />
            <div>
              <label htmlFor="forma" className="mb-1 block font-semibold">
                Forma
              </label>
              <select
                id="forma"
                value={forma}
                onChange={(evento) => setForma(evento.target.value as FormaMedicamento)}
                className="w-full min-h-12 rounded-xl border-2 border-slate-400 bg-white px-3 py-2 text-lg"
              >
                <option value="COMPRIMIDO">Comprimido</option>
                <option value="GOTA">Gota</option>
                <option value="ML">Mililitro (ml)</option>
                <option value="UNIDADE">Unidade</option>
              </select>
            </div>
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
          <h2 className="mb-3 text-2xl font-bold">Remédios cadastrados</h2>
          <div className="space-y-3">
            {carregando && <Carregando />}
            {erroLista && <Mensagem tipo="erro" texto={erroLista} />}
            {!carregando && !erroLista && medicamentos.length === 0 && (
              <Mensagem tipo="aviso" texto="Nenhum remédio cadastrado ainda." />
            )}

            <ul className="space-y-3">
              {medicamentos.map((medicamento) => (
                <li key={medicamento.id} className="rounded-2xl border-2 border-slate-300 bg-white p-4">
                  <p className="font-bold">{medicamento.nome}</p>
                  <p className="text-sm text-slate-600">
                    {medicamento.principioAtivo} · {nomesForma[medicamento.forma]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Medicamentos
