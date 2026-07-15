'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '@/i18n/client'
import { interpolate } from '@/i18n/interpolate'

type ValoracionForm = {
  propertyType: string
  location: string
  sqMeters: string
  bedrooms: string
  bathrooms: string
  condition: string
  saleTimeline: string
  notes: string
  name: string
  phone: string
  email: string
}

const initialForm: ValoracionForm = {
  propertyType: '',
  location: '',
  sqMeters: '',
  bedrooms: '',
  bathrooms: '',
  condition: '',
  saleTimeline: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
}

type Props = {
  triggerClassName?: string
  triggerLabel?: string
}

export function ValoracionGratuitaModal({ triggerClassName = '', triggerLabel }: Props) {
  const { dict, locale } = useI18n()
  const v = dict.valoracion
  const label = triggerLabel ?? v.triggerDefault

  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form, setForm] = useState<ValoracionForm>(initialForm)
  const [error, setError] = useState('')
  const totalSteps = 3
  const progress = Math.round((step / totalSteps) * 100)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
    setSubmitted(false)
    setStep(1)
    setError('')
    setForm(initialForm)
  }

  const validateCurrentStep = () => {
    setError('')
    if (step === 1) {
      const required = [form.propertyType, form.location, form.sqMeters]
      if (required.some((value) => !value.trim())) {
        setError(v.errorRequired)
        return false
      }
    }

    if (step === 2 && !form.saleTimeline.trim()) {
      setError(v.errorTimeline)
      return false
    }

    return true
  }

  const goToNextStep = () => {
    if (!validateCurrentStep()) return
    setError('')
    setStep((prev) => (prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const required = [form.name, form.phone, form.email]
    if (required.some((value) => !value.trim())) {
      setError(v.errorContact)
      return
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    if (!emailOk) {
      setError(v.errorEmail)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          source: 'web_valoracion',
          intent: 'vender',
          priority: form.saleTimeline === v.saleTimelines[0] ? 'alta' : 'media',
          saleTimeline: form.saleTimeline,
          propertyRef: `${form.propertyType} - ${form.location}`,
          propertyType: form.propertyType,
          location: form.location,
          sqMeters: form.sqMeters,
          bedrooms: form.bedrooms || null,
          bathrooms: form.bathrooms || null,
          condition: form.condition || null,
          observations: form.notes || null,
          locale,
          notes: [
            `Tipo: ${form.propertyType}`,
            `Zona/Direccion: ${form.location}`,
            `Metros cuadrados: ${form.sqMeters}`,
            `Habitaciones: ${form.bedrooms || dict.common.notProvided}`,
            `Banos: ${form.bathrooms || dict.common.notProvided}`,
            `Estado: ${form.condition || dict.common.notProvided}`,
            `Observaciones: ${form.notes || dict.common.notProvided}`,
          ].join('\n'),
        }),
      })
      if (!res.ok) throw new Error(v.errorSubmit)
      setSubmitted(true)
    } catch {
      setError(v.errorSubmit)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={triggerClassName || 'btn-outline px-10 py-4 text-[calc(0.875rem+4pt)] tracking-wide'}
      >
        {label}
      </button>

      {mounted && isOpen && createPortal(
        <div className="lead-modal-overlay" onClick={closeModal}>
          <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={closeModal} className="lead-modal-close" aria-label={v.closeModal}>
              ×
            </button>

            {submitted ? (
              <div className="lead-modal-thanks">
                <span className="lead-modal-thanks-icon" aria-hidden="true">✓</span>
                <h3>{v.thanksTitle}</h3>
                <p>{v.thanksMessage}</p>
                <button type="button" className="btn-primary lead-modal-submit" onClick={closeModal}>
                  {v.close}
                </button>
              </div>
            ) : (
              <>
                <div className="lead-modal-hero">
                  <h3 className="lead-modal-title">{v.title}</h3>
                  <p className="lead-modal-subtitle">{v.subtitle}</p>
                </div>

                <form onSubmit={onSubmit} className="lead-modal-form">
                  <div className="lead-modal-progress-wrap" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                    <div className="lead-modal-progress-meta">
                      <span>{interpolate(v.stepOf, { step, total: totalSteps })}</span>
                      <span>{interpolate(v.percentComplete, { percent: progress })}</span>
                    </div>
                    <div className="lead-modal-progress-track">
                      <div className="lead-modal-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="lead-modal-section">
                      <h4>{v.step1Title}</h4>
                      <div className="lead-modal-grid">
                        <label>
                          {v.propertyType}
                          <select
                            value={form.propertyType}
                            onChange={(e) => setForm((prev) => ({ ...prev, propertyType: e.target.value }))}
                          >
                            <option value="">{dict.common.selectOption}</option>
                            {v.propertyTypes.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label>
                          {v.location}
                          <input
                            type="text"
                            value={form.location}
                            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        </label>

                        <label>
                          {v.sqMeters}
                          <input
                            type="number"
                            value={form.sqMeters}
                            onChange={(e) => setForm((prev) => ({ ...prev, sqMeters: e.target.value }))}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="lead-modal-section">
                      <h4>{v.step2Title}</h4>
                      <div className="lead-modal-grid">
                        <label>
                          {v.bedrooms}
                          <input
                            type="number"
                            value={form.bedrooms}
                            onChange={(e) => setForm((prev) => ({ ...prev, bedrooms: e.target.value }))}
                          />
                        </label>

                        <label>
                          {v.bathrooms}
                          <input
                            type="number"
                            value={form.bathrooms}
                            onChange={(e) => setForm((prev) => ({ ...prev, bathrooms: e.target.value }))}
                          />
                        </label>

                        <label>
                          {v.condition}
                          <select
                            value={form.condition}
                            onChange={(e) => setForm((prev) => ({ ...prev, condition: e.target.value }))}
                          >
                            <option value="">{dict.common.selectOption}</option>
                            {v.conditions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="lead-modal-full">
                          {v.saleTimeline}
                          <select
                            value={form.saleTimeline}
                            onChange={(e) => setForm((prev) => ({ ...prev, saleTimeline: e.target.value }))}
                          >
                            <option value="">{dict.common.selectOption}</option>
                            {v.saleTimelines.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="lead-modal-full">
                          {v.observations}
                          <textarea
                            rows={2}
                            placeholder={v.observationsPlaceholder}
                            value={form.notes}
                            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="lead-modal-section">
                      <h4>{v.step3Title}</h4>
                      <div className="lead-modal-grid">
                        <label>
                          {v.name}
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </label>

                        <label>
                          {v.phone}
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </label>

                        <label className="lead-modal-full">
                          {v.email}
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {error && <p className="lead-modal-error">{error}</p>}

                  <div className="lead-modal-actions">
                    {step > 1 && (
                      <button type="button" className="btn-outline lead-modal-secondary" onClick={() => setStep((prev) => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev))}>
                        {v.back}
                      </button>
                    )}

                    {step < 3 ? (
                      <button type="button" className="btn-primary lead-modal-submit" onClick={goToNextStep}>
                        {v.next}
                      </button>
                    ) : (
                      <button type="submit" disabled={submitting} className="btn-primary lead-modal-submit disabled:opacity-60">
                        {submitting ? dict.common.sending : v.submit}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
