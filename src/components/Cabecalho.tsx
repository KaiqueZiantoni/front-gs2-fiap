import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { para: '/', texto: 'Início' },
  { para: '/pacientes', texto: 'Pacientes' },
  { para: '/medicamentos', texto: 'Remédios' },
  { para: '/sobre', texto: 'Sobre' },
  { para: '/integrantes', texto: 'Integrantes' },
  { para: '/faq', texto: 'Dúvidas' },
  { para: '/contato', texto: 'Contato' },
]

function Cabecalho() {
  // Controla o menu no celular (aberto ou fechado).
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="border-b-2 border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-green-700" onClick={() => setMenuAberto(false)}>
          Tomei, Doutor
        </Link>

        <button
          type="button"
          className="min-h-11 rounded-xl border-2 border-slate-400 px-4 font-bold lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>

        <nav className="hidden gap-1 lg:flex" aria-label="Menu principal">
          {links.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              className={({ isActive }) =>
                'rounded-xl px-3 py-2 font-semibold hover:bg-green-50 ' + (isActive ? 'bg-green-50 text-green-700' : 'text-slate-600')
              }
            >
              {link.texto}
            </NavLink>
          ))}
        </nav>
      </div>

      {menuAberto && (
        <nav id="menu-principal" className="flex flex-col px-4 pb-3 lg:hidden" aria-label="Menu principal">
          {links.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                'rounded-xl px-3 py-3 text-lg font-semibold hover:bg-green-50 ' + (isActive ? 'bg-green-50 text-green-700' : 'text-slate-600')
              }
            >
              {link.texto}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Cabecalho
