import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { openAPISpecs, describeRoute } from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { PrismaD1 } from "@prisma/adapter-d1";
import bcrypt from "bcryptjs";

export interface Env {
	DB: D1Database;
}

// Initialize the Hono app
const app = new Hono();

// Global CORS middleware
app.use('*', async (c, next) => {
	const { FRONTEND_URL } = c.env as { FRONTEND_URL: string };
	c.header('Access-Control-Allow-Origin', FRONTEND_URL); // Change '*' to your allowed origin in production
	c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (c.req.method === 'OPTIONS') {
		return c.text('OK', 200);
	}

	return next();
});

// Function to create a Prisma Client with Cloudflare D1 Adapter
const createPrismaClient = (env: Env) => {
	const adapter = new PrismaD1(env.DB);
	return new PrismaClient({ adapter });
};

// Get all users
app.get(
	"/users",
	describeRoute({
		summary: "Get all users",
		description: "Fetches a list of all users.",
		responses: {
			200: {
				description: "List of users",
				content: {
					"application/json": {
						schema: { type: "array", items: { $ref: "#/components/schemas/User" } },
					},
				},
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);
		const users = await prisma.user.findMany();
		return c.json(users);
	}
);

// Create a new user
app.post(
	"/user",
	describeRoute({
		summary: "Create a new user",
		description: "Creates a user and returns the created object.",
		requestBody: {
			description: "User object to create",
			required: true,
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							username: { type: "string" },
							password: { type: "string" },
							email: { type: "string", format: "email" },
						},
						required: ["username", "password", "email"],
					},
				},
			},
		},
		responses: {
			201: {
				description: "User created successfully",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/User" },
					},
				},
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);

		const { username, password, email } = await c.req.json();

		// Hash the password using bcrypt
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await prisma.user.create({
			data: { username, password: hashedPassword, email },
		});

		return c.json(newUser, 201);
	}
);

// Fetch a single user by ID
app.get(
	"/user/:id",
	describeRoute({
		summary: "Get a user by ID",
		description: "Fetches a user by their unique ID.",
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				schema: { type: "string" },
			},
		],
		responses: {
			200: {
				description: "User details",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/User" },
					},
				},
			},
			404: {
				description: "User not found",
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);

		const id = c.req.param("id");
		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return c.json({ error: "User not found" }, 404);
		}

		return c.json(user);
	}
);

// Update a user
app.put(
	"/user/:id",
	describeRoute({
		summary: "Update a user",
		description: "Updates user details based on the ID.",
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				schema: { type: "string" },
			},
		],
		requestBody: {
			description: "User object with new data",
			required: true,
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							username: { type: "string" },
							password: { type: "string" },
							email: { type: "string", format: "email" },
						},
					},
				},
			},
		},
		responses: {
			200: {
				description: "User updated successfully",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/User" },
					},
				},
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);

		const id = c.req.param("id");
		const { username, password, email } = await c.req.json();
		const updatedUser = await prisma.user.update({
			where: { id },
			data: { username, password, email },
		});

		return c.json(updatedUser);
	}
);

// Delete a user
app.delete(
	"/user/:id",
	describeRoute({
		summary: "Delete a user",
		description: "Deletes a user by their ID.",
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				schema: { type: "string" },
			},
		],
		responses: {
			200: {
				description: "User deleted successfully",
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);

		const id = c.req.param("id");
		await prisma.user.delete({
			where: { id },
		});

		return c.json({ message: "User deleted" });
	}
);

app.post(
	"/login",
	describeRoute({
		summary: "User login",
		description: "Authenticates a user and returns user data if successful.",
		requestBody: {
			description: "User login credentials",
			required: true,
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							email: { type: "string" },
							password: { type: "string" },
						},
						required: ["email", "password"],
					},
				},
			},
		},
		responses: {
			200: {
				description: "User logged in successfully",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/User" },
					},
				},
			},
			401: {
				description: "Invalid username or password",
			},
		},
	}),
	async (c) => {
		const env = c.env as Env;
		const prisma = createPrismaClient(env);

		const { email, password } = await c.req.json();

		// Find the user by email
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			return c.json({ error: "Invalid username or password" }, 401);
		}

		// Verify the password using bcrypt
		const isMatch = bcrypt.compareSync(password, user.password);

		if (!isMatch) {
			return c.json({ error: "Invalid username or password" }, 401);
		}

		return c.json({ message: "Login successful", user }, 200);
	}
);

// OpenAPI Documentation Endpoint
app.get("/openapi", async (c) => {
	const { BASE_URL } = c.env as { BASE_URL: string };
	const specMiddleWare = openAPISpecs(app, {
		documentation: {
			info: {
				title: "Hono API",
				version: "1.0.0",
				description: "User API with OpenAPI documentation",
			},
			servers: [{ url: BASE_URL, description: "Local Server" }],
		},
	});
	const spec = await specMiddleWare(c, async () => Promise.resolve());
	return spec;
});

// Serve Swagger UI
app.get("/swagger", swaggerUI({ url: "/openapi" }));

// Health Check Endpoint
app.get("/", (c) => c.text("Hono with Prisma on Cloudflare D1"));

// Cloudflare Worker Fetch Handler
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return app.fetch(request, env, ctx);
	},
};
