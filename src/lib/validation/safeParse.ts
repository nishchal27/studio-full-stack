import type { z } from "zod";

export type SafeValidationResult<TValue> =
  | {
      ok: true;
      data: TValue;
    }
  | {
      ok: false;
      error: z.ZodError;
    };

export function safeParse<TSchema extends z.ZodType>(
  schema: TSchema,
  input: unknown,
): SafeValidationResult<z.infer<TSchema>> {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      ok: true,
      data: result.data,
    };
  }

  return {
    ok: false,
    error: result.error,
  };
}
