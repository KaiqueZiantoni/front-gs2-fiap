// A API manda as datas no formato AAAA-MM-DD. Aqui elas viram DD/MM/AAAA para mostrar na tela.

export function formatarData(texto: string) {
  const [ano, mes, dia] = texto.split('-')
  return dia + '/' + mes + '/' + ano
}

// 2026-11-19T08:00:00 -> 19/11/2026 08:00
export function formatarDataHora(texto: string) {
  const [data, hora] = texto.split('T')
  return formatarData(data) + ' ' + hora.substring(0, 5)
}

// Horario de cada periodo do dia.
const horasPeriodo = { MANHA: '08', ALMOCO: '12', TARDE: '16', NOITE: '20' }

// Monta a data e hora de hoje no periodo escolhido. Ex.: 2026-11-19T08:00:00
export function doseDeHoje(periodo: 'MANHA' | 'ALMOCO' | 'TARDE' | 'NOITE') {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return ano + '-' + mes + '-' + dia + 'T' + horasPeriodo[periodo] + ':00:00'
}
