import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre no puede exceder 50 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(200, 'La descripción no puede exceder 200 caracteres'),
  characterIds: z.array(z.number()).min(1, 'Debes seleccionar al menos un personaje').max(5, 'Un equipo no puede tener más de 5 personajes'),
});
