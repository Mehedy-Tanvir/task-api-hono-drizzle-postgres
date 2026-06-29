import * as z from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

let env: z.infer<typeof EnvSchema>;
try {
  env = EnvSchema.parse((globalThis as any).process?.env ?? {});
} catch (e: any) {
  console.error("[ENV] FAILED to parse environment variables:", e.errors || e.message);
  throw e;
}

export default env;
