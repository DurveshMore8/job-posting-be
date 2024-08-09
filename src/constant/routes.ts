import { Request, Response, Router } from "express";

export const constRoutes = Router();

constRoutes.get("/", (req: Request, res: Response) => {
  res.json({ version: 1.0, message: "Server is up and running." });
});

constRoutes.get("/health", (req: Request, res: Response) => {
  res.json({ version: 1.0, message: "Server is healthy, up and running." });
});
