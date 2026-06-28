import type { ZodSchema } from "zod";
import z from "zod";

export function jsonRequiredContent<T extends ZodSchema>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
    required: true,
  };
}
