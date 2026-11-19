import { useEffect, useRef, useState } from 'react'

interface LeitorCameraProps {
  aoLer: (codigo: string) => void
}

// Leitor de codigo de barras do proprio navegador. Existe no Chrome do Android;
// no computador e no iPhone nao existe. O TypeScript nao conhece esse tipo, entao ele e descrito aqui.
interface Leitor {
  detect: (video: HTMLVideoElement) => Promise<{ rawValue: string }[]>
}
type CriadorDeLeitor = new (opcoes: { formats: string[] }) => Leitor

// Diz se este navegador consegue ler codigo de barras pela camera.
export function navegadorLeCodigo() {
  return 'BarcodeDetector' in window
}

function LeitorCamera({ aoLer }: LeitorCameraProps) {
  const video = useRef<HTMLVideoElement>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let camera: MediaStream | null = null
    let relogio = 0

    async function ligar() {
      try {
        camera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (video.current === null) {
          return
        }
        video.current.srcObject = camera
        await video.current.play()

        const Criador = (window as unknown as { BarcodeDetector: CriadorDeLeitor }).BarcodeDetector
        const leitor = new Criador({ formats: ['ean_13'] })

        // Olha a imagem da camera duas vezes por segundo, ate achar um codigo.
        relogio = window.setInterval(async () => {
          if (video.current === null) {
            return
          }
          const codigos = await leitor.detect(video.current)
          if (codigos.length > 0) {
            aoLer(codigos[0].rawValue)
          }
        }, 500)
      } catch {
        setErro('Não consegui abrir a câmera. Digite o código.')
      }
    }

    ligar()

    // Ao sair da tela, desliga a camera.
    return () => {
      window.clearInterval(relogio)
      if (camera !== null) {
        for (const faixa of camera.getTracks()) {
          faixa.stop()
        }
      }
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
