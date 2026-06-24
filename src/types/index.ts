import type { OpenAPIHono } from "@hono/zod-openapi";

interface AppBindings {}

export type AppOpenAPI = OpenAPIHono<AppBindings>;
