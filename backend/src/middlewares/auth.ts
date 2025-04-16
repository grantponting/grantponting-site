import type { Context } from "hono"; // or import your own types
import jwt from "jsonwebtoken";

export const authMiddleware = async (
    c: any,
    next: any
) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    const token = authHeader.split(" ")[1];
    const { JWT_SECRET } = c.env as { JWT_SECRET: string };

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        c.set("user", decoded); // Attach user info to context if needed
        // Await next middleware and ensure its result is returned
        const response = await next();
        return response;
    } catch (err) {
        return c.json({ error: "Invalid or expired token" }, 401);
    }
};
