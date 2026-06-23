import * as z from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

const env = EnvSchema.parse((globalThis as any).process?.env ?? {});

export default env;
