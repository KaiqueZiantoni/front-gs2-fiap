import BotaoOuvir from './BotaoOuvir'

interface TituloProps {
  texto: string
  subtitulo?: string
}

// Titulo padrao do topo de cada pagina, com o botao "Ouvir".
function Titulo({ texto, subtitulo }: TituloProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{texto}</h1>
        {subtitulo && <p className="mt-2 text-lg text-slate-600">{subtitulo}</p>}
      </div>
      <div>
        <BotaoOuvir texto={texto + '. ' + (subtitulo ?? '')} />
      </div>
    </div>
  )
}

export default Titulo
