// Figuras grandes do aplicativo. Elas mostram o que cada coisa e, para quem le com dificuldade.
// Sao desenhos em SVG, os mesmos do prototipo do grupo.

export type NomeFigura =
  | 'caixa'
  | 'comprimido'
  | 'manha'
  | 'almoco'
  | 'tarde'
  | 'noite'
  | 'certo'
  | 'errado'
  | 'alerta'
  | 'termometro'
  | 'pessoa'
  | 'medico'
  | 'camera'
  | 'som'

interface FiguraProps {
  nome: NomeFigura
  // Tamanho em pixels (largura e altura).
  tamanho?: number
  // Cor do traco das figuras de um traco so (certo, errado, camera).
  cor?: string
}

function Figura({ nome, tamanho = 48, cor = '#0f172a' }: FiguraProps) {
  if (nome === 'caixa') {
    return (
      <svg viewBox="0 0 64 48" width={tamanho} height={tamanho * 0.75} aria-hidden="true">
        <rect x="3" y="6" width="58" height="36" rx="4" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
        <rect x="3" y="6" width="58" height="11" rx="4" fill="#bfdbfe" />
        <rect x="10" y="23" width="30" height="4" rx="2" fill="#0f172a" />
        <rect x="10" y="31" width="20" height="3" rx="1.5" fill="#94a3b8" />
      </svg>
    )
  }
  if (nome === 'comprimido') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <rect x="6" y="16" width="36" height="16" rx="8" fill="#fff" stroke="#0f172a" strokeWidth="3" />
        <path d="M24 16v16" stroke="#0f172a" strokeWidth="3" />
        <path d="M24 17.5h10a6.5 6.5 0 010 13H24z" fill="#86efac" />
      </svg>
    )
  }
  if (nome === 'manha') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M12 32a12 12 0 0124 0z" fill="#f59e0b" />
        <path d="M24 8v6M7 18l4 4M41 18l-4 4" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M4 34h40" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (nome === 'almoco') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <circle cx="26" cy="24" r="13" fill="none" stroke="#0f172a" strokeWidth="3" />
        <circle cx="26" cy="24" r="7" fill="#fde68a" stroke="#0f172a" strokeWidth="2" />
        <path d="M6 8v14M3 8v8a3 3 0 006 0V8M6 22v18" stroke="#0f172a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </svg>
    )
  }
  if (nome === 'tarde') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M12 30a12 12 0 0124 0z" fill="#fb923c" />
        <path d="M4 32h40M10 38h28" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (nome === 'noite') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M30 6a18 18 0 1 0 12 26A14 14 0 0 1 30 6z" fill="#6366f1" />
        <circle cx="38" cy="12" r="1.8" fill="#6366f1" />
        <circle cx="42" cy="22" r="1.4" fill="#6366f1" />
      </svg>
    )
  }
  if (nome === 'certo') {
    return (
      <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M4 12.5l5 5L20 6.5" stroke={cor} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (nome === 'errado') {
    return (
      <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke={cor} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </svg>
    )
  }
  if (nome === 'alerta') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <path d="M24 5l21 37H3z" fill="#fde047" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 18v12" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="36" r="2.4" fill="#0f172a" />
      </svg>
    )
  }
  if (nome === 'termometro') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <rect x="19" y="5" width="10" height="26" rx="5" fill="#fff" stroke="#0f172a" strokeWidth="3" />
        <circle cx="24" cy="36" r="8" fill="#dc2626" stroke="#0f172a" strokeWidth="3" />
        <rect x="22" y="14" width="4" height="20" fill="#dc2626" />
      </svg>
    )
  }
  if (nome === 'pessoa') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <circle cx="24" cy="15" r="9" fill="#7c3aed" />
        <path d="M6 44a18 18 0 0136 0z" fill="#7c3aed" />
      </svg>
    )
  }
  if (nome === 'medico') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <circle cx="24" cy="12" r="7" fill="#0f172a" />
        <path d="M8 44V32a10 10 0 0110-10h12a10 10 0 0110 10v12z" fill="#fff" stroke="#0f172a" strokeWidth="3" />
        <path d="M24 22v10M19 27h10" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (nome === 'camera') {
    return (
      <svg viewBox="0 0 48 48" width={tamanho} height={tamanho} aria-hidden="true">
        <rect x="5" y="14" width="38" height="26" rx="5" fill="none" stroke={cor} strokeWidth="3" />
        <rect x="17" y="8" width="14" height="8" rx="2" fill={cor} />
        <circle cx="24" cy="27" r="7" fill="none" stroke={cor} strokeWidth="3" />
      </svg>
    )
  }
  // som
  return (
    <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} aria-hidden="true">
      <path d="M3 9v6h4l5 4V5L7 9H3z" fill="#0f172a" />
      <path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default Figura
