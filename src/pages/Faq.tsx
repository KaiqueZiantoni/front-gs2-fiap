import { useState } from 'react'
import Titulo from '../components/Titulo'
import { perguntas } from '../data/faq'

function Faq() {
  // Guarda qual pergunta esta aberta. -1 = nenhuma.
  const [aberta, setAberta] = useState(-1)

  return (
    <div>
      <Titulo texto="Dúvidas frequentes" subtitulo="Toque em uma pergunta para ver a resposta." />
      <div className="space-y-3">
        {perguntas.map((item, indice) => (
          <div key={item.pergunta} className="rounded-2xl border-2 border-slate-300 bg-white">
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-bold"
              aria-expanded={aberta === indice}
              onClick={() => setAberta(aberta === indice ? -1 : indice)}
            >
              <span>{item.pergunta}</span>
              <span aria-hidden="true" className="text-2xl text-green-700">
                {aberta === indice ? '−' : '+'}
              </span>
            </button>
            {aberta === indice && <p className="border-t-2 border-slate-200 px-5 py-4 text-lg text-slate-700">{item.resposta}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq
