// Tipos dos dados que a API Java recebe e devolve.

export interface Paciente {
  id: number
  nome: string
  dataNascimento: string // AAAA-MM-DD
  cep: string | null
  telefone: string | null
}

export interface NovoPaciente {
  nome: string
  dataNascimento: string
  cep?: string
  telefone?: string
}

export type FormaMedicamento = 'COMPRIMIDO' | 'GOTA' | 'ML' | 'UNIDADE'

export interface Medicamento {
  id: number
  nome: string
  principioAtivo: string
  classe: string | null
  ean: string | null
  forma: FormaMedicamento
}

export interface NovoMedicamento {
  nome: string
  principioAtivo: string
  forma: FormaMedicamento
}

export type Periodo = 'MANHA' | 'ALMOCO' | 'TARDE' | 'NOITE'

export interface Posologia {
  id: number
  pacienteId: number
  medicamentoId: number
  periodo: Periodo
  quantidadeDose: number
  tipoUso: 'CONTINUO' | 'TEMPORARIO'
  origem: 'RECEITADO' | 'POR_CONTA'
  dataInicio: string
  dataFim: string | null
  ativo: boolean
}

export interface NovaPosologia {
  medicamentoId: number
  periodo: Periodo
  quantidadeDose: number
  tipoUso: 'CONTINUO' | 'TEMPORARIO'
  origem: 'RECEITADO' | 'POR_CONTA'
  dataInicio: string
}

export type StatusDose = 'SEM_REGISTRO' | 'REGISTRADO' | 'NAO_TOMOU'

export interface RegistroDose {
  id: number
  posologiaId: number
  dataPrevista: string // AAAA-MM-DDTHH:MM:SS
  dataConfirmacao: string | null
  status: StatusDose
  autor: 'PACIENTE' | 'CUIDADOR' | null
}

// Formato de erro padrao da API.
export interface ErroApi {
  status: number
  erro: string
  mensagem: string
  caminho: string
  campos: { campo: string; mensagem: string }[]
}

export interface Integrante {
  nome: string
  rm: string
  turma: string
  github?: string
}
