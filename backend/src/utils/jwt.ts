import jwt from "jsonwebtoken";

export const signAccessToken = (
    payload: object,
    secret: string,
    options = { expiresIn: "1h" }
) => jwt.sign(payload, secret, options);

export const signRefreshToken = (
    payload: object,
    secret: string,
    options = { expiresIn: "7d" }
) => jwt.sign(payload, secret, options);