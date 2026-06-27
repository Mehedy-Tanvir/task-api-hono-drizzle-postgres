import type { AppOpenAPI } from "../types";
import { apiReference } from "@scalar/hono-api-reference";

export function configureApiDoc(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Task API",
    },
  });

  app.get("/reference", apiReference({
    theme: "kepler",
    layout: "classic",
    pageTitle: "Tasks API DOCS",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },

    spec: {
      url: "/doc",
    },
  }));
};
