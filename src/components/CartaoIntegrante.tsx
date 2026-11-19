import type { Integrante } from '../types'

interface CartaoIntegranteProps {
  integrante: Integrante
}

function CartaoIntegrante({ integrante }: CartaoIntegranteProps) {
  return (
    <article className="flex flex-col items-center gap-4 rounded-2xl border-2 border-slate-300 bg-white p-6 text-center sm:flex-row sm:text-left">
      <img
        src={integrante.foto}
        alt={'Foto de ' + integrante.nome}
        className="h-28 w-28 rounded-full border-2 border-green-700 object-cover"
      />
      <div>
        <h2 className="text-xl font-bold">{integrante.nome}</h2>
        <p className="text-slate-600">RM {integrante.rm}</p>
        <p className="text-slate-600">Turma {integrante.turma}</p>
        <p className="mt-2 flex justify-center gap-4 sm:justify-start">
          <a href={integrante.github} target="_blank" rel="noreferrer" className="font-semibold text-green-700 underline">
            GitHub
          </a>
          <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-green-700 underline">
            LinkedIn
          </a>
        </p>
      </div>
    </article>
  )
}

export default CartaoIntegrante
