import type { NovoPaciente, Paciente } from '../types'
import { requisitar } from './api'

export function listarPacientes() {
  return requisitar<Paciente[]>('/pacientes')
}

export function buscarPaciente(id: number) {
  return requisitar<Paciente>('/pacientes/' + id)
}

export function cadastrarPaciente(paciente: NovoPaciente) {
  return requisitar<Paciente>('/pacientes', 'POST', paciente)
}

export function removerPaciente(id: number) {
  return requisitar<void>('/pacientes/' + id, 'DELETE')
}
