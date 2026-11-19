interface BotaoOuvirProps {
  texto: string
}

// Le o texto em voz alta, para quem tem dificuldade de leitura.
// Usa a fala do proprio navegador (Web Speech API).
function BotaoOuvir({ texto }: BotaoOuvirProps) {
  function falar() {
    window.speechSynthesis.cancel()
    const fala = new SpeechSynthesisUtterance(texto)
    fala.lang = 'pt-BR'
    window.speechSynthesis.speak(fala)
  }

  return (
    <button
      type="button"
      onClick={falar}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-amber-600 bg-amber-100 px-4 py-1 font-bold text-slate-900 hover:bg-amber-200"
    >
      <span aria-hidden="true">🔊</span> Ouvir
    </button>
  )
}

export default BotaoOuvir
