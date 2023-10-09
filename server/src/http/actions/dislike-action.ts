import { Request, Response } from 'express';
import DislikeCommand from '../../application/commands/DislikeCommand'; 
import DislikeHandler from '../../application/handlers/DislikeHandler'; 
import Visitor from '../../domain/entities/visitor.entity'; 

class DislikeAction {
  private readonly dislikeHandler: DislikeHandler;

  constructor(dislikeHandler: DislikeHandler) {
    this.dislikeHandler = dislikeHandler;
  }

  public async run(req: Request, res: Response) {
    const { claimId, pin } = req.body; 

    try {
      if (!claimId || !pin) {
        return res.status(400).json({ message: 'Claim ID and PIN are required' });
      }
      const visitor = new Visitor(); 
      const command = new DislikeCommand(claimId, visitor, pin);

      await this.dislikeHandler.execute(command, visitor);

      return res.status(200).json({ message: 'Disliked successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message });
    }
  }
}

export default DislikeAction;
