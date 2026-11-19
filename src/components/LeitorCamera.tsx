import { BrowserMultiFormatReader } from '@zxing/browser'
import { useEffect, useRef, useState } from 'react'

interface LeitorCameraProps {
  aoLer: (codigo: string) => void
}

// Abre a camera e procura um codigo de barras na imagem.
// A leitura e feita pela biblioteca ZXing, que funciona no celular e no computador.
function LeitorCamera({ aoLer }: LeitorCameraProps) {
  const video = useRef<HTMLVideoElement>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const leitor = new BrowserMultiFormatReader()
    let parar = () => {}
    let saiu = false

    async function ligar() {
      if (video.current === null) {
        return
      }
      try {
        // facingMode environment = camera de tras do celular.
        const controles = await leitor.decodeFromConstraints(
          { video: { facingMode: 'environment' } },
          video.current,
          (resultado) => {
            if (resultado) {
              aoLer(resultado.getText())
            }
          },
        )
        parar = () => controles.stop()
        if (saiu) {
          parar()
        }
      } catch {
        setErro('Não consegui abrir a câmera. Digite os números do código.')
      }
    }

    ligar()

    // Ao sair da tela, desliga a camera.
    return () => {
      saiu = true
      parar()
    }
  }, [])

  return (
    <div>
      <video ref={video} muted playsInline className="h-64 w-full rounded-2xl bg-slate-800 object-cover" />
      {erro && <p className="mt-2 text-lg font-semibold text-red-700">{erro}</p>}
    </div>
  )
}

export default LeitorCamera
