import { useEffect, useState } from 'react'
import AppPaciente from '../components/AppPaciente'
import Botao from '../components/Botao'
import Carregando from '../components/Carregando'
import Mensagem from '../components/Mensagem'
import Titulo from '../components/Titulo'
import { listarPacientes } from '../services/pacientes'
import codigoLosartana from '../assets/codigos/losartana.png'
import codigoMetformina from '../assets/codigos/metformina.png'
import codigoSinvastatina from '../assets/codigos/sinvastatina.png'
import type { Paciente } from '../types'

// Codigos de barras de tres remedios do catalogo, para testar a camera.
const codigosDeTeste = [
  { nome: 'Losartana 50 mg', imagem: codigoLosartana },
  { nome: 'Metformina 850 mg', imagem: codigoMetformina },
  { nome: 'Sinvastatina 20 mg', imagem: codigoSinvastatina },
]

// Protótipo funcional: as telas do aplicativo, usando os dados reais da API.
function Prototipo() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [escolhido, setEscolhido] = useState<Paciente | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregar() {
    try {
      setPacientes(await listarPacientes())
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div>
      <Titulo
        texto="Protótipo"
        subtitulo="As telas do aplicativo, do jeito que o paciente e o cuidador usam. Os dados vêm da API do grupo."
      />

      {carregando && <Carregando />}
      {erro && <Mensagem tipo="erro" texto={erro} />}

      {!carregando && !erro && escolhido === null && (
        <section className="mx-auto max-w-md">
          <h2 className="mb-3 text-2xl font-bold">Quem vai usar o aplicativo?</h2>
          {pacientes.length === 0 && (
            <Mensagem tipo="aviso" texto="Nenhum paciente cadastrado. Cadastre um na página Pacientes." />
          )}
          <ul className="space-y-3">
            {pacientes.map((paciente) => (
              <li key={paciente.id}>
                <button
                  type="button"
                  onClick={() => setEscolhido(paciente)}
                  className="flex min-h-16 w-full items-center rounded-2xl border-2 border-slate-300 bg-white px-5 text-left text-xl font-bold hover:border-green-700 hover:bg-green-50"
                >
                  {paciente.nome}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {escolhido !== null && (
        <div className="space-y-4">
          <div className="mx-auto max-w-md">
            <Botao cor="branco" aoClicar={() => setEscolhido(null)}>
              ← Trocar de pessoa
            </Botao>
          </div>
          <AppPaciente paciente={escolhido} />

          <section className="mx-auto max-w-md rounded-2xl border-2 border-slate-300 bg-white p-5">
            <h2 className="text-xl font-bold">Códigos de barras para testar a câmera</h2>
            <p className="mt-1 text-slate-600">
              Abra o protótipo em outro aparelho e aponte a câmera para um destes códigos.
            </p>
            <ul className="mt-3 space-y-4">
              {codigosDeTeste.map((codigo) => (
                <li key={codigo.nome} className="text-center">
                  <img src={codigo.imagem} alt={'Código de barras de ' + codigo.nome} className="mx-auto w-full max-w-xs" />
                  <p className="font-bold">{codigo.nome}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  )
}

export default Prototipo
