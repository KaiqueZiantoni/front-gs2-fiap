import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Carregando from '../components/Carregando'
import CartaoPosologia from '../components/CartaoPosologia'
import Mensagem from '../components/Mensagem'
import Titulo from '../components/Titulo'
import { listarMedicamentos } from '../services/medicamentos'
import { buscarPaciente } from '../services/pacientes'
import { cadastrarPosologia, listarPosologias } from '../services/posologias'
import type { Medicamento, Paciente, Periodo, Posologia } from '../types'
import { formatarData } from '../utils/datas'

function PacienteDetalhe() {
  // O id vem do endereco: /pacientes/7
  const { id } = useParams()
  const pacienteId = Number(id)

  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [posologias, setPosologias] = useState<Posologia[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Formulario de novo remedio na rotina
  const [medicamentoId, setMedicamentoId] = useState('')
  const [periodo, setPeriodo] = useState<Periodo>('MANHA')
  const [quantidade, setQuantidade] = useState('')
  const [erros, setErros] = useState({ medicamentoId: '', quantidade: '' })
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [erroApi, setErroApi] = useState('')

  async function carregar() {
    setErro('')
    try {
      setPaciente(await buscarPaciente(pacienteId))
      setPosologias(await listarPosologias(pacienteId))
      setMedicamentos(await listarMedicamentos())
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [pacienteId])

  function nomeDoMedicamento(idProcurado: number) {
    for (const medicamento of medicamentos) {
      if (medicamento.id === idProcurado) {
        return medicamento.nome
      }
    }
    return 'Remédio ' + idProcurado
  }

  async function adicionar(evento: FormEvent) {
    evento.preventDefault()
    setSucesso('')
    setErroApi('')

    const novosErros = { medicamentoId: '', quantidade: '' }
    if (medicamentoId === '') {
      novosErros.medicamentoId = 'Escolha o remédio.'
    }
    if (quantidade === '' || Number(quantidade) <= 0) {
      novosErros.quantidade = 'Informe a quantidade receitada, maior que zero.'
    }
    setErros(novosErros)
    if (novosErros.medicamentoId !== '' || novosErros.quantidade !== '') {
      return
    }

    setSalvando(true)
    try {
      await cadastrarPosologia(pacienteId, {
        medicamentoId: Number(medicamentoId),
        periodo,
        quantidadeDose: Number(quantidade),
        tipoUso: 'CONTINUO',
        origem: 'RECEITADO',
        dataInicio: new Date().toISOString().substring(0, 10),
      })
      setSucesso('Remédio adicionado à rotina.')
      setMedicamentoId('')
      setQuantidade('')
      await carregar()
    } catch (e) {
      setErroApi((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return <Carregando />
  }

  if (erro || paciente === null) {
    return (
      <div className="space-y-4">
        <Mensagem tipo="erro" texto={erro || 'Paciente não encontrado.'} />
        <Link to="/pacientes" className="text-green-700 underline">
          Voltar para pacientes
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/pacientes" className="text-green-700 underline">
        ← Voltar para pacientes
      </Link>
      <div className="mt-4">
        <Titulo texto={paciente.nome} subtitulo={'Nascimento: ' + formatarData(paciente.dataNascimento)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-2xl font-bold">Rotina de remédios</h2>
          <div className="space-y-4">
            {posologias.length === 0 && <Mensagem tipo="aviso" texto="Este paciente ainda não tem remédio na rotina." />}
            {posologias.map((posologia) => (
              <CartaoPosologia
                key={posologia.id}
                posologia={posologia}
                nomeMedicamento={nomeDoMedicamento(posologia.medicamentoId)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold">Adicionar remédio</h2>
          <form onSubmit={adicionar} noValidate className="space-y-4 rounded-2xl border-2 border-slate-300 bg-white p-6">
            <div>
              <label htmlFor="medicamento" className="mb-1 block font-semibold">
                Remédio
              </label>
              <select
                id="medicamento"
                value={medicamentoId}
                onChange={(evento) => setMedicamentoId(evento.target.value)}
                className={
                  'w-full min-h-12 rounded-xl border-2 bg-white px-3 py-2 text-lg ' +
                  (erros.medicamentoId ? 'border-red-600' : 'border-slate-400')
                }
              >
                <option value="">Escolha...</option>
                {medicamentos.map((medicamento) => (
                  <option key={medicamento.id} value={medicamento.id}>
                    {medicamento.nome}
                  </option>
                ))}
              </select>
              {erros.medicamentoId && <p className="mt-1 text-sm text-red-700">{erros.medicamentoId}</p>}
            </div>

            <div>
              <label htmlFor="periodo" className="mb-1 block font-semibold">
                Período do dia
              </label>
              <select
                id="periodo"
                value={periodo}
                onChange={(evento) => setPeriodo(evento.target.value as Periodo)}
                className="w-full min-h-12 rounded-xl border-2 border-slate-400 bg-white px-3 py-2 text-lg"
              >
                <option value="MANHA">Manhã</option>
                <option value="ALMOCO">Almoço</option>
                <option value="TARDE">Tarde</option>
                <option value="NOITE">Noite</option>
              </select>
            </div>

            <Campo
              id="quantidade"
              rotulo="Quantidade receitada pelo médico"
              tipo="number"
              valor={quantidade}
              aoMudar={setQuantidade}
              erro={erros.quantidade}
              dica="1"
            />

            <Botao tipo="submit" desabilitado={salvando}>
              {salvando ? 'Salvando...' : 'Adicionar à rotina'}
            </Botao>
          </form>

          <div className="mt-4 space-y-3">
            {sucesso && <Mensagem tipo="sucesso" texto={sucesso} />}
            {erroApi && <Mensagem tipo="erro" texto={erroApi} />}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PacienteDetalhe
