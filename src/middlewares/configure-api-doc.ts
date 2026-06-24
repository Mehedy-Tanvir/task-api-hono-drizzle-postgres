import type { AppOpenAPI } from "../types";

export function configureApiDoc(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Task API",
    },
  });
};
