import { NextFunction, Request, Response } from "express";
import Message from "../config/message";
import { errorHandling } from "../constant/services";
import jwt from "jsonwebtoken";

const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken: string | undefined =
      req.headers.authorization?.split(" ")[1];

    if (
      authToken === null ||
      authToken === undefined ||
      authToken === "" ||
      Array.isArray(authToken)
    ) {
      throw new Message(
        400,
        "No token specified, access denied. Specify token in headers"
      );
    }

    const jwtAuthKey: string = process.env.JWT_AUTH_KEY || "passwordkey";

    const verifyToken = jwt.verify(authToken, jwtAuthKey);

    if (!verifyToken) {
      throw new Message(401, "Invalid token, access denied.");
    }

    next();
  } catch (e: any) {
    if (e.message == "jwt malformed") {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Unauthorized user." });
    }

    errorHandling(e, res);
  }
};

export default userMiddleware;
