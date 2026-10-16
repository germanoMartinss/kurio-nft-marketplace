import type * as z from 'zod/mini'

/** Valida a resposta contra o contrato; um desvio vira erro aqui, não `undefined` na interface. */
export function parseResponse<T extends z.ZodMiniType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data)
}
