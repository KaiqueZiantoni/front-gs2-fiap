import { useEffect, useState } from 'react'
import { listarMedicamentos } from '../services/medicamentos'
import { cadastrarPosologia, listarPosologias } from '../services/posologias'
import { cadastrarRegistro, confirmarDose, listarRegistros } from '../services/registros'
import type { Medicamento, Paciente, Periodo, Posologia, RegistroDose } from '../types'
import { doseDeHoje, formatarDataHora } from '../utils/datas'
import BotaoOuvir from './BotaoOuvir'
import Carregando from './Carregando'
import Figura from './Figura'
import type { NomeFigura } from './Figura'
import LeitorCamera, { navegadorLeCodigo } from './LeitorCamera'
import Mensagem from './Mensagem'
import ResumoConsulta from './ResumoConsulta'

interface AppPacienteProps {
  paciente: Paciente
}

// Abas do rodape do aplicativo.
type Aba = 'hoje' | 'clima' | 'medico' | 'cuidador'
// Telas dentro da aba "Hoje", na ordem em que aparecem.
type Tela = 'inicio' | 'codigo' | 'confirmar' | 'quando' | 'registrado'

interface DosePendente {
  registro: RegistroDose
  remedio: string
  periodo: Periodo
  quantidade: number
}

const abas: { valor: Aba; nome: string; figura: NomeFigura }[] = [
  { valor: 'hoje', nome: 'Hoje', figura: 'comprimido' },
  { valor: 'clima', nome: 'Clima', figura: 'termometro' },
  { valor: 'medico', nome: 'Vou ao médico', figura: 'medico' },
  { valor: 'cuidador', nome: 'Cuidador', figura: 'pessoa' },
]

const periodos: { valor: Periodo; nome: string; hora: string; figura: NomeFigura }[] = [
  { valor: 'MANHA', nome: 'Manhã', hora: '8 horas', figura: 'manha' },
  { valor: 'ALMOCO', nome: 'Almoço', hora: '12 horas', figura: 'almoco' },
  { valor: 'TARDE', nome: 'Tarde', hora: '16 horas', figura: 'tarde' },
  { valor: 'NOITE', nome: 'Noite', hora: '20 horas', figura: 'noite' },
]

// Figura de cada periodo, para a tela da dose.
const figuraDoPeriodo: Record<Periodo, NomeFigura> = { MANHA: 'manha', ALMOCO: 'almoco', TARDE: 'tarde', NOITE: 'noite' }

// Quantidades da tela de cadastro: meio, um ou dois.
const quantidades: { valor: number; nome: string }[] = [
  { valor: 0.5, nome: 'meio' },
  { valor: 1, nome: '1' },
  { valor: 2, nome: '2' },
]

// Escreve a quantidade por extenso: 0.5 vira "meio".
function textoQuantidade(valor: number) {
  return valor === 0.5 ? 'meio' : String(valor)
}

const botaoVerde =
  'flex min-h-16 w-full items-center justify-center rounded-2xl bg-green-700 px-6 text-2xl font-bold text-white hover:bg-green-800 disabled:opacity-50'
const botaoBranco =
  'flex min-h-16 w-full items-center justify-center rounded-2xl border-2 border-slate-400 bg-white px-6 text-2xl font-bold hover:bg-slate-100'
const botaoRoxo =
  'flex min-h-16 w-full items-center justify-center rounded-2xl bg-violet-700 px-6 text-2xl font-bold text-white hover:bg-violet-800'

