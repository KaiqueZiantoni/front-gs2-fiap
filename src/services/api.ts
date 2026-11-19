import type { ErroApi } from '../types'

// Endereco da API Java publicada no Render.
export const API_URL = 'https://tomei-doutor-api.onrender.com'

// Faz a chamada com fetch e devolve o JSON da resposta.
// Quando a API responde com erro, lanca um Error com a mensagem que ela mandou.
export async function requisitar<T>(caminho: string, metodo: string = 'GET', corpo?: unknown): Promise<T> {
  let resposta: Response

  try {
    resposta = await fetch(API_URL + caminho, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
    })
  } catch {
    throw new Error('Não foi possível falar com o servidor. Confira a internet e tente de novo.')
  }

  // 204: deu certo e nao tem corpo (remocao).
  if (resposta.status === 204) {
    return undefined as T
  }

  const dados = await resposta.json()

  if (!resposta.ok) {
    const erro = dados as ErroApi
    let mensagem = erro.mensagem
    for (const campo of erro.campos) {
      mensagem = mensagem + ' ' + campo.mensagem
    }
    throw new Error(mensagem)
  }

  return dados as T
}
