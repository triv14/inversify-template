import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError";

const handle = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
  } else {
    res.status(500).json({ message: "something went wrong" });
  }
  next();
};

export default handle;
