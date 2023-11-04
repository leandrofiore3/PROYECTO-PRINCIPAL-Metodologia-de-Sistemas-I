
class ReportClaimCommand {
  constructor(
    private claimId: string
  ) {}

  public getClaimId(): string {
    return this.claimId;
  }
}

export default ReportClaimCommand;

