export interface Pergunta {
  pergunta: string
  resposta: string
}

export const perguntas: Pergunta[] = [
  {
    pergunta: 'O que é o Tomei, Doutor?',
    resposta:
      'É um app que acompanha o tratamento entre uma consulta e outra. Ele lembra a dose na hora, registra o que aconteceu e leva esse histórico para o médico. A consulta deixa de depender só da memória do paciente.',
  },
  {
    pergunta: 'Qual é a novidade? Já existem apps de lembrete.',
    resposta:
      'O lembrete é só o começo. A novidade está no que chega à consulta: um relatório curto, só com o que fugiu do normal no período. O médico vê em um minuto quais doses ficaram sem registro e em quais horários isso se repete.',
  },
  {
    pergunta: 'Para quem ele foi feito?',
    resposta:
      'Para pessoas idosas e pacientes crônicos que tomam vários remédios por dia e leem com dificuldade. Também para quem cuida deles e para o médico que acompanha o tratamento.',
  },
  {
    pergunta: 'O aplicativo diz qual remédio ou qual dose tomar?',
    resposta:
      'Não. O app nunca sugere dose, troca ou suspensão de remédio. Ele só lembra o que o médico já receitou. Quem decide o tratamento é o médico, com a orientação do farmacêutico.',
  },
  {
    pergunta: 'O que acontece quando a dose não é confirmada?',
    resposta:
      'Depois de 30 minutos, o app lembra de novo. Depois de 90 minutos, o cuidador recebe um aviso e pode confirmar a dose. Se ninguém confirmar, a dose fica como "sem registro". O app nunca escreve "não tomou" por conta própria.',
  },
  {
    pergunta: 'O médico vê alguma coisa?',
    resposta:
      'Sim, e essa é a parte principal. O paciente leva para a consulta um relatório com a adesão do período e as exceções: doses sem registro, horários que mais falham e avisos de clima. Com isso, o médico ajusta o tratamento com base no que aconteceu de verdade.',
  },
  {
    pergunta: 'Por que o relatório mostra só as exceções?',
    resposta:
      'Porque a consulta é curta. Uma lista com todas as doses do mês ninguém lê. O relatório destaca só o que precisa de conversa, para o tempo do médico ir para o que importa.',
  },
  {
    pergunta: 'O que o clima tem a ver com remédio?',
    resposta:
      'Calor, frio e chuva forte mudam o cuidado com alguns tratamentos. O app olha a previsão do bairro e avisa o paciente em dias de atenção, com uma orientação simples, como beber água. O aviso nunca muda a dose.',
  },
  {
    pergunta: 'O que significa "Entre no clima da consulta"?',
    resposta:
      'Tem dois sentidos. O primeiro: chegar à consulta preparado, com o histórico das doses em mãos. O segundo: o app considera o clima do dia no cuidado com o tratamento.',
  },
    {
    pergunta: 'O que o cuidador precisa fazer?',
    resposta:
      'Quase nada no dia a dia. O cuidador só recebe aviso quando uma dose fica 90 minutos sem registro. Ele pode ligar para o paciente e, se a dose foi tomada, tocar em "Tomou, confirmei". Não precisa ficar conferindo o app toda hora.',
  },
  {
    pergunta: 'Quanto custa? Quem paga?',
    resposta:
      'O Tomei, Doutor é um projeto acadêmico da Global Solution FIAP. Este protótipo é gratuito para quem usa. O app não vende remédio e não indica marca nem farmácia.',
  },

]
