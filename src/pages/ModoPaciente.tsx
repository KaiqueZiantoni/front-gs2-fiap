import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BotaoOuvir from '../components/BotaoOuvir'
import Carregando from '../components/Carregando'
import LeitorCamera, { navegadorLeCodigo } from '../components/LeitorCamera'
import Mensagem from '../components/Mensagem'
import { listarMedicamentos } from '../services/medicamentos'
import { buscarPaciente } from '../services/pacientes'
import { cadastrarPosologia, listarPosologias } from '../services/posologias'
import { cadastrarRegistro, confirmarDose, listarRegistros } from '../services/registros'
import type { Medicamento, Paciente, Periodo, RegistroDose } from '../types'
import { doseDeHoje } from '../utils/datas'

// Telas do modo paciente, na ordem em que aparecem.
type Tela = 'inicio' | 'codigo' | 'confirmar' | 'quando' | 'registrado'

interface DosePendente {
  registro: RegistroDose
  remedio: string
}

const periodos: { valor: Periodo; nome: string; hora: string }[] = [
  { valor: 'MANHA', nome: 'Manhã', hora: '8 horas' },
  { valor: 'ALMOCO', nome: 'Almoço', hora: '12 horas' },
  { valor: 'TARDE', nome: 'Tarde', hora: '16 horas' },
  { valor: 'NOITE', nome: 'Noite', hora: '20 horas' },
]

const botaoVerde =
  'flex min-h-16 w-full items-center justify-center rounded-2xl bg-green-700 px-6 text-2xl font-bold text-white hover:bg-green-800 disabled:opacity-50'
const botaoBranco =
  'flex min-h-16 w-full items-center justify-center rounded-2xl border-2 border-slate-400 bg-white px-6 text-2xl font-bold hover:bg-slate-100'

