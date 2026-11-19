export interface Pergunta {
  pergunta: string
  resposta: string
}

export const perguntas: Pergunta[] = [
  {
    pergunta: 'O que é o Tomei, Doutor?',
    resposta:
      'É um aplicativo que lembra a hora do remédio. A pessoa aperta o botão "Tomei" e o registro fica guardado.',
  },
  {
    pergunta: 'Para quem ele foi feito?',
    resposta:
      'Para pessoas idosas e pacientes crônicos que tomam vários remédios por dia e têm dificuldade para ler.',
  },
  {
    pergunta: 'O aplicativo diz qual remédio ou qual dose tomar?',
    resposta:
      'Não. O Tomei, Doutor nunca sugere dose, troca ou suspensão de remédio. Ele só lembra o que o médico receitou.',
  },
  {
    pergunta: 'O que acontece quando a dose não é confirmada?',
    resposta:
      'A dose fica como "sem registro" e o cuidador é avisado. Só aparece "não tomou" quando o paciente ou o cuidador informa isso.',
  },
  {
    pergunta: 'O médico vê alguma coisa?',
    resposta: 'Sim. O histórico das doses vira um relatório para levar na consulta.',
  },
  {
    pergunta: 'O que significa "Entre no clima da consulta"?',
    resposta:
      'Dias muito quentes ou muito frios pedem mais cuidado com a saúde. O aplicativo avisa o paciente quando o clima da cidade dele pede atenção.',
  },
]
