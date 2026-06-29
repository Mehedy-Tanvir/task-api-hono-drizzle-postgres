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
  console.log("[ENV] Environment variables loaded successfully");
  console.log("[ENV] NODE_ENV:", env.NODE_ENV);
  console.log("[ENV] PORT:", env.PORT);
  console.log("[ENV] DATABASE_URL exists:", env.DATABASE_URL ? "YES" : "NO");
} catch (e: any) {
  console.error("[ENV] FAILED to parse environment variables:", e.errors || e.message);
  throw e;
}

export default env;
