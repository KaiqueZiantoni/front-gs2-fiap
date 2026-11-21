import { Link } from 'react-router-dom'
import Titulo from '../components/Titulo'

function NaoEncontrada() {
  return (
    <div>
      <Titulo texto="Página não encontrada" subtitulo="O endereço que você abriu não existe." />
      <p className="mb-4 text-lg">Escolha para onde ir:</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="flex min-h-14 items-center justify-center rounded-2xl bg-green-700 px-6 text-xl font-bold text-white hover:bg-green-800"
        >
          Voltar para o início
        </Link>
        <Link
          to="/pacientes"
          className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-slate-400 bg-white px-6 text-xl font-bold hover:bg-slate-100"
        >
          Ver os pacientes
        </Link>
      </div>
    </div>
  )
}

export default NaoEncontrada
