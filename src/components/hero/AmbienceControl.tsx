import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * A muted-by-default ocean ambience. Generated with the Web Audio API (filtered
 * brown noise + slow LFO swell) so there is no external audio asset to load.
 */
export function AmbienceControl() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const build = useCallback(() => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      output[i] = last * 3.5
    }
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 520

    // Slow swell using an LFO on the gain.
    const gain = ctx.createGain()
    gain.gain.value = 0

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.12
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.05
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()
    lfo.start()

    ctxRef.current = ctx
    gainRef.current = gain
  }, [])

  const toggle = useCallback(async () => {
    if (!ctxRef.current) build()
    const ctx = ctxRef.current!
    const gain = gainRef.current!
    if (ctx.state === 'suspended') await ctx.resume()
    const next = !on
    gain.gain.setTargetAtTime(next ? 0.12 : 0, ctx.currentTime, 0.6)
    setOn(next)
  }, [on, build])

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ocean ambience' : 'Play ocean ambience'}
      className="flex items-center gap-2 rounded-full border border-ice-blue/20 bg-ocean-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-label text-off-white/70 backdrop-blur transition-colors hover:border-ice-blue/50 hover:text-off-white"
    >
      {on ? (
        <Volume2 className="h-3.5 w-3.5 text-ice-blue" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
      {on ? 'Ambience On' : 'Ambience'}
    </button>
  )
}
