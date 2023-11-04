import { Request, Response } from "express";
import  ReportClaimHandler  from "../../application/handlers/ReportClaimHandler";
import ReportClaimCommand from "../../application/commands/ReportClaimCommand";

class ReportClaimAction {
  constructor(private handler: typeof ReportClaimHandler) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { claimId } = req.params;

    if (!claimId) {
      res.status(400).json({ message: 'claimId is required' });
      return;
    }

    try {
      const command = new ReportClaimCommand(claimId);

      await this.handler.handle(command);

      res.status(200).json({ message: 'Claim reported' });

    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}

export default new ReportClaimAction(ReportClaimHandler);

  
  
  
  

    


