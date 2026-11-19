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
