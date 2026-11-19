import type { RegistroDose } from '../types'
import { requisitar } from './api'

export function listarRegistros(posologiaId: number) {
  return requisitar<RegistroDose[]>('/posologias/' + posologiaId + '/registros')
}

export function cadastrarRegistro(posologiaId: number, dataPrevista: string) {
  return requisitar<RegistroDose>('/posologias/' + posologiaId + '/registros', 'POST', { dataPrevista })
}

// Botao "Tomei": confirma a dose.
export function confirmarDose(registroId: number, autor: 'PACIENTE' | 'CUIDADOR') {
  return requisitar<RegistroDose>('/registros/' + registroId + '/confirmar', 'PATCH', { autor })
}
