interface CampoProps {
  id: string
  rotulo: string
  valor: string
  aoMudar: (valor: string) => void
  tipo?: string
  erro?: string
  dica?: string
}

// Campo de formulario com rotulo e mensagem de erro.
function Campo({ id, rotulo, valor, aoMudar, tipo = 'text', erro, dica }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {rotulo}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        placeholder={dica}
        onChange={(evento) => aoMudar(evento.target.value)}
        aria-invalid={erro ? true : false}
        className={
          'w-full min-h-12 rounded-xl border-2 bg-white px-3 py-2 text-lg ' + (erro ? 'border-red-600' : 'border-slate-400')
        }
      />
      {erro && <p className="mt-1 text-sm text-red-700">{erro}</p>}
    </div>
  )
}

export default Campo
