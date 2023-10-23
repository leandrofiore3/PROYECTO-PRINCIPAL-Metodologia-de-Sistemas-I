import { Request, Response } from "express";
import { LikeCommand } from "../../application/commands/like.command";
import LikeHandler from "../../application/handlers/like.handler";

class LikeAction {
  async run(req: Request, res: Response) {
    const { id, owner, pin } = req.body;

    try {
      const command = new LikeCommand(id, owner, pin);
      if (!id || !pin) {
        res.status(400).json({ message: 'Claim ID and PIN are required' });
        return
      }

      await LikeHandler.handler(command);

      res.status(200).json({ message: "Like added" });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new LikeAction();
