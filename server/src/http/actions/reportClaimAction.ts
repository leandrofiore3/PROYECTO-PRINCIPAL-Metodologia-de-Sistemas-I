import { Request, Response } from "express";
import ReportClaimHandler from "../../application/handlers/ReportClaimHandler";
import ReportClaimCommand from "../../application/commands/ReportClaimCommand";
import ClaimRepository from "../../infrastructure/repositories/claim-repository";
import VisitorRepository from "../../infrastructure/repositories/visitor.repository";

class ReportClaimAction {

  constructor() {
  }

  public async run(req: Request, res: Response): Promise<void> {
    const { claimId } = req.params;

    // cambiar el Promise y devulve un mensaje de error
    if (!claimId) {
      res.status(400).json({ message: 'claimId is required' });
      return;
    }

    const userId = req.params["id"]?.toString();

    try {
      const command = new ReportClaimCommand(claimId);
      // ----------------------------------------
      const reportHandler = new ReportClaimHandler(ClaimRepository, VisitorRepository);

      const handlerInstance = await reportHandler.handle(command, userId!);
      console.log(handlerInstance)

      // ----------------------------------------

      res.status(200).json({ message: 'Claim reported' });

    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}

export default new ReportClaimAction();