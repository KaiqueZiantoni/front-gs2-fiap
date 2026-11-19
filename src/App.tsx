import { Route, Routes } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'
import Contato from './pages/Contato'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Integrantes from './pages/Integrantes'
import Medicamentos from './pages/Medicamentos'
import ModoPaciente from './pages/ModoPaciente'
import NaoEncontrada from './pages/NaoEncontrada'
import PacienteDetalhe from './pages/PacienteDetalhe'
import Pacientes from './pages/Pacientes'
import Sobre from './pages/Sobre'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <Cabecalho />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/:id" element={<PacienteDetalhe />} />
          <Route path="/pacientes/:id/modo-paciente" element={<ModoPaciente />} />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Rodape />
    </div>
  )
}

export default App
