import { openAPISpecs } from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

export default function openapiApp(honoApp: Hono) {
    const openapiApp = honoApp;

    openapiApp.get("/openapi", async (c) => {
        const { BASE_URL } = c.env as { BASE_URL: string };
        const specMiddleware = openAPISpecs(openapiApp, {
            documentation: {
                info: {
                    title: "Hono API",
                    version: "1.0.0",
                    description: "User API with OpenAPI documentation",
                },
                servers: [{ url: BASE_URL, description: "Local Server" }],
                components: {
                    schemas: {
                        User: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    format: "uuid",
                                    description: "Unique identifier for the user, generated as a UUID.",
                                },
                                username: { type: "string", description: "The user's username." },
                                password: { type: "string", description: "The user's password. Omit in responses." },
                                email: { type: "string", format: "email", description: "The user's email address." },
                            },
                            required: ["id", "username", "password", "email"],
                        },
                    },
                },
            },
        });
        const spec = await specMiddleware(c, async () => Promise.resolve());
        return spec;
    });

    // Serve Swagger UI at /swagger
    openapiApp.get("/swagger", swaggerUI({ url: "/openapi" }));

    return openapiApp;
}
