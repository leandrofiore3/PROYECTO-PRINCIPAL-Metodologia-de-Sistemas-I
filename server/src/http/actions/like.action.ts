import { Request, Response } from "express";
import { LikeCommand } from "../../../application/commands/like/like.command";
import LikeHandler from "../../../application/handlers/like/like.handler";

class LikeAction {
  async run(req: Request, res: Response) {
    const { id, owner, pin } = req.body;

    try {
      const command = new LikeCommand(id, owner, pin);
      if (!id || !pin) {
        return res.status(400).json({ message: 'Claim ID and PIN are required' });
      }

      await LikeHandler.handler(command);

      return res.status(200).json({ message: "Like added" });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new LikeAction();
