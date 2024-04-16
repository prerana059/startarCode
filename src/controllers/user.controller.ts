import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = req.body;
    console.log(req.body, " is request body");
    const todos = await UserService.create(todo);
    res.send(todos);
  } catch (err) {
    next(err);
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { email, password }: { email: string; password: string } =
          req.body
      const { token } = await UserService.login(email, password)
      res.json(token)
  } catch (error) {
      next(error)
  }
}