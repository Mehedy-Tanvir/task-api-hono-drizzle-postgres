import * as z from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

// eslint-disable-next-line node/no-process-env
const env = EnvSchema.parse(process.env);

export default env;
