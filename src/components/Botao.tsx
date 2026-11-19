import type { ReactNode } from 'react'

interface BotaoProps {
  children: ReactNode
  tipo?: 'button' | 'submit'
  cor?: 'verde' | 'vermelho' | 'branco'
  desabilitado?: boolean
  aoClicar?: () => void
}

const cores = {
  verde: 'bg-green-700 text-white hover:bg-green-800',
  vermelho: 'bg-white text-red-700 border-2 border-red-700 hover:bg-red-50',
  branco: 'bg-white text-slate-900 border-2 border-slate-400 hover:bg-slate-100',
}

// Botao grande, facil de tocar no celular.
function Botao({ children, tipo = 'button', cor = 'verde', desabilitado = false, aoClicar }: BotaoProps) {
  return (
    <button
      type={tipo}
      disabled={desabilitado}
      onClick={aoClicar}
      className={'min-h-12 rounded-2xl px-5 py-2 text-lg font-bold disabled:opacity-50 ' + cores[cor]}
    >
      {children}
    </button>
  )
}

export default Botao
