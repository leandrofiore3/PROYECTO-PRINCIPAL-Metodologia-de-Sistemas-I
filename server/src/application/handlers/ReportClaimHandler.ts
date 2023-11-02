import Visitor from 'domain/entities/visitor.entity';
import Claim from '../../domain/entities/claim.entity'; 
import ReportClaimAction from '../../http/actions/ReportClaimAction'; 
import Category from 'domain/entities/category.entity';

class ReportClaimHandler {
  private ReportClaimAction: typeof ReportClaimAction;

  constructor(reportClaimAction: typeof ReportClaimAction) {
    this.ReportClaimAction = reportClaimAction;
  }

  public async findOriginalAndDuplicateClaim( //METODO
    owner: Visitor,
    description: string,
    category: Category

  ): Promise<void> {
    const [originalClaim, duplicateClaim] = await Promise.all([
      this.ReportClaimAction.findOriginalClaim(owner, description, category),
      this.ReportClaimAction.findDuplicateClaim(owner, description, category),
    ]);

      if (!originalClaim || !duplicateClaim || originalClaim.createdAt <= duplicateClaim.createdAt) {
        throw new Error('No se encontraron los informes originales/duplicados, o el claim original es más reciente que el duplicado.');
    }

        duplicateClaim.close();//CIERRA EL DUPLICADO

    await Promise.all([
      this.ReportClaimAction.save(originalClaim),
      this.ReportClaimAction.save(duplicateClaim),
    ]);
  }
}
export default new ReportClaimHandler(ReportClaimAction);
//ESTA HERMOSO