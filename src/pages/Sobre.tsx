import Titulo from '../components/Titulo'

function Sobre() {
  return (
    <div>
      <Titulo texto="Sobre o projeto" subtitulo="De onde veio a ideia do Tomei, Doutor." />

      <div className="space-y-6">
        <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold">Como tudo começou</h2>
          <p className="mt-2">
            Quase toda família tem alguém que toma muitos remédios. Um para a pressão de manhã, outro depois do almoço,
            mais um antes de dormir. Com o tempo, a pessoa se confunde: "será que eu já tomei o de hoje?".
          </p>
          <p className="mt-2">
            Para quem enxerga mal ou lê com dificuldade, a caixa do remédio e a receita do médico ajudam pouco. E quem
            cuida, muitas vezes um filho ou um neto que mora longe, só descobre o problema quando ele já aconteceu.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold">O que a gente fez</h2>
          <p className="mt-2">
            O Tomei, Doutor é um lembrete de remédio feito para ser fácil. Na hora da dose aparece um aviso com um
            botão grande: "Tomei". A pessoa aperta e pronto, fica registrado.
          </p>
          <p className="mt-2">
            Se a dose passa sem registro, o cuidador recebe um aviso. E no dia da consulta, o histórico vira um
            relatório para o médico ver o que foi tomado de verdade.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-amber-600 bg-amber-50 p-6">
          <h2 className="text-xl font-bold">O que a gente não faz</h2>
          <p className="mt-2">
            O aplicativo não é médico. Ele não receita, não muda a dose e não manda parar nenhum remédio. Ele só ajuda
            a seguir o que o médico já receitou.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold">Por que "Entre no clima da consulta"</h2>
          <p className="mt-2">
            Calor forte e frio intenso mexem com a saúde, principalmente de quem é idoso ou tem doença crônica. Por
            isso o aplicativo também avisa quando o clima da cidade pede mais cuidado.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold">Sobre este site</h2>
          <p className="mt-2">
            Este site é a entrega de Front-End da Global Solution FIAP 2026/2, tema CitizenTech. Ele foi feito com
            React, Vite, TypeScript e Tailwind CSS, e conversa de verdade com a API Java do grupo: tudo o que aparece
            em Pacientes e Remédios vem do banco de dados.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Sobre
