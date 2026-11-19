import type { Integrante } from '../types'

interface CartaoIntegranteProps {
  integrante: Integrante
}

function CartaoIntegrante({ integrante }: CartaoIntegranteProps) {
  // Primeira letra do nome, para o circulo do cartao.
  const inicial = integrante.nome.charAt(0)

  return (
    <article className="rounded-2xl border-2 border-slate-300 bg-white p-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-2xl font-bold text-white">
        {inicial}
      </div>
      <h2 className="text-xl font-bold">{integrante.nome}</h2>
      <p className="text-slate-600">RM {integrante.rm}</p>
      <p className="text-slate-600">Turma {integrante.turma}</p>
      {integrante.github && (
        <a href={integrante.github} target="_blank" rel="noreferrer" className="mt-2 inline-block text-green-700 underline">
          GitHub
        </a>
      )}
    </article>
  )
}

export default CartaoIntegrante
