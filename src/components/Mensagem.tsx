interface MensagemProps {
  tipo: 'sucesso' | 'erro' | 'aviso'
  texto: string
}

const estilos = {
  sucesso: 'border-green-700 bg-green-50 text-green-900',
  erro: 'border-red-700 bg-red-50 text-red-900',
  aviso: 'border-amber-600 bg-amber-50 text-amber-900',
}

// Caixa de aviso usada para sucesso, erro e lista vazia.
function Mensagem({ tipo, texto }: MensagemProps) {
  return (
    <p role={tipo === 'erro' ? 'alert' : 'status'} className={'rounded-xl border-2 px-4 py-3 text-lg font-semibold ' + estilos[tipo]}>
      {texto}
    </p>
  )
}

export default Mensagem
