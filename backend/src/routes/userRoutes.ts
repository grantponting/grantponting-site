import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { authMiddleware } from "../middlewares/auth";
import * as UserController from "../controllers/userController";

const router = new Hono();

// User Routes
router.get(
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
    UserController.getAllUsers
);

router.post(
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
    UserController.createUser
);

// Other endpoints: getUserById, updateUser, deleteUser, loginUser, refreshTokenHandler...
router.get(
    "/user/:id",
    authMiddleware,
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
            404: { description: "User not found" },
        },
    }),
    UserController.getUserById
);

router.put(
    "/user/:id",
    authMiddleware,
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
    UserController.updateUser
);

router.delete(
    "/user/:id",
    authMiddleware,
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
            200: { description: "User deleted successfully" },
        },
    }),
    UserController.deleteUser
);

router.post(
    "/users/search",
    authMiddleware,
    describeRoute({
        summary: "Search users by criteria",
        description: "Fetches users whose email or username match the provided body.",
        requestBody: {
            description: "Search filters",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: { type: "string", format: "email" },
                            username: { type: "string" }
                        },
                        required: [], // allow either or both
                    },
                },
            },
        },
        responses: {
            200: {
                description: "List of matching users",
                content: {
                    "application/json": {
                        schema: { type: "array", items: { $ref: "#/components/schemas/User" } },
                    },
                },
            },
        },
    }),
    UserController.searchUser
);


router.get(
    "/profile",
    authMiddleware,  // Ensure the auth token is validated first
    describeRoute({
        summary: "Get logged-in user's profile",
        description: "Returns data for the currently authenticated user.",
        security: [{ bearerAuth: [] }],  // Require auth via bearer token
        responses: {
            200: {
                description: "User profile data",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/User" }
                    }
                }
            },
            401: {
                description: "Unauthorized"
            },
            404: {
                description: "User not found"
            }
        }
    }),
    UserController.getProfile
);

router.post(
    "/login",
    describeRoute({
        summary: "User login",
        description: "Authenticates a user and returns tokens if successful.",
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
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                                accessToken: { type: "string" },
                                refreshToken: { type: "string" },
                                user: { $ref: "#/components/schemas/User" },
                            },
                        },
                    },
                },
            },
            401: { description: "Invalid username or password" },
        },
    }),
    UserController.loginUser
);

router.post(
    "/refresh",
    describeRoute({
        summary: "Refresh access token",
        description: "Uses a valid refresh token to issue a new access token.",
        requestBody: {
            description: "Refresh token payload",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: { refreshToken: { type: "string" } },
                        required: ["refreshToken"],
                    },
                },
            },
        },
        responses: {
            200: {
                description: "New access token issued successfully.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: { accessToken: { type: "string" } },
                        },
                    },
                },
            },
            401: { description: "Invalid or expired refresh token." },
        },
    }),
    UserController.refreshTokenHandler
);

export default router;
