import type { Medicamento, NovoMedicamento } from '../types'
import { requisitar } from './api'

export function listarMedicamentos() {
  return requisitar<Medicamento[]>('/medicamentos')
}

export function cadastrarMedicamento(medicamento: NovoMedicamento) {
  return requisitar<Medicamento>('/medicamentos', 'POST', medicamento)
}
