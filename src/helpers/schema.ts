import z from "zod";

export const IdParams = z.object({ id: z.string().uuid() });

export const NotFoundSchema = z.object({ status: z.string(), message: z.string() });

export const BadRequestSchema = z.object({ status: z.string(), message: z.string() });

export const rootRequestSchema = z.object({ status: z.string(), message: z.string() });
