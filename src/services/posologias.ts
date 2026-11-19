import type { NovaPosologia, Posologia } from '../types'
import { requisitar } from './api'

export function listarPosologias(pacienteId: number) {
  return requisitar<Posologia[]>('/pacientes/' + pacienteId + '/posologias')
}

export function cadastrarPosologia(pacienteId: number, posologia: NovaPosologia) {
  return requisitar<Posologia>('/pacientes/' + pacienteId + '/posologias', 'POST', posologia)
}
