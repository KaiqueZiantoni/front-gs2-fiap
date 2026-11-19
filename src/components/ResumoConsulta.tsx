import { useEffect, useState } from 'react'
import { listarRegistros } from '../services/registros'
import type { Posologia, RegistroDose } from '../types'
import { formatarDataHora } from '../utils/datas'
import Mensagem from './Mensagem'

interface ResumoConsultaProps {
  posologias: Posologia[]
  nomeDoMedicamento: (id: number) => string
  // Muda toda vez que uma dose e criada ou confirmada, para o resumo recarregar.
  versao: number
}

interface Excecao {
  registro: RegistroDose
  remedio: string
}

// Resumo que o paciente leva para a consulta: adesao do periodo e so as excecoes.
function ResumoConsulta({ posologias, nomeDoMedicamento, versao }: ResumoConsultaProps) {
  const [total, setTotal] = useState(0)
  const [confirmadas, setConfirmadas] = useState(0)
  const [excecoes, setExcecoes] = useState<Excecao[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregar() {
    setErro('')
    try {
      let novoTotal = 0
      let novasConfirmadas = 0
      const novasExcecoes: Excecao[] = []

      for (const posologia of posologias) {
        const registros = await listarRegistros(posologia.id)
        for (const registro of registros) {
          novoTotal = novoTotal + 1
          if (registro.status === 'REGISTRADO') {
            novasConfirmadas = novasConfirmadas + 1
          } else {
            novasExcecoes.push({ registro, remedio: nomeDoMedicamento(posologia.medicamentoId) })
          }
        }
      }

      setTotal(novoTotal)
      setConfirmadas(novasConfirmadas)
      setExcecoes(novasExcecoes)
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [versao])

  if (carregando) {
    return <p className="text-slate-600">Montando o resumo...</p>
  }

  if (erro) {
    return <Mensagem tipo="erro" texto={erro} />
  }

  if (total === 0) {
    return <Mensagem tipo="aviso" texto="Ainda não há doses para montar o resumo." />
  }

  const adesao = Math.round((confirmadas / total) * 100)

  return (
    <div className="rounded-3xl border-2 border-green-700 bg-green-50 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-5xl font-bold text-green-700">{adesao}%</p>
        <p className="text-lg">
          <strong>
            {confirmadas} de {total} doses
          </strong>{' '}
          com registro de "Tomei".
        </p>
      </div>

      <h3 className="mt-5 text-xl font-bold">O que fugiu do normal</h3>
      {excecoes.length === 0 && <p className="mt-2 text-lg">Nada. Todas as doses têm registro.</p>}
      <ul className="mt-2 space-y-2">
        {excecoes.map((excecao) => (
          <li key={excecao.registro.id} className="rounded-xl border-2 border-slate-300 bg-white p-3">
            <strong>{excecao.remedio}</strong> · {formatarDataHora(excecao.registro.dataPrevista)} ·{' '}
            {excecao.registro.status === 'NAO_TOMOU' ? 'Informou que não tomou' : 'Sem registro'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResumoConsulta
