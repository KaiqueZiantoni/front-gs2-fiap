import { useEffect, useState } from 'react'
import { cadastrarRegistro, confirmarDose, listarRegistros } from '../services/registros'
import type { Posologia, RegistroDose } from '../types'
import { formatarDataHora } from '../utils/datas'
import Botao from './Botao'
import Mensagem from './Mensagem'

interface CartaoPosologiaProps {
  posologia: Posologia
  nomeMedicamento: string
  // Avisa a pagina quando uma dose e criada ou confirmada.
  aoMudar: () => void
}

const nomesPeriodo = { MANHA: 'Manhã', ALMOCO: 'Almoço', TARDE: 'Tarde', NOITE: 'Noite' }
const horasPeriodo = { MANHA: '08', ALMOCO: '12', TARDE: '16', NOITE: '20' }
const nomesStatus = { SEM_REGISTRO: 'Sem registro', REGISTRADO: 'Tomou', NAO_TOMOU: 'Não tomou' }

// Um remedio da rotina do paciente, com as doses e o botao "Tomei".
function CartaoPosologia({ posologia, nomeMedicamento, aoMudar }: CartaoPosologiaProps) {
  const [registros, setRegistros] = useState<RegistroDose[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregar() {
    try {
      setRegistros(await listarRegistros(posologia.id))
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // Cria a dose de hoje no horario do periodo (manha 8h, almoco 12h, tarde 16h, noite 20h).
  async function criarDoseDeHoje() {
    setErro('')
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')
    const dataPrevista = ano + '-' + mes + '-' + dia + 'T' + horasPeriodo[posologia.periodo] + ':00:00'

    try {
      await cadastrarRegistro(posologia.id, dataPrevista)
      await carregar()
      aoMudar()
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  async function tomei(registroId: number) {
    setErro('')
    try {
      await confirmarDose(registroId, 'PACIENTE')
      await carregar()
      aoMudar()
    } catch (e) {
      setErro((e as Error).message)
    }
  }

  return (
    <article className="rounded-2xl border-2 border-slate-300 bg-white p-5">
      <h3 className="text-xl font-bold">{nomeMedicamento}</h3>
      <p className="text-slate-600">
        {nomesPeriodo[posologia.periodo]} · quantidade: {posologia.quantidadeDose}
        {posologia.ativo ? '' : ' · inativa'}
      </p>

      <div className="mt-4 space-y-3">
        {carregando && <p className="text-slate-600">Carregando doses...</p>}
        {erro && <Mensagem tipo="erro" texto={erro} />}
        {!carregando && registros.length === 0 && <Mensagem tipo="aviso" texto="Nenhuma dose prevista ainda." />}

        <ul className="space-y-2">
          {registros.map((registro) => (
            <li
              key={registro.id}
              className="flex flex-col gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-lg sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                {formatarDataHora(registro.dataPrevista)} · <strong>{nomesStatus[registro.status]}</strong>
              </span>
              {registro.status === 'SEM_REGISTRO' && (
                <button
                  type="button"
                  onClick={() => tomei(registro.id)}
                  className="min-h-16 rounded-2xl bg-green-700 px-8 text-2xl font-bold text-white shadow-[0_5px_0_#14532d] hover:bg-green-800"
                >
                  Tomei
                </button>
              )}
            </li>
          ))}
        </ul>

        <Botao cor="branco" aoClicar={criarDoseDeHoje}>
          Criar dose de hoje
        </Botao>
      </div>
    </article>
  )
}

export default CartaoPosologia
