import { Link } from 'react-router-dom'

function Rodape() {
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>Tomei, Doutor · Global Solution FIAP 2026/2</p>
        <p className="flex gap-4">
          <Link to="/sobre" className="underline">Sobre</Link>
          <Link to="/faq" className="underline">Dúvidas</Link>
          <Link to="/contato" className="underline">Contato</Link>
        </p>
      </div>
    </footer>
  )
}

export default Rodape
