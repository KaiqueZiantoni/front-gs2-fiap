import Titulo from '../components/Titulo'

interface Persona {
  nome: string
  idade: number
  papel: string
  texto: string
}

interface Ganho {
  titulo: string
  texto: string
}

interface Ods {
  numero: number
  nome: string
  texto: string
}


// Personas ficticias, criadas pelo grupo para representar o publico do projeto.
const personas: Persona[] = [
  {
    nome: 'Cleusa',
    idade: 71,
    papel: 'Paciente',
    texto: 'Toma vários remédios por dia e lê com dificuldade. Na consulta, diz que tomou tudo certinho.',
  },
  {
    nome: 'Antônio',
    idade: 64,
    papel: 'Paciente crônico',
    texto: 'Trata uma doença crônica e se confunde com os horários quando a rotina muda.',
  },
  {
    nome: 'Marcos',
    idade: 38,
    papel: 'Cuidador',
    texto: 'Filho que trabalha fora. Quer saber se a mãe tomou o remédio, sem precisar ligar toda hora.',
  },
]

const ganhos: Ganho[] = [
  { titulo: 'Para o paciente', texto: 'Um aviso na hora certa e um botão só. Sem menu difícil e sem texto longo.' },
  { titulo: 'Para o cuidador', texto: 'Tranquilidade. Ele só é chamado quando uma dose fica sem registro.' },
  { titulo: 'Para o médico', texto: 'Uma consulta com dados reais. O relatório mostra só o que fugiu do normal.' },
]

const propostas: string[] = [
  'Lembrete na hora da dose, com um botão grande: "Tomei".',
  'Se a dose fica sem registro, o app lembra de novo depois de 30 minutos.',
  'Depois de 90 minutos, o cuidador recebe um aviso e pode confirmar a dose.',
  'Cadastro do remédio pelo código de barras, com figuras no lugar de texto longo.',
  'Avisos em dias de calor, frio ou chuva forte, para quem toma remédios sensíveis ao clima.',
  'Relatório para o médico, só com o que fugiu do normal no período.',
]

const objetivos: Ods[] = [
  {
    numero: 3,
    nome: 'Saúde e Bem-Estar',
    texto: 'Ajuda o paciente a seguir o tratamento combinado com o médico e leva dados reais para a consulta.',
  },
  {
    numero: 10,
    nome: 'Redução das Desigualdades',
    texto: 'Frases curtas, figuras grandes e o botão "Ouvir" incluem quem lê com dificuldade.',
  },
  {
    numero: 13,
    nome: 'Ação Contra a Mudança Global do Clima',
    texto: 'Avisa o paciente em dias de calor, frio ou chuva forte, quando o cuidado precisa de mais atenção.',
  },
]

const regras: string[] = [
  'O app nunca sugere dose, troca ou suspensão de remédio.',
  'Dose sem confirmação aparece como "sem registro". Nunca como "não tomou".',
  'Toda tela tem frase curta, figura grande e o botão "Ouvir".',
]

function Sobre() {
  return (
    <div className="space-y-10">
      <Titulo
        texto="Sobre o projeto"
        subtitulo="Um lembrete de remédio feito por quem conhece o balcão da farmácia. Simples para o paciente, útil para o cuidador e honesto com o médico."
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">O problema</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border-2 border-slate-300 bg-white p-6">
            <p className="text-4xl font-bold text-green-700">50%</p>
            <p className="mt-2 text-slate-600">
              É a adesão média ao tratamento de doenças crônicas em países desenvolvidos. Nos países em
              desenvolvimento, é ainda menor.
            </p>
            <p className="mt-3 text-sm text-slate-600">Fonte: Organização Mundial da Saúde, 2003.</p>
          </article>
          <article className="rounded-2xl border-2 border-slate-300 bg-white p-6">
            <p className="text-4xl font-bold text-green-700">32,1 milhões</p>
            <p className="mt-2 text-slate-600">
              É o número de pessoas com 60 anos ou mais no Brasil. Isso equivale a 15,8% da população.
            </p>
            <p className="mt-3 text-sm text-slate-600">Fonte: IBGE, Censo 2022.</p>
          </article>
        </div>
        <p className="mt-4 text-lg">
          Na consulta, é comum o paciente dizer "tomei tudo certinho, doutor". Sem um registro, o médico decide o
          tratamento sem saber quais doses ficaram para trás.
        </p>
      </section>

      <section className="rounded-3xl border-2 border-green-700 bg-green-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-green-700">De onde veio a ideia</h2>
        <p className="mt-3 text-lg">
          A ideia nasceu da prática. Kaique Ziantoni, integrante do grupo, é farmacêutico e atuou em redes de
          farmácia. O atendimento ao público mostra que a receita certa resolve só metade do caminho. A outra metade
          acontece em casa, todos os dias, na hora de cada dose.
        </p>
        <p className="mt-3 text-lg">
          O Tomei, Doutor cuida dessa segunda metade. Ele respeita o papel de cada um: o médico decide o tratamento,
          o farmacêutico orienta, e o app ajuda o paciente a seguir o que foi combinado.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Por que vale a pena</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ganhos.map((ganho) => (
            <article key={ganho.titulo} className="rounded-2xl border-2 border-slate-300 bg-white p-6">
              <h3 className="text-xl font-bold">{ganho.titulo}</h3>
              <p className="mt-2 text-slate-600">{ganho.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Para quem é</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {personas.map((persona) => (
            <article key={persona.nome} className="rounded-2xl border-2 border-slate-300 bg-white p-6">
              <h3 className="text-xl font-bold">
                {persona.nome}, {persona.idade} anos
              </h3>
              <p className="font-semibold text-green-700">{persona.papel}</p>
              <p className="mt-2 text-slate-600">{persona.texto}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Cleusa, Antônio e Marcos são personagens criados pelo grupo para representar o público do projeto.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">O que o projeto propõe</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {propostas.map((proposta, indice) => (
            <li key={proposta} className="flex gap-3 rounded-2xl border-2 border-slate-300 bg-white p-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 font-bold text-white"
              >
                {indice + 1}
              </span>
              <span>{proposta}</span>
            </li>
          ))}
        </ol>
      </section>
      
      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Objetivos de Desenvolvimento Sustentável</h2>
        <p className="mb-4 text-lg">O projeto se conecta a três ODS da Agenda 2030 da ONU.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {objetivos.map((ods) => (
            <article key={ods.numero} className="rounded-2xl border-2 border-slate-300 bg-white p-6">
              <p className="text-4xl font-bold text-green-700">ODS {ods.numero}</p>
              <h3 className="mt-1 text-xl font-bold">{ods.nome}</h3>
              <p className="mt-2 text-slate-600">{ods.texto}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="rounded-2xl border-2 border-amber-600 bg-amber-50 p-6">
        <h2 className="text-xl font-bold">Regras que o app sempre segue</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          {regras.map((regra) => (
            <li key={regra}>{regra}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border-2 border-green-700 bg-green-50 p-6">
        <h2 className="text-xl font-bold">Sobre este trabalho</h2>
        <p className="mt-2">
          O Tomei, Doutor é o projeto da Global Solution 2026/2 da FIAP, com o tema CitizenTech. Este site é a entrega
          de Front-End Design Engineering e usa a API Java do grupo.
        </p>
      </section>
    </div>
  )
}

export default Sobre
