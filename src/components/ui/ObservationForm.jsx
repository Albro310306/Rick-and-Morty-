import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled, { keyframes, css } from 'styled-components';

/**
 * Esquema de validación Zod para el formulario de observación.
 * Define las reglas de cada campo antes de enviarlo.
 */
const observationSchema = z.object({
  investigator: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede superar 50 caracteres'),
  rank: z
    .string()
    .min(1, 'Debes seleccionar un rango'),
  observation: z
    .string()
    .min(10, 'La observación debe tener al menos 10 caracteres')
    .max(300, 'La observación no puede superar 300 caracteres'),
});

const RANKS = [
  { value: '', label: 'Selecciona un rango...' },
  { value: 'junior', label: '🔭 Científico Júnior' },
  { value: 'senior', label: '🔬 Científico Sénior' },
  { value: 'lead', label: '🧪 Investigador Líder' },
  { value: 'rick', label: '⚡ Nivel Rick' },
];

/**
 * Formulario de "Añadir Observación" con validación Zod y React Hook Form.
 * Simula el envío de datos a una API (JSONPlaceholder) y muestra feedback visual.
 *
 * @param {string} props.characterName - Nombre del personaje para personalizar el formulario.
 * @param {number} props.characterId - ID del personaje, enviado en el POST.
 */
const ObservationForm = ({ characterName, characterId }) => {
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(observationSchema),
  });

  /**
   * Maneja el envío del formulario.
   * Hace un POST real a JSONPlaceholder con los datos del formulario.
   *
   * @param {object} data - Los datos validados del formulario.
   */
  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Observación: ${characterName} - Investigador ${data.investigator}`,
          body: data.observation,
          userId: characterId,
          rank: data.rank,
        }),
      });

      if (!response.ok) throw new Error('Error en el servidor');

      setSubmitStatus('success');
      reset();
      // Volver al estado neutro después de 4 segundos
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <FormWrapper>
      <div className="form-header">
        <span className="form-icon">📡</span>
        <div>
          <h3 className="form-title">Registrar Observación</h3>
          <p className="form-subtitle">Añade una nota sobre <em>{characterName}</em> a la base de datos interdimensional</p>
        </div>
      </div>

      {submitStatus === 'success' && (
        <SuccessBanner>
          <span>✅</span>
          <div>
            <strong>Observación registrada con éxito</strong>
            <p>Tu reporte ha sido transmitido a la base de datos.</p>
          </div>
        </SuccessBanner>
      )}

      {submitStatus === 'error' && (
        <ErrorBanner>
          <span>⚠️</span>
          <div>
            <strong>Error de transmisión</strong>
            <p>No se pudo conectar con el servidor. Intenta de nuevo.</p>
          </div>
        </ErrorBanner>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Campo: Nombre del Investigador */}
        <div className="field-group">
          <label className="label" htmlFor="investigator">
            Nombre del Investigador
          </label>
          <input
            id="investigator"
            type="text"
            className={`cyber-input ${errors.investigator ? 'input-error' : ''}`}
            placeholder="Ej. Rick Sánchez"
            {...register('investigator')}
          />
          {errors.investigator && (
            <span className="error-msg">{errors.investigator.message}</span>
          )}
        </div>

        {/* Campo: Rango */}
        <div className="field-group">
          <label className="label" htmlFor="rank">
            Rango Científico
          </label>
          <select
            id="rank"
            className={`cyber-select ${errors.rank ? 'input-error' : ''}`}
            {...register('rank')}
          >
            {RANKS.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.rank && (
            <span className="error-msg">{errors.rank.message}</span>
          )}
        </div>

        {/* Campo: Observación */}
        <div className="field-group">
          <label className="label" htmlFor="observation">
            Observación
          </label>
          <textarea
            id="observation"
            rows={4}
            className={`cyber-textarea ${errors.observation ? 'input-error' : ''}`}
            placeholder="Describe el comportamiento, localización o anomalías observadas..."
            {...register('observation')}
          />
          {errors.observation && (
            <span className="error-msg">{errors.observation.message}</span>
          )}
        </div>

        <SubmitButton type="submit" disabled={submitStatus === 'loading'}>
          {submitStatus === 'loading' ? (
            <><span className="spinner" /> Transmitiendo...</>
          ) : (
            <><span>📤</span> Enviar Observación</>
          )}
        </SubmitButton>
      </form>
    </FormWrapper>
  );
};

/* ── Animations ─── */
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(139,92,246,0.3); }
  50% { box-shadow: 0 0 24px rgba(139,92,246,0.7); }
`;

/* ── Styled Components ─── */
const FormWrapper = styled.div`
  background: rgba(10, 5, 30, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(20px);
  animation: ${glow} 4s ease-in-out infinite;

  .form-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 28px;
  }

  .form-icon {
    font-size: 28px;
    margin-top: 2px;
  }

  .form-title {
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, #c084fc, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 4px;
  }

  .form-subtitle {
    font-size: 13px;
    color: rgba(167, 139, 250, 0.6);
    margin: 0;
    em { color: #fb923c; font-style: normal; font-weight: 600; }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(167, 139, 250, 0.8);
  }

  .cyber-input,
  .cyber-select,
  .cyber-textarea {
    background: rgba(5, 2, 20, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    padding: 12px 16px;
    color: white;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;
    width: 100%;
    box-sizing: border-box;

    &::placeholder { color: rgba(167, 139, 250, 0.3); }

    &:focus {
      border-color: rgba(139, 92, 246, 0.7);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
    }

    option {
      background: #0a0520;
      color: white;
    }
  }

  .cyber-textarea { resize: vertical; min-height: 100px; }

  .input-error {
    border-color: rgba(248, 113, 113, 0.7) !important;
    animation: ${shake} 0.35s ease-in-out;
  }

  .error-msg {
    font-size: 12px;
    color: #f87171;
    animation: ${fadeIn} 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before { content: '⚠ '; }
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
  }
`;

const SuccessBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 24px;
  background: rgba(74, 222, 128, 0.08);
  border: 1px solid rgba(74, 222, 128, 0.3);
  animation: ${fadeIn} 0.3s ease;

  span { font-size: 20px; }
  strong { color: #4ade80; display: block; margin-bottom: 2px; font-size: 14px; }
  p { color: rgba(74,222,128,0.7); font-size: 13px; margin: 0; }
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 24px;
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.3);
  animation: ${fadeIn} 0.3s ease;

  span { font-size: 20px; }
  strong { color: #f87171; display: block; margin-bottom: 2px; font-size: 14px; }
  p { color: rgba(248,113,113,0.7); font-size: 13px; margin: 0; }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #7C3AED, #EA580C);
  color: white;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
  margin-top: 4px;

  &:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.55);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

export default ObservationForm;