// Demonstracao das telas do aplicativo do paciente, com os dados reais da API.
function ModoPaciente() {
  const { id } = useParams()
  const pacienteId = Number(id)

  const [tela, setTela] = useState<Tela>('inicio')
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [pendentes, setPendentes] = useState<DosePendente[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Cadastro de um remedio novo
  const [codigo, setCodigo] = useState('')
  const [cameraLigada, setCameraLigada] = useState(false)
  const [encontrado, setEncontrado] = useState<Medicamento | null>(null)
  const [periodo, setPeriodo] = useState<Periodo>('MANHA')
  const [quantidade, setQuantidade] = useState(1)
  const [salvando, setSalvando] = useState(false)

  // Hora da ultima dose confirmada, para a tela "Registrado"
  const [horaRegistro, setHoraRegistro] = useState('')

  async function carregar() {
    setErro('')
    try {
      const dadosPaciente = await buscarPaciente(pacienteId)
      const catalogo = await listarMedicamentos()
      const posologias = await listarPosologias(pacienteId)

      // Junta as doses que ainda estao sem registro.
      const novasPendentes: DosePendente[] = []
      for (const posologia of posologias) {
        let nome = 'Remédio'
        for (const medicamento of catalogo) {
          if (medicamento.id === posologia.medicamentoId) {
            nome = medicamento.nome
          }
        }
        const registros = await listarRegistros(posologia.id)
        for (const registro of registros) {
          if (registro.status === 'SEM_REGISTRO') {
            novasPendentes.push({ registro, remedio: nome })
          }
        }
      }

      setPaciente(dadosPaciente)
      setMedicamentos(catalogo)
      setPendentes(novasPendentes)
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [pacienteId])

  // Procura o codigo de barras no catalogo de remedios que veio da API.
  function procurar(codigoLido: string) {
    setErro('')
    setCameraLigada(false)
    setCodigo(codigoLido)

    for (const medicamento of medicamentos) {
      if (medicamento.ean === codigoLido) {
        setEncontrado(medicamento)
        setTela('confirmar')
        return
      }
    }
    setErro('Não achei este código. Confira os números e tente de novo.')
  }

  // Grava o remedio na rotina e cria a dose de hoje.
  async function salvarRemedio() {
    if (encontrado === null) {
      return
    }
    setErro('')
    setSalvando(true)
    try {
      const posologia = await cadastrarPosologia(pacienteId, {
        medicamentoId: encontrado.id,
        periodo,
        quantidadeDose: quantidade,
        tipoUso: 'CONTINUO',
        origem: 'RECEITADO',
        dataInicio: new Date().toISOString().substring(0, 10),
      })
      await cadastrarRegistro(posologia.id, doseDeHoje(periodo))
      await carregar()
      setCodigo('')
      setEncontrado(null)
      setTela('inicio')
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  async function tomei(registroId: number) {
    setErro('')
    try {
      const registro = await confirmarDose(registroId, 'PACIENTE')
      // dataConfirmacao vem como 2026-11-19T08:10:00. Fica so a hora: 08:10
      setHoraRegistro(registro.dataConfirmacao ? registro.dataConfirmacao.substring(11, 16) : '')
      setTela('registrado')
      await carregar()
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  if (carregando) {
    return <Carregando />
  }

  if (paciente === null) {
    return <Mensagem tipo="erro" texto={erro || 'Paciente não encontrado.'} />
  }

  const primeiroNome = paciente.nome.split(' ')[0]

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link to={'/pacientes/' + pacienteId} className="font-semibold text-green-700 underline">
          ← Sair do modo paciente
        </Link>
      </div>

      <div className="space-y-4 rounded-3xl border-4 border-slate-800 bg-white p-5">
        {erro && <Mensagem tipo="erro" texto={erro} />}

        {tela === 'inicio' && pendentes.length === 0 && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Olá, ' + primeiroNome + '. Você não tem dose para registrar agora.'} />
            <h1 className="text-3xl font-bold">Olá, {primeiroNome}.</h1>
            <p className="text-xl text-slate-600">Você não tem dose para registrar agora.</p>
            <button type="button" className={botaoVerde} onClick={() => setTela('codigo')}>
              Adicionar remédio
            </button>
          </div>
        )}

        {tela === 'inicio' && pendentes.length > 0 && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Hora do remédio. ' + pendentes[0].remedio + '. Aperte Tomei.'} />
            <p className="text-xl font-bold text-slate-600">Hora do remédio</p>
            <h1 className="text-3xl font-bold">{pendentes[0].remedio}</h1>
            <p className="text-xl text-slate-600">Previsto para {pendentes[0].registro.dataPrevista.substring(11, 16)}</p>
            <button
              type="button"
              onClick={() => tomei(pendentes[0].registro.id)}
              className="flex min-h-40 w-full items-center justify-center rounded-3xl bg-green-700 text-5xl font-bold text-white shadow-[0_6px_0_#14532d] hover:bg-green-800"
            >
              Tomei
            </button>
            <button type="button" className={botaoBranco} onClick={() => setTela('codigo')}>
              Adicionar remédio
            </button>
          </div>
        )}

        {tela === 'codigo' && (
          <div className="space-y-4">
            <BotaoOuvir texto="Digite os números do código de barras da caixa do remédio." />
            <h1 className="text-3xl font-bold">Qual é o código de barras da caixa?</h1>

            {cameraLigada && <LeitorCamera aoLer={procurar} />}

            <div>
              <label htmlFor="codigo" className="mb-1 block text-xl font-semibold">
                Números do código
              </label>
              <input
                id="codigo"
                inputMode="numeric"
                value={codigo}
                onChange={(evento) => setCodigo(evento.target.value)}
                placeholder="2000000000015"
                className="min-h-16 w-full rounded-2xl border-2 border-slate-400 px-4 text-2xl"
              />
            </div>

            <button type="button" className={botaoVerde} onClick={() => procurar(codigo.trim())}>
              Buscar
            </button>
            {navegadorLeCodigo() && !cameraLigada && (
              <button type="button" className={botaoBranco} onClick={() => setCameraLigada(true)}>
                Usar a câmera
              </button>
            )}
            <button type="button" className={botaoBranco} onClick={() => setTela('inicio')}>
              Voltar
            </button>
          </div>
        )}

        {tela === 'confirmar' && encontrado !== null && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'É este remédio? ' + encontrado.nome} />
            <h1 className="text-3xl font-bold">É este remédio?</h1>
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-5">
              <p className="text-3xl font-bold">{encontrado.nome}</p>
              <p className="text-xl text-slate-600">{encontrado.principioAtivo}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className={botaoVerde} onClick={() => setTela('quando')}>
                Sim
              </button>
              <button type="button" className={botaoBranco} onClick={() => setTela('codigo')}>
                Não
              </button>
            </div>
          </div>
        )}

        {tela === 'quando' && encontrado !== null && (
          <div className="space-y-4">
            <BotaoOuvir texto="Quando você toma? Quantos de cada vez? Marque como o médico receitou." />
            <h1 className="text-3xl font-bold">Quando você toma?</h1>
            <div className="grid grid-cols-2 gap-3">
              {periodos.map((item) => (
                <button
                  key={item.valor}
                  type="button"
                  aria-pressed={periodo === item.valor}
                  onClick={() => setPeriodo(item.valor)}
                  className={
                    'rounded-2xl p-3 text-center ' +
                    (periodo === item.valor ? 'border-4 border-green-700 bg-green-50' : 'border-2 border-slate-300 bg-white')
                  }
                >
                  <span className="block text-xl font-bold">{item.nome}</span>
                  <span className="block text-slate-600">{item.hora}</span>
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold">Quantos de cada vez?</h2>
            <p className="text-lg text-slate-600">Marque como o médico receitou.</p>
            <div className="flex gap-3">
              {[1, 2, 3].map((numero) => (
                <button
                  key={numero}
                  type="button"
                  aria-pressed={quantidade === numero}
                  onClick={() => setQuantidade(numero)}
                  className={
                    'min-h-16 flex-1 rounded-2xl text-2xl font-bold ' +
                    (quantidade === numero ? 'border-4 border-green-700 bg-green-50' : 'border-2 border-slate-300 bg-white')
                  }
                >
                  {numero}
                </button>
              ))}
            </div>

            <button type="button" className={botaoVerde} disabled={salvando} onClick={salvarRemedio}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        )}

        {tela === 'registrado' && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Registrado às ' + horaRegistro + '.'} />
            <div
              aria-hidden="true"
              className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-green-700 text-7xl text-white"
            >
              ✓
            </div>
            <h1 className="text-3xl font-bold">Registrado às {horaRegistro}.</h1>
            <button type="button" className={botaoBranco} onClick={() => setTela('inicio')}>
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModoPaciente
