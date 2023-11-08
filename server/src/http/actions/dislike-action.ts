import { Request, Response } from 'express';
import DislikeCommand from '../../application/commands/DislikeCommand';
import DislikeHandler from '../../application/handlers/DislikeHandler';
import visitorRepository from '../../infrastructure/repositories/visitor.repository';

class DislikeAction {
  private readonly dislikeHandler: typeof DislikeHandler;

  constructor(dislikeHandler: typeof DislikeHandler) {
    this.dislikeHandler = dislikeHandler;
  }

  public async run(req: Request, res: Response) {
    const { id, claimId, pin } = req.body;

    try {
      if (!claimId || !pin) {
        res.status(400).json({ message: 'Claim ID and PIN are required' });
        return
      }
      const visitor = await visitorRepository.findOneById(id);
      if (!visitor) {
        res.status(404).json({ message: "Visitor not found" });
        return
      }
      const command = new DislikeCommand(claimId, visitor, pin);

      await this.dislikeHandler.execute(command, visitor);

      res.status(200).json({ message: 'Disliked successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message });
    }
  }
}

export default new DislikeAction(DislikeHandler);