// As telas do aplicativo do paciente, dentro de uma moldura de celular.
// As abas Hoje, Vou ao medico e Cuidador usam os dados reais da API.
function AppPaciente({ paciente }: AppPacienteProps) {
  const [aba, setAba] = useState<Aba>('hoje')
  const [tela, setTela] = useState<Tela>('inicio')
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [posologias, setPosologias] = useState<Posologia[]>([])
  const [pendentes, setPendentes] = useState<DosePendente[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  // Aumenta a cada mudanca nas doses, para o relatorio recarregar.
  const [versao, setVersao] = useState(0)

  // Cadastro de um remedio novo
  const [codigo, setCodigo] = useState('')
  const [cameraLigada, setCameraLigada] = useState(false)
  const [encontrado, setEncontrado] = useState<Medicamento | null>(null)
  const [periodo, setPeriodo] = useState<Periodo>('MANHA')
  const [quantidade, setQuantidade] = useState(1)
  const [salvando, setSalvando] = useState(false)

  // Hora da ultima dose confirmada, para a tela "Registrado"
  const [horaRegistro, setHoraRegistro] = useState('')

  const primeiroNome = paciente.nome.split(' ')[0]

  function nomeDoMedicamento(idProcurado: number) {
    for (const medicamento of medicamentos) {
      if (medicamento.id === idProcurado) {
        return medicamento.nome
      }
    }
    return 'Remédio'
  }

  async function carregar() {
    setErro('')
    try {
      const catalogo = await listarMedicamentos()
      const rotina = await listarPosologias(paciente.id)

      // Junta as doses que ainda estao sem registro.
      const novasPendentes: DosePendente[] = []
      for (const posologia of rotina) {
        let nome = 'Remédio'
        for (const medicamento of catalogo) {
          if (medicamento.id === posologia.medicamentoId) {
            nome = medicamento.nome
          }
        }
        const registros = await listarRegistros(posologia.id)
        for (const registro of registros) {
          if (registro.status === 'SEM_REGISTRO') {
            novasPendentes.push({
              registro,
              remedio: nome,
              periodo: posologia.periodo,
              quantidade: posologia.quantidadeDose,
            })
          }
        }
      }

      setMedicamentos(catalogo)
      setPosologias(rotina)
      setPendentes(novasPendentes)
      setVersao((atual) => atual + 1)
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [paciente.id])

  function trocarAba(nova: Aba) {
    setErro('')
    setAviso('')
    setAba(nova)
  }

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
      const posologia = await cadastrarPosologia(paciente.id, {
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

  // Botao "Tomei" (paciente) e "confirmei" (cuidador).
  async function confirmar(registroId: number, autor: 'PACIENTE' | 'CUIDADOR') {
    setErro('')
    setAviso('')
    try {
      const registro = await confirmarDose(registroId, autor)
      // dataConfirmacao vem como 2026-11-19T08:10:00. Fica so a hora: 08:10
      const hora = registro.dataConfirmacao ? registro.dataConfirmacao.substring(11, 16) : ''
      if (autor === 'PACIENTE') {
        setHoraRegistro(hora)
        setTela('registrado')
      } else {
        setAviso('Dose confirmada pelo cuidador às ' + hora + '.')
      }
      await carregar()
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  if (carregando) {
    return <Carregando />
  }

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-3xl border-4 border-slate-800 bg-white">
      <div className="flex items-center justify-between border-b-2 border-slate-200 bg-slate-50 px-4 py-3">
        <span className={'text-xl font-bold ' + (aba === 'cuidador' ? 'text-violet-700' : 'text-green-700')}>
          Tomei, Doutor{aba === 'cuidador' ? ' · cuidador' : ''}
        </span>
      </div>

      <div className="min-h-96 space-y-4 p-5">
        {erro && (
          <div className="flex flex-col items-center gap-2">
            <Figura nome="alerta" tamanho={72} />
            <Mensagem tipo="erro" texto={erro} />
          </div>
        )}
        {aviso && <Mensagem tipo="sucesso" texto={aviso} />}

        {aba === 'hoje' && tela === 'inicio' && pendentes.length === 0 && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Olá, ' + primeiroNome + '. Você não tem dose para registrar agora.'} />
            <div className="flex justify-center opacity-70">
              <Figura nome="caixa" tamanho={150} />
            </div>
            <h2 className="text-3xl font-bold">Olá, {primeiroNome}.</h2>
            <p className="text-xl text-slate-600">Você não tem dose para registrar agora.</p>
            <button type="button" className={botaoVerde + ' gap-3'} onClick={() => setTela('codigo')}>
              <Figura nome="caixa" tamanho={44} /> Adicionar remédio
            </button>
          </div>
        )}

        {aba === 'hoje' && tela === 'inicio' && pendentes.length > 0 && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Hora do remédio. ' + pendentes[0].remedio + '. Aperte Tomei.'} />
            <p className="flex items-center justify-center gap-2 text-xl font-bold text-slate-600">
              <Figura nome={figuraDoPeriodo[pendentes[0].periodo]} tamanho={40} />
              {formatarDataHora(pendentes[0].registro.dataPrevista)}
            </p>
            <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-slate-300 bg-slate-50 p-4">
              <Figura nome="caixa" tamanho={150} />
              <h2 className="text-3xl font-bold">{pendentes[0].remedio}</h2>
              <p className="flex items-center gap-2 text-xl text-slate-600">
                <Figura nome="comprimido" tamanho={34} /> Quantidade: {textoQuantidade(pendentes[0].quantidade)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => confirmar(pendentes[0].registro.id, 'PACIENTE')}
              className="flex min-h-40 w-full flex-col items-center justify-center rounded-3xl bg-green-700 text-5xl font-bold text-white shadow-[0_6px_0_#14532d] hover:bg-green-800"
            >
              <Figura nome="certo" tamanho={60} cor="#ffffff" />
              Tomei
            </button>
            <button
              type="button"
              className={botaoBranco}
              onClick={() => setAviso('Tudo bem. A dose continua sem registro e o app lembra de novo.')}
            >
              Ainda não
            </button>
            <button type="button" className={botaoBranco} onClick={() => setTela('codigo')}>
              Adicionar remédio
            </button>
          </div>
        )}

        {aba === 'hoje' && tela === 'codigo' && (
          <div className="space-y-4">
            <BotaoOuvir texto="Digite os números do código de barras da caixa do remédio." />
            <div className="flex justify-center">
              <Figura nome="caixa" tamanho={130} />
            </div>
            <h2 className="text-3xl font-bold">Qual é o código de barras da caixa?</h2>

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
              <button type="button" className={botaoBranco + ' gap-3'} onClick={() => setCameraLigada(true)}>
                <Figura nome="camera" tamanho={40} /> Usar a câmera
              </button>
            )}
            <button type="button" className={botaoBranco} onClick={() => setTela('inicio')}>
              Voltar
            </button>
          </div>
        )}

        {aba === 'hoje' && tela === 'confirmar' && encontrado !== null && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'É este remédio? ' + encontrado.nome} />
            <h2 className="text-3xl font-bold">É este remédio?</h2>
            <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-slate-300 bg-slate-50 p-5">
              <Figura nome="caixa" tamanho={150} />
              <p className="text-3xl font-bold">{encontrado.nome}</p>
              <p className="text-xl text-slate-600">{encontrado.principioAtivo}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className={botaoVerde + ' min-h-28 flex-col'} onClick={() => setTela('quando')}>
                <Figura nome="certo" tamanho={44} cor="#ffffff" />
                Sim
              </button>
              <button type="button" className={botaoBranco + ' min-h-28 flex-col'} onClick={() => setTela('codigo')}>
                <Figura nome="errado" tamanho={44} />
                Não
              </button>
            </div>
          </div>
        )}

        {aba === 'hoje' && tela === 'quando' && encontrado !== null && (
          <div className="space-y-4">
            <BotaoOuvir texto="Quando você toma? Quantos de cada vez? Marque como o médico receitou." />
            <h2 className="text-3xl font-bold">Quando você toma?</h2>
            <div className="grid grid-cols-2 gap-3">
              {periodos.map((item) => (
                <button
                  key={item.valor}
                  type="button"
                  aria-pressed={periodo === item.valor}
                  onClick={() => setPeriodo(item.valor)}
                  className={
                    'flex flex-col items-center rounded-2xl p-3 text-center ' +
                    (periodo === item.valor ? 'border-4 border-green-700 bg-green-50' : 'border-2 border-slate-300 bg-white')
                  }
                >
                  <Figura nome={item.figura} tamanho={60} />
                  <span className="block text-xl font-bold">{item.nome}</span>
                  <span className="block text-slate-600">{item.hora}</span>
                </button>
              ))}
            </div>

            <h3 className="text-2xl font-bold">Quantos de cada vez?</h3>
            <p className="text-lg text-slate-600">Marque como o médico receitou.</p>
            <div className="flex gap-3">
              {quantidades.map((item) => (
                <button
                  key={item.valor}
                  type="button"
                  aria-pressed={quantidade === item.valor}
                  onClick={() => setQuantidade(item.valor)}
                  className={
                    'flex min-h-24 flex-1 flex-col items-center justify-center rounded-2xl text-xl font-bold ' +
                    (quantidade === item.valor ? 'border-4 border-green-700 bg-green-50' : 'border-2 border-slate-300 bg-white')
                  }
                >
                  <span className="flex">
                    <Figura nome="comprimido" tamanho={item.valor === 2 ? 34 : 44} />
                    {item.valor === 2 && <Figura nome="comprimido" tamanho={34} />}
                  </span>
                  {item.nome}
                </button>
              ))}
            </div>

            <button type="button" className={botaoVerde} disabled={salvando} onClick={salvarRemedio}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        )}

        {aba === 'hoje' && tela === 'registrado' && (
          <div className="space-y-4 text-center">
            <BotaoOuvir texto={'Registrado às ' + horaRegistro + '.'} />
            <div
              aria-hidden="true"
              className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-green-700"
            >
              <Figura nome="certo" tamanho={96} cor="#ffffff" />
            </div>
            <h2 className="text-3xl font-bold">Registrado às {horaRegistro}.</h2>
            <button type="button" className={botaoBranco} onClick={() => setTela('inicio')}>
              Voltar
            </button>
          </div>
        )}

        {aba === 'clima' && (
          <div className="space-y-4">
            <Mensagem
              tipo="aviso"
              texto="Tela de exemplo. O aviso de clima faz parte do aplicativo, mas ainda não vem da API."
            />
            <BotaoOuvir texto="Vai fazer muito calor. Beba mais água. Fique na sombra das 10 às 16. Se sentir tontura, procure ajuda. Este aviso não muda a sua receita." />
            <div className="space-y-3 rounded-3xl border-4 border-red-600 bg-red-50 p-4">
              <p className="flex items-center gap-3 font-bold text-red-700">
                <Figura nome="termometro" tamanho={64} /> AMANHÃ · 35 °C
              </p>
              <h2 className="text-3xl font-bold">Vai fazer muito calor.</h2>
              <p className="text-xl">Para quem toma o seu remédio, calor forte pede cuidado.</p>
              <ul className="list-disc space-y-1 pl-6 text-xl font-bold">
                <li>Beba mais água.</li>
                <li>Fique na sombra das 10 às 16.</li>
                <li>Se sentir tontura, procure ajuda.</li>
              </ul>
            </div>
            <button type="button" className={botaoVerde} onClick={() => trocarAba('hoje')}>
              Entendi
            </button>
            <p className="text-slate-600">
              Este aviso não muda a sua receita. Na dúvida, fale com o médico ou o farmacêutico.
            </p>
          </div>
        )}

        {aba === 'medico' && (
          <div className="space-y-4">
            <BotaoOuvir texto="Relatório para o médico. Mostra as doses registradas e o que fugiu do normal." />
            <p className="flex items-center gap-3 font-bold text-slate-600">
              <Figura nome="medico" tamanho={56} /> PARA O MÉDICO
            </p>
            <h2 className="text-3xl font-bold">{paciente.nome}</h2>
            <ResumoConsulta posologias={posologias} nomeDoMedicamento={nomeDoMedicamento} versao={versao} />
            <p className="text-slate-600">Doses sem registro não contam como tomadas.</p>
          </div>
        )}

        {aba === 'cuidador' && (
          <div className="space-y-4">
            <BotaoOuvir texto={'Aviso ao cuidador. Doses de ' + primeiroNome + ' que ficaram sem registro.'} />
            <p className="text-slate-600">No aplicativo, este aviso chega depois de 90 minutos sem registro.</p>
            {pendentes.length === 0 && (
              <Mensagem tipo="aviso" texto={primeiroNome + ' não tem dose sem registro agora.'} />
            )}
            {pendentes.map((pendente) => (
              <div
                key={pendente.registro.id}
                className="space-y-3 rounded-3xl border-4 border-violet-600 bg-violet-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Figura nome="pessoa" tamanho={56} />
                  <h2 className="text-2xl font-bold">{primeiroNome} não registrou a dose.</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Figura nome="caixa" tamanho={90} />
                  <p className="text-2xl font-bold">{pendente.remedio}</p>
                </div>
                <p className="text-xl text-slate-600">
                  prevista para {formatarDataHora(pendente.registro.dataPrevista)}
                </p>
                <button
                  type="button"
                  className={botaoRoxo}
                  onClick={() => confirmar(pendente.registro.id, 'CUIDADOR')}
                >
                  Tomou, confirmei
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="grid grid-cols-4 border-t-2 border-slate-200 bg-slate-50" aria-label="Abas do aplicativo">
        {abas.map((item) => (
          <button
            key={item.valor}
            type="button"
            aria-pressed={aba === item.valor}
            onClick={() => trocarAba(item.valor)}
            className={
              'flex min-h-20 flex-col items-center justify-center gap-1 px-1 py-2 text-sm font-bold ' +
              (aba === item.valor ? 'bg-green-50 text-green-700' : 'text-slate-600')
            }
          >
            <Figura nome={item.figura} tamanho={32} />
            {item.nome}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default AppPaciente
