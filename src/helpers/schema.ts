import z from "zod";

export const IdParams = z.object({ id: z.string().uuid() });

export const NotFoundSchema = z.object({ status: z.string(), message: z.string() });
