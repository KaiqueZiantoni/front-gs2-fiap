// Aviso de carregamento. O servidor gratuito dorme e pode demorar na primeira chamada.
function Carregando() {
  return (
    <p role="status" className="rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 text-slate-600">
      Carregando... Na primeira vez pode levar até um minuto.
    </p>
  )
}

export default Carregando
