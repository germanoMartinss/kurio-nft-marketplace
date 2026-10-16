/** Identificador aleatório não sequencial (tokens de sessão, chaves de idempotência). */
export function randomId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll('-', '')}`
}
