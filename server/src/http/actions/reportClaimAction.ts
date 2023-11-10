import { Request, Response } from "express";
import ReportClaimHandler from "../../application/handlers/ReportClaimHandler";
import ReportClaimCommand from "../../application/commands/ReportClaimCommand";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";
import VisitorRepository from "../../infrastructure/repositories/visitor.repository";

class ReportClaimAction {
  public async run(req: Request, res: Response): Promise<void> {
    const { claimId } = req.params;

    if (!claimId) {
      res.status(400).json({ message: 'claimId is required' });
      return;
    }

    const userId = req.params["id"]?.toString();

    try {
      const command = new ReportClaimCommand(claimId);

      const reportHandler = new ReportClaimHandler(ClaimRepository, VisitorRepository);

      await reportHandler.handle(command, userId!);

      res.status(200).json({ message: 'Claim reported' });

    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new ReportClaimAction();