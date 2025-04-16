import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Context } from "hono";
import { createPrismaClient } from "../config/database";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import type { Env } from "../app";

// Controller functions to be used in routes
export const getAllUsers = async (c: Context) => {
    const env = c.env as Env;
    const prisma = createPrismaClient(env);
    const users = await prisma.user.findMany();
    return c.json(users);
};

export const createUser = async (c: Context) => {
    const env = c.env as Env;
    const prisma = createPrismaClient(env);
    const { username, password, email } = await c.req.json();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await prisma.user.create({
        data: { username, password: hashedPassword, email },
    });
    return c.json(newUser, 201);
};

export const getUserById = async (c: Context) => {
    const env = c.env as Env;
    const prisma = createPrismaClient(env);
    const id = c.req.param("id");
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
};

export const updateUser = async (c: Context) => {
    const env = c.env as Env;
    const prisma = createPrismaClient(env);
    const id = c.req.param("id");
    const { username, password, email } = await c.req.json();
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { username, password, email },
    });
    return c.json(updatedUser);
};

export const deleteUser = async (c: Context) => {
    const env = c.env as Env;
    const prisma = createPrismaClient(env);
    const id = c.req.param("id");
    await prisma.user.delete({ where: { id } });
    return c.json({ message: "User deleted" });
};

export const getProfile = async (c: Context) => {
    // Retrieve the decoded token from the context, which should contain the user id.
    const decoded = c.get("jwtPayload") as { id: string; email: string };

    if (!decoded || !decoded.id) {
        return c.json({ error: "User not authenticated" }, 401);
    }

    // Create a Prisma client instance using your env configuration.
    const env = c.env as Env;
    const prisma = createPrismaClient(env);

    // Retrieve complete user data from the database using the id from the token.
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }

    // Return the user's data.
    return c.json(user, 200);
}

export const loginUser = async (c: Context) => {
    const env = c.env as Env;
    const { JWT_SECRET } = c.env as { JWT_SECRET: string };
    const prisma = createPrismaClient(env);
    const { email, password } = await c.req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return c.json({ error: "Invalid username or password" }, 401);
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return c.json({ error: "Invalid username or password" }, 401);
    const accessToken = signAccessToken({ id: user.id, email: user.email }, JWT_SECRET);
    const refreshToken = signRefreshToken({ id: user.id, email: user.email }, JWT_SECRET);
    return c.json({ message: "Login successful", accessToken, refreshToken, user }, 200);
};

export const refreshTokenHandler = async (c: Context) => {
    const { JWT_SECRET } = c.env as { JWT_SECRET: string };
    const { refreshToken } = await c.req.json();
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: string; email: string };
        const newAccessToken = signAccessToken({ id: decoded.id, email: decoded.email }, JWT_SECRET);
        return c.json({ accessToken: newAccessToken }, 200);
    } catch (err) {
        return c.json({ error: "Invalid or expired refresh token" }, 401);
    }
};
