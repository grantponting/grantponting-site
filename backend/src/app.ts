import { Hono } from "hono";
import userRoutes from "./routes/userRoutes";
import openapiApp from "./routes/openapiRoutes";

export interface Env {
	DB: D1Database;
	FRONTEND_URL: string;
	BASE_URL: string;
	JWT_SECRET: string;
}

const app = new Hono();

// Global middleware (e.g., CORS) can be applied here
app.use("*", async (c, next) => {
	const { FRONTEND_URL } = c.env as { FRONTEND_URL: string };
	c.header("Access-Control-Allow-Origin", FRONTEND_URL);
	c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (c.req.method === "OPTIONS") {
		return c.text("OK", 200);
	}
	return next();
});

// Register routes
app.route("", userRoutes);


// Passing through app object so that openapi can see all routes
// Due to this, this route needs to be set last to properly generate the schemas
app.route("", openapiApp(app));

// Health Check
app.get("/", (c) => c.text("Hono with Prisma on Cloudflare D1"));

// Export Cloudflare Worker fetch handler
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return app.fetch(request, env, ctx);
	},
};
