import Visitor from 'domain/entities/visitor.entity';
import Claim from '../../domain/entities/claim.entity'; 
import ReportClaimAction from '../../http/actions/ReportClaimAction'; 
import Category from 'domain/entities/category.entity';

class ReportClaimHandler {
  private ReportClaimAction: typeof ReportClaimAction;

  constructor(reportClaimAction: typeof ReportClaimAction) {
    this.ReportClaimAction = reportClaimAction;
  }

  public async findOriginalAndDuplicateClaim(
    owner: Visitor,
    description: string,
    category: Category
  ): Promise<void> {
    const [originalClaim, duplicateClaim] = await Promise.all([
      this.ReportClaimAction.findOriginalClaim(owner, description, category),
      this.ReportClaimAction.findDuplicateClaim(owner, description, category),
    ]);

      if (!originalClaim || !duplicateClaim || originalClaim.createdAt <= duplicateClaim.createdAt) {
        throw new Error('No se encontraron los informes originales/duplicados, o el claim original es más reciente que el que el duplicado.');
    }

        duplicateClaim.close();

    await Promise.all([
      this.ReportClaimAction.save(originalClaim),
      this.ReportClaimAction.save(duplicateClaim),
    ]);
  }
}

export default new ReportClaimHandler(ReportClaimAction);



//nombre descripcion category
//crear el claim original y el duplicado y pasarlo por parametro