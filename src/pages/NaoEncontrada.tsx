import { Link } from 'react-router-dom'
import Titulo from '../components/Titulo'

function NaoEncontrada() {
  return (
    <div>
      <Titulo texto="Página não encontrada" subtitulo="O endereço que você abriu não existe." />
      <Link to="/" className="text-green-700 underline">
        Voltar para o início
      </Link>
    </div>
  )
}

export default NaoEncontrada
