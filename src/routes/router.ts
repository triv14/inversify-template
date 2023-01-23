import express, { Request, Response } from "express";

// Router
const router = express.Router();
// index
router.get("/", (req: Request, res: Response) => {
  res.send("API is working properly");
});

export default router;
