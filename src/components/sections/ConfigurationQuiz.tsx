import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { MagneticButton } from '../ui/MagneticButton'
import { QUIZ_QUESTIONS, recommendFromQuiz } from '../../data/quiz'
import { WetsuitSilhouette } from '../shared/WetsuitSilhouette'
import { TEMP_MAX, TEMP_MIN } from '../../data/configEngine'

export function ConfigurationQuiz() {
  const [step, setStep] = useState(0)
  const [weight, setWeight] = useState(0)
  const [temp, setTemp] = useState(62)
  const [done, setDone] = useState(false)

  const question = QUIZ_QUESTIONS[step]
  const total = QUIZ_QUESTIONS.length

  const answer = (w: number) => {
    setWeight((prev) => prev + w)
    next()
  }

  const next = () => {
    if (step < total - 1) setStep((s) => s + 1)
    else setDone(true)
  }

  const restart = () => {
    setStep(0)
    setWeight(0)
    setTemp(62)
    setDone(false)
  }

  const rec = recommendFromQuiz({ weight, temperature: temp })

  return (
    <section id="quiz" className="relative bg-ocean-black py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Find Your Configuration"
          title="Answer four questions"
          subtitle="We'll assemble the recommended setup for your water, activity and session length."
          align="center"
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-ice-blue/10 bg-white/[0.02] p-6 sm:p-10">
          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  className="h-full bg-ice-blue"
                  initial={false}
                  animate={{
                    width: done || i < step ? '100%' : i === step ? '50%' : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 font-mono text-xs text-ice-blue/70">
                  Question {step + 1} / {total}
                </div>
                <h3 className="font-display text-2xl text-off-white sm:text-3xl">
                  {question.prompt}
                </h3>

                {question.kind === 'temperature' ? (
                  <div className="mt-10">
                    <div className="text-center">
                      <span className="font-display text-6xl font-semibold text-ice-blue">
                        {temp}°F
                      </span>
                    </div>
                    <input
                      type="range"
                      min={TEMP_MIN}
                      max={TEMP_MAX}
                      value={temp}
                      onChange={(e) => setTemp(Number(e.target.value))}
                      aria-label="Expected water temperature"
                      className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-ice-blue via-seafoam to-gold"
                    />
                    <div className="mt-2 flex justify-between font-mono text-[10px] text-off-white/40">
                      <span>{TEMP_MIN}°F cold</span>
                      <span>{TEMP_MAX}°F warm</span>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <MagneticButton onClick={next} variant="gold">
                        Continue <ArrowRight className="h-3.5 w-3.5" />
                      </MagneticButton>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {question.options!.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => answer(opt.weight)}
                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 text-left transition-all hover:border-ice-blue/40 hover:bg-ice-blue/5"
                      >
                        <div>
                          <div className="font-display text-lg text-off-white">{opt.label}</div>
                          {opt.sublabel && (
                            <div className="mt-0.5 font-mono text-[10px] text-off-white/40">
                              {opt.sublabel}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-ice-blue/40 transition-transform group-hover:translate-x-1 group-hover:text-ice-blue" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <WetsuitSilhouette attached={rec.attached} className="h-64 w-auto" />
                  </motion.div>
                </div>
                <div>
                  <span className="tech-label text-gold">Your Recommended Setup</span>
                  <ul className="mt-4 space-y-2">
                    {rec.lines.map((line, i) => (
                      <motion.li
                        key={line}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 font-display text-lg text-off-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-ice-blue" />
                        {line}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl border border-ice-blue/20 bg-ice-blue/5 px-4 py-3">
                    <span className="tech-label">Recommended for</span>
                    <div className="mt-1 font-mono text-sm text-ice-blue">{rec.waterRange}</div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <MagneticButton href="#builder" variant="gold">
                      Build This Setup
                    </MagneticButton>
                    <MagneticButton href="#builder" variant="outline">
                      Adjust Configuration
                    </MagneticButton>
                    <button
                      onClick={restart}
                      className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-label text-off-white/70 transition-colors hover:bg-white/5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
