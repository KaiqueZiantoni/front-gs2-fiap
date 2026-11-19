import CartaoIntegrante from '../components/CartaoIntegrante'
import Titulo from '../components/Titulo'
import { integrantes } from '../data/integrantes'

function Integrantes() {
  return (
    <div>
      <Titulo texto="Integrantes" subtitulo="Quem fez o Tomei, Doutor." />
      <div className="grid gap-4 md:grid-cols-2">
        {integrantes.map((integrante) => (
          <CartaoIntegrante key={integrante.rm} integrante={integrante} />
        ))}
      </div>
    </div>
  )
}

export default Integrantes
